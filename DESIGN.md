---
name: Mentomory
description: A modern monochrome browser photo and live-clip booth.
colors:
  ink: "#111111"
  paper: "#FFFFFF"
  page: "#FAFAFA"
  surface: "#F5F5F5"
  line: "#E5E5E5"
  muted: "#737373"
  # Home-route overrides; shared workflow colors above remain current.
  homeInk: "#000"
  homePaper: "#fff"
  homeSupportingText: "#52525b"
  homeDivider: "#e4e4e7"
  homeGrid: "#0001"
  homeFooterSupporting: "#d4d4d8"
  homeFooterDivider: "#3f3f46"
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
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.4
  compactState:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "18px"
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
  homeHowHeadline:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(32px, 3.5vw, 44px)"
    fontWeight: 800
    lineHeight: 1.12
  homeStepTitle:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(19px, 1.8vw, 24px)"
    fontWeight: 800
    lineHeight: 1.25
  homeCompactStepTitle:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.25
  homeMobileStepTitle:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: 1.25
  homeActionLabel:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "15px"
    fontWeight: 800
    lineHeight: 1.5
  homeFooterInvitation:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.2
  homeHeroDisplay:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(38px, 6.5svh, 64px)"
    fontWeight: 800
    lineHeight: 1.08
  homePrintCaption:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "8px"
    fontWeight: 700
    lineHeight: 1.5
  homeLiveNote:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "8px"
  panel: "12px"
  homeAction: "10px"
  homeCard: "18px"
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
  home-capture:
    backgroundColor: "{colors.homePaper}"
    textColor: "{colors.homeInk}"
    rounded: "{rounded.homeAction}"
    padding: "12px 20px"
    width: "190px"
    height: "50px"
  home-capture-hover:
    backgroundColor: "{colors.homePaper}"
    textColor: "{colors.homeInk}"
  home-footer:
    backgroundColor: "{colors.homePaper}"
    textColor: "{colors.homeInk}"
---

# Design System: Mentomory

## Overview

**Current home-page authority:** [Landing design concept](docs/design/LANDING-DESIGN-CONCEPT.md). Its page-specific tokens and latest states supersede older home interpretations below; the shared workflow guidance remains current.

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

Use Ink for camera idle instructions on Surface and for hovered secondary captions. Translucent Ink backdrops are functional overlays: the dialog backdrop is 25% alpha while the photograph countdown has no full-frame backdrop. They are derived overlay treatments, not additional chromatic tokens. Error and completion states use words, geometry, and availability rather than red/green signals.

## Typography

Use bundled DM Sans at weights 400, 500, and 700 with sans-serif fallback. The compact camera layout heading uses 16px/1.4; capture progress and timer use 12px. Section headings and control/action labels use 14px, while tool labels, sticker names, timer/status and supporting metadata use 12px. Controls inherit DM Sans; mode labels remain one line without shrinking their 44px targets. Only local 400/500/700 weights are imported; ordinary prose retains 16px/1.5. The frontmatter describes the repeated roles. Workflow intro headings use Headline; dialog and empty-camera headings use Title; supporting workflow paragraphs use Body, with a maximum intro measure of 65 characters. Action labels use Label.

Secondary workflow/status text is generally 14px, smaller metadata 12px. Page intro copy becomes 14px on mobile. The unchanged landing display uses its Display role, 60px at compact desktop heights and a 38–48px responsive mobile range. Camera countdown is a distinct 64–120px transient readout. Keep labels readable and allow long names to wrap.

## Layout

The shared workflow container is at most 1280px wide with 32px side padding, reducing to 24px below 800px and 16px below 600px. Use the 8px rhythm for major relationships; 12px compact gaps, 4px inset corrections, and border-compensating selection padding are observed optical exceptions.

The All view uses native multi-column masonry: five columns, four below 1100px, three below 800px, two below 600px, and one below 360px. Cards flow top-to-bottom then left-to-right, so DOM and keyboard order agree with the visual columns. Preview heights follow actual layout proportions, capped at 176px (144px on mobile), with a 96px minimum while preserving the full SVG. A labeled native Photo count dropdown offers All layouts and exact counts 1, 2, 3, 4, 6, 8, 9. Layout search and Pick for me are removed. A compact selected-layout Continue row stacks at mobile widths and has a sticky bottom offset.

