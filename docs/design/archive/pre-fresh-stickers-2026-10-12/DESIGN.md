---
name: Pixbooth
description: A modern monochrome browser photo and live-clip booth.
colors:
  ink: "#111111"
  paper: "#FFFFFF"
  page: "#FAFAFA"
  surface: "#F5F5F5"
  line: "#E5E5E5"
  muted: "#737373"
typography:
  display:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(48px, 5.3vw, 72px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(28px, 3vw, 36px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-.03em"
  title:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 700
  metadata:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  compactTitle:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.4
  compactState:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.25
  narrowTitle:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.25
  countdownReadout:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(64px, 12vw, 120px)"
    fontWeight: 700
    lineHeight: 1
rounded:
  control: "8px"
  panel: "12px"
spacing:
  base: "8px"
  compact: "12px"
  group: "16px"
  panel: "24px"
  page: "32px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  photo-count-dropdown:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "48px"
---

# Design System: Pixbooth

## Overview

**Creative North Star: "The Monochrome Photo Booth"**

Pixbooth is a quiet, modern photo instrument: generous space, clear monochrome controls, and one primary decision on each screen. The camera and finished keepsake carry the visual weight; controls stay legible and secondary. Creative media and authored artwork keep their actual colors.

The accepted modernization brief and direction contract supersede the earlier neobrutalist world. The supplied logo, bundled DM Sans, original assets, media geometry, and photo/live capabilities remain. The canonical working project is C:\Martin Archive\Programming\2026 Projects\PhotoPix.

[MODERNIZATION-BRIEF.md](docs/design/MODERNIZATION-BRIEF.md) records the accepted request; [MODERNIZATION-CONTRACT.md](docs/design/MODERNIZATION-CONTRACT.md) records its direction. This file owns current visual tokens; [.impeccable/design.json](.impeccable/design.json) extends them. [Implementation](docs/design/MODERNIZATION-IMPLEMENTATION.md) records changes and validation. The previous concept and tokens are historical references, preserved below and in the dated archive.

**Key Characteristics:**

- Six neutral interface colors with content colors preserved.
- Bundled DM Sans with a clear, readable hierarchy.
- An 8px spacing rhythm and restrained 8–12px working corners.
- Border-led surfaces without action shadows.
- Camera-first capture and an artifact-first editor.

## Colors

**Primary:** Ink is used for primary actions, readable text, selected states, and focus. **Neutral:** Paper is the white working surface; Page is the faint overall background; Surface groups secondary controls; Line separates surfaces; Muted supports secondary copy on suitable light backgrounds.

**The Chrome Rule.** Use the six normative interface tokens. Captured media, authored frame textures, background swatches, and sticker artwork retain their actual colors; never desaturate the page root to enforce chrome neutrality.

Use Ink for camera idle instructions on Surface and for hovered secondary captions. Translucent Ink backdrops are functional overlays: the dialog backdrop is 25% alpha and the photograph countdown uses 50% alpha. They are derived overlay treatments, not additional chromatic tokens. Error and completion states use words, geometry, and availability rather than red/green signals.

## Typography

Use bundled DM Sans at weights 400, 500, and 700 with sans-serif fallback. The compact camera layout heading uses 18px/1.4; capture progress and timer use 12px. Section headings and control/action labels use 14px, while tool labels, sticker names, timer/status and supporting metadata use 12px. Controls inherit DM Sans; mode labels remain one line without shrinking their 44px targets. Only local 400/500/700 weights are imported; ordinary prose retains 16px/1.5. The frontmatter describes the repeated roles. Workflow intro headings use Headline; dialog and empty-camera headings use Title; supporting workflow paragraphs use Body, with a maximum intro measure of 65 characters. Action labels use Label.

Secondary workflow/status text is generally 14px, smaller metadata 12px. Page intro copy becomes 14px on mobile. The unchanged landing display uses its Display role, 60px at compact desktop heights and a 38–48px responsive mobile range. Camera countdown is a distinct 64–120px transient readout. Keep labels readable and allow long names to wrap.

## Layout

The shared workflow container is at most 1280px wide with 32px side padding, reducing to 24px below 800px and 16px below 600px. Use the 8px rhythm for major relationships; 12px compact gaps, 4px inset corrections, and border-compensating selection padding are observed optical exceptions.

The All view uses native multi-column masonry: five columns, four below 1100px, three below 800px, two below 600px, and one below 360px. Cards flow top-to-bottom then left-to-right, so DOM and keyboard order agree with the visual columns. Preview heights follow actual layout proportions, capped at 176px (144px on mobile), with a 96px minimum while preserving the full SVG. A labeled native Photo count dropdown offers All layouts and exact counts 1, 2, 3, 4, 6, 8, 9. Layout search and Pick for me are removed. A compact selected-layout Continue row stacks at mobile widths and has a sticky bottom offset.

Photo-count results switch to an auto-fit CSS grid, filling rows left-to-right and stretching available tracks across the catalog. Cards retain their proportional previews and start alignment. The minimum track is 192px, reducing to 144px below 600px; selecting All restores masonry. This prevents short filtered lists from balancing into the leftmost masonry columns.

The camera leads between equally sized left tool and right photo panels. Both desktop sides use clamp(224px, 15vw, 288px). Stickers and Settings have independent native Stickers and Settings disclosures, initially closed and operated by click, Enter or Space. The icon-only shutter floats inside the camera frame, freeing vertical preview space. At >=900px width and >=420px height, the complete app fits 100dvh; smaller/shorter windows show the camera first and stack two equal 512px panels with internal overflow.

The layout name, capture position, and Camera switch stay in the top bar. The 72px icon-only shutter (56px on phones) floats at the bottom center of the fixed camera frame; countdown/recording cancellation remains available. It is hidden in idle/loading and completed playback states so it does not cover activation or native video controls. Feedback overlays the frame without changing its dimensions. Continue and Start over are full-width stacked 48px actions outside the review overflow.

The two collapsible left sections retain provider selection, sticker categories, Clear/None, tracking notices and retry; sticker search is removed. Settings keeps Photo/Live mode, countdown, mirror, and camera-device selection. The right gallery fills available width and centers vertically: one column for one capture, two for counts 2–8, three for nine. Photo labels beneath thumbnails are removed. Retake appears over the image on hover or keyboard focus and stays visible on touch-only devices; its accessible name identifies the photo. Live controls and individual clip downloads remain.

The editor uses a flexible artifact plus a 360px control column (340px below 1100px), then stacks below 800px. The artifact is sticky only on wider screens and fitted to its true output proportions. Six tabs reveal one tool category at a time; download actions remain prominent above the tools. Actual overflow, sticky coverage, and viewport fit still need rendered-browser verification at the requested 1440/1024/768/375–430px widths.

The camera-frame-area uses a fixed 1280 × 720 reference (16:9) across permission, loading, live, recording, and completed states. Its displayed size scales only with viewport space, never camera state, selected sticker, or template output aspect. Desktop size-container units fit both available dimensions, capped at 1280px wide. Source feeds and overlays remain contained together; different feed ratios letterbox and output geometry stays unchanged.

The step nav sits between the supplied logo and Home in one header row above 600px. At smaller widths it remains inside the same brand row as a second grid row. Current, completed, and unavailable semantics remain.

Home retains the approved centered hero, logo, illustrative print composition, formats ribbon, and three how-to rows. Modern chrome removes the background grid and hard action shadow; Capture uses an Ink button with Paper text. Illustrative artwork and its provenance remain intact.

## Elevation & Depth

The interface uses tonal surfaces and fine borders rather than decorative depth. Current panels and buttons have no box shadow; the camera remains flat. Dialogs use a translucent backdrop to establish modal separation.

Functional transitions use 180ms with the existing easing curve. Hover lifts template choices by 2px and primary buttons by 1px; press moves buttons down by 1px. The circular shutter scales to 1.04 on hover and 0.96 on press. Reduced-motion preference removes animation and transitions and disables nonessential hover transforms.

## Shapes

Working controls use the Control radius; panels and preview containers use the Panel radius. Structural borders are generally 1px, with 2px selected edges. Selected-border padding compensates to keep geometry stable.

The circular shutter, numbered workflow markers, selected check, and switch track/thumb are semantic exceptions. The retired mobile tool-sheet rules remain historical CSS; current capture tools use native details/summary disclosures. Tab buttons use 6px inside an 8px segmented tray and artwork thumbnails retain 4px clipping. These source-backed exceptions do not establish a broader radius scale. Keep the supplied PNG logo in its original proportions.

## Components

Buttons have a 48px minimum height and labeled text; icon controls and inputs generally have at least 44px targets. Disabled primary actions use Surface, Line, and Muted with nearby recovery copy. Photo count uses a visibly labeled native select with keyboard semantics. Both layout and sticker search are removed.

Masonry template cards retain their actual layout SVG, name, count, strong selected border, and check. Collapsible tool sections preserve control labels, keyboard focus and mounted state while closing removes their controls from the tab order. Reset confirmation explains discarded captures and edits before clearing the session.

The workflow remains ordered three-step navigation with Home and current/completed/unavailable states. Current-step semantics use aria-current; future unavailable steps remain non-links. Editor tabs use roving focus and ArrowLeft/ArrowRight/Home/End navigation. Undo/Redo handles reversible edits; background choice and frame removal are one atomic history action.

Download metadata separates full-size JPG dimensions from composed MP4 dimensions. A prepared MP4 displays its actual encoded dimensions; before export it describes the 1920px limit. Download status says a request was made and directs the user to browser downloads, because page code cannot confirm a saved file.

**The Focus Rule.** Every interactive state has a visible keyboard focus treatment. Selected templates show a stronger border and check; selected tools expose pressed or selected semantics as well as their visual state.

Focus outlines are 2px Ink with a 4px offset on light controls; inverted segmented controls use Paper inside the selection. Camera and recording announcements retain live-region behavior; avoid announcing per-frame rendering. Respect content colors in all media previews.

## Do's and Don'ts

- Do use the current frontmatter and modern stylesheet for new interface work.
- Do preserve the supplied logo, bundled font, creative artwork, and media geometry.
- Do keep source camera frames contained and exported media center-cropped to template openings.
- Do explain unavailable actions and recovery in concise nearby copy.
- Do preserve keyboard operation, focus return, and reduced-motion behavior.
- Don't restore hard action shadows, the landing grid, or the retired neobrutalist chrome.
- Don't flatten media colors or substitute placeholder captures for a live user session.
- Don't claim browser, device, camera, export, or accessibility conformance from source-only checks.


Current [collapsible tools and shutter cleanup](docs/design/COLLAPSIBLE-TOOLS.md) restores independent closed-by-default dropdown sections and removes shutter-label/shutter-timer. Prior source and documentation remain archived.


The floating shutter has a Paper-white circle, 2px Ink outline and Ink camera icon. Its positioning wrapper is transparent with no padded dark backdrop; label/timer text is removed.


On desktop and tablet windows at least 900px wide and 420px tall, tools stay pinned to the left and captured moments to the right of the camera. The app fits the viewport; overflow stays inside each panel. Narrower or very short windows retain the stacked camera-first fallback.

## Historical design before modernization — 2026-10-12

The complete previous document, including its former normative frontmatter, follows verbatim. It is historical and does not override the current tokens, accepted brief, or direction contract. The exact file snapshot is also in [the dated archive](docs/design/archive/pre-modernization-2026-10-12/DESIGN.md).

````markdown
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
````
