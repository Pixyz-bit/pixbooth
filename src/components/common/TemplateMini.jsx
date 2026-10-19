import { frameRects, layoutSize } from '../../lib/collage.js';
const samplePhoto = `${import.meta.env.BASE_URL}landing-contact-sheet.webp`;
const wideSamplePhoto = `${import.meta.env.BASE_URL}template-wide-original-couple.png`;

export default function TemplateMini({ template }) {
  const { width, height, padding, footer } = layoutSize(template);
  return (
    <svg className="template-mini" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <rect width={width} height={height} rx="25" fill="currentColor" />
      {frameRects(template).map((frame, i) => (
        <svg key={i} {...frame} viewBox={`0 0 ${frame.width} ${frame.height}`} overflow="hidden">
          <rect width={frame.width} height={frame.height} fill="#eeeeee" />
          {frame.width > frame.height * 1.8 ? (
            <image
              href={wideSamplePhoto}
              width={frame.width}
              height={frame.height}
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <svg
              width={frame.width}
              height={frame.height}
              viewBox={`${i % 2} ${Math.floor((i % 4) / 2)} 1 1`}
              preserveAspectRatio="xMidYMin slice"
              overflow="hidden"
            >
              <image href={samplePhoto} width="2" height="2" />
            </svg>
          )}
        </svg>
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

