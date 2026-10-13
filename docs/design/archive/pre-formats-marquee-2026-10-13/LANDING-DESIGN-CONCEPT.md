---
name: Pixbooth landing page
description: Monochrome neobrutalism with an open photo composition and a white footer.
colors:
  ink: "#000"
  paper: "#fff"
  supporting: "#52525b"
  grid: "#0001"
  footer-supporting: "#52525b"
typography:
  hero:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(38px, 6.5svh, 64px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  section:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(32px, 3.5vw, 44px)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  step:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(19px, 1.8vw, 24px)"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "15px"
    fontWeight: 800
    lineHeight: 1.5
rounded:
  action: "10px"
  marker: "8px"
spacing:
  base: "8px"
  mobile-gutter: "16px"
  desktop-gutter: "32px"
  desktop-step-gap: "40px"
components:
  capture:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
    width: "190px"
    height: "50px"
  capture-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  footer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  footer-action:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
    height: "50px"
---

# Pixbooth: current landing design concept

## Overview

**Creative direction: a monochrome photo booth with crisp outlines, bold lettering and real keepsakes as the main visual.**

This document governs the home route `#/` and its dedicated footer as of **2026-10-13**. It records the implemented design after the latest comments: white Capture by default, open how-to steps and a white footer. It supersedes conflicting earlier landing contracts, while preserving their files and archives. [Root DESIGN.md](../../DESIGN.md) remains the shared workflow entry point; this is the current landing-specific authority.

The supplied portfolio references establish the type, outline, rounded-control and hard-shadow vocabulary. The user separately pins the centered hero, 32px grid, open illustrated instructions, edge-to-edge formats strip and dedicated footer. This combination is deliberate; copying the reference's boxed cards into the how-to section is no longer part of the concept.

The homepage's job is to introduce the booth and start a session. It is not an account dashboard. Existing copy, photos and browser behavior supply product truth; do not add claims, pricing, user counts or unrelated account controls.

## Colors

| Role | Value | Use |
| --- | --- | --- |
| Ink | `#000` | Headings, outlines, numerals' background and bottom metadata bar |
| Paper | `#fff` | Main canvas, Capture fill, footer text and footer action |
| Supporting text | `#52525b` | Hero intro, metadata and explanatory text on light surfaces |
| Grid lines | `#0001` | 1px lines repeated every 32px on both axes |
| Footer supporting text | `#52525b` | Secondary copy and navigation on the white footer |

UI chrome stays monochrome. Generated landing illustrations and illustrative captures are grayscale by asset choice. Do not globally desaturate the app: a user's captured media, filters and artwork retain their content colors. Preserve the supplied logo in its original black-and-white rendering directly on the white footer.

## Typography

Use locally bundled **Plus Jakarta Sans**, weights 400/600/700/800, from `@fontsource/plus-jakarta-sans@5.3.0`. The landing imports Latin font files locally; no remote font request is needed. The font license is redistributed in `public/licenses/plus-jakarta-sans-OFL.txt`.

Hero and section headings use 800 weight, tight tracking and balanced line lengths. Ordinary step copy is 16px/1.65. Step titles use 18px below 1000px and 22px below 700px. Hero supporting text adapts from 14–16px with viewport height. Footer headings are 16px/800, with its invitation at 26px/1.2. Actions are 15px/800 with readable labels.

The small lettering inside the illustrative prints is artwork metadata, not a UI control. It uses 8–12px; live-note text is 11px with a 14px title. Footer metadata is 12px. Workflow pages continue to use DM Sans; the landing font override is scoped to `.home-app`.

## Layout

The page follows this sequence:

1. **First-screen hero:** supplied logo; “A little booth. A lot of you.”; a brief introduction; Capture; the caption “A few poses. A little keepsake.”; sample photo composition.
2. **Full-width formats strip:** Photo strips, Face stickers, 5-second live clips and JPG & MP4 downloads.
3. **Open how-to section:** “A moment, in three moves.”, its subtitle, and three illustrated sequential instructions.
4. **White dedicated footer:** brand/product copy, navigation, a booth action, copyright, privacy and Back to top.

### Hero and sample prints

Hero height is `100svh` with a 560px minimum for readable controls. Below 560px viewport height it uses ordinary flow. A flexible `.landing-art-stage` with `container-type: size` receives the space left below the copy; container width/height units size the sample composition without cropping its contents. The tall strip, central print and right Polaroid/live note retain their actual geometry. Fixed −6°/+5° rotations are specific to printed artifacts, never to UI controls. Below 600px, the right ornament is hidden and the strip/central print remain. This layout fits the checked 802×668 and 390×844 viewports.

### Containers and rhythm

The home app fills the available browser content width. Hero and how-to content are bounded to 1200px with 32px gutters; gutters reduce to 16px below 700px. The formats strip's white surface and border lines span edge to edge, while its text shares the bounded inner width. It becomes a two-column row below 700px.

The how-to section has 72px top / 88px bottom spacing at desktop width, reducing to 48px / 56px on mobile. Heading-to-steps spacing is 40px, reducing to 28px. The three columns use a 40px gap, reduced to 22px below 1000px; below 700px they stack with 28px gaps. Images are contained in 300px artwork slots, or 280px at narrower sizes, with 20–26px below each.

### Footer

The white surface is full width. Its inner content shares the 1200px/32px container and has 56px block padding, reduced to 40px on mobile. Three desktop columns become two below 800px, with the invitation spanning both, then one below 420px. The bottom metadata row wraps naturally. The logo keeps its original artwork directly on the white footer without a separate plate.

## Elevation & Depth

The open how-to steps have **no panel background, border, radius, shadow or text divider**. Their transparent assets float over the actual grid, with text directly below. Numbered markers are separate 34px black squares; they do not create a surrounding card.

Capture has no default shadow. On hover its fill remains white and its lettering remains black; a crisp `6px 6px 0 #000` shadow appears and the button moves by −2px on both axes. On press it moves by +4px and the shadow disappears. This preserves the requested hover behavior while making the default white.

The footer action matches Capture: white background, black text and no default shadow. Hover adds a 6px black offset shadow and a -2px lift on both axes. Press moves it by +4px and removes the shadow. Both actions share the same CSS state rules.

Transitions use 180ms with `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced-motion preference removes transitions and nonessential transforms; in-page scrolling switches to immediate movement.

## Shapes

Use crisp 2px action/format borders, 10px action corners and 8px numbered-marker corners. Printed photo mounts preserve their native square geometry. Large round cards, soft shadows and decorative gradients are outside this landing concept. The grid uses ordinary 1px linear-gradient lines, not dots or texture noise.

The white footer and black bottom metadata bar are structural surfaces. Do not add cards around its columns. Keep the logo's original proportions and enough separation around links, headings and the booth action.

## Components

| Component | Responsibility |
| --- | --- |
| `LandingPage.jsx` | Local font imports and bounded hero/how-to wrappers |
| `LandingHero.jsx` | Hero copy, white Capture default, new caption and flexible artwork stage |
| `LandingShowcase.jsx` | Sample print/Polaroid composition with illustrative caption |
| `LandingFormats.jsx` | Full-width strip and bounded text wrapper |
| `LandingHowItWorks.jsx` | Semantic ordered list of open illustrated steps |
| `LandingFooter.jsx` | Home-only white footer and working navigation |
| `LandingTheme.css` | Landing-only tokens, geometry, states and responsive rules |

Capture and Open the booth lead to `#/templates`. Footer section links scroll without changing the hash router; Back to top returns to page position zero. The footer is selected only for home in `App.jsx`; other workflow pages keep their compact footer.

All interactive elements have visible keyboard focus. Light surfaces use a 3px black outline; the main footer uses black, while bottom-bar links use white. Footer links have 44px minimum target height, and primary actions are at least 50px high. The heading hierarchy uses H1, H2 and H3. Decorative generated step images have empty alt text and an aria-hidden container because adjacent text provides the complete instruction. Explicit dimensions reserve space, with lazy loading and async decoding.

The three transparent PNG assets are in `public/how-it-works/`. Their generation prompts and provenance remain in [LANDING-IMAGE-PROMPTS.json](LANDING-IMAGE-PROMPTS.json). The earlier illustrative capture asset is documented in [landing-artwork.md](landing-artwork.md). These are samples, not customer sessions or testimonials.

## Do's and Don'ts

- Do keep the main page white with its 32px grid and the dedicated footer white, with a black bottom metadata bar.
- Do retain the supplied logo, local font and transparent illustration assets.
- Do use the viewport-fit hero and open three-step layout; preserve mobile stacking.
- Do keep Capture white with no default shadow and introduce the black shadow on hover.
- Do maintain black focus rings on the white main footer and white rings on the black bottom bar.
- Do preserve real route behavior, footer links and reduced-motion handling.
- Don't restore the three boxed how-to cards, divider lines or panel shadows.
- Don't recolor the supplied logo or apply global grayscale to user media.
- Don't spread the landing type/chrome onto workflow pages without an explicit request.
- Don't treat older design-history entries as the current landing specification.

Implementation notes and previous decisions are archived rather than deleted. Validation evidence for this revision is recorded after the browser checks in root DESIGN.md; source-only checks do not establish real-camera or export compatibility.


Verified revision: production build and changed-file formatting passed. Browser checks at 1440×900 and 390×844 confirmed the current colors/caption, footer stacking, 44px minimum link targets and no horizontal overflow. No browser console errors were observed. The detector's font and grid findings are intentional choices pinned by the user. Camera capture and export compatibility are outside this landing-design revision.

![Current desktop landing/footer](references/landing-current-footer-desktop.jpg)



Current footer revision: restored the original white-background footer at the user's explicit request. Main footer text is black, supporting copy uses #52525b, the supplied logo is unfiltered without a plate, and Open the booth matches Capture with white fill, black text and no default shadow. The bottom copyright/privacy bar remains black. This supersedes all earlier dark-footer treatments in this document. Capture and the new hero caption retain their latest state.

Bottom footer bar height refinement: its desktop row is reduced to 60% of the original 72px height, now 43.2px with zero vertical padding and a compact 40px Back-to-top link. The white main footer keeps its existing spacing; mobile metadata wraps naturally.

Temporary footer preview: the white landing-footer-inner section is hidden at the user's request. Only the compact black copyright/privacy/Back-to-top bar remains visible. Its markup and layout styles are preserved for restoration.
