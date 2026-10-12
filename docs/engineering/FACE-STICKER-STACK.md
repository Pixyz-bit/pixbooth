# Face tracking and sticker rendering review — 2026-10-12

## Recommendation

For Pixbooth's current 2D face accessories, use the existing MediaPipe Face Landmarker for tracking and build a new PixiJS-based sticker renderer. This is an engineering recommendation based on the browser-only React/Vite app, its local processing model and its current 36 effects; it is not a measured performance ranking. The tracker and renderer are separate concerns. No new engine/renderer dependency or default change was implemented during this research pass.

## Repository review

Reviewed the requested [face-filters topic](https://github.com/topics/face-filters), its browser-language listings and the relevant repository READMEs. This was a web-focused shortlist, not a code/security audit of every topic repository. Some language-filtered pages returned older cached listings; avoid treating their counts/update dates as exhaustive current metadata.

| Candidate | Verified capabilities | Project fit (assessment) |
| --- | --- | --- |
| [Jeeliz FaceFilter](https://github.com/jeeliz/jeelizFaceFilter) | Browser WebGL tracker exposes face position/scale/Euler rotation; includes Three.js, Babylon.js and Canvas2D integrations; Apache-2.0 repository | Strongest reusable open library found on the topic. Appropriate for head-following AR. Existing app integration estimates five facial anchors from pose, limiting precise eyewear/mouth alignment. |
| [MediaPipe + Three.js demo](https://github.com/nuwandda/snapchat-filter-threejs) | Example combines MediaPipe and Three.js; four commits and no releases shown in inspected page | Useful architecture reference for future 3D masks, not a production package to transplant. No license was displayed in inspected listing; do not copy its code without verifying reuse terms. |
| [Banuba Web quickstart](https://github.com/Banuba/quickstart-web) | Browser SDK example needs WebGL2 and a client token; demo repository MIT | Token-dependent SDK introduces vendor setup; the demo's MIT license does not establish SDK entitlement. Not the preferred dependency for this local booth. |
| [Snapchat clone](https://github.com/TowhidKashem/snapchat-clone) | React/Redux application; installation checks out a tested Jeeliz version | Application reference, not a superior independent tracker/renderer. |
| [FaceUp](https://github.com/Sourabh-Kumar04/FaceUp) | p5.js/ml5.js application with body/facial keypoints and accessory overlays | Replaces existing app layers without supplying a stronger fitting foundation for current facial-landmark needs. |

## Proposed renderer

[PixiJS](https://github.com/pixijs/pixijs) is an MIT-licensed browser 2D renderer with [WebGL/WebGPU, textures, masks, scene objects and filters](https://pixijs.com/8.x/guides/getting-started/intro). Use WebGL first for predictable target coverage, lazy-load it only when an effect is enabled, and retain the existing Canvas2D renderer as fallback and rollback. PixiJS adds rendering capability, not face detection or automatic placement quality.

Build the actual improvement in a provider-independent placement/render layer:

1. Separate parts/anchors for each effect: eye centers for eyewear, forehead/face contour for headwear, nose/mouth landmarks for fun effects. Preserve the 36 existing assets and support richer locally authored sprites later.
2. Add time-based adaptive smoothing/interpolation of anchors and scale/rotation; reset on face loss/reacquisition and avoid interpolating across providers or frame-size changes. MediaPipe already smooths single-face detection; tune extra smoothing carefully to avoid lag.
3. Cache high-resolution transparent artwork as textures; use pose-aware rotation/scaling and grouped layers. Better artwork still requires authored assets; switching libraries alone does not improve their appearance. True 3D geometry/occlusion belongs to a Three.js path if needed later.
4. Keep rendering in unmirrored source-frame coordinates and apply the same mirroring/crop rules for preview and capture. Render into the shared overlay consumed by photo/live capture so JPG and MP4 contain the displayed effect. Handle renderer startup, context loss, asset errors and cleanup explicitly.
5. Validate still-face jitter, rapid turns, eyewear fit, face loss/reacquisition, mirroring, device rotation, all sticker categories and matching photo/live exports on physical cameras. Compare performance on target devices before calling it faster or more accurate.

## Local source findings

useFaceStickers currently renders Canvas2D artwork each animation frame from the latest result. MediaPipe inference runs in a CPU worker with an 80ms minimum interval (up to 12.5 detection updates/sec); the renderer uses five landmarks (33,263,10,1,13), while the Jeeliz adapter estimates those points from pose. No application-level temporal interpolation/smoothing is implemented. Therefore anchors, timing and artwork structure must improve alongside renderer technology.

[Official MediaPipe Web guide](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js) documents 3D landmarks, blendshapes, transformation matrices, single-face smoothing and worker use for synchronous detection. Existing worker integration can be retained rather than replacing the capture pipeline.
