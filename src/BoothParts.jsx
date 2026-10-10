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
