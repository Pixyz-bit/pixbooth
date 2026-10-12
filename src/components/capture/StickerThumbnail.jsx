import { useEffect, useRef } from 'react';
import { drawSticker } from '../../lib/stickers/sticker-art.js';
export default function StickerThumbnail({ id }) {
  const canvas = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, 112, 112);
    ctx.strokeStyle = '#b8b8c1';
    ctx.lineWidth = 2;
    if (id === 'none') {
      ctx.beginPath();
      ctx.ellipse(56, 61, 21, 28, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(33, 34);
      ctx.lineTo(79, 88);
      ctx.stroke();
      return;
    }
    const points = Array.from(
      {
        length: 478,
      },
      () => ({
        x: 0.5,
        y: 0.5,
      })
    );
    points[33] = {
      x: 0.36,
      y: 0.48,
    };
    points[263] = {
      x: 0.64,
      y: 0.48,
    };
    points[1] = {
      x: 0.5,
      y: 0.61,
    };
    points[10] = {
      x: 0.5,
      y: 0.31,
    };
    points[13] = {
      x: 0.5,
      y: 0.73,
    };
    const artwork = document.createElement('canvas');
    artwork.width = artwork.height = 112;
    const artworkContext = artwork.getContext('2d');
    drawSticker(artworkContext, points, 112, 112, id);
    const pixels = artworkContext.getImageData(0, 0, 112, 112).data;
    let left = 112,
      top = 112,
      right = -1,
      bottom = -1;
    for (let y = 0; y < 112; y++)
      for (let x = 0; x < 112; x++) {
        if (pixels[(y * 112 + x) * 4 + 3] > 16) {
          left = Math.min(left, x);
          top = Math.min(top, y);
          right = Math.max(right, x);
          bottom = Math.max(bottom, y);
        }
      }
    if (right < left) return;
    const width = right - left + 1,
      height = bottom - top + 1,
      scale = 88 / Math.max(width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      artwork,
      left,
      top,
      width,
      height,
      (112 - width * scale) / 2,
      (112 - height * scale) / 2,
      width * scale,
      height * scale
    );
  }, [id]);
  return (
    <canvas ref={canvas} width="112" height="112" className="sticker-icon" aria-hidden="true" />
  );
}
