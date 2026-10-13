import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import CameraPreview from '../../src/components/capture/CameraPreview.jsx';
import CaptureFeedback from '../../src/components/capture/CaptureFeedback.jsx';
import { templates } from '../../src/data/templates.js';
import '../../src/styles/index.css';
function Demo() {
  const [mode, setMode] = useState('notice');
  const video = useRef(null),
    overlay = useRef(null);
  const props = {
    status: 'ready',
    cameraActive: false,
    completed: false,
    shots: [],
    template: templates[0],
    mode: 'photo',
    countdown: null,
    retakeIndex: null,
    video,
    overlay,
    stickerReady: false,
    openCamera: () => {},
    stopCamera: () => {},
    error: mode === 'error' ? 'The camera disconnected. Enable it to continue.' : '',
  };
  return (
    <main style={{ maxWidth: 960, margin: '24px auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Camera notification preview</h1>
      <p style={{ marginBottom: 16, fontSize: 14 }}>
        Camera-free test using the existing illustrative sample artwork.
      </p>
      <div className="segmented" style={{ marginBottom: 20 }}>
        {[
          ['notice', 'Show notice'],
          ['clear', 'Hide notification'],
          ['error', 'Show error'],
        ].map(([value, label]) => (
          <button key={value} aria-pressed={mode === value} onClick={() => setMode(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="app booth-app feedback-demo" style={{ padding: 0, minHeight: 0 }}>
        <style>{`.feedback-demo .camera-stage{display:block;height:auto}.feedback-demo .camera-frame-area{width:100%;height:auto;aspect-ratio:16/9;overflow:hidden;border-radius:12px}.feedback-demo .viewfinder{background:url('/landing-contact-sheet.webp') center / cover}`}</style>
        <CameraPreview {...props} hasNotification={mode !== 'clear'}>
          <CaptureFeedback {...props} />
          {mode === 'notice' && (
            <p className="tracking-note" role="status">
              Face the camera to place your sticker before capturing.
            </p>
          )}
        </CameraPreview>
      </div>
    </main>
  );
}
createRoot(document.querySelector('#root')).render(<Demo />);
