import CameraTools from '../../components/capture/CameraTools.jsx';
import CameraPreview from '../../components/capture/CameraPreview.jsx';
import CapturedGallery from '../../components/capture/CapturedGallery.jsx';
import CaptureFeedback from '../../components/capture/CaptureFeedback.jsx';
import Icon from '../../components/common/Icon.jsx';
export default function CapturePage({ session }) {
  const remaining = Math.max(0, session.template.count - session.shots.length);
  return (
    <main className="capture-main">
      <section className="camera-workspace" aria-label="Camera workspace">
        <div className="capture-camera">
          <CameraPreview {...session} tools={<CameraTools session={session} />}>
            <CaptureFeedback {...session} />
            {session.sticker !== 'none' && session.cameraActive && !session.stickerReady && (
              <p className="tracking-note" role="status" aria-live="polite">
                {session.face.state === 'loading'
                  ? 'Loading your sticker. Keep facing the camera…'
                  : session.face.state === 'error'
                    ? 'Sticker tracking needs attention. Retry in Stickers or select None.'
                    : 'Face the camera to place your sticker before capturing.'}
              </p>
            )}
          </CameraPreview>
        </div>
        <aside className="capture-sidebar" aria-label="Captured moments and next step">
          <div className="capture-review-scroll">
            <CapturedGallery {...session} />
          </div>
          <div className="capture-continue">
            <p>
              {session.completed
                ? 'Your moments are ready to customize.'
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
                <button
                  className="button button-outline"
                  disabled={session.busy || session.redoRequested}
                  onClick={session.redoAll}
                >
                  <Icon name="retake" size={16} />
                  Redo all {session.mode === 'live' ? 'clips' : 'photos'}
                </button>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
