const groups = {
  Animals: [['dog','Dog'],['cat','Cat'],['bunny','Bunny'],['bear','Bear'],['panda','Panda'],['fox','Fox'],['tiger','Tiger'],['mouse','Mouse']],
  Eyewear: [['glasses','Glasses'],['aviators','Aviators'],['round-glasses','Round glasses'],['heart-glasses','Heart glasses'],['star-glasses','Star glasses'],['goggles','Goggles'],['monocle','Monocle']],
  Headwear: [['hat','Hat'],['cap','Baseball cap'],['beanie','Beanie'],['crown','Crown'],['tiara','Tiara'],['wizard','Wizard hat'],['party','Party hat'],['halo','Halo'],['headphones','Headphones'],['flowers','Flower crown']],
  Fun: [['moustache','Moustache'],['beard','Beard'],['clown','Clown nose'],['blush','Blush'],['freckles','Freckles'],['hearts','Heart cheeks'],['stars','Stars'],['sparkles','Sparkles'],['robot','Robot mask'],['superhero','Superhero mask'],['butterfly','Butterfly wings']],
};
export const stickerCategories = Object.keys(groups);
export const stickers = [{ id: 'none', name: 'None', category: 'All' }, ...Object.entries(groups).flatMap(([category, items]) => items.map(([id,name]) => ({ id,name,category })))];

