import { useState } from 'react';
import Chevron from '../common/Chevron.jsx';
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
  embedded = false,
}) {
  const [customCountdown, setCustomCountdown] = useState(delay !== 0 && delay !== 3);
  const Container = embedded ? 'section' : 'details';
  return (
    <Container className="settings-panel" aria-label="Camera settings">
      {embedded ? (
        <h2 className="tools-heading">Settings</h2>
      ) : (
        <summary className="tools-heading">
          Settings
          <Chevron />
        </summary>
      )}
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
        <fieldset disabled={busy}>
          <legend>
            <Icon name="timer" />
            Countdown
          </legend>
          <div className="segmented">
            {[0, 3].map((seconds) => (
              <button
                key={seconds}
                aria-pressed={!customCountdown && delay === seconds}
                onClick={() => {
                  setCustomCountdown(false);
                  setDelay(seconds);
                }}
              >
                {seconds ? `${seconds} sec` : 'Off'}
              </button>
            ))}
            <button
              aria-pressed={customCountdown}
              onClick={() => {
                setCustomCountdown(true);
                if (!delay) setDelay(3);
              }}
              aria-expanded={customCountdown}
              aria-controls="custom-countdown-seconds"
            >
              Custom
            </button>
          </div>
          {customCountdown && (
            <label className="countdown-value">
              <span>
                <input
                  id="custom-countdown-seconds"
                  autoFocus
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  value={delay}
                  aria-label="Countdown seconds before each capture"
                  onChange={(event) => {
                    const value = event.target.valueAsNumber;
                    if (Number.isFinite(value))
                      setDelay(Math.max(1, Math.min(10, Math.round(value))));
                  }}
                />
                <span>sec</span>
              </span>
            </label>
          )}
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
    </Container>
  );
}
