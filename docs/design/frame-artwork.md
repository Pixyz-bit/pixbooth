# Original Pixbooth frames

Eight decorative styles were created for this project: Daisy diary, Berry picnic, Violet notes, Moon mail, Cherry club, Paper trail, Film night, and Daydream. The No frame option preserves the existing plain-background renderer.

The supplied references establish a broad scrapbook direction only. Their artwork, characters, slogans, photographs, and compositions were not copied, traced, downloaded, or supplied as image-generation inputs. Three original paper textures were produced with the built-in imagegen tool; the remaining paper patterns, mounts, ornaments, tape, and perforations are original canvas code in `src/lib/frames/frame-art.js`.

## Assets

- `public/frames/daisy-diary.png` — original ivory floral paper.
- `public/frames/berry-picnic.png` — original mint gingham and strawberry paper.
- `public/frames/violet-notes.png` — original lilac doodle paper.

The generated PNGs are retained unchanged. These are creative-media assets; they do not change the black-and-white interface palette. The frame catalog is `src/data/frames.js`. Artwork is loaded locally, cached, and awaited for JPG/MP4 exports. Thumbnails display actual empty frame apertures rather than simulated captures.

Frames keep each template's fixed output width and height. Decorative mounts inset the photo apertures inside the existing rectangles, with centered cover crops. Captions and filters remain editable. Choosing a plain background explicitly removes the decorative frame; selecting No frame restores the previously selected background.

## Editor interactions

The finished editor strip appears immediately after rendering. Caption and color edits update directly. There is no printing animation, printer slot, or replay action.

The template catalog supports name search, photo-count filters, cleared empty results, and Pick for me. The frame collection supports selected states and Surprise me. Existing keyboard focus, disclosure controls, and export cancellation remain available.

## Exact generation prompts

### daisy-diary

Use case: stylized-concept. Asset type: original seamless decorative paper texture for a photobooth frame. Create ONE square flat full-bleed repeatable scrapbook paper, warm ivory with softly pencilled buttery-yellow daisies, tiny pale amber dots and a few delicate sage leaf pairs. Small evenly scattered motifs with plenty of open paper; subtle natural fibre and crayon texture, charming handmade irregularity, restrained print colors, no shadows or perspective. All illustration original. No photo openings, no photographs, no people, no characters, no lettering, no logos, no watermark, no frame mockup. Edge-to-edge pattern suitable for repeating behind photo strip borders.

### berry-picnic

Use case: stylized-concept. Asset type: original seamless decorative paper texture for a photobooth frame. Create ONE square flat full-bleed repeatable scrapbook paper: very pale mint and ivory loose hand-painted gingham checks, scattered SMALL whimsical coral strawberries with simple sage leaves and tiny ivory five-petal flowers. Cheerful handmade stationery, muted pastel print ink, faint paper grain, hand-drawn shapes, generous quiet space. All illustration original. No photo openings, no photographs, no people, no named or familiar characters, no lettering, no logos, no watermark, no frame mockup. No shadows or perspective. Edge-to-edge pattern suitable for repeating behind photo strip borders.

### violet-notes

Use case: stylized-concept. Asset type: original seamless decorative paper texture for a photobooth frame. Create ONE square flat full-bleed repeatable scrapbook paper: soft muted lilac paper with widely spaced SMALL plum pencil doodles of uneven hollow hearts, simple four-point twinkles, looping dotted trails and tiny cream flower marks. Tender diary stationery with fine natural paper grain and slightly imperfect sketch lines; generous negative space, subtle print colors. All illustration original. No photo openings, no photographs, no people, no characters, no lettering, no logos, no watermark, no frame mockup, no shadows or perspective. Edge-to-edge pattern suitable for repeating behind photo strip borders.

