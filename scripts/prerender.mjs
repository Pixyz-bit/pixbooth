import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { getSeo, SITE_URL, publicPages } from '../src/data/seo.js';
import { replaceSeoHead } from './seo-html.mjs';

const dist = resolve('dist');
const shell = await fs.readFile(resolve(dist, 'index.html'), 'utf8');
const server = await createServer({
  configLoader: 'runner',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});
try {
  const [
    { default: Landing },
    { default: Templates },
    { default: Steps },
    { default: Footer },
    { templates },
  ] = await Promise.all([
    server.ssrLoadModule('/src/pages/landing/LandingPage.jsx'),
    server.ssrLoadModule('/src/pages/templates/TemplatesPage.jsx'),
    server.ssrLoadModule('/src/components/layout/WorkflowSteps.jsx'),
    server.ssrLoadModule('/src/components/layout/Footer.jsx'),
    server.ssrLoadModule('/src/data/templates.js'),
  ]);
  const el = React.createElement;
  const markup = {
    home: renderToStaticMarkup(el('div', { className: 'app home-app' }, el(Landing), el(Footer))),
    templates: renderToStaticMarkup(
      el(
        'div',
        { className: 'app templates-app' },
        el(Steps, { page: 'templates', layoutChosen: false, completed: false }),
        el(Templates, { template: templates.find((t) => t.id === 'strip-four'), locked: false }),
        el(Footer)
      )
    ),
  };
  for (const [page, file] of [
    ['home', 'index.html'],
    ['templates', 'templates.html'],
    ['booth', 'booth.html'],
    ['editor', 'edit.html'],
  ]) {
    const content =
      markup[page] ||
      `<main><h1>${getSeo(page).title}</h1><p>Start by <a href="/templates">choosing a photo layout</a>. Camera capture and editing require JavaScript and an active browser session.</p></main>`;
    let html = replaceSeoHead(shell, page);
    if (!html.includes('<div id="root"></div>')) throw new Error('Prerender root missing');
    html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    if ((html.match(/rel="canonical"/g) || []).length !== 1)
      throw new Error('Duplicate canonical: ' + file);
    if (!html.includes('<h1')) throw new Error('Missing crawlable content: ' + file);
    await fs.writeFile(resolve(dist, file), html);
  }
  const urls = publicPages.map((page) => `<url><loc>${getSeo(page).url}</loc></url>`).join('\n  ');
  await fs.writeFile(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls}\n</urlset>\n`
  );
  await fs.writeFile(
    resolve(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  );
  console.log('Prerendered home and layouts; generated route metadata, sitemap and robots.txt.');
} finally {
  await server.close();
}
