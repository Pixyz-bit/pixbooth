import { getFrame } from '../../data/frames.js';

const assets = new Map();

function loadImage(asset) {
  if (!asset) return Promise.resolve(null);
  if (!assets.has(asset)) {
    const pending = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        assets.delete(asset);
        reject(new Error('Frame artwork could not be loaded. Try again.'));
      };
      image.src = `${import.meta.env.BASE_URL}frames/${asset}`;
    });
    assets.set(asset, pending);
  }
  return assets.get(asset);
}

export function loadFrameArtwork(id) {
  const frame = getFrame(id);
  if (!frame.stickerAsset) return loadImage(frame.asset);
  return Promise.all([loadImage(frame.asset), loadImage(frame.stickerAsset)]).then(
    ([paper, stickers]) => ({ paper, stickers })
  );
}

export async function prepareFrameOptions(options = {}) {
  return { ...options, frameArtwork: await loadFrameArtwork(options.frame) };
}
