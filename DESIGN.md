# PhotoPix interface

## Overview

The supplied portfolio/admin screenshots govern the visual language: white panels, pale blue dotted canvas, bold bundled DM Sans, black outlines, rounded corners, and black primary actions. The camera has no shadow.

## Colors

White (`#fff`) is the panel and page base. Near-black (`#111`) supplies text, outlines, primary actions, and selected template/sticker states. Pale blue (`#bdd0eb`) dots sit on a 20px canvas grid. Muted gray (`#595960`) supports notes and status copy. Hover surfaces use light neutral fills; selection remains legible through fill and outline changes. Editor background designs belong to the finished photo artifact, rather than changing the application palette.

## Typography

Use the bundled DM Sans with a sans-serif fallback throughout the interface. The main heading is bold (700, 28px, 1.15 line height, −.03em tracking), reduced to 25–26px in compact layouts. Panel headings use 18–19px bold text; body introduction copy uses 13px with 1.5 line height. Buttons use 13px bold text and template/sticker labels use 10–11px bold text. Preserve clear differences between headings, actions, and supporting notes.

## Layout

The latest user request governs composition: maximize viewport width with a three-column workspace at desktop widths of 1000px and above. A compact sidebar holds collapsible templates and face stickers at left; the flexible center column gives the square camera booth more room; the photo preview and collapsible settings fill the right. The camera booth retains a 1:1 aspect ratio and is sized against its available column height and width, leaving room for capture actions. Video preserves the full source frame with containment. Desktop columns stretch to the remaining workspace height; the open template grid fills leftover vertical sidebar space without expanding the sidebar width.

The desktop page uses 24px horizontal padding and 16px workspace gaps, with a 220px sidebar and 280px preview column. At desktop widths of 1000–1199px, padding becomes 16px, gaps become 12px, and the outer columns become 200px and 240px. The camera takes the remaining width; its square size is the smaller of its column width and column height minus 64px for actions. Compact desktop header (8px vertical padding), introduction (8px top and 10px bottom), and footer (8px top margin and 6px vertical padding) leave more room for the camera.

Between 601px and 999px, the sidebar spans the top, with camera and preview below. At 600px and below, panels stack on one page and templates use a four-column grid. The camera booth remains square. The preview scales within its actual remaining space using container units and preserves each layout’s fixed export proportions.

The editor leads with the finished artifact at left and a controls panel at right. Background and filter choices use three-column grids. On desktop, options scroll inside their panel while download and Start over remain visible in a persistent action area. At 600px and below, the editor becomes a single scrolling page.

## Elevation & Depth

Panels are flat, with no shadows. White surfaces and black outlines distinguish groups against the dotted canvas. Keep the camera and editor panels within that same material language.

## Shapes

Main panels use 18px rounded corners and 2px black outlines. Primary and outline buttons use 9px corners, 2px outlines, and a minimum height of 44px. Template choices use 10px corners; sticker and editor choices use 9px corners. The viewfinder has 12px corners. Template SVG icons preserve each layout’s proportions.

## Components

Templates, face stickers, and photo settings use native details/summary disclosures. The template selection is a grid, with the active choice filled black and a visible selected mark. Face stickers provide None, Dog, Hat, and Glasses choices with a tracking status below. Both option groups retain pressed-state semantics.

Photo settings sit below the preview, closed by default. Countdown, mirror, and device selection are stacked in that panel, including long camera labels without overflow. Retain the privacy statement in the header and accessible session announcements. After capture completes, paired Start over and Submit actions replace the shutter. Submit opens the editor, whose background swatches and photo-filter thumbnails show selected outlines and whose main preview displays the rendered JPG.

## Do's and Don'ts

- Do keep the booth square, full camera frames contained, and preview/export proportions aligned.
- Do verify open and closed disclosures, long camera labels, six-photo layouts, and editor actions at compact desktop heights.
- Do use the existing 3px black focus outline and honor reduced motion.
- Don't add shadows or replace the supplied screenshot world when extending the interface.
