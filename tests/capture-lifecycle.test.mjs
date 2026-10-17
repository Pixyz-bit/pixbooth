import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { replaceCapturedShot } from '../src/lib/capture-state.js';
const source = (
  await fs.readFile(new URL('../src/hooks/usePhotoCapture.js', import.meta.url), 'utf8')
)
  .replace(/^import .*?;\r?$/gm, '')
  .replace('export default function', 'function');
const factory = new Function(
  'useEffect',
  'useRef',
  'encodeCanvas',
  'drawSticker',
  'replaceCapturedShot',
  'posthogEnabled',
  'posthog',
  'logPosthogInfo',
  source + ';return usePhotoCapture;'
);
function harness(
  t,
  {
    shots = [],
    retakeIndex = null,
    mode = 'photo',
    delay = 0,
    count = 1,
    sticker = 'none',
    faceDraw,
  } = {}
) {
  const snapshot = {
    creates: 0,
    draws: 0,
    revoked: [],
    cleanups: [],
    statuses: [],
    abort: 0,
    stops: 0,
    interval: null,
    clears: 0,
  };
  const previous = {
    document: globalThis.document,
    create: URL.createObjectURL,
    revoke: URL.revokeObjectURL,
    setInterval: globalThis.setInterval,
    clearInterval: globalThis.clearInterval,
  };
  URL.createObjectURL = () => 'blob:new-' + snapshot.creates++;
  URL.revokeObjectURL = (url) => snapshot.revoked.push(url);
  globalThis.setInterval = (callback) => {
    snapshot.interval = callback;
    return 123;
  };
  globalThis.clearInterval = () => snapshot.clears++;
  const context = new Proxy(
    {},
    {
      get: () => () => {
        snapshot.draws++;
      },
    }
  );
  const canvases = [];
  globalThis.document = {
    createElement() {
      const canvas = {
        width: 0,
        height: 0,
        getContext: () => context,
        toDataURL: () => 'data:image/jpeg;base64,poster',
        toBlob: (callback) => {
          canvas.blobCallback = callback;
        },
      };
      canvases.push(canvas);
      return canvas;
    },
  };
  t.after(() => {
    URL.createObjectURL = previous.create;
    URL.revokeObjectURL = previous.revoke;
    globalThis.setInterval = previous.setInterval;
    globalThis.clearInterval = previous.clearInterval;
    if (previous.document === undefined) delete globalThis.document;
    else globalThis.document = previous.document;
  });
  const props = {
    video: { current: { videoWidth: 640, videoHeight: 480, readyState: 2 } },
    stream: {
      current: {
        active: true,
        getTracks: () => [
          {
            stop() {
              snapshot.stops++;
            },
          },
        ],
      },
    },
    requestId: { current: 0 },
    recording: { current: null },
    shotUrls: { current: shots.map((shot) => shot.url) },
    timer: { current: null },
    shots,
    sequence: { current: false },
    setAutoCapture: (value) => (snapshot.autoCapture = value),
    template: { count },
    mode,
    mirror: true,
    delay,
    sticker,
    face: {
      draw: faceDraw,
      latest: { current: sticker === 'none' ? null : { points: {}, timestamp: performance.now() } },
    },
    retakeIndex,
    setRetakeIndex: (value) => (snapshot.retakeIndex = value),
    status: 'ready',
    countdown: null,
    completed: false,
    cancelCountdown() {
      clearInterval(props.timer.current);
      props.timer.current = null;
    },
    releaseCamera() {
      snapshot.stops++;
    },
    setError: (value) => (snapshot.error = value),
    setStatus: (value) => snapshot.statuses.push(value),
    setRecordProgress: (value) => (snapshot.progress = value),
    setShots: (value) => (snapshot.shots = value),
    setFlash: (value) => (snapshot.flash = value),
    setCountdown: (value) => (snapshot.countdown = value),
  };
  const useEffect = (callback) => {
    const cleanup = callback();
    if (cleanup) snapshot.cleanups.push(cleanup);
  };
  const encode = async (canvas, draw) => {
    await draw(0);
    return new Blob(['video'], { type: 'video/mp4' });
  };
  const refs = [];
  let refIndex = 0;
  const useCapture = factory(
    useEffect,
    (value) => {
      const index = refIndex++;
      if (!refs[index]) refs[index] = { current: value };
      return refs[index];
    },
    encode,
    () => {},
    replaceCapturedShot,
    false,
    { capture() {} },
    () => {}
  );
  const render = () => {
    refIndex = 0;
    return useCapture({
      ...props,
      shots: snapshot.shots ?? props.shots,
      status: snapshot.statuses.at(-1) ?? props.status,
      countdown: snapshot.countdown ?? null,
      completed: retakeIndex === null && (snapshot.shots ?? props.shots).length === count,
    });
  };
  return { api: render(), render, props, snapshot, canvases };
}
test('rapid duplicate photo clicks produce one capture and completed session', (t) => {
  const { api, snapshot, canvases } = harness(t);
  api.takePhoto();
  api.takePhoto();
  assert.equal(canvases.length, 1);
  canvases[0].blobCallback(new Blob(['photo'], { type: 'image/jpeg' }));
  assert.equal(snapshot.shots.length, 1);
  assert.equal(snapshot.statuses.at(-1), 'review');
  assert.equal(snapshot.stops, 1);
});
test('photo replacement preserves other captures and releases replaced URL only after success', (t) => {
  const shots = [{ url: 'blob:first' }, { url: 'blob:second' }];
  const { api, snapshot, canvases, props } = harness(t, { shots, retakeIndex: 0, count: 2 });
  api.takePhoto();
  assert.deepEqual(snapshot.revoked, []);
  assert.equal(shots[0].url, 'blob:first');
  canvases[0].blobCallback(new Blob(['photo'], { type: 'image/jpeg' }));
  assert.equal(snapshot.shots.length, 2);
  assert.equal(snapshot.shots[1], shots[1]);
  assert.deepEqual(snapshot.revoked, ['blob:first']);
  assert.equal(snapshot.retakeIndex, null);
  assert.ok(props.shotUrls.current.includes('blob:second'));
  assert.ok(!props.shotUrls.current.includes('blob:first'));
});
test('live replacement retains clip type, poster, dimensions and slot count', async (t) => {
  const shots = [{ url: 'blob:first', type: 'live' }];
  const { api, snapshot } = harness(t, { shots, retakeIndex: 0, mode: 'live', count: 1 });
  api.takePhoto();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(snapshot.shots.length, 1);
  assert.equal(snapshot.shots[0].type, 'live');
  assert.match(snapshot.shots[0].poster, /data:image/);
  assert.equal(snapshot.shots[0].width, 640);
  assert.equal(snapshot.shots[0].height, 480);
  assert.deepEqual(snapshot.revoked, ['blob:first']);
});
test('countdown advances exactly once while duplicate capture clicks are blocked', (t) => {
  const { api, snapshot, canvases } = harness(t, { delay: 3 });
  api.takePhoto();
  api.takePhoto();
  assert.equal(snapshot.countdown, 3);
  assert.equal(canvases.length, 0);
  snapshot.interval();
  assert.equal(snapshot.countdown, 2);
  snapshot.interval();
  assert.equal(snapshot.countdown, 1);
  snapshot.interval();
  assert.equal(canvases.length, 1);
  canvases[0].blobCallback(new Blob(['photo']));
  assert.equal(snapshot.shots.length, 1);
});
test('unmount cancels recording/timer, stops tracks and revokes owned capture URLs', (t) => {
  const { props, snapshot } = harness(t, {
    shots: [{ url: 'blob:first' }, { url: 'blob:second' }],
  });
  props.recording.current = {
    abort() {
      snapshot.abort++;
    },
  };
  snapshot.cleanups[0]();
  assert.equal(snapshot.abort, 1);
  assert.equal(snapshot.stops, 1);
  assert.equal(props.requestId.current, 1);
  assert.deepEqual(snapshot.revoked, ['blob:first', 'blob:second']);
  assert.ok(snapshot.clears > 0);
});

