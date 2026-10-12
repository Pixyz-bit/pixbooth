> **Historical concept — superseded 2026-10-12.** The user approved a modern minimal monochrome redesign in [MODERNIZATION-BRIEF.md](MODERNIZATION-BRIEF.md). [MODERNIZATION-CONTRACT.md](MODERNIZATION-CONTRACT.md) and [root DESIGN.md](../../DESIGN.md) now govern current visual decisions, with src/styles/modern.css as the final loaded stylesheet. The former hard shadows, dense sidebars, sharp working corners, pure black/white-only chrome, and landing grid described below are historical. The supplied logo, authored artwork, creative content colors, and original reference files remain intact. The complete original concept follows without alteration; see [implementation and validation](MODERNIZATION-IMPLEMENTATION.md) for the current scope.

# Pixbooth design concept

## Overview

**Creative North Star: "The Monochrome Photo Booth"**

This is the authoritative visual and interaction concept for the entire Pixbooth site: home, camera booth, captured-media gallery, editor, and all loading, empty, error, and completion states. The user established the four supplied neobrutalist references as the site-wide direction and requested only white and black for the interface for now. This decision supersedes the former PhotoPix pale-blue dots, soft rounded panels, and quiet portfolio/admin styling. The later landing composition reference pins the home hero's structure within that world.

The canonical working project is `C:\Martin Archive\Programming\2026 Projects\PhotoPix`. The public brand is Pixbooth. [Root DESIGN.md](../../DESIGN.md) is the compact token entry point, [.impeccable/design.json](../../.impeccable/design.json) carries component and extension metadata, and [PRODUCT.md](../../PRODUCT.md) owns product behavior. This document governs visual choices across those behaviors. A future redesign requires an explicit user decision; adding a feature does not authorize a different visual world.

Pixbooth should feel like a direct, playful instrument for making a keepsake. Dense groups, bold type, crisp outlines, and simple inverted states make the controls easy to scan. Creative output supplies personality; the interface supplies a clear frame around it. Preserve the user's supplied `public/pixbooth-logo.png` unchanged. Do not redraw the logo with text, crop away its identity, recolor it, or substitute an icon.

**Key Characteristics:**

- Pure black-and-white interface chrome.
- Bold bundled DM Sans with compact, useful hierarchy.
- Sharp frames with square or subtly softened 0–4px edges.
- Clear outlined groups and high-contrast selected states.
- Hard offset shadows reserved for major actions.
- An expansive, shadow-free camera and media-led editor.

### Reference interpretation

The images are inspiration for visual grammar, not specifications for another product. Their colors, copy, code, assets, and unrelated features are not adopted.

| Supplied reference | What carries into Pixbooth | What stays outside the concept |
| --- | --- | --- |
| [Mobile interface](references/mobile-interface.png) | Dense boxed groups, bold headings, practical image grids, unmistakable selection and action placement. | Shopping navigation, carts, price labels, fashion photography, lime/purple accents, and the exact commerce composition. |
| [Button system](references/button-system.png) | Thick action outlines, firm rectangular silhouettes, a hard shadow that compresses on press, and clear default/hover/pressed states. | Acid highlights, cream/grid backdrop, monospace branding, component-documentation copy, and shadows on every component. |
| [Card structure](references/card-structure.png) | Strong heading/content/action hierarchy and a framed surface whose primary action is easy to find. | Pricing tiers, checkbox glyph decoration, purple action fill, and a hard shadow on every panel. |
| [Workspace layout](references/workspace-layout.png) | Framed desktop rails, dense useful grouping, bold main content, and an obvious relationship between navigation, artifact, and controls. | Documentation-site navigation, framework badges, saturated colors, ornamental tilted stickers, and its header topology. |

Read the references together. The user's black-and-white restriction and camera-shadow exception take precedence over any individual screenshot detail. Interpret the shapes and hierarchy in Pixbooth's current home/booth/editor flow rather than recreating an ecommerce or UI-kit site.

