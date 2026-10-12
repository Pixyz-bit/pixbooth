import test from 'node:test';
import assert from 'node:assert/strict';
import { jeelizFailureNotice } from '../src/lib/face/jeeliz-errors.js';
test('Jeeliz failures report their actual category instead of labeling every device unsupported', () => {
  assert.match(
    jeelizFailureNotice(new Error('GL_INCOMPATIBLE')),
    /Browser graphics support.*GL_INCOMPATIBLE/
  );
  assert.match(jeelizFailureNotice(new Error('Camera frames were unavailable')), /camera frames/);
  assert.match(jeelizFailureNotice(new Error('Jeeliz initialization timed out')), /too long/);
  assert.match(
    jeelizFailureNotice(new Error('Failed to fetch dynamically imported module')),
    /could not load/
  );
  assert.match(jeelizFailureNotice(new Error('custom init failure')), /custom init failure/);
  assert.match(jeelizFailureNotice(undefined), /Unknown initialization error/);
  for (const reason of ['GLCONTEXT_LOST', 'ALREADY_INITIALIZED'])
    assert.match(jeelizFailureNotice(new Error(reason)), /Using MediaPipe instead/);
});