test('one shutter click captures the entire set with a fresh countdown before every photo', (t) => {
  const { api, snapshot, canvases } = harness(t, { count: 4, delay: 3 });
  api.takePhoto();
  for (let index = 0; index < 4; index++) {
    assert.equal(snapshot.countdown, 3);
    assert.equal(canvases.length, index);
    api.takePhoto();
    snapshot.interval();
    assert.equal(snapshot.countdown, 2);
    snapshot.interval();
    assert.equal(snapshot.countdown, 1);
    snapshot.interval();
    assert.equal(canvases.length, index + 1);
    canvases[index].blobCallback(new Blob(['photo']));
    assert.equal(snapshot.shots.length, index + 1);
    assert.equal(snapshot.stops, index === 3 ? 1 : 0);
  }
  assert.equal(snapshot.autoCapture, false);
  assert.equal(snapshot.countdown, null);
  assert.equal(snapshot.statuses.at(-1), 'review');
});

test('cancelling the remaining sequence keeps captures and rejects a queued timer tick', (t) => {
  const { api, props, snapshot, canvases } = harness(t, { count: 4, delay: 3 });
  api.takePhoto();
  for (let tick = 0; tick < 3; tick++) snapshot.interval();
  canvases[0].blobCallback(new Blob(['photo']));
  const queuedTick = snapshot.interval;
  props.sequence.current = false;
  props.cancelCountdown();
  queuedTick();
  assert.equal(snapshot.shots.length, 1);
  assert.equal(canvases.length, 1);
  assert.equal(snapshot.countdown, null);
  assert.deepEqual(snapshot.revoked, []);
});

