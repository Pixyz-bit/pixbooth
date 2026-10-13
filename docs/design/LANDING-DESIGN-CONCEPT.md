---
name: Pixbooth landing page
description: Monochrome neobrutalism with a photo composition, moving formats ribbon and compact black footer.
colors:
  ink: "#000"
  paper: "#fff"
  supporting: "#52525b"
  grid: "#0001"
typography:
  family: "'Plus Jakarta Sans', sans-serif"
  weights: "400/600/700/800"
  hero: "clamp(38px, 6.5svh, 64px)/1.08, weight 800, tracking -0.04em"
  section: "clamp(32px, 3.5vw, 44px)/1.15, weight 800, tracking -0.035em"
  body: "16px/1.65"
  action: "15px/1.5, weight 800"
  marquee: "clamp(16px, 1.5vw, 20px)/1.5, weight 800"
rounded:
  action: "10px"
  marker: "8px"
spacing:
  desktop-gutter: "32px"
  mobile-gutter: "16px"
  grid: "32px"
---

# Pixbooth: current landing design concept

## Overview

The home route `#/` uses the user-pinned monochrome neobrutalist world: a white grid canvas, black outlines, bold locally bundled typography and real photo keepsakes as its visual center. This document records the current design on 2026-10-13 and supersedes earlier landing descriptions. Earlier versions remain archived.

The permanent footer decision removes the former white brand/navigation/invitation section. The page now ends with only its compact black copyright/credit/Back-to-top bar. The former static format row is now a continuous marquee.

## Colors

| Role | Value | Use |
| --- | --- | --- |
| Ink | `#000` | Headings, borders, markers, separators and bottom bar |
| Paper | `#fff` | Main canvas, marquee, Capture fill and bottom-bar text |
| Supporting text | `#52525b` | Explanatory copy and metadata on white |
| Grid | `#0001` | 1px lines every 32px on both axes |

The interface stays monochrome. Illustrative landing imagery is grayscale by asset choice; do not globally desaturate captured media, creative artwork or user-selected filters/backgrounds. The supplied logo retains its original proportions.

## Typography

Use locally bundled Plus Jakarta Sans, weights 400/600/700/800. Font licensing is redistributed in `public/licenses/plus-jakarta-sans-OFL.txt`. Headings are weight 800 with tight tracking. Hero sizing is 38–64px using viewport-height units; section headings are 32–44px. Step titles use 18–24px according to viewport width, body copy 16px/1.65 and actions 15px/800.

The marquee uses bold 16–20px labels with -0.025em tracking. Supporting hero text is 14–16px. Illustrative print metadata is 8–12px artwork lettering, not a control. Footer metadata is 12px.

## Layout

The page sequence is the viewport-fit hero, full-width formats marquee, open three-step instructions and compact black footer. The hero and instructions use a 1200px maximum inner width with 32px gutters, reduced to 16px below 700px. The grid, marquee surface and footer span the available browser content width.

The hero uses `100svh`, a 560px minimum and normal flow below 560px viewport height. A flexible artwork stage with size containment fits the tall strip, central print and right ornament into the remaining space. Print size is bounded by available height and width rather than fixed desktop/mobile caps. The composition aligns to the bottom of that stage, leaving the caption 40px above the marquee, or 28px on phones up to 600px; the hero remains contained in portrait viewports. Preserve their native geometry and artifact-specific rotations. Below 600px, hide the right ornament and retain the strip/central print. Copy: “A little booth. A lot of you.”, the centered “Say Cheese :)” entry action and “A few poses. A little keepsake.” The next section is titled “Snap. Style. Save.”

The how-to section remains open image-over-copy columns: no boxed cards, panel shadows or copy dividers. It uses 40px top/88px bottom spacing, 40px column gaps (22px below 1000px), 300px contained artwork slots (280px on narrower screens) and 34px black numbered markers. Below 700px, the steps stack with 28px gaps and 40px/56px section spacing, with 28px top spacing at 600px and below.

### Formats marquee

Preserve the exact four labels: Photo strips; Face stickers; 5-second live clips; JPG & MP4 downloads. The white ribbon has 2px black horizontal borders. Crisp four-point star SVGs separate labels; their geometry is decorative and hidden from assistive technology.

Two identical flex groups provide a seamless loop. Each desktop group is at least the viewport width or 1100px; mobile groups are 1000px. The track moves from zero to -50% over 28 seconds at constant speed using a CSS transform. No per-frame React state or JavaScript animation loop is used. The duplicate group is `aria-hidden`, so the formats are announced once.

