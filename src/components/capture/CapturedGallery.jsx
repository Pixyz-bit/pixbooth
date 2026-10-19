import Icon from '../common/Icon.jsx';
export default function CapturedGallery({ mode, shots, template }) {
  const slots = Array.from({ length: template.count });
  return (
    <section
      className="capture-review"
      data-mode={mode}
      aria-label={mode === 'live' ? 'Captured clips' : 'Captured photos'}
    >
      <div className="review-heading">
        <h2>{mode === 'live' ? 'Your clips' : 'Your photos'}</h2>
        <span>
          {shots.length} of {template.count} captured
        </span>
      </div>
      <div className="capture-gallery" role="group" aria-label="Captured media in layout order">
        {slots.map((_, index) => {
          const shot = shots[index];
          const kind = mode === 'live' ? 'clip' : 'photo';
          return (
            <figure key={index} className="capture-slot ">
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
                    />
                  ) : (
                    <img src={shot.url} alt={'Photo ' + (index + 1)} />
                  )}
                  {shot.type === 'live' && (
                    <a
                      className="clip-download"
                      aria-label={'Download clip ' + (index + 1) + ' as MP4'}
                      title={'Download clip ' + (index + 1)}
                      href={shot.url}
                      download={'mentomory-live-' + (index + 1) + '.mp4'}
                    >
                      <Icon name="download" size={18} />
                    </a>
                  )}
                </>
              ) : (
                <div className="empty-slot" aria-label={'Awaiting ' + kind + ' ' + (index + 1)}>
                  <span>{index + 1}</span>
                </div>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
