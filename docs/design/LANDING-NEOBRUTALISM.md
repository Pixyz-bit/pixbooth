# Landing page: monochrome neobrutalism

Updated 2026-10-13. The user's current request restores monochrome neobrutalism on the home route and uses the supplied three-step image-over-copy composition for How it works. The latest visual reference is `http://localhost:8080/Frontend/User/PublicDashboard.aspx`: black-filled primary controls, strong dark outlines, bold sans-serif hierarchy, white surfaces and modestly rounded controls. Retain the explicitly requested grid rather than the reference's dotted background. This page-specific decision supersedes the home-page exclusions in the modernization contract. Original and modern design records remain preserved.

## Visual contract

- Preserve the supplied Pixbooth logo, locally bundled DM Sans, centered hero, sample-print composition, Capture navigation, formats and product copy.
- Home chrome uses black and white, 2px structural borders and 10px action corners. Capture is black with white text and a restrained 3px hard action shadow; hover inverts and press compresses the shadow. Reduced motion removes transforms.
- Restore the 32px grid using low-opacity black lines on white across the entire home app.
- How it works has a centered heading/subtitle and three open columns with transparent artwork above a numbered marker, heading and paragraph. These are sequential instructions, not feature cards. Stack at 700px and below.
- Illustrations depict sample formats with portraits, a camera, and finished prints with editing/download objects. They are illustrative rather than a customer's capture or testimonial.
- Home rules live in `src/pages/landing/LandingTheme.css`, loaded after modern shared styles and scoped to `.home-app`. Camera/editor controls retain their current working interface.

## Assets and provenance

All three PNGs were generated with the built-in imagegen tool using `transparent_background: true`; preserve their alpha channel. Exact prompts are in [LANDING-IMAGE-PROMPTS.json](LANDING-IMAGE-PROMPTS.json).

| Asset | Purpose |
| --- | --- |
| `public/how-it-works/pick-your-format.png` | Sample photobooth formats with grayscale portraits |
| `public/how-it-works/make-your-moment.png` | Standalone black-and-white camera |
| `public/how-it-works/make-it-yours.png` | Finished keepsake with pencil and download token |

Images use empty alt text and a hidden decorative container because adjacent text gives the complete instruction. Explicit intrinsic dimensions reserve image space; lazy loading and async decoding avoid blocking the hero.

## Verification

- `npm run build` passed (Vite production build).
- Changed component, scoped stylesheet and CSS import file passed Prettier checks.
- All three generated PNGs are 1536 × 1024 with real alpha transparency; original alpha is preserved.
- Rendered desktop at 1280px and mobile at 390px. All three assets load, the desktop has three columns, mobile stacks them, and neither has horizontal overflow.
- Capture opens the 21-layout template catalog; browser console reported no errors during this check.
- Sequential H1/H2/H3 heading order and 16px step body copy confirmed in the browser.
- The mechanical detector returned advisory-only findings for the explicitly requested grid and intentional home tokens. Home palette, radius and type additions are recorded in root frontmatter and sidecar metadata.
- Desktop and mobile previews are saved in the current chat's visualization directory as `landing-how-desktop.jpg` and `landing-mobile.jpg`.

Camera access, capture and export behavior are outside this landing-only change.
