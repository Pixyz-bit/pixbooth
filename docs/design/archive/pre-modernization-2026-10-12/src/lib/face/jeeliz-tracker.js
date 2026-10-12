import { jeelizFacePresent, jeelizStickerPoints } from './jeeliz-pose.js';

async function loadJeeliz() {
  const url = new URL(import.meta.env.BASE_URL + 'jeeliz/jeelizFaceFilter.esm.js', location.origin);
  const module = await import(/* @vite-ignore */ url.href);
  return module.JEELIZFACEFILTER;
}

function videoReady(video, signal) {
  return new Promise((resolve, reject) => {
    let timer;
    const cleanup = () => {
      clearTimeout(timer);
      video.removeEventListener('timeupdate', check);
      signal.removeEventListener('abort', abort);
    };
    const check = () => {
      if (video.readyState >= 2 && video.currentTime > 0) {
        cleanup();
        resolve();
      }
    };
    const abort = () => {
      cleanup();
      reject(new DOMException('Tracker stopped', 'AbortError'));
    };
    if (signal.aborted) return abort();
    video.addEventListener('timeupdate', check);
    signal.addEventListener('abort', abort, { once: true });
    timer = setTimeout(() => {
      cleanup();
      reject(new Error('Camera frames were unavailable'));
    }, 10000);
    check();
  });
}

export function startJeelizTracking(
  source,
  { onReady, onResult, onError },
  apiLoader = loadJeeliz
) {
  let stopped = false,
    api,
    cloneVideo,
    cloneStream,
    canvas,
    tracking = false;
  const controller = new AbortController();
  const releaseApi = () => {
    if (api) {
      try {
        Promise.resolve(api.destroy()).catch(() => {});
      } catch {
        /* Initialization can fail before ready. */
      }
    }
  };
  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timeout);
    controller.abort();
    releaseApi();
    // Jeeliz destroy() stops its input track. Its private cloned tracks protect
    // the booth's original stream when switching effects or tracking engines.
    cloneStream?.getTracks().forEach((track) => track.stop());
    if (cloneVideo) {
      cloneVideo.pause();
      cloneVideo.srcObject = null;
    }
    canvas?.remove();
  };
  const fail = (error) => {
    if (stopped) return;
    stop();
    onError(error);
  };
  const timeout = setTimeout(() => fail(new Error('Jeeliz initialization timed out')), 45000);
  async function initialize() {
    const library = await apiLoader();
    if (stopped) return;
    const tracks = source.srcObject?.getVideoTracks();
    if (!tracks?.length || tracks.some((track) => track.readyState !== 'live'))
      throw new Error('Camera is not ready');
    cloneStream = new MediaStream(tracks.map((track) => track.clone()));
    cloneVideo = document.createElement('video');
    cloneVideo.muted = true;
    cloneVideo.playsInline = true;
    cloneVideo.srcObject = cloneStream;
    await cloneVideo.play();
    await videoReady(cloneVideo, controller.signal);
    if (stopped) return;
    canvas = document.createElement('canvas');
    const scale = Math.min(1, 640 / source.videoWidth);
    canvas.width = Math.max(1, Math.round(source.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(source.videoHeight * scale));
    api = library.create_new();
    api.init({
      canvas,
      NNCPath: new URL(import.meta.env.BASE_URL + 'jeeliz/NN_DEFAULT.json', location.origin).href,
      videoSettings: { videoElement: cloneVideo },
      maxFacesDetected: 1,
      followZRot: true,
      animateDelay: 16,
      callbackReady(error) {
        if (stopped) {
          releaseApi();
          return;
        }
        if (error) {
          fail(new Error(String(error)));
          return;
        }
        clearTimeout(timeout);
        onReady();
      },
      callbackTrack(pose) {
        if (stopped) return;
        tracking = jeelizFacePresent(pose.detected, tracking);
        onResult(
          tracking ? jeelizStickerPoints(pose, source.videoWidth, source.videoHeight) : null
        );
      },
    });
  }
  initialize().catch((error) => {
    if (!stopped) fail(error);
  });
  return stop;
}
