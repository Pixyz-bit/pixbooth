const groups = {
  Animals: [
    ['dog', 'Dog'],
    ['cat', 'Cat'],
    ['bunny', 'Bunny'],
    ['bear', 'Bear'],
    ['panda', 'Panda'],
    ['fox', 'Fox'],
    ['tiger', 'Tiger'],
    ['mouse', 'Mouse'],
  ],
  Eyewear: [
    ['glasses', 'Glasses'],
    ['aviators', 'Aviators'],
    ['round-glasses', 'Round glasses'],
    ['heart-glasses', 'Heart glasses'],
    ['star-glasses', 'Star glasses'],
    ['goggles', 'Goggles'],
    ['monocle', 'Monocle'],
  ],
  Headwear: [
    ['hat', 'Hat'],
    ['cap', 'Baseball cap'],
    ['beanie', 'Beanie'],
    ['crown', 'Crown'],
    ['tiara', 'Tiara'],
    ['wizard', 'Wizard hat'],
    ['party', 'Party hat'],
    ['halo', 'Halo'],
    ['headphones', 'Headphones'],
    ['flowers', 'Flower crown'],
  ],
  Fun: [
    ['moustache', 'Moustache'],
    ['beard', 'Beard'],
    ['clown', 'Clown nose'],
    ['blush', 'Blush'],
    ['freckles', 'Freckles'],
    ['hearts', 'Heart cheeks'],
    ['stars', 'Stars'],
    ['sparkles', 'Sparkles'],
    ['robot', 'Robot mask'],
    ['superhero', 'Superhero mask'],
    ['butterfly', 'Butterfly wings'],
  ],
};
export const stickerCategories = Object.keys(groups);
export const stickers = [
  {
    id: 'none',
    name: 'None',
    category: 'All',
  },
  ...Object.entries(groups).flatMap(([category, items]) =>
    items.map(([id, name]) => ({
      id,
      name,
      category,
    }))
  ),
];

