import Icon from '../common/Icon.jsx';
export default function CaptureActions({
  countdown,
  cancelCountdown,
  status,
  stopCamera,
  completed,
  busy,
  retake,
  stickerReady,
  takePhoto,
  mode,
}) {
  return countdown !== null ? (
    <button className="button button-dark shutter-button" onClick={cancelCountdown}>
      Cancel countdown
    </button>
  ) : status === 'recording' ? (
    <button className="button button-outline shutter-button" onClick={stopCamera}>
      Cancel recording
    </button>
  ) : completed ? (
    <div className="completion-actions">
      <button className="button button-outline" disabled={busy} onClick={retake}>
        <Icon name="retake" />
        Start over
      </button>
      <button
        className="button button-dark"
        disabled={busy}
        onClick={() => {
          location.hash = '/edit';
        }}
      >
        Submit
        <Icon name="arrow" />
      </button>
    </div>
  ) : (
    <button
      className="button button-dark shutter-button"
      disabled={status !== 'ready' || !stickerReady}
      onClick={takePhoto}
    >
      <Icon name="camera" />
      {status === 'saving' ? 'Saving photo…' : mode === 'live' ? 'Record 5 seconds' : 'Say cheese!'}
    </button>
  );
}
