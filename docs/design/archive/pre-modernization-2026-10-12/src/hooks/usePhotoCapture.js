import { useEffect } from 'react';
import { encodeCanvas } from '../lib/media/live-media.js';
import { drawSticker } from '../lib/stickers/sticker-art.js';
export default function usePhotoCapture({
  video,
  stream,
  requestId,
  recording,
  shotUrls,
  timer,
  shots,
  template,
  mode,
  mirror,
  delay,
  sticker,
  face,
  cancelCountdown,
  releaseCamera,
  setError,
  setStatus,
  setRecordProgress,
  setShots,
  setFlash,
  setCountdown,
}) {
  useEffect(
    () => () => {
      requestId.current++;
      recording.current?.abort();
      clearInterval(timer.current);
      if (stream.current) stream.current.getTracks().forEach((track) => track.stop());
      shotUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    []
  );
  async function captureLive() {
    cancelCountdown();
    const id = requestId.current,
      source = video.current;
    if (!source?.videoWidth || !stream.current?.active) {
      setError('The camera isn’t ready. Enable it and try again.');
      return;
    }
    const controller = new AbortController();
    recording.current = controller;
    setStatus('recording');
    setRecordProgress(0);
    const canvas = document.createElement('canvas'),
      scale = Math.min(1, 960 / source.videoWidth, 720 / source.videoHeight);
    canvas.width = Math.floor((source.videoWidth * scale) / 2) * 2;
    canvas.height = Math.floor((source.videoHeight * scale) / 2) * 2;
    const ctx = canvas.getContext('2d');
    let poster;
    try {
      const blob = await encodeCanvas(
        canvas,
        () => {
          if (!stream.current?.active)
            throw new Error('The camera disconnected during recording. Enable it and try again.');
          ctx.save();
          if (mirror) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
          const result = face.latest.current;
          if (sticker !== 'none' && result && performance.now() - result.timestamp < 600)
            drawSticker(ctx, result.points, canvas.width, canvas.height, sticker);
          ctx.restore();
          if (!poster) poster = canvas.toDataURL('image/jpeg', 0.9);
        },
        {
          signal: controller.signal,
          realtime: true,
          onProgress: setRecordProgress,
        }
      );
      if (id !== requestId.current) return;
      const url = URL.createObjectURL(blob);
      shotUrls.current.push(url);
      const next = [
        ...shots,
        {
          url,
          poster,
          blob,
          type: 'live',
          width: canvas.width,
          height: canvas.height,
        },
      ];
      setShots(next);
      if (next.length === template.count) {
        releaseCamera();
        setStatus('review');
      } else setStatus('ready');
    } catch (err) {
      if (id === requestId.current && err.name !== 'AbortError') {
        setError(err.message || 'Live recording failed. Try again or switch to Photo.');
        setStatus('ready');
      }
    } finally {
      if (recording.current === controller) recording.current = null;
      setRecordProgress(0);
    }
  }
  async function capture() {
    cancelCountdown();
    const id = requestId.current;
    const source = video.current;
    if (!source?.videoWidth || source.readyState < 2 || !stream.current?.active) {
      setError('The camera isn’t ready yet. Wait a moment, then take your photo again.');
      return;
    }
    setStatus('saving');
    let stickerPoints = null;
    if (sticker !== 'none') {
      const deadline = performance.now() + 1500;
      const fresh = () =>
        face.latest.current && performance.now() - face.latest.current.timestamp < 600;
      while (!fresh() && performance.now() < deadline && id === requestId.current) {
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      if (id !== requestId.current) return;
      if (!fresh()) {
        setStatus('ready');
        setError(
          'Face tracking lost your face. Face the camera and try again, or select None under Face stickers.'
        );
        return;
      }
      stickerPoints = face.latest.current.points;
    }
    const canvas = document.createElement('canvas');
    canvas.width = source.videoWidth;
    canvas.height = source.videoHeight;
    const ctx = canvas.getContext('2d');
    if (mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(source, 0, 0);
    if (stickerPoints) drawSticker(ctx, stickerPoints, canvas.width, canvas.height, sticker);
    setFlash(true);
    canvas.toBlob(
      (blob) => {
        if (id !== requestId.current) return;
        setFlash(false);
        if (!blob) {
          setError('The photo couldn’t be saved. Please try again.');
          setStatus('ready');
          return;
        }
        const url = URL.createObjectURL(blob);
        shotUrls.current.push(url);
        const nextShots = [
          ...shots,
          {
            url,
            width: canvas.width,
            height: canvas.height,
          },
        ];
        setShots(nextShots);
        if (nextShots.length < template.count) {
          setStatus('ready');
          return;
        }
        releaseCamera();
        setStatus('review');
      },
      'image/jpeg',
      0.95
    );
  }
  function takePhoto() {
    setError('');
    const take = mode === 'live' ? captureLive : capture;
    if (delay === 0) {
      take();
      return;
    }
    let remaining = delay;
    setCountdown(remaining);
    timer.current = setInterval(() => {
      remaining--;
      if (remaining === 0) take();
      else setCountdown(remaining);
    }, 1000);
  }
  return {
    takePhoto,
  };
}