Photo-count results switch to an auto-fit CSS grid, filling rows left-to-right and stretching available tracks across the catalog. Cards retain their proportional previews and start alignment. The minimum track is 192px, reducing to 144px below 600px; selecting All restores masonry. This prevents short filtered lists from balancing into the leftmost masonry columns.

The booth uses a camera-left / review-right arrangement. Stickers and Settings are opened by circular controls at the camera’s bottom-left and bottom-right; the centered white shutter remains on the camera. The separate left tools sidebar is removed. Tool bodies overlay the preview, using the existing DM Sans, neutral surfaces and borders. Both can open on wider frames; below620px preview width, only one opens at a time. Escape closes the current panel and restores its toggle focus. Hidden controls stay mounted, retaining their selections.

The camera top bar retains the layout name, progress and Camera switch. Tools open inside its lower corners, above48px icon toggles; the64px shutter stays centered. Preview/control state does not change frame dimensions. Right-side Continue and Start over remain below photo review and outside its scroll collection.

Stickers keeps Fresh picks, all original collections, provider selection, None/Clear, status and retry. Settings retains Photo/Live, timer, mirror and devices. The review uses a standard two-column grid regardless of capture count. All media and empty cells are4:3 with identical dimensions; cover cropping normalizes mixed template shapes. Retake and individual MP4-download controls overlay the media on hover/focus and stay visible on touch.

The editor uses a flexible artifact plus a 360px control column (340px below 1100px), then stacks below 800px. The artifact is sticky only on wider screens and fitted to its true output proportions. Six tabs reveal one tool category at a time; download actions remain prominent above the tools. Actual overflow, sticky coverage, and viewport fit still need rendered-browser verification at the requested 1440/1024/768/375–430px widths.

The desktop camera expands into the full left column with a1280 × 720 (16:9) reference fitted to available space. Below600px viewport width, the5:4 frame keeps tool panels usable. Video, canvas overlay, completed photos and clips all use object-fit:cover and centered positioning, filling the frame without letterbox margins. This changes preview framing; original capture sources and template export geometry remain unchanged.

The step nav sits between the supplied logo and Home in one header row above 600px. At smaller widths it remains inside the same brand row as a second grid row. Current, completed, and unavailable semantics remain.

Home retains the approved centered hero, logo, illustrative print composition and formats ribbon. The current home-page neobrutalist override restores the 32px grid, bold outlines and hard Capture shadow, and uses three image-led sequential instructions. See the Home-page neobrutalism section and landing contract for the page-specific tokens.

## Elevation & Depth

The interface uses tonal surfaces and fine borders rather than decorative depth. Current panels and buttons have no box shadow; the camera remains flat. Dialogs use a translucent backdrop to establish modal separation.

Functional transitions use 180ms with the existing easing curve. Hover lifts template choices by 2px and primary buttons by 1px; press moves buttons down by 1px. The circular shutter scales to 1.04 on hover and 0.96 on press. Reduced-motion preference removes animation and transitions and disables nonessential hover transforms.

## Shapes

Working controls use the Control radius; panels and preview containers use the Panel radius. Structural borders are generally 1px, with 2px selected edges. Selected-border padding compensates to keep geometry stable.

The circular shutter, numbered workflow markers, selected check, and switch track/thumb are semantic exceptions. The retired mobile tool-sheet rules remain historical CSS; current capture tools use native details/summary disclosures. Tab buttons use 6px inside an 8px segmented tray and artwork thumbnails retain 4px clipping. These source-backed exceptions do not establish a broader radius scale. Keep the supplied PNG logo in its original proportions.

## Components

Shared actions have a 48px minimum height; compact booth actions use 44px. Buttons retain labeled text; icon controls and inputs generally have at least 44px targets. Disabled primary actions use Surface, Line, and Muted with nearby recovery copy. Photo count uses a visibly labeled native select with keyboard semantics. Both layout and sticker search are removed.

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
- Keep the modern workflow chrome on non-home surfaces; use the user-approved neobrutalist override on home.
- Don't flatten media colors or substitute placeholder captures for a live user session.
- Don't claim browser, device, camera, export, or accessibility conformance from source-only checks.


Current [collapsible tools and shutter cleanup](docs/design/COLLAPSIBLE-TOOLS.md) restores independent closed-by-default dropdown sections and removes shutter-label/shutter-timer. Prior source and documentation remain archived.


