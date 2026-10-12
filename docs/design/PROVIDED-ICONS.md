# Supplied control icons and tracker diagnostics — 2026-10-12

The user supplied theater.png, camera.png and setting.png. They are copied unmodified into public/icons/stickers.png, camera.png and settings.png and mapped to Stickers, shutter and Settings in the shared Icon component. The images retain their original 512 × 512 transparency and artwork; layout dimensions are 24 px for corner controls and 28 px for the shutter. Decorative alt text is empty, with accessible names remaining on parent controls. Other interface symbols retain the existing SVG system.

## Alignment

Control containers use explicit flex alignment in both axes, zero inherited summary padding and no inline-image baseline spacing. Provided PNGs display as blocks with contained, centered artwork. Rendered corner controls measured zero horizontal and vertical center offsets after fixing inherited summary padding/distribution; the shutter core uses the same explicit alignment. The actual shutter was not displayed in the idle verification session. [Measurements](verification/provided-icons-alignment.json), [current preview](verification/provided-icons-centered.png), [asset provenance/hashes](verification/provided-icons.json).

## Why Jeeliz can be unavailable

The old fallback message classified every initialization failure as device unavailability and discarded the error. Existing browser logs did not retain the user's actual failed Jeeliz attempt, so its exact cause is unconfirmed. Both the locally served ESM script and NN_DEFAULT model responded HTTP 200 during this check; local files and pinned provenance are present. This does not prove WebGL/inference startup succeeds.

The fallback now reports categories for unsupported/lost graphics context, unreadable camera frames, initialization timeout, network/module load failure and unexpected initialization errors. It records the original reason in a local console warning and keeps automatic MediaPipe fallback. Retry Jeeliz is available while the camera is active and capture is not busy/completed. The [official error-code guide](https://github.com/jeeliz/jeelizFaceFilter#error-codes) documents WebGL and camera initialization failures. No browser hardware/security settings or camera permissions were changed.

All 29 tests passed, including icon paths/decorative semantics, fallback categories, retry availability and the preceding uniform grid/capture lifecycle checks. The production build passed; final alignment CSS is included in the final build. Physical camera, actual failure reproduction and tracker/export alignment remain unverified. The [pre-change source snapshot](archive/pre-provided-icons-2026-10-12) preserves Icon, tracker hook and sticker-panel code before this follow-up. Earlier design records remain.

## Aperture shutter replacement — 2026-10-12

The user subsequently supplied `shutter-camera.png`. It is copied unmodified to `public/icons/shutter-camera.png` and used only for the capture shutter. The earlier camera icon remains available for camera placeholders. The shutter now shows the aperture artwork at the existing 64 px desktop / 52 px phone size, centered in both axes, without a CSS circular background, border or shadow. Its accessible name, keyboard focus, disabled behavior, capture action and cancellation states remain intact. This supersedes the earlier shutter icon mapping above; previous design notes are preserved.
The subsequent [automatic capture and compact Settings update](AUTOMATIC-CAPTURE.md) supersedes individual thumbnail retakes, makes the aperture shutter white and reduces Settings control scale. Previous implementation measurements above remain dated records.

The subsequent [MediaPipe/PixiJS update](MEDIAPIPE-PIXI-STICKERS.md) is the current face-effects authority. It removes tracker/category selectors, uses a shared GPU renderer with Canvas2D fallback, and makes the exact-second countdown field conditional on Custom. Earlier records above are preserved.
