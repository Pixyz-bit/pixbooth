import { useEffect, useRef, useState } from 'react';
import { drawSticker } from './face-stickers.js';

export function useFaceStickers(video, overlay, enabled, sticker) {
  const latest = useRef(null);
  const selected = useRef(sticker);
  selected.current = sticker;
  const active = enabled && sticker !== 'none';
  const [state, setState] = useState('off');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    latest.current = null;
    const canvas = overlay.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    if (!active) { setState('off'); return; }
    let stopped = false, ready = false, pending = false, lastFrame = -1, lastTime = 0, raf;
    const worker = new Worker(new URL('./face-worker.js', import.meta.url), { type: 'module' });
    setState('loading');
    const timeout = setTimeout(() => { setState('error'); worker.terminate(); stopped = true; }, 45000);
    function fail() { clearTimeout(timeout); setState('error'); latest.current = null; worker.terminate(); stopped = true;
      if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); }
    worker.onerror = fail;
    worker.onmessage = ({ data }) => {
      if (stopped) return;
      if (data.type === 'ready') { ready = true; clearTimeout(timeout); setState('searching'); }
      else if (data.type === 'error') fail();
      else if (data.type === 'result') {
        pending = false;
        // Freshness starts when inference finishes, not when its input frame was queued.
        latest.current = data.landmarks ? { points: data.landmarks, timestamp: performance.now() } : null;
        setState(data.landmarks ? 'tracking' : 'searching');
      }
    };
    worker.postMessage({ type: 'init', assetBase: new URL(import.meta.env.BASE_URL + 'mediapipe', location.origin).href });
    async function loop(now) {
      if (stopped) return;
      const source = video.current, target = overlay.current;
      if (source?.readyState >= 2 && target) {
        if (target.width !== source.videoWidth || target.height !== source.videoHeight) {
          target.width = source.videoWidth; target.height = source.videoHeight;
        }
        const ctx = target.getContext('2d'); ctx.clearRect(0, 0, target.width, target.height);
        if (latest.current && now - latest.current.timestamp < 600) drawSticker(ctx, latest.current.points, target.width, target.height, selected.current);
        if (ready && !pending && now - lastTime >= 80 && source.currentTime !== lastFrame) {
          pending = true; lastFrame = source.currentTime; lastTime = now;
          try {
            const ratio = Math.min(1, 640 / source.videoWidth);
            const frame = await createImageBitmap(source, { resizeWidth: Math.round(source.videoWidth * ratio), resizeHeight: Math.round(source.videoHeight * ratio) });
            if (stopped) { frame.close(); return; }
            worker.postMessage({ type: 'frame', frame, timestamp: now }, [frame]);
          } catch { fail(); }
        }
      }
      if (!stopped) raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => { stopped = true; clearTimeout(timeout); cancelAnimationFrame(raf); worker.terminate(); latest.current = null;
      if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); };
  }, [active, attempt, video, overlay]);
  return { state, latest, retry: () => setAttempt(value => value + 1) };
}