The floating shutter has a Paper-white circle, 2px Ink outline and Ink camera icon. Its positioning wrapper is transparent with no padded dark backdrop; label/timer text is removed.


On desktop and tablet windows at least900px wide and420px tall, camera and review fit the viewport. Review stays on the right and tools now overlay the camera. Narrower/shorter windows stack review below the camera.


The current [Fresh picks and scaling refinement](docs/design/FRESH-STICKERS.md) adds 12 original mixed accessories, normalizes artwork thumbnails, uses an800 × 640 (5:4) camera reference and wider256–320px side panels, and compacts controls without reducing44px targets. Earlier design records remain preserved.


Current organization: [camera corner tools](docs/design/CAMERA-CORNER-TOOLS.md) supersedes the separate left panel, uniform5:4 desktop frame and count-dependent gallery columns. The supplied images establish element organization only; their visual styling and photographic assets are not used.


[Supplied control icons](docs/design/PROVIDED-ICONS.md) now provide the Stickers, shutter and Settings artwork, centered within their controls. Jeeliz fallback reports its specific initialization failure and offers Retry Jeeliz instead of labeling every failure as an unsupported device.


Current capture behavior: [automatic capture and compact Settings](docs/design/AUTOMATIC-CAPTURE.md). One shutter click fills the selected layout with a configurable countdown before every capture. Individual thumbnail retakes are removed; Redo replaces and repeats the whole set. The supplied aperture shutter is white without a circular backing.


Current face-effects stack: [MediaPipe + PixiJS](docs/design/MEDIAPIPE-PIXI-STICKERS.md) replaces the Jeeliz trial in the active app, with Canvas2D rendering fallback. All 48 effects are shown without tracker/category dropdowns. Countdown now uses Off / 3 sec / Custom, revealing a 1-10 second numeric stepper only for Custom.


Current camera feedback: [conditional notification fade and fixed countdowns](docs/design/CAMERA-NOTIFICATIONS.md). Transparent messages use a top-heavy dark fade only while a visible notice/error exists. Countdown choices are Off / 3 sec / 5 sec, with no Custom input.

## Current landing concept and restored white footer — 2026-10-13

[LANDING-DESIGN-CONCEPT.md](docs/design/LANDING-DESIGN-CONCEPT.md) is the current, complete landing-only visual specification. It consolidates the implemented palette, local font, viewport-fit hero, open three-step layout, full-width formats strip, actions, responsive behavior, dark footer, accessibility and asset provenance. It supersedes conflicting earlier landing entries while retaining them as history.

Current footer: the original white main surface is restored, with the unfiltered supplied logo, black headings, #52525b supporting text, and a white/black booth action with no default shadow, matching Capture. Both actions gain a 6px black shadow on hover. Its bottom metadata bar remains black. This supersedes the dark-footer description below.

Prior dark-footer change (superseded for footer appearance): hero Capture defaults to white with black text and no shadow; hover remains white/black and gains the existing 6px black offset shadow. Caption: “A few poses. A little keepsake.” Dedicated footer now has black background, white headings and #d4d4d8 supporting copy; the supplied logo stays unchanged on a white plate. The footer action is white/black by default and black/white with a white offset shadow on hover. Footer focus is white. Main grid, generated illustrations, open steps and aligned workflow margins remain.

Pre-change source and documentation are preserved at `docs/design/archive/pre-black-footer-2026-10-13/`.
Current landing revision validation: build and formatting passed. Browser checks at 1440 × 900 and 390 × 844 confirmed white/black Capture with no default shadow, the new caption, black/white footer, single-column mobile footer, 44px minimum footer links and no horizontal overflow. Browser console reported no errors. Font/grid detector findings reflect explicit user requirements. Desktop/mobile screenshot references are included in the current landing concept document.

## Earlier shared workflow margins and Capture inversion — 2026-10-13

The latest user request makes the booth follow the editor/template outer geometry. Remove booth-only max-width and padding overrides so all three inherit `.app`: max-width 1280px, centered, 32px side padding, 24px below 800px and 16px below 600px. Reserve a stable root scrollbar gutter so centered navigation does not shift between scrolling and viewport-fitted pages. Remove the booth-only 128px logo override; all pages use the same WorkflowSteps header and its 144px desktop / 112px tablet-mobile logo, sizing and breakpoints. Preserve the booth's viewport-height layout, review/gallery, tools and capture behavior.

