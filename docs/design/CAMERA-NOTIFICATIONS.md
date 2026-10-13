# Camera notification fade and fixed countdown presets

Camera tracking notices and camera errors now use transparent message containers with white text. A top-aligned Ink gradient is enabled only while one of those visible notifications exists. Its opacity starts at 78%, reaches 62% beneath the message content and fades to zero over the next 48 px. The frame clips the fade to its corners. The earlier solid white notification box is removed; retry actions remain interactive and accessible.

Hidden screen-reader session announcements do not enable the gradient. When tracking is ready, the sticker is None, or the camera is off without an error, no notification fade is present. Countdown styling remains the previous plain number with an undimmed camera. Sticker and Settings popup bodies retain their existing styling.

The latest user choice replaces Custom with three fixed presets: Off, 3 sec and 5 sec. There is no separate numeric input. The default stays 3 seconds, and any unsupported countdown state from an earlier session is normalized to 3 seconds. Automatic capture and whole-set Redo are unchanged.

Verification: all 44 tests and the production build passed. Browser checks confirmed transparent notification backgrounds, white text, the conditional gradient, disappearance of the gradient when cleared, readable error content and no horizontal overflow at 375 x 812. The real booth exposed the three fixed presets; 5 sec selected correctly and no numeric input remained. A camera-free fixture used the existing illustrative sample artwork. No webcam permissions or physical captures were requested.

[Visual check](verification/camera-notification-gradient.png). Earlier design documentation remains as dated implementation history; this guide supersedes solid camera-notification cards and Custom countdown controls.
