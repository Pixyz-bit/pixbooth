import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import '../src/styles/index.css';
import EditorPage from '../src/pages/editor/EditorPage.jsx';
import CapturePage from '../src/pages/capture/CapturePage.jsx';
import TemplatesPage from '../src/pages/templates/TemplatesPage.jsx';
import WorkflowSteps from '../src/components/layout/WorkflowSteps.jsx';
import Footer from '../src/components/layout/Footer.jsx';
import { templates } from '../src/data/templates.js';

const image = new Image();
image.src = '/landing-contact-sheet.webp';
await image.decode();
const samples = Array.from({ length: 4 }, (_, index) => {
  const canvas = document.createElement('canvas');
  canvas.width = 900; canvas.height = 675;
  canvas.getContext('2d').drawImage(image, (index % 2) * image.width / 2,
    Math.floor(index / 2) * image.height / 2, image.width / 2, image.height / 2, 0, 0, 900, 675);
  return { type: 'photo', url: canvas.toDataURL('image/jpeg') };
});
const noop = () => {};
const query = new URLSearchParams(location.search);
const page = query.get('page') || 'editor';
function Preview() {
  const [templateId, setTemplateId] = useState('strip-four');
  const [delay, setDelay] = useState(3), [mirror, setMirror] = useState(true);
  const [mode, setMode] = useState('photo'), [sticker, setSticker] = useState('none');
  const video = useRef(null), overlay = useRef(null);
  const selected = templates.find(t => t.id === templateId);
  const session = {
    template: templates.find(t => t.id === 'grid-nine'), shots: samples,
    status: 'idle', completed: false, busy: false, cameraActive: false,
    openCamera: noop, stopCamera: noop, video, overlay, countdown: null,
    delay, setDelay, mirror, setMirror, mode, setMode, sticker, setSticker,
    face: { state: 'idle', retry: noop }, stickerReady: true, mp4Supported: true,
    devices: [{deviceId:'sample-1',label:'Front camera'},{deviceId:'sample-2',label:'Rear camera'}],
    deviceId:'sample-1', templateLocked: true, retakeIndex:null,
    takePhoto:noop, cancelCountdown:noop, redoAll:noop,
  };
  return <div className={'app ' + (page === 'editor' ? 'editor-app' : page === 'booth' ? 'booth-app' : 'templates-app')}>
    <WorkflowSteps page={page} layoutChosen completed={page === 'editor'} />
    {page === 'editor' ? <EditorPage shots={samples} template={selected} onSettingsChange={noop} onBack={noop} onStartOver={noop} />
      : page === 'booth' ? <CapturePage session={session} />
      : <TemplatesPage template={selected} onSelect={setTemplateId} locked={query.has('locked')} captured={query.has('locked')?4:0} onContinue={noop} onStartOver={noop} />}
    <Footer />
  </div>;
}
createRoot(document.getElementById('root')).render(<Preview />);
