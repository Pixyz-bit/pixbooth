import { frameRects, layoutSize } from './collage.js';

export function Chevron() {
  return <svg className="settings-chevron" aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 7 5 5 5-5"/></svg>;
}

export function TemplateMini({ template }) {
  const { width, height, padding, footer } = layoutSize(template);
  return <svg className="template-mini" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
    <rect width={width} height={height} rx="25" fill="currentColor"/>
    {frameRects(template).map((frame,i) => <rect key={i} {...frame} fill="var(--mini-photo)"/>)}
    <rect x={width*.35} y={height-padding-footer*.6} width={width*.3} height={footer*.15} fill="var(--mini-photo)"/>
  </svg>;
}
