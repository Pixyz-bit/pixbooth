import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const source = (
  await fs.readFile(new URL('../src/hooks/useBoothSession.js', import.meta.url), 'utf8')
)
  .replace(/^import .*?;\r?$/gm, '')
  .replace('export default function', 'function');
const factory = new Function(
  'useEffect',
  'useRef',
  'useState',
  'templates',
  'supportsMp4',
  'useFaceStickers',
  'useCamera',
  'usePhotoCapture',
  'useWorkflow',
  source + ';return useBoothSession;'
);
function harness(t) {
  const oldRevoke = URL.revokeObjectURL;
  const revoked = [];
  URL.revokeObjectURL = (url) => revoked.push(url);
  t.after(() => {
    URL.revokeObjectURL = oldRevoke;
  });
  const stored = [];
  let cursor = 0,
    effects = [],
    dirty = false,
    seededShots = false,
    seededUrls = false;
  let camera, current;
  const snapshot = { opens: 0, starts: 0, revoked };
  function useState(initial) {
    const index = cursor++;
    if (!(index in stored)) {
      stored[index] =
        Array.isArray(initial) && !seededShots
          ? ((seededShots = true), [{ url: 'blob:old-1' }, { url: 'blob:old-2' }])
          : initial;
    }
    return [
      stored[index],
      (value) => {
        const next = typeof value === 'function' ? value(stored[index]) : value;
        if (!Object.is(stored[index], next)) {
          stored[index] = next;
          dirty = true;
        }
      },
    ];
  }
  function useRef(initial) {
    const index = cursor++;
    if (!(index in stored))
      stored[index] = {
        current:
          Array.isArray(initial) && !seededUrls
            ? ((seededUrls = true), ['blob:old-1', 'blob:old-2'])
            : initial,
      };
    return stored[index];
  }
  function useEffect(callback, deps) {
    const index = cursor++,
      previous = stored[index];
    if (!previous || deps.some((dep, i) => !Object.is(dep, previous[i]))) effects.push(callback);
    stored[index] = deps;
  }
  const useSession = factory(
    useEffect,
    useRef,
    useState,
    [{ id: 'strip-four', name: 'Classic strip', count: 2 }],
    () => new Promise(() => {}),
    () => ({ state: 'tracking' }),
    (props) => {
      camera = props;
      return {
        releaseCamera: () => {
          props.stream.current = null;
        },
        openCamera: () => {
          snapshot.opens++;
          props.requestId.current++;
          props.cancelCountdown();
          props.setError('');
          props.setStatus('loading');
        },
        stopCamera: () => {
          props.requestId.current++;
          props.cancelCountdown();
          props.setStatus('idle');
        },
      };
    },
    (props) => ({
      takePhoto: () => {
        snapshot.starts++;
        snapshot.shotsAtStart = props.shots;
        props.sequence.current = true;
        props.setAutoCapture(true);
        props.setStatus('saving');
      },
    }),
    () => ({ page: 'booth', setPage: () => {} })
  );
  function flush() {
    for (let pass = 0; pass < 10; pass++) {
      dirty = false;
      cursor = 0;
      effects = [];
      current = useSession();
      for (const effect of effects) effect();
      if (!dirty) return current;
    }
    throw new Error('Session did not settle');
  }
  return {
    snapshot,
    flush,
    ready() {
      camera.setStatus('ready');
    },
    session: flush(),
  };
}

test('Redo clears every capture and editor choice, preserves settings, and waits for the shutter', (t) => {
  const { session, snapshot, flush, ready } = harness(t);
  session.setEditorSettings({ caption: 'Earlier session' });
  session.setDelay(5);
  session.setMirror(false);
  session.setMode('live');
  const before = flush();
  before.redoAll();
  let next = flush();
  assert.deepEqual(next.shots, []);
  assert.equal(next.editorSettings, null);
  assert.equal(next.templateId, before.templateId);
  assert.equal(next.status, 'loading');
  assert.equal(snapshot.starts, 0);
  assert.deepEqual(snapshot.revoked, ['blob:old-1', 'blob:old-2']);
  assert.equal(snapshot.opens, 1);
  next.redoAll();
  assert.equal(snapshot.opens, 1);
  ready();
  next = flush();
  assert.equal(next.status, 'ready');
  assert.equal(next.autoCapture, false);
  assert.equal(next.countdown, null);
  assert.equal(next.delay, 5);
  assert.equal(next.mirror, false);
  assert.equal(next.mode, 'live');
  assert.equal(snapshot.starts, 0);
  flush();
  assert.equal(snapshot.starts, 0);
  next.takePhoto();
  next = flush();
  assert.equal(snapshot.starts, 1);
  assert.deepEqual(snapshot.shotsAtStart, []);
  assert.equal(next.autoCapture, true);
  flush();
  assert.equal(snapshot.starts, 1);
});

test('stopping the camera while Redo reconnects does not start a capture', (t) => {
  const { session, snapshot, flush, ready } = harness(t);
  session.redoAll();
  flush().stopCamera();
  assert.equal(flush().status, 'idle');
  assert.equal(flush().autoCapture, false);
  assert.equal(flush().countdown, null);
  ready();
  flush();
  assert.equal(snapshot.starts, 0);
});
