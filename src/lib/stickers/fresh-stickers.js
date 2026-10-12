// Original artwork for the mixed Fresh picks collection. Coordinates are in
// the same eye-distance frame used by thumbnails, live overlays and exports.
export const freshStickers = [
  ['ribbon-bow', 'Ribbon bow'],
  ['daisy-band', 'Daisy band'],
  ['cherry-cheeks', 'Cherry cheeks'],
  ['cloud-halo', 'Cloud halo'],
  ['pixel-shades', 'Pixel shades'],
  ['sunset-shades', 'Sunset shades'],
  ['pearl-tiara', 'Pearl tiara'],
  ['star-headphones', 'Star headphones'],
  ['cosmic-freckles', 'Cosmic freckles'],
  ['bunny-bonnet', 'Bunny bonnet'],
  ['lightning-cheeks', 'Lightning cheeks'],
  ['moon-stars', 'Moon & stars'],
];
const palette = {
  ink: '#20252a',
  white: '#ffffff',
  pink: '#ec729f',
  gold: '#e6c052',
  blue: '#78c5cf',
  violet: '#8b78c7',
  green: '#719777',
};
const ids = new Set(freshStickers.map(([id]) => id));
export function drawFreshSticker(ctx, { top, nose }, tools, id) {
  if (!ids.has(id)) return false;
  const { ellipse, polygon, line, rect, star } = tools;
  const c = palette;
  const outlinedRect = (x, y, w, h, r, fill) => {
    ctx.strokeStyle = c.ink;
    ctx.lineWidth = 0.025;
    rect(x, y, w, h, r, fill, true);
  };
  const bow = (x, y, size, color) => {
    polygon(
      [
        [x, y],
        [x - size, y - size * 0.58],
        [x - size * 1.04, y + size * 0.48],
        [x, y + size * 0.12],
      ],
      color,
      true
    );
    polygon(
      [
        [x, y],
        [x + size, y - size * 0.58],
        [x + size * 1.04, y + size * 0.48],
        [x, y + size * 0.12],
      ],
      color,
      true
    );
    line(
      [
        [x - size * 0.8, y - size * 0.05],
        [x - size * 0.2, y + size * 0.06],
      ],
      c.white,
      0.018
    );
    line(
      [
        [x + size * 0.8, y - size * 0.05],
        [x + size * 0.2, y + size * 0.06],
      ],
      c.white,
      0.018
    );
    outlinedRect(x - size * 0.12, y - size * 0.19, size * 0.24, size * 0.38, 0.04, color);
  };
  const daisy = (x, y, r) => {
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      ellipse(
        x + Math.cos(a) * r * 0.55,
        y + Math.sin(a) * r * 0.55,
        r * 0.39,
        r * 0.29,
        c.white,
        a
      );
    }
    ellipse(x, y, r * 0.32, r * 0.32, c.gold);
  };
  const crescent = (x, y, r) => {
    ctx.fillStyle = c.gold;
    ctx.beginPath();
    ctx.moveTo(x + r * 0.55, y - r * 0.85);
    ctx.bezierCurveTo(
      x - r * 1.15,
      y - r * 1.1,
      x - r * 1.15,
      y + r * 1.1,
      x + r * 0.55,
      y + r * 0.85
    );
    ctx.bezierCurveTo(
      x - r * 0.4,
      y + r * 0.35,
      x - r * 0.4,
      y - r * 0.35,
      x + r * 0.55,
      y - r * 0.85
    );
    ctx.fill();
  };
  if (id === 'ribbon-bow') {
    const y = top.y - 0.15;
    line(
      [
        [-0.65, top.y + 0.03],
        [0, top.y - 0.03],
        [0.65, top.y + 0.03],
      ],
      c.pink,
      0.07
    );
    bow(0.23, y, 0.43, c.pink);
    polygon(
      [
        [0.16, y + 0.03],
        [-0.03, y + 0.48],
        [0.13, y + 0.39],
        [0.27, y + 0.49],
        [0.3, y + 0.03],
      ],
      c.pink,
      true
    );
  }
  if (id === 'daisy-band') {
    line(
      [
        [-0.67, top.y + 0.05],
        [-0.3, top.y - 0.12],
        [0, top.y - 0.16],
        [0.3, top.y - 0.12],
        [0.67, top.y + 0.05],
      ],
      c.green,
      0.055
    );
    for (const x of [-0.5, -0.25, 0, 0.25, 0.5]) {
      ellipse(x + 0.07, top.y + 0.05 + Math.abs(x) * 0.15, 0.12, 0.035, c.green, -0.4);
      daisy(x, top.y - 0.1 + Math.abs(x) * 0.15, 0.17);
    }
  }
  if (id === 'cherry-cheeks') {
    for (const side of [-1, 1]) {
      const x = side * 0.43,
        y = nose.y + 0.12;
      line(
        [
          [x - 0.06, y - 0.02],
          [x + 0.015, y - 0.25],
          [x + 0.09, y - 0.02],
        ],
        c.green,
        0.025
      );
      ellipse(x + 0.09, y - 0.21, 0.065, 0.026, c.green, -0.35);
      for (const dx of [-0.07, 0.08]) {
        ellipse(x + dx, y, 0.07, 0.075, c.pink);
        ellipse(x + dx - 0.022, y - 0.023, 0.017, 0.012, c.white);
      }
    }
  }
  if (id === 'cloud-halo') {
    const y = top.y - 0.35;
    ctx.strokeStyle = c.blue;
    ctx.lineWidth = 0.04;
    ctx.beginPath();
    ctx.ellipse(0, y + 0.16, 0.64, 0.13, 0, 0, Math.PI * 2);
    ctx.stroke();
    for (const [x, dy, r] of [
      [-0.25, 0, 0.19],
      [0, -0.1, 0.24],
      [0.25, 0, 0.19],
    ])
      ellipse(x, y + dy, r, r * 0.7, c.blue);
    rect(-0.42, y - 0.02, 0.84, 0.15, 0.08, c.blue);
    for (const [x, dy, r] of [
      [-0.25, 0, 0.16],
      [0, -0.1, 0.21],
      [0.25, 0, 0.16],
    ])
      ellipse(x, y + dy, r, r * 0.7, c.white);
    rect(-0.38, y - 0.015, 0.76, 0.11, 0.05, c.white);
    star(-0.73, y + 0.12, 0.11, c.gold, 4);
    star(0.73, y - 0.08, 0.09, c.gold, 4);
  }
  if (id === 'pixel-shades') {
    const lens = (x) => {
      polygon(
        [
          [x - 0.27, -0.17],
          [x + 0.25, -0.17],
          [x + 0.25, 0.12],
          [x + 0.18, 0.12],
          [x + 0.18, 0.2],
          [x - 0.2, 0.2],
          [x - 0.2, 0.12],
          [x - 0.27, 0.12],
        ],
        c.ink
      );
      rect(x - 0.18, -0.08, 0.27, 0.16, 0, c.blue);
      rect(x - 0.15, -0.07, 0.065, 0.065, 0, c.white);
    };
    lens(-0.3);
    lens(0.3);
    rect(-0.08, -0.12, 0.16, 0.06, 0, c.ink);
    line(
      [
        [-0.75, -0.12],
        [-0.54, -0.1],
      ],
      c.ink,
      0.07
    );
    line(
      [
        [0.54, -0.1],
        [0.75, -0.12],
      ],
      c.ink,
      0.07
    );
  }
  if (id === 'sunset-shades') {
    for (const side of [-1, 1]) {
      const x = side * 0.3;
      outlinedRect(x - 0.27, -0.15, 0.54, 0.35, 0.13, c.pink + 'a8');
      rect(x - 0.2, 0.025, 0.4, 0.085, 0.035, c.gold + 'a8');
      line(
        [
          [x - 0.16, -0.07],
          [x + 0.03, -0.01],
        ],
        c.white,
        0.025
      );
    }
    line(
      [
        [-0.05, -0.03],
        [0, -0.07],
        [0.05, -0.03],
      ],
      c.ink,
      0.04
    );
    line(
      [
        [-0.77, -0.1],
        [-0.55, -0.03],
      ],
      c.ink,
      0.04
    );
    line(
      [
        [0.55, -0.03],
        [0.77, -0.1],
      ],
      c.ink,
      0.04
    );
  }
  if (id === 'pearl-tiara') {
    const y = top.y;
    line(
      [
        [-0.65, y + 0.02],
        [-0.36, y - 0.14],
        [0, y - 0.28],
        [0.36, y - 0.14],
        [0.65, y + 0.02],
      ],
      c.gold,
      0.04
    );
    for (const x of [-0.55, -0.36, -0.18, 0, 0.18, 0.36, 0.55]) {
      const py = y - 0.25 + Math.abs(x) * 0.42;
      ellipse(x, py, 0.072, 0.072, c.violet);
      ellipse(x - 0.012, py - 0.015, 0.056, 0.056, c.white);
    }
    polygon(
      [
        [0, y - 0.55],
        [0.12, y - 0.37],
        [0, y - 0.2],
        [-0.12, y - 0.37],
      ],
      c.blue,
      true
    );
  }
  if (id === 'star-headphones') {
    ctx.strokeStyle = c.violet;
    ctx.lineWidth = 0.085;
    ctx.beginPath();
    ctx.ellipse(0, top.y + 0.39, 0.73, 0.63, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
    for (const side of [-1, 1]) {
      outlinedRect(side * 0.71 - 0.12, -0.04, 0.24, 0.46, 0.09, c.violet);
      star(side * 0.71, 0.18, 0.09, c.gold);
      line(
        [
          [side * 0.71 - 0.06, 0.05],
          [side * 0.71 + 0.06, 0.05],
        ],
        c.white,
        0.018
      );
    }
  }
  if (id === 'cosmic-freckles') {
    for (const side of [-1, 1]) {
      const x = side * 0.42,
        y = nose.y + 0.08;
      star(x, y, 0.09, c.gold, 4);
      star(x + side * 0.17, y - 0.06, 0.06, c.violet, 4);
      for (const [dx, dy] of [
        [-0.1, 0.11],
        [0.02, 0.15],
        [0.13, 0.09],
        [-0.03, -0.1],
      ])
        ellipse(x + side * dx, y + dy, 0.022, 0.022, c.violet);
    }
  }
  if (id === 'bunny-bonnet') {
    for (const side of [-1, 1]) {
      ellipse(side * 0.43, top.y - 0.35, 0.13, 0.37, c.white, -side * 0.1);
      ellipse(side * 0.43, top.y - 0.35, 0.067, 0.29, c.pink, -side * 0.1);
    }
    ellipse(0, top.y + 0.01, 0.67, 0.13, c.blue);
    bow(0.43, top.y + 0.1, 0.2, c.pink);
  }
  if (id === 'lightning-cheeks') {
    for (const side of [-1, 1]) {
      const x = side * 0.44,
        y = nose.y + 0.02;
      polygon(
        [
          [x + 0.05, y - 0.12],
          [x - 0.13, y + 0.09],
          [x - 0.015, y + 0.08],
          [x - 0.07, y + 0.3],
          [x + 0.15, y + 0.02],
          [x + 0.03, y + 0.04],
        ],
        c.gold,
        true
      );
      star(x + side * 0.18, y - 0.04, 0.07, c.blue, 4);
    }
  }
  if (id === 'moon-stars') {
    crescent(0.35, top.y - 0.27, 0.27);
    for (const [x, y, r] of [
      [-0.45, top.y - 0.14, 0.14],
      [-0.7, -0.05, 0.11],
      [0.72, 0.2, 0.1],
      [-0.3, nose.y + 0.1, 0.055],
    ])
      star(x, y, r, c.gold, 4);
    for (const [x, y] of [
      [-0.12, top.y - 0.28],
      [0.62, top.y - 0.06],
      [-0.63, nose.y + 0.07],
    ])
      ellipse(x, y, 0.025, 0.025, c.violet);
  }
  return true;
}
