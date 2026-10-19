import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { getSeo, publicPages } from '../src/data/seo.js';

for (const [page, file] of [
  ['home', 'index.html'],
  ['templates', 'templates.html'],
  ['booth', 'booth.html'],
  ['editor', 'edit.html'],
]) {
  const html = await fs.readFile('dist/' + file, 'utf8');
  const seo = getSeo(page);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, file);
  assert.equal((html.match(/<title>/g) || []).length, 1, file);
  assert.ok(html.includes(`href="${seo.url}"`), file);
  assert.ok(html.includes(`<h1`), file);
  assert.ok(html.includes(`name="robots" content="${seo.robots}"`), file);
  if (seo.index) assert.ok(html.includes('application/ld+json'), file);
  else assert.ok(!html.includes('application/ld+json'), file);
  if (page === 'templates')
    assert.equal((html.match(/class="template-choice(?: |")/g) || []).length, 21);
}
const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
for (const page of publicPages) assert.ok(sitemap.includes(`<loc>${getSeo(page).url}</loc>`));
assert.equal((sitemap.match(/<loc>/g) || []).length, publicPages.length);
assert.ok(!sitemap.includes('/booth') && !sitemap.includes('/edit'));
assert.ok((await fs.readFile('dist/robots.txt', 'utf8')).includes('/sitemap.xml'));
assert.ok(
  (await fs.readFile('dist/googleb9e3395b1f8aee5d.html', 'utf8')).includes(
    'google-site-verification'
  )
);
console.log(
  'Verified all route metadata, public HTML, private noindex rules, sitemap and verification file.'
);