test('failed photo saving stops automatic capture and preserves earlier photos', (t) => {
  const { api, props, snapshot, canvases } = harness(t, { count: 3, delay: 3 });
  api.takePhoto();
  for (let tick = 0; tick < 3; tick++) snapshot.interval();
  canvases[0].blobCallback(new Blob(['photo']));
  for (let tick = 0; tick < 3; tick++) snapshot.interval();
  canvases[1].blobCallback(null);
  assert.equal(canvases.length, 2);
  assert.equal(snapshot.shots.length, 1);
  assert.equal(props.sequence.current, false);
  assert.equal(snapshot.autoCapture, false);
  assert.match(snapshot.error, /be saved/);
});

test('camera stop during saving cannot append or restart the sequence', (t) => {
  const { api, props, snapshot, canvases } = harness(t, { count: 3 });
  api.takePhoto();
  props.requestId.current++;
  props.sequence.current = false;
  canvases[0].blobCallback(new Blob(['photo']));
  assert.equal(snapshot.creates, 0);
  assert.equal(canvases.length, 1);
});

test('live mode records each clip serially and stops at the required count', async (t) => {
  const { api, snapshot } = harness(t, { mode: 'live', count: 3, delay: 3 });
  api.takePhoto();
  for (let index = 0; index < 3; index++) {
    assert.equal(snapshot.countdown, 3);
    for (let tick = 0; tick < 3; tick++) snapshot.interval();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(snapshot.shots.length, index + 1);
  }
  assert.equal(snapshot.shots.length, 3);
  assert.ok(snapshot.shots.every((shot) => shot.type === 'live' && shot.poster));
  assert.equal(snapshot.stops, 1);
  assert.equal(snapshot.autoCapture, false);
});

test('photo and live capture use the shared sticker renderer before saving media', async (t) => {
  for (const mode of ['photo', 'live']) {
    const calls = [];
    const { api, snapshot, canvases } = harness(t, {
      mode,
      sticker: 'dog',
      faceDraw: (ctx, points, width, height, id) => calls.push({ width, height, id }),
    });
    api.takePhoto();
    if (mode === 'photo') canvases[0].blobCallback(new Blob(['photo']));
    else await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(calls, [{ width: 640, height: 480, id: 'dog' }]);
    assert.equal(snapshot.shots.length, 1);
  }
});

test('Countdown Off takes one photo per press and keeps the camera ready until the final slot', (t) => {
  const { render, props, snapshot, canvases } = harness(t, { count: 4, delay: 0 });
  for (let index = 0; index < 4; index++) {
    const api = render();
    api.takePhoto();
    api.takePhoto();
    assert.equal(canvases.length, index + 1, 'Ignore another press during saving');
    canvases[index].blobCallback(new Blob(['photo']));
    assert.equal(canvases.length, index + 1, 'Do not automatically start the next photo');
    assert.equal(snapshot.shots.length, index + 1);
    assert.equal(props.sequence.current, false);
    assert.equal(snapshot.autoCapture, false);
    assert.equal(snapshot.countdown, null);
    assert.equal(snapshot.interval, null);
    assert.equal(snapshot.stops, index === 3 ? 1 : 0);
    assert.equal(snapshot.statuses.at(-1), index === 3 ? 'review' : 'ready');
  }
  render().takePhoto();
  assert.equal(canvases.length, 4, 'Completed sessions cannot capture again');
});

test('Countdown Off records one live clip per press', async (t) => {
  const { render, snapshot } = harness(t, { mode: 'live', count: 3, delay: 0 });
  for (let index = 0; index < 3; index++) {
    const api = render();
    api.takePhoto();
    api.takePhoto();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(snapshot.shots.length, index + 1);
    assert.equal(snapshot.autoCapture, false);
    assert.equal(snapshot.stops, index === 2 ? 1 : 0);
  }
});

test('five-second countdown still fills the layout automatically', (t) => {
  const { api, snapshot, canvases } = harness(t, { count: 2, delay: 5 });
  api.takePhoto();
  for (let index = 0; index < 2; index++) {
    assert.equal(snapshot.countdown, 5);
    for (let tick = 0; tick < 5; tick++) snapshot.interval();
    canvases[index].blobCallback(new Blob(['photo']));
    assert.equal(snapshot.shots.length, index + 1);
  }
  assert.equal(snapshot.statuses.at(-1), 'review');
  assert.equal(snapshot.autoCapture, false);
});
