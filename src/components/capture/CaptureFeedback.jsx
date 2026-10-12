import Icon from '../common/Icon.jsx';
export default function CaptureFeedback({
  error,
  status,
  openCamera,
  deviceId,
  reviewing,
  shots,
  template,
}) {
  return (
    <>
      {error && (
        <div className="error-message" role="alert">
          <strong>Let’s get that sorted.</strong>
          <p>{error}</p>
          {status === 'idle' && (
            <button className="text-button" onClick={() => openCamera(deviceId)}>
              Try again <Icon name="arrow" size={16} />
            </button>
          )}
        </div>
      )}
      <p className="session-announcement" role="status" aria-live="polite">
        {reviewing
          ? 'All moments captured. Continue to customize, or redo the full set.'
          : status === 'ready'
            ? `Camera ready. ${shots.length} of ${template.count} photos captured.`
            : ''}
      </p>
    </>
  );
}