The landing Capture now defaults to black with white text and **no shadow**. Hover switches to white with black text and a 6px black offset shadow. This supersedes the previous white-default description below. Open landing steps, grid, viewport-fit hero, full-width formats and dedicated footer remain.

Source/documentation prior to this refinement is preserved in `docs/design/archive/pre-workflow-alignment-2026-10-13/`.
Workflow alignment validation: build and changed-file formatting passed. Booth and template navbars at 1440px measured the same left/right edges, 72.8px height and 144px logo width after the stable scrollbar gutter. The shared header retains 112px logos and 16px gutters at 390px. The editor uses the same unchanged .app and WorkflowSteps renderer. Landing Capture computes black/white with no default shadow. No horizontal overflow was observed.

## Earlier open landing steps and viewport-fit hero — 2026-10-13

The latest user comments supersede the boxed how-to treatment. Restore three open image-over-copy columns with no background, border, radius, shadow or text divider. Markers are 34px black rounded squares with white numerals. Preserve the transparent illustrations, Plus Jakarta Sans, full-width formats strip, grid and dedicated footer. Hero Capture is white with black text and no shadow; hover inverts it and introduces the 6px hard shadow. The footer action retains its existing treatment.

Hero copy and sample prints form one 100svh composition (minimum 560px for readable controls), with a flexible size-container artwork stage. Container query units size the prints to the actual remaining height/width, retaining photo geometry and captions. Shorter-than-560px screens use ordinary flow. Archive: `docs/design/archive/pre-open-landing-steps-2026-10-13/`.
Validation: production build and changed-file formatting passed. Browser measurements at 802 × 668 and 390 × 844 confirmed the entire hero/showcase within the first viewport and no horizontal overflow. Desktop open steps have zero border, padding and shadow. The requested font/grid are intentional detector findings; decorative print-caption sizes are documented above. Previews are saved in the chat visualization directory.

## Earlier portfolio-reference landing — 2026-10-13

The user's correction pins the supplied portfolio/admin screenshots and `http://localhost:8080/Frontend/User/PublicDashboard.aspx` as the visual authority for **landing and dedicated footer only**. This section supersedes the initial home-only interpretation below; shared workflow styling stays unchanged. [Reference implementation and validation](docs/design/LANDING-REFERENCE-MATCH.md) documents source evidence and scope.

Landing uses locally bundled **Plus Jakarta Sans** 400/600/700/800 from `@fontsource/plus-jakarta-sans@5.3.0`; display and card headings use 800. Normative home colors are Ink `#000`, Paper `#fff`, supporting text `#52525b`, divider `#e4e4e7` and grid `#0001`. Structural cards have 2.5px Ink borders, 18px corners and `6px 6px 0 #000` shadows; buttons use 2px borders, 10px corners and a 4px hard shadow, increasing to 6px on hover and compressing on press. Numbered step markers are outlined 44px circles. Preserve generated transparent illustrations, logo and product copy. Hero remains centered; cards preserve the three sequential instructions.

The 32px grid fills home. The formats strip now spans the full app/browser width, including its white surface and border lines; only its contents are bounded to 1200px. Main sections use that same inner width with 32px gutters, reducing to 16px below 700px. Step cards stack below 700px. The dedicated footer has logo/product copy, working section links, an Open the booth action, and a black copyright/privacy bar. Footer columns collapse from three to two at 800px and one at 420px. Touch links are at least 44px; focus and reduced motion remain explicit.

Prior documentation and source are preserved in the exact archive (historical file removed). The original shared workflow still uses DM Sans and the modern tokens at the top of this document. Home font overrides affect `.home-app` only.
## Superseded initial home-page neobrutalism — 2026-10-13

The latest user request restores monochrome neobrutalism specifically on `#/`. [Landing contract](docs/design/LANDING-NEOBRUTALISM.md) supersedes the earlier home-page grid/shadow exclusions. The public dashboard at `http://localhost:8080/Frontend/User/PublicDashboard.aspx` supplies the high-contrast white/black surfaces, bold sans hierarchy, dark outlines and modest control rounding; the explicitly requested 32px grid remains. Shared workflow tokens above continue to govern non-home surfaces.

