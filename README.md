# PhotoPix

A React photo booth with seven single/strip/grid templates, webcam preview, 0/3/5-second countdown, mirrored captures, camera selection, live layout preview, and face stickers (None, Dog, Hat, Glasses). Capture one photo per click until the selected layout is complete. Stickers are baked into the photos. Then choose Start over or Submit to open the `#/edit` editor, select a background and photo filter, and download a JPG that matches the rendered preview.

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

For the current extension, browser checks passed at 1440 × 900, 1366 × 768, 1280 × 720, 1024 × 600, 390 × 844, and 320 × 740. Checks covered all seven fixed export dimensions, portrait face detection and all three overlays using the actual MediaPipe model, submission to the editor, background/filter JPG pixels, download, Back to booth, Start over, and no JavaScript errors. The production build and preview also passed checks for local MediaPipe worker loading, all three stickers, editor rendering, JPG download, and visible editor actions. Actual webcams and mobile browsers still need device testing.

The original OneDrive folder had file-creation problems with Node/npm. The project now runs from the local project location above. The original source folder is retained as a backup.

## Manual checks

- Allow camera access: confirm live preview, then capture with each countdown setting.
- Cancel a countdown: no photo should be captured afterward.
- Toggle mirror: preview and downloaded photo should have the same orientation.
- Choose Dog, Hat, or Glasses: confirm face tracking places the overlay correctly and the captured photo retains it. Choose None to capture without an overlay.
- Complete a template, select Submit, choose a background and filter, and download a JPG; verify it matches the editor preview, contains every photo in order, and preserves full frames at the dimensions above.
- At short desktop heights, scroll editor options and confirm download and Start over remain visible.
- Use Back to booth to review the completed session; reload `#/edit` and confirm the booth opens without the discarded photos.
- Start a new session: camera resumes, previous photos are discarded, and templates become selectable again.
- Deny permission, disconnect a webcam, and test a busy camera: verify recovery messages.
- If multiple cameras exist, switch between them and verify the old stream stops.
- Test Chrome/Edge desktop, Android Chrome, and iPhone Safari on actual devices over HTTPS.
