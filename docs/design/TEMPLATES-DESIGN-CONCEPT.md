# Pixbooth template picker design

The `#/templates` route extends the [current landing design](LANDING-DESIGN-CONCEPT.md) at the user's request, dated 2026-10-13. It uses the same white canvas, 32px grid (`#0001` lines), black outlines, supporting text `#52525b` and locally bundled Plus Jakarta Sans at weights 400/600/700/800.

The task remains layout selection. Preserve the existing 21 layout previews, native photo-count selector, responsive masonry catalog, selected-layout summary, capture lock and Continue to camera behavior. Filtered results use a grid with automatic row heights so differently proportioned previews cannot overlap.

The header keeps the shared workflow's structure, logo sizes and horizontal alignment. Step markers use the landing's black-and-white rounded-square vocabulary: 34px with 8px corners, reduced to 28px on mobile. The active step uses black fill and white numerals. Future steps remain unavailable until the session allows them.

The heading follows the landing section scale: `clamp(32px, 3.5vw, 44px)`, weight 800, 1.15 line height and -0.035em tracking. Supporting copy is 16px/1.65. Tile titles are 15px/800 and metadata is 12px.

Layout tiles have white surfaces, 2px black borders and 10px corners. Preview mounts retain their native geometry. A selected tile stays lifted by -2px on both axes with a 6px hard black shadow. There is no visual check badge; `aria-pressed` and the selected-layout summary communicate selection. Hover adds the same shadow and lifts a tile by -2px on both axes. Press removes its shadow and moves it by +4px. Disabled alternative layouts preserve the existing capture lock.

Continue to camera matches the landing Capture action: white fill, black text, 2px black border, 10px corners, 15px/800 label and a 50px minimum height, with no default shadow. Continue to camera turns black with white lettering on hover and press, without movement or a shadow. Transitions use 180ms and the existing exponential easing. Reduced motion removes transitions and transforms. Keyboard focus uses a 3px black outline offset by 5px. The photo-count selector uses an inset focus outline over its border, producing a single visible contour.

The grid spans the available page width. Header, catalog and compact footer preserve the shared workflow alignment: 1216px maximum inner width, 32px gutters on desktop, 24px at 800px and below, and 16px at 600px and below. The sticky selected-layout bar remains readable and stacks on mobile. Preserve the compact workflow footer rather than inserting the homepage's marketing footer into this task.

Implementation is scoped through `.templates-app` in `TemplatesTheme.css`, loaded after the landing theme. Camera and editor styling retain their existing scope. No global grayscale, new imagery, claims or session behavior changes are introduced.

Validation: production build and changed-file formatting pass. Browser inspection confirms the 32px grid and font, photo-count filtering, selected-state updates, camera navigation, and a 390px mobile layout with no horizontal overflow and a 50px action target.

Latest workflow footer revision — 2026-10-13: Choose layout, Capture and Customize use the shared full-width black copyright/privacy/Back-to-top bar. This supersedes the earlier compact footer description. Customize now has its own established-design theme; see [EDITOR-DESIGN-CONCEPT.md](EDITOR-DESIGN-CONCEPT.md). Confirmation-dialog buttons use stationary black/white hover inversion.