# Camera corner tools and uniform review — 2026-10-12

The user provided two organization references, explicitly excluding their visual design. Later steering requested standard equal-sized gallery cells, cover-filled camera media, and a wider preview with16:9 where applicable. This pass retains the established monochrome surfaces, typography, borders and artwork.

## Organization

The booth uses a camera-left / review-right arrangement. Stickers and Settings are opened by circular controls at the camera’s bottom-left and bottom-right; the centered white shutter remains on the camera. The separate left tools sidebar is removed. Tool bodies overlay the preview, using the existing DM Sans, neutral surfaces and borders. Both can open on wider frames; below620px preview width, only one opens at a time. Escape closes the current panel and restores its toggle focus. Hidden controls stay mounted, retaining their selections.

The desktop workspace has two columns: flexible camera and clamp(280px,24vw,360px) review. Shared navigation and the camera status bar remain. Camera and review heights follow available space; full left-column preview expands up to1280px. At1440 × 900, camera1046.39 × 588.59 (16:9), review345.6 × 636.6, with zero page or horizontal overflow. Tool panels280px wide remain inside the frame. The right panel aligns with the camera/status region, and Continue/reset remain below review.

On phones, review stacks below a5:4 camera. At375 × 812 the frame is328 × 262.4; a296 × 174.4 Settings body remains inside it. Only one corner tool panel opens below620px preview width, including after viewport resizing. Body scrolling keeps all controls reachable. Native details semantics, mouse/keyboard toggling and Escape focus return are retained.

## Uniform media and cover framing

Gallery figures use a standard two-column grid for every count, including one and nine. Images, videos and empty slots fill identical4:3 cells with cover fit. Captured/empty mixed rows remain uniform, independent of exported template geometry. Retake remains at the top-right; live clip downloads move into labeled44px top-left overlay controls so links cannot alter row heights. Hover/focus reveal overlays, touch retains visible controls, and native video controls remain.

Both source video and its intrinsic-source-sized canvas overlay use centered object-fit:cover. Completed photos/clips also fill the frame. Source proportions differing from the preview are cropped centrally, rather than leaving black letterbox margins. Preview cover styling does not alter original captured source or template export dimensions. Physical-camera tracking/crop alignment still needs device checking.

## Checks and preservation

All27 tests passed, including every template's uniform gallery markup and accessible live downloads, capture replacement/cancellation/cleanup, gallery ordering and shutter lifecycle. Production build passed (174 modules,12.39 seconds); changed files were formatted. Browser checks confirmed two open desktop panels inside the camera, timer selection, Escape closure/focus return, one-panel phone behavior and equal cells:150 × 112.5 desktop;141.2 × 105.9 phone. Computed video and overlay fit both equal cover. No physical-camera permission/capture was performed.

[Measurements](verification/camera-corner-tools-checks.json), [desktop](verification/camera-corner-tools-desktop.png), [phone](verification/camera-corner-tools-mobile.png). [Pre-change archive](archive/pre-camera-corner-tools-2026-10-12) preserves affected source/tests/current docs. Earlier dated design notes, embedded DESIGN/README history and sidecar history remain unchanged.

The subsequent [supplied icons/diagnostics update](PROVIDED-ICONS.md) replaces the three primary control symbols and corrects their centering. Earlier geometry measurements above remain valid for the organization pass.

The subsequent [automatic capture and compact Settings update](AUTOMATIC-CAPTURE.md) supersedes individual thumbnail retakes, makes the aperture shutter white and reduces Settings control scale. Previous implementation measurements above remain dated records.