The additional [landing composition reference](references/landing-composition.png) establishes the centered headline/copy/action hierarchy and a central photographic artifact with supporting items. It supplies structure only. Its serif display type, colored cards, rounded pills, phone mockup, metrics, brand-logo row, and commerce content are not Pixbooth requirements. The centered hero is an explicit user-pinned exception to generic layout defaults; retain the site's DM Sans, black-and-white chrome, and sharp frames.

## Colors

**The Chrome Rule.** White (`#fff`) and black (`#000`) are the only interface palette colors. Use white for the page and unselected surfaces; black for text, outlines, and emphasis. Selected or active controls invert to white text on black. Hover states invert deliberately rather than introducing a gray or colored accent.

The supplied references contain lime, purple, cream, yellow, mint, and pink. None is an interface token. Do not restore the old pale-blue dot texture. The landing page uses the user's requested 32px grid: 1px black lines at low opacity on white, with no colored accent. Booth and editor backgrounds remain plain white.

**The Content Color Rule.** Captured photos and clips are media, not chrome. User-selected background designs, border motifs, face effects, and photo filters are creative content. Their swatches and thumbnails may display their actual colors so users can make meaningful choices. Colored output remains colored. Do not apply grayscale to the page root, all canvases, all images/videos, or the supplied logo to enforce the interface palette. The Black & white photo filter remains an explicit user choice.

Errors, recording progress, unavailable states, and recovery copy also use black and white. Explain the state through words, borders, progress, and control availability rather than a red/green accent. A selected option remains identifiable through its inverted surface and pressed-state semantics; it must not rely on content colors alone.

## Typography

Use the bundled **DM Sans**, with `sans-serif` fallback. The implementation imports weights 400, 500, and 700. Do not introduce a reference's condensed headline family or monospace display treatment merely because it appears in the screenshot.

| Role | Source-backed treatment | Use |
| --- | --- | --- |
| Landing display | 700; `clamp(48px, 5.3vw, 72px)`; line-height 1.02; tracking −.035em | Centered home-page message. Compact desktop heights use 60px; mobile uses `clamp(38px, 10vw, 48px)`. |
| Page heading | 700; 28px; line-height 1.15; tracking −.03em | Booth and editor title. Compact layouts use 25–26px. |
| Panel title | 700; 18–19px; tracking near −.02em | Camera, gallery, and editor artifact headings. |
| Group heading | 700; 13–15px | Disclosure summaries and control groups. |
| Action label | 700; 13px, with larger capture/home actions | Primary and secondary buttons. |
| Supporting copy | 400; generally 11–13px with 1.5–1.6 line height | Status, instructions, captions, and recovery copy. |

**The Useful Density Rule.** Make groups compact through hierarchy and spacing, not clipped labels or disappearing actions. Keep labels attached to their controls, allow long sticker names to wrap, and allow camera device labels to fit. Preserve the source's plain, direct copy; do not introduce ornamental uppercase kickers, repeated eyebrows, or reference slogans.

## Layout

### Home

The home page follows the user's pinned centered composition. Its maximum content width is 1240px. The supplied logo sits above the two-line headline inside the hero, followed by short two-line copy, one Capture action, and a compact privacy line. There is no landing navbar. The Capture button starts white with black text and arrow, then becomes black with white text and arrow on hover. It enters step one at `#/templates`, initially selecting the four-photo Classic strip. The interactive landing playground, canvas, and design options have been removed.

Below the hero copy, a narrow four-pose strip sits beside a central framed print and a smaller right-hand print with a five-second feature note. The strip and small print have fixed −6° and +5° rotations: these are physical-photo artifact treatments, not tilted UI badges or animation. The project-local grayscale `public/landing-contact-sheet.webp` is generated illustrative artwork, labeled Illustrative sample captures. It does not depict a user's session or imply a customer testimonial. [Landing artwork provenance](landing-artwork.md) records the exact generation prompt and format conversion.

