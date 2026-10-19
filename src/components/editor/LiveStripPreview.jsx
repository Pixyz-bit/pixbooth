import { useEffect, useRef } from 'react';
import { layoutSize, paintStrip } from '../../lib/collage.js';
import useFrameArtwork from '../../hooks/useFrameArtwork.js';
export default function LiveStripPreview({ shots, template, options, playing, artworkRetry = 0 }) {
  const artwork = useFrameArtwork(options.frame, artworkRetry);
  const ref = useRef(null),
    settings = useRef({
      template,
      options,
      playing,
    });
  settings.current = {
    template,
    options,
    playing,
    artwork,
  };
  useEffect(() => {
    let stopped = false,
      raf;
    const videos = shots.map((shot) => {
      const v = document.createElement('video');
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.src = shot.url;
      return v;
    });
    const draw = () => {
      if (stopped) return;
      const current = settings.current,
        size = layoutSize(current.template),
        scale = Math.min(1, 900 / Math.max(size.width, size.height)),
        c = ref.current;
      const width = Math.round(size.width * scale),
        height = Math.round(size.height * scale);
      if (c.width !== width || c.height !== height) {
        c.width = width;
        c.height = height;
      }
      videos.forEach((v) => {
        if (current.playing && v.paused) v.play().catch(() => {});
        else if (!current.playing && !v.paused) v.pause();
      });
      const ctx = c.getContext('2d');
      ctx.setTransform(width / size.width, 0, 0, height / size.height, 0, 0);
      if (current.artwork.ready && videos.every((v) => v.readyState >= 2))
        paintStrip(ctx, videos, current.template, {
          ...current.options,
          frameArtwork: current.artwork.image,
        });
      raf = requestAnimationFrame(draw);
    };
    videos.forEach((v) => v.play().catch(() => {}));
    raf = requestAnimationFrame(draw);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      videos.forEach((v) => {
        v.pause();
        v.removeAttribute('src');
        v.load();
      });
    };
  }, [shots]);
  return (
    <canvas
      ref={ref}
      className="edited-strip live-strip-canvas"
      aria-label="Animated seven-second photo strip preview"
    />
  );
}
