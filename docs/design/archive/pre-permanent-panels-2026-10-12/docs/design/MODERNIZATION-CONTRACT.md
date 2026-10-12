# Modernization direction contract

Approved user brief: MODERNIZATION-BRIEF.md; implement directly in Martin Archive only. Operate surfaces: templates, capture, editor. No raster comp. Keep original logo, 21 layouts, all artwork, Jeeliz and MediaPipe, photo/live/JPG/MP4, and existing media geometry.

World: modern minimalist monochrome; #111111, #FFFFFF, #FAFAFA, #F5F5F5, #E5E5E5, #737373; DM Sans, 8px rhythm, 8–12px working corners, deliberate circle shutter/switch and mobile-sheet corners. Canonical style: src/styles/modern.css. Previous theme/responsive/interactions sheets no longer imported.

First viewport: compact template cards keep masonry for All and left-to-right grid flow for count filters. Capture uses a collapsed left Tools rail for native Stickers/Settings, fixed 16:9 camera and shutter in the center, and compact photos/Continue on the right. The app remains viewport-fitted at >=900px width and >=560px height; smaller/shorter windows stack naturally. Editor is unchanged.

Signature interactions: single-photo or clip replacement retains the old capture until replacement succeeds; atomic background/frame edits undo as one action; user-requested reset needs native dialog confirmation. Native dialogs trap focus and restore opener; tabs support arrows/Home/End. Only transform/color/state feedback at 180ms; reduced motion disables nonessential movement.

Coverage: 1440/1024/768/375–430 widths defined in source; no runtime screenshot claim. Earlier browser URL-policy rejection prohibited preview access and alternate browser/CDP workarounds. Do not try browser tools or alternate rendering routes. Source/build/static and mocked lifecycle tests only; real visual/device/camera/export testing still required.

The user-requested masonry/count-button/right-side-gallery refinement is documented in [LAYOUT-REFINEMENT.md](LAYOUT-REFINEMENT.md). The preceding direction and source are preserved in archive/pre-masonry-2026-10-12.

The subsequent header/viewport/search/consistent-ratio changes are documented in [VIEWPORT-FIT.md](VIEWPORT-FIT.md), with preceding files preserved in archive/pre-viewport-fit-2026-10-12.

The latest [CAPTURE-FOCUS.md](CAPTURE-FOCUS.md) makes the camera section a full viewport rather than fitting the entire app into one viewport. Previous source and docs remain in archive/pre-capture-focus-2026-10-12.

Latest approved organization: [CAMERA-FIRST.md](CAMERA-FIRST.md). It supersedes the dedicated full-screen capture-section experiment and modal capture tool drawers. Prior source and docs remain in archive/pre-camera-first-2026-10-12.

Current follow-up: [LEFT-TOOLS-COMPACT-TEMPLATES.md](LEFT-TOOLS-COMPACT-TEMPLATES.md). Previous source and docs remain in archive/pre-left-tools-compact-2026-10-12.
