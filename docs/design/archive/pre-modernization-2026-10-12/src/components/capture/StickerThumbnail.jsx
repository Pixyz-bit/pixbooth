import { useEffect, useRef } from 'react';
import { drawSticker } from '../../lib/stickers/sticker-art.js';
export default function StickerThumbnail({ id }) {
  const canvas = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, 112, 112);
    ctx.strokeStyle = '#b8b8c1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(56, 61, 21, 28, 0, 0, Math.PI * 2);
    ctx.stroke();
    if (id === 'none') {
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
    drawSticker(ctx, points, 112, 112, id);
  }, [id]);
  return (
    <canvas ref={canvas} width="112" height="112" className="sticker-icon" aria-hidden="true" />
  );
}
