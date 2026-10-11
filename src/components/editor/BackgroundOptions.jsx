import Chevron from '../common/Chevron.jsx';
import { backgrounds } from '../../data/backgrounds.js';
export default function BackgroundOptions({ background, exporting, setBackground }) {
  return (
    <details className="editor-section" open>
      <summary>
        <span>Background design · {backgrounds.length}</span>
        <Chevron />
      </summary>
      <div className="background-options">
        {backgrounds.map((item) => (
          <button
            key={item.id}
            className={`design-option ${background === item.id ? 'selected' : ''}`}
            disabled={exporting}
            aria-pressed={background === item.id}
            onClick={() => setBackground(item.id)}
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
