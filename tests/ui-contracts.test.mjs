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
  assert.match(html, /<select aria-label="Photo count"/);
  assert.doesNotMatch(html, /template-categories|Pick for me|template-search|type="search"/);
  for (const count of [1, 2, 3, 4, 6, 8, 9])
    assert.match(html, new RegExp('>' + count + ' photos?<'));
  const { default: Tools } = await server.ssrLoadModule(
    '/src/components/templates/TemplateTools.jsx'
  );
  const filtered = render(Tools, { count: 8, counts: [1, 2, 3, 4, 6, 8, 9] });
  assert.match(filtered, /<option value="8" selected="">8 photos/);
  assert.equal((filtered.match(/selected=""/g) || []).length, 1);
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
test('capture grid preserves slot order and has no individual retakes and preserves clip downloads', async () => {
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
  assert.doesNotMatch(html, /Retake clip|thumbnail-retake/);
  assert.match(html, /download="pixbooth-live-1.mp4"/);
  assert.match(html, /Awaiting clip 4/);
  assert.doesNotMatch(html, /<figcaption/);
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
      status: 'ready',
      cameraActive: true,
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
  const camera = page.slice(
    page.indexOf('class="capture-camera"'),
    page.indexOf('<aside class="capture-sidebar"')
  );
  assert.match(camera, /camera-tools capture-tools/);
  assert.match(camera, /camera-tool-stickers/);
  assert.match(camera, /camera-tool-settings/);
  assert.equal((camera.match(/<details /g) || []).length, 2);
  assert.doesNotMatch(page, /<aside class="capture-controls"/);
  assert.doesNotMatch(camera, /sticker-search|type="search"/);
  assert.match(camera, /floating-shutter/);
  assert.match(camera, /camera-stage/);
  assert.doesNotMatch(camera, /capture-toolbar/);
  assert.match(camera, /aria-label="Take photo"/);
  assert.doesNotMatch(camera, /shutter-label|shutter-timer/);
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

test('collapsible camera settings retain mode guards, countdown, mirror and device controls', async () => {
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
  assert.match(html, /<details class="settings-panel"/);
  assert.match(html, /<summary class="tools-heading">Settings/);
  assert.doesNotMatch(html, /<details[^>]* open=/);
  assert.match(html, /aria-label="Camera settings"/);
  assert.match(html, /aria-label="Capture mode"/);
  assert.match(html, /<button[^>]*disabled=""[^>]*>Live/);
  assert.match(html, /Countdown/);
  assert.match(html, /aria-label="Mirror photo"/);
  assert.match(html, /Back camera/);
  const { default: Mode } = await server.ssrLoadModule('/src/components/capture/CaptureMode.jsx');
  const locked = render(Mode, { ...props, templateLocked: true, mp4Supported: true });
  assert.equal((locked.match(/disabled=""/g) || []).length, 2);
});

test('floating shutter preserves cancellation and clears completed live playback', async () => {
  const { default: Preview } = await server.ssrLoadModule(
    '/src/components/capture/CameraPreview.jsx'
  );
  const props = {
    status: 'ready',
    cameraActive: true,
    completed: false,
    video: { current: null },
    overlay: { current: null },
    shots: [],
    countdown: null,
    template,
    retakeIndex: null,
    mode: 'live',
    stickerReady: true,
    delay: 3,
  };
  assert.match(render(Preview, props), /floating-shutter/);
  assert.match(render(Preview, { ...props, countdown: 3 }), /Cancel countdown/);
  assert.match(
    render(Preview, { ...props, status: 'recording', recordProgress: 0.5 }),
    /Cancel recording/
  );
  const finished = render(Preview, { ...props, completed: true, shots: [{ url: 'last.mp4' }] });
  assert.match(finished, /controls="" aria-label="Your last live clip"/);
  assert.doesNotMatch(finished, /floating-shutter/);
  assert.doesNotMatch(
    render(Preview, { ...props, status: 'idle', cameraActive: false }),
    /floating-shutter/
  );
});

test('Sticker discovery exposes every sticker without a category dropdown', async () => {
  const { default: Picker } = await server.ssrLoadModule(
    '/src/components/capture/StickerPicker.jsx'
  );
  const html = render(Picker, { selected: 'none', disabled: false });
  assert.doesNotMatch(html, /<select|sticker-category|Category/);
  assert.equal((html.match(/<button[^>]*aria-label="[^"]* face sticker"/g) || []).length, 49);
  assert.match(html, /Ribbon bow face sticker/);
  assert.match(html, /Moon &amp; stars face sticker/);
  assert.match(html, /Dog face sticker/);
  assert.match(html, /Glasses face sticker/);
  assert.match(html, /None face sticker/);
  assert.doesNotMatch(html, /Clear sticker|sticker-selection/);
});

test('gallery uses uniform media cells for mixed output layouts and live downloads', async () => {
  const { default: Gallery } = await server.ssrLoadModule(
    '/src/components/capture/CapturedGallery.jsx'
  );
  for (const template of templates) {
    const html = render(Gallery, {
      mode: 'photo',
      template,
      shots: [],
      retakeIndex: null,
      busy: false,
    });
    assert.equal((html.match(/class="capture-slot /g) || []).length, template.count);
    assert.doesNotMatch(html, /aspect-ratio|gallery-columns/);
  }
  const html = render(Gallery, {
    mode: 'live',
    template,
    shots: [{ type: 'live', url: 'live.mp4' }],
    retakeIndex: null,
    busy: false,
  });
  assert.match(html, /Download clip 1 as MP4/);
  assert.doesNotMatch(html, /Retake clip|thumbnail-retake/);
});

test('supplied icons retain decorative semantics and tracking errors expose an available retry', async () => {
  const { default: Icon } = await server.ssrLoadModule('/src/components/common/Icon.jsx');
  for (const [name, file] of [
    ['sticker', 'stickers.png'],
    ['camera', 'camera.png'],
    ['settings', 'settings.png'],
  ]) {
    const html = render(Icon, { name, size: 24 });
    assert.match(html, new RegExp('icons/' + file));
    assert.match(html, /alt="" aria-hidden="true"/);
    assert.match(html, /width="24" height="24"/);
  }
  const { default: Panel } = await server.ssrLoadModule(
    '/src/components/capture/FaceStickerPanel.jsx'
  );
  const html = render(Panel, {
    embedded: true,
    sticker: 'none',
    busy: false,
    completed: false,
    cameraActive: true,
    face: {
      engine: 'jeeliz',
      state: 'error',
    },
  });
  assert.match(html, /Retry face tracking/);
  assert.doesNotMatch(html, /Face tracking<|Jeeliz|<select/);
  assert.doesNotMatch(html, /<button[^>]*disabled[^>]*>Retry face tracking/);
});

test('capture review offers one whole-set Redo and countdown accepts exact seconds', async () => {
  const { default: Page } = await server.ssrLoadModule('/src/pages/capture/CapturePage.jsx');
  const html = render(Page, {
    session: {
      template,
      shots: [{ url: 'photo.jpg' }],
      mode: 'photo',
      status: 'review',
      completed: true,
      busy: false,
      sticker: 'none',
      stickerReady: true,
      countdown: null,
      devices: [],
      face: { engine: 'jeeliz', state: 'idle', notice: '' },
      delay: 7,
    },
  });
  assert.match(html, /Redo all photos/);
  assert.doesNotMatch(html, /thumbnail-retake|Cancel retake|Start over/);
  const { default: Settings } = await server.ssrLoadModule(
    '/src/components/capture/PhotoSettings.jsx'
  );
  const settings = render(Settings, {
    embedded: true,
    delay: 7,
    busy: false,
    completed: true,
    devices: [],
  });
  assert.match(settings, /type="number" min="1" max="10" step="1"/);
  assert.match(settings, /Custom/);
  assert.doesNotMatch(
    render(Settings, { embedded: true, delay: 3, busy: false, devices: [] }),
    /type="number"/
  );
  assert.match(settings, /Countdown seconds before each capture/);
  assert.match(settings, /value="7"/);
});
