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