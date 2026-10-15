# Pixbooth dependencies and asset provenance

## Face tracking

Pixbooth uses Google's `@mediapipe/tasks-vision` version 0.10.32 (Apache-2.0). Runtime files in `public/mediapipe/wasm/` come from that pinned npm package. The `.mjs` copies append `export default ModuleFactory` for module-worker loading; original runtime files remain alongside them. Regenerate with `npm run setup:face`.

- [MediaPipe Face Landmarker documentation](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js)
- [MediaPipe project and license](https://github.com/google-ai-edge/mediapipe)
- [Face Landmarker float16 model, version 1](https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task)

The model is served from the application's static assets. CPU detection runs in a browser worker; photo pixels, clips, and landmarks are never uploaded.

## MP4 media processing

`mediabunny` version 1.61.3 is pinned in `package.json` and distributed under Mozilla Public License 2.0. The installed package includes `LICENSE`; retain its applicable notices when distributing the dependency. Pixbooth imports it through `src/lib/media/mp4-codec.js` for browser H.264 encoding, MP4 muxing, and clip decoding/composition in `src/lib/media/live-media.js`. Encoding capability is supplied by the browser.

- [MediaBunny project, source, and license](https://github.com/Vanilagy/mediabunny)
- [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)

MP4 processing occurs locally in browser memory. No media service or upload is used.

## Artwork, typography, and references

The supplied Pixbooth PNG is retained unchanged at `public/pixbooth-logo.png`; `src/components/common/Brand.jsx` displays it. It is user-provided identity artwork, not generated or replaced by this implementation.

The landing's project-local `public/landing-contact-sheet.webp` is a generated grayscale four-pose contact sheet of fictional adults, created with the built-in Image Generation tool. It is labeled Illustrative sample captures, not presented as a customer's session or testimonial. The shipped WebP is an optimized format conversion of the generated PNG without compositional changes. [Landing artwork provenance](docs/design/landing-artwork.md) preserves the exact prompt and implementation details; the original PNG is retained outside the project. The sample does not request camera access or enter a user's captured media.

The 36 face effects are authored canvas shapes in `src/lib/stickers/sticker-art.js`. Animals (8), Eyewear (7), Headwear (10), and Fun (11) share a renderer for thumbnail, live-overlay, and capture artwork. Switching between active effects retains the face-tracking worker. The 11 surrounding border motifs plus None and 20 background designs are authored rendering choices in `src/lib/collage.js`, with their catalogs in `src/data/`; they do not require externally sourced sticker images or icon packs.

DM Sans is bundled through `@fontsource/dm-sans`; the package's bundled license accompanies the font. The site currently imports weights 400, 500, and 700.

The four user-supplied images in `docs/design/references/` are retained as visual reference material. [DESIGN-CONCEPT.md](docs/design/DESIGN-CONCEPT.md) records their interpretation. They inspire hierarchy, geometry, and interaction treatment; no third-party UI code, product imagery, commerce features, or license is imported or inferred from a screenshot. Their accent colors are not the Pixbooth interface palette.

The additional `docs/design/references/landing-composition.png` is the user's structural reference for a centered hero and artifact arrangement. Its fonts, colors, interface assets, commerce content, and code are not adopted.

Test-only portrait fixtures and verification screenshots are not application assets.

## Original decorative frame artwork

Three original paper PNGs in public/frames were generated with the built-in imagegen tool for this project. The supplied style references were not used as image inputs or traced. Eight frames combine these textures with original canvas mounts, patterns and motifs in src/lib/frames/frame-art.js. No stock frame pack, third-party character artwork or new runtime dependency was added. [Frame artwork provenance and exact prompts](docs/design/frame-artwork.md) record the files and generation brief.

## User-supplied camera controls — 2026-10-12

The theater, camera and setting PNG files were supplied by the user and copied unmodified to public/icons. Provenance and checksums (historical file removed) record their mapping. No external asset download was used for these controls.

The aperture shutter artwork was also supplied by the user as shutter-camera.png and copied unmodified to public/icons/shutter-camera.png.

PixiJS 8.22.0 (MIT) is the lazily loaded WebGL sticker renderer. The existing local MediaPipe assets remain the active tracker. No new third-party sticker artwork was downloaded. [Runtime details](docs/design/MEDIAPIPE-PIXI-STICKERS.md).


## Plus Jakarta Sans — landing page

Bundled through @fontsource/plus-jakarta-sans 5.3.0 to match the user's portfolio reference. Copyright 2020 The Plus Jakarta Sans Project Authors. Licensed under the SIL Open Font License 1.1; the full license is distributed at public/licenses/plus-jakarta-sans-OFL.txt. This font is used across the landing page, Choose layout, Capture, Customize and shared footer.

DM Sans font distributions include the full SIL Open Font License in public/licenses/dm-sans-OFL.txt, so the notice is present in deployed dist/ assets as well as the development dependency.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.

## Original scrapbook expansion — 2026-10-14

The fifteen new scrapbook frame themes use twenty original assets generated with the built-in ImageGen tool: fifteen transparent sticker atlases and five paper textures. Generated originals are preserved, and WebP files under public/frames retain alpha transparency. User-supplied reference photographs, text and logos are not application assets. Ten background patterns are authored in canvas code. [Collection and provenance](docs/design/SCRAPBOOK-FRAMES.md), [exact prompts](docs/design/scrapbook-frames-generation.json).

Vercel Web Analytics uses @vercel/analytics 2.0.1 (MIT), mounted through its React component. The package's license is retained in node_modules/@vercel/analytics/LICENSE.
