export const templates = [
  { id: 'single', name: 'Single', cols: 1, rows: 1, count: 1 },
  { id: 'strip-two', name: 'Duo strip', cols: 1, rows: 2, count: 2 },
  { id: 'strip-three', name: 'Trio strip', cols: 1, rows: 3, count: 3 },
  { id: 'strip-four', name: 'Classic strip', cols: 1, rows: 4, count: 4 },
  { id: 'grid-four', name: 'Four grid', cols: 2, rows: 2, count: 4 },
  { id: 'strip-six', name: 'Six strip', cols: 1, rows: 6, count: 6 },
  { id: 'grid-six', name: 'Six grid', cols: 2, rows: 3, count: 6 },
  { id: 'polaroid', name: 'Polaroid', cols: 1, rows: 1, count: 1, cellHeight: 900, padding: 72, footer: 270 },
  { id: 'portrait', name: 'Portrait', cols: 1, rows: 1, count: 1, cellHeight: 1200 },
  { id: 'square', name: 'Square', cols: 1, rows: 1, count: 1, cellHeight: 900 },
  { id: 'duo-row', name: 'Duo row', cols: 2, rows: 1, count: 2 },
  { id: 'duo-square', name: 'Square duo', cols: 1, rows: 2, count: 2, cellHeight: 900 },
  { id: 'trio-row', name: 'Trio row', cols: 3, rows: 1, count: 3 },
  { id: 'story-three', name: 'Story trio', cols: 2, rows: 2, count: 3, slots: [[0,0,2,1],[0,1,1,1],[1,1,1,1]] },
  { id: 'feature-four', name: 'Hero + three', cols: 3, rows: 3, count: 4, slots: [[0,0,3,2],[0,2,1,1],[1,2,1,1],[2,2,1,1]] },
  { id: 'grid-square', name: 'Square four', cols: 2, rows: 2, count: 4, cellHeight: 900 },
  { id: 'film-four', name: 'Film frames', cols: 1, rows: 4, count: 4, padding: 90, gap: 36 },
  { id: 'wide-six', name: 'Six landscape', cols: 3, rows: 2, count: 6 },
  { id: 'contact-six', name: 'Contact sheet', cols: 3, rows: 2, count: 6, cellHeight: 900 },
  { id: 'grid-eight', name: 'Eight grid', cols: 2, rows: 4, count: 8 },
  { id: 'grid-nine', name: 'Nine grid', cols: 3, rows: 3, count: 9 },
];

export const backgrounds = [
  { id: 'black', name: 'Classic black', color: '#111111', ink: '#ffffff' },
  { id: 'white', name: 'Paper white', color: '#ffffff', ink: '#111111' },
  { id: 'blush', name: 'Blush', color: '#f6d6dc', ink: '#50212b' },
  { id: 'sky', name: 'Sky blue', color: '#d5e8fa', ink: '#183b5b' },
  { id: 'checker', name: 'Checkerboard', color: '#fff4dd', ink: '#352515' },
  { id: 'confetti', name: 'Confetti', color: '#fff7ed', ink: '#483425' },
  { id: 'sage', name: 'Sage', color: '#dce9dc', ink: '#294934' },
  { id: 'lavender', name: 'Lavender', color: '#e7dff4', ink: '#493b63' },
  { id: 'butter', name: 'Butter', color: '#f9ebbc', ink: '#594b29' },
  { id: 'terracotta', name: 'Terracotta', color: '#d6a28b', ink: '#4b2b21' },
  { id: 'midnight', name: 'Midnight', color: '#243449', ink: '#e6eef7' },
  { id: 'cherry', name: 'Cherry', color: '#873747', ink: '#ffe9ee' },
  { id: 'dots', name: 'Polka dots', color: '#faf6ed', ink: '#574337', pattern: 'dots' },
  { id: 'gingham', name: 'Gingham', color: '#fff1ec', ink: '#78493d', pattern: 'gingham' },
  { id: 'stripes', name: 'Candy stripes', color: '#fff2f5', ink: '#823b55', pattern: 'stripes' },
  { id: 'waves', name: 'Ocean waves', color: '#e0eef3', ink: '#285d72', pattern: 'waves' },
  { id: 'hearts', name: 'Love notes', color: '#fbe9ee', ink: '#884f67', pattern: 'hearts' },
  { id: 'stars', name: 'Night sky', color: '#263448', ink: '#f7e7ba', pattern: 'stars' },
  { id: 'botanical', name: 'Botanical', color: '#eef2e3', ink: '#536942', pattern: 'leaves' },
  { id: 'sunrise', name: 'Sunrise', color: '#f8d8b8', ink: '#8a5335', pattern: 'sunrise' },
];

