import test from 'node:test';
import assert from 'node:assert/strict';
import { stickers, stickerCategories, drawSticker } from '../src/lib/stickers/sticker-art.js';
import { freshStickers } from '../src/lib/stickers/fresh-stickers.js';
const landmarks = {
  33: { x: 0.36, y: 0.48 },
  263: { x: 0.64, y: 0.48 },
  10: { x: 0.5, y: 0.31 },
  1: { x: 0.5, y: 0.61 },
  13: { x: 0.5, y: 0.73 },
};
function context() {
  const calls = [];
  const ctx = new Proxy(
    {},
    {
      get(target, key) {
        if (key in target) return target[key];
        return (...args) => {
          for (const v of args.flat())
            if (typeof v === 'number')
              assert.ok(Number.isFinite(v), key + ' received non-finite geometry');
          calls.push({ method: key, args });
        };
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      },
    }
  );
  return { ctx, calls };
}
test('Fresh picks adds twelve unique choices while retaining every original category', () => {
  assert.equal(freshStickers.length, 12);
  assert.equal(stickers.length, 49);
  assert.equal(new Set(stickers.map((s) => s.id)).size, 49);
  assert.deepEqual(stickerCategories, ['Fresh picks', 'Animals', 'Eyewear', 'Headwear', 'Fun']);
  for (const [name, count] of [
    ['Animals', 8],
    ['Eyewear', 7],
    ['Headwear', 10],
    ['Fun', 11],
  ])
    assert.equal(stickers.filter((s) => s.category === name).length, count);
  for (const [id, name] of freshStickers)
    assert.ok(stickers.some((s) => s.id === id && s.name === name && s.category === 'Fresh picks'));
});
test('Every new sticker paints finite geometry at thumbnail and capture resolutions with balanced transforms', () => {
  for (const [id] of freshStickers)
    for (const [width, height] of [
      [112, 112],
      [1280, 720],
      [720, 1280],
    ]) {
      const { ctx, calls } = context();
      drawSticker(ctx, landmarks, width, height, id);
      assert.ok(
        calls.some((c) => c.method === 'fill'),
        id + ' painted no artwork'
      );
      assert.equal(calls.filter((c) => c.method === 'save').length, 1);
      assert.equal(calls.filter((c) => c.method === 'restore').length, 1);
      assert.deepEqual(calls.find((c) => c.method === 'translate').args, [
        width * 0.5,
        height * 0.48,
      ]);
    }
  const { ctx, calls } = context();
  drawSticker(ctx, landmarks, 1280, 720, 'none');
  assert.equal(calls.length, 0);
});
