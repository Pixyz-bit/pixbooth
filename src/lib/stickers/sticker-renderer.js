import { drawSticker, drawStickerArtwork, getStickerPlacement } from './sticker-art.js';

// Rasterize the existing artwork only when the relative face shape changes;
// Pixi performs the per-frame position, rotation and scale on one cached sprite.
export function stickerTextureSpec(placement, sticker) {
  const snap = (value) => Math.round(value * 64) / 64;
  const geometry = Object.fromEntries(
    ['top', 'nose', 'mouth'].map((name) => [
      name,
      { x: snap(placement[name].x), y: snap(placement[name].y) },
    ])
  );
  const units = placement.scale > 180 ? 256 : 128;
  const left = Math.min(-2, geometry.top.x - 1.5, geometry.nose.x - 1.5, geometry.mouth.x - 1.5);
  const right = Math.max(2, geometry.top.x + 1.5, geometry.nose.x + 1.5, geometry.mouth.x + 1.5);
  const top = Math.min(-2.5, geometry.top.y - 1.8);
  const bottom = Math.max(1.8, geometry.mouth.y + 1);
  return {
    key: JSON.stringify([sticker, units, geometry]),
    geometry,
    units,
    left,
    top,
    width: Math.ceil((right - left) * units),
    height: Math.ceil((bottom - top) * units),
  };
}

export async function createStickerRenderer({
  loadPixi = () => import('./pixi-runtime.js'),
  onFallback = () => {},
} = {}) {
  let gpu,
    stage,
    sprite,
    Texture,
    fallback = false,
    destroyed = false,
    lossHandler;
  const textures = new Map();
  function useFallback(error) {
    if (fallback || destroyed) return;
    fallback = true;
    onFallback(error);
  }
  try {
    const pixi = await loadPixi();
    Texture = pixi.Texture;
    gpu = new pixi.WebGLRenderer();
    await gpu.init({
      width: 1,
      height: 1,
      resolution: 1,
      backgroundAlpha: 0,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'low-power',
    });
    stage = new pixi.Container();
    sprite = new pixi.Sprite();
    stage.addChild(sprite);
    lossHandler = () => useFallback(new Error('Sticker graphics context was lost'));
    gpu.canvas.addEventListener('webglcontextlost', lossHandler);
  } catch (error) {
    useFallback(error);
  }
  return {
    get mode() {
      return fallback ? 'canvas2d' : 'pixi';
    },
    get cachedTextures() {
      return textures.size;
    },
    drawTo(ctx, landmarks, width, height, sticker) {
      if (destroyed || sticker === 'none') return;
      const placement = getStickerPlacement(landmarks, width, height);
      if (!placement) return;
      if (!fallback) {
        try {
          const spec = stickerTextureSpec(placement, sticker);
          let cached = textures.get(spec.key);
          if (!cached) {
            const artwork = document.createElement('canvas');
            artwork.width = spec.width;
            artwork.height = spec.height;
            const paint = artwork.getContext('2d');
            paint.scale(spec.units, spec.units);
            paint.translate(-spec.left, -spec.top);
            drawStickerArtwork(paint, spec.geometry, sticker);
            cached = { texture: Texture.from(artwork, true), ...spec };
            textures.set(spec.key, cached);
          } else {
            textures.delete(spec.key);
            textures.set(spec.key, cached);
          }
          sprite.texture = cached.texture;
          sprite.anchor.set(
            (-cached.left * cached.units) / cached.width,
            (-cached.top * cached.units) / cached.height
          );
          sprite.position.set(placement.cx, placement.cy);
          sprite.scale.set(placement.scale / cached.units);
          sprite.rotation = placement.angle;
          while (textures.size > 4) {
            const key = textures.keys().next().value;
            textures.get(key).texture.destroy(true);
            textures.delete(key);
          }
          if (gpu.width !== width || gpu.height !== height) gpu.resize(width, height);
          gpu.render({ container: stage, clear: true });
          ctx.drawImage(gpu.canvas, 0, 0, width, height);
          return;
        } catch (error) {
          useFallback(error);
        }
      }
      drawSticker(ctx, landmarks, width, height, sticker);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (lossHandler) gpu.canvas.removeEventListener('webglcontextlost', lossHandler);
      stage?.destroy({ children: true });
      for (const cached of textures.values()) cached.texture.destroy(true);
      textures.clear();
      try {
        gpu?.destroy(true);
      } catch {
        /* Initialization can fail before all systems exist. */
      }
    },
  };
}
