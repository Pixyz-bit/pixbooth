import { frameRects } from '../../lib/collage.js';
import Icon from '../common/Icon.jsx';
export default function CapturedGallery({ mode, shots, template, busy, retakeIndex, retakePhoto }) {
  const slots = frameRects(template);
  return (
    <section
      className="capture-review"
      aria-label={mode === 'live' ? 'Captured clips' : 'Captured photos'}
    >
      <div className="review-heading">
        <h2>Your moments</h2>
        <span>
          {shots.length} of {template.count} captured
        </span>
      </div>
      <div className="capture-gallery" role="group" aria-label="Captured media in layout order">
        {slots.map((slot, index) => {
          const shot = shots[index];
          return (
            <figure
              key={index}
              className={'capture-slot ' + (retakeIndex === index ? 'retaking' : '')}
            >
              {shot ? (
                <>
                  {shot.type === 'live' ? (
                    <video
                      src={shot.url}
                      poster={shot.poster}
                      controls
                      loop
                      muted
                      playsInline
                      aria-label={'Clip ' + (index + 1)}
                      style={{ aspectRatio: slot.width / slot.height }}
                    />
                  ) : (
                    <img
                      src={shot.url}
                      alt={'Photo ' + (index + 1)}
                      style={{ aspectRatio: slot.width / slot.height }}
                    />
                  )}
                  <figcaption>
                    <span>
                      {mode === 'live' ? 'Clip' : 'Photo'} {index + 1}
                    </span>
                    <button
                      className="thumbnail-retake"
                      disabled={busy}
                      onClick={() => retakePhoto(index)}
                      aria-label={
                        'Retake ' + (mode === 'live' ? 'clip' : 'photo') + ' ' + (index + 1)
                      }
                    >
                      <Icon name="retake" size={16} />
                    </button>
                  </figcaption>
                  {shot.type === 'live' && (
                    <a
                      className="clip-download"
                      href={shot.url}
                      download={'pixbooth-live-' + (index + 1) + '.mp4'}
                    >
                      Download MP4
                    </a>
                  )}
                </>
              ) : (
                <>
                  <div
                    className="empty-slot"
                    style={{ aspectRatio: slot.width / slot.height }}
                    aria-label={
                      'Awaiting ' + (mode === 'live' ? 'clip' : 'photo') + ' ' + (index + 1)
                    }
                  >
                    <span>{index + 1}</span>
                  </div>
                  <figcaption>
                    {mode === 'live' ? 'Clip' : 'Photo'} {index + 1}
                  </figcaption>
                </>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
