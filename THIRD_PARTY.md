# Face tracking dependencies

PhotoPix uses Google's `@mediapipe/tasks-vision` version 0.10.32 (Apache-2.0).
The runtime files in `public/mediapipe/wasm/` come from that pinned npm package.
The `.mjs` copies append `export default ModuleFactory` for module-worker loading;
the original runtime files remain alongside them. Regenerate with `npm run setup:face`.

- Documentation: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
- Project and license: https://github.com/google-ai-edge/mediapipe
- Face Landmarker float16 model, version 1: https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task

The model is served from this application's own static assets. Detection runs in
a web worker in the user's browser. Photo pixels and landmarks are never uploaded.
The dog, hat, and glasses overlays are authored canvas shapes in `src/face-stickers.js`.
Test-only portrait fixtures and screenshots are not application assets.