export const photoFilters = [
  { id: 'normal', name: 'Original', css: 'none' },
  { id: 'mono', name: 'Black & white', css: 'grayscale(1)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(.55) contrast(.9) saturate(.8)' },
  { id: 'warm', name: 'Warm', css: 'sepia(.25) saturate(1.35)' },
  { id: 'cool', name: 'Cool', css: 'saturate(.8) hue-rotate(20deg)' },
  { id: 'soft', name: 'Soft', css: 'contrast(.85) brightness(1.1)' },
  { id: 'sepia', name: 'Sepia', css: 'sepia(1)' },
  { id: 'noir', name: 'Noir', css: 'grayscale(1) contrast(1.45) brightness(.9)' },
  { id: 'matte', name: 'Matte', css: 'contrast(.75) saturate(.8) brightness(1.12)' },
  { id: 'golden', name: 'Golden hour', css: 'sepia(.4) saturate(1.5) brightness(1.08)' },
  { id: 'rose', name: 'Rose tint', css: 'sepia(.25) hue-rotate(315deg) saturate(1.25)' },
  { id: 'teal', name: 'Teal', css: 'sepia(.3) hue-rotate(140deg) saturate(1.3)' },
  { id: 'cinema', name: 'Cinema', css: 'contrast(1.2) saturate(.65) brightness(.95)' },
  { id: 'pop', name: 'Pop', css: 'saturate(1.8) contrast(1.1)' },
  { id: 'fade', name: 'Faded film', css: 'contrast(.7) sepia(.2) brightness(1.15)' },
  { id: 'silver', name: 'Silver', css: 'grayscale(1) brightness(1.15) contrast(.85)' },
  { id: 'amber', name: 'Amber', css: 'sepia(.6) saturate(1.4) contrast(1.05)' },
  { id: 'icy', name: 'Icy', css: 'saturate(.5) hue-rotate(180deg) brightness(1.12)' },
  { id: 'dream', name: 'Dream', css: 'saturate(.75) contrast(.8) brightness(1.18)' },
  { id: 'punch', name: 'Punch', css: 'contrast(1.35) saturate(1.4)' },
];

export const decorations = [
  { id: 'none', name: 'None' }, { id: 'hearts', name: 'Hearts', color: '#d56787' },
  { id: 'stars', name: 'Stars', color: '#d6ad45' }, { id: 'flowers', name: 'Daisies', color: '#d78ea4' },
  { id: 'bows', name: 'Bows', color: '#b67290' }, { id: 'leaves', name: 'Leaves', color: '#769a68' },
  { id: 'sparkles', name: 'Sparkles', color: '#d8b456' }, { id: 'butterflies', name: 'Butterflies', color: '#a787bf' },
  { id: 'cherries', name: 'Cherries', color: '#bc4d64' }, { id: 'clouds', name: 'Clouds', color: '#8eb7cd' },
  { id: 'bolts', name: 'Lightning', color: '#d6a846' }, { id: 'film', name: 'Film sprockets', color: '#8b8b92' },
];

// Fixed output geometry: source camera resolution never changes a template's size.
export function layoutSize(template) {
  const cellWidth = 900, cellHeight = template.cellHeight || 675, padding = template.padding || 36, gap = template.gap || 23, footer = template.footer || 126;
  return { cellWidth, cellHeight, padding, gap, footer,
    width: cellWidth * template.cols + gap * (template.cols - 1) + padding * 2,
    height: cellHeight * template.rows + gap * (template.rows - 1) + padding * 2 + footer };
}

