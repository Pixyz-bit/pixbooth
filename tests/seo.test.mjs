import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeo, getStructuredData, publicPages, SITE_URL } from '../src/data/seo.js';
import { replaceSeoHead } from '../scripts/seo-html.mjs';

test('public pages have distinct self-canonicals and discoverable metadata', () => {
  const titles = new Set();
  for (const page of publicPages) {
    const seo = getSeo(page);
    const html = replaceSeoHead('<head><!-- seo:start --><!-- seo:end --></head>', page);
    titles.add(seo.title);
    assert.equal(seo.index, true);
    assert.ok(seo.url.startsWith(SITE_URL));
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`href="${seo.url}"`));
    assert.match(html, /content="index, follow/);
    assert.ok(html.includes('property="og:url" content="' + seo.url));
    const json = html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1];
    const data = JSON.parse(json);
    assert.ok(
      data['@graph'].some((entry) => entry['@type'] === 'WebSite' && entry.name === 'Mentomory')
    );
  }
  assert.equal(titles.size, publicPages.length);
});

test('capture and edit sessions are noindex and excluded from the public sitemap set', () => {
  for (const page of ['booth', 'editor']) {
    assert.equal(getSeo(page).index, false);
    assert.equal(getStructuredData(page), null);
    const html = replaceSeoHead('<head><!-- seo:start --><!-- seo:end --></head>', page);
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert.doesNotMatch(html, /application\/ld\+json/);
    assert.ok(!publicPages.includes(page));
  }
});

test('SEO build fails rather than silently generating missing or duplicated metadata', () => {
  assert.throws(() => replaceSeoHead('<head></head>', 'home'), /markers missing/);
  const initial = '<head><!-- seo:start --><title>Old</title><!-- seo:end --></head>';
  const updated = replaceSeoHead(replaceSeoHead(initial, 'home'), 'templates');
  assert.equal((updated.match(/<title>/g) || []).length, 1);
  assert.equal((updated.match(/rel="canonical"/g) || []).length, 1);
  assert.doesNotMatch(updated, /<title>Old/);
});
