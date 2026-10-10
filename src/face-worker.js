import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

let landmarker;
self.custom_dbg = (...args) => console.debug(...args);
// MediaPipe's wasm loader uses importScripts. Module workers use this fallback,
// with local ESM wrappers that expose the same ModuleFactory on the worker global.
self.import = async url => {
  const module = await import(/* @vite-ignore */ url.replace(/\.js$/, '.mjs'));
  self.ModuleFactory = module.default;
};
self.onmessage = async ({ data }) => {
  if (data.type === 'init') {
    try {
      const vision = await FilesetResolver.forVisionTasks(data.assetBase + '/wasm');
      landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: data.assetBase + '/face_landmarker.task', delegate: 'CPU' },
        runningMode: 'VIDEO', numFaces: 1,
        minFaceDetectionConfidence: .5, minFacePresenceConfidence: .5, minTrackingConfidence: .5,
      });
      self.postMessage({ type: 'ready' });
    } catch (error) { console.error('Face tracker initialization failed', error); self.postMessage({ type: 'error' }); }
  }
  if (data.type === 'frame') {
    try {
      const result = landmarker.detectForVideo(data.frame, data.timestamp);
      self.postMessage({ type: 'result', landmarks: result.faceLandmarks[0] || null, timestamp: data.timestamp });
    } catch (error) { console.error('Face detection failed', error); self.postMessage({ type: 'error' }); }
    finally { data.frame.close(); }
  }
};
