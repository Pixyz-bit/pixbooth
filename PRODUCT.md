# Mentomory

Current camera feedback: [conditional notification fade and fixed countdowns](docs/design/CAMERA-NOTIFICATIONS.md). Transparent messages use a top-heavy dark fade only while a visible notice/error exists. Countdown choices are Off / 3 sec / 5 sec, with no Custom input.


Current face-effects stack: [MediaPipe + PixiJS](docs/design/MEDIAPIPE-PIXI-STICKERS.md) replaces the Jeeliz trial in the active app, with Canvas2D rendering fallback. All 48 effects are shown without tracker/category dropdowns. Countdown now uses Off / 3 sec / Custom, revealing a 1-10 second numeric stepper only for Custom.


Mentomory is a browser photo and live-clip booth built with React. The canonical working project is `C:\Martin Archive\Programming\2026 Projects\PhotoPix`; the folder name is retained even though the public brand is Mentomory. The supplied monochrome doodle camera-m logo is the identity asset (public/mentomory-logo-v2.png). The current visual authority is [DESIGN.md](DESIGN.md), following the accepted [modernization brief](docs/design/MODERNIZATION-BRIEF.md) and [direction contract](docs/design/MODERNIZATION-CONTRACT.md). The previous concept is preserved as a historical reference.

Start on the home page with its centered hero, supplied logo, plain neutral page and illustrative photo-print composition. One Capture action enters `#/templates`, the first of three steps. There is no landing navbar. The locally generated grayscale sample artwork is labeled Illustrative sample captures; it is not a user's session or a testimonial. The home page has no interactive strip-design playground.

1. **Choose template — #/templates.** Browse 21 layouts in compact masonry for All or left-to-right rows when filtered. A labeled Photo count dropdown offers All layouts and 1/2/3/4/6/8/9 photos. Pick for me and layout search are removed. The selected-layout row provides Continue to camera.
2. **Capture photos — #/booth.** The camera leads between equally sized left tool and right photo panels. Both desktop sides use clamp(256px, 20vw, 320px). Stickers and Settings have independent native Stickers and Settings disclosures, initially closed and operated by click, Enter or Space. The icon-only shutter floats inside the camera frame, freeing vertical preview space. At >=900px width and >=420px height, the complete app fits 100dvh; smaller/shorter windows show the camera first and stack two equal 512px panels with internal overflow. The centered gallery uses image-overlay retakes on hover/focus, with always-visible touch controls. Continue and Start over use stacked full-width buttons. Capture replacement, locking, cancellation and media lifetime remain unchanged.
3. **Edit & download — `#/edit`.** After all required items are captured, Continue opens the final editor. The composed artifact leads; six keyboard-operated tabs reveal Frames, Backgrounds, Filters, Text, Stickers, or Layout. Compatible same-count layout changes synchronize the session template. Reversible choices have Undo/Redo with a 60-edit past-history bound, preserving past/future history through in-session navigation. Choosing a background and removing its frame form one atomic undoable edit.

Non-home pages share semantic step breadcrumbs. The current link uses `aria-current="step"`; capture is unavailable until Continue, and editing is unavailable until capture is complete. Available previous steps remain clickable. Captures and editor choices survive backtracking and browser history in memory. Returning to the template step after a capture shows the locked layout; A confirmed Start over is required to choose a different initial capture layout.

Choose None or one of 48 face-tracked effects from Fresh picks (12), Animals (8), Eyewear (7), Headwear (10), and Fun (11). Filter by category. Thumbnail, live overlay, and captured media use the same canvas artwork renderer. Effects are baked into each capture; switching between active effects retains the face-tracking worker.

In the final editor, choose a compatible layout with the same number of captures, eight original decorative frames plus No frame, 20 backgrounds, 20 photo filters, 11 surrounding border stickers plus None, and a caption of up to 32 characters. Photo mode downloads a JPG. Live mode records silent five-second H.264 MP4 clips, provides individual clip downloads and an animated editor preview, and creates a five-second composed MP4 with a JPG cover-photo download. MP4 availability depends on the browser's encoding and decoding capabilities; Photo remains available when Live is unsupported. Recording and export support cancellation. The editor shows separate full-size JPG and actual prepared MP4 dimensions (or its 1920px longest-side limit before creation). Download feedback reports a browser download request, without claiming the file was saved. Start over requires a confirmation dialog.

