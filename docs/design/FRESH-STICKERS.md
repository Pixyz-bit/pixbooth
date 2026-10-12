# Fresh picks and compact booth scaling — 2026-10-12

The user selected a mixed playful/stylish collection and requested less congested scaling, a 5:4 camera and wider side panels. This supersedes current ratio/density descriptions in COLLAPSIBLE-TOOLS.md; previous source/docs remain in [the pre-change archive](archive/pre-fresh-stickers-2026-10-12).

## Collection and artwork

Twelve original accessories are drawn in src/lib/stickers/fresh-stickers.js: Ribbon bow, Daisy band, Cherry cheeks, Cloud halo, Pixel shades, Sunset shades, Pearl tiara, Star headphones, Cosmic freckles, Bunny bonnet, Lightning cheeks, Moon & stars. Fresh picks is the first/default category. All retains the new 12 plus previous 36 and None (49 buttons). Original Animals/Eyewear/Headwear/Fun categories and effect IDs remain. None/Clear and both trackers remain available.

Artwork is authored Canvas2D geometry, with five accents (pink,gold,blue,violet,green) plus black/white. No external artwork or new dependency was added. The shared drawSticker path invokes the new artwork in eye-distance coordinates using the same forehead/nose anchors for thumbnails, live overlay and captures. Thumbnail previews alone crop transparent bounds and fit artwork into 88px of their 112px canvas, retaining the actual effect art. None retains its crossed face guide. The new collection does not implement the proposed PixiJS renderer; that separate research recommendation remains in docs/engineering/FACE-STICKER-STACK.md.

## Scaling

The camera-frame-area is fixed to 5:4 with an 800 × 640 reference, proportionally fitted to available viewport dimensions and capped 800px wide. Live source/overlay remain contained without stretching, and template/capture/export geometry remains unchanged. Letterboxing is expected for different camera feed proportions.

Equal left/right panels now use clamp(256px,20vw,320px). Desktop tool grids use two columns, phone three; cards are 80px minimum with 40px cropped artwork and 12px labels. Shorter labels wrap naturally rather than splitting words. Tool gaps/padding are reduced, camera-bar height 48px, layout title 16px, state title 18px, primary/secondary labels 14px, metadata 12px. Booth actions retain 44px minimum heights; white shutter 64px desktop / 52px phone. Collapsible sections, pinned panels and internal overflow remain. Selected/hovered sticker colors now remain readable instead of inheriting a dark legacy hover surface.

## Verification

All 26 tests passed, including unique catalog/legacy-category preservation, finite artwork geometry at thumbnail/landscape/portrait sizes, balanced canvas transforms and accessible default discovery. Production build passed (173 modules, 8.17 seconds). Browser checks confirmed Fresh picks, 49 All buttons, new-effect selection and console without errors. Live camera/inference/export were not exercised; shared-code and mock geometry checks do not establish physical alignment.

At 1440 × 1000 the camera is 800 × 640, side panels 288 × 884.4, cards 111.6 × 80, no horizontal or page overflow. At 1024 × 768 camera 456 × 364.8, panels 256 × 652.4, no overflow. At 375 × 812 camera 328 × 262.4, stacked panels 328 × 512, no horizontal overflow. [Measurements](verification/fresh-stickers-checks.json), [desktop screenshot](verification/fresh-stickers-desktop.png), [phone screenshot](verification/fresh-stickers-mobile.png). All dimensions were read from the rendered DOM.

Organization/sizing is superseded by [CAMERA-CORNER-TOOLS.md](CAMERA-CORNER-TOOLS.md). The earlier implementation and measurements above remain dated history.

The subsequent [MediaPipe/PixiJS update](MEDIAPIPE-PIXI-STICKERS.md) is the current face-effects authority. It removes tracker/category selectors, uses a shared GPU renderer with Canvas2D fallback, and makes the exact-second countdown field conditional on Custom. Earlier records above are preserved.
