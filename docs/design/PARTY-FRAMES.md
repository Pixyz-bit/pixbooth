# Metallic and party frame collection — 2026-10-19

Approved concepts: Chrome Crush, Holo Dream, Mixtape, Snail Mail, Play Date, Garden Club, Disco Pink and Pink Premiere. These supplement the existing collection in Customize → Frames, bringing the total to 31 decorative frames plus No frame.

The approved metallic, scrapbook and pink party concept boards guided eight original production asset sheets generated with the built-in ImageGen tool. Each contains a textured paper swatch above a 2×2 alpha sticker atlas. Files are stored as <id>-artwork.webp in public/frames; source PNGs remain in the Codex generated-images collection for this chat. WebP uses quality 88 and alpha quality 100. No photographs, captions, or competitor marks are baked into the frame assets.

The loader detects the first clear row below the paper, splits the sheet into reusable canvas layers, shares the pending decode between consumers and evicts failures for retry. Existing frame rendering draws the paper, photo mounts, photos, corner stickers and user caption. Paper aspect ratio is preserved. The same compositor supplies thumbnails, editor previews, JPGs and live strips.

Validation: all 168 new frame/layout combinations render in Chromium with alpha verified; eight JPG exports have the expected MIME type and original layout dimensions. Geometry tests cover the new frames across all layouts, including central photo safety. Packed artwork tests verify alpha-boundary splitting, shared decoding and recovery after failure. Production build passes. Full suite: 52/53 pass; the existing shared-header test expects hash links although WorkflowSteps uses clean paths, unrelated to this collection. Physical-device gestures and actual live MP4 encoding were not tested.

The neon pen strip and Mentomory identity are separate preview work and are not part of this collection.
