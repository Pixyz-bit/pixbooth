import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const source = (
  await fs.readFile(new URL('../src/lib/frames/frame-assets.js', import.meta.url), 'utf8')
)
  .replace(/^import .*?;\r?$/gm, '')
  .replaceAll('export ', '')
  .replaceAll('import.meta.env.BASE_URL', "'/'");
function harness(failFirst = false) {
  let loads = 0;
  const cropCalls = [];
  class Image {
    naturalWidth = 60;
    naturalHeight = 90;
    set src(value) {
      loads++;
      queueMicrotask(() => (failFirst && loads === 1 ? this.onerror() : this.onload()));
    }
  }
  const document = {
    createElement() {
      const canvas = { width: 0, height: 0 };
      canvas.getContext = () => ({
        drawImage(...args) {
          if (args.length === 9) cropCalls.push(args.slice(1));
        },
        getImageData() {
          const data = new Uint8ClampedArray(60 * 90 * 4);
          // Actual texture boundary differs from the nominal 30px split.
          for (let y = 0; y < 27; y++)
            for (let x = 0; x < 60; x++) data[(y * 60 + x) * 4 + 3] = 255;
          return { data };
        },
      });
      return canvas;
    },
  };
  const getFrame = () => ({ packedAsset: true, stickerAsset: 'test.png' });
  const load = new Function('getFrame', 'Image', 'document', source + '; return loadFrameArtwork;')(
    getFrame,
    Image,
    document
  );
  return { load, cropCalls, loads: () => loads };
}
test('packed artwork follows the alpha boundary and shares decoded layers', async () => {
  const h = harness();
  const [a, b] = await Promise.all([h.load('test'), h.load('test')]);
  assert.equal(a, b);
  assert.equal(h.loads(), 1);
  assert.equal(a.paper.height, 27);
  assert.equal(a.stickers.height, 63);
  assert.deepEqual(h.cropCalls[1], [0, 27, 60, 63, 0, 0, 60, 63]);
});
test('failed packed artwork can be retried for the same frame', async () => {
  const h = harness(true);
  await assert.rejects(h.load('test'), /could not be loaded/);
  const result = await h.load('test');
  assert.equal(h.loads(), 2);
  assert.equal(result.paper.height, 27);
});
