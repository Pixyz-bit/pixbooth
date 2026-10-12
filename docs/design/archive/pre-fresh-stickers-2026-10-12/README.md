# Pixbooth

A React browser booth for photos and five-second live clips, with 21 layouts, 36 face effects plus None, eight original decorative frames, 20 backgrounds, 20 filters, 11 border-sticker designs plus None, and a custom caption.

The current interface follows the accepted modern monochrome [brief](docs/design/MODERNIZATION-BRIEF.md) and [direction contract](docs/design/MODERNIZATION-CONTRACT.md). [DESIGN.md](DESIGN.md) owns current tokens and [.impeccable/design.json](.impeccable/design.json) carries component metadata. The prior neobrutalist guide remains historical in [DESIGN-CONCEPT.md](docs/design/DESIGN-CONCEPT.md). The supplied logo, bundled DM Sans, artwork, and source media keep their identity and colors.

## Workflow

Open #/ for the centered home hero and illustrative sample prints, then Capture to enter the three-step flow. Classic strip is selected initially.

1. **Choose template — #/templates.** Browse 21 layouts in compact masonry for All or left-to-right rows when filtered. A labeled Photo count dropdown offers All layouts and 1/2/3/4/6/8/9 photos. Pick for me and layout search are removed. The selected-layout row provides Continue to camera.
2. **Capture photos — #/booth.** The camera leads between equally sized left tool and right photo panels. Both desktop sides use clamp(224px, 15vw, 288px). Stickers and Settings have independent native Stickers and Settings disclosures, initially closed and operated by click, Enter or Space. The icon-only shutter floats inside the camera frame, freeing vertical preview space. At >=900px width and >=420px height, the complete app fits 100dvh; smaller/shorter windows show the camera first and stack two equal 512px panels with internal overflow. The centered gallery uses image-overlay retakes on hover/focus, with always-visible touch controls. Continue and Start over use stacked full-width buttons. Capture replacement, locking, cancellation and media lifetime remain unchanged.
3. **Edit & download — #/edit.** View the fitted composed artifact; use Frames, Backgrounds, Filters, Text, Stickers, or Layout tabs. Undo/Redo preserves up to 60 past edits through in-session backtracking. Choosing a background removes its frame in one undoable action. Same-count editor layout changes synchronize the session's selected layout. Download JPG or create/download the composed live MP4 with separate accurate dimensions and request feedback. Start over asks before discarding the session.

Step navigation sits in the logo/Home row and highlights current and completed steps; available previous steps remain reachable. Initial layout and capture mode lock after the first capture. Captures, editor choices, and edit history remain in browser memory until reset/reload. Reloaded capture/edit routes without a session return to templates. Leaving capture cancels countdown/recording and stops camera tracks; completion and cancellation also clean up media resources.

Face effects preserve category filtering, None/Clear sticker, the existing renderer, and Jeeliz with MediaPipe fallback. The eight authored decorative frames and all creative catalogs remain. Photo pixels, clips, and face landmarks stay local; the app has no account, upload, backend, or storage requirement.

## Media and export

