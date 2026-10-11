import { useEffect, useRef, useState } from 'react';
import { templates } from '../data/templates.js';
import { composePhotos, layoutSize } from '../lib/collage.js';
import { composeLive } from '../lib/media/live-media.js';
export default function useStripEditor({ shots, template, settings, onSettingsChange }) {
  const live = shots[0]?.type === 'live';
  const [background, setBackground] = useState(settings?.background ?? 'black'),
    [layoutId, setLayoutId] = useState(settings?.layoutId ?? template.id),
    [filter, setFilter] = useState(settings?.filter ?? 'normal');
  const [decoration, setDecoration] = useState(settings?.decoration ?? 'none'),
    [caption, setCaption] = useState(settings?.caption ?? 'pixbooth'),
    [playing, setPlaying] = useState(true);
  const [output, setOutput] = useState(null),
    [busy, setBusy] = useState(true),
    [error, setError] = useState(''),
    [retry, setRetry] = useState(0);
  const [exporting, setExporting] = useState(false),
    [progress, setProgress] = useState(0),
    [mp4, setMp4] = useState(null);
  const currentUrl = useRef(null),
    mp4Url = useRef(null),
    abort = useRef(null),
    heading = useRef(null);
  const layout = templates.find((item) => item.id === layoutId),
    available = templates.filter((item) => item.count === shots.length),
    size = layoutSize(layout);
  const options = {
    background,
    filter,
    decoration,
    caption,
  };
  useEffect(() => {
    heading.current?.focus();
  }, []);
  useEffect(() => {
    onSettingsChange({
      background,
      layoutId,
      filter,
      decoration,
      caption,
    });
  }, [background, layoutId, filter, decoration, caption, onSettingsChange]);
  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError('');
    setMp4(null);
    if (mp4Url.current) {
      URL.revokeObjectURL(mp4Url.current);
      mp4Url.current = null;
    }
    const timeout = setTimeout(async () => {
      try {
        const images = live
          ? shots.map((shot) => ({
              url: shot.poster,
            }))
          : shots;
        const result = await composePhotos(images, layout, {
          background,
          filter,
          decoration,
          caption,
        });
        if (cancelled) return;
        const url = URL.createObjectURL(result.blob);
        if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
        currentUrl.current = url;
        setOutput(url);
        setBusy(false);
      } catch {
        if (!cancelled) {
          setBusy(false);
          setError('The strip couldn’t be rendered. Try again to keep your edits.');
        }
      }
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [shots, live, layout, background, filter, decoration, caption, retry]);
  useEffect(
    () => () => {
      abort.current?.abort();
      if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
      if (mp4Url.current) URL.revokeObjectURL(mp4Url.current);
    },
    []
  );
  async function exportVideo() {
    const controller = new AbortController();
    abort.current = controller;
    setExporting(true);
    setProgress(0);
    setError('');
    setPlaying(false);
    try {
      const result = await composeLive(shots, layout, options, {
        signal: controller.signal,
        onProgress: setProgress,
      });
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(result.blob);
      if (mp4Url.current) URL.revokeObjectURL(mp4Url.current);
      mp4Url.current = url;
      setMp4({
        url,
        width: result.width,
        height: result.height,
      });
    } catch (err) {
      if (err.name !== 'AbortError')
        setError(err.message || 'The MP4 couldn’t be created. Try again.');
    } finally {
      if (abort.current === controller) {
        abort.current = null;
        setExporting(false);
        setPlaying(true);
      }
    }
  }
  const filename = `pixbooth-${layout.id}-${background}-${filter}`;
  const previewImage = shots[0].poster || shots[0].url;
  return {
    live,
    background,
    setBackground,
    layoutId,
    setLayoutId,
    filter,
    setFilter,
    decoration,
    setDecoration,
    caption,
    setCaption,
    playing,
    setPlaying,
    output,
    busy,
    error,
    setRetry,
    exporting,
    progress,
    mp4,
    abort,
    heading,
    layout,
    available,
    size,
    options,
    filename,
    previewImage,
    exportVideo,
  };
}