Home overrides: Ink `#000`, Paper `#fff`, supporting text `#333`; 2px structural borders; 10px Capture corners; 3px hard Capture shadow; inverse hover and 3px pressed compression. Bundled DM Sans remains 400/500/700. Preserve centered hero and supplied logo. Three transparent generated illustrations sit above numbered step headings and copy, in three open columns at desktop width, stacked at 700px and below. Heading 32–44px, step title 19–24px, body 16px/1.65. Home rules are scoped in `LandingTheme.css` and loaded last. Preserve creative media colors and reduced-motion support.

The previous complete design file is preserved in the dated archive (historical file removed). Earlier design history below remains verbatim.
## Historical design before modernization — 2026-10-12

The complete previous document, including its former normative frontmatter, follows verbatim. It is historical and does not override the current tokens, accepted brief, or direction contract. The exact file snapshot is also in the dated archive (historical file removed).

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

The additional landing composition reference (historical file removed) pins the centered home-page hero as a user-approved composition. It does not replace the site's typography, palette, sharp controls, or camera behavior.

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

## Template picker adopts the landing design — 2026-10-13

The user's explicit request extends the landing vocabulary to #/templates. See [TEMPLATES-DESIGN-CONCEPT.md](docs/design/TEMPLATES-DESIGN-CONCEPT.md) for the route contract: Plus Jakarta Sans, 32px grid, black outlines, square workflow markers, hard selected/hover shadows and white Capture-style actions. Preserve shared workflow margins, filter/selection/capture-lock behavior and the compact footer. Camera and editor retain their current styling. The route-scoped TemplatesTheme.css is the implementation authority for this extension.

## Booth adopts the established design — 2026-10-13

The user extends the established landing/template design to #/booth. [BOOTH-DESIGN-CONCEPT.md](docs/design/BOOTH-DESIGN-CONCEPT.md) is the route contract. BoothTheme.css supplies the 32px monochrome grid, Plus Jakarta Sans, square workflow markers, 2px preview/review outlines, rounded camera tools, hard popover shadows and white actions with black hover states. Preserve the shared workflow alignment and all capture/media behavior; the editor keeps its existing styling.

## Customize and the shared workflow footer — 2026-10-13

[EDITOR-DESIGN-CONCEPT.md](docs/design/EDITOR-DESIGN-CONCEPT.md) extends the established design to #/edit: Plus Jakarta Sans, 32px monochrome grid, 2px outlines, matching workflow header and white actions with stationary black/white hover states. Choose layout, Capture and Customize now share the full-width black copyright/privacy/Back-to-top footer through Footer.jsx and WorkflowFooter.css. Both confirmation-dialog actions also invert without lift or shadow. The homepage retains its dedicated footer. Editor behavior, real media colors and capture guards stay intact.

## Landing formats marquee and permanent compact footer — 2026-10-13

The formats strip now uses a seamless 28-second monochrome marquee with star separators, pause/resume control, hover/focus pause and a static reduced-motion fallback. The user confirms permanent removal of landing-footer-inner; its markup and obsolete theme styles are removed. Only the compact black bottom bar remains. [LANDING-DESIGN-CONCEPT.md](docs/design/LANDING-DESIGN-CONCEPT.md) is updated as the current landing authority. Previous source and documentation are preserved in docs/design/archive/pre-formats-marquee-2026-10-13/.


## Responsive system refinement — 2026-10-13

[RESPONSIVE-DESIGN.md](docs/design/RESPONSIVE-DESIGN.md) governs responsive adaptations across home, Choose layout, Capture and Customize. The last-loaded responsive.css adds safe-area gutters, short-phone hero sizing, two-column mobile layout choices, stacked locked-session actions, expanding mobile review panels, below-preview camera tools with 44px switch targets, and a more compact adaptive editor. The landing entry label is centered. Current copy and all capture/session/export logic remain unchanged. Browser checks cover 320×568, 390×844, 768×1024, 844×390 and 1440×900; 44 existing tests pass.

## Universal footer and landing rhythm — 2026-10-13

All four pages now use the same Footer.jsx and Footer.css: compact full-width black bar, dynamic copyright year, “Powered by .decide”, and route-preserving Back to top. LandingFooter.jsx and WorkflowFooter.css are removed; dialog actions use DialogActions.css. The marquee separates alternating text and stars with equal gaps across the repeated boundary. The sample caption and “Snap. Style. Save.” heading each sit 40px from the ribbon, reduced to 28px on phones. This supersedes earlier separate-footer and 16px-caption-spacing notes.

