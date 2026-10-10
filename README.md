# PhotoPix

A React photo booth with seven single/strip/grid templates, webcam preview, 0/3/5-second countdown, mirrored captures, camera selection, an individual captured-photo gallery, and 36 searchable face-tracked effects plus None. Capture one photo per click until the selected session is complete. Effects are baked into the photos. Then choose Start over or Submit to open the `#/edit` editor, select a compatible layout, background, and photo filter, and download a JPG that matches the rendered preview.

The logo sits inside the camera panel above Camera preview. The camera fills the flexible center column and preserves the full source frame. Captured shots appear individually at right; strip composition starts in the editor after Submit. The capture template locks after the first shot, but the editor allows layouts with the same photo count: four-photo sessions can switch between Classic strip and Four grid; six-photo sessions can switch between Six strip and Six grid.

Face effects are grouped into Animals (8), Eyewear (7), Headwear (10), and Fun (11). Search by name, filter by category, or select None/Clear sticker. Picker thumbnails, live overlays, and captured effects share the same canvas renderer. Switching between active effects keeps the face-tracking worker loaded.

Photos remain in browser memory and disappear on reload. A direct visit or reload at `#/edit` without a completed session returns to the booth. Photos and face landmarks are never uploaded. The camera stops when the layout is complete or explicitly turned off. Face detection uses a CPU browser worker and locally served MediaPipe 0.10.32 runtime/model assets.

Export uses fixed 900 × 675px photo cells, 36px outer padding, 23px gaps, and a 126px branding footer, independent of webcam resolution. Full camera frames are letterboxed within the cells. The editor offers Classic black, Paper white, Blush, Sky blue, Checkerboard, and Confetti backgrounds, plus Original, Black & white, Vintage, Warm, Cool, and Soft photo filters.

| Template | JPG dimensions |
| --- | --- |
| Single | 972 × 873px |
| Duo strip | 972 × 1571px |
| Trio strip | 972 × 2269px |
| Classic strip | 972 × 2967px |
| Four grid | 1895 × 1571px |
| Six strip | 972 × 4363px |
| Six grid | 1895 × 2269px |

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run setup:face
npm run dev
```

`setup:face` copies the pinned MediaPipe runtime from the npm package and downloads the versioned Face Landmarker model if absent. Run it before the first development server or production build. Runtime assets are then served from `public/mediapipe/`; see [THIRD_PARTY.md](THIRD_PARTY.md) for provenance and licensing and `scripts/setup-face-assets.mjs` for the reproducible setup.

Open the localhost URL printed by Vite. Camera access needs permission and HTTPS or localhost. A plain HTTP LAN address on a phone cannot access the camera; use an HTTPS deployment for mobile testing.

```sh
npm run build
npm run preview
```

Deploy `dist/` to an HTTPS static host. No backend, credentials, or database are required.

## Project location

The primary project is `C:\Martin Archive\Programming\2026 Projects\PhotoPix`. Start Vite from this directory with `npm run dev`.

## Verification in this workspace

Earlier automated Chrome checks passed with a simulated webcam for template selection and locking, countdown cancellation, camera shutdown after completion, new session, single-photo capture, and permission denial.

The earlier editor extension passed browser checks at 1440 × 900, 1366 × 768, 1280 × 720, 1024 × 600, 390 × 844, and 320 × 740. Checks covered all seven fixed export dimensions, portrait face detection and the original three overlays using the actual MediaPipe model, submission to the editor, background/filter JPG pixels, download, Back to booth, Start over, and no JavaScript errors. That production build and preview also passed checks for local MediaPipe worker loading, those three stickers, editor rendering, JPG download, and visible editor actions.

The latest production build passed flexible camera and disclosure checks at 1920 × 1080, 1366 × 768, 1280 × 720, 1024 × 600, 768 × 1024, and 390 × 844, with no horizontal overflow and no page scrolling at the tested desktop sizes. Browser checks confirmed all 36 distinct effect previews plus None, search/categories and empty-search recovery, actual MediaPipe tracking and worker reuse between effects, four individual captures, and sticker pixels baked into the JPG. Submission, compatible editor layout switching, background/filter export pixels, download, Back to booth, and Start over passed with no JavaScript errors. Actual webcams and mobile browsers still need device testing.

The original OneDrive folder had file-creation problems with Node/npm. The project now runs from the local project location above. The original source folder is retained as a backup.

## Manual checks

- Allow camera access: confirm live preview, then capture with each countdown setting.
- Cancel a countdown: no photo should be captured afterward.
- Toggle mirror: preview and downloaded photo should have the same orientation.
- Search the 36 effects and filter each category. Confirm None remains available, Clear sticker removes the effect, and an empty search can return to all stickers.
- Switch between active effects: confirm face tracking continues without reloading the model, thumbnails match the live artwork, and captured photos retain the chosen effect. Check effects from every category and choose None to capture without an overlay.
- Confirm each capture appears individually in Captured photos; the composed strip first appears after Submit.
- Submit four- and six-photo sessions, switch between their compatible strip/grid layouts, and confirm photo order and fixed dimensions.
- Complete a template, select Submit, choose a background and filter, and download a JPG; verify it matches the editor preview, contains every photo in order, and preserves full frames at the dimensions above.
- At short desktop heights, scroll the template and sticker collections as needed and confirm camera/actions fit. Scroll editor options and confirm download and Start over remain visible.
- Use Back to booth to review the completed session; reload `#/edit` and confirm the booth opens without the discarded photos.
- Start a new session: camera resumes, previous photos are discarded, and templates become selectable again.
- Deny permission, disconnect a webcam, and test a busy camera: verify recovery messages.
- If multiple cameras exist, switch between them and verify the old stream stops.
- Test Chrome/Edge desktop, Android Chrome, and iPhone Safari on actual devices over HTTPS.
