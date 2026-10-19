import Icon from '../common/Icon.jsx';
export default function CaptureActions({
  countdown,
  cancelCountdown,
  status,
  stopCamera,
  completed,
  stickerReady,
  takePhoto,
  mode,
}) {
  if (countdown !== null)
    return (
      <button className="button button-outline cancel-capture" onClick={cancelCountdown}>
        Cancel countdown
      </button>
    );
  if (status === 'recording')
    return (
      <button className="button button-outline cancel-capture" onClick={stopCamera}>
        Cancel recording
      </button>
    );
  const label =
    status === 'saving'
      ? 'Saving…'
      : completed
        ? 'All captured'
        : mode === 'live'
          ? 'Record 7 seconds'
          : 'Take photo';
  return (
    <div className="shutter-control">
      <button
        className="shutter-button"
        disabled={completed || status !== 'ready' || !stickerReady}
        onClick={takePhoto}
        aria-label={label}
      >
        <span className="shutter-core">
          <Icon name="shutter" size={64} />
        </span>
      </button>
    </div>
  );
}