// Thumbnails, the live overlay and saved photos share source-frame artwork.
export function drawSticker(ctx, landmarks, width, height, sticker) {
  if (!landmarks || sticker === 'none') return;
  const p = i => ({ x: landmarks[i].x * width, y: landmarks[i].y * height });
  const left = p(33), right = p(263), scale = Math.hypot(right.x-left.x,right.y-left.y);
  if (scale < 1) return;
  const angle = Math.atan2(right.y-left.y,right.x-left.x), cx=(left.x+right.x)/2, cy=(left.y+right.y)/2;
  const local = point => ({ x: ((point.x-cx)*Math.cos(angle)+(point.y-cy)*Math.sin(angle))/scale, y: (-(point.x-cx)*Math.sin(angle)+(point.y-cy)*Math.cos(angle))/scale });
  const top=local(p(10)), nose=local(p(1)), mouth=local(p(13));
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle); ctx.scale(scale,scale);
  ctx.lineWidth=.025; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.strokeStyle='#29242b';
  const ellipse=(x,y,rx,ry,color,rotation=0)=>{ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,rotation,0,Math.PI*2);ctx.fill();};
  const polygon=(points,color,stroke=false)=>{ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();if(stroke)ctx.stroke();};
  const line=(points,color='#29242b',thickness=.025)=>{ctx.strokeStyle=color;ctx.lineWidth=thickness;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();};
  const rect=(x,y,w,h,r,color,stroke=false)=>{ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();if(stroke)ctx.stroke();};
  const star=(x,y,r,color,points=5)=>polygon(Array.from({length:points*2},(_,i)=>{const a=-Math.PI/2+i*Math.PI/points,d=i%2?r*.45:r;return[x+Math.cos(a)*d,y+Math.sin(a)*d];}),color);
  const heart=(x,y,r,color)=>{ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y+r*.55);ctx.bezierCurveTo(x-r,y,x-r*.65,y-r*.7,x,y-r*.25);ctx.bezierCurveTo(x+r*.65,y-r*.7,x+r,y,x,y+r*.55);ctx.fill();};
  const flower=(x,y,r,color)=>{for(let i=0;i<5;i++){const a=i*Math.PI*2/5;ellipse(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.4,r*.4,color);}ellipse(x,y,r*.26,r*.26,'#f4c75f');};
  if(groups.Animals.some(([id])=>id===sticker)){
    const color={dog:'#9b6238',cat:'#555566',bunny:'#f2e3e9',bear:'#956a4b',panda:'#25252e',fox:'#d77837',tiger:'#eea344',mouse:'#9994aa'}[sticker];
    for(const s of [-1,1]){const x=s*.65,y=top.y+.02;
      if(['dog','bunny'].includes(sticker)){const tall=sticker==='bunny';ellipse(x,y-(tall?.25:0),tall?.13:.19,tall?.48:.38,color,-s*.2);ellipse(x,y-(tall?.25:-.03),tall?.07:.105,tall?.35:.25,'#e5a4b5',-s*.2);}
      else if(['bear','panda','mouse'].includes(sticker)){ellipse(x,y-.12,sticker==='mouse'?.28:.22,sticker==='mouse'?.28:.22,color);ellipse(x,y-.12,.13,.13,sticker==='panda'?'#dddce4':'#ddb3ac');}
      else{polygon([[x-.23,y+.15],[x-s*.02,y-.42],[x+.23,y+.15]],color,true);polygon([[x-.12,y+.06],[x-s*.02,y-.27],[x+.12,y+.06]],'#e5b3ba');}
    }
    if(sticker==='panda')for(const s of [-1,1])ellipse(s*.28,.015,.19,.13,'#25252eaa',s*.2);
    ellipse(nose.x,nose.y,sticker==='bunny'?.1:.15,.1,sticker==='bunny'?'#d7829c':'#29242b');
    if(sticker==='dog'){rect(mouth.x-.09,mouth.y+.02,.18,.3,[0,0,.09,.09],'#e990a1');line([[mouth.x,mouth.y+.08],[mouth.x,mouth.y+.23]],'#ad5062');}
    if(['cat','fox','tiger','mouse','bunny'].includes(sticker))for(const s of [-1,1])for(const dy of [-.08,.03,.14])line([[s*.2,nose.y+.1],[s*.6,nose.y+dy]],'#383039',.018);
    if(sticker==='tiger')for(const s of [-1,1])for(let i=0;i<3;i++)polygon([[s*.4,.16+i*.1],[s*.65,.08+i*.1],[s*.63,.19+i*.1]],'#3c2b24');
  }else if(groups.Eyewear.some(([id])=>id===sticker)){
    const gold=['aviators','monocle'].includes(sticker);ctx.strokeStyle=gold?'#c49a43':'#242432';ctx.lineWidth=.045;
    for(const s of [-1,1]){if(sticker==='monocle'&&s<0)continue;const x=s*.28;ctx.strokeStyle=gold?'#c49a43':'#242432';ctx.lineWidth=.045;
      if(sticker==='heart-glasses')heart(x,.015,.34,'#ce466dcc');
      else if(sticker==='star-glasses')star(x,.015,.28,'#ca9149dd');
      else if(['round-glasses','monocle','aviators'].includes(sticker)){ellipse(x,.03,.23,sticker==='aviators'?.22:.19,gold?'#8b684055':'#b9d6de55');ctx.beginPath();ctx.ellipse(x,.03,.23,sticker==='aviators'?.22:.19,0,0,Math.PI*2);ctx.stroke();}
      else rect(x-.23,-.15,.46,.34,.08,sticker==='goggles'?'#7abdd0aa':'#151515bb',true);
      line([[x-.11,-.07],[x+.02,.04]],'#ffffffaa',.02);
    }
    if(sticker==='monocle')line([[.5,.1],[.61,.5],[.48,.78]],'#c49a43');
    else line([[-.62,-.09],[-.51,-.04],[-.05,-.04],[0,-.08],[.05,-.04],[.51,-.04],[.62,-.09]],gold?'#c49a43':'#242432',.04);
    if(sticker==='goggles'){line([[-.75,0],[-.53,0]],'#3b697f',.1);line([[.53,0],[.75,0]],'#3b697f',.1);}
  }else if(groups.Headwear.some(([id])=>id===sticker)){
    const y=top.y;
    if(sticker==='hat'){rect(-.55,y-.62,1.1,.65,[.17,.17,0,0],'#1c1b22',true);rect(-.55,y-.12,1.1,.14,0,'#c2a060');ellipse(0,y+.025,.82,.09,'#1c1b22');}
    if(sticker==='cap'){ellipse(0,y,.66,.4,'#497795');rect(-.65,y,1.3,.16,.08,'#315a74');ellipse(.35,y+.12,.65,.09,'#315a74');line([[0,y-.35],[0,y]],'#b8d2dd');}
    if(sticker==='beanie'){ellipse(0,y,.65,.42,'#ad6879');rect(-.67,y-.04,1.34,.22,.06,'#854c60');ellipse(0,y-.47,.16,.16,'#cc91a1');for(let x=-.5;x<=.5;x+=.2)line([[x,y+.01],[x,y+.15]],'#cc91a1',.02);}
    if(['crown','tiara'].includes(sticker)){const tiara=sticker==='tiara';polygon([[-.65,y+.04],[-.65,y-.4],[-.32,y-.15],[0,y-.6],[.32,y-.15],[.65,y-.4],[.65,y+.04]],tiara?'#b7bed2':'#edbd4c',true);rect(-.65,y,1.3,.13,.02,tiara?'#d8ddec':'#d9a032');for(const x of [-.36,0,.36])ellipse(x,y-.05,.06,.08,tiara?'#a6d4e1':'#ba596b');}
    if(['wizard','party'].includes(sticker)){const wizard=sticker==='wizard';polygon([[-.65,y+.03],[wizard?-.15:0,y-.95],[.65,y+.03]],wizard?'#655397':'#d6818e',true);ellipse(0,y+.03,wizard?.83:.68,.08,wizard?'#514077':'#b45e72');for(const[x,dy]of[[0,-.3],[-.1,-.55],[.22,-.12]])star(x,y+dy,.075,wizard?'#f3d894':'#f9d78a');if(!wizard)ellipse(0,y-.95,.09,.09,'#f9d78a');}
    if(sticker==='halo'){ctx.strokeStyle='#ebc85f';ctx.lineWidth=.07;ctx.beginPath();ctx.ellipse(0,y-.4,.64,.14,0,0,Math.PI*2);ctx.stroke();}
    if(sticker==='headphones'){ctx.strokeStyle='#393448';ctx.lineWidth=.1;ctx.beginPath();ctx.ellipse(0,y+.35,.74,.63,0,Math.PI,Math.PI*2);ctx.stroke();for(const s of [-1,1])rect(s*.72-.12,-.03,.24,.5,.1,'#736389');}
    if(sticker==='flowers'){line([[-.65,y+.04],[0,y-.15],[.65,y+.04]],'#5b815d',.06);[-.52,-.26,0,.26,.52].forEach((x,i)=>flower(x,y-.12+Math.abs(x)*.2,.18,i%2?'#f0c9d3':'#c77d96'));}
  }else{
    if(['moustache','beard'].includes(sticker)){if(sticker==='beard')polygon([[-.57,mouth.y-.05],[-.45,mouth.y+.4],[0,mouth.y+.67],[.45,mouth.y+.4],[.57,mouth.y-.05],[0,mouth.y+.18]],'#644738');for(const s of [-1,1])ellipse(nose.x+s*.17,nose.y+.17,.24,.095,'#382b27',-s*.23);}
    if(sticker==='clown'){ellipse(nose.x,nose.y,.2,.18,'#d84b55');ellipse(nose.x-.06,nose.y-.06,.045,.03,'#fff8');}
    if(['blush','freckles','hearts','stars'].includes(sticker))for(const s of [-1,1]){const x=s*.43,y=nose.y+.09;if(sticker==='blush')ellipse(x,y,.2,.105,'#e78ba080');if(sticker==='hearts')heart(x,y,.17,'#d66586');if(sticker==='stars')star(x,y,.17,'#d9b650');if(sticker==='freckles')for(const[dx,dy]of[[-.08,-.02],[.01,.04],[.08,-.03],[-.04,.08]])ellipse(x+dx,y+dy,.019,.019,'#936342');}
    if(sticker==='sparkles')for(const[x,y,r]of[[-.76,-.05,.14],[.8,.15,.18],[-.55,top.y-.25,.12],[.43,top.y-.35,.15]])star(x,y,r,'#e7be59',4);
    if(sticker==='robot'){rect(-.63,-.2,1.26,.43,.09,'#adb9c5dd');for(const s of [-1,1])rect(s*.29-.19,-.11,.38,.23,.04,'#568894cc');line([[0,top.y],[0,top.y-.32]],'#647887',.04);ellipse(0,top.y-.35,.07,.07,'#dc827b');rect(mouth.x-.32,mouth.y-.03,.64,.18,.03,'#8697a4bb');for(const x of [-.2,-.1,0,.1,.2])line([[x,mouth.y],[x,mouth.y+.12]],'#344655');}
    if(sticker==='superhero'){polygon([[-.67,-.17],[-.42,-.26],[0,-.06],[.42,-.26],[.67,-.17],[.57,.19],[.15,.24],[0,.12],[-.15,.24],[-.57,.19]],'#5578a1dd');for(const s of [-1,1])ellipse(s*.29,.02,.17,.085,'#ffffffaa');}
    if(sticker==='butterfly')for(const s of [-1,1]){ellipse(s*.66,.02,.3,.38,'#bb7ba8aa',s*.45);ellipse(s*.65,.4,.25,.25,'#7797beaa',-s*.3);ellipse(s*.65,.02,.12,.19,'#f4d9e5bb',s*.45);line([[s*.44,-.15],[s*.56,-.45]],'#674869');}
  }
  ctx.restore();
}
