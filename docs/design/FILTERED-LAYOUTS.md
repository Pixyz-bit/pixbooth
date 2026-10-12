# Horizontal photo-count results — 2026-10-12

Photo-count filtered templates now use a row-major CSS grid instead of native balanced columns. The supplied four one-photo choices (Single, Polaroid, Portrait, Square) can spread across the desktop row. Auto-fit tracks grow across available width; each has a 240px minimum, reducing to 144px below 600px. Cards retain names, full proportional SVGs, selection, focus, and locked-session behavior. All restores the existing native masonry view.

The catalog marks count-filtered state through data-filtered. Only that state changes layout; catalog data, output dimensions, capture state, and filtering logic remain untouched. No dependency was added. This addresses left-side clustering caused by balanced multicolumn layout rather than changing template ordering.

[Pre-correction archive](archive/pre-filter-spread-2026-10-12) preserves affected source/test files and preceding DESIGN, sidecar, and README. Earlier captures/design history remain. Current validation is recorded in [focus-and-filter-checks.json](verification/focus-and-filter-checks.json); static tests do not verify visual column distribution. Browser rendering remains unverified under the earlier preview restriction.
