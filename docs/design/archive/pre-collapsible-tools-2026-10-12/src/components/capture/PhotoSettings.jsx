import Icon from '../common/Icon.jsx';
import CaptureMode from './CaptureMode.jsx';
export default function PhotoSettings({
  busy,
  completed,
  delay,
  setDelay,
  mirror,
  setMirror,
  devices = [],
  mode,
  templateLocked,
  mp4Supported,
  setMode,
  deviceId,
  status,
  openCamera,
}) {
  return (
    <section className="settings-panel" aria-label="Camera settings">
      <h2 className="tools-heading">Settings</h2>
      <div className="session-settings" aria-label="Photo controls">
        <fieldset disabled={busy || completed}>
          <legend>Capture mode</legend>
          <CaptureMode {...{ mode, templateLocked, mp4Supported, setMode }} />
          {mp4Supported === false && (
            <p className="compatibility-note">
              Live MP4 is unavailable in this browser. Photo mode is ready.
            </p>
          )}
        </fieldset>
        <fieldset disabled={busy || completed}>
          <legend>
            <Icon name="timer" />
            Countdown
          </legend>
          <div className="segmented">
            {[0, 3, 5].map((seconds) => (
              <button
                key={seconds}
                aria-pressed={delay === seconds}
                onClick={() => setDelay(seconds)}
              >
                {seconds ? `${seconds} sec` : 'Off'}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="mirror-row">
          <div>
            <span className="setting-label">
              <Icon name="mirror" />
              Mirror photo
            </span>
            <p className="setting-note">Match the preview.</p>
          </div>
          <button
            className={`switch ${mirror ? 'on' : ''}`}
            role="switch"
            aria-checked={mirror}
            aria-label="Mirror photo"
            disabled={busy || completed}
            onClick={() => setMirror(!mirror)}
          >
            <span />
          </button>
        </div>
        {devices.length > 1 && (
          <label className="camera-select">
            Camera
            <select
              value={deviceId}
              disabled={busy || status !== 'ready'}
              onChange={(e) => openCamera(e.target.value)}
            >
              {devices.map((device, index) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </section>
  );
}
