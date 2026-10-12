# Collapsible tools and shutter cleanup — 2026-10-12

Stickers and Settings are independent native details/summary dropdown sections, initially closed. Click, Enter or Space toggles each one. Controls remain mounted, preserving sticker category/provider/settings; hidden fields leave the normal tab order. Chevron direction shows expansion and headers retain 44px targets with 14px bundled DM Sans. The outer tools/review panels and fixed 16:9 camera sizing remain. Open sticker artwork scrolls in a bounded 320px collection, and expanded tools scroll internally when needed.

Removed shutter-label and shutter-timer from rendered JSX. The floating button retains its dynamic accessible action name; countdown/recording cancel actions and countdown overlay remain. The countdown setting stays available in Settings.

All 23 tests passed; production build passed (172 modules, 8.14 seconds). Formatting was applied to changed source/test files. Browser verification confirmed mouse and Enter toggling, simultaneous independent expansion, Animals category retained after collapse/reopen, and unchanged camera dimensions before/after expansion (511.2 × 287.55 in the current compact viewport). No console errors were reported. The screenshot captures both sections collapsed at desktop size. Real camera/recording behavior was not exercised in this UI pass.

[Preview screenshot](verification/collapsible-booth.png). The [pre-change archive](archive/pre-collapsible-tools-2026-10-12) retains affected source, tests and current docs; older design records and embedded history remain.

## White shutter refinement

The user requested removal of the dark surrounding box. The floating positioning wrapper now has no background or padding, including on phones. The shutter is a white circle with a black 2px outline and black camera icon; its inner core is transparent. Sizes remain72px desktop/56px phone, with existing hover/press, focus and disabled behavior. Pre-change CSS is retained in archive/pre-white-shutter-2026-10-12.

## Pinned side panels

At >=900px width and >=420px height, the desktop viewport shell retains tools on the left and photos on the right, with sticky placement and each panel's overflow contained internally. Narrower/shorter windows still stack camera first. Equal panel dimensions and fixed 16:9 camera geometry are retained. Pre-change CSS is in archive/pre-pinned-panels-2026-10-12.

Final pinned-panel production build passed (172 modules, 7.40 seconds). [Browser measurements](verification/pinned-panels-checks.json) verified 1024 × 768 desktop sticky left/right panels, matching224 × 652.4 dimensions and no page/horizontal overflow; camera520 × 292.5 remains16:9. At375 × 812 both stacked panels are328 × 512 with no horizontal overflow. [Current screenshot](verification/pinned-booth.png). White shutter appearance was verified in source; physical-camera preview was not exercised.

Superseded sizing/artwork: [FRESH-STICKERS.md](FRESH-STICKERS.md) records the new5:4 frame, wider panels, compact controls and fresh collection. The earlier measurements above remain dated history.

Organization/sizing is superseded by [CAMERA-CORNER-TOOLS.md](CAMERA-CORNER-TOOLS.md). The earlier implementation and measurements above remain dated history.