Output geometry is fixed per template and independent of webcam resolution. The base is 900 × 675px photo cells, 36px padding, 23px gaps, and a 126px caption footer. Square, Portrait, Polaroid, Film frames, and mixed-size layouts define their own frame geometry. Source media is center-cropped to fill each output frame. JPGs use the full template dimensions; composed MP4s preserve the template proportions, scale their longest side to at most 1920px, and use even pixel dimensions. Editor choices are applied through the shared strip renderer. Decorative frames inset photo openings while retaining the same fixed output dimensions. Finished editor strips display immediately without a printing animation. The template catalog supports an exact photo-count dropdown and clearable empty results; layout search is removed.

Photos, clips, and editor choices stay in browser memory and disappear on reload. Fresh or reloaded `#/booth` and `#/edit` URLs without session state return to `#/templates`. An in-session edit URL before capture completion returns to capture if Continue has already been used. Start over clears captures and editor choices, returns to step one, and leaves the camera off. Navigation away from capture cancels countdown/recording and stops camera tracks. Tracks also stop on completion, explicit cancellation, and unmount. No uploads, accounts, backend, or persistence are required. Face detection runs on the CPU in a browser worker with locally served MediaPipe 0.10.32 assets. Photo pixels, clips, and landmarks are never uploaded. Real-camera and mobile-device compatibility require device testing.


## Jeeliz face-sticker trial — 2026-10-12

Face stickers now offer Jeeliz (default) and the original MediaPipe tracker. Choose Face tracking in the Face stickers panel. Jeeliz uses local face-pose estimates for the existing 36 sticker artworks and automatically falls back to MediaPipe on initialization failure. See [implementation, manual checks and rollback](docs/design/JEELIZ-FACE-STICKERS.md). Existing layout and earlier documentation are retained.


## Modernization provenance — 2026-10-12

Only workflow passages relevant to the accepted redesign were refreshed. Their exact previous text, including earlier product/lifecycle descriptions, remains in [the complete pre-modernization PRODUCT.md](docs/design/archive/pre-modernization-2026-10-12/PRODUCT.md). Unrelated legacy product schema and tracker/init descriptions are not reconciled by this update. [Implementation and verification](docs/design/MODERNIZATION-IMPLEMENTATION.md) state the current evidence and manual-test limits.

The current [permanent panels and typography refinement](docs/design/PERMANENT-PANELS.md) supersedes the collapsible rail and documents camera sizing, floating controls, gallery behavior and validation. Prior documentation and source remain in the dated archive.


Current [collapsible tools and shutter cleanup](docs/design/COLLAPSIBLE-TOOLS.md) restores independent closed-by-default dropdown sections and removes shutter-label/shutter-timer. Prior source and documentation remain archived.


The floating shutter has a Paper-white circle, 2px Ink outline and Ink camera icon. Its positioning wrapper is transparent with no padded dark backdrop; label/timer text is removed.


On desktop and tablet windows at least900px wide and420px tall, camera and review fit the viewport. Review stays on the right and tools now overlay the camera. Narrower/shorter windows stack review below the camera.


The current [Fresh picks and scaling refinement](docs/design/FRESH-STICKERS.md) adds 12 original mixed accessories, normalizes artwork thumbnails, uses an800 × 640 (5:4) camera reference and wider256–320px side panels, and compacts controls without reducing44px targets. Earlier design records remain preserved.


Current organization: [camera corner tools](docs/design/CAMERA-CORNER-TOOLS.md) supersedes the separate left panel, uniform5:4 desktop frame and count-dependent gallery columns. The supplied images establish element organization only; their visual styling and photographic assets are not used.


[Supplied control icons](docs/design/PROVIDED-ICONS.md) now provide the Stickers, shutter and Settings artwork, centered within their controls. Jeeliz fallback reports its specific initialization failure and offers Retry Jeeliz instead of labeling every failure as an unsupported device.


Current capture behavior: [automatic capture and compact Settings](docs/design/AUTOMATIC-CAPTURE.md). Countdown Off captures one photo or live clip per shutter click. The 3 sec and 5 sec options fill the remaining layout automatically with a countdown before each capture. Individual thumbnail retakes are removed; Redo replaces and repeats the whole set. The supplied aperture shutter is white without a circular backing.
