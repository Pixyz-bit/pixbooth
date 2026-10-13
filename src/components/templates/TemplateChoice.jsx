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
    </button>
  );
}
