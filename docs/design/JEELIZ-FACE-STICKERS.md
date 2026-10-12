# Jeeliz face-sticker trial

Implemented 2026-10-12. This is a tracking-engine trial within the existing 2D face-sticker feature. It does not add the repository's 3D mask demos or replace the app's visual design.

## How to try it

Open the running app, choose a layout, continue to Capture, enable the camera, and open **Face stickers**. **Face tracking** defaults to **Jeeliz · try it**. Select a sticker and wait for the Jeeliz-ready status. Turn and tilt your head, capture a photo, and compare the preview with the saved photo. For Live mode, record and download a clip to check sticker placement during movement. Switch to **MediaPipe · original** at any time outside countdown, recording, saving or completion. Selecting None disables face tracking.

## Implementation

- The hook lazy-loads locally vendored Jeeliz and its model only when a sticker is selected and the camera is active. Face pixels are processed locally; no external runtime CDN is used.
- Jeeliz reads a private video element backed by cloned tracks from the already-authorized camera stream. Its destroy API stops its input track; clones prevent an engine switch from stopping the booth's original camera. Shutdown stops clones, aborts pending readiness, releases the Jeeliz instance and cancels overlay rendering.
- The adapter estimates only the five anchors consumed by the existing 36-sticker artwork using face center, scale, yaw, pitch and roll. These are approximate pose-based anchors, not actual MediaPipe landmarks. Individual eye/nose/mouth placement may be less precise and must be judged on a real camera. One face is tracked.
- The existing renderer draws the same artwork into the live overlay, photo capture and live-recording canvas. Export geometry and original capture/media code are unchanged. No new 3D engine is installed.
- Detection uses acquisition/release thresholds of 0.8/0.6. Results older than 600ms are discarded. Initialization errors or WebGL failure automatically start MediaPipe and show an explicit fallback message; face-searching alone does not trigger fallback.
- Existing sticker search/categories, camera/session lifecycle, frame/background editor and downloads remain available. The labeled selector uses a 44px target and existing monochrome styles.

## Dependency provenance

Pinned upstream revision: **6f2695120b992511fd6cb1fd80c600bb957cd08c**, [Jeeliz FaceFilter](https://github.com/jeeliz/jeelizFaceFilter/tree/6f2695120b992511fd6cb1fd80c600bb957cd08c). Local library, default model and Apache-2.0 license are in public/jeeliz. provenance.json records source URLs and SHA-256 hashes. The esm file contains the unchanged upstream module plus a named export; the exact original is also retained.

## Verification scope

The production build passed before deployment. Eight automated checks cover source-coordinate mapping, invalid poses and confidence hysteresis, all 36 sticker drawings, clone-only cleanup, initialization failure callbacks, cancellation during lazy loading, original MediaPipe cleanup and the local ESM adapter. These use mocked browser/camera lifecycle; they do not establish actual WebGL inference, face alignment, rendered UI, device performance or photo/MP4 playback. The user will inspect camera behavior themselves.

## Rollback and historical records

Use **MediaPipe · original** for an immediate comparison without changing source. The pre-integration workspace hook, face panel, styles and documentation are saved under docs/design/archive/pre-jeeliz-2026-10-12. Source rollback restores those three modified source files and removes the newly added src/lib/face and public/jeeliz files only when no subsequent work depends on them. Existing camera/session/capture code was not changed. Earlier Classic, Retro and monochrome design records remain intact. The separately running port5173 project receives its own backup before its corresponding source changes are copied.

The subsequent [MediaPipe/PixiJS update](MEDIAPIPE-PIXI-STICKERS.md) is the current face-effects authority. It removes tracker/category selectors, uses a shared GPU renderer with Canvas2D fallback, and makes the exact-second countdown field conditional on Custom. Earlier records above are preserved.
