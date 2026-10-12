import { useState } from 'react';
import CaptureIntro from '../../components/capture/CaptureIntro.jsx';
import FaceStickerPanel from '../../components/capture/FaceStickerPanel.jsx';
import CameraPreview from '../../components/capture/CameraPreview.jsx';
import CaptureActions from '../../components/capture/CaptureActions.jsx';
import CapturedGallery from '../../components/capture/CapturedGallery.jsx';
import PhotoSettings from '../../components/capture/PhotoSettings.jsx';
import CaptureFeedback from '../../components/capture/CaptureFeedback.jsx';
import Dialog from '../../components/common/Dialog.jsx';
import Icon from '../../components/common/Icon.jsx';
export default function CapturePage({ session }) {
  const [tool, setTool] = useState(null);
  return (
    <main className="capture-main">
      <CaptureIntro {...session} />
      <section className="camera-workspace" aria-label="Camera workspace">
        <div className="capture-camera">
          <CameraPreview {...session} />
          <CaptureFeedback {...session} />
          {session.sticker !== 'none' && session.cameraActive && !session.stickerReady && (
            <p className="tracking-note" role="status" aria-live="polite">
              {session.face.state === 'loading'
                ? 'Loading your sticker. Keep facing the camera…'
                : session.face.state === 'error'
                  ? 'Sticker tracking needs attention. Open Stickers to retry or select None.'
                  : 'Face the camera to place your sticker before capturing.'}
            </p>
          )}
        </div>
        <aside className="capture-sidebar" aria-label="Captured moments and next step">
          <div className="capture-toolbar">
            <button className="tool-button" onClick={() => setTool('stickers')}>
              Stickers<span>{session.sticker === 'none' ? 'None selected' : 'Sticker on'}</span>
            </button>
            <CaptureActions {...session} />
            <button className="tool-button" onClick={() => setTool('settings')}>
              <Icon name="timer" />
              Settings<span>{session.delay ? session.delay + ' sec timer' : 'Timer off'}</span>
            </button>
          </div>
          <CapturedGallery {...session} />
          {session.retakeIndex !== null && (
            <div className="retake-notice" role="status">
              Replacing {session.mode === 'live' ? 'clip' : 'photo'} {session.retakeIndex + 1}. Your
              original stays until you capture a replacement.
              <button
                className="text-button"
                disabled={session.busy}
                onClick={session.cancelRetake}
              >
                Cancel retake
              </button>
            </div>
          )}
          <div className="capture-continue">
            <p>
              {session.completed
                ? 'Your moments are ready. Add the finishing touches.'
                : 'Capture ' +
                  session.template.count +
                  ' ' +
                  (session.mode === 'live'
                    ? session.template.count === 1
                      ? 'clip'
                      : 'clips'
                    : session.template.count === 1
                      ? 'photo'
                      : 'photos') +
                  ' to continue.'}
            </p>
            <div className="capture-next-actions">
              <button
                className="button button-dark"
                disabled={!session.completed || session.busy}
                onClick={() => {
                  location.hash = '/edit';
                }}
              >
                Continue to customize
                <Icon name="arrow" />
              </button>
              {session.shots.length > 0 && (
                <button className="text-button" disabled={session.busy} onClick={session.retake}>
                  Start over
                </button>
              )}
            </div>
          </div>
        </aside>
      </section>
      {tool && (
        <Dialog
          className="tool-drawer"
          title={tool === 'stickers' ? 'Face stickers' : 'Camera settings'}
          onClose={() => setTool(null)}
        >
          <div className="drawer-content">
            {tool === 'stickers' ? (
              <FaceStickerPanel {...session} />
            ) : (
              <PhotoSettings {...session} />
            )}
          </div>
        </Dialog>
      )}
    </main>
  );
}
