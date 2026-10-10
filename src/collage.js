export const templates = [
  { id: 'single', name: 'Single', cols: 1, rows: 1, count: 1 },
  { id: 'strip-two', name: 'Duo strip', cols: 1, rows: 2, count: 2 },
  { id: 'strip-three', name: 'Trio strip', cols: 1, rows: 3, count: 3 },
  { id: 'strip-four', name: 'Classic strip', cols: 1, rows: 4, count: 4 },
  { id: 'grid-four', name: 'Four grid', cols: 2, rows: 2, count: 4 },
  { id: 'strip-six', name: 'Six strip', cols: 1, rows: 6, count: 6 },
  { id: 'grid-six', name: 'Six grid', cols: 2, rows: 3, count: 6 },
];

export const backgrounds = [
  { id: 'black', name: 'Classic black', color: '#111111', ink: '#ffffff' },
  { id: 'white', name: 'Paper white', color: '#ffffff', ink: '#111111' },
  { id: 'blush', name: 'Blush', color: '#f6d6dc', ink: '#50212b' },
  { id: 'sky', name: 'Sky blue', color: '#d5e8fa', ink: '#183b5b' },
  { id: 'checker', name: 'Checkerboard', color: '#fff4dd', ink: '#352515' },
  { id: 'confetti', name: 'Confetti', color: '#fff7ed', ink: '#483425' },
];

export const photoFilters = [
  { id: 'normal', name: 'Original', css: 'none' },
  { id: 'mono', name: 'Black & white', css: 'grayscale(1)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(.55) contrast(.9) saturate(.8)' },
  { id: 'warm', name: 'Warm', css: 'sepia(.25) saturate(1.35)' },
  { id: 'cool', name: 'Cool', css: 'saturate(.8) hue-rotate(20deg)' },
  { id: 'soft', name: 'Soft', css: 'contrast(.85) brightness(1.1)' },
];

// Fixed output geometry: source camera resolution never changes a template's size.
export function layoutSize(template) {
  const cellWidth = 900, cellHeight = 675, padding = 36, gap = 23, footer = 126;
  return { cellWidth, cellHeight, padding, gap, footer,
    width: cellWidth * template.cols + gap * (template.cols - 1) + padding * 2,
    height: cellHeight * template.rows + gap * (template.rows - 1) + padding * 2 + footer };
}

export function paintBackground(ctx, width, height, design) {
  ctx.fillStyle = design.color;
  ctx.fillRect(0, 0, width, height);
  if (design.id === 'checker') {
    const size = 60;
    ctx.fillStyle = '#ecd8af';
    for (let y = 0; y < height; y += size) for (let x = 0; x < width; x += size) {
      if ((x / size + y / size) % 2 === 0) ctx.fillRect(x, y, size, size);
    }
  }
  if (design.id === 'confetti') {
    const colors = ['#d98695', '#7ba8bd', '#c5a457'];
    for (let y = 22; y < height; y += 74) for (let x = 22; x < width; x += 74) {
      ctx.fillStyle = colors[(Math.floor(x / 74) + Math.floor(y / 74)) % 3];
      ctx.beginPath(); ctx.arc(x + (Math.floor(y / 74) % 2) * 23, y, 7, 0, Math.PI * 2); ctx.fill();
    }
  }
}

export async function composePhotos(shots, template, options = {}) {
  const images = await Promise.all(shots.map(shot => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Photo could not be decoded'));
    image.src = shot.url;
  })));
  const { cellWidth, cellHeight, padding, gap, footer, width, height } = layoutSize(template);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const design = backgrounds.find(item => item.id === options.background) || backgrounds[0];
  const filter = photoFilters.find(item => item.id === options.filter) || photoFilters[0];
  paintBackground(ctx, canvas.width, canvas.height, design);
  images.forEach((image, index) => {
    const cellX = padding + index % template.cols * (cellWidth + gap);
    const cellY = padding + Math.floor(index / template.cols) * (cellHeight + gap);
    ctx.fillStyle = '#111'; ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
    const scale = Math.min(cellWidth / image.naturalWidth, cellHeight / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const x = padding + index % template.cols * (cellWidth + gap) + (cellWidth - width) / 2;
    const y = padding + Math.floor(index / template.cols) * (cellHeight + gap) + (cellHeight - height) / 2;
    ctx.save(); ctx.filter = filter.css;
    ctx.drawImage(image, x, y, width, height); ctx.restore();
  });
  ctx.fillStyle = design.ink;
  ctx.font = `700 ${Math.round(cellWidth * .065)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PhotoPix.', canvas.width / 2, canvas.height - padding - footer / 2);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .95));
  if (!blob) throw new Error('Layout could not be encoded');
  return { blob, width: canvas.width, height: canvas.height };
}
