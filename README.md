# PhotoPix

A React photo booth with seven single/strip/grid templates, webcam preview, 0/3/5-second countdown, mirrored captures, camera selection, live layout preview, and JPG download. Capture one photo per click until the selected layout is complete. Photos remain in browser memory and are never uploaded. The camera stops when the layout is complete or explicitly turned off. Export uses up to 900px per photo slot, preserves the full camera frame, and adds a black PhotoPix border.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. Camera access needs permission and HTTPS or localhost. A plain HTTP LAN address on a phone cannot access the camera; use an HTTPS deployment for mobile testing.

```sh
npm run build
npm run preview
```

Deploy `dist/` to an HTTPS static host. No backend, credentials, or database are required.

## Project location

The primary project is `C:\Martin Archive\Programming\2026 Projects\PhotoPix`. Start Vite from this directory with `npm run dev`.

## Verification in this workspace

The production build passed in the new project folder. Automated Chrome checks passed with a simulated webcam: template selection and locking, countdown cancellation, four-photo strip capture/export (972 × 2967 JPG), camera shutdown after completion, new session, single-photo capture, permission denial, and no horizontal overflow at 768/390/320px. Camera shadow was verified as absent across desktop/mobile. Desktop, mobile, and completed-layout screenshots were inspected. Actual webcams and mobile browsers still need device testing.

The original OneDrive folder had file-creation problems with Node/npm. The project now runs from the local project location above. The original source folder is retained as a backup.

## Manual checks

- Allow camera access: confirm live preview, then capture with each countdown setting.
- Cancel a countdown: no photo should be captured afterward.
- Toggle mirror: preview and downloaded photo should have the same orientation.
- Complete a template and download a JPG; verify it contains every photo in order and preserves full frames.
- Start a new session: camera resumes, previous photos are discarded, and templates become selectable again.
- Deny permission, disconnect a webcam, and test a busy camera: verify recovery messages.
- If multiple cameras exist, switch between them and verify the old stream stops.
- Test Chrome/Edge desktop, Android Chrome, and iPhone Safari on actual devices over HTTPS.