Desktop showcase columns are 110px / 300px / 180px. The hero logo is 200px wide normally, 180px at desktop heights of 800px and below, and 160px on mobile. At compact desktop heights, the hero top padding is 24px, heading is 60px, and showcase columns are 76px / 250px / 160px. Mobile retains the narrow strip and central print and hides the right ornament. A bordered formats ribbon and a native ordered list of three sequential how-to rows finish the page. The subtle landing grid is an explicit user-requested exception to plain page backgrounds. This composition keeps the sharp monochrome world; it does not copy the reference's fonts or colorful ornaments.

### Shared workflow navigation

Non-home pages share a three-step semantic breadcrumb: Choose template, Capture photos, and Edit & download, plus a Home link. The current step is an inverted black/white link with `aria-current="step"`; available previous steps are links, while unavailable future steps use non-link text with `aria-disabled="true"`. Capture becomes available after Continue and editing after the capture count is complete. Mobile places each number above its label without changing the sequence.

Backtracking preserves captured photos/clips and editor choices in browser memory. The initial capture template locks after the first item; step one then shows the existing layout and a Return to capture action. Start over clears captures and editor choices, returns to step one, and leaves the camera off. Fresh/reloaded capture or edit URLs without session state return to step one. Navigation away from capture cancels countdown/recording and stops the camera. These behaviors support a clear sequence without making earlier steps destructive.

### Step one: choose template

The `#/templates` page presents the full 21-layout catalog beside a selected-layout summary. Each choice contains a proportional SVG diagram, name, capture count, pressed-state semantics, and an inverted selected state with a check. The summary enlarges the chosen diagram and ends with Continue to capture; it does not request camera access.

Desktop uses a flexible catalog and a 320px summary with an 18px gap. The catalog uses four columns at 1200px and above, three on narrower desktop widths, and two on tablet/mobile. At 601–999px the summary is 260px wide. At 600px and below, it stacks beneath the catalog. Keep the catalog bounded and scrollable while the Continue action remains visible.

### Step two: capture

At widths of 1000px and above, use three purposeful columns: a face-effect-only sidebar, flexible camera, and individual captured-media gallery with settings. Initial template selection belongs exclusively to step one. Default outer widths are 220px and 360px, with 16px gaps and 24px page padding. At 1000–1199px, use 200px and 320px outer columns, 12px gaps, and 16px page padding. The camera receives the remaining width and workspace height; it is not constrained to a square.

Shared step breadcrumbs sit above the capture workspace. The supplied logo is in the workflow navigation; do not duplicate it in the camera panel. Capture actions sit below the camera. The camera contains the full source frame; gallery cards display centered cover crops with the selected template's frame proportions. The populated gallery uses two columns and scrolls internally; its empty state uses one full-width area. Photo/Live mode, face effects, and native collapsible photo settings remain on this step.

The face-effect collection is a bounded scroll region, not a page-height list. Its native disclosure reduces sidebar load. Search, category, current effect, Clear sticker, and tracking status stay usable around the collection. On compact desktop heights, keep camera actions and editor download/export actions visible while option collections scroll.

At 601–999px, place the face-effect sidebar across the top, then camera and a 300px gallery column below. At 600px and below, stack capture panels and use a four-column effect grid. The mobile camera column uses `clamp(380px, 68dvh, 600px)`. Capture is one page, with a bounded effect collection and a two-column gallery.

### Step three: edit & download

Submit opens `#/edit` only after the initial template's capture count is complete. Lead with the composed artifact and put controls beside it on desktop. Compatible same-count layouts, original decorative frames, backgrounds, filters, and surrounding stickers are native collapsible groups. Caption text is a labeled field. Option controls scroll independently from the persistent action area. Mobile stacks artifact and controls on one scrolling page. Returning to earlier steps keeps editor choices in memory for the next visit; Start over clears them.

The editor preview displays the output's actual geometry. Base photo cells are 900 × 675px, but square, portrait, Polaroid, film, and mixed-size templates have explicit geometry overrides. Respect those frame rectangles rather than forcing all gallery images or output frames to 4:3. Preview and export share the strip renderer and centered source-crop logic. See PRODUCT.md and `src/lib/collage.js` for output dimensions and template behavior.