## Capture controls and mobile footer correction — 2026-10-13

Redo reconnects a cleared session and waits for the shutter instead of automatically snapping. Stacked camera actions stay 12px inside the preview and reserve space between corner tool toggles even when cancellation text wraps. The mobile universal footer centers its copyright/credit columns and places Back to top on a centered second row.

## System audit and cleanup — 2026-10-13

The [system audit](docs/development/SYSTEM-AUDIT-2026-10-13.md) records the current checks and remaining limitations. Verified unused modules, retired Jeeliz files/test, legacy unimported styles, old favicon and unused Space Grotesk dependency are removed, with rollback originals archived. The live editor's artwork retry path now recovers the same selected frame after a transient load failure. No established visual tokens or capture/export format was changed. Current README instructions replace conflicting historical descriptions.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.

## Documentation cleanup and footer scope — 2026-10-13

At the user's request, archive, references and verification are removed from docs/design. No runtime assets were removed. Footer.jsx remains shared across all four routes, but App.jsx enables Back to top only for home. Choose layout, Capture and Customize display copyright and credit only.

Final uniform-footer decision — 2026-10-13: all four pages use the same Footer.jsx/Footer.css, containing only the dynamic copyright year and Powered by .decide. Back to top is removed from every page. Its route flag, click handler, link styles and unused LandingArrow.jsx are removed. This supersedes earlier footer-link descriptions.

## Mobile camera tools — 2026-10-13

On the stacked capture layout (width below 900px or height below 420px), Settings and Face Stickers are mutually exclusive. Opening one immediately closes the other; tapping the active toggle closes it. Controls remain mounted, preserving the countdown, camera settings and sticker selection. Crossing into the mobile layout reconciles any desktop pair of open panels. The existing narrow-camera desktop exclusivity is retained.

Mobile toggle buttons show the supplied icon, a short label and a chevron. An open panel uses a black button with white artwork/text and an upward chevron; closed buttons remain white with black artwork/text. Native summary keyboard activation, aria-expanded/aria-controls and Escape dismissal with focus return are preserved. Desktop buttons retain their original icon-only appearance.

Mobile tool content has a 50dvh / 360px height cap and native vertical overflow, pan-y/pinch-zoom touch handling and contained overscroll. Phone toggles are 64 by 48px and reserve a separate central lane for the shutter and wrapped cancellation buttons. Creative sticker artwork is not recolored.

Validation: the production build and all 14 existing UI contract checks pass. Chromium touch emulation verifies single-open switching, rapid taps, preserved countdown choice, active button colors, keyboard dismissal, actual touch swipes through Settings, no horizontal overflow, simulated-camera countdown cancellation spacing, and independent desktop panels at 390x844, 320x568, 820x1180, 844x390 and 1600x1000. These checks do not replace testing on a physical iOS/Android device.
Mobile camera correction — 2026-10-14: tool toggles are icon-only again, with accessible labels retained. Remove the visible text labels and chevrons; the black/white open-state inversion remains, along with single-panel opening and preserved selections. Mobile targets return to 48px (44px on phone widths). This supersedes the labeled-button description above.

Settings uses automatic scroll chaining on mobile. With no internal overflow, swiping anywhere in Settings scrolls the document; with overflow, the panel scrolls internally and passes movement to the page at its boundaries. The previous contained overscroll trapped gestures on fitting panels. Verified actual touch gestures beginning on both a setting label and the Photo button at 390x844, 320x568 and 844x390, plus overflowing Settings at 320px viewport height. Chromium touch emulation and the existing 14 UI contract checks pass; physical-device validation remains separate.
## Original scrapbook frame collection — 2026-10-14

Fifteen new frames pair original ImageGen stickers with decorative paper and adaptive mounts. Stickers intentionally overlap photo corners while leaving the central half clear; placement adapts to all 21 layouts and is shared by previews and JPG/live-strip composition. The existing eight frames remain. [Collection, generation prompts and validation](docs/design/SCRAPBOOK-FRAMES.md) record the assets and rendering contract. Interface typography, palette and desktop/mobile layout are retained.
## Editor controls order and mobile scrolling — 2026-10-14

