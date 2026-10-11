import Chevron from '../common/Chevron.jsx';
import TemplateMini from '../common/TemplateMini.jsx';
export default function LayoutOptions({ available, layoutId, exporting, setLayoutId }) {
  return (
    available.length > 1 && (
      <details className="editor-section" open>
        <summary>
          <span>Photo layout · {available.length}</span>
          <Chevron />
        </summary>
        <div className="editor-layout-options">
          {available.map((item) => (
            <button
              key={item.id}
              className={`template-button ${layoutId === item.id ? 'selected' : ''}`}
              disabled={exporting}
              aria-pressed={layoutId === item.id}
              onClick={() => setLayoutId(item.id)}
            >
              <TemplateMini template={item} />
              <span className="template-name">{item.name}</span>
            </button>
          ))}
        </div>
      </details>
    )
  );
}
