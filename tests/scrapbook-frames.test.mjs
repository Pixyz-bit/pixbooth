import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { frames } from '../src/data/frames.js';
import { templates } from '../src/data/templates.js';
import { scrapbookStickerPlacements } from '../src/lib/frames/scrapbook-art.js';
import { framePhotoRect } from '../src/lib/frames/frame-art.js';

const collection = frames.filter((frame) => frame.collection === 'scrapbook-15');
const partyCollection = frames.filter((frame) => frame.collection === 'party-8');
function rects(template) {
  const cw = 900,
    ch = template.cellHeight || 675,
    gap = template.gap || 23,
    padding = template.padding || 36;
  const slots =
    template.slots ||
    Array.from({ length: template.count }, (_, i) => [
      i % template.cols,
      Math.floor(i / template.cols),
      1,
      1,
    ]);
  return slots.map(([x, y, w, h]) => ({
    x: padding + x * (cw + gap),
    y: padding + y * (ch + gap),
    width: cw * w + gap * (w - 1),
    height: ch * h + gap * (h - 1),
  }));
}
test('15 distinct scrapbook frames have packaged paper and alpha sticker assets', async () => {
  assert.equal(collection.length, 15);
  assert.equal(new Set(frames.map((frame) => frame.id)).size, frames.length);
  for (const frame of collection)
    for (const file of [frame.asset, frame.stickerAsset].filter(Boolean)) {
      const stat = await fs.stat(new URL('../public/frames/' + file, import.meta.url));
      assert.ok(stat.size > 1000, file);
    }
});
test('eight approved party frames have packaged artwork', async () => {
  assert.equal(partyCollection.length, 8);
  for (const frame of partyCollection) {
    const stat = await fs.stat(new URL('../public/frames/' + frame.stickerAsset, import.meta.url));
    assert.ok(stat.size > 1000, frame.id);
    assert.equal(frame.packedAsset, true);
  }
});
test('all new frames fit every layout, overlap photo corners and leave the center clear', () => {
  for (const frame of [...collection, ...partyCollection])
    for (const template of templates)
      rects(template).forEach((raw, index) => {
        const opening = framePhotoRect(raw, frame.id);
        assert.ok(opening.width > 0 && opening.height > 0, frame.id + '/' + template.id);
        const placements = scrapbookStickerPlacements(raw, frame.id, index);
        assert.equal(placements.length, 2);
        assert.deepEqual(placements, scrapbookStickerPlacements(raw, frame.id, index));
        const center = {
          x: opening.x + opening.width * 0.25,
          y: opening.y + opening.height * 0.25,
          width: opening.width * 0.5,
          height: opening.height * 0.5,
        };
        for (const p of placements) {
          assert.ok(
            p.x >= raw.x &&
              p.y >= raw.y &&
              p.x + p.width <= raw.x + raw.width + 0.001 &&
              p.y + p.height <= raw.y + raw.height + 0.001
          );
          const overlapWidth =
            Math.min(p.x + p.width, opening.x + opening.width) - Math.max(p.x, opening.x);
          const overlapHeight =
            Math.min(p.y + p.height, opening.y + opening.height) - Math.max(p.y, opening.y);
          assert.ok(
            overlapWidth > 0 && overlapHeight > 0,
            'Sticker must overlap a photo, not just decorate paper'
          );
          assert.ok(
            p.x + p.width <= center.x ||
              p.x >= center.x + center.width ||
              p.y + p.height <= center.y ||
              p.y >= center.y + center.height,
            'Sticker covers center: ' + frame.id + '/' + template.id
          );
        }
      });
});
