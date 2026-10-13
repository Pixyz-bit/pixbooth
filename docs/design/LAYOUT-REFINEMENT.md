# Masonry and capture-grid refinement — 2026-10-12

Implemented at the user's request in the Martin Archive project serving localhost:5173. The subsequent [viewport-fit refinement](VIEWPORT-FIT.md) supersedes name search, the 900px capture breakpoint, and thumbnail sizing in this dated record; its masonry/count-button behavior remains.

- Layout choices now use native multi-column masonry with variable-height preview regions. Actual template SVGs stay complete and proportional. The browser flows cards down each column, matching keyboard and DOM order. Columns reduce from four to three at 1100px, two at 800px, and one at 360px; focus rings retain inset room.
- Photo-count buttons replace Strips/Grids/Singles/Polaroids and the dropdown. All plus 1, 2, 3, 4, 6, 8, and 9 use the existing pressed/selected appearance. Available counts derive from the unchanged 21-layout catalog. Each numeric button matches exactly; 8 and 9 are separate from 6. Name search, empty-state reset, session locking, and Pick for me remain.
- Captured-photo and live-clip thumbnails form a three-column grid in a 320px review sidebar to the right of the flexible camera above 900px. The sidebar includes count, individual retakes, live downloads, retake cancellation, and Continue. Below 900px it stacks after camera controls and uses four columns; below 600px, three; below 360px, two. There is no horizontal thumbnail scrolling. Actual crop proportions remain tied to the selected template.

The monochrome tokens, camera/tracker hooks, capture guard, retake ownership, media rendering/export code, and editor state are unchanged. No dependency was added.

## Preservation

Pre-refinement archive (historical file removed) contains all nine affected source/test files and the complete preceding DESIGN.md, README.md, PRODUCT.md, sidecar, modernization contract, and implementation record. The earlier full pre-modernization snapshot and embedded historical docs remain intact. Current docs describe the revised layout; the original modernization record remains dated with a follow-up authority notice.

## Checks

Existing tests were updated to check exact count coverage, search combinations, count-button semantics without a dropdown, and the sidebar's ordered media/actions. All 20 state, static SSR, and mocked lifecycle tests passed after the functional changes. Final production build passed (172 modules, 6.72 seconds). Prettier passed across src and tests. The scoped layout detector returned no findings before and after the changes. Read-only checks confirmed the embedded historical DESIGN/README sections and sidecar history remain unchanged. These are source/static checks, not rendered-browser approval. Verification JSON (historical file removed) records the bounded results.

Fresh rendered-browser checks remain unavailable under the earlier preview-security restriction. No camera/device/inference/export verification is claimed for these layout changes. Inspect desktop/tablet/mobile masonry, tab flow, long labels, all nine thumbnails, video controls, and sidebar stacking at localhost:5173.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.
