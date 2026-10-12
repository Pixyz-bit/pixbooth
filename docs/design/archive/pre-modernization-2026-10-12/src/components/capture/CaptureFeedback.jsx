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
          ? 'All photos captured. Submit to format your strip, or start over.'
          : status === 'ready'
            ? `Camera ready. ${shots.length} of ${template.count} photos captured.`
            : ''}
      </p>
    </>
  );
}
