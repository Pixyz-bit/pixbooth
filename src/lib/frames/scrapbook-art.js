import { getFrame } from '../../data/frames.js';

export function paintScrapbookPaper(ctx, size, frame, stickers) {
  const { width, height } = size;
  ctx.save();
  ctx.fillStyle = frame.patternInk;
  ctx.strokeStyle = frame.patternInk;
  ctx.lineWidth = 2;
  if (frame.paperPattern === 'gingham') {
    ctx.globalAlpha = 0.2;
    for (let x = 0; x < width; x += 100) ctx.fillRect(x, 0, 50, height);
    for (let y = 0; y < height; y += 100) ctx.fillRect(0, y, width, 50);
  } else if (frame.paperPattern === 'graph') {
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    for (let x = 0; x < width; x += 48) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 48) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  } else if (frame.paperPattern === 'stripes') {
    ctx.globalAlpha = 0.35;
    for (let x = 0; x < width; x += 84) ctx.fillRect(x, 0, 20, height);
  } else if (frame.paperPattern === 'waves') {
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 42;
    for (let x = -80; x < width + 80; x += 150) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      for (let y = 0; y < height; y += 300)
        ctx.bezierCurveTo(x + 80, y + 100, x - 80, y + 200, x, y + 300);
      ctx.stroke();
    }
  } else if (frame.paperPattern === 'dots' || frame.paperPattern === 'stars') {
    ctx.globalAlpha = 0.35;
    for (let y = 32; y < height; y += 110)
      for (let x = 32; x < width; x += 110) {
        ctx.beginPath();
        ctx.arc(
          x + (Math.floor(y / 110) % 2) * 35,
          y,
          frame.paperPattern === 'stars' ? 3 : 12,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
  }
  ctx.globalAlpha = 1;
  // Small generated accents decorate exposed paper; full-size accents are painted last.
  if (stickers) {
    const sw = (stickers.naturalWidth || stickers.width) / 2;
    const sh = (stickers.naturalHeight || stickers.height) / 2;
    for (let y = 50; y < height; y += 360)
      for (let x = 50; x < width; x += 360) {
        const n = (Math.floor(x / 360) + Math.floor(y / 360)) % 4;
        ctx.drawImage(stickers, (n % 2) * sw, Math.floor(n / 2) * sh, sw, sh, x, y, 96, 96);
      }
  }
  ctx.restore();
}

// Keep adaptive placements deterministic across preview, JPG and live MP4 frames.
export function scrapbookStickerPlacements(raw, id, index = 0) {
  const frame = getFrame(id);
  if (!frame.stickerAsset) return [];
  const inset = frame.inset;
  const opening = {
    x: raw.x + inset,
    y: raw.y + inset,
    width: raw.width - inset * 2,
    height: raw.height - inset * 2,
  };
  const edge = Math.min(opening.width, opening.height) * frame.stickerScale;
  const outside = edge * 0.08;
  const left = opening.x - outside,
    right = opening.x + opening.width + outside;
  const top = opening.y - outside,
    bottom = opening.y + opening.height + outside;
  const corners =
    index % 2
      ? [
          [right, top],
          [left, bottom],
        ]
      : [
          [left, top],
          [right, bottom],
        ];
  return corners.map(([cx, cy], n) => ({
    x: Math.max(raw.x, Math.min(raw.x + raw.width - edge, cx - edge / 2)),
    y: Math.max(raw.y, Math.min(raw.y + raw.height - edge, cy - edge / 2)),
    width: edge,
    height: edge,
    sprite: (index * 2 + n) % 4,
  }));
}

export function paintScrapbookStickers(ctx, rects, id, artwork) {
  const image = artwork?.stickers;
  if (!image) return;
  const sw = (image.naturalWidth || image.width) / 2;
  const sh = (image.naturalHeight || image.height) / 2;
  ctx.save();
  rects.forEach((raw, index) => {
    // Clip to this photo's slot so a sticker cannot trespass on an adjacent grid cell.
    ctx.save();
    ctx.beginPath();
    ctx.rect(raw.x, raw.y, raw.width, raw.height);
    ctx.clip();
    for (const p of scrapbookStickerPlacements(raw, id, index)) {
      ctx.drawImage(
        image,
        (p.sprite % 2) * sw,
        Math.floor(p.sprite / 2) * sh,
        sw,
        sh,
        p.x,
        p.y,
        p.width,
        p.height
      );
    }
    ctx.restore();
  });
  ctx.restore();
}
