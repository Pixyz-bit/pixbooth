import { getSeo, getStructuredData, seoMetaTags } from '../src/data/seo.js';

const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export function renderSeoHead(page) {
  const seo = getSeo(page);
  const data = getStructuredData(page);
  return [
    `<title>${escape(seo.title)}</title>`,
    `<link rel="canonical" href="${escape(seo.url)}" />`,
    ...seoMetaTags(page).map(
      ([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escape(value)}" />`
    ),
    ...(data
      ? [
          `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`,
        ]
      : []),
  ].join('\n    ');
}

export function replaceSeoHead(html, page) {
  if (!html.includes('<!-- seo:start -->') || !html.includes('<!-- seo:end -->'))
    throw new Error('SEO markers missing from index.html');
  return html.replace(
    /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
    `<!-- seo:start -->\n    ${renderSeoHead(page)}\n    <!-- seo:end -->`
  );
}
