import { getFrame } from '../../data/frames.js';

const tiles = new WeakMap();
function paperTile(image) {
  if (!tiles.has(image)) {
    const tile = document.createElement('canvas');
    tile.width = tile.height = 900;
    tile.getContext('2d').drawImage(image, 0, 0, 900, 900);
    tiles.set(image, tile);
  }
  return tiles.get(image);
}

function shape(ctx, kind, x, y, size, ink) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 0.09;
  const circle = (x, y, r, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  if (kind === 'flower') {
    for (let i = 0; i < 7; i++) {
      const a = (i * Math.PI * 2) / 7;
      circle(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0.34, '#fffdf4');
    }
    circle(0, 0, 0.26, '#d7a743');
  } else if (kind === 'star') {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 ? 0.38 : 1;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
  } else if (kind === 'heart' || kind === 'berry') {
    ctx.fillStyle = kind === 'berry' ? '#d97370' : ink;
    ctx.beginPath();
    ctx.moveTo(0, 0.9);
    ctx.bezierCurveTo(-1.2, 0.1, -0.85, -1, 0, -0.4);
    ctx.bezierCurveTo(0.85, -1, 1.2, 0.1, 0, 0.9);
    ctx.fill();
    if (kind === 'berry') {
      for (const [x, y] of [
        [-0.3, 0],
        [0.3, 0.1],
        [0, 0.5],
      ])
        circle(x, y, 0.045, '#fff8dd');
      ctx.fillStyle = '#67815a';
      ctx.beginPath();
      ctx.moveTo(-0.5, -0.65);
      ctx.lineTo(0, -0.3);
      ctx.lineTo(0.5, -0.65);
      ctx.lineTo(0, -0.85);
      ctx.closePath();
      ctx.fill();
    }
  } else if (kind === 'bow') {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-1.2, -1.2, -1.3, 0.8, 0, 0);
    ctx.bezierCurveTo(1.3, 0.8, 1.2, -1.2, 0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-0.08, 0);
    ctx.lineTo(-0.4, 1);
    ctx.moveTo(0.08, 0);
    ctx.lineTo(0.4, 1);
    ctx.stroke();
    circle(0, 0, 0.13, ink);
  } else if (kind === 'cloud') {
    circle(-0.48, 0.1, 0.38, '#fff');
    circle(0, -0.17, 0.5, '#fff');
    circle(0.48, 0.12, 0.34, '#fff');
    ctx.fillRect(-0.5, 0.05, 1, 0.4);
  }
  ctx.restore();
}

export function framePhotoRect(rect, id) {
  const inset = getFrame(id).inset;
  return {
    x: rect.x + inset,
    y: rect.y + inset,
    width: rect.width - inset * 2,
    height: rect.height - inset * 2,
  };
}

function mountRect(rect, id) {
  const inset = id === 'film-night' ? 12 : 24;
  return {
    x: rect.x + inset,
    y: rect.y + inset,
    width: rect.width - inset * 2,
    height: rect.height - inset * 2,
  };
}

export function paintFramePaper(ctx, size, id, image) {
  const frame = getFrame(id);
  if (frame.id === 'none') return;
  const { width, height, footer, padding } = size;
  ctx.save();
  ctx.fillStyle = image ? ctx.createPattern(paperTile(image), 'repeat') : frame.color;
  ctx.fillRect(0, 0, width, height);
  if (frame.id === 'paper-trail') {
    ctx.strokeStyle = '#c8beab';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < width; x += 45) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 45) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
  if (frame.id === 'moon-mail' || frame.id === 'daydream') {
    for (let y = 40; y < height; y += 150)
      for (let x = 30; x < width; x += 180)
        shape(
          ctx,
          frame.motif,
          x + (Math.floor(y / 150) % 2) * 70,
          y,
          frame.id === 'daydream' ? 40 : 11,
          frame.ink
        );
  }
  if (frame.id === 'cherry-club') {
    ctx.fillStyle = '#e3a5a3';
    for (let y = height - footer - padding; y < height; y += 24)
      for (let x = 0; x < width; x += 24)
        if ((Math.floor(x / 24) + Math.floor(y / 24)) % 2 === 0) ctx.fillRect(x, y, 24, 24);
  }
  if (frame.id === 'film-night') {
    ctx.fillStyle = '#fff';
    for (let y = 20; y < height; y += 58) {
      ctx.fillRect(9, y, 15, 28);
      ctx.fillRect(width - 24, y, 15, 28);
    }
  }
  ctx.restore();
}

export function paintFrameMounts(ctx, rects, id) {
  const frame = getFrame(id);
  if (frame.id === 'none') return;
  ctx.save();
  rects.forEach((raw) => {
    const rect = mountRect(raw, id);
    ctx.fillStyle = frame.id === 'film-night' ? '#000' : '#fffdf6';
    ctx.strokeStyle = frame.ink;
    ctx.lineWidth = frame.id === 'film-night' ? 3 : 4;
    ctx.beginPath();
    if (frame.torn) {
      for (let i = 0; i <= 20; i++)
        ctx.lineTo(rect.x + (rect.width * i) / 20, rect.y + ((i * 7) % 11));
      for (let i = 0; i <= 20; i++)
        ctx.lineTo(rect.x + rect.width - ((i * 5) % 9), rect.y + (rect.height * i) / 20);
      for (let i = 20; i >= 0; i--)
        ctx.lineTo(rect.x + (rect.width * i) / 20, rect.y + rect.height - ((i * 3) % 10));
      ctx.closePath();
    } else if (frame.id === 'daisy-diary') {
      const r = 8;
      ctx.rect(rect.x, rect.y, rect.width, rect.height);
      for (let x = rect.x + r; x < rect.x + rect.width; x += r * 2) {
        ctx.moveTo(x + r, rect.y);
        ctx.arc(x, rect.y, r, 0, Math.PI * 2);
        ctx.moveTo(x + r, rect.y + rect.height);
        ctx.arc(x, rect.y + rect.height, r, 0, Math.PI * 2);
      }
    } else ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

export function paintFrameDetails(ctx, rects, size, id) {
  const frame = getFrame(id);
  if (frame.id === 'none') return;
  ctx.save();
  rects.forEach((raw, i) => {
    const rect = mountRect(raw, id);
    if (frame.motif) {
      shape(ctx, frame.motif, rect.x + 23, rect.y + 23, 22, frame.ink);
      shape(ctx, frame.motif, rect.x + rect.width - 23, rect.y + rect.height - 23, 22, frame.ink);
    }
    if (frame.tape) {
      ctx.save();
      ctx.translate(rect.x + rect.width / 2, rect.y + 14);
      ctx.rotate(i % 2 ? -0.035 : 0.035);
      ctx.fillStyle = frame.torn ? '#dbc89c' : '#f0e3bc';
      ctx.fillRect(-95, -17, 190, 34);
      ctx.strokeStyle = frame.ink;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-95, -17, 190, 34);
      ctx.restore();
    }
  });
  // A quiet caption plaque keeps the user's own words legible on patterned paper.
  const y = size.height - size.padding - size.footer / 2;
  ctx.fillStyle = frame.id === 'film-night' || frame.id === 'moon-mail' ? frame.color : '#fffdf6';
  ctx.fillRect(size.padding + 48, y - 42, size.width - size.padding * 2 - 96, 84);
  ctx.restore();
}
