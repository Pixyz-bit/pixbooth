# Modernization direction contract

Approved user brief: MODERNIZATION-BRIEF.md; implement directly in Martin Archive only. Operate surfaces: templates, capture, editor. No raster comp. Keep original logo, 21 layouts, all artwork, Jeeliz and MediaPipe, photo/live/JPG/MP4, and existing media geometry.

World: modern minimalist monochrome; #111111, #FFFFFF, #FAFAFA, #F5F5F5, #E5E5E5, #737373; DM Sans, 8px rhythm, 8–12px working corners, deliberate circle shutter/switch and mobile-sheet corners. Canonical style: src/styles/modern.css. Previous theme/responsive/interactions sheets no longer imported.

First viewport: each screen exposes one primary task. Templates use proportionate masonry previews, name search, and exact photo-count buttons, with a compact selected-layout Continue row. Capture leads with the full source camera frame, direct permission CTA, visible status and a circular shutter; an ordered thumbnail grid and Continue sit in a right-side review column above 900px and stack below the camera on smaller screens; secondary tools remain in drawers. Editor leads with the fitted artifact, Undo/Redo, download/export info and one tool category at a time.

Signature interactions: single-photo or clip replacement retains the old capture until replacement succeeds; atomic background/frame edits undo as one action; user-requested reset needs native dialog confirmation. Native dialogs trap focus and restore opener; tabs support arrows/Home/End. Only transform/color/state feedback at 180ms; reduced motion disables nonessential movement.

Coverage: 1440/1024/768/375–430 widths defined in source; no runtime screenshot claim. Earlier browser URL-policy rejection prohibited preview access and alternate browser/CDP workarounds. Do not try browser tools or alternate rendering routes. Source/build/static and mocked lifecycle tests only; real visual/device/camera/export testing still required.

The user-requested masonry/count-button/right-side-gallery refinement is documented in [LAYOUT-REFINEMENT.md](LAYOUT-REFINEMENT.md). The preceding direction and source are preserved in archive/pre-masonry-2026-10-12.
