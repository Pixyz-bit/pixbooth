import test from 'node:test';
import assert from 'node:assert/strict';
import { createStickerRenderer, stickerTextureSpec } from '../src/lib/stickers/sticker-renderer.js';
import { getStickerPlacement } from '../src/lib/stickers/sticker-art.js';
const points = {
  33: { x: 0.36, y: 0.48 },
  263: { x: 0.64, y: 0.48 },
  10: { x: 0.5, y: 0.31 },
  1: { x: 0.5, y: 0.61 },
  13: { x: 0.5, y: 0.73 },
};
function harness(t) {
  const old = globalThis.document;
  const state = { renders: [], textures: [], listeners: {}, canvasCopies: 0, artworkFills: 0 };
  const ctx = new Proxy(
    {},
    {
      get:
        (_, name) =>
        (...args) => {
          for (const arg of args) if (typeof arg === 'number') assert.ok(Number.isFinite(arg));
          if (name === 'fill') state.artworkFills++;
          if (name === 'drawImage') state.canvasCopies++;
        },
    }
  );
  globalThis.document = { createElement: () => ({ getContext: () => ctx }) };
  t.after(() => {
    if (old === undefined) delete globalThis.document;
    else globalThis.document = old;
  });
  class WebGLRenderer {
    constructor() {
      this.canvas = {
        addEventListener: (name, fn) => {
          state.listeners[name] = fn;
        },
        removeEventListener: (name) => {
          delete state.listeners[name];
        },
      };
    }
    async init(options) {
      state.options = options;
      this.width = options.width;
      this.height = options.height;
    }
    resize(width, height) {
      this.width = width;
      this.height = height;
      state.size = [width, height];
    }
    render(options) {
      if (state.failRender) throw new Error('Graphics lost');
      state.renders.push(options);
    }
    destroy() {
      state.destroyed = true;
    }
  }
  class Container {
    addChild(child) {
      state.sprite = child;
    }
    destroy() {
      state.stageDestroyed = true;
    }
  }
  const field = () => ({
    set(...value) {
      this.value = value;
    },
  });
  class Sprite {
    constructor() {
      this.anchor = field();
      this.position = field();
      this.scale = field();
    }
  }
  const Texture = {
    from(canvas) {
      const texture = {
        canvas,
        destroy() {
          this.destroyed = true;
        },
      };
      state.textures.push(texture);
      return texture;
    },
  };
  return { state, ctx, loadPixi: async () => ({ WebGLRenderer, Container, Sprite, Texture }) };
}
test('GPU sticker placement transforms cached artwork instead of rerasterizing translated faces', async (t) => {
  const { state, ctx, loadPixi } = harness(t);
  const renderer = await createStickerRenderer({ loadPixi });
  renderer.drawTo(ctx, points, 1280, 720, 'ribbon-bow');
  const translated = Object.fromEntries(
    Object.entries(points).map(([key, p]) => [key, { x: p.x + 0.1, y: p.y }])
  );
  renderer.drawTo(ctx, translated, 1280, 720, 'ribbon-bow');
  assert.equal(renderer.mode, 'pixi');
  assert.equal(state.textures.length, 1);
  assert.equal(state.renders.length, 2);
  assert.equal(state.canvasCopies, 2);
  assert.deepEqual(state.sprite.position.value, [768, 345.59999999999997]);
  assert.equal(state.options.backgroundAlpha, 0);
  assert.equal(state.options.preserveDrawingBuffer, true);
  assert.deepEqual(state.size, [1280, 720]);
  renderer.destroy();
  renderer.destroy();
  assert.equal(renderer.cachedTextures, 0);
  assert.ok(state.textures.every((t) => t.destroyed));
  assert.equal(state.destroyed, true);
});
test('texture cache is bounded and releases evicted GPU textures', async (t) => {
  const { state, ctx, loadPixi } = harness(t);
  const renderer = await createStickerRenderer({ loadPixi });
  for (const id of ['dog', 'cat', 'glasses', 'hat', 'ribbon-bow', 'moon-stars'])
    renderer.drawTo(ctx, points, 640, 480, id);
  assert.equal(renderer.cachedTextures, 4);
  assert.equal(state.textures.filter((t) => t.destroyed).length, 2);
  renderer.destroy();
  assert.ok(state.textures.every((t) => t.destroyed));
});
test('initial GPU failure renders the same artwork through Canvas2D', async (t) => {
  const { state, ctx } = harness(t);
  let fallback = 0;
  const renderer = await createStickerRenderer({
    loadPixi: async () => {
      throw new Error('No WebGL');
    },
    onFallback: () => fallback++,
  });
  renderer.drawTo(ctx, points, 640, 480, 'dog');
  assert.equal(renderer.mode, 'canvas2d');
  assert.equal(fallback, 1);
  assert.ok(state.artworkFills > 0);
  assert.equal(state.renders.length, 0);
  renderer.destroy();
});
test('context loss and rendering failure switch to Canvas2D without dropping the frame', async (t) => {
  for (const contextLoss of [true, false]) {
    const { state, ctx, loadPixi } = harness(t);
    let fallback = 0;
    const renderer = await createStickerRenderer({ loadPixi, onFallback: () => fallback++ });
    if (contextLoss) state.listeners.webglcontextlost();
    else state.failRender = true;
    renderer.drawTo(ctx, points, 640, 480, 'ribbon-bow');
    assert.equal(renderer.mode, 'canvas2d');
    assert.equal(fallback, 1);
    assert.ok(state.artworkFills > 0);
    renderer.destroy();
    assert.equal(state.listeners.webglcontextlost, undefined);
  }
});
test('missing or coincident facial anchors do not create invalid geometry', () => {
  assert.equal(getStickerPlacement({}, 640, 480), null);
  assert.equal(getStickerPlacement({ ...points, 263: points[33] }, 640, 480), null);
  const spec = stickerTextureSpec(getStickerPlacement(points, 1280, 720), 'dog');
  assert.ok(spec.width > 0 && spec.height > 0);
});