The editor-options block precedes the download/start-over block on every screen size. At intermediate widths up to 1000px, the controls use one column so downloads remain below the options. On phone widths up to 700px, only the active editor-tool-panel scrolls, with a maximum height of min(48dvh, 420px), native vertical touch scrolling, pinch zoom and automatic scroll chaining at boundaries. Tabs and download controls stay outside that scroll container. Short tools retain their natural height. Existing desktop panel styling and tab behavior are preserved.

Validation: all 14 UI contract checks and the production build pass. Browser checks at 1440, 900, 390 and 320px verify download placement; actual touch gestures at 390 and 320px scroll long option lists without moving the document. Short Text panels and horizontal overflow are also checked.
Desktop editor scrolling refinement — 2026-10-14: the active tool panel now scrolls internally at every screen size. Its shared maximum is min(48dvh, 420px); desktop widths above 1000px use a window-height budget of min(420px, max(160px, 100dvh - 560px)) to keep the download action below the options and within reach. Tabs and download/start-over actions remain outside the scroll area. Panels are keyboard-focusable with a visible inset focus outline, allowing Page Down and other native scrolling keys.

Browser checks at 1440x1000 and 1280x720 verify internal mouse-wheel and keyboard scrolling plus a visible download button; 900px tablet and 390/320px phone checks verify internal touch scrolling. These supersede the earlier mobile-only scrolling rule. Very short windows retain normal page scrolling to keep all controls reachable.
Matched desktop editor columns — 2026-10-14: at side-by-side widths above 1000px, the preview artifact establishes the grid row height. The controls stretch to that height with size containment, and editor-options/its active tool panel flex into the remaining space above downloads. Tabs and download actions do not shrink. This replaces the fixed desktop window-height cap, gives long lists more room, and keeps column heights consistent across all six tools. Stacked tablet/mobile layouts retain their bounded internal scrolling. Browser checks at 1440x1000 and 1280x720 confirm equal column heights, a larger tool area, and internal mouse-wheel/keyboard scrolling; tablet/phone swipe checks pass. The production build passes.
## Mobile editor pinned preview — 2026-10-15

At widths up to 700px, and landscape viewports up to 1000px wide and below 420px tall, the image preview remains sticky 8px below the safe-area top, matching the mobile selection panel inset, while history, options and downloads scroll beneath it. The preview occupies min(46dvh, 400px); its image stage flexes into the remaining space and preserves the full image proportions. The artifact wrapper uses display: contents so the preview shares the controls' grid and remains pinned across the entire editor. Mobile tool panels use natural height and document scrolling, replacing their previous nested scroll area. Root scroll padding keeps focused controls below the pinned preview. Desktop retains its existing two-column layout and internal tool scrolling.

Validation: the production build and all 14 existing UI contract checks pass. Chromium viewport checks at 390x844, 320x568 and 844x390 confirm a preview top of 0 while the document scrolls, positive image-stage height and no horizontal overflow; 1440x900 retains desktop columns. Physical iOS/Android gestures remain untested.
## Template sample photography — 2026-10-19

All 21 layout previews show sample photography within their actual export frame rectangles. Standard slots cycle through the bundled four-pose contact sheet with top-aligned cover cropping. Slots wider than 1.8:1 use template-wide-original-couple.png, generated with the original contact sheet as an identity reference, with centered cover fitting so both faces remain visible without side margins. The shared preview also supplies the editor layout picker. Template proportions, gutters, footer and selection behavior remain unchanged.

## Metallic and party frames — 2026-10-19

Eight approved frame styles are available in Customize → Frames: Chrome Crush, Holo Dream, Mixtape, Snail Mail, Play Date, Garden Club, Disco Pink and Pink Premiere. Original generated material textures and alpha sticker atlases adapt to all 21 layouts, with photos and captions composed at runtime. Corner decorations preserve the central photo area. Existing frame IDs, branding and logo remain unchanged.

Each optimized WebP sheet combines a paper swatch with a four-sprite transparent atlas. The loader detects the transparent boundary, caches decoded layers and supports retry after load failure. Paper tiling preserves material proportions. Thumbnails, editor previews, JPG and live-strip rendering use the same layers. Browser verification covers all 168 new frame/layout combinations and eight correctly sized JPG exports. Live MP4 encoding was not separately exercised.

## Mentomory identity — 2026-10-19

