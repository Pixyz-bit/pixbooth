import { templates } from '../data/templates.js';
import { backgrounds } from '../data/backgrounds.js';
import { photoFilters } from '../data/photoFilters.js';
import { decorations } from '../data/decorations.js';
import { getFrame } from '../data/frames.js';
import { prepareFrameOptions } from './frames/frame-assets.js';
import {
  framePhotoRect,
  paintFramePaper,
  paintFrameMounts,
  paintFrameDetails,
} from './frames/frame-art.js';
export { templates, backgrounds, photoFilters, decorations };

// Fixed output geometry: source camera resolution never changes a template's size.
export function layoutSize(template) {
  const cellWidth = 900,
    cellHeight = template.cellHeight || 675,
    padding = template.padding || 36,
    gap = template.gap || 23,
    footer = template.footer || 126;
  return {
    cellWidth,
    cellHeight,
    padding,
    gap,
    footer,
    width: cellWidth * template.cols + gap * (template.cols - 1) + padding * 2,
    height: cellHeight * template.rows + gap * (template.rows - 1) + padding * 2 + footer,
  };
}
export function frameRects(template) {
  const size = layoutSize(template);
  return (
    template.slots ||
    Array.from(
      {
        length: template.count,
      },
      (_, i) => [i % template.cols, Math.floor(i / template.cols), 1, 1]
    )
  ).map(([x, y, w, h]) => ({
    x: size.padding + x * (size.cellWidth + size.gap),
    y: size.padding + y * (size.cellHeight + size.gap),
    width: size.cellWidth * w + size.gap * (w - 1),
    height: size.cellHeight * h + size.gap * (h - 1),
  }));
}
export function drawMotif(ctx, id, x, y, radius, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(radius, radius);
  ctx.fillStyle = color || '#d56787';
  ctx.strokeStyle = color || '#d56787';
  ctx.lineWidth = 0.14;
  const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  const poly = (points) => {
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
  };
  if (id === 'hearts') {
    ctx.beginPath();
    ctx.moveTo(0, 0.8);
    ctx.bezierCurveTo(-1.6, -0.2, -0.8, -1.4, 0, -0.55);
    ctx.bezierCurveTo(0.8, -1.4, 1.6, -0.2, 0, 0.8);
    ctx.fill();
  }
  if (id === 'stars' || id === 'sparkles') {
    const n = id === 'stars' ? 5 : 4;
    poly(
      Array.from(
        {
          length: n * 2,
        },
        (_, i) => {
          const a = -Math.PI / 2 + (i * Math.PI) / n,
            r = i % 2 ? 0.4 : 1;
          return [Math.cos(a) * r, Math.sin(a) * r];
        }
      )
    );
  }
  if (id === 'flowers') {
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      circle(Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0.4);
    }
    ctx.fillStyle = '#f2ca61';
    circle(0, 0, 0.3);
  }
  if (id === 'bows') {
    poly([
      [0, 0],
      [-1, -0.7],
      [-1, 0.7],
    ]);
    poly([
      [0, 0],
      [1, -0.7],
      [1, 0.7],
    ]);
    circle(0, 0, 0.25);
    poly([
      [-0.2, 0.15],
      [-0.6, 1],
      [-0.1, 0.8],
      [0.2, 0.15],
      [0.6, 1],
      [0.1, 0.8],
    ]);
  }
  if (id === 'leaves') {
    ctx.beginPath();
    ctx.ellipse(0, 0, 0.45, 1, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff8';
    ctx.beginPath();
    ctx.moveTo(-0.35, 0.6);
    ctx.lineTo(0.35, -0.6);
    ctx.stroke();
  }
  if (id === 'butterflies') {
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(s * 0.5, -0.25, 0.45, 0.65, s * 0.35, 0, Math.PI * 2);
      ctx.fill();
      circle(s * 0.45, 0.45, 0.35);
    }
    ctx.fillStyle = '#634975';
    ctx.fillRect(-0.1, -0.65, 0.2, 1.3);
  }
  if (id === 'cherries') {
    circle(-0.45, 0.4, 0.45);
    circle(0.45, 0.4, 0.45);
    ctx.strokeStyle = '#66864f';
    ctx.beginPath();
    ctx.moveTo(-0.45, 0);
    ctx.lineTo(0, -1);
    ctx.lineTo(0.45, 0);
    ctx.stroke();
  }
  if (id === 'clouds') {
    circle(-0.6, 0.2, 0.4);
    circle(0, 0, 0.65);
    circle(0.6, 0.2, 0.4);
    ctx.fillRect(-0.6, 0.2, 1.2, 0.4);
  }
  if (id === 'bolts')
    poly([
      [0.2, -1],
      [-0.6, 0.1],
      [0, 0.1],
      [-0.2, 1],
      [0.7, -0.2],
      [0.1, -0.2],
    ]);
  if (id === 'film') {
    ctx.beginPath();
    ctx.roundRect(-0.55, -0.9, 1.1, 1.8, 0.15);
    ctx.fill();
  }
  ctx.restore();
}
export function paintBackground(ctx, width, height, design) {
  ctx.fillStyle = design.color;
  ctx.fillRect(0, 0, width, height);
  if (design.pattern) {
    const colors = {
      dots: '#a8b9ba',
      gingham: '#dca6a2',
      stripes: '#e7b1c4',
      waves: '#8bb1c5',
      hearts: '#dfafc1',
      stars: '#cfbd8d',
      leaves: '#acbe91',
      sunrise: '#dfae8c',
    };
    ctx.fillStyle = colors[design.pattern];
    if (design.pattern === 'gingham') {
      ctx.globalAlpha = 0.5;
      for (let x = 0; x < width; x += 100) ctx.fillRect(x, 0, 50, height);
      for (let y = 0; y < height; y += 100) ctx.fillRect(0, y, width, 50);
      ctx.globalAlpha = 1;
    } else if (design.pattern === 'stripes') {
      for (let x = -height; x < width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 40, 0);
        ctx.lineTo(x + height + 40, height);
        ctx.lineTo(x + height, height);
        ctx.fill();
      }
    } else if (design.pattern === 'waves') {
      ctx.strokeStyle = colors.waves;
      ctx.lineWidth = 4;
      for (let y = 0; y < height; y += 65) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < width; x += 80) ctx.quadraticCurveTo(x + 40, y + 30, x + 80, y);
        ctx.stroke();
      }
    } else if (design.pattern === 'sunrise') {
      ctx.strokeStyle = colors.sunrise;
      ctx.lineWidth = 8;
      for (let r = 80; r < Math.max(width, height) * 2; r += 110) {
        ctx.beginPath();
        ctx.arc(width / 2, height, r, Math.PI, Math.PI * 2);
        ctx.stroke();
      }
    } else
      for (let y = 35; y < height; y += 110)
        for (let x = 35; x < width; x += 110) {
          const xx = x + (Math.floor(y / 110) % 2) * 45;
          if (design.pattern === 'dots') {
            ctx.beginPath();
            ctx.arc(xx, y, 7, 0, Math.PI * 2);
            ctx.fill();
          } else drawMotif(ctx, design.pattern, xx, y, 12, colors[design.pattern]);
        }
  }
  if (design.id === 'checker') {
    const size = 60;
    ctx.fillStyle = '#ecd8af';
    for (let y = 0; y < height; y += size)
      for (let x = 0; x < width; x += size) {
        if ((x / size + y / size) % 2 === 0) ctx.fillRect(x, y, size, size);
      }
  }
  if (design.id === 'confetti') {
    const colors = ['#d98695', '#7ba8bd', '#c5a457'];
    for (let y = 22; y < height; y += 74)
      for (let x = 22; x < width; x += 74) {
        ctx.fillStyle = colors[(Math.floor(x / 74) + Math.floor(y / 74)) % 3];
        ctx.beginPath();
        ctx.arc(x + (Math.floor(y / 74) % 2) * 23, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }
  }
}
export function paintStrip(ctx, images, template, options = {}) {
  const size = layoutSize(template);
  const { cellWidth, padding, footer, width, height } = size;
  const design = backgrounds.find((item) => item.id === options.background) || backgrounds[0];
  const filter = photoFilters.find((item) => item.id === options.filter) || photoFilters[0];
  const frameDesign = getFrame(options.frame);
  paintBackground(ctx, width, height, design);
  const frames = frameRects(template);
  paintFramePaper(ctx, size, frameDesign.id, options.frameArtwork);
  paintFrameMounts(ctx, frames, frameDesign.id);
  images.forEach((image, index) => {
    if (!frames[index] || !image) return;
    const frame = framePhotoRect(frames[index], frameDesign.id);
    const iw = image.naturalWidth || image.videoWidth || image.width,
      ih = image.naturalHeight || image.videoHeight || image.height;
    const scale = Math.max(frame.width / iw, frame.height / ih);
    const sw = frame.width / scale,
      sh = frame.height / scale;
    ctx.save();
    ctx.filter = filter.css;
    ctx.drawImage(
      image,
      (iw - sw) / 2,
      (ih - sh) / 2,
      sw,
      sh,
      frame.x,
      frame.y,
      frame.width,
      frame.height
    );
    ctx.restore();
  });
  paintFrameDetails(ctx, frames, size, frameDesign.id);
  const decoration = decorations.find((item) => item.id === options.decoration);
  if (decoration && decoration.id !== 'none') {
    const radius = Math.min(padding * 0.38, 28);
    for (let y = padding + radius; y < height - footer - padding; y += 160)
      for (const x of [padding / 2, width - padding / 2])
        drawMotif(ctx, decoration.id, x, y, radius, decoration.color);
    for (let x = padding + radius; x < width - padding; x += 160)
      drawMotif(ctx, decoration.id, x, padding / 2, radius, decoration.color);
    for (const x of [padding + 40, width - padding - 40])
      drawMotif(
        ctx,
        decoration.id,
        x,
        height - padding - footer / 2,
        Math.min(footer * 0.22, 30),
        decoration.color
      );
  }
  ctx.fillStyle = frameDesign.id === 'none' ? design.ink : frameDesign.ink;
  ctx.font = `700 ${Math.round(cellWidth * 0.065)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const caption = (options.caption || 'pixbooth').slice(0, 32);
  ctx.fillText(caption, width / 2, height - padding - footer / 2, width - padding * 2 - 100);
}
export async function composePhotos(shots, template, options = {}) {
  const preparedOptions = await prepareFrameOptions(options);
  const images = await Promise.all(
    shots.map(
      (shot) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error('Photo could not be decoded'));
          image.src = shot.url;
        })
    )
  );
  const { width, height } = layoutSize(template);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  paintStrip(ctx, images, template, preparedOptions);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
  if (!blob) throw new Error('Layout could not be encoded');
  return {
    blob,
    width: canvas.width,
    height: canvas.height,
  };
}
