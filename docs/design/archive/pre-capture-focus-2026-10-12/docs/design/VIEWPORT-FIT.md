# Compact header and viewport-fitted booth — 2026-10-12

Requested changes were implemented in the canonical Martin Archive project serving localhost:5173. The user's supplied screenshot shows the preceding camera filling enough vertical space to push the shutter below the viewport; it is baseline evidence, not a post-change screenshot.

## Changes

- Workflow navigation is now inside workflow-brand-row, between the original logo and Home. Above 600px they share one row; smaller widths place the nested step nav on a second grid row. Existing completed checks, current-step semantics, and unavailable future links remain.
- Layout search and its local query state were removed. Masonry, exact photo-count buttons, Pick for me, locking, and selection remain. Sticker search is unaffected.
- Booth width uses available space with 16–40px responsive insets. At widths >=720px and heights >=560px, the app uses 100dvh; compact header, introduction, camera toggle/status, capture toolbar, review actions, and footer reserve their height. The camera gets the remaining area rather than growing indefinitely from page width. The review sidebar is 320px, reducing to 288px between 720 and 900px.
- The camera viewport is consistently 16:9 across permission/loading, live feed, countdown/recording, and captured review. A size-contained flex frame area uses container-height units to bound its width by both available width and available height. Camera and sticker canvas retain object-fit containment, so differing source ratios letterbox together. Capture and export geometry, tracking engines, media hooks, and quality are unchanged.
- The shutter is 64px, other controls retain 44px minimum targets, and Continue/Start over share a row. Camera activation copy fits compact previews. Supporting copy uses correct singular/plural photo or clip labels.
- The review gallery uses compact bounded thumbnail boxes. Its overflow can scroll internally for many live clips, retake notices, or very crowded states, with primary review actions outside the scrolling area. Windows narrower than 720px or shorter than 560px use a stacked natural flow so actions are reachable rather than clipped. This does not claim zero scrolling at every phone/zoom/error state.

## Preservation

[Pre-change archive](archive/pre-viewport-fit-2026-10-12) preserves all ten affected source/test files and the previous DESIGN, README, PRODUCT, sidecar, direction contract, and layout-refinement document. Earlier archives and historical DESIGN/README blocks remain intact. Current docs supersede only relevant layout/search descriptions.

## Verification

Final production build passed: 172 modules, 17.63 seconds. All 21 tests passed. Prettier passed across src and tests; the scoped layout detector returned no findings before and after the changes. Embedded historical DESIGN/README text and sidecar history were verified unchanged. [Exact verification](verification/viewport-fit-checks.json) records these results. Source tests cover the nested header's availability/current semantics and absence of layout search alongside existing workflow/capture tests. Browser preview access remains restricted; no current rendered fit, physical-camera, tracking, playback, or export approval is claimed.

Manual checks: inspect header wrapping, camera 16:9 outline in every state, whole-source/overlay alignment for 4:3 and 16:9 feeds, shutter and Continue visibility, nine-photo and nine-live grids, retake/error states, portrait/landscape/zoom, and keyboard focus. The 100dvh constraint is source implementation, not proof of rendered fit in every browser.