The public brand is Mentomory. The selected monochrome doodle camera-m lockup is public/mentomory-logo-v2.png, with a matching favicon, touch icon and social card. Use the transparent horizontal lockup in the landing hero and workflow header with its original proportions; header widths are 180px on desktop and 140px on compact layouts. Landing logo widths range from 180px on narrow phones to 260px. The wordmark, footer, page metadata, sample print captions, default editor caption and download filenames use Mentomory/mentomory. Internal navigation event names and analytics identifiers remain stable. Existing hosting and repository addresses retain their configured names. Earlier Pixbooth design references describe historical identity; interface typography, palette and frame artwork remain current.
Brand asset correction — 2026-10-19: the camera logo uses opaque white interior regions so the page grid does not show through it. The favicon uses the isolated camera mark with transparent exterior and no square backplate; its camera interior remains white.

## Search visibility — 2026-10-19

The public SEO origin is https://mentomory.pixyzbit.dev, configured once in src/data/seo.js. The production build pre-renders the actual home and layout catalog components into index.html and templates.html, then generates noindex session shells for booth.html/edit.html. Vercel rewrites clean routes to those generated files and redirects direct HTML aliases to clean URLs. Public pages have unique titles/descriptions, self-canonicals, share metadata and structured WebSite/WebPage data; the home page also describes the WebApplication. In-app route changes update the same tags. Only home and layouts appear in the generated sitemap; robots.txt permits crawling so private-route noindex rules can be read. Google verification HTML remains packaged.

A compact home section provides a crawlable layout link and factual help about capture, live strips and local session storage. It preserves the existing monochrome identity. No ratings, reviews or FAQ rich-result claims are invented. Build checks verify all route metadata, one canonical per page, all 21 prerendered layout cards, sitemap exclusions and verification-file presence. All 56 tests pass, including refreshed navigation assertions for the existing clean URLs.

Deployment DNS verified — 2026-10-19: both mentomory and pixbooth resolve to cff7ca11cc2bb6ea.vercel-dns-017.com at the authoritative Name.com provider. These SEO changes follow the separate logo/rebrand deployment 5dfc684.

## Landing help section and footer — 2026-10-20

The home help section uses the full 1200px page container with an open two-column composition: introduction and layout link on the left, three native FAQ disclosures on the right. Plus Jakarta Sans headings scale from 32 to 44px; desktop introduction copy is 18px and FAQ questions are 20px. A solid Paper reading surface, a 2px Ink section divider and fine Line row separators keep the section clear against the home grid. Rows use plus/minus indicators, visible keyboard focus and native disclosure behavior. Below 900px, the section stacks; phone questions remain 18px with at least 80px row targets. Existing factual copy and clean navigation remain intact. The shared footer credit reads “Made by .dcd”, with only “.dcd” bold.

## Live recording control spacing — 2026-10-20

Recording status/progress and Cancel recording share the bottom-anchored floating control stack with an 8px gap. Status uses normal flow inside the stack, replacing its independent absolute position that overlapped cancellation. Both controls fit the central mobile lane and remain inside the preview at 1280x900, 820x1180, 390x844, 320x568 and 844x390 in a camera-free component preview. This verifies layout and callback dispatch; physical camera recording was not exercised.

## Camera mark with sparkles — 2026-10-20

The active identity uses the freshly generated camera-m mark in public/mentomory-camera-v3.png, including the two excitement strokes and two diamond sparkles. public/mentomory-logo-v3.png pairs it with the Mentomory wordmark and is used by the shared Brand component on the home and workflow routes. The 1200x400 lockup, 256px favicon and 180px touch icon have transparent exteriors and white camera interiors. The 1200x630 social card uses a white background for JPEG compatibility. HTML and route metadata reference the versioned v3 assets to refresh cached branding. The source-generation prompt is recorded in docs/design/MENTOMORY-CAMERA-V3-PROMPT.txt. Existing section layouts and FAQ behavior are unchanged in this branding revision.

Wordmark correction — 2026-10-20: public/mentomory-logo-v4.png restores the original lowercase lettering directly from mentomory-logo-v2.png while replacing only the camera with the approved v3 mark. The original 1200x320 aspect ratio and wordmark coordinates are retained. docs/design/MENTOMORY-LOCKUP-V4.svg preserves the exact source images and clipping/composition used to render the lockup. The white social card is public/mentomory-social-v4.jpg; the camera-only v3 favicon and touch icon remain current. This supersedes the regenerated v3 wordmark.
