# Left tools and compact templates — 2026-10-12

Historical implementation record. [PERMANENT-PANELS.md](PERMANENT-PANELS.md) supersedes the collapsed rail, disclosure/search controls and sizing rules below.

Implemented at the user's request in the Martin Archive project serving localhost:5173. The supplied HTML identifies the complete 21-layout All catalog; its card scale was reduced without altering its templates or preview geometry.

## Changes

- Stickers and Settings move from the right review card into a left tool panel. Its 56px Tools rail starts collapsed and expands to 256px. The toggle exposes aria-expanded and an aria-controls target created with useId. Hidden content stays mounted but leaves the focus/accessibility tree; camera/tracker/session hooks remain outside this local UI state. The existing native named disclosures, providers, sticker search, capture modes, countdown, mirror, and device controls remain.
- The workspace now has left tools, central 16:9 camera/shutter, and a 288px right photo/Continue panel. Viewport-fit thresholds remain 900px width and 560px height. Smaller or shorter windows stack Tools above the camera and review in natural flow. There is no modal tool drawer.
- Desktop template preview height is capped at 176px rather than 320px; mobile at 144px rather than 256px. The minimum is 96px, card padding/gaps are 12px, names remain 14px, and count text is 12px. Selected borders/checks, complete SVG proportions, and touch targets remain.
- All masonry uses five desktop columns, four below 1100px, three below 800px, two below 600px, and one below 360px. Count-filtered rows stay left-to-right with 192px minimum tracks (144px mobile). More columns and smaller preview caps reduce the source layout's height budget; actual rendered scroll distance is unverified.

Pre-change archive (historical file removed) retains the three changed source/test files and six affected docs. Previous design archives and historical guides remain intact. No dependency, catalog, camera/media/tracking engine, export quality, or editor behavior changed.

## Checks

Final production build passed (172 modules, 28.68 seconds). All 22 tests passed; Prettier passed across src and tests. Scoped layout scans returned no findings. Historical DESIGN/README blocks and sidecar history were verified unchanged. Exact verification (historical file removed) records these source-level results. Existing SSR checks were updated to verify that tools precede the camera, the rail starts collapsed with hidden named controls, the right panel excludes tools, and the shutter/Continue remain available. They do not simulate toggling or establish visual fit.

Browser preview access remains restricted. Manually check rail opening/closing, retained selections and focus, expanded-panel camera sizing, desktop/phone card readability, all/count-filter layouts, and actual scrolling. Camera/device/export checks remain manual.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.