Template geometry remains in src/lib/collage.js; media rendering and codecs remain in src/lib/media/. JPG exports retain full fixed layout dimensions and centered source crops. Live captures are silent five-second H.264 MP4 clips at 20fps, proportionally limited to 960 × 720px with even dimensions. Composed MP4s preserve template proportions, use even dimensions, and limit the longest side to 1920px. Browser encoding/decoding support controls availability. Progress, cancellation, playback, individual downloads, and JPG covers remain available.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run setup:face
npm run dev
npm test
npm run format:check
npm run build
npm run preview
```

The face setup copies pinned MediaPipe 0.10.32 assets and downloads its model if absent; subsequent processing serves local assets. Camera use requires permission and HTTPS or localhost. Deploy dist/ to an HTTPS static host. [THIRD_PARTY.md](THIRD_PARTY.md) records dependency and asset provenance.

Pages compose JSX components; hooks own state and lifecycle; catalogs are in src/data/, renderers in src/lib/, and face inference in src/workers/. src/styles/index.css loads base/feature styles and appends src/styles/modern.css last as current visual authority. Historical theme/responsive/workflow-responsive/interactions sheets are retained but no longer imported. [Project structure](docs/development/PROJECT-STRUCTURE.md) records the original separation; the modernization implementation document records current changes.

## Project location

The sole canonical working project is C:\Martin Archive\Programming\2026 Projects\PhotoPix. Run commands and make changes there. The previous OneDrive application files were deleted at the user's request and must not be recreated. The public brand remains Pixbooth and the package name remains photopix.

The [masonry and capture-grid refinement](docs/design/LAYOUT-REFINEMENT.md) records the follow-up layout changes, preservation snapshot, and checks.

The [viewport-fit refinement](docs/design/VIEWPORT-FIT.md) records the compact header, removal of layout search, fixed camera ratio, sizing rules, and verification limits.

The [capture-focus refinement](docs/design/CAPTURE-FOCUS.md) records the dedicated full-viewport section and relocated controls, superseding the previous app-wide viewport sizing.

The [filtered-layout correction](docs/design/FILTERED-LAYOUTS.md) records how photo-count results spread horizontally while All retains masonry.

The current [camera-first implementation](docs/design/CAMERA-FIRST.md) supersedes the full-screen capture-section experiment: shutter below the camera, native right-side collapsible tools, and compact review. Earlier layout records remain dated history.

The preceding [left tools and compact catalog refinement](docs/design/LEFT-TOOLS-COMPACT-TEMPLATES.md) supersedes the preceding right-side tools. Smaller cards and more columns reduce catalog height while preserving all layouts.

## Current validation and manual checks

[MODERNIZATION-IMPLEMENTATION.md](docs/design/MODERNIZATION-IMPLEMENTATION.md) records current checks, changed files, bug fixes, and limitations; [verification JSON](docs/design/verification/modernization-checks.json) records exact machine results. Earlier browser results below apply only to their dated implementations. That dated pass was source-only because preview access was restricted. With the user’s subsequent simulation authorization, current browser access succeeded through the official tool: desktop 1440 × 900 and phone 375 × 812 UI checks are recorded in PERMANENT-PANELS.md. All 23 tests, production build and formatting passed. Capture lifecycle simulation is mocked source testing; physical camera, tracking and actual exports remain unverified.

Manual follow-up should cover requested viewport widths, sticky-action coverage, keyboard tabs and dialog focus return, camera permission/off/on/device switching, countdown/recording cancellation, successful and failed individual retakes, state/backtracking/history, reset confirmation, tracking overlay alignment, and preview/export agreement. Test physical desktop/mobile cameras and actual JPG/MP4 downloads over HTTPS.


The current [permanent panels and typography refinement](docs/design/PERMANENT-PANELS.md) supersedes the collapsible rail and documents camera sizing, floating controls, gallery behavior and validation. Prior documentation and source remain in the dated archive.


Current [collapsible tools and shutter cleanup](docs/design/COLLAPSIBLE-TOOLS.md) restores independent closed-by-default dropdown sections and removes shutter-label/shutter-timer. Prior source and documentation remain archived.


The floating shutter has a Paper-white circle, 2px Ink outline and Ink camera icon. Its positioning wrapper is transparent with no padded dark backdrop; label/timer text is removed.


On desktop and tablet windows at least 900px wide and 420px tall, tools stay pinned to the left and captured moments to the right of the camera. The app fits the viewport; overflow stays inside each panel. Narrower or very short windows retain the stacked camera-first fallback.

## Historical README before modernization — 2026-10-12

The complete prior README follows verbatim for provenance. Its visual descriptions, former OneDrive staging location, and browser results describe earlier versions; they do not override the current project location, design, or validation scope.

````markdown
# Pixbooth

A React browser booth for photos and five-second live clips, with a centered landing page and illustrative sample photos, 21 templates, 36 face effects plus None, and an editor with eight original decorative frames, 20 backgrounds, 20 filters, 11 border-sticker designs plus None, and a custom caption.

The authoritative site-wide visual guide is [docs/design/DESIGN-CONCEPT.md](docs/design/DESIGN-CONCEPT.md). [DESIGN.md](DESIGN.md) is its compact token entry point. Pixbooth uses the supplied PNG logo and a black-and-white neobrutalist interface. Creative media and user-selected strip artwork retain their colors.

## Workflow

Open `#/` for the home page. Its centered hero places the supplied logo above the headline on a subtle monochrome grid, with one Capture action and locally generated grayscale photo-print artwork labeled Illustrative sample captures. There is no landing navbar. Capture starts white, turns black on hover, and enters the template step at `#/templates`; the interactive landing playground has been removed. [Landing artwork provenance](docs/design/landing-artwork.md) records the exact generation prompt and local asset.

1. **Choose template — `#/templates`.** Search or filter the 21-layout grid by photo count, use Pick for me, review its selected-layout diagram and capture count, then choose Continue to capture. Classic strip is selected initially.
2. **Capture photos — `#/booth`.** Choose Photo or Live mode and enable the webcam. The sidebar contains face stickers; the main camera, two-column individual-media gallery, and collapsible photo settings occupy the capture workspace. Capture one item per click with a 0/3/5-second countdown. The camera contains the full source frame; gallery crops follow template frame proportions. The capture template and mode lock after the first item.
3. **Edit & download — `#/edit`.** Submit becomes available after the required captures. Use compatible layouts and finishing controls, then download the result.

