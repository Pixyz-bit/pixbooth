import { frameRects, layoutSize } from '../../lib/collage.js';
export default function TemplateMini({ template }) {
  const { width, height, padding, footer } = layoutSize(template);
  return (
    <svg className="template-mini" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <rect width={width} height={height} rx="25" fill="currentColor" />
      {frameRects(template).map((frame, i) => (
        <rect key={i} {...frame} fill="var(--mini-photo)" />
      ))}
      <rect
        x={width * 0.35}
        y={height - padding - footer * 0.6}
        width={width * 0.3}
        height={footer * 0.15}
        fill="var(--mini-photo)"
      />
    </svg>
  );
}
