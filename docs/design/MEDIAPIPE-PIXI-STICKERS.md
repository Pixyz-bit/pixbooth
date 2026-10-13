# MediaPipe and PixiJS face stickers - 2026-10-12

## Current stack

MediaPipe Face Landmarker is the sole active face tracker. It runs the pinned 0.10.32 model/WASM assets locally in the existing CPU worker, with one tracked face and its built-in single-face smoothing. The live runtime no longer imports or initializes Jeeliz. Its earlier modules/assets and dated documentation remain as historical implementation records.

PixiJS 8.22.0 is the primary sticker renderer, installed and pinned in package.json/package-lock.json. Its WebGL renderer is loaded lazily when a camera sticker is active. WebGPU and Three.js are not initialized. A WebGL initialization failure, context loss or render exception switches the same frame to the existing Canvas2D artwork renderer. Tracking remains MediaPipe in either rendering mode.

## Rendering and saved media

The preview, saved photos and five-second live clips share one renderer instance and the same detected landmark coordinates. Five attachment landmarks define position, eye-distance scale, roll and relative forehead/nose/mouth locations. Artwork is rasterized into transparent textures only when the effect, texture resolution tier or quantized relative face shape changes. Pixi moves, rotates and scales the cached sprite each frame. A four-entry LRU texture cache destroys evicted textures; closing tracking destroys sprites, textures, the WebGL renderer and the MediaPipe worker.

The existing 48 effects and None are preserved. The GPU textures are generated from the existing authored artwork, rather than downloading a new collection. Thumbnails continue to use the same artwork through Canvas2D. A transparent offscreen Pixi canvas is copied into the existing overlay/capture canvases, preserving source-frame dimensions, mirror transforms, cover framing, sticker baking and downstream JPG/MP4 export. No explicit Pixi pixel extraction is used. Canvas copies can still require GPU synchronization or readback; no FPS or device-wide speed improvement is claimed without benchmarks.

The overlay exposes its active renderer in the nonvisual data-sticker-renderer attribute. Renderer fallback diagnostics stay in the local console. Face-tracking failures retain the accessible Retry face tracking action.

## Simplified controls

The requested Face tracking and Category dropdowns are removed. All 48 effects plus None are presented in their existing selection grid, with accessible pressed states. The redundant selected-name/Clear sticker row is removed; None clears the active effect. Category metadata remains in the artwork catalog for compatibility, without a filtering control.

Countdown offers Off, 3 sec and Custom. Off adds no countdown; 3 sec is the default preset. Only Custom displays an exact whole-second numeric stepper from 1 to 10 seconds. Choosing Custom from Off starts at 3 seconds. Presets hide the field; choosing Custom focuses it and scrolls it into the visible part of a small panel. The existing automatic capture and whole-set Redo behavior remains.

## Verification

Final verification passed all 43 behavioral/UI tests, source/test formatting and the production build (895 modules). The lazy Pixi runtime chunk is approximately 302 kB / 86 kB gzipped; it loads only when tracking an active sticker. Tests cover cached GPU transformations, texture eviction/disposal, unavailable GPU/context loss/render-error fallback, invalid landmarks and photo/live capture using the shared renderer, alongside existing automatic-sequence and workflow checks.

The camera-free browser fixture at tests/fixtures/sticker-renderer.html used actual Pixi WebGL to render all 48 effects. GPU and Canvas2D nontransparent artwork bounds differed by at most 2 pixels at the tested 640 x 480 pose; a rotated pose also agreed within the fixture tolerance. The deliberately unavailable GPU case rendered through Canvas2D. The actual local MediaPipe worker/model initialized and processed a synthetic frame successfully. This verifies initialization and frame processing, not real face detection accuracy.

UI checks confirmed 49 choices, zero removed-dropdown elements and Off / 3 sec / Custom. Custom accepted 7 seconds; Off and 3 sec hid the field. Desktop 1440 x 900 and phone 375 x 812 had no horizontal overflow. Phone Custom focused its input and scrolled it fully inside the panel; only one phone corner panel remained open. The viewport override was reset, the camera-free fixture tab closed and the booth preview retained. No new camera permissions or physical webcam captures were performed. Real-device face attachment quality and live-video encoding remain manual checks.

Measured checks (historical file removed), desktop controls (historical file removed), phone controls (historical file removed), GPU/tracker fixture (historical file removed).

## Preservation and sources

The earlier DESIGN/README history, Jeeliz trial, sticker collection and previous design records are retained. This guide supersedes the old tracker/category selectors, the Jeeliz default and the always-visible exact-second countdown input.

Implementation references: [MediaPipe web guide](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js), [Pixi WebGL renderer guide](https://pixijs.com/8.x/guides/components/renderers), [Pixi sprite guide](https://pixijs.com/8.x/guides/components/scene-objects/sprite).

Final pre-push refinements: the selected-name/Clear sticker row is removed, the Camera switch track measures 44 x 28 px with a 20 px thumb, and the prior plain countdown is retained. Final source/test formatting, all 43 tests and production build passed. Final controls (historical file removed).

The subsequent [camera notification/fixed-countdown refinement](CAMERA-NOTIFICATIONS.md) replaces Custom with Off / 3 sec / 5 sec and introduces a conditional transparent notification fade. Earlier controls documented above remain historical records.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.
