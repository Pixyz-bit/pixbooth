import { useEffect, useRef, useState } from 'react';
import { createStickerRenderer } from '../lib/stickers/sticker-renderer.js';
import { startMediaPipeTracking } from '../lib/face/mediapipe-tracker.js';

export function useFaceStickers(video, overlay, enabled, sticker) {
  const latest = useRef(null);
  const selected = useRef(sticker);
  const renderer = useRef(null);
  selected.current = sticker;
  const active = enabled && sticker !== 'none';
  const [trackingState, setState] = useState('off');
  const [rendererMode, setRendererMode] = useState('off');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    latest.current = null;
    const canvas = overlay.current;
    const clear = () => {
      if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    };
    clear();
    if (!active) {
      setState('off');
      setRendererMode('off');
      return;
    }
    let stopped = false,
      raf,
      stopProvider;
    setState('loading');
    setRendererMode('loading');
    const callbacks = {
      onReady() {
        if (!stopped) setState('searching');
      },
      onResult(points) {
        if (stopped) return;
        latest.current = points ? { points, timestamp: performance.now() } : null;
        setState(points ? 'tracking' : 'searching');
      },
      onError(error) {
        if (stopped) return;
        latest.current = null;
        clear();
        setState('error');
        console.warn('[Face tracking] MediaPipe failed:', error?.message || error);
      },
    };
    try {
      stopProvider = startMediaPipeTracking(video.current, callbacks);
    } catch (error) {
      callbacks.onError(error);
    }
    createStickerRenderer({
      onFallback(error) {
        if (stopped) return;
        setRendererMode('canvas2d');
        console.warn('[Sticker renderer] Using Canvas2D:', error?.message || error);
      },
    }).then((created) => {
      if (stopped) {
        created.destroy();
        return;
      }
      renderer.current = created;
      setRendererMode(created.mode);
    });
    function paint(now) {
      if (stopped) return;
      const source = video.current;
      if (source?.readyState >= 2 && canvas) {
        if (canvas.width !== source.videoWidth || canvas.height !== source.videoHeight) {
          canvas.width = source.videoWidth;
          canvas.height = source.videoHeight;
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (latest.current && now - latest.current.timestamp < 600) {
          renderer.current?.drawTo(
            ctx,
            latest.current.points,
            canvas.width,
            canvas.height,
            selected.current
          );
        } else if (latest.current) {
          latest.current = null;
          setState('searching');
        }
      }
      raf = requestAnimationFrame(paint);
    }
    raf = requestAnimationFrame(paint);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      stopProvider?.();
      latest.current = null;
      renderer.current?.destroy();
      renderer.current = null;
      clear();
    };
  }, [active, attempt, video, overlay]);
  return {
    state:
      active && rendererMode === 'loading' && trackingState !== 'error' ? 'loading' : trackingState,
    latest,
    rendererMode,
    draw: (ctx, points, width, height, id) =>
      renderer.current?.drawTo(ctx, points, width, height, id),
    retry: () => setAttempt((value) => value + 1),
  };
}
