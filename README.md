# Pixbooth

A browser photo booth with a monochrome grid interface, 21 photo layouts, 48 face effects and photo/live-strip customization. Captures and edits stay in browser memory; reloading clears the session.

## Canonical project

The application source is at `C:\Martin Archive\Programming\2026 Projects\PhotoPix`. Run development commands there. The OneDrive chat directory contains task artifacts, not a second application.

## Workflow

- **Home — `#/`:** illustrative sample prints, scrolling formats ribbon and open three-step instructions.
- **Choose layout — `#/templates`:** filter the 21 layouts by photo count, select a layout and continue. Selection locks after capturing media.
- **Capture — `#/booth`:** enable the camera, choose Photo or Live, and use Off / 3 sec / 5 sec countdown. With Countdown Off, each shutter press captures one photo or live clip. With 3 sec or 5 sec selected, one press captures the remaining set with a fresh countdown before each item. Cancellation preserves earlier captures. Redo clears the set, preserves camera/layout settings and reconnects the preview; it waits for another shutter press.
- **Customize — `#/edit`:** choose compatible layouts, frames, backgrounds, filters, captions and border artwork. Undo/Redo retains up to 60 edits during the session. Download the JPG, or create and download a composed five-second MP4 for live captures.

The editor requires completed captures. Direct capture/editor navigation without a session returns to Choose layout. Leaving capture stops camera tracks and cancels its countdown/recording. Start over confirms before discarding captured media or edits.

All four pages share the compact black copyright/credit footer. Portrait phone layouts stack controls; short landscape layouts use normal page flow. The marquee has a static reduced-motion alternative.

## Face tracking and media

MediaPipe `0.10.32` performs local face tracking in a worker. PixiJS `8.22.0` renders local sticker artwork with a Canvas2D fallback. Jeeliz is retired and no longer shipped.

Live mode records silent five-second H.264 MP4s at 20fps, subject to browser codec support. Captures are proportionally limited to 960×720px; composed MP4s retain template proportions with even dimensions and a longest side up to 1920px. JPG exports retain full layout dimensions. The app has no accounts, upload service or backend.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run setup:face
npm run dev -- --port 5173 --strictPort
npm test
npm run format:check
npm run build
npm run preview
```

Camera access requires permission and HTTPS or localhost. Face setup copies the pinned MediaPipe runtime and downloads the official model only if it is absent. Deploy `dist/` to an HTTPS static host. [THIRD_PARTY.md](THIRD_PARTY.md) records asset and dependency licenses.

## Design and implementation references

- [Design entry point](DESIGN.md)
- [Landing](docs/design/LANDING-DESIGN-CONCEPT.md)
- [Choose layout](docs/design/TEMPLATES-DESIGN-CONCEPT.md)
- [Capture](docs/design/BOOTH-DESIGN-CONCEPT.md)
- [Customize](docs/design/EDITOR-DESIGN-CONCEPT.md)
- [Responsive contract](docs/design/RESPONSIVE-DESIGN.md)
- [System audit and cleanup](docs/development/SYSTEM-AUDIT-2026-10-13.md)

`src/styles/index.css` loads base/feature styles, legacy shared layout rules in `modern.css`, route themes, responsive corrections, then the canonical footer and dialog action styles. Route-specific documents take precedence over dated historical notes.

The historical archive, reference and verification folders were removed from the project at the user's request; current route documentation remains authoritative. Physical-device camera, face alignment and native MP4 playback still require manual validation beyond mocked tests and viewport checks.

## Visitor analytics

Vercel Web Analytics is installed through @vercel/analytics 2.0.1. The React Analytics component is mounted once at the application root in src/main.jsx. Enable Analytics for the pixbooth project in the Vercel dashboard, deploy production, then visit the public website and inspect the Analytics dashboard. Local development does not provide production visitor data. No custom interaction events are configured.