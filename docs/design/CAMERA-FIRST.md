# Camera-first booth with collapsible tools — 2026-10-12

Implemented from the user's approved text-art sketch, with their explicit change to put Stickers and Settings on the right as collapsible dropdowns. This is the current booth organization in the Martin Archive project serving localhost:5173.

The later [left-tools and compact-catalog refinement](LEFT-TOOLS-COMPACT-TEMPLATES.md) moves Stickers and Settings to a collapsible left rail and reduces template card scale. This dated record retains the original camera-first implementation and verification.

## Organization

The shared logo/Choose layout/Capture/Customize/Home header remains. There is no separate Strike a pose section. The camera top bar contains the selected layout, live capture position, and Camera on/off. The contained 16:9 preview leads on the left, with the centered 72px shutter, capture/cancellation label, and timer directly beneath.

The 336px right panel contains ordered photos or clips and individual retake/download actions. Gallery columns are one for a single capture, two for two or four, and three for larger counts. Stickers and Settings are native named details disclosures, initially closed. On browsers supporting named details grouping, opening one closes the other. Their fields remain mounted and session/tracker state remains in existing hooks.

Stickers keeps all 36 effects plus None, categories/search, Clear, provider selection, tracking messages, and Retry. Settings keeps Photo/Live mode, its unsupported-MP4 and first-capture locking guards, 0/3/5-second countdown, mirror, and camera-device selection. Existing CaptureIntro remains on disk as inactive prior source; CaptureMode is now a small shared presentation component in Settings. No mode/tracking/media engine was replaced.

Continue/reset stays at the panel bottom, separate from gallery and tool scrolling. The hint reports remaining items or a pending retake. Collapsed tool summaries remain outside gallery overflow; an expanded tool region can scroll without moving Continue. Native focus and toggling remain, and reset still uses the existing confirmation dialog. The previous capture tool modal drawers are removed from the active page.

At widths >=900px and heights >=560px, the entire app uses 100dvh with header and compact footer included. The workspace fills the remaining height; the camera fits both dimensions through the existing size container. There is no extra full-viewport section or document scroll snapping. Maximum width is 1600px with 32px side padding, reducing to 16px on mobile. Smaller/shorter windows stack naturally so controls remain reachable.

## Preservation and scope

Pre-change archive (historical file removed) contains the seven preceding source/test files and all six affected documentation files. CaptureMode is new. Earlier source archives, embedded historical DESIGN/README blocks, sidecar history, user references, and prior verification records remain. Current docs supersede only the booth organization. Colors, original logo/artwork, template filtering, editor, camera/tracking hooks, media geometry/quality, individual-retake ownership, and exports are unchanged.

## Verification

Final production build passed (172 modules, 24.74 seconds). All 22 tests passed. Prettier passed across src and tests; scoped layout scans returned no findings. Historical DESIGN/README blocks and sidecar history remain unchanged; seven camera/tracking/render/media engine files match the prior source snapshot. Exact checks (historical file removed) record the bounded evidence. Static SSR tests check shutter placement, native closed disclosure markup, mode/settings presence, remaining routes, unsupported Live, and locked capture-mode guards. Pure workflow and mocked lifecycle tests remain. These are source checks, not mounted-browser or physical-device approval.

Fresh browser verification remains restricted. Manually check desktop fit, compact/phone stacking, 16:9 containment and sticker alignment, keyboard disclosure toggling/grouping, busy/completed guards, device switching, count-shaped grids, open-tool/gallery scrolling, cancellation/retake, and real JPG/MP4 output at localhost:5173.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.
