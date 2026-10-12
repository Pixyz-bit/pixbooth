import Chevron from '../common/Chevron.jsx';
import { decorations } from '../../data/decorations.js';
import MotifPreview from './MotifPreview.jsx';
export default function DecorationOptions({ decoration, exporting, setDecoration }) {
  return (
    <details className="editor-section" open>
      <summary>
        <span>Surrounding stickers</span>
        <Chevron />
      </summary>
      <div className="decoration-options">
        {decorations.map((item) => (
          <button
            key={item.id}
            className={`design-option ${decoration === item.id ? 'selected' : ''}`}
            disabled={exporting}
            aria-pressed={decoration === item.id}
            onClick={() => setDecoration(item.id)}
          >
            <MotifPreview motif={item} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
