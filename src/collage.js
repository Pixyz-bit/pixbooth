export const templates = [
  { id: 'single', name: 'Single', cols: 1, rows: 1, count: 1 },
  { id: 'strip-two', name: 'Duo strip', cols: 1, rows: 2, count: 2 },
  { id: 'strip-three', name: 'Trio strip', cols: 1, rows: 3, count: 3 },
  { id: 'strip-four', name: 'Classic strip', cols: 1, rows: 4, count: 4 },
  { id: 'grid-four', name: 'Four grid', cols: 2, rows: 2, count: 4 },
  { id: 'strip-six', name: 'Six strip', cols: 1, rows: 6, count: 6 },
  { id: 'grid-six', name: 'Six grid', cols: 2, rows: 3, count: 6 },
];

export async function composePhotos(shots, template) {
  const images = await Promise.all(shots.map(shot => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Photo could not be decoded'));
    image.src = shot.url;
  })));
  const cellWidth = Math.min(900, shots[0].width);
  const cellHeight = Math.round(cellWidth * 3 / 4);
  const padding = Math.round(cellWidth * .04);
  const gap = Math.round(cellWidth * .025);
  const footer = Math.round(cellWidth * .14);
  const canvas = document.createElement('canvas');
  canvas.width = cellWidth * template.cols + gap * (template.cols - 1) + padding * 2;
  canvas.height = cellHeight * template.rows + gap * (template.rows - 1) + padding * 2 + footer;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  images.forEach((image, index) => {
    const scale = Math.min(cellWidth / image.naturalWidth, cellHeight / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const x = padding + index % template.cols * (cellWidth + gap) + (cellWidth - width) / 2;
    const y = padding + Math.floor(index / template.cols) * (cellHeight + gap) + (cellHeight - height) / 2;
    ctx.drawImage(image, x, y, width, height);
  });
  ctx.fillStyle = '#fff';
  ctx.font = `700 ${Math.round(cellWidth * .065)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PhotoPix.', canvas.width / 2, canvas.height - padding - footer / 2);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .95));
  if (!blob) throw new Error('Layout could not be encoded');
  return { blob, width: canvas.width, height: canvas.height };
}
