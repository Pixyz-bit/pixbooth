import { layoutSize } from '../../lib/collage.js';
import TemplateMini from '../common/TemplateMini.jsx';
export default function TemplateChoice({ item, selected, locked, onSelect }) {
  const { width, height } = layoutSize(item);
  return (
    <button
      className={'template-choice ' + (selected ? 'selected' : '')}
      aria-pressed={selected}
      disabled={locked}
      onClick={() => onSelect(item.id)}
    >
      <span className="choice-preview" style={{ '--layout-aspect': width / height }}>
        <TemplateMini template={item} />
      </span>
      <span className="choice-copy">
        <strong>{item.name}</strong>
        <span>
          {item.count} {item.count === 1 ? 'photo' : 'photos'}
        </span>
      </span>
      {selected && (
        <span className="choice-check" aria-hidden="true">
          <svg
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m4 10 4 4 8-8" />
          </svg>
        </span>
      )}
    </button>
  );
}
