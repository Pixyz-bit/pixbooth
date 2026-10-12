import { useEffect, useRef, useState } from 'react';
import { drawSticker } from '../lib/stickers/sticker-art.js';
import { startJeelizTracking } from '../lib/face/jeeliz-tracker.js';
import { startMediaPipeTracking } from '../lib/face/mediapipe-tracker.js';

export function useFaceStickers(video, overlay, enabled, sticker) {
  const latest = useRef(null);
  const selected = useRef(sticker);
  selected.current = sticker;
  const active = enabled && sticker !== 'none';
  const [state, setState] = useState('off');
  const [engine, setEngine] = useState('jeeliz');
  const [activeEngine, setActiveEngine] = useState('jeeliz');
  const [notice, setNotice] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    latest.current = null;
    const canvas = overlay.current;
    const clear = () => {
      if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    };
    clear();
    setNotice('');
    if (!active) {
      setState('off');
      return;
    }
    let stopped = false,
      raf,
      stopProvider;
    setState('loading');
    setActiveEngine(engine);
    const callbacks = {
      onReady() {
        if (!stopped) setState('searching');
      },
      onResult(points) {
        if (stopped) return;
        latest.current = points ? { points, timestamp: performance.now() } : null;
        setState(points ? 'tracking' : 'searching');
      },
      onError() {
        if (stopped) return;
        latest.current = null;
        clear();
        setState('error');
      },
    };
    function startMediaPipe() {
      try {
        stopProvider = startMediaPipeTracking(video.current, callbacks);
      } catch {
        callbacks.onError();
      }
    }
    if (engine === 'jeeliz') {
      stopProvider = startJeelizTracking(video.current, {
        ...callbacks,
        onError() {
          if (stopped) return;
          latest.current = null;
          clear();
          setNotice('Jeeliz is unavailable on this device. Using MediaPipe instead.');
          setActiveEngine('mediapipe');
          setState('loading');
          startMediaPipe();
        },
      });
    } else startMediaPipe();
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
          drawSticker(ctx, latest.current.points, canvas.width, canvas.height, selected.current);
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
      clear();
    };
  }, [active, engine, attempt, video, overlay]);
  return {
    state,
    latest,
    engine,
    setEngine,
    activeEngine,
    notice,
    retry: () => setAttempt((value) => value + 1),
  };
}
