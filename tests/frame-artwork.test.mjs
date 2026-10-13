import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const source = (
  await fs.readFile(new URL('../src/hooks/useFrameArtwork.js', import.meta.url), 'utf8')
)
  .replace(/^import .*?;\r?$/gm, '')
  .replace('export default function', 'function');
const factory = new Function(
  'useEffect',
  'useState',
  'loadFrameArtwork',
  source + ';return useFrameArtwork;'
);
function harness() {
  const stored = [],
    loads = [];
  let cursor = 0,
    effects = [];
  const hook = factory(
    (callback, deps) => {
      const index = cursor++,
        previous = stored[index];
      if (!previous || deps.some((value, i) => !Object.is(value, previous.deps[i]))) {
        previous?.cleanup?.();
        const entry = { deps };
        stored[index] = entry;
        effects.push(() => {
          entry.cleanup = callback();
        });
      }
    },
    (initial) => {
      const index = cursor++;
      if (!(index in stored)) stored[index] = initial;
      return [
        stored[index],
        (value) => {
          stored[index] = value;
        },
      ];
    },
    (id) =>
      new Promise((resolve, reject) => {
        loads.push({ id, resolve, reject });
      })
  );
  return {
    loads,
    render(id, retry = 0) {
      cursor = 0;
      effects = [];
      const result = hook(id, retry);
      for (const effect of effects) effect();
      return result;
    },
  };
}
test('Retry reloads failed artwork for the same selected frame', async () => {
  const { loads, render } = harness();
  assert.equal(render('daisy-diary').ready, false);
  loads[0].reject(new Error('Temporary artwork failure'));
  await Promise.resolve();
  assert.equal(render('daisy-diary').error, 'Temporary artwork failure');
  render('daisy-diary', 1);
  assert.equal(loads.length, 2);
  const image = { width: 1024, height: 1024 };
  loads[1].resolve(image);
  await Promise.resolve();
  const recovered = render('daisy-diary', 1);
  assert.equal(recovered.ready, true);
  assert.equal(recovered.image, image);
  assert.equal(recovered.error, '');
});
test('Late artwork from a previous frame cannot overwrite the current selection', async () => {
  const { loads, render } = harness();
  render('daisy-diary');
  render('berry-picnic');
  const currentImage = { frame: 'berry-picnic' };
  loads[1].resolve(currentImage);
  await Promise.resolve();
  loads[0].resolve({ frame: 'daisy-diary' });
  await Promise.resolve();
  assert.equal(render('berry-picnic').image, currentImage);
});