export function frameRects(template) {
  const size = layoutSize(template);
  return (template.slots || Array.from({ length: template.count }, (_, i) => [i % template.cols, Math.floor(i / template.cols), 1, 1])).map(([x,y,w,h]) => ({
    x: size.padding + x * (size.cellWidth + size.gap), y: size.padding + y * (size.cellHeight + size.gap),
    width: size.cellWidth * w + size.gap * (w - 1), height: size.cellHeight * h + size.gap * (h - 1),
  }));
}

export function drawMotif(ctx, id, x, y, radius, color) {
  ctx.save(); ctx.translate(x, y); ctx.scale(radius, radius); ctx.fillStyle = color || '#d56787'; ctx.strokeStyle = color || '#d56787'; ctx.lineWidth = .14;
  const circle = (x,y,r) => { ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); };
  const poly = points => { ctx.beginPath(); points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.closePath(); ctx.fill(); };
  if (id === 'hearts') { ctx.beginPath(); ctx.moveTo(0,.8); ctx.bezierCurveTo(-1.6,-.2,-.8,-1.4,0,-.55); ctx.bezierCurveTo(.8,-1.4,1.6,-.2,0,.8); ctx.fill(); }
  if (id === 'stars' || id === 'sparkles') { const n=id==='stars'?5:4; poly(Array.from({length:n*2},(_,i)=>{const a=-Math.PI/2+i*Math.PI/n,r=i%2?.4:1;return[Math.cos(a)*r,Math.sin(a)*r];})); }
  if (id === 'flowers') { for(let i=0;i<6;i++){const a=i*Math.PI/3;circle(Math.cos(a)*.6,Math.sin(a)*.6,.4);}ctx.fillStyle='#f2ca61';circle(0,0,.3); }
  if (id === 'bows') { poly([[0,0],[-1,-.7],[-1,.7]]);poly([[0,0],[1,-.7],[1,.7]]);circle(0,0,.25);poly([[-.2,.15],[-.6,1],[-.1,.8],[.2,.15],[.6,1],[.1,.8]]); }
  if (id === 'leaves') { ctx.beginPath();ctx.ellipse(0,0,.45,1,.5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff8';ctx.beginPath();ctx.moveTo(-.35,.6);ctx.lineTo(.35,-.6);ctx.stroke(); }
  if (id === 'butterflies') { for(const s of [-1,1]){ctx.beginPath();ctx.ellipse(s*.5,-.25,.45,.65,s*.35,0,Math.PI*2);ctx.fill();circle(s*.45,.45,.35);}ctx.fillStyle='#634975';ctx.fillRect(-.1,-.65,.2,1.3); }
  if (id === 'cherries') { circle(-.45,.4,.45);circle(.45,.4,.45);ctx.strokeStyle='#66864f';ctx.beginPath();ctx.moveTo(-.45,0);ctx.lineTo(0,-1);ctx.lineTo(.45,0);ctx.stroke(); }
  if (id === 'clouds') { circle(-.6,.2,.4);circle(0,0,.65);circle(.6,.2,.4);ctx.fillRect(-.6,.2,1.2,.4); }
  if (id === 'bolts') poly([[.2,-1],[-.6,.1],[0,.1],[-.2,1],[.7,-.2],[.1,-.2]]);
  if (id === 'film') { ctx.beginPath();ctx.roundRect(-.55,-.9,1.1,1.8,.15);ctx.fill(); }
  ctx.restore();
}

export function paintBackground(ctx, width, height, design) {
  ctx.fillStyle = design.color;
  ctx.fillRect(0, 0, width, height);
  if (design.pattern) {
    const colors = {dots:'#a8b9ba',gingham:'#dca6a2',stripes:'#e7b1c4',waves:'#8bb1c5',hearts:'#dfafc1',stars:'#cfbd8d',leaves:'#acbe91',sunrise:'#dfae8c'};
    ctx.fillStyle = colors[design.pattern];
    if (design.pattern === 'gingham') { ctx.globalAlpha=.5;for(let x=0;x<width;x+=100)ctx.fillRect(x,0,50,height);for(let y=0;y<height;y+=100)ctx.fillRect(0,y,width,50);ctx.globalAlpha=1; }
    else if (design.pattern === 'stripes') { for(let x=-height;x<width;x+=100){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+40,0);ctx.lineTo(x+height+40,height);ctx.lineTo(x+height,height);ctx.fill();} }
    else if (design.pattern === 'waves') { ctx.strokeStyle=colors.waves;ctx.lineWidth=4;for(let y=0;y<height;y+=65){ctx.beginPath();ctx.moveTo(0,y);for(let x=0;x<width;x+=80)ctx.quadraticCurveTo(x+40,y+30,x+80,y);ctx.stroke();} }
    else if (design.pattern === 'sunrise') { ctx.strokeStyle=colors.sunrise;ctx.lineWidth=8;for(let r=80;r<Math.max(width,height)*2;r+=110){ctx.beginPath();ctx.arc(width/2,height,r,Math.PI,Math.PI*2);ctx.stroke();} }
    else for(let y=35;y<height;y+=110)for(let x=35;x<width;x+=110){const xx=x+(Math.floor(y/110)%2)*45;if(design.pattern==='dots'){ctx.beginPath();ctx.arc(xx,y,7,0,Math.PI*2);ctx.fill();}else drawMotif(ctx,design.pattern,xx,y,12,colors[design.pattern]);}
  }
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

export function paintStrip(ctx, images, template, options = {}) {
  const { cellWidth, padding, footer, width, height } = layoutSize(template);
  const design = backgrounds.find(item => item.id === options.background) || backgrounds[0];
  const filter = photoFilters.find(item => item.id === options.filter) || photoFilters[0];
  paintBackground(ctx, width, height, design);
  const frames = frameRects(template);
  images.forEach((image, index) => {
    const frame = frames[index]; if (!frame || !image) return;
    const iw = image.naturalWidth || image.videoWidth || image.width, ih = image.naturalHeight || image.videoHeight || image.height;
    const scale = Math.max(frame.width / iw, frame.height / ih);
    const sw = frame.width / scale, sh = frame.height / scale;
    ctx.save(); ctx.filter = filter.css;
    ctx.drawImage(image, (iw - sw) / 2, (ih - sh) / 2, sw, sh, frame.x, frame.y, frame.width, frame.height); ctx.restore();
  });
  const decoration = decorations.find(item => item.id === options.decoration);
  if (decoration && decoration.id !== 'none') {
    const radius = Math.min(padding * .38, 28);
    for (let y=padding+radius;y<height-footer-padding;y+=160) for (const x of [padding/2,width-padding/2]) drawMotif(ctx,decoration.id,x,y,radius,decoration.color);
    for (let x=padding+radius;x<width-padding;x+=160) drawMotif(ctx,decoration.id,x,padding/2,radius,decoration.color);
    for (const x of [padding+40,width-padding-40]) drawMotif(ctx,decoration.id,x,height-padding-footer/2,Math.min(footer*.22,30),decoration.color);
  }
  ctx.fillStyle = design.ink;
  ctx.font = `700 ${Math.round(cellWidth * .065)}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const caption = (options.caption || 'pixbooth').slice(0,32);
  ctx.fillText(caption, width / 2, height - padding - footer / 2, width-padding*2-100);
}

export async function composePhotos(shots, template, options = {}) {
  const images = await Promise.all(shots.map(shot => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Photo could not be decoded'));
    image.src = shot.url;
  })));
  const { width, height } = layoutSize(template);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  paintStrip(ctx, images, template, options);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .95));
  if (!blob) throw new Error('Layout could not be encoded');
  return { blob, width: canvas.width, height: canvas.height };
}
