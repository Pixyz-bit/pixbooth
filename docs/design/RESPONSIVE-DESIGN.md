# Pixbooth responsive layout contract

This refinement covers home, Choose layout, Capture and Customize. It preserves the established monochrome grid, locally bundled typography, borders, artwork, current copy and existing session/capture/export behavior. `src/styles/responsive.css` loads after the route themes and owns these shared adaptations. Canonical `Footer.css` and `DialogActions.css` load afterward.

## Containers and safe areas

Workflow content stays within 1216px, and home content within 1200px. Gutters are 32px on desktop, 24px at 800px and below, and 16px on phones; home uses 16px below 700px. Horizontal margins also account for device safe-area insets. The viewport declares `viewport-fit=cover`; headers, hero and footer respect top/bottom safe areas. Normal desktop footer heights remain compact, while phone rows wrap and offer a 44px Back-to-top target.

Controls allow readable wrapping rather than widening the page. Native mobile selectors and editor text inputs use 16px text. Dialogs scroll within the available dynamic viewport and their actions stack on phones. Selected-layout actions clear the bottom safe area.

## Home

Portrait viewports retain the first-screen hero and caption. The strip's grid now permits its children to shrink, and its small artwork lettering scales with the print size; this prevents intrinsic text width from stretching the strip past the short-phone hero. At 360px and below, the title and logo scale down appropriately. The landing entry label is centered inside its action. Short landscape viewports use readable normal flow rather than forcing all content into a cramped first screen. The marquee remains clipped to its own ribbon, with the existing reduced-motion fallback. Labels and star separators alternate as separate items with equal spacing, including the repeated-group boundary. Matching gaps separate the sample caption, marquee and next heading: 40px on desktop/tablet and 28px at 600px and below, while the portrait hero stays inside one viewport.

## Choose layout

Phones use two preview columns for both All and filtered results, with natural row heights and stable selected styling. Filtering and selection retain their semantics and live result count. The selected-layout bar stacks its actions, so locked sessions can show Start over and Return to camera without squeezing either control. Desktop masonry and the established count filters remain intact.

## Capture

At widths below 900px, or viewport heights below 420px, camera and review use normal page flow. The review panel grows with its media instead of keeping a fixed 512px height; there is no nested review scroller on these sizes. Phones retain two gallery columns; wider stacked layouts fit more columns when space allows. Desktop retains its viewport-fitted preview and internally scrolling review panel.

On stacked layouts, open camera tools expand below the preview. Settings and sticker panels remain scrollable, with up to 60dvh/480px of space. Corner toggles and the aperture stay anchored to the preview even while a panel is open. Existing narrow-panel exclusivity, Escape dismissal and focus return remain functional. Camera and mirror switches have 44px hit areas while keeping compact visible tracks. Preview/media borders and clipping remain single-layered.

## Customize

At widths below 1000px, the preview moves above the controls. Tablets show download and customization controls side by side; below 700px they stack. Phone preview height scales between 260px and 420px, giving controls more of the page. Very narrow phones show decorative options in two columns. Tabs retain keyboard behavior; caption editing, undo/redo, creative colors and rendered output geometry are unchanged.

## Verification

Browser checks cover the following viewports on all four surfaces, including a locked template session and sample captures for the guarded editor/capture states:

| Viewport | Use scene | Result |
| --- | --- | --- |
| 320×568 | Small phone | No horizontal overflow; hero fits the viewport; two layout columns; 44px switches |
| 390×844 | Modern portrait phone | No horizontal overflow; hero fits the viewport; stacked editor controls |
| 768×1024 | Portrait tablet | No horizontal overflow; expanded review; two-column editor controls |
| 844×390 | Phone landscape | No horizontal overflow; readable vertical page flow |
| 1440×900 | Desktop | No horizontal overflow; existing bounded desktop composition |

Photo-count filtering/selection, countdown changes, camera-tool exclusivity and Escape, caption editing and undo were exercised. All 44 existing tests and the production build pass. Verification used browser viewport overrides and existing illustrative photos; no real camera capture or device-specific MP4 recording was exercised. Temporary preview files are removed after verification.

These responsive rules supersede conflicting fixed-height/small-screen sizing notes in earlier route documents. Original files are preserved in `docs/design/archive/pre-responsive-system-2026-10-13/`.

