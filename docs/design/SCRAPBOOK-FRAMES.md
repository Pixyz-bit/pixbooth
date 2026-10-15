# Pixbooth scrapbook frames — 2026-10-14

Fifteen new original frame designs extend the existing eight. Select them in Customize → Frames. All new designs adapt to every one of the 21 photo layouts, including strips, single photos, square and landscape grids, and mixed-size layouts.

## Collection

1. **Denim Hearts** — Indigo denim, crochet lace and stitched burgundy hearts.
2. **Confetti Cake** — Cobalt paper, pink party kittens, cakes and gift bows.
3. **Scarlet Keepsake** — Scarlet linen, butterflies, ladybugs and blush tulips.
4. **Ribbon Picnic** — Burgundy gingham, satin bows, cherries and sewing buttons.
5. **Memory Press** — Monochrome torn paper, vintage cameras and editorial cutouts.
6. **After Hours** — Oxblood paper, vintage cameras and frayed denim stars.
7. **Tulip Notebook** — Graph paper, pressed tulips, paper flowers and taped snapshots.
8. **Sugar Television** — Yellow waves, pink televisions, candy and playful eyes.
9. **Daisy Check** — Black-and-white gingham, cheerful daisies and smiley stickers.
10. **Pink Frequency** — Pink stripes, denim hearts, navy stars and ribbon bows.
11. **Best Day** — Warm orange paper, layered hearts, candy and playful hand stickers.
12. **Lavender Letters** — Lavender paper, silk bows, floral stamps and sealed envelopes.
13. **Sea Glass** — Seafoam paper, gauze, pearly shells and sea-glass accents.
14. **Golden Hour** — Golden gingham, marigolds, satin bows and warm butterflies.
15. **Midnight Wishes** — Midnight paper, silver moons, embroidered stars and soft clouds.

## Layered artwork

The built-in ImageGen tool generated fifteen transparent 2×2 sticker atlases and five decorative paper textures. The supplied reference images guided the scrapbook mood; their photos, captions and compositions are not copied into application assets. Ten designs use original code-rendered paper patterns behind generated artwork.

Each photo gets two alternating corner accents, drawn after the photo. Accents are scaled from the opening's shorter side, constrained to that photo's slot, and leave its central half clear. This is a geometric safe area, not face-aware positioning: a face right at a corner can be overlapped. Paper, straight/rounded/scalloped/torn mounts, generated stickers and a readable caption plaque share the same compositor in thumbnails, editor previews, JPGs and live-strip rendering. Output layout dimensions stay fixed.

The fifteen new designs use stable IDs in src/data/scrapbookFrames.js. No existing frame ID or asset is replaced. Public assets are named <frame-id>-stickers.webp and, for the first five themes, <frame-id>-paper.webp under public/frames. The twenty new web files total approximately 10.11 MiB. Original generated PNGs are preserved in the chat workspace's scrapbook-frames/originals directory.

## Prompts and provenance

[Exact generation prompts and source files](scrapbook-frames-generation.json) record every built-in call. The generated alpha channels were verified before WebP conversion; alpha quality is preserved. No CLI/API fallback, stock artwork pack or new runtime dependency was used.

## Validation

- All 47 project tests pass, including 15-frame asset checks and geometry checks across all 21 layouts.
- Browser rendering covers all 315 new frame/layout combinations.
- Pixel comparisons verify actual artwork overlap inside photos and unchanged central photo pixels for each theme.
- Desktop and 390px mobile editor selection works; a simulated camera supplies test captures.
- Production build and changed-file formatting pass.
- A JPG download verifies the selected frame and original output dimensions.
- Actual live MP4 encoding and physical-phone behavior are not exercised by these frame checks; live exports use the same updated strip painter.

