import { useState, useId } from 'react';
import FaceStickerPanel from '../../components/capture/FaceStickerPanel.jsx';
import CameraPreview from '../../components/capture/CameraPreview.jsx';
import CaptureActions from '../../components/capture/CaptureActions.jsx';
import CapturedGallery from '../../components/capture/CapturedGallery.jsx';
import PhotoSettings from '../../components/capture/PhotoSettings.jsx';
import CaptureFeedback from '../../components/capture/CaptureFeedback.jsx';
import Icon from '../../components/common/Icon.jsx';
export default function CapturePage({ session }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const controlsId = useId();
  const remaining = Math.max(0, session.template.count - session.shots.length);
  return (
    <main className="capture-main">
      <section
        className="camera-workspace"
        aria-label="Camera workspace"
        style={{ '--controls-width': toolsOpen ? '256px' : '56px' }}
      >
        <aside className="capture-controls" aria-label="Camera tools" data-expanded={toolsOpen}>
          <button
            className="controls-toggle"
            aria-expanded={toolsOpen}
            aria-controls={controlsId}
            onClick={() => setToolsOpen(!toolsOpen)}
            aria-label={toolsOpen ? 'Collapse camera tools' : 'Expand camera tools'}
          >
            <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d={toolsOpen ? 'm12 4-6 6 6 6' : 'm8 4 6 6-6 6'} />
            </svg>
            <span>{toolsOpen ? 'Hide tools' : 'Tools'}</span>
          </button>
          <div className="controls-body" id={controlsId} hidden={!toolsOpen}>
            <div className="capture-tools">
              <FaceStickerPanel {...session} />
              <PhotoSettings {...session} />
            </div>
          </div>
        </aside>
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
          <div className="capture-toolbar">
            <CaptureActions {...session} />
            <p className="shutter-timer">
              {session.delay ? 'Timer: ' + session.delay + ' sec' : 'Timer off'}
            </p>
          </div>
        </div>
        <aside className="capture-sidebar" aria-label="Captured moments and next step">
          <div className="capture-review-scroll">
            <CapturedGallery {...session} />
            {session.retakeIndex !== null && (
              <div className="retake-notice" role="status">
                Replacing {session.mode === 'live' ? 'clip' : 'photo'} {session.retakeIndex + 1}.
                Your original stays until you capture a replacement.
                <button
                  className="text-button"
                  disabled={session.busy}
                  onClick={session.cancelRetake}
                >
                  Cancel retake
                </button>
              </div>
            )}
          </div>
          <div className="capture-continue">
            <p>
              {session.completed
                ? 'Your moments are ready to customize.'
                : session.retakeIndex !== null
                  ? 'Finish this retake to continue.'
                  : remaining +
                    ' more ' +
                    (session.mode === 'live'
                      ? remaining === 1
                        ? 'clip'
                        : 'clips'
                      : remaining === 1
                        ? 'photo'
                        : 'photos') +
                    ' needed.'}
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
    </main>
  );
}
