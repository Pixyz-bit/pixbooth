# Permanent camera tools, floating shutter and typography — 2026-10-12

Historical pass: [COLLAPSIBLE-TOOLS.md](COLLAPSIBLE-TOOLS.md) supersedes permanently visible sections and shutter text.

Implemented in the canonical Martin Archive project at localhost:5173. This pass supersedes LEFT-TOOLS-COMPACT-TEMPLATES.md while retaining prior records and the exact [pre-change snapshot](archive/pre-permanent-panels-2026-10-12).

## Layout and controls

The camera leads between equally sized permanent tool and photo panels. Both desktop sides use clamp(224px, 15vw, 288px). Stickers and Settings have visible section headings and no disclosure toggle. The shutter and timer float inside the camera frame, freeing vertical preview space. At >=1100px width and >=600px height, the complete app fits 100dvh; smaller/shorter windows show the camera first and stack two equal 512px panels with internal overflow.

The frame is a stable 1280 × 720 reference, proportionally fitted to both viewport dimensions. Video and face overlay share contained geometry; export crops/dimensions are unchanged. The floating shutter exposes countdown/recording cancellation and clears completed native clip playback. Idle camera activation remains unobstructed. Feedback overlays do not resize the frame.

Templates use a labeled native count dropdown, retaining all 21 choices, compact masonry for All and rows for filtered results. Pick for me and both search inputs are removed. Sticker categories, providers, None/Clear, status/recovery and settings remain. Captured media fills the review width and centers in a 1/2/3-column grid (one / 2–8 / nine). Caption rows are removed; retake is a 44px overlay shown on hover/focus and always available on touch. Live playback and individual downloads remain. Continue and Start over are stacked full-width primary/outline buttons with 48px minimum heights; reset confirmation is preserved.

## Typography

Use only bundled DM Sans 400/500/700. Camera layout heading: 18px/1.4 weight500. Tool/review headings and control/action labels: 14px; labels, sticker names, status and timer: 12px/1.5 (names 1.25). Ordinary prose remains 16px/1.5. Narrow panels wrap copy without reducing control targets; mode choices stay one line. No font dependency or remote font request was added. DESIGN.md now documents these roles so the type detector can recognize the intentional compact scale.

## Verification

All 23 tests passed, including duplicate-click gating, countdown advancement/cancellation, individual photo/live replacement, recording cleanup, floating-shutter lifecycle and completed-playback clearance. Production build passed (172 modules, 12.72 seconds), and source/test formatting passed. Final scoped typography and layout scans have no findings after documenting compact labels and the transient countdown readout. Historical DESIGN/README blocks and sidecar history were verified unchanged. [Exact checks](verification/permanent-panels-checks.json) and scoped [type](verification/permanent-panels-type-scan.json)/[layout](verification/permanent-panels-layout-scan.json) results are retained. These include mocked source capture tests and server-rendered UI contracts, not browser-camera simulation.

Official browser checks succeeded after the user authorized simulation and checking. An eight-photo filter/selection opened the matching booth; Animals category and countdown selection worked. At 1440 × 900, the frame measured 936 × 526.5 (16:9), both side panels 224 × 784.4, and page/horizontal overflow was zero. At 375 × 812, frame 328 × 184.5, both panels 328 × 512, horizontal overflow zero. The mobile sticker/settings panel now scrolls internally instead of expanding to 1818px. Computed DM Sans was loaded; camera title 18px, control14px and label12px, with both mode targets44px. Console checks reported no warnings/errors.

[Browser measurements](verification/permanent-panels-browser.json), [desktop screenshot](verification/permanent-booth-desktop.png), and [phone screenshot](verification/permanent-booth-mobile.png) record current UI evidence. Physical camera/device compatibility, actual tracking overlay alignment, capture hover rendering on real media, real JPG/MP4 exports and broad accessibility conformance still require manual device testing. No camera permission was granted or synthetic media injected into the browser.
