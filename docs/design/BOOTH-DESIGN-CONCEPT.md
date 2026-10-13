# Pixbooth booth design

The `#/booth` route extends the [landing design](LANDING-DESIGN-CONCEPT.md) and [template picker refinements](TEMPLATES-DESIGN-CONCEPT.md) at the user's request on 2026-10-13. Its role is camera operation: preserve the preview, automatic capture sequence, face effects, settings, capture review and progression to the editor.

Use a white canvas, a 32px grid with `#0001` lines, black outlines and supporting text `#52525b`. Locally bundled Plus Jakarta Sans supplies weights 400/600/700/800. The header mirrors the template picker: existing logo sizes and alignment, square 34px step markers with 8px corners (28px on mobile), black active/completed markers and bold active-step text.

The grid spans the available browser width. Header, workspace and compact footer share a 1216px maximum inner width and 32px gutters, reducing to 24px below 800px and 16px below 600px. Preserve the existing desktop camera/review arrangement and viewport-fitting geometry. Narrow layouts stack the review panel below the camera.

The preview has a 2px black border and 10px corners, without a shadow. Its idle placeholder continues the grid and uses a 24–32px/800 heading with -0.035em tracking, short supporting copy and an Enable camera action. The idle grid disappears when the placeholder is absent. Never desaturate, filter or recolor live/captured media. Keep the supplied white aperture shutter artwork and its existing geometry; do not add a backing around it.

The review panel uses a white surface, 2px outline and 10px corners. Slot outlines are 2px with 8px corners. The slot alone supplies the border and clips its media; inner images/videos have no independent border or radius, preventing doubled or mismatched corners. Empty slots use light neutral fill and bold tabular numerals. A black divider separates review from continuation. Captured photos and clips retain their actual colors and playback/download behavior.

Primary and secondary text actions have white fill, black text, 2px borders and 10px corners. Enable camera and continuation actions are at least 50px high. Hover/press turns them black with white text, without movement or a shadow, following the latest template-action refinement. Disabled continuation is neutral with a dashed border and remains disabled until captures are complete. Controls retain their existing labels and state logic.

Camera tool toggles use outlined 10px corners. Settings/sticker popovers use white surfaces, 2px outlines and a crisp 6px black offset shadow. Capture-mode/countdown groups use 8px corners and black selected states with white text. Touch controls remain at least 44px. Popovers remain scrollable within the preview; narrow panels still dismiss the other tool when opened. Escape returns focus to the toggle. Sticker artwork retains its native colors.

Keyboard focus uses a 3px black outline offset by 5px; segmented controls and native selects use an inset contour. Active black segments and the white shutter use white focus. Transitions use 180ms exponential easing, with reduced motion removing transitions. Existing camera notifications and contrast fades remain conditional on a real message/error.

Implementation is scoped to `.booth-app` in `src/pages/capture/BoothTheme.css`, imported after the prior themes. No camera, media, export or session code changes are required. The editor retains its existing styling.

Validation: changed-file formatting and the production build pass. Desktop and 390×844 browser checks confirm the grid/font, shared header/workspace alignment, responsive stacking, no horizontal overflow, disabled progression, countdown selection and Escape dismissal. Live/captured media have no CSS filter. Camera hardware capture and export were not exercised during this styling revision.

Latest workflow footer revision — 2026-10-13: Choose layout, Capture and Customize use the shared full-width black copyright/privacy/Back-to-top bar. This supersedes the earlier compact footer description. Customize now has its own established-design theme; see [EDITOR-DESIGN-CONCEPT.md](EDITOR-DESIGN-CONCEPT.md). Confirmation-dialog buttons use stationary black/white hover inversion.
Responsive system refinement: [RESPONSIVE-DESIGN.md](RESPONSIVE-DESIGN.md) supersedes earlier narrow-screen sizing with safe-area-aware containers, touch-sized controls and adaptive flow. Its implementation is the last-loaded src/styles/responsive.css.

Universal footer revision — 2026-10-13: all four pages use one Footer.jsx/Footer.css with dynamic copyright year, “Powered by .decide” and route-preserving Back to top. The desktop row is 43.2px high; the phone link has a 44px minimum target and the row wraps. This supersedes earlier footer content and height notes.

Capture correction — 2026-10-13: Redo clears captures and editor choices, preserves layout/camera settings and reconnects the preview; only pressing the shutter starts the next sequence. On stacked layouts, capture/cancel actions anchor by their bottom edge 12px inside the preview and reserve horizontal space for both tool toggles, so wrapped cancel labels stay within the frame.

Footer scope refinement — 2026-10-13: the shared footer keeps copyright and Powered by .decide on all routes. Back to top is rendered only on the landing page, superseding earlier universal-link descriptions.

Final uniform-footer decision — 2026-10-13: all four pages use the same Footer.jsx/Footer.css, containing only the dynamic copyright year and Powered by .decide. Back to top is removed from every page. Its route flag, click handler, link styles and unused LandingArrow.jsx are removed. This supersedes earlier footer-link descriptions.

## Mobile camera tools — 2026-10-13

On the stacked capture layout (width below 900px or height below 420px), Settings and Face Stickers are mutually exclusive. Opening one immediately closes the other; tapping the active toggle closes it. Controls remain mounted, preserving the countdown, camera settings and sticker selection. Crossing into the mobile layout reconciles any desktop pair of open panels. The existing narrow-camera desktop exclusivity is retained.

Mobile toggle buttons show the supplied icon, a short label and a chevron. An open panel uses a black button with white artwork/text and an upward chevron; closed buttons remain white with black artwork/text. Native summary keyboard activation, aria-expanded/aria-controls and Escape dismissal with focus return are preserved. Desktop buttons retain their original icon-only appearance.

Mobile tool content has a 50dvh / 360px height cap and native vertical overflow, pan-y/pinch-zoom touch handling and contained overscroll. Phone toggles are 64 by 48px and reserve a separate central lane for the shutter and wrapped cancellation buttons. Creative sticker artwork is not recolored.

Validation: the production build and all 14 existing UI contract checks pass. Chromium touch emulation verifies single-open switching, rapid taps, preserved countdown choice, active button colors, keyboard dismissal, actual touch swipes through Settings, no horizontal overflow, simulated-camera countdown cancellation spacing, and independent desktop panels at 390x844, 320x568, 820x1180, 844x390 and 1600x1000. These checks do not replace testing on a physical iOS/Android device.
Mobile camera correction — 2026-10-14: tool toggles are icon-only again, with accessible labels retained. Remove the visible text labels and chevrons; the black/white open-state inversion remains, along with single-panel opening and preserved selections. Mobile targets return to 48px (44px on phone widths). This supersedes the labeled-button description above.

Settings uses automatic scroll chaining on mobile. With no internal overflow, swiping anywhere in Settings scrolls the document; with overflow, the panel scrolls internally and passes movement to the page at its boundaries. The previous contained overscroll trapped gestures on fitting panels. Verified actual touch gestures beginning on both a setting label and the Photo button at 390x844, 320x568 and 844x390, plus overflowing Settings at 320px viewport height. Chromium touch emulation and the existing 14 UI contract checks pass; physical-device validation remains separate.