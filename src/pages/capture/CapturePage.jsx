import CameraTools from '../../components/capture/CameraTools.jsx';
import CameraPreview from '../../components/capture/CameraPreview.jsx';
import CapturedGallery from '../../components/capture/CapturedGallery.jsx';
import CaptureFeedback from '../../components/capture/CaptureFeedback.jsx';
import Icon from '../../components/common/Icon.jsx';
import posthog, { posthogEnabled } from '../../lib/posthog.js';
import { navigate } from '../../lib/navigation.js';
export default function CapturePage({ session }) {
  const showTrackingNotice =
    session.sticker !== 'none' && session.cameraActive && !session.stickerReady;
  const remaining = Math.max(0, session.template.count - session.shots.length);
  return (
    <main className="capture-main">
      <section className="camera-workspace" aria-label="Camera workspace">
        <div className="capture-camera">
          <CameraPreview
            {...session}
            hasNotification={Boolean(session.error) || showTrackingNotice}
            tools={<CameraTools session={session} />}
          >
            <CaptureFeedback {...session} />
            {showTrackingNotice && (
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
                  if (posthogEnabled)
                    posthog.capture('customization_started', {
                      media_type: session.mode === 'live' ? 'live_clip' : 'photo',
                      media_count: session.shots.length,
                      template_id: session.template.id,
                    });
                  navigate('/edit');
                }}
              >
                Continue to customize
                <Icon name="arrow" />
              </button>
              {session.shots.length > 0 && (
                <button
                  className="button button-outline"
                  disabled={session.busy}
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
