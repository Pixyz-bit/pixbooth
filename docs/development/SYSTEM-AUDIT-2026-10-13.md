# Pixbooth system audit and cleanup

Audited 13 October 2026. Canonical project: `C:\Martin Archive\Programming\2026 Projects\PhotoPix`.

## Outcome

No blocking defect was found in the flows exercised. One reproducible editor recovery defect was fixed, obsolete production files/dependencies were removed, and misleading current documentation was corrected. This is a bounded source, dependency, test and browser audit—not a certification of every browser, camera or operating system.

| Dimension | Assessment / 4 | Evidence and remaining limit |
| --- | --- | --- |
| Accessibility | 3 | Named controls, editor tabs, dialog initial focus/Escape/focus restoration and camera-tool Escape were checked. Marquee has a keyboard/touch pause limitation. No full assistive-technology audit. |
| Performance | 3 | Obsolete public assets removed; MP4/Pixi remain lazy. Static page imports and layered shared CSS offer further optimization. No lab performance benchmark. |
| Responsive layout | 3 | All four surfaces fit five viewport classes; no horizontal overflow. Physical-device gestures/cameras remain untested. |
| Theming | 3 | Established monochrome world preserved. Legacy active CSS and stale token metadata still create maintenance debt. |
| Implementation integrity | 4 | Parser/import graph, tests, formatting and build pass; no unresolved imports or unreachable source files after cleanup. |
| Total | **16 / 20** | **Good**, with specific remaining work below. This is an engineering assessment, not a WCAG conformance score. |

## Fixed findings

### [P2] Live frame artwork could not recover using “Try again”

`useFrameArtwork` reran only when the frame ID changed. The editor's retry counter rerendered the JPG/export path but did not reload the artwork used by `LiveStripPreview`. After a transient image failure, the live preview could remain stale or blank even after another render succeeded; changing frames was the workaround.

The retry counter now propagates from `useStripEditor` through `EditorPreview` and `LiveStripPreview` to `useFrameArtwork`. The same selected frame can recover. A regression test reproduced the original failure (`1` artwork request instead of `2`) before the fix. Tests now cover recovery and ignoring a late response from a previously selected frame.

### [P2] Current README described retired behavior

The README mixed old and current instructions: Jeeliz fallback, individual retakes, custom countdowns, prior panel layouts and automatic capture after Redo. It now describes the active MediaPipe/Pixi pipeline, Off/3/5-second countdowns, whole-set capture, manual shutter after Redo and current stylesheet order. Older documentation remains in the rollback archive. Font provenance now correctly identifies Plus Jakarta Sans across all four routes.

### [P3] DM Sans notice was absent from deployed static assets

The license existed inside the development dependency but not the public notices directory. Its original license is now copied to `public/licenses/dm-sans-OFL.txt`, so it accompanies the deployed fonts. No font asset was altered.

## Verified cleanup

Removed from active source and production assets:

| Removed items | Reason |
| --- | --- |
| `src/components/capture/CaptureIntro.jsx` | Superseded; no application or test importer. |
| `src/components/templates/SelectedLayout.jsx` | Superseded by the current selected-layout action bar; no importer. |
| `src/lib/face/jeeliz-errors.js`, `jeeliz-pose.js`, `jeeliz-tracker.js` | Retired engine; active tracking uses MediaPipe. |
| `tests/jeeliz-errors.test.mjs` | Tested only the retired error helper; did not protect the active tracker. |
| `src/styles/interactions.css`, `theme.css`, `workflow-responsive.css` | Unimported legacy sheets. |
| Five files under `public/jeeliz/` | Retired tracker scripts, model and associated notices; no active loader. |
| `public/pixbooth-favicon.png` | Superseded by the active `pixbooth-favicon-v2.png` referenced in `index.html`. |
| `@fontsource/space-grotesk` | No JS/CSS import; removed from package and lockfile using npm. |

Also removed an unused landing Arrow import, unreachable SVG fallback definitions for icons that always use the supplied PNGs, an empty marquee CSS rule, and obsolete retired-engine fields in test fixtures.

**15 unused files and one package removed.** Public asset size decreased from **44,387,592** to **40,388,959 bytes**, including the newly distributed font notice: approximately **4MB less deployed static content**. This measures public assets, not the compressed JavaScript bundle or total installed dependencies.

Rollback originals are retained in `docs/design/archive/pre-system-cleanup-2026-10-13/`. Archives are not Vite production assets; they were not purged as though they were application code.

## Checks performed

