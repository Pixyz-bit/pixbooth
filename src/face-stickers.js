export const stickers = [
  { id: 'none', name: 'None' }, { id: 'dog', name: 'Dog' },
  { id: 'hat', name: 'Hat' }, { id: 'glasses', name: 'Glasses' },
];

// Render in source-frame coordinates, before the capture's mirror transform.
export function drawSticker(ctx, landmarks, width, height, sticker) {
  if (!landmarks || sticker === 'none') return;
  const p = index => ({ x: landmarks[index].x * width, y: landmarks[index].y * height });
  const left = p(33), right = p(263), nose = p(1), top = p(10), mouth = p(13);
  const eyeWidth = Math.hypot(right.x - left.x, right.y - left.y);
  if (eyeWidth < 1) return;
  const angle = Math.atan2(right.y - left.y, right.x - left.x);
  const center = { x: (left.x + right.x) / 2, y: (left.y + right.y) / 2 };
  const local = point => ({ x: ((point.x - center.x) * Math.cos(angle) + (point.y - center.y) * Math.sin(angle)) / eyeWidth,
    y: (-(point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle)) / eyeWidth });
  const forehead = local(top), snout = local(nose), lips = local(mouth);
  ctx.save(); ctx.translate(center.x, center.y); ctx.rotate(angle); ctx.scale(eyeWidth, eyeWidth);
  ctx.lineWidth = .025; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (sticker === 'glasses') {
    ctx.fillStyle = '#151515bb'; ctx.strokeStyle = '#111'; ctx.lineWidth = .055;
    for (const x of [-.5, .05]) { ctx.beginPath(); ctx.roundRect(x, -.14, .45, .32, .075); ctx.fill(); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-.05, -.02); ctx.quadraticCurveTo(0, -.1, .05, -.02); ctx.moveTo(-.6, -.09); ctx.lineTo(-.5, -.06); ctx.moveTo(.5, -.06); ctx.lineTo(.6, -.09); ctx.stroke();
    ctx.strokeStyle = '#ffffff88'; ctx.lineWidth = .025;
    for (const x of [-.4, .16]) { ctx.beginPath(); ctx.moveTo(x, -.08); ctx.lineTo(x + .11, .03); ctx.stroke(); }
  }
  if (sticker === 'hat') {
    ctx.fillStyle = '#1c1b22'; ctx.strokeStyle = '#080808';
    ctx.beginPath(); ctx.roundRect(-.55, forehead.y - .62, 1.1, .65, [.17,.17,0,0]); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c2a060'; ctx.fillRect(-.55, forehead.y - .12, 1.1, .14);
    ctx.fillStyle = '#1c1b22'; ctx.beginPath(); ctx.ellipse(0, forehead.y + .025, .82, .09, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  if (sticker === 'dog') {
    ctx.fillStyle = '#9b6238'; ctx.strokeStyle = '#5e351e';
    for (const side of [-1, 1]) {
      ctx.save(); ctx.translate(side * .65, forehead.y + .03); ctx.rotate(-side * .25);
      ctx.beginPath(); ctx.ellipse(0, 0, .19, .38, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#d9a585'; ctx.beginPath(); ctx.ellipse(0, .04, .105, .25, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    ctx.fillStyle = '#24201e'; ctx.beginPath(); ctx.ellipse(snout.x, snout.y, .16, .11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff80'; ctx.beginPath(); ctx.ellipse(snout.x - .04, snout.y - .03, .045, .02, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e990a1'; ctx.strokeStyle = '#ad5062'; ctx.beginPath(); ctx.roundRect(lips.x - .09, lips.y + .02, .18, .3, [0,0,.09,.09]); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lips.x, lips.y + .07); ctx.lineTo(lips.x, lips.y + .23); ctx.stroke();
  }
  ctx.restore();
}
