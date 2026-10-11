# Project structure

Pixbooth separates page composition, UI components, stateful hooks, static catalogs, rendering utilities, workers, and styles.

```text
src/
├── App.jsx                  # Selects the current page and renders the app shell
├── main.jsx                 # React entry point, bundled fonts, stylesheet entry
├── pages/
│   ├── landing/             # LandingPage.jsx and landing styles
│   ├── templates/           # TemplatesPage.jsx and selection styles
│   ├── capture/             # CapturePage.jsx and capture-mode styles
│   └── editor/              # EditorPage.jsx and editor layout styles
├── components/
│   ├── common/              # Brand, Icon, Chevron, TemplateMini
│   ├── layout/              # WorkflowSteps and Footer
│   ├── landing/             # Hero, showcase, sample print, formats, instructions
│   ├── templates/           # Catalog, individual choice, selected-layout summary
│   ├── capture/             # Camera, gallery, face stickers, settings, actions, feedback
│   └── editor/              # Preview, original frames, controls, downloads
├── hooks/
│   ├── useBoothSession.js   # Owns the capture session above the pages
│   ├── useCamera.js         # Webcam lifecycle, device selection, disconnection
│   ├── usePhotoCapture.js   # Countdown, still capture, five-second live recording
│   ├── useWorkflow.js       # Hash routes, guards, focus, navigation cleanup
│   ├── useFaceStickers.js   # Face-tracking worker and overlay lifecycle
│   └── useStripEditor.js    # Editing choices, preview output, export lifecycle
├── data/                    # Templates, original frames, backgrounds, filters, decorations
├── lib/
│   ├── collage.js           # Fixed geometry, crops, strip painting, JPG composition
│   ├── cameraError.js       # Browser camera error messages
│   ├── media/              # Live composition and lazy MP4 dependency adapter
│   ├── frames/             # Cached original papers, mounts, motifs, photo apertures
│   └── stickers/           # Shared face-effect canvas artwork
├── workers/                 # MediaPipe face inference worker
└── styles/                  # Ordered stylesheet entry, shared styles, theme, responsiveness
```

## Ownership and component boundaries

`App.jsx` calls `useBoothSession` once. Its session survives page changes, retaining captures and editing choices while the user follows the breadcrumbs. Keep session ownership above the pages; moving it into `CapturePage` would discard captures when that page unmounts.

Pages compose feature components. UI components receive data and callbacks; camera, recording, routing, rendering, and export lifecycles belong in hooks or utilities. Capture and editor components do not start their own independent sessions. Worker code stays under `workers/`, with its URL resolved relative to the tracking hook through Vite.

Static option lists live under `data/`. Canvas and media utilities under `lib/` are independent of React. Public identity assets, licensed runtime assets, and the landing contact sheet remain in `public/`.

## JSX and CSS

Each component has its own JSX file. Page and feature styles are placed beside their owning page/component where practical. Shared controls, feedback, responsive layout, and the monochrome theme belong under `styles/`.

`main.jsx` loads `styles/index.css` once. That file imports the focused stylesheets in the established cascade order, ending with the shared monochrome theme. Keep this ordering when adding styles; importing the same global CSS again from individual components can change overrides. Layout and visual tokens remain governed by `DESIGN.md` and `docs/design/DESIGN-CONCEPT.md`.

## Formatting and maintenance

Run `npm run format` to format source files and `npm run format:check` to check them. Prettier is pinned as a development dependency; `.prettierrc.json` records the formatting rules. Run `npm run build` after moving components or changing imports.

Add a new UI section as a feature component, a new stateful lifecycle as a hook, and a new static option list under `data/`. Keep page files focused on composition rather than accumulating capture logic or editor controls.
