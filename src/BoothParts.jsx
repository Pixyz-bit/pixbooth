import { layoutSize } from './collage.js';

export function Chevron() {
  return <svg className="settings-chevron" aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 7 5 5 5-5"/></svg>;
}

export function TemplateMini({ template }) {
  const { cols, rows, count } = template;
  const width = cols * 24 + (cols - 1) * 3 + 6;
  const height = rows * 18 + (rows - 1) * 3 + 11;
  return <svg className="template-mini" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
    <rect width={width} height={height} rx="1.5" fill="currentColor"/>
    {Array.from({ length: count }, (_, i) => <rect key={i} x={3 + i % cols * 27} y={3 + Math.floor(i / cols) * 21} width="24" height="18" fill="var(--mini-photo)"/>)}
    <rect x={width / 2 - 4} y={height - 5} width="8" height="1.5" fill="var(--mini-photo)"/>
  </svg>;
}

export function StickerIcon({ name }) {
  return <svg viewBox="0 0 48 48" className="sticker-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'none' && <><circle cx="24" cy="24" r="15"/><path d="m14 14 20 20"/></>}
    {name === 'glasses' && <><rect x="5" y="18" width="16" height="12" rx="4"/><rect x="27" y="18" width="16" height="12" rx="4"/><path d="M21 22q3-3 6 0M2 18l3 3m38 0 3-3m-35 1 4 4m18-4 4 4"/></>}
    {name === 'hat' && <><path d="M13 30V13q0-4 4-4h14q4 0 4 4v17M13 23h22"/><ellipse cx="24" cy="32" rx="20" ry="4"/></>}
    {name === 'dog' && <><path d="M16 14q-8-10-11-2t5 20M32 14q8-10 11-2t-5 20"/><ellipse cx="24" cy="25" rx="6" ry="4"/><path d="M20 35v4a4 4 0 0 0 8 0v-4m-4 1v5"/></>}
  </svg>;
}

export function StripPreview({ shots, template }) {
  const size = layoutSize(template);
  return <div className="preview-stage"><div className="preview-paper" style={{ '--paper-ratio': size.width / size.height,
    '--paper-padding': size.padding / size.width, '--paper-gap': size.gap / size.width,
    '--paper-footer': size.footer / size.height }}>
    <div className="photo-layout" style={{ gridTemplateColumns: `repeat(${template.cols}, 1fr)`, gridTemplateRows: `repeat(${template.rows}, 1fr)` }}>
      {Array.from({ length: template.count }, (_, index) => <div className={`photo-slot ${shots[index] ? 'filled' : ''}`} key={index}>{shots[index] ? <img src={shots[index].url} alt={`Captured photo ${index + 1}`}/> : <span>{index + 1}</span>}</div>)}
    </div><span className="strip-brand">PhotoPix.</span>
  </div></div>;
}
