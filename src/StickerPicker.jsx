import { useEffect, useRef, useState } from 'react';
import { stickers, stickerCategories, drawSticker } from './face-stickers.js';

function StickerThumbnail({ id }) {
  const canvas = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, 112, 112);
    ctx.strokeStyle = '#b8b8c1'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(56, 61, 21, 28, 0, 0, Math.PI * 2); ctx.stroke();
    if (id === 'none') { ctx.beginPath(); ctx.moveTo(33, 34); ctx.lineTo(79, 88); ctx.stroke(); return; }
    const points = Array.from({ length: 478 }, () => ({ x: .5, y: .5 }));
    points[33] = { x: .36, y: .48 }; points[263] = { x: .64, y: .48 };
    points[1] = { x: .5, y: .61 }; points[10] = { x: .5, y: .31 }; points[13] = { x: .5, y: .73 };
    drawSticker(ctx, points, 112, 112, id);
  }, [id]);
  return <canvas ref={canvas} width="112" height="112" className="sticker-icon" aria-hidden="true"/>;
}

export default function StickerPicker({ selected, onSelect, disabled }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const options = stickers.filter(item => item.id !== 'none' && (category === 'All' || item.category === category) && item.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="sticker-toolbar">
      <label className="sticker-search">Find a sticker<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search 36 stickers"/></label>
      <label className="sticker-category">Category<select aria-label="Category" value={category} onChange={e => setCategory(e.target.value)}><option>All</option>{stickerCategories.map(name => <option key={name}>{name}</option>)}</select></label>
    </div>
    <div className="sticker-selection"><span>{stickers.find(item => item.id === selected).name}</span><button className="text-button" disabled={disabled || selected === 'none'} onClick={() => onSelect('none')}>Clear sticker</button></div>
    <div className="sticker-browser" tabIndex="0" aria-label="Face sticker collection">
      <div className="sticker-options" role="group" aria-label="Choose a face sticker">{[stickers[0], ...options].map(item => <button key={item.id} className={`sticker-option ${selected === item.id ? 'selected' : ''}`} aria-pressed={selected === item.id} aria-label={`${item.name} face sticker`} disabled={disabled} onClick={() => onSelect(item.id)}><StickerThumbnail id={item.id}/><span>{item.name}</span></button>)}</div>
      {options.length === 0 && <p className="sticker-empty" role="status">No stickers found.<button className="text-button" onClick={() => { setQuery(''); setCategory('All'); }}>Show all stickers</button></p>}
    </div>
  </>;
}
