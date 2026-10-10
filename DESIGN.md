# PhotoPix interface

## Overview

The supplied portfolio/admin screenshots govern the visual language: white panels, pale blue dotted canvas, bold bundled DM Sans, black outlines, rounded corners, and black primary actions. The camera has no shadow.

## Colors

White (`#fff`) is the panel and page base. Near-black (`#111`) supplies text, outlines, primary actions, and selected template/sticker states. Pale blue (`#bdd0eb`) dots sit on a 20px canvas grid. Muted gray (`#595960`) supports notes and status copy. Hover surfaces use light neutral fills; selection remains legible through fill and outline changes. Editor background designs belong to the finished photo artifact, rather than changing the application palette.

## Typography

Use the bundled DM Sans with a sans-serif fallback throughout the interface. The main heading is bold (700, 28px, 1.15 line height, −.03em tracking), reduced to 25–26px in compact layouts. Panel headings use 18–19px bold text; body introduction copy uses 13px with 1.5 line height. Buttons use 13px bold text and template/sticker labels use 10–11px bold text. Preserve clear differences between headings, actions, and supporting notes.

## Layout

The latest user request governs composition: maximize viewport width with a three-column workspace at desktop widths of 1000px and above. A compact sidebar holds collapsible templates and face stickers at left; the camera fills the flexible center column; the Captured photos gallery and collapsible settings fill the right. The camera panel stretches to the available workspace height and width, leaving room for capture actions below. Video preserves the full source frame with containment. There is no global header; the PhotoPix logo sits inside the camera panel above Camera preview.

The desktop page uses 24px horizontal padding and 16px workspace gaps, with a 220px sidebar and 280px gallery column. At desktop widths of 1000–1199px, padding becomes 16px, gaps become 12px, and the outer columns become 200px and 240px. The camera takes the remaining width. The compact template collection can scroll when needed; the open sticker collection fills the remaining sidebar height and scrolls internally. The introduction uses 8px top and 10px bottom padding; the footer uses an 8px top margin and 6px vertical padding.

Between 601px and 999px, the sidebar spans the top, with camera and gallery below. At 600px and below, panels stack on one page and templates and stickers use four-column grids. The mobile camera column uses a responsive height (`clamp(380px, 68dvh, 600px)`), and captured photos form a two-column gallery. The editor preview contains the rendered JPG and preserves its fixed export proportions.

The editor leads with the finished artifact at left and a controls panel at right. Compatible same-count layouts use a two-column option grid; background and filter choices use three-column grids. On desktop, options scroll inside their panel while download and Start over remain visible in a persistent action area. At 600px and below, the editor becomes a single scrolling page.

## Elevation & Depth

Panels are flat, with no shadows. White surfaces and black outlines distinguish groups against the dotted canvas. Keep the camera and editor panels within that same material language.

## Shapes

Main panels use 18px rounded corners and 2px black outlines. Primary and outline buttons use 9px corners, 2px outlines, and a minimum height of 44px. Template choices use 10px corners; sticker and editor choices use 9px corners. The viewfinder has 12px corners. Template SVG icons preserve each layout’s proportions.

## Components

Templates, face stickers, and photo settings use native details/summary disclosures. The template selection is a grid, with the active choice filled black and a visible selected mark. Face stickers provide None and 36 effects across Animals, Eyewear, Headwear, and Fun. A labeled search field and category selector sit above the scrollable collection; the selected effect and Clear sticker remain visible. Thumbnail canvases use the same artwork as live and captured effects. Both option groups retain pressed-state semantics, and tracking status appears below the collection.

Photo settings sit below the captured-photo gallery, closed by default. Countdown, mirror, and device selection are stacked in that panel, including long camera labels without overflow. The gallery starts with an empty state and adds each individual shot in capture order, with contained images and simple captions. Compose the photo strip only after Submit. Retain accessible session announcements. After capture completes, paired Start over and Submit actions replace the shutter. Submit opens the editor, whose compatible layout choices, background swatches, and photo-filter thumbnails show their selected state and whose main preview displays the rendered JPG.

## Do's and Don'ts

- Do let the camera fill its available column, keep full camera frames contained, and align the editor preview with export proportions.
- Do keep sticker search, category, selected effect, and tracking status usable while the collection scrolls.
- Do verify open and closed disclosures, long camera labels, six-photo layouts, and editor actions at compact desktop heights.
- Do use the existing 3px black focus outline and honor reduced motion.
- Don't add shadows or replace the supplied screenshot world when extending the interface.