Non-home pages share the supplied Pixbooth logo and step breadcrumbs with `aria-current="step"` in the workflow navigation. The logo links home, and breadcrumbs wrap below it on narrow screens. Capture is unavailable until Continue, and editing is unavailable until the session is complete. Previous steps remain clickable; captures and editor choices survive backtracking and browser history in memory. Returning to step one after a capture keeps the template locked.

Search the 36 face effects by name or category: Animals (8), Eyewear (7), Headwear (10), and Fun (11). Choose None or Clear sticker to remove an effect. Thumbnail, live-overlay, and capture artwork share one renderer; active-effect changes retain the face-tracking worker. Effects are baked into photos and clips.

When the session is complete, Start over discards it or Submit opens `#/edit`. Switch among layouts with the same capture count, then choose an original frame, background, filter, border-sticker design, and caption of up to 32 characters. Frame artwork applies to JPG and composed MP4 exports; choosing a background removes the frame. Finished strips display immediately without a printing animation. [Frame artwork and exact generation prompts](docs/design/frame-artwork.md) document the original assets. Photo sessions download JPGs. Live sessions provide individual MP4 clip downloads, a playing/paused composed preview, an MP4 creation action with progress and cancellation, and a JPG cover-photo download.

Photos, clips, and editor choices stay in browser memory and disappear on reload. Fresh or reloaded `#/booth` and `#/edit` URLs without a session return to `#/templates`. Start over clears captures and editor choices, returns to step one, and leaves the camera off. Leaving capture cancels countdown/recording and stops camera tracks; the camera also stops on completion, explicit cancellation, and unmount. Media and face landmarks are never uploaded.

## Templates and export geometry

| Capture count | Compatible templates |
| --- | --- |
| 1 | Single, Polaroid, Portrait, Square |
| 2 | Duo strip, Duo row, Square duo |
| 3 | Trio strip, Trio row, Story trio |
| 4 | Classic strip, Four grid, Hero + three, Square four, Film frames |
| 6 | Six strip, Six grid, Six landscape, Contact sheet |
| 8 | Eight grid |
| 9 | Nine grid |

`src/lib/collage.js` owns template geometry. The base uses 900 × 675px cells, 36px padding, 23px gaps, and a 126px caption footer. Square variants and Contact sheet use 900px cell height; Portrait uses 1200px; Polaroid adds 72px padding and a 270px footer; Film frames uses 90px padding and 36px gaps. Story trio and Hero + three span cells for mixed-size frames.

JPG dimensions remain fixed per template, independent of camera resolution. Each source is center-cropped to fill its frame. Background, filter, border motifs, and caption pass through the same strip renderer for the editor and export. The original seven layouts retain their sizes: Single 972 × 873px; Duo strip 972 × 1571px; Trio strip 972 × 2269px; Classic strip 972 × 2967px; Four grid 1895 × 1571px; Six strip 972 × 4363px; Six grid 1895 × 2269px.

## Live MP4

Live mode records silent five-second clips at 20fps. MediaBunny 1.61.3 encodes H.264 into an actual MP4 container in the browser; WebM data is not relabeled. Capture scales proportionally to at most 960 × 720px with even dimensions. A composed live strip preserves template proportions and scales its longest side to at most 1920px, also using even dimensions.