- Parsed all active JS/JSX with Babel and traced local imports, exports, dynamic imports, worker URLs and CSS imports from `src/main.jsx`.
- After cleanup: **102 / 102 source files reachable**, no unused import bindings, no unresolved imports and no syntax parse errors.
- Reviewed capture cancellation/locking/URL cleanup, camera requests, worker lifetime, sticker rendering/fallback, editor history, rendering retries, export cancellation, dialog behavior and route guards.
- Checked public references, dynamically selected frame/icon assets, dependency imports and package scripts. MediaPipe runtime/model files, frame textures, supplied icons, active favicon and notices are retained.
- `npm audit --json`: **zero reported dependency vulnerabilities** at audit time. This registry check does not prove the application has no security defects.
- Final suite: **45 tests passed**. The prior suite had 44; one retired Jeeliz test was removed and two frame-artwork regressions were added.
- `npm run format:check` and `npm run build` pass.
- The design detector reported **120 advisories and four warnings**. All four warnings concern Plus Jakarta Sans, which is the user's established choice. Advisories mostly reflect older active stylesheet declarations, small artwork lettering, intentional radii and token metadata. They are not 124 verified functional bugs and were not automatically rewritten.

### Browser matrix

Home, Choose layout and camera-idle Capture were checked in the running app. The guarded Customize page was checked using the real editor components with existing illustrative sample images in a temporary fixture.

| CSS viewport | Home | Choose layout | Capture | Customize |
| --- | --- | --- | --- | --- |
| 281×609 | Fits | Fits | Fits | Fits |
| 390×844 | Fits | Fits | Fits | Fits |
| 768×1024 | Fits | Fits | Fits | Fits |
| 844×390 | Normal flow | Fits | Normal flow | Fits |
| 1440×900 | Fits | Fits | Fits | Fits |

All 20 checks had one shared footer and no horizontal document overflow. Viewport overrides account for the in-app browser's zoom; measurements above are actual CSS viewport dimensions.

Additional checks: photo-count filtering returned four one-photo layouts; selection and Continue reached the correct camera page; incomplete editor navigation returned to Capture; Settings Escape closed the panel and returned focus; caption editing/Undo/Redo worked; the reset dialog focused Keep my photos and restored focus on Escape. The actual JPG preview decoded at **972×2967px** with the correct `.jpg` download filename.

A duplicate-createRoot diagnostic occurred when hot-reloading the temporary audit fixture. A fresh normal application load and navigation produced **no console warnings or errors**. The fixture was removed after verification; it is not shipped.

## Remaining findings and recommendations

### [P2] Active CSS has overlapping historical layers

`src/styles/modern.css` is 2,474 lines and remains imported beneath newer route themes and responsive corrections. Earlier component styles also remain active. Some declarations are overridden, but deleting a whole imported file or every currently unmatched selector would risk camera, dialog, loading, export and conditional states.

Recommendation: consolidate one route/state group at a time into its current theme, compare desktop/mobile and conditional states, then remove proven redundant declarations. Use an optimize pass followed by polish. This audit deliberately removes unimported sheets only.

### [P2] Marquee cannot be paused through keyboard/touch controls

The ribbon pauses only on hover, and reduced-motion users receive static labels. There is no focusable pause control after the user's earlier explicit removal request. Keyboard and touch users cannot pause it within the page. This is an accessibility tradeoff, not an automatically restored UI feature.

Recommendation: agree on a keyboard/touch pause interaction that preserves the established appearance, or make the ribbon static. Follow with an accessibility/interaction pass; do not silently restore the removed control.

### [P3] Page code is eagerly imported

`App.jsx` statically imports all four pages. The heavier MP4/Pixi parts are already lazy, but editor/capture page code still participates in initial application loading. A measured route-splitting pass could improve initial-load cost; it needs loading/error states and route regression checks. No dependency was added just to pursue this optional optimization.

## Retained files and limits

- Historical design backups, artwork prompts/references, development records and legal notices have provenance/rollback value. Their absence from runtime is intentional.
- `node_modules/` supports development; `dist/` is generated deployment output. Neither was treated as disposable source in this audit.
- An import graph proves reachability, not that every exported helper or CSS selector is exercised. Dynamic artwork and test infrastructure require contextual review.
- No real webcam permission was requested. Physical face alignment, device disconnection/reconnection, native touch gestures, actual MP4 recording/decoding/downloads and Safari/Firefox behavior still require manual checks on those devices. The source/test review covers related lifecycle logic, not physical hardware compatibility.
- No full screen-reader session, exhaustive contrast audit or penetration test was performed.

The next useful work is a scoped CSS consolidation/optimization pass, then interaction/accessibility polish. The live app remains available on port 5173.

Post-audit user decision — 2026-10-13: docs/design/archive, references and verification were subsequently removed from the project. Their contents are recoverable from the single external documentation ZIP. Earlier retention notes above describe the audit-time state. Back to top is now limited to the landing footer.

Final user decision — 2026-10-13: Back to top was subsequently removed from every route. All four pages render the single shared src/components/layout/Footer.jsx with copyright and Powered by .decide only. Its route flag, handler, link CSS and unused arrow helper were removed. The final production build passes.

Recovery ZIP for the removed documentation folders: C:\Users\arlan\.codex\visualizations\2026\10\12\01a130de-962e-7163-85fc-c2d2248949b3\pixbooth-documentation-backup-2026-10-13.zip.