## Elevation & Depth

**The Action Shadow Rule.** Major dark CTAs use `box-shadow: 4px 4px 0 #000`. Press translates the action by `(4px, 4px)` and removes that shadow, so the interaction feels compressed. Reserve this device for the home Capture action, shutter/record action, Submit, and primary download/export action. It is a hierarchy cue, not a universal material.

**The Camera Exception.** The camera remains shadow-free, honoring the prior explicit camera request. Main panels, captured-media cards, template/effect tiles, disclosure containers, and outline actions are also border-led in the implementation. Do not copy the card/workspace references' large panel shadows. Do not add soft ambient shadows, blurred glows, gradients, or layered colored backplates to UI chrome.

State transitions are short and functional: current controls use about 180ms, with the switch about 200ms. Progress represents actual recording/export work. Reduced-motion preference removes animation and transitions. Do not add bouncing panels, decorative marquees, or reference motion without a product need.

## Shapes

Use rectangular silhouettes and sharp 0–4px edges: 4px on main panels, 2px on standard controls and media cards, and square corners where a flat divider or frame naturally calls for them. The signature structural stroke is 2px solid black on panels and actions. Keep borders crisp and aligned; never imitate a rough hand-drawn outline with random rotations.

Template icons are proportional SVG diagrams of the actual layout. Face-effect thumbnails and surrounding-sticker previews use the same authored canvas artwork that reaches creative output. Standard action icons remain restrained inline SVG with accompanying labels where needed. The supplied PNG logo retains its original proportions and artwork.

## Components

### Buttons and selection

Primary actions are black with white text; outline actions are white with black text. Both use bold DM Sans, a 2px outline, 2px corner radius, and a minimum 44px action height. Dark primary actions alone receive the hard offset shadow. Hover inverts black/white. Selected templates, face effects, capture mode, countdown choices, backgrounds, and filters visibly invert and expose their state semantically.

Disabled primary buttons use white fill, black text, dashed borders, no shadow, and disabled semantics. Explain a blocked capture, unavailable codec, tracking failure, or pending render with concise nearby status. Do not rely on faded opacity as the only explanation.

### Disclosures, fields, and collections

Use the step-one grid for initial template selection, and native `details`/`summary` for face-effect/settings groups and final-editor sections. Give search, category, device, and caption controls visible labels. Preserve an empty-search recovery action and a clear None choice. Dense collections must support keyboard use and allow focus outlines to remain visible inside their scroll region.

The keyboard focus ring is 3px black with a 3px offset on light surfaces. Inverted selected segmented controls use a white ring within their dark surface. Do not remove keyboard focus to make a screenshot cleaner. Route headings receive programmatic focus without a decorative outline.

### Media and progress

Keep live preview containment separate from output cover cropping. Photo and Live captures show individual media before Submit. Live controls expose recording duration/progress, cancel, playable clips, animated composed preview, export progress/cancel, and recovery. UI for those states stays monochrome; source media and chosen artwork remain intact. Announce status updates through the existing live regions without repeating every animation frame.

## Do's and Don'ts

- Do treat this guide as the authority across every page and state.
- Do preserve the Pixbooth PNG and bundled DM Sans.
- Do keep chrome black/white and creative output faithful to user choices.
- Do use compact framed groups, clear inverted states, and visible action areas.
- Do reserve hard offset shadows for major CTAs and keep the camera flat.
- Do test broad and compact desktop widths, tablet/mobile stacking, disclosure states, long labels, keyboard use, and reduced motion.
- Don't bring reference accent colors, pale-blue dots, soft shadows, broad rounded cards, or decorative tilted badges into the interface.
- Don't copy ecommerce features, pricing content, reference text, product photography, third-party code, or assumed licenses from the screenshots.
- Don't make the entire site grayscale or recolor the logo to satisfy the chrome palette.
- Don't call untested MP4 encoding, playback, browser compatibility, or physical-camera behavior verified.
