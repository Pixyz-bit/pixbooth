import { getFrame } from '../../data/frames.js';

const assets = new Map();
const packedArtwork = new Map();

// Generated sheets keep paper in the upper third and a 2×2 alpha atlas below it.
// Decode once so thumbnails, still exports and live frames share the same layers.
function loadPackedArtwork(asset) {
  if (!packedArtwork.has(asset)) {
    const pending = loadImage(asset)
      .then((image) => {
        // The generator can shift the swatch boundary slightly. Find the first
        // clear row so opaque paper never leaks into a corner sticker.
        const probe = document.createElement('canvas');
        probe.width = image.naturalWidth;
        probe.height = image.naturalHeight;
        const probeCtx = probe.getContext('2d', { willReadFrequently: true });
        probeCtx.drawImage(image, 0, 0);
        const pixels = probeCtx.getImageData(0, 0, probe.width, probe.height).data;
        let split = Math.round(image.naturalHeight / 3);
        for (let y = Math.floor(probe.height * 0.2); y < probe.height * 0.5; y++) {
          let clear = 0;
          for (let x = 0; x < probe.width; x += 4)
            if (pixels[(y * probe.width + x) * 4 + 3] < 10) clear++;
          if (clear >= Math.ceil(probe.width / 4) * 0.9) {
            split = y;
            break;
          }
        }
        const crop = (y, height) => {
          const canvas = document.createElement('canvas');
          canvas.width = image.naturalWidth;
          canvas.height = height;
          canvas
            .getContext('2d')
            .drawImage(image, 0, y, canvas.width, height, 0, 0, canvas.width, height);
          return canvas;
        };
        return { paper: crop(0, split), stickers: crop(split, image.naturalHeight - split) };
      })
      .catch((error) => {
        packedArtwork.delete(asset);
        throw error;
      });
    packedArtwork.set(asset, pending);
  }
  return packedArtwork.get(asset);
}

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
  if (frame.packedAsset) return loadPackedArtwork(frame.stickerAsset);
  if (!frame.stickerAsset) return loadImage(frame.asset);
  return Promise.all([loadImage(frame.asset), loadImage(frame.stickerAsset)]).then(
    ([paper, stickers]) => ({ paper, stickers })
  );
}

export async function prepareFrameOptions(options = {}) {
  return { ...options, frameArtwork: await loadFrameArtwork(options.frame) };
}