## Universal footer

All four routes render one shared `components/layout/Footer.jsx`, styled by `Footer.css`. Its black full-width bar contains the dynamic copyright year, “Powered by .decide” and a route-preserving Back to top link. The desktop inner row remains 43.2px high; phones wrap the row and give the link a 44px touch target. LandingFooter.jsx and WorkflowFooter.css are removed; dialog action styling is retained in DialogActions.css. Archived originals are in `archive/pre-universal-footer-2026-10-13/`.

Mobile correction — 2026-10-13: cancel-countdown/recording buttons anchor by their actual bottom edge inside the preview, with a separate center lane between tool toggles. The universal footer uses two balanced metadata columns and a centered full-row Back-to-top link at 600px and below.

Final uniform-footer decision — 2026-10-13: all four pages use the same Footer.jsx/Footer.css, containing only the dynamic copyright year and Powered by .decide. Back to top is removed from every page. Its route flag, click handler, link styles and unused LandingArrow.jsx are removed. This supersedes earlier footer-link descriptions.

## Mobile camera tools — 2026-10-13

On the stacked capture layout (width below 900px or height below 420px), Settings and Face Stickers are mutually exclusive. Opening one immediately closes the other; tapping the active toggle closes it. Controls remain mounted, preserving the countdown, camera settings and sticker selection. Crossing into the mobile layout reconciles any desktop pair of open panels. The existing narrow-camera desktop exclusivity is retained.

Mobile toggle buttons show the supplied icon, a short label and a chevron. An open panel uses a black button with white artwork/text and an upward chevron; closed buttons remain white with black artwork/text. Native summary keyboard activation, aria-expanded/aria-controls and Escape dismissal with focus return are preserved. Desktop buttons retain their original icon-only appearance.

Mobile tool content has a 50dvh / 360px height cap and native vertical overflow, pan-y/pinch-zoom touch handling and contained overscroll. Phone toggles are 64 by 48px and reserve a separate central lane for the shutter and wrapped cancellation buttons. Creative sticker artwork is not recolored.

Validation: the production build and all 14 existing UI contract checks pass. Chromium touch emulation verifies single-open switching, rapid taps, preserved countdown choice, active button colors, keyboard dismissal, actual touch swipes through Settings, no horizontal overflow, simulated-camera countdown cancellation spacing, and independent desktop panels at 390x844, 320x568, 820x1180, 844x390 and 1600x1000. These checks do not replace testing on a physical iOS/Android device.
Mobile camera correction — 2026-10-14: tool toggles are icon-only again, with accessible labels retained. Remove the visible text labels and chevrons; the black/white open-state inversion remains, along with single-panel opening and preserved selections. Mobile targets return to 48px (44px on phone widths). This supersedes the labeled-button description above.

Settings uses automatic scroll chaining on mobile. With no internal overflow, swiping anywhere in Settings scrolls the document; with overflow, the panel scrolls internally and passes movement to the page at its boundaries. The previous contained overscroll trapped gestures on fitting panels. Verified actual touch gestures beginning on both a setting label and the Photo button at 390x844, 320x568 and 844x390, plus overflowing Settings at 320px viewport height. Chromium touch emulation and the existing 14 UI contract checks pass; physical-device validation remains separate.
## Mobile editor pinned preview — 2026-10-15

At widths up to 700px, and landscape viewports up to 1000px wide and below 420px tall, the image preview remains sticky 8px below the safe-area top, matching the mobile selection panel inset, while history, options and downloads scroll beneath it. The preview occupies min(46dvh, 400px); its image stage flexes into the remaining space and preserves the full image proportions. The artifact wrapper uses display: contents so the preview shares the controls' grid and remains pinned across the entire editor. Mobile tool panels use natural height and document scrolling, replacing their previous nested scroll area. Root scroll padding keeps focused controls below the pinned preview. Desktop retains its existing two-column layout and internal tool scrolling.

Validation: the production build and all 14 existing UI contract checks pass. Chromium viewport checks at 390x844, 320x568 and 844x390 confirm a preview top of 0 while the document scrolls, positive image-stage height and no horizontal overflow; 1440x900 retains desktop columns. Physical iOS/Android gestures remain untested.