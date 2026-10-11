import Icon from '../common/Icon.jsx';
import { frameRects } from '../../lib/collage.js';
export default function CapturedGallery({ mode, shots, template, busy, completed, retake }) {
  return (
    <aside className="preview-panel" aria-label="Captured photos">
      <h2>{mode === 'live' ? 'Live clips' : 'Captured photos'}</h2>
      <p className="preview-subtitle">
        {shots.length} of {template.count} captured
      </p>
      <div
        className={`capture-gallery ${shots.length ? '' : 'empty'}`}
        tabIndex={shots.length ? 0 : undefined}
        aria-label="Your captured photos"
      >
        {shots.length ? (
          shots.map((shot, index) => (
            <figure key={shot.url}>
              {shot.type === 'live' ? (
                <video
                  src={shot.url}
                  poster={shot.poster}
                  controls
                  loop
                  muted
                  playsInline
                  aria-label={`Live clip ${index + 1}`}
                  style={{
                    aspectRatio:
                      frameRects(template)[index].width / frameRects(template)[index].height,
                  }}
                />
              ) : (
                <img
                  src={shot.url}
                  alt={`Captured photo ${index + 1}`}
                  style={{
                    aspectRatio:
                      frameRects(template)[index].width / frameRects(template)[index].height,
                  }}
                />
              )}
              <figcaption>
                {shot.type === 'live' ? (
                  <a href={shot.url} download={`pixbooth-live-${index + 1}.mp4`}>
                    Clip {index + 1} · Download MP4
                  </a>
                ) : (
                  `Photo ${index + 1}`
                )}
              </figcaption>
            </figure>
          ))
        ) : (
          <div className="gallery-empty">
            <Icon name="camera" size={30} />
            <p>{mode === 'live' ? 'No clips yet' : 'No photos yet'}</p>
            <span>
              {mode === 'live'
                ? 'Record five seconds to begin.'
                : 'Take your first photo to begin.'}
            </span>
          </div>
        )}
      </div>
      {shots.length > 0 && !busy && !completed && (
        <button className="text-button start-over" onClick={retake}>
          <Icon name="retake" size={16} />
          Start over
        </button>
      )}
    </aside>
  );
}
