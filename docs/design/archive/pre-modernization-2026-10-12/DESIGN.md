---
name: Pixbooth
description: A bold monochrome browser photo and live-clip booth.
colors:
  black: "#000"
  white: "#fff"
typography:
  display:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(48px, 5.3vw, 72px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.03em"
  title:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "19px"
    fontWeight: 700
    letterSpacing: "-.02em"
  label:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "13px"
    fontWeight: 700
rounded:
  panel: "4px"
  control: "2px"
spacing:
  xs: "6px"
  sm: "8px"
  compact: "12px"
  md: "16px"
  lg: "20px"
  page: "24px"
components:
  button-primary:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.panel}"
---

# Design System: Pixbooth

## Overview

**Creative North Star: "The Monochrome Photo Booth"**

[docs/design/DESIGN-CONCEPT.md](docs/design/DESIGN-CONCEPT.md) is the authoritative site-wide design concept. Read it before adding or changing any Pixbooth surface. This root file is the concise source-backed token entry point; [.impeccable/design.json](.impeccable/design.json) records extension metadata and component examples.

The four user-supplied neobrutalist references establish bold type, sharp frames, dense useful groups, and explicit states. The earlier pale-blue dotted, generously rounded PhotoPix world is superseded. The canonical project remains `C:\Martin Archive\Programming\2026 Projects\PhotoPix`.

Source ownership and CSS loading order are documented in [docs/development/PROJECT-STRUCTURE.md](docs/development/PROJECT-STRUCTURE.md). Page and feature styles are separated, with shared tokens and theme rules under `src/styles/`; `src/styles/index.css` preserves their cascade order.

The additional [landing composition reference](docs/design/references/landing-composition.png) pins the centered home-page hero as a user-approved composition. It does not replace the site's typography, palette, sharp controls, or camera behavior.

## Colors

**The Chrome Rule.** Interface surfaces, text, outlines, and states use only the black and white tokens. Do not import the reference images' accent colors. Captured media and user-selected backgrounds, filters, face effects, and border artwork retain their content colors; never apply global desaturation.

## Typography

Use bundled DM Sans at weights 400, 500, and 700. Bold headings and labels give the interface its dense, direct character. Desktop landing display type uses the display token; desktop heights of 800px and below use 60px, and mobile uses `clamp(38px, 10vw, 48px)`. Booth/editor headings reduce to 25–26px in compact layouts. Preserve legible labels and concise status copy.

## Layout

Home uses the user-pinned centered hero with the supplied logo above the headline, a short two-line introduction, one Capture action, and an illustrative photo-print composition. There is no landing navbar. The landing background is a user-requested 32px grid of low-opacity black lines on white. The Capture button is white with black text by default and black with white text and arrow on hover; its hard action shadow and pressed compression remain. A formats ribbon and three sequential how-to rows follow. Mobile retains the strip and central print while hiding the right ornament; it has no interactive playground. See [landing-artwork.md](docs/design/landing-artwork.md) for sample-image provenance.

The non-home workflow has three separate surfaces: choose a template, capture, then edit/download. Step one is a bounded 21-layout catalog beside a selected-layout diagram and Continue action. Its catalog uses four columns at 1200px and above, three on smaller desktop widths, and two on tablet/mobile; the selected-layout summary stacks below on mobile.

Step two uses a face-sticker-only sidebar, flexible full-height camera, and wider two-column capture gallery: 220px / flexible / 360px on desktop, 200px / flexible / 320px at 1000–1199px, and a 300px gallery beside the camera below the sidebar at 601–999px. At 600px and below, panels stack. Template selection is no longer part of the capture sidebar; face effects remain a bounded scroll collection.

The camera fills its available column and contains the live source frame. Gallery cells follow the chosen template's frame proportions and use centered cover crops. Submit opens the editor; the rendered artifact leads, controls scroll separately on desktop, and persistent actions remain visible. Mobile uses one scrolling page.

## Elevation & Depth

**The Action Shadow Rule.** Major dark actions use a crisp `4px 4px 0 #000` shadow and compress by translating 4px on press. The camera remains shadow-free. Panels, gallery cards, option tiles, and outline actions rely on borders rather than ambient depth.

## Shapes

Panels use the panel radius; controls use the control radius. Square geometry and modest 0–4px edges define the concept. Main panels and action buttons carry 2px black borders. Preserve the supplied `public/pixbooth-logo.png` without recoloring or redrawing it.

The landing's printed-photo artifacts have fixed −6° and +5° rotations as a specific composition treatment. They do not animate or authorize tilted UI badges and controls.

## Components

Shared semantic step breadcrumbs appear on every non-home page. An ordered list contains numbered Choose template, Capture photos, and Edit & download steps, plus a Home link. The current step inverts to white on black and uses `aria-current="step"`. Available steps are links; unavailable future steps are non-link text with `aria-disabled="true"`. On mobile, each number sits above its label. Keep previous steps reachable without discarding captured media or editor choices.

Step-one template choices use proportionate SVG diagrams, capture counts, inverted selection, and a visible check. Native details/summary groups organize face effects, photo settings, and final-editor collections. Selected choices retain pressed-state semantics. Face effects include searchable thumbnail canvases, categories, Clear sticker, tracking status, and recovery copy. Editor choices cover compatible layouts, backgrounds, filters, border artwork, and caption text.

Focus uses a 3px outline; disabled primary buttons use a dashed border, white fill, black text, and no shadow. Recording and MP4 export expose progress, cancellation, and recovery. Honor reduced motion.

## Do's and Don'ts

- Do apply the concept across home, booth, editor, loading, error, and empty states.
- Do distinguish monochrome interface chrome from colorful creative content.
- Do keep full source frames in the live preview and center-crop output into template frames.
- Do preserve visible actions, keyboard focus, and native disclosure behavior.
- Don't restore blue dots, soft panel shadows, or broad rounded cards.
- Don't copy shopping carts, pricing, product imagery, reference copy, or third-party component code.

## Original frames and editor interaction

Eight original decorative frames combine three generated paper textures with authored canvas mounts and motifs. Artwork is creative media and may retain color; controls and selected states stay black and white. Frame thumbnails use empty apertures rather than simulated captures. Choosing a background explicitly removes the decorative frame. The template catalog adds name search, photo-count filters and Pick for me; the frame picker adds Surprise me.

Finished strips display immediately without a printing animation, printer slot, or replay action. Fit the real artifact dimensions inside the stage and keep export actions visible. See [frame-artwork.md](docs/design/frame-artwork.md) for provenance and exact prompts.


## Jeeliz face-sticker trial — 2026-10-12

Face stickers now offer Jeeliz (default) and the original MediaPipe tracker. Choose Face tracking in the Face stickers panel. Jeeliz uses local face-pose estimates for the existing 36 sticker artworks and automatically falls back to MediaPipe on initialization failure. See [implementation, manual checks and rollback](docs/design/JEELIZ-FACE-STICKERS.md). Existing layout and earlier documentation are retained.
