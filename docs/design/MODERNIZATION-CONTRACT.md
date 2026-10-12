# Modernization direction contract

Approved user brief: MODERNIZATION-BRIEF.md; implement directly in Martin Archive only. Operate surfaces: templates, capture, editor. No raster comp. Keep original logo, 21 layouts, all artwork, Jeeliz and MediaPipe, photo/live/JPG/MP4, and existing media geometry.

World: modern minimalist monochrome; #111111, #FFFFFF, #FAFAFA, #F5F5F5, #E5E5E5, #737373; DM Sans, 8px rhythm, 8–12px working corners, deliberate circle shutter/switch and mobile-sheet corners. Canonical style: src/styles/modern.css. Previous theme/responsive/interactions sheets no longer imported.

First viewport: compact templates retain masonry for All and rows for exact count filters via native dropdown. The camera leads between equally sized left tool and right photo panels. Both desktop sides use clamp(256px, 20vw, 320px). Stickers and Settings have independent native Stickers and Settings disclosures, initially closed and operated by click, Enter or Space. The icon-only shutter floats inside the camera frame, freeing vertical preview space. At >=900px width and >=420px height, the complete app fits 100dvh; smaller/shorter windows show the camera first and stack two equal 512px panels with internal overflow.

Signature interactions: single-photo or clip replacement retains the old capture until replacement succeeds; atomic background/frame edits undo as one action; user-requested reset needs native dialog confirmation. Native dialogs trap focus and restore opener; tabs support arrows/Home/End. Only transform/color/state feedback at 180ms; reduced motion disables nonessential movement.

Coverage: the previous URL-policy restriction is retained in dated records. The user subsequently authorized simulation/checking; the official browser tool now successfully verifies the current idle booth at 1440 × 900 and 375 × 812. No alternate browser route or state injection was used. Mocked capture lifecycle tests pass; physical camera, face tracking and JPG/MP4 exports still require device testing.

The user-requested masonry/count-button/right-side-gallery refinement is documented in [LAYOUT-REFINEMENT.md](LAYOUT-REFINEMENT.md). The preceding direction and source are preserved in archive/pre-masonry-2026-10-12.

The subsequent header/viewport/search/consistent-ratio changes are documented in [VIEWPORT-FIT.md](VIEWPORT-FIT.md), with preceding files preserved in archive/pre-viewport-fit-2026-10-12.

The latest [CAPTURE-FOCUS.md](CAPTURE-FOCUS.md) makes the camera section a full viewport rather than fitting the entire app into one viewport. Previous source and docs remain in archive/pre-capture-focus-2026-10-12.

Latest approved organization: [CAMERA-FIRST.md](CAMERA-FIRST.md). It supersedes the dedicated full-screen capture-section experiment and modal capture tool drawers. Prior source and docs remain in archive/pre-camera-first-2026-10-12.

Current follow-up: [LEFT-TOOLS-COMPACT-TEMPLATES.md](LEFT-TOOLS-COMPACT-TEMPLATES.md). Previous source and docs remain in archive/pre-left-tools-compact-2026-10-12.

Current approved organization: [PERMANENT-PANELS.md](PERMANENT-PANELS.md). It supersedes collapsible tools and count buttons; previous source and docs remain in archive/pre-permanent-panels-2026-10-12.

Current [collapsible tools and shutter cleanup](COLLAPSIBLE-TOOLS.md) restores independent closed-by-default dropdown sections and removes shutter-label/shutter-timer. Prior source and documentation remain archived.


The floating shutter has a Paper-white circle, 2px Ink outline and Ink camera icon. Its positioning wrapper is transparent with no padded dark backdrop; label/timer text is removed.


On desktop and tablet windows at least900px wide and420px tall, camera and review fit the viewport. Review stays on the right and tools now overlay the camera. Narrower/shorter windows stack review below the camera.


The current [Fresh picks and scaling refinement](FRESH-STICKERS.md) adds 12 original mixed accessories, normalizes artwork thumbnails, uses an800 × 640 (5:4) camera reference and wider256–320px side panels, and compacts controls without reducing44px targets. Earlier design records remain preserved.


Current organization: [camera corner tools](CAMERA-CORNER-TOOLS.md) supersedes the separate left panel, uniform5:4 desktop frame and count-dependent gallery columns. The supplied images establish element organization only; their visual styling and photographic assets are not used.

