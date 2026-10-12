import { getFrame } from '../../data/frames.js';

const assets = new Map();

export function loadFrameArtwork(id) {
  const frame = getFrame(id);
  if (!frame.asset) return Promise.resolve(null);
  if (!assets.has(frame.asset)) {
    const pending = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        assets.delete(frame.asset);
        reject(new Error('Frame artwork could not be loaded. Try again.'));
      };
      image.src = `${import.meta.env.BASE_URL}frames/${frame.asset}`;
    });
    assets.set(frame.asset, pending);
  }
  return assets.get(frame.asset);
}

export async function prepareFrameOptions(options = {}) {
  return { ...options, frameArtwork: await loadFrameArtwork(options.frame) };
}
