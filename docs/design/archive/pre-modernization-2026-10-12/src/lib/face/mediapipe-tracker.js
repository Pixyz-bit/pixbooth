export function startMediaPipeTracking(source, { onReady, onResult, onError }) {
  let stopped = false,
    ready = false,
    pending = false,
    lastFrame = -1,
    lastTime = 0,
    raf;
  const worker = new Worker(new URL('../../workers/face-worker.js', import.meta.url), {
    type: 'module',
  });
  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    worker.terminate();
  };
  const fail = (error) => {
    if (!stopped) {
      stop();
      onError(error);
    }
  };
  const timeout = setTimeout(() => fail(new Error('MediaPipe initialization timed out')), 45000);
  worker.onerror = fail;
  worker.onmessage = ({ data }) => {
    if (stopped) return;
    if (data.type === 'ready') {
      ready = true;
      clearTimeout(timeout);
      onReady();
    } else if (data.type === 'error') fail(new Error('MediaPipe tracking failed'));
    else if (data.type === 'result') {
      pending = false;
      onResult(data.landmarks);
    }
  };
  worker.postMessage({
    type: 'init',
    assetBase: new URL(import.meta.env.BASE_URL + 'mediapipe', location.origin).href,
  });
  async function loop(now) {
    if (stopped) return;
    if (
      source.readyState >= 2 &&
      ready &&
      !pending &&
      now - lastTime >= 80 &&
      source.currentTime !== lastFrame
    ) {
      pending = true;
      lastFrame = source.currentTime;
      lastTime = now;
      try {
        const ratio = Math.min(1, 640 / source.videoWidth);
        const frame = await createImageBitmap(source, {
          resizeWidth: Math.round(source.videoWidth * ratio),
          resizeHeight: Math.round(source.videoHeight * ratio),
        });
        if (stopped) {
          frame.close();
          return;
        }
        worker.postMessage({ type: 'frame', frame, timestamp: now }, [frame]);
      } catch (error) {
        fail(error);
      }
    }
    if (!stopped) raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return stop;
}
