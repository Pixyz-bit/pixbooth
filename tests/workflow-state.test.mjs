import test from 'node:test';
import assert from 'node:assert/strict';
import { templates } from '../src/data/templates.js';
import { filterLayouts, layoutPhotoCounts } from '../src/lib/layout-categories.js';
import { replaceCapturedShot } from '../src/lib/capture-state.js';
import { makeEditHistory, editHistoryReducer } from '../src/lib/edit-history.js';
import { frameRects, layoutSize } from '../src/lib/collage.js';
test('photo-count buttons cover every layout exactly once and preserve all 21 choices', () => {
  assert.equal(templates.length, 21);
  assert.equal(filterLayouts(templates).length, 21);
  const counts = layoutPhotoCounts(templates);
  assert.deepEqual(counts, [1, 2, 3, 4, 6, 8, 9]);
  const filtered = counts.flatMap((count) => filterLayouts(templates, { count }));
  assert.equal(new Set(filtered.map((item) => item.id)).size, 21);
  assert.equal(filtered.length, 21);
});
test('name search combines with exact photo counts, including separate 6, 8 and 9 choices', () => {
  const strips = filterLayouts(templates, { query: 'STRIP', count: 4 });
  assert.equal(strips.length, 1);
  assert.ok(strips.every((item) => item.count === 4 && item.name.toLowerCase().includes('strip')));
  for (const count of [6, 8, 9]) {
    const matches = filterLayouts(templates, { count });
    assert.ok(matches.length > 0);
    assert.ok(matches.every((item) => item.count === count));
  }
  assert.deepEqual(filterLayouts(templates, { query: 'unmatched layout' }), []);
});
test('all 21 accurate layout diagrams retain ordered output geometry', () => {
  for (const template of templates) {
    const size = layoutSize(template),
      rects = frameRects(template);
    assert.equal(rects.length, template.count);
    for (const rect of rects) {
      assert.ok(rect.width > 0 && rect.height > 0);
      assert.ok(
        rect.x >= 0 &&
          rect.y >= 0 &&
          rect.x + rect.width <= size.width &&
          rect.y + rect.height <= size.height
      );
    }
  }
});
test('retaking one moment replaces only its slot and keeps order', () => {
  const shots = [{ url: 'first' }, { url: 'second' }, { url: 'third' }];
  const replacement = { url: 'replacement', type: 'live', blob: 'clip' };
  const updated = replaceCapturedShot(shots, replacement, 1);
  assert.equal(updated.length, 3);
  assert.equal(updated[0], shots[0]);
  assert.equal(updated[1], replacement);
  assert.equal(updated[2], shots[2]);
  assert.equal(shots[1].url, 'second');
});
test('new captures append and invalid retake indexes cannot corrupt a session', () => {
  assert.deepEqual(replaceCapturedShot([], { url: 'first' }), [{ url: 'first' }]);
  assert.throws(() => replaceCapturedShot([{ url: 'first' }], { url: 'other' }, -1), RangeError);
  assert.throws(() => replaceCapturedShot([{ url: 'first' }], { url: 'other' }, 1), RangeError);
});
const initial = {
  layoutId: 'strip-four',
  background: 'black',
  frame: 'none',
  filter: 'normal',
  caption: 'pixbooth',
  decoration: 'none',
};
test('undo and redo restore all edit fields', () => {
  let state = makeEditHistory(initial);
  state = editHistoryReducer(state, { type: 'patch', values: { frame: 'film', caption: 'hello' } });
  state = editHistoryReducer(state, { type: 'patch', values: { filter: 'mono' } });
  state = editHistoryReducer(state, { type: 'undo' });
  assert.equal(state.present.filter, 'normal');
  assert.equal(state.present.caption, 'hello');
  state = editHistoryReducer(state, { type: 'undo' });
  assert.deepEqual(state.present, initial);
  state = editHistoryReducer(state, { type: 'redo' });
  assert.equal(state.present.frame, 'film');
  assert.equal(state.present.caption, 'hello');
});
test('choosing a background is one undoable action including frame removal', () => {
  let state = makeEditHistory({ ...initial, frame: 'film' });
  state = editHistoryReducer(state, {
    type: 'patch',
    values: { frame: 'none', background: 'white' },
  });
  state = editHistoryReducer(state, { type: 'undo' });
  assert.equal(state.present.frame, 'film');
  assert.equal(state.present.background, 'black');
});
test('same edits do not create history and branching clears redo', () => {
  let state = makeEditHistory(initial);
  assert.equal(
    editHistoryReducer(state, { type: 'patch', values: { caption: 'pixbooth' } }),
    state
  );
  state = editHistoryReducer(state, { type: 'patch', values: { caption: 'first' } });
  state = editHistoryReducer(state, { type: 'undo' });
  state = editHistoryReducer(state, { type: 'patch', values: { caption: 'second' } });
  assert.equal(state.future.length, 0);
});
test('history survives category navigation/remount and is bounded', () => {
  let state = makeEditHistory(initial);
  for (let i = 0; i < 80; i++)
    state = editHistoryReducer(state, { type: 'patch', values: { caption: String(i) } });
  assert.equal(state.past.length, 60);
  const restored = makeEditHistory(state.present, { past: state.past, future: state.future });
  assert.deepEqual(editHistoryReducer(restored, { type: 'undo' }).present, state.past.at(-1));
});
