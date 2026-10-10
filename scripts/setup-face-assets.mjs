import { mkdir, cp, readFile, writeFile, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const library = dirname(require.resolve('@mediapipe/tasks-vision'));
const target = resolve(root, 'public/mediapipe');
await mkdir(target, { recursive: true });
await cp(resolve(library, 'wasm'), resolve(target, 'wasm'), { recursive: true });
for (const name of ['vision_wasm_internal', 'vision_wasm_nosimd_internal']) {
  const source = await readFile(resolve(target, 'wasm', name + '.js'), 'utf8');
  await writeFile(resolve(target, 'wasm', name + '.mjs'), source + '\nexport default ModuleFactory;\n');
}
const model = resolve(target, 'face_landmarker.task');
try { await access(model); } catch {
  const response = await fetch('https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task');
  if (!response.ok) throw new Error(`Face model download failed (${response.status})`);
  await writeFile(model, Buffer.from(await response.arrayBuffer()));
}
console.log('MediaPipe face model and worker-compatible wasm assets are ready.');
