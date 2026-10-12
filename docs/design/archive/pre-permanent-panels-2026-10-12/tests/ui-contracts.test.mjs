import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const server = await createServer({
  configLoader: 'runner',
  server: { middlewareMode: true },
  appType: 'custom',
});
after(() => server.close());
const { templates } = await server.ssrLoadModule('/src/data/templates.js');
const template = templates.find((item) => item.id === 'strip-four');
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
test('layout screen shows all cards and selected Continue action', async () => {
  const { default: Page } = await server.ssrLoadModule('/src/pages/templates/TemplatesPage.jsx');
  const html = render(Page, { template, locked: false, captured: 0 });
  assert.equal((html.match(/class="template-choice(?: |")/g) || []).length, 21);
  assert.match(html, /Continue to camera/);
  assert.match(html, /data-filtered="false"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-label="Photo count"/);
  assert.doesNotMatch(html, /<select|Layout category|>Polaroids<|template-search|type="search"/);
  for (const count of [1, 2, 3, 4, 6, 8, 9])
    assert.match(html, new RegExp('>' + count + ' photos?<'));
  const { default: Tools } = await server.ssrLoadModule(
    '/src/components/templates/TemplateTools.jsx'
  );
  const filtered = render(Tools, { count: 8, counts: [1, 2, 3, 4, 6, 8, 9] });
  assert.match(filtered, /aria-pressed="true">8 photos/);
  assert.equal((filtered.match(/aria-pressed="true"/g) || []).length, 1);
});
test('shutter capture gating and cancellation remain explicit', async () => {
  const { default: Actions } = await server.ssrLoadModule(
    '/src/components/capture/CaptureActions.jsx'
  );
  const props = {
    countdown: null,
    status: 'ready',
    completed: false,
    stickerReady: true,
    mode: 'photo',
  };
  assert.doesNotMatch(render(Actions, props), /disabled/);
  assert.match(render(Actions, { ...props, status: 'idle' }), /disabled/);
  assert.match(render(Actions, { ...props, completed: true }), /disabled/);
  assert.match(render(Actions, { ...props, countdown: 3 }), /Cancel countdown/);
  assert.match(render(Actions, { ...props, status: 'recording' }), /Cancel recording/);
});
test('capture grid preserves slot order and has accessible retakes and clip downloads', async () => {
  const { default: Gallery } = await server.ssrLoadModule(
    '/src/components/capture/CapturedGallery.jsx'
  );
  const html = render(Gallery, {
    mode: 'live',
    shots: [{ url: 'clip.mp4', type: 'live', poster: 'cover.jpg' }],
    template,
    busy: false,
    retakeIndex: null,
  });
  assert.equal((html.match(/class="capture-slot /g) || []).length, 4);
  assert.match(html, /Retake clip 1/);
  assert.match(html, /download="pixbooth-live-1.mp4"/);
  assert.match(html, /Awaiting clip 4/);
  assert.match(html, /role="group" aria-label="Captured media in layout order"/);
  const { default: Page } = await server.ssrLoadModule('/src/pages/capture/CapturePage.jsx');
  const page = render(Page, {
    session: {
      mode: 'photo',
      face: { engine: 'jeeliz', state: 'idle', notice: '' },
      devices: [],
      delay: 3,
      mp4Supported: true,
      templateLocked: false,
      template,
      shots: [],
      status: 'idle',
      cameraActive: false,
      sticker: 'none',
      stickerReady: true,
      retakeIndex: null,
      countdown: null,
      video: { current: null },
      overlay: { current: null },
    },
  });
  const sidebar = page.slice(page.indexOf('<aside class="capture-sidebar"'));
  assert.ok(page.indexOf('class="capture-camera"') < page.indexOf('class="capture-sidebar"'));
  assert.match(sidebar, /Captured photos/);
  assert.match(page, /<section class="camera-workspace" aria-label="Camera workspace"/);
  assert.doesNotMatch(sidebar, /aria-label="Take photo"/);
  assert.doesNotMatch(sidebar, /name="capture-tools"/);
  const left = page.slice(
    page.indexOf('<aside class="capture-controls"'),
    page.indexOf('class="capture-camera"')
  );
  assert.match(left, /Stickers/);
  assert.match(left, /Settings/);
  assert.match(left, /name="capture-tools"/);
  assert.match(left, /aria-label="Expand camera tools"/);
  assert.match(left, /aria-expanded="false"/);
  assert.match(left, /class="controls-body"[^>]*hidden=""/);
  assert.doesNotMatch(left, /<details[^>]* open/);
  assert.match(left, /Capture mode/);
  const camera = page.slice(
    page.indexOf('class="capture-camera"'),
    page.indexOf('<aside class="capture-sidebar"')
  );
  assert.match(camera, /capture-toolbar/);
  assert.match(camera, /aria-label="Take photo"/);
  assert.match(camera, /Timer: 3 sec/);
  assert.doesNotMatch(page, /tool-drawer|Strike a pose/);
  assert.match(sidebar, /Continue to customize/);
});
test('camera idle offers activation and connecting state avoids duplicate activation', async () => {
  const { default: Preview } = await server.ssrLoadModule(
    '/src/components/capture/CameraPreview.jsx'
  );
  const props = {
    status: 'idle',
    cameraActive: false,
    completed: false,
    video: { current: null },
    overlay: { current: null },
    shots: [],
    countdown: null,
    template,
    retakeIndex: null,
  };
  assert.match(render(Preview, props), /Enable camera/);
  assert.doesNotMatch(render(Preview, { ...props, status: 'loading' }), /Enable camera/);
  assert.match(render(Preview, { ...props, retakeIndex: 2 }), /Photo 3 of 4/);
});
test('editor shows six tool tabs with one active category', async () => {
  const { default: Options } = await server.ssrLoadModule(
    '/src/components/editor/EditorOptions.jsx'
  );
  const html = render(Options, {
    frame: 'none',
    exporting: false,
    error: '',
    available: [template],
  });
  assert.equal((html.match(/role="tab"/g) || []).length, 6);
  assert.equal((html.match(/aria-selected="true"/g) || []).length, 1);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /Frames/);
});
test('downloads retain JPG/MP4 format and truthful download-request feedback', async () => {
  const { default: Actions } = await server.ssrLoadModule(
    '/src/components/editor/EditorActions.jsx'
  );
  const props = {
    live: false,
    exporting: false,
    busy: false,
    error: '',
    output: 'strip.jpg',
    filename: 'pixbooth',
    size: { width: 972, height: 2889 },
    downloadStatus: 'Download requested. Check your browser downloads.',
  };
  const html = render(Actions, props);
  assert.match(html, /download="pixbooth.jpg"/);
  assert.match(html, /972 × 2889/);
  assert.match(html, /Download requested/);
  const liveHtml = render(Actions, {
    ...props,
    live: true,
    mp4: { url: 'strip.mp4', width: 640, height: 1920 },
  });
  assert.match(liveHtml, /download="pixbooth.mp4"/);
  assert.match(liveHtml, /MP4 · 640 × 1920 px/);
  assert.match(liveHtml, /JPG cover/);
});

test('shared header contains reachable steps between logo and Home with guarded future links', async () => {
  const { default: Steps } = await server.ssrLoadModule('/src/components/layout/WorkflowSteps.jsx');
  const active = render(Steps, { page: 'booth', layoutChosen: true, completed: false });
  const row = active.slice(
    active.indexOf('class="workflow-brand-row"'),
    active.lastIndexOf('</div>')
  );
  assert.match(row, /<nav class="workflow-nav"/);
  assert.ok(row.indexOf('brand-logo') < row.indexOf('<nav'));
  assert.ok(row.indexOf('</nav>') < row.indexOf('workflow-home'));
  assert.ok(active.includes('href="#/booth" aria-current="step"'));
  assert.ok(!active.includes('href="#/edit"'));
  assert.ok(
    render(Steps, { page: 'editor', layoutChosen: true, completed: true }).includes(
      'href="#/edit" aria-current="step"'
    )
  );
});

test('collapsed camera settings retain mode guards, countdown, mirror and device controls', async () => {
  const { default: Settings } = await server.ssrLoadModule(
    '/src/components/capture/PhotoSettings.jsx'
  );
  const props = {
    mode: 'photo',
    busy: false,
    completed: false,
    templateLocked: false,
    mp4Supported: false,
    delay: 3,
    mirror: true,
    status: 'ready',
    deviceId: 'first',
    devices: [
      { deviceId: 'first', label: 'Front camera' },
      { deviceId: 'second', label: 'Back camera' },
    ],
  };
  const html = render(Settings, props);
  assert.doesNotMatch(html, /<details[^>]* open/);
  assert.match(html, /name="capture-tools"/);
  assert.match(html, /aria-label="Capture mode"/);
  assert.match(html, /<button[^>]*disabled=""[^>]*>Live/);
  assert.match(html, /Countdown/);
  assert.match(html, /aria-label="Mirror photo"/);
  assert.match(html, /Back camera/);
  const { default: Mode } = await server.ssrLoadModule('/src/components/capture/CaptureMode.jsx');
  const locked = render(Mode, { ...props, templateLocked: true, mp4Supported: true });
  assert.equal((locked.match(/disabled=""/g) || []).length, 2);
});
