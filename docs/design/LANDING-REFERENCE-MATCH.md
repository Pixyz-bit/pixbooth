# Exact landing reference and dedicated footer

2026-10-13. The user corrected the earlier approximation and supplied screenshots of portfolio cards, the admin dashboard and an account dialog. They explicitly scoped the update to the landing page and footer. They also requested an edge-to-edge formats strip and a dedicated footer.

## Evidence and application

Reference source is the user's local portfolio app at `http://localhost:8080/Frontend/User/PublicDashboard.aspx`, with `Frontend/Assets/css/public-dashboard.css` and `admin-dashboard.css` providing exact values. Public cards use 2px outlines and 18px radii, with 5px hard shadows on hover. Admin surfaces use stronger borders, 18px corners and 4–8px offset shadows. Buttons use 10px corners. The lettering is Plus Jakarta Sans, with bold 800 headings. No authentication was required to inspect the public page and local styles.

The landing implementation follows those source values: 2.5px card outlines, 18px radii, 6px hard shadows, 2px/10px action geometry and Plus Jakarta Sans 400/600/700/800. Black and white carry interface chrome; supporting text uses the reference's `#52525b`. The user-requested 32px grid is retained. No portfolio users, account fields, credentials, unrelated data or reference green/red states are included.

## Implementation

- `LandingPage` imports the self-hosted Fontsource package and bounds the hero/how-to sections inside `.landing-section-inner`.
- `LandingTheme.css` scopes every style rule to `.home-app`; workflow pages retain their current DM Sans and controls.
- `LandingFormats` has a bounded inner wrapper inside a full-width white/bordered strip. The home app no longer has side padding or a max-width that bounds this strip.
- `LandingHowItWorks` retains the three transparent generated illustrations and original step copy, now inside reference-style outlined cards with circular numbered markers and text dividers.
- `LandingFooter` is rendered only on home. It provides brand/product copy, Photo formats and How it works section links, Choose a layout/Open the booth links, copyright, privacy copy and Back to top. In-page controls scroll without changing the hash router. The other pages retain the existing compact footer.
- Responsive steps stack below 700px. Footer columns change at 800/420px. Focus rings, 44px footer links and reduced-motion handling remain explicit.

## Preservation and provenance

The complete pre-change design, sidecar, landing files and App file are archived in `docs/design/archive/pre-exact-landing-reference-2026-10-13/`. Earlier design archives and generated assets/prompts remain. Plus Jakarta Sans is bundled through `@fontsource/plus-jakarta-sans@5.3.0` under its package license. The credential supplied for optional reference inspection is not used, saved or copied into the project.

## Validation

- Production build passed, including self-hosted font files. Changed-file formatting passed.
- Desktop verified at 1440px and mobile at 390px; no horizontal overflow. All three transparent artworks load, mobile cards stack and the footer collapses to one column.
- Formats strip measured from x=0 to the full document content width on both tested viewports.
- Footer Photo formats and How it works links scroll within home without changing the route; Open the booth navigates to the 21-layout catalog. Back to top scrolls to the beginning of the page.
- Template page still computes DM Sans and renders the compact original footer; landing-only footer/styles do not leak into workflow pages.
- Found and corrected the inherited last-card rule that removed bottom border/padding. Final mobile card has a black border and 24px bottom padding.
- Browser console reported no errors during the checks.
- Detector font/grid findings are intentional requirements: exact reference typography and the explicitly requested grid. Home action/footer type roles are documented in DESIGN.md.
- Final desktop/mobile previews are saved as `landing-reference-desktop.jpg` and `landing-reference-mobile.jpg` in the current chat's visualization directory.
