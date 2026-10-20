<p align="center">
  <img src="public/mentomory-logo-v4.png" alt="Mentomory" width="300" />
</p>

# Mentomory

**Turn your smiles into keepsakes.**

Bring your best face, strike a pose, and make something worth keeping. Mentomory turns your browser into a photo booth for creating photo strips, grids, Polaroid-style prints, and animated flipbooks—with playful face effects and finishing touches that make them yours.

**[Try Mentomory →](https://mentomory.pixyzbit.dev)**

## What you can make

- **Photo strips and prints:** choose from 21 layouts, including classic strips, grids, and single-photo keepsakes.
- **Animated flipbooks:** capture silent seven-second live clips and export a composed MP4.
- **Playful portraits:** try 48 face effects with local face tracking.
- **Your own style:** add frames, backgrounds, filters, captions, and decorative stickers.
- **A take-home keepsake:** download JPG photos or MP4 live strips.

The interface adapts to desktop and mobile, with keyboard-accessible controls and reduced-motion support.

## Snap. Style. Save.

1. **Choose a layout.** Browse the collection or filter by photo count, then select your favorite.
2. **Capture your photos.** Enable your camera, choose Photo or Live, and pose. Use Countdown Off for individual captures, or a three- or five-second countdown to capture the remaining set automatically.
3. **Make it yours.** Customize your keepsake, undo or redo your edits, and download the result.

No account needed. Just you, your camera, and a little creativity.

## Your photos stay with you

Photos, clips, face tracking, and editing are processed in your browser. Mentomory does not upload your captured media to a photo-storage service.

Your captures and edits live in the current browser session. **Download anything you want to keep before refreshing or closing the page.**

The project includes Vercel Web Analytics and PostHog for visitor and usage analytics. PostHog session recording is disabled; media processing remains local.

## Built with

| Technology | Purpose |
| --- | --- |
| React + Vite | Interface and development tooling |
| MediaPipe | Face tracking in a browser worker |
| PixiJS | Face-effect rendering, with a Canvas2D fallback |
| MediaBunny + browser media APIs | MP4 recording and composition |
| CSS | Responsive monochrome interface |
| Vercel | Static hosting and production deployments |

## Run locally

### Requirements

- Node.js 20.19+ or 22.12+.
- npm.
- A camera and a browser with camera access enabled.

### Setup

```sh
git clone https://github.com/Pixyz-bit/pixbooth.git
cd pixbooth
npm install
cp .env.example .env.local
```

Set these values in `.env.local` using your PostHog project's settings:

```dotenv
VITE_POSTHOG_KEY=your_posthog_project_key
VITE_POSTHOG_HOST=your_posthog_ingestion_url
```

The current development configuration requires both values and displays an error if either is missing. Variables prefixed with `VITE_` are included in the browser bundle; use the project key, not a personal API token.

Prepare the face-tracking assets and start the development server:

```sh
npm run setup:face
npm run dev
```

Open **[localhost:5174](http://localhost:5174)**. Vite may choose another port if 5174 is occupied; check the terminal output.

The face setup command copies the pinned MediaPipe runtime and downloads the official face model if it is missing. Its first run requires an internet connection.

Camera access requires **HTTPS or localhost** and your browser's permission. Live recording and MP4 export depend on browser codec support; Photo mode remains available when Live is unsupported.

## Development commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run setup:face` | Prepare local face-tracking assets |
| `npm test` | Run the automated tests |
| `npm run format:check` | Check source formatting |
| `npm run format` | Format the source files |
| `npm run build` | Build the site, prerender public pages, and validate SEO output |
| `npm run preview` | Preview the production build locally |

## Deploy

Run `npm run build` and publish the generated `dist/` directory to an HTTPS static host. The repository includes `vercel.json` with the route rewrites used by the live Vercel deployment.

The home page and layout catalog are prerendered for search engines. Capture and editing pages require an active session and are marked `noindex`. The build also generates a sitemap and `robots.txt`.

The public origin is configured in [`src/data/seo.js`](src/data/seo.js). Update it if deploying to a different domain.

## Explore the project

- [`src/components/`](src/components/) — reusable interface components.
- [`src/pages/`](src/pages/) — home, layout selection, capture, and customization screens.
- [`src/hooks/`](src/hooks/) — session, camera, capture, and editing behavior.
- [`src/lib/`](src/lib/) — rendering, media processing, and shared utilities.
- [`public/`](public/) — artwork, fonts, face-tracking assets, and other static files.
- [`tests/`](tests/) — automated checks for capture, workflow, rendering, and SEO.
- [`DESIGN.md`](DESIGN.md) — interface design decisions and component guidance.

## Credits and acknowledgments

Made by **.dcd**.

The landing page's sample photos are illustrative images of fictional people, not user captures or customer testimonials. See [landing artwork provenance](docs/design/landing-artwork.md) for details.

Dependency licenses, font notices, and artwork credits are documented in [`THIRD_PARTY.md`](THIRD_PARTY.md).