The ribbon pauses on hover. The user has removed its pause/resume button; the animation spans the full strip. Reduced-motion preference removes the animation, duplicate group and separators, leaving all four labels in a static wrapping row. Horizontal overflow is clipped inside the ribbon rather than on the page root.

### Footer

The former `.landing-footer-inner` section is permanently removed, including its logo/product copy, navigation and invitation. The compact black bottom bar remains: dynamic copyright year, “Powered by .decide” and Back to top with the supplied arrow. Its inner row is 43.2px high on desktop, with zero vertical padding and a 40px link; mobile content wraps naturally. Back to top scrolls the current page and respects reduced motion.

## Elevation & Depth

Capture defaults to white with black text and no shadow. Hover keeps those colors, adds a `6px 6px 0 #000` shadow and translates -2px on both axes. Press translates +4px and removes the shadow. Transitions use 180ms exponential easing; reduced motion removes nonessential movement.

The marquee uses a linear loop to maintain constant velocity.  Open steps and the footer have no card shadow. Use crisp structural lines rather than ambient depth.

## Shapes

Actions use 2px outlines and 10px corners. Numbered markers use 8px corners. Printed photo mounts preserve their native geometry. Do not introduce gradients, soft shadows or decorative panels into the open instruction layout.

## Components

| Component | Responsibility |
| --- | --- |
| `LandingPage.jsx` | Local fonts, hero/how-to wrappers and section order |
| `LandingHero.jsx` / `LandingShowcase.jsx` | Hero entry and illustrative sample prints |
| `LandingFormats.jsx` | Memoized formats marquee, duplicates and hover pause |
| `LandingHowItWorks.jsx` | Open illustrated three-step sequence |
| `components/layout/Footer.jsx` / `Footer.css` | Universal compact black footer and route-preserving Back-to-top behavior |
| `LandingTheme.css` | Scoped home tokens, layout, motion and responsive states |

Capture enters `#/templates`. All interactive elements retain visible focus. Primary Capture is at least 50px high. Footer focus is white on black. Generated step images are decorative because adjacent text gives the instruction. Their prompts remain in [LANDING-IMAGE-PROMPTS.json](LANDING-IMAGE-PROMPTS.json); earlier sample-capture provenance is in [landing-artwork.md](landing-artwork.md).

The established visual world also extends to [Choose layout](TEMPLATES-DESIGN-CONCEPT.md), [Capture](BOOTH-DESIGN-CONCEPT.md) and [Customize](EDITOR-DESIGN-CONCEPT.md), each with route-specific task behavior.

## Do's and Don'ts

- Keep the 32px grid, original logo, viewport-fit sample composition and open instructions.
- Keep the marquee seamless, pausable and static for reduced motion.
- Keep duplicate labels hidden from assistive technology and preserve the four real feature labels.
- Keep only the compact black landing footer; the inner footer removal is now permanent.
- Preserve actual media colors and all existing route/session behavior.
- Do not restore boxed how-to cards, the removed footer columns or global grayscale.

Verification: production build and changed-file formatting pass. Desktop and 390px browser checks confirm equal marquee group widths, hover pause, no visible toggle, one accessible copy of the labels, no horizontal page overflow and absence of inner-footer markup. No camera capture/export code is changed.

Hero space verification: 1280×720, 802×668 and 390×844 retain the complete hero inside one viewport, with the caption 40px above the marquee on desktop/tablet and 28px on phones and no horizontal overflow.

Responsive system refinement: [RESPONSIVE-DESIGN.md](RESPONSIVE-DESIGN.md) supersedes earlier narrow-screen sizing with safe-area-aware containers, touch-sized controls and adaptive flow. Its implementation is src/styles/responsive.css; canonical Footer.css and DialogActions.css load afterward.

Marquee spacing refinement: labels and stars are separate alternating flex items. Equal space-around distribution with zero group padding produces equal text-to-star and star-to-text gaps, including the repeated-group boundary. Decorative separator items are hidden in the static reduced-motion layout.

Universal footer and ribbon rhythm — 2026-10-13: all four pages use the single shared Footer.jsx. The inner footer remains permanently removed. The ribbon has matching 40px gaps to the sample caption and section heading (28px at 600px and below), with equal text/star spacing across the loop boundary.
