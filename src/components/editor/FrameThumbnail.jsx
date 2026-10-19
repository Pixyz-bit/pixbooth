import { useEffect, useRef } from 'react';
import { frameRects, layoutSize, paintStrip } from '../../lib/collage.js';
import { framePhotoRect } from '../../lib/frames/frame-art.js';
import useFrameArtwork from '../../hooks/useFrameArtwork.js';

const stencil = { cols: 1, rows: 3, count: 3 };
export default function FrameThumbnail({ frame }) {
  const canvas = useRef(null);
  const artwork = useFrameArtwork(frame.id);
  useEffect(() => {
    if (!artwork.ready) return;
    const size = layoutSize(stencil);
    const ctx = canvas.current.getContext('2d');
    ctx.setTransform(64 / size.width, 0, 0, 150 / size.height, 0, 0);
    paintStrip(ctx, [], stencil, {
      frame: frame.id,
      background: 'white',
      frameArtwork: artwork.image,
      caption: 'mentomory',
    });
    // Empty apertures preview the actual artwork without inventing captured photos.
    frameRects(stencil).forEach((rect) => {
      const opening = framePhotoRect(rect, frame.id);
      ctx.strokeStyle = frame.id === 'film-night' ? '#fff' : '#00000030';
      ctx.lineWidth = 3;
      ctx.strokeRect(opening.x, opening.y, opening.width, opening.height);
    });
  }, [frame.id, artwork.ready, artwork.image]);
  return (
    <span className="frame-thumbnail" aria-hidden="true">
      <canvas ref={canvas} width="64" height="150" />
      {!artwork.ready && <span>{artwork.error ? 'Unavailable' : 'Loading…'}</span>}
    </span>
  );
}
