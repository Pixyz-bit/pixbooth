import { layoutSize, paintStrip } from './collage.js';

export const LIVE_SECONDS = 5;
export const LIVE_FPS = 20;
export async function supportsMp4() {
  try { const { canEncodeVideo } = await import('./mp4-codec.js'); return typeof VideoEncoder !== 'undefined' && await canEncodeVideo('avc', { width: 640, height: 480 }); }
  catch { return false; }
}
function check(signal) { if (signal?.aborted) throw new DOMException('Recording cancelled', 'AbortError'); }
function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    check(signal);
    const done = () => { signal?.removeEventListener('abort', abort); resolve(); };
    const timeout = setTimeout(done, Math.max(0, ms));
    const abort = () => { clearTimeout(timeout); reject(new DOMException('Recording cancelled', 'AbortError')); };
    signal?.addEventListener('abort', abort, { once: true });
  });
}

// AVC encoding plus an actual MP4 container; never relabel a WebM as MP4.
export async function encodeCanvas(canvas, draw, { signal, onProgress, realtime = false } = {}) {
  check(signal);
  const { Output, Mp4OutputFormat, BufferTarget, CanvasSource, canEncodeVideo } = await import('./mp4-codec.js');
  if (!await canEncodeVideo('avc', { width: canvas.width, height: canvas.height })) throw new Error('MP4 recording is unavailable in this browser. Try current Chrome, Edge or Safari, or switch to Photo.');
  const output = new Output({ format: new Mp4OutputFormat({ fastStart: 'in-memory' }), target: new BufferTarget() });
  const source = new CanvasSource(canvas, { codec: 'avc', bitrate: 3_000_000 });
  output.addVideoTrack(source, { frameRate: LIVE_FPS });
  try {
    await output.start(); const started = performance.now();
    for (let frame = 0; frame < LIVE_SECONDS * LIVE_FPS; frame++) {
      check(signal);
      if (realtime) await wait(started + frame * 1000 / LIVE_FPS - performance.now(), signal);
      await draw(frame / LIVE_FPS);
      await source.add(frame / LIVE_FPS, 1 / LIVE_FPS, { keyFrame: frame % LIVE_FPS === 0 });
      onProgress?.((frame + 1) / (LIVE_SECONDS * LIVE_FPS));
    }
    if (realtime) await wait(started + LIVE_SECONDS * 1000 - performance.now(), signal);
    check(signal); source.close(); await output.finalize(); check(signal);
    return new Blob([output.target.buffer], { type: 'video/mp4' });
  } catch (error) { await output.cancel().catch(() => {}); throw error; }
}

export async function composeLive(shots, template, options, { signal, onProgress } = {}) {
  const { Input, BlobSource, ALL_FORMATS, CanvasSink } = await import('./mp4-codec.js');
  const size = layoutSize(template), scale = Math.min(1, 1920 / Math.max(size.width, size.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(2, Math.floor(size.width * scale / 2) * 2);
  canvas.height = Math.max(2, Math.floor(size.height * scale / 2) * 2);
  const ctx = canvas.getContext('2d'), inputs = [];
  try {
    const sinks = [];
    for (const shot of shots) {
      check(signal); const input = new Input({ formats: ALL_FORMATS, source: new BlobSource(shot.blob) }); inputs.push(input);
      const track = await input.getPrimaryVideoTrack();
      if (!track || !await track.canDecode()) throw new Error('This browser cannot decode the live clip. Try current Chrome or Edge.');
      sinks.push(new CanvasSink(track, { width: 640, poolSize: 1 }));
    }
    const blob = await encodeCanvas(canvas, async time => {
      check(signal); const frames = await Promise.all(sinks.map(sink => sink.getCanvas(time)));
      if (frames.some(frame => !frame)) throw new Error('A live clip is missing frames. Return to the booth and record it again.');
      ctx.setTransform(canvas.width / size.width, 0, 0, canvas.height / size.height, 0, 0);
      paintStrip(ctx, frames.map(frame => frame.canvas), template, options);
    }, { signal, onProgress });
    return { blob, width: canvas.width, height: canvas.height };
  } finally { inputs.forEach(input => input.dispose()); }
}