// Thumbnails, the live overlay and saved photos share source-frame artwork.
export function drawSticker(ctx, landmarks, width, height, sticker) {
  if (!landmarks || sticker === 'none') return;
  const p = (i) => ({
    x: landmarks[i].x * width,
    y: landmarks[i].y * height,
  });
  const left = p(33),
    right = p(263),
    scale = Math.hypot(right.x - left.x, right.y - left.y);
  if (scale < 1) return;
  const angle = Math.atan2(right.y - left.y, right.x - left.x),
    cx = (left.x + right.x) / 2,
    cy = (left.y + right.y) / 2;
  const local = (point) => ({
    x: ((point.x - cx) * Math.cos(angle) + (point.y - cy) * Math.sin(angle)) / scale,
    y: (-(point.x - cx) * Math.sin(angle) + (point.y - cy) * Math.cos(angle)) / scale,
  });
  const top = local(p(10)),
    nose = local(p(1)),
    mouth = local(p(13));
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.lineWidth = 0.025;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#29242b';
  const ellipse = (x, y, rx, ry, color, rotation = 0) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
    ctx.fill();
  };
  const polygon = (points, color, stroke = false) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
    if (stroke) ctx.stroke();
  };
  const line = (points, color = '#29242b', thickness = 0.025) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
  };
  const rect = (x, y, w, h, r, color, stroke = false) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    if (stroke) ctx.stroke();
  };
  const star = (x, y, r, color, points = 5) =>
    polygon(
      Array.from(
        {
          length: points * 2,
        },
        (_, i) => {
          const a = -Math.PI / 2 + (i * Math.PI) / points,
            d = i % 2 ? r * 0.45 : r;
          return [x + Math.cos(a) * d, y + Math.sin(a) * d];
        }
      ),
      color
    );
  const heart = (x, y, r, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.55);
    ctx.bezierCurveTo(x - r, y, x - r * 0.65, y - r * 0.7, x, y - r * 0.25);
    ctx.bezierCurveTo(x + r * 0.65, y - r * 0.7, x + r, y, x, y + r * 0.55);
    ctx.fill();
  };
  const flower = (x, y, r, color) => {
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      ellipse(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55, r * 0.4, r * 0.4, color);
    }
    ellipse(x, y, r * 0.26, r * 0.26, '#f4c75f');
  };
  if (groups.Animals.some(([id]) => id === sticker)) {
    const color = {
      dog: '#9b6238',
      cat: '#555566',
      bunny: '#f2e3e9',
      bear: '#956a4b',
      panda: '#25252e',
      fox: '#d77837',
      tiger: '#eea344',
      mouse: '#9994aa',
    }[sticker];
    for (const s of [-1, 1]) {
      const x = s * 0.65,
        y = top.y + 0.02;
      if (['dog', 'bunny'].includes(sticker)) {
        const tall = sticker === 'bunny';
        ellipse(x, y - (tall ? 0.25 : 0), tall ? 0.13 : 0.19, tall ? 0.48 : 0.38, color, -s * 0.2);
        ellipse(
          x,
          y - (tall ? 0.25 : -0.03),
          tall ? 0.07 : 0.105,
          tall ? 0.35 : 0.25,
          '#e5a4b5',
          -s * 0.2
        );
      } else if (['bear', 'panda', 'mouse'].includes(sticker)) {
        ellipse(
          x,
          y - 0.12,
          sticker === 'mouse' ? 0.28 : 0.22,
          sticker === 'mouse' ? 0.28 : 0.22,
          color
        );
        ellipse(x, y - 0.12, 0.13, 0.13, sticker === 'panda' ? '#dddce4' : '#ddb3ac');
      } else {
        polygon(
          [
            [x - 0.23, y + 0.15],
            [x - s * 0.02, y - 0.42],
            [x + 0.23, y + 0.15],
          ],
          color,
          true
        );
        polygon(
          [
            [x - 0.12, y + 0.06],
            [x - s * 0.02, y - 0.27],
            [x + 0.12, y + 0.06],
          ],
          '#e5b3ba'
        );
      }
    }
    if (sticker === 'panda')
      for (const s of [-1, 1]) ellipse(s * 0.28, 0.015, 0.19, 0.13, '#25252eaa', s * 0.2);
    ellipse(
      nose.x,
      nose.y,
      sticker === 'bunny' ? 0.1 : 0.15,
      0.1,
      sticker === 'bunny' ? '#d7829c' : '#29242b'
    );
    if (sticker === 'dog') {
      rect(mouth.x - 0.09, mouth.y + 0.02, 0.18, 0.3, [0, 0, 0.09, 0.09], '#e990a1');
      line(
        [
          [mouth.x, mouth.y + 0.08],
          [mouth.x, mouth.y + 0.23],
        ],
        '#ad5062'
      );
    }
    if (['cat', 'fox', 'tiger', 'mouse', 'bunny'].includes(sticker))
      for (const s of [-1, 1])
        for (const dy of [-0.08, 0.03, 0.14])
          line(
            [
              [s * 0.2, nose.y + 0.1],
              [s * 0.6, nose.y + dy],
            ],
            '#383039',
            0.018
          );
    if (sticker === 'tiger')
      for (const s of [-1, 1])
        for (let i = 0; i < 3; i++)
          polygon(
            [
              [s * 0.4, 0.16 + i * 0.1],
              [s * 0.65, 0.08 + i * 0.1],
              [s * 0.63, 0.19 + i * 0.1],
            ],
            '#3c2b24'
          );
  } else if (groups.Eyewear.some(([id]) => id === sticker)) {
    const gold = ['aviators', 'monocle'].includes(sticker);
    ctx.strokeStyle = gold ? '#c49a43' : '#242432';
    ctx.lineWidth = 0.045;
    for (const s of [-1, 1]) {
      if (sticker === 'monocle' && s < 0) continue;
      const x = s * 0.28;
      ctx.strokeStyle = gold ? '#c49a43' : '#242432';
      ctx.lineWidth = 0.045;
      if (sticker === 'heart-glasses') heart(x, 0.015, 0.34, '#ce466dcc');
      else if (sticker === 'star-glasses') star(x, 0.015, 0.28, '#ca9149dd');
      else if (['round-glasses', 'monocle', 'aviators'].includes(sticker)) {
        ellipse(
          x,
          0.03,
          0.23,
          sticker === 'aviators' ? 0.22 : 0.19,
          gold ? '#8b684055' : '#b9d6de55'
        );
        ctx.beginPath();
        ctx.ellipse(x, 0.03, 0.23, sticker === 'aviators' ? 0.22 : 0.19, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else
        rect(
          x - 0.23,
          -0.15,
          0.46,
          0.34,
          0.08,
          sticker === 'goggles' ? '#7abdd0aa' : '#151515bb',
          true
        );
      line(
        [
          [x - 0.11, -0.07],
          [x + 0.02, 0.04],
        ],
        '#ffffffaa',
        0.02
      );
    }
    if (sticker === 'monocle')
      line(
        [
          [0.5, 0.1],
          [0.61, 0.5],
          [0.48, 0.78],
        ],
        '#c49a43'
      );
    else
      line(
        [
          [-0.62, -0.09],
          [-0.51, -0.04],
          [-0.05, -0.04],
          [0, -0.08],
          [0.05, -0.04],
          [0.51, -0.04],
          [0.62, -0.09],
        ],
        gold ? '#c49a43' : '#242432',
        0.04
      );
    if (sticker === 'goggles') {
      line(
        [
          [-0.75, 0],
          [-0.53, 0],
        ],
        '#3b697f',
        0.1
      );
      line(
        [
          [0.53, 0],
          [0.75, 0],
        ],
        '#3b697f',
        0.1
      );
    }
  } else if (groups.Headwear.some(([id]) => id === sticker)) {
    const y = top.y;
    if (sticker === 'hat') {
      rect(-0.55, y - 0.62, 1.1, 0.65, [0.17, 0.17, 0, 0], '#1c1b22', true);
      rect(-0.55, y - 0.12, 1.1, 0.14, 0, '#c2a060');
      ellipse(0, y + 0.025, 0.82, 0.09, '#1c1b22');
    }
    if (sticker === 'cap') {
      ellipse(0, y, 0.66, 0.4, '#497795');
      rect(-0.65, y, 1.3, 0.16, 0.08, '#315a74');
      ellipse(0.35, y + 0.12, 0.65, 0.09, '#315a74');
      line(
        [
          [0, y - 0.35],
          [0, y],
        ],
        '#b8d2dd'
      );
    }
    if (sticker === 'beanie') {
      ellipse(0, y, 0.65, 0.42, '#ad6879');
      rect(-0.67, y - 0.04, 1.34, 0.22, 0.06, '#854c60');
      ellipse(0, y - 0.47, 0.16, 0.16, '#cc91a1');
      for (let x = -0.5; x <= 0.5; x += 0.2)
        line(
          [
            [x, y + 0.01],
            [x, y + 0.15],
          ],
          '#cc91a1',
          0.02
        );
    }
    if (['crown', 'tiara'].includes(sticker)) {
      const tiara = sticker === 'tiara';
      polygon(
        [
          [-0.65, y + 0.04],
          [-0.65, y - 0.4],
          [-0.32, y - 0.15],
          [0, y - 0.6],
          [0.32, y - 0.15],
          [0.65, y - 0.4],
          [0.65, y + 0.04],
        ],
        tiara ? '#b7bed2' : '#edbd4c',
        true
      );
      rect(-0.65, y, 1.3, 0.13, 0.02, tiara ? '#d8ddec' : '#d9a032');
      for (const x of [-0.36, 0, 0.36])
        ellipse(x, y - 0.05, 0.06, 0.08, tiara ? '#a6d4e1' : '#ba596b');
    }
    if (['wizard', 'party'].includes(sticker)) {
      const wizard = sticker === 'wizard';
      polygon(
        [
          [-0.65, y + 0.03],
          [wizard ? -0.15 : 0, y - 0.95],
          [0.65, y + 0.03],
        ],
        wizard ? '#655397' : '#d6818e',
        true
      );
      ellipse(0, y + 0.03, wizard ? 0.83 : 0.68, 0.08, wizard ? '#514077' : '#b45e72');
      for (const [x, dy] of [
        [0, -0.3],
        [-0.1, -0.55],
        [0.22, -0.12],
      ])
        star(x, y + dy, 0.075, wizard ? '#f3d894' : '#f9d78a');
      if (!wizard) ellipse(0, y - 0.95, 0.09, 0.09, '#f9d78a');
    }
    if (sticker === 'halo') {
      ctx.strokeStyle = '#ebc85f';
      ctx.lineWidth = 0.07;
      ctx.beginPath();
      ctx.ellipse(0, y - 0.4, 0.64, 0.14, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (sticker === 'headphones') {
      ctx.strokeStyle = '#393448';
      ctx.lineWidth = 0.1;
      ctx.beginPath();
      ctx.ellipse(0, y + 0.35, 0.74, 0.63, 0, Math.PI, Math.PI * 2);
      ctx.stroke();
      for (const s of [-1, 1]) rect(s * 0.72 - 0.12, -0.03, 0.24, 0.5, 0.1, '#736389');
    }
    if (sticker === 'flowers') {
      line(
        [
          [-0.65, y + 0.04],
          [0, y - 0.15],
          [0.65, y + 0.04],
        ],
        '#5b815d',
        0.06
      );
      [-0.52, -0.26, 0, 0.26, 0.52].forEach((x, i) =>
        flower(x, y - 0.12 + Math.abs(x) * 0.2, 0.18, i % 2 ? '#f0c9d3' : '#c77d96')
      );
    }
  } else {
    if (['moustache', 'beard'].includes(sticker)) {
      if (sticker === 'beard')
        polygon(
          [
            [-0.57, mouth.y - 0.05],
            [-0.45, mouth.y + 0.4],
            [0, mouth.y + 0.67],
            [0.45, mouth.y + 0.4],
            [0.57, mouth.y - 0.05],
            [0, mouth.y + 0.18],
          ],
          '#644738'
        );
      for (const s of [-1, 1])
        ellipse(nose.x + s * 0.17, nose.y + 0.17, 0.24, 0.095, '#382b27', -s * 0.23);
    }
    if (sticker === 'clown') {
      ellipse(nose.x, nose.y, 0.2, 0.18, '#d84b55');
      ellipse(nose.x - 0.06, nose.y - 0.06, 0.045, 0.03, '#fff8');
    }
    if (['blush', 'freckles', 'hearts', 'stars'].includes(sticker))
      for (const s of [-1, 1]) {
        const x = s * 0.43,
          y = nose.y + 0.09;
        if (sticker === 'blush') ellipse(x, y, 0.2, 0.105, '#e78ba080');
        if (sticker === 'hearts') heart(x, y, 0.17, '#d66586');
        if (sticker === 'stars') star(x, y, 0.17, '#d9b650');
        if (sticker === 'freckles')
          for (const [dx, dy] of [
            [-0.08, -0.02],
            [0.01, 0.04],
            [0.08, -0.03],
            [-0.04, 0.08],
          ])
            ellipse(x + dx, y + dy, 0.019, 0.019, '#936342');
      }
    if (sticker === 'sparkles')
      for (const [x, y, r] of [
        [-0.76, -0.05, 0.14],
        [0.8, 0.15, 0.18],
        [-0.55, top.y - 0.25, 0.12],
        [0.43, top.y - 0.35, 0.15],
      ])
        star(x, y, r, '#e7be59', 4);
    if (sticker === 'robot') {
      rect(-0.63, -0.2, 1.26, 0.43, 0.09, '#adb9c5dd');
      for (const s of [-1, 1]) rect(s * 0.29 - 0.19, -0.11, 0.38, 0.23, 0.04, '#568894cc');
      line(
        [
          [0, top.y],
          [0, top.y - 0.32],
        ],
        '#647887',
        0.04
      );
      ellipse(0, top.y - 0.35, 0.07, 0.07, '#dc827b');
      rect(mouth.x - 0.32, mouth.y - 0.03, 0.64, 0.18, 0.03, '#8697a4bb');
      for (const x of [-0.2, -0.1, 0, 0.1, 0.2])
        line(
          [
            [x, mouth.y],
            [x, mouth.y + 0.12],
          ],
          '#344655'
        );
    }
    if (sticker === 'superhero') {
      polygon(
        [
          [-0.67, -0.17],
          [-0.42, -0.26],
          [0, -0.06],
          [0.42, -0.26],
          [0.67, -0.17],
          [0.57, 0.19],
          [0.15, 0.24],
          [0, 0.12],
          [-0.15, 0.24],
          [-0.57, 0.19],
        ],
        '#5578a1dd'
      );
      for (const s of [-1, 1]) ellipse(s * 0.29, 0.02, 0.17, 0.085, '#ffffffaa');
    }
    if (sticker === 'butterfly')
      for (const s of [-1, 1]) {
        ellipse(s * 0.66, 0.02, 0.3, 0.38, '#bb7ba8aa', s * 0.45);
        ellipse(s * 0.65, 0.4, 0.25, 0.25, '#7797beaa', -s * 0.3);
        ellipse(s * 0.65, 0.02, 0.12, 0.19, '#f4d9e5bb', s * 0.45);
        line(
          [
            [s * 0.44, -0.15],
            [s * 0.56, -0.45],
          ],
          '#674869'
        );
      }
  }
  ctx.restore();
}
