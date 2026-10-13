# Full-viewport capture section — 2026-10-12

The user requested that one scroll reveal the entire capture area and that empty space support more content. Their supplied screenshot is baseline evidence of a small centered preview, a three-column one-photo placeholder, and controls occupying a separate lower camera row.

Superseded by the user-approved [camera-first layout](CAMERA-FIRST.md): shutter below the preview, native right-side collapsible tools, and a viewport-sized app shell including the header. This document retains the earlier experiment and verification history.

## Implemented layout

At widths >=720px and heights >=560px, camera-workspace is a labeled section with height 100dvh after the compact header and intro. The page now uses natural overall height rather than constraining the entire app to 100dvh. Native proximity scroll snapping helps settle a scroll on the capture section; it also retains the top header position, does not use mandatory scrolling, and is disabled with reduced motion. Physical wheel/touch gesture count is device-dependent and has not been verified.

The left camera column contains its camera toggle/status, 16:9 preview, capture-position status, and recovery/tracking feedback. Stickers, shutter, and Settings move to the top of the right column, with Your moments, retake feedback, and Continue beneath. This removes the separate lower toolbar from the camera's height budget. The source camera and overlay still use containment; media quality and export geometry are unchanged.

The gallery derives its column count from the actual capture count: one column for one photo, two for two, and three for larger layouts. Preview boxes can grow to 224px, giving small-count layouts useful space rather than reserving three tiny cells. Larger photo/live sets retain bounded internal scrolling when necessary, while the shutter and Continue remain outside that scroll area. Smaller or shorter windows retain stacked natural flow and all controls. The footer follows the capture section.

No camera, tracking, capture, encoder, editor, or session engine was modified. Original layouts/artwork, individual retakes, live downloads, loading/cancellation, and reset behavior remain.

## Documentation and preservation

Pre-change archive (historical file removed) preserves the four changed source/test files and previous DESIGN, README, PRODUCT, sidecar, direction contract, and viewport-fit record. Earlier archives and embedded historical guides remain. Current docs describe the new section; the previous record has a superseding notice.

## Verification

Final production build passed (172 modules, 1m 1s). All 21 tests passed; Prettier passed across src and tests. Scoped layout scans returned no findings. Historical DESIGN/README sections and sidecar history were verified unchanged. Final capture and filter checks (historical file removed) record the combined result, including the subsequent [filtered-template correction](FILTERED-LAYOUTS.md). Static SSR checks now verify that the full capture region includes the sidebar shutter, Stickers, Settings, gallery, and Continue and that the toolbar no longer occupies the camera column. They do not establish actual rendered fit.

Fresh browser access remains restricted, so no current scroll-gesture, responsive rendering, physical camera, inference, playback, or export approval is claimed. Manually inspect a single scroll, fixed ratio, thumb growth for 1/2 photos, nine-photo/live/error/retake states, tab order, reduced motion, and narrow/short-screen fallback at localhost:5173.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.
