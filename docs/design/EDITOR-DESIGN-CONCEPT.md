# Pixbooth Customize design

The `#/edit` route now extends the established [landing](LANDING-DESIGN-CONCEPT.md), [layout-picker](TEMPLATES-DESIGN-CONCEPT.md) and [booth](BOOTH-DESIGN-CONCEPT.md) vocabulary at the user's request on 2026-10-13. The editor still requires a completed capture session; this styling change does not bypass routing or session guards.

Use white surfaces, black 2px outlines, a 32px grid (`#0001`), supporting text `#52525b` and locally bundled Plus Jakarta Sans (400/600/700/800). The header shares the workflow's logo sizes, inner alignment and square numbered/completed markers. Main content uses a 1216px maximum inner width, 32px desktop gutters, 24px below 800px and 16px below 600px.

The existing artifact-first layout remains: preview and undo/redo beside the download and customization controls; narrow viewports stack them. The heading uses the landing's 32–44px/800 section scale, with -0.035em tracking and a 1.15 line height. Preview/tool headings are bold. Panels use white fill, 2px black borders, 10px corners and no shadow.

Actions use white fill, black text, 2px black borders, 10px corners and a 50px minimum height. Hover/press inverts them to black/white with no lift or shadow, following the latest template/booth action refinement. Disabled actions are neutral and dashed. Both session-confirmation actions, Keep my photos and Start over, use the same stationary inversion.

The six existing customization tabs, keyboard navigation, selected states, frame/background/filter previews, caption, layout choices, edit history and export controls remain functional. Active tabs are black/white. Options use 2px black borders and 8px corners; selected/hovered options lift by 2px with a crisp 4px black shadow. Reduced motion removes that movement and transitions. Keyboard focus is a 3px outline; native inputs/selects use an inset contour, and the active black tab uses white focus.

Creative content keeps its actual colors: do not desaturate photos, frame art, backgrounds, stickers or authored filter previews. The rendered strip preserves its output geometry and has no new CSS filter or forced corner mask.

Choose layout, Capture and Customize share the requested black footer bar: copyright/year, “Photos and clips stay in your browser.” and Back to top with the supplied arrow. The black surface spans the page, while the inner row follows the common workflow margins. It wraps naturally on mobile and provides a compact 40px minimum link target and white focus outline. Back to top scrolls the current page without changing its route, respecting reduced motion. The homepage uses this same universal footer.

Implementation: `.editor-app` in `EditorTheme.css`, shared `Footer.jsx` and `Footer.css`, and the editor route class in `App.jsx`. Footer and dialog-action styles load last so older compact-footer and button rules cannot override them.

Verification uses the real editor components with existing illustrative sample photos in a temporary separate preview, because the live route requires completed captures. Desktop/mobile checks confirm preview rendering, local typography, caption editing, undo, tab navigation, confirmation dialog controls, footer colors/wrapping and no horizontal overflow. Live Choose layout/Capture footer checks confirm route-preserving navigation. Changed-file formatting and the production build pass. The temporary preview is removed after verification; no real camera capture or MP4 export is part of this styling check.

Footer height refinement: the workflow footer is 60% of its previous desktop height: 74px including its border becomes 44.4px. The inner row is 42.4px with no vertical padding; mobile content may wrap naturally.

Responsive system refinement: [RESPONSIVE-DESIGN.md](RESPONSIVE-DESIGN.md) supersedes earlier narrow-screen sizing with safe-area-aware containers, touch-sized controls and adaptive flow. Its implementation is the last-loaded src/styles/responsive.css.

Universal footer revision — 2026-10-13: all four pages use one Footer.jsx/Footer.css with dynamic copyright year, “Powered by .decide” and route-preserving Back to top. The desktop row is 43.2px high; the phone link has a 44px minimum target and the row wraps. This supersedes earlier footer content and height notes.

Artwork recovery correction — 2026-10-13: the editor retry counter also reloads artwork in the live preview. A transient frame-image failure can now recover without choosing a different frame. Dedicated regression tests cover same-frame recovery and ignored late responses from a previous selection.

Footer scope refinement — 2026-10-13: the shared footer keeps copyright and Powered by .decide on all routes. Back to top is rendered only on the landing page, superseding earlier universal-link descriptions.

Final uniform-footer decision — 2026-10-13: all four pages use the same Footer.jsx/Footer.css, containing only the dynamic copyright year and Powered by .decide. Back to top is removed from every page. Its route flag, click handler, link styles and unused LandingArrow.jsx are removed. This supersedes earlier footer-link descriptions.

## Editor controls order and mobile scrolling — 2026-10-14

The editor-options block precedes the download/start-over block on every screen size. At intermediate widths up to 1000px, the controls use one column so downloads remain below the options. On phone widths up to 700px, only the active editor-tool-panel scrolls, with a maximum height of min(48dvh, 420px), native vertical touch scrolling, pinch zoom and automatic scroll chaining at boundaries. Tabs and download controls stay outside that scroll container. Short tools retain their natural height. Existing desktop panel styling and tab behavior are preserved.

Validation: all 14 UI contract checks and the production build pass. Browser checks at 1440, 900, 390 and 320px verify download placement; actual touch gestures at 390 and 320px scroll long option lists without moving the document. Short Text panels and horizontal overflow are also checked.
Desktop editor scrolling refinement — 2026-10-14: the active tool panel now scrolls internally at every screen size. Its shared maximum is min(48dvh, 420px); desktop widths above 1000px use a window-height budget of min(420px, max(160px, 100dvh - 560px)) to keep the download action below the options and within reach. Tabs and download/start-over actions remain outside the scroll area. Panels are keyboard-focusable with a visible inset focus outline, allowing Page Down and other native scrolling keys.

Browser checks at 1440x1000 and 1280x720 verify internal mouse-wheel and keyboard scrolling plus a visible download button; 900px tablet and 390/320px phone checks verify internal touch scrolling. These supersede the earlier mobile-only scrolling rule. Very short windows retain normal page scrolling to keep all controls reachable.
Matched desktop editor columns — 2026-10-14: at side-by-side widths above 1000px, the preview artifact establishes the grid row height. The controls stretch to that height with size containment, and editor-options/its active tool panel flex into the remaining space above downloads. Tabs and download actions do not shrink. This replaces the fixed desktop window-height cap, gives long lists more room, and keeps column heights consistent across all six tools. Stacked tablet/mobile layouts retain their bounded internal scrolling. Browser checks at 1440x1000 and 1280x720 confirm equal column heights, a larger tool area, and internal mouse-wheel/keyboard scrolling; tablet/phone swipe checks pass. The production build passes.