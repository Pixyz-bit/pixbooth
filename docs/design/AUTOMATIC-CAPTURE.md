# Automatic capture and compact Settings - 2026-10-12

## Capture behavior

One shutter click captures every remaining item required by the chosen layout. The countdown restarts before each photo or five-second live clip. Settings retains Off, 3 sec and 5 sec shortcuts and adds an exact whole-second value from 0 to 10. Off captures serially without an added countdown; it still waits for each photo save or clip encode before starting the next item.

The capture sequence locks settings and duplicate shutter clicks. Cancelling a countdown stops the remaining sequence while preserving saved captures; another shutter click resumes the remaining slots. Turning the camera off, leaving capture, disconnecting the camera or a save/tracking error stops the sequence. The camera stops automatically when the layout is complete. Capture dimensions, sticker baking and export geometry remain unchanged.

Individual thumbnail retake controls are removed. A single **Redo all photos** / **Redo all clips** action clears the entire set and editor choices, preserves the selected layout and capture preferences, reconnects the camera and automatically restarts once the camera and selected sticker are ready. Redo is disabled during a running sequence. Existing workflow Start over actions outside this review still return to layout selection.

## Appearance

The supplied aperture shutter is rendered white using a CSS filter that preserves the PNG alpha channel. It has no CSS circular backing, border or shadow and retains its existing centered 64 px desktop / 52 px phone size and keyboard focus treatment. Other icons retain their supplied black artwork.

Settings uses a 14 px heading, 12 px legends and controls, 10 px group gaps and 36 px desktop form controls. The mirror switch is 44 x 28 px with a 20 px thumb. Coarse pointers retain at least 44 px control heights. The camera selector truncates to the panel width instead of expanding the panel. These styles are scoped to camera Settings; other page typography and controls retain their current scale.

## Verification

All 37 tests and the production build passed. Behavioral tests cover repeated countdowns, serial photo/clip capture, duplicate clicks, cancellation, stale saves, save failures, full-set Redo cleanup/reconnection and cancellation of a pending Redo. Rendered UI checks confirm removal of individual retakes and the exact-second input.

Browser checks accepted 7 seconds and then the 5 sec shortcut. At 1440 x 900, the Settings body was 280 x 289.4 px, with 36 px countdown controls and no internal scrolling. At 375 x 812, the body was 296 x 174.4 px with internal overflow to keep it within the phone camera frame. Neither viewport had horizontal page overflow. The temporary viewport override was reset. No physical-camera capture or actual white-shutter screenshot was performed; camera lifecycle was simulated in tests.

Desktop preview (historical file removed), phone preview (historical file removed). Earlier design documentation remains; this guide supersedes per-photo retake behavior and the earlier black aperture appearance.

Follow-up refinement: the visible Before each capture label is removed, while the exact-second input retains its accessible name and aligns to the right. Countdown numbers now appear over an undimmed live preview with a small text shadow for contrast; no dark full-frame countdown backing remains.

The subsequent [MediaPipe/PixiJS update](MEDIAPIPE-PIXI-STICKERS.md) is the current face-effects authority. It removes tracker/category selectors, uses a shared GPU renderer with Canvas2D fallback, and makes the exact-second countdown field conditional on Custom. Earlier records above are preserved.

Countdown visual refinement: a centered white numeral and thin one-second timing ring replace the previous full-frame animation. The live preview remains undimmed; reduced motion disables the sweep/number entrance. The camera switch track is now 44 x 28 px with a 20 px thumb and a 44 px touch hit area on coarse pointers. Countdown timing, cancellation and capture logic are unchanged.

The user reverted the timing-ring countdown refinement before publication. The current countdown is the previous plain white numeral with an undimmed camera preview. The compact Camera switch remains.

The subsequent [camera notification/fixed-countdown refinement](CAMERA-NOTIFICATIONS.md) replaces Custom with Off / 3 sec / 5 sec and introduces a conditional transparent notification fade. Earlier controls documented above remain historical records.

Historical archive/reference/verification artifacts mentioned here were removed from the project at the user's request on 2026-10-13. Current route design documents remain available.

## Countdown Off correction — 2026-10-14

This supersedes the original Off behavior above: Off captures one photo or five-second live clip per shutter press. It leaves the camera ready until the layout is complete; saving/recording still rejects duplicate presses. With 3 sec or 5 sec, one press continues to capture all remaining slots automatically. Redo preserves the selected countdown mode and waits for a shutter press. Regression checks cover four separate manual photo presses, manual live clips, 3/5-second sequences, duplicate presses and final camera release.