import { useState } from 'react';
import Icon from '../common/Icon.jsx';
export default function CameraPreview({
  status,
  cameraActive,
  completed,
  stopCamera,
  openCamera,
  deviceId,
  video,
  overlay,
  mirror,
  flash,
  mode,
  shots,
  countdown,
  recordProgress,
  template,
  retakeIndex,
}) {
  const [cameraRatio, setCameraRatio] = useState(4 / 3);
  return (
    <section className="booth" aria-label="Photo booth">
      <div className="booth-bar">
        <h2 className="panel-title">Camera preview</h2>
        <div className="camera-control">
          <span className="camera-toggle-label">
            {status === 'loading' ? 'Connecting…' : cameraActive ? 'Camera on' : 'Camera off'}
          </span>
          <button
            className={`switch ${cameraActive ? 'on' : ''}`}
            role="switch"
            aria-label="Camera"
            aria-checked={cameraActive}
            disabled={status === 'saving' || completed}
            title={
              completed
                ? 'Start a new session to use the camera again'
                : status === 'loading'
                  ? 'Cancel camera connection'
                  : undefined
            }
            onClick={() =>
              cameraActive || status === 'loading' ? stopCamera() : openCamera(deviceId)
            }
          >
            <span />
          </button>
        </div>
      </div>
      <div className={`viewfinder ${flash ? 'flash' : ''}`} style={{ aspectRatio: cameraRatio }}>
        <video
          ref={video}
          onLoadedMetadata={(event) => {
            const source = event.currentTarget;
            if (source.videoWidth && source.videoHeight)
              setCameraRatio(source.videoWidth / source.videoHeight);
          }}
          autoPlay
          muted
          playsInline
          className={`${mirror ? 'mirrored' : ''} ${cameraActive ? '' : 'hidden'}`}
          aria-label="Live webcam preview"
        />
        <canvas
          ref={overlay}
          className={`face-overlay ${mirror ? 'mirrored' : ''} ${cameraActive ? '' : 'hidden'}`}
          aria-hidden="true"
        />
        {completed &&
          (mode === 'live' ? (
            <video
              className="captured-photo"
              src={shots.at(-1).url}
              autoPlay
              loop
              muted
              playsInline
              controls
              aria-label="Your last live clip"
            />
          ) : (
            <img className="captured-photo" src={shots.at(-1).url} alt="Your last captured photo" />
          ))}
        {!completed && (status === 'idle' || status === 'loading') && (
          <div className="camera-placeholder">
            <div className="camera-outline">
              <Icon name="camera" size={44} />
            </div>
            <h2>{status === 'loading' ? 'Just a moment…' : 'Ready when you are.'}</h2>
            <p>
              {status === 'loading'
                ? 'Allow camera access when your browser asks.'
                : 'Enable your camera and allow access when your browser asks.'}
            </p>
            {status === 'idle' && (
              <button
                className="button button-dark enable-camera"
                onClick={() => openCamera(deviceId)}
              >
                Enable camera
              </button>
            )}
          </div>
        )}
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
        {countdown !== null && (
          <div
            className="countdown"
            role="status"
            aria-live="assertive"
            aria-atomic="true"
            key={countdown}
          >
            {countdown}
          </div>
        )}
        {status === 'recording' && (
          <div className="recording-status" role="status">
            <span />
            Recording · {Math.min(5, Math.ceil(recordProgress * 5))} / 5 sec
            <progress value={recordProgress} max="1" aria-label="Live recording progress" />
          </div>
        )}
      </div>
      <div className="booth-bottom">
        <span role="status" aria-live="polite">
          {completed
            ? 'All your moments, ready to keep.'
            : countdown !== null
              ? 'Hold that pose…'
              : `${mode === 'live' ? 'Live clip' : 'Photo'} ${(retakeIndex ?? shots.length) + 1} of ${template.count}`}
        </span>
      </div>
    </section>
  );
}