Live is enabled only when the browser reports compatible H.264 encoding. Export also needs decoding support for the captured clips. An unavailable capability produces recovery copy and leaves Photo mode available. Hiding the tab cancels recording; recording/export controls support cancellation. No microphone or audio track is recorded.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run setup:face
npm run dev
```

`setup:face` copies the pinned MediaPipe 0.10.32 runtime and downloads the versioned Face Landmarker model if absent. Run it before the first server or build. Assets are then served locally from `public/mediapipe/`. [THIRD_PARTY.md](THIRD_PARTY.md) records dependency and asset provenance.

Open Vite's localhost URL. Camera access needs permission and HTTPS or localhost. A plain HTTP LAN address cannot provide mobile camera access.

```sh
npm run build
npm run preview
```

Deploy `dist/` to an HTTPS static host. No backend, credentials, or database are required.

## Source organization

Pages compose individual JSX components. Hooks own the camera, capture, routing, and editor lifecycles; static catalogs live in `src/data/`, rendering utilities in `src/lib/`, and face inference in `src/workers/`. Focused page/component CSS and shared styles are loaded once through `src/styles/index.css` in the established cascade order.

[Project structure and maintenance guide](docs/development/PROJECT-STRUCTURE.md) explains the folders and state ownership. Run `npm run format` to format source files or `npm run format:check` to check them.

## Project location

The canonical working project is `C:\Martin Archive\Programming\2026 Projects\PhotoPix`. Run development/build commands there. The original `C:\Users\arlan\OneDrive\ドキュメント\ChatGPT\PhotoPix` folder is retained for staged source/document changes after earlier Node/npm file-creation problems. The public brand is Pixbooth; the canonical folder and npm package name remain PhotoPix/photopix.

## Verification

Earlier browser checks passed the photo workflow, the original seven export dimensions, actual MediaPipe portrait detection and 36 effect previews, worker reuse, centered gallery/export crops, editor choices, JPG download, cancellation, and camera cleanup. Those checks used simulated camera input and do not establish physical-camera compatibility.

The expanded implementation passed simulated-camera Chrome checks for home/booth/editor routes and logo display; all 21 fixed template geometries; the 21/20/20/12 layout/background/filter/border-choice counts; recording cancellation; a playable five-second 640 × 480px H.264 MP4 clip; and a decorated five-second 972 × 872px live-strip MP4 whose frames change during playback. Unsupported-MP4 fallback, denied-camera recovery, and direct `#/edit` recovery passed. Desktop layouts fit at 1366 × 768 and 1024 × 600, and 390px mobile had no horizontal overflow. Browser checks reported no JavaScript errors; eight desktop/mobile home, booth, editor, and live-editor screenshots were reviewed. These results use simulated input and do not establish physical-camera or mobile-browser compatibility.

The expanded-feature production build passed (116 modules) with the MP4 dependency loaded in a separate lazy chunk and no chunk warnings.

The earlier landing refinement, before the later navbar removal and sequential workflow, passed its production build and browser smoke checks for asset decoding, compact layouts, focus, and navigation. Its screenshots are saved in `.impeccable/review/landing-refresh-{1366,768,390,320}.png`.

The three-step workflow passed its production build (118 modules) and automated checks for all 21 templates, reload route guards, photo/live and composed-MP4 export, captured-media/editor-state preservation, browser history, and countdown/recording cancellation with the camera off after navigation. Nine desktop/compact/mobile screen checks confirmed height fit at 1366 × 768 and 1024 × 600, no horizontal overflow at 390 × 844, and no JavaScript errors. Actual webcams and mobile browsers still need device testing.

## Frame update validation

The original-frame update passed production build and formatting checks. Static geometry checks cover all decorative styles across the 21 layouts, and the generated PNG files are checked in the production output. No camera or capture simulation was used for this update.

## Manual checks

The later hero refinement removes the navbar, centers the logo above the heading, adds a 32px monochrome landing grid, and makes Capture white by default and black on hover. The production build passed; the in-app page confirmed the hero logo, absent navbar, default button colors, grid, and no horizontal overflow.

- Check the centered hero, grid, sample-capture label, and single Capture action; confirm it opens the template catalog with Classic strip initially selected.
- Select a template, Continue, and confirm breadcrumb availability/current-step semantics. After capturing, backtrack through previous steps and browser history; verify captures, locked capture layout, and editor choices survive.
- Confirm Photo and Live selection, template/mode locking, countdown cancellation, and Start over returning to step one with cleared captures/editor choices and camera off.
- Search every face-effect category, recover from empty results, and compare thumbnail/live/captured artwork.
- Check template collections, sticker scrolling, open/closed disclosures, and visible actions at compact desktop heights.
- Capture templates with square, portrait, mixed-size, and eight/nine-frame geometry; verify same-count editor choices and centered crops.
- Change backgrounds, filters, border artwork, and caption; confirm JPG preview/export agreement.
- Record five-second clips, cancel recording, hide the tab, and verify camera shutdown and error recovery.
- Create a live strip, play/pause preview, cancel export, and verify MP4 duration, playable H.264 video, frame geometry, selected artwork, and JPG cover download.
- Open or reload `#/booth` and `#/edit` without a session and confirm both return to `#/templates`. Leave capture during countdown/recording and confirm cancellation and camera shutdown; test denied permission, disconnected/busy cameras, and multiple-device switching.
- Test actual desktop and mobile devices over HTTPS. Check keyboard focus, reduced motion, and the concept's black/white chrome separately from colorful media.


## Jeeliz face-sticker trial — 2026-10-12

Face stickers now offer Jeeliz (default) and the original MediaPipe tracker. Choose Face tracking in the Face stickers panel. Jeeliz uses local face-pose estimates for the existing 36 sticker artworks and automatically falls back to MediaPipe on initialization failure. See [implementation, manual checks and rollback](docs/design/JEELIZ-FACE-STICKERS.md). Existing layout and earlier documentation are retained.
````
