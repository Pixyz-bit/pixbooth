# Pixbooth Customize design

The `#/edit` route now extends the established [landing](LANDING-DESIGN-CONCEPT.md), [layout-picker](TEMPLATES-DESIGN-CONCEPT.md) and [booth](BOOTH-DESIGN-CONCEPT.md) vocabulary at the user's request on 2026-10-13. The editor still requires a completed capture session; this styling change does not bypass routing or session guards.

Use white surfaces, black 2px outlines, a 32px grid (`#0001`), supporting text `#52525b` and locally bundled Plus Jakarta Sans (400/600/700/800). The header shares the workflow's logo sizes, inner alignment and square numbered/completed markers. Main content uses a 1216px maximum inner width, 32px desktop gutters, 24px below 800px and 16px below 600px.

The existing artifact-first layout remains: preview and undo/redo beside the download and customization controls; narrow viewports stack them. The heading uses the landing's 32–44px/800 section scale, with -0.035em tracking and a 1.15 line height. Preview/tool headings are bold. Panels use white fill, 2px black borders, 10px corners and no shadow.

Actions use white fill, black text, 2px black borders, 10px corners and a 50px minimum height. Hover/press inverts them to black/white with no lift or shadow, following the latest template/booth action refinement. Disabled actions are neutral and dashed. Both session-confirmation actions, Keep my photos and Start over, use the same stationary inversion.

The six existing customization tabs, keyboard navigation, selected states, frame/background/filter previews, caption, layout choices, edit history and export controls remain functional. Active tabs are black/white. Options use 2px black borders and 8px corners; selected/hovered options lift by 2px with a crisp 4px black shadow. Reduced motion removes that movement and transitions. Keyboard focus is a 3px outline; native inputs/selects use an inset contour, and the active black tab uses white focus.

Creative content keeps its actual colors: do not desaturate photos, frame art, backgrounds, stickers or authored filter previews. The rendered strip preserves its output geometry and has no new CSS filter or forced corner mask.

Choose layout, Capture and Customize share the requested black footer bar: copyright/year, “Photos and clips stay in your browser.” and Back to top with the supplied arrow. The black surface spans the page, while the inner row follows the common workflow margins. It wraps naturally on mobile and provides a 44px minimum link target and white focus outline. Back to top scrolls the current page without changing its route, respecting reduced motion. The homepage's dedicated footer remains as previously designed.

Implementation: `.editor-app` in `EditorTheme.css`, shared `Footer.jsx` and `WorkflowFooter.css`, and the editor route class in `App.jsx`. Footer and dialog-action styles load last so older compact-footer and button rules cannot override them.

Verification uses the real editor components with existing illustrative sample photos in a temporary separate preview, because the live route requires completed captures. Desktop/mobile checks confirm preview rendering, local typography, caption editing, undo, tab navigation, confirmation dialog controls, footer colors/wrapping and no horizontal overflow. Live Choose layout/Capture footer checks confirm route-preserving navigation. Changed-file formatting and the production build pass. The temporary preview is removed after verification; no real camera capture or MP4 export is part of this styling check.
