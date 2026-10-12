import Chevron from '../common/Chevron.jsx';
import { backgrounds } from '../../data/backgrounds.js';
export default function BackgroundOptions({
  background,
  exporting,
  setBackground,
  frame,
  setFrame,
  chooseBackground,
}) {
  return (
    <details className="editor-section" open>
      <summary>
        <span>Background design · {backgrounds.length}</span>
        <Chevron />
      </summary>
      {frame !== 'none' && (
        <p className="background-frame-note">
          Your frame supplies its paper. Selecting a background removes the frame.
        </p>
      )}
      <div className="background-options">
        {backgrounds.map((item) => (
          <button
            key={item.id}
            className={`design-option ${frame === 'none' && background === item.id ? 'selected' : ''}`}
            disabled={exporting}
            aria-pressed={frame === 'none' && background === item.id}
            onClick={() => {
              if (chooseBackground) chooseBackground(item.id);
              else {
                setFrame('none');
                setBackground(item.id);
              }
            }}
          >
            <span
              className={`background-swatch swatch-${item.id}`}
              style={{
                backgroundColor: item.color,
              }}
              aria-hidden="true"
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
