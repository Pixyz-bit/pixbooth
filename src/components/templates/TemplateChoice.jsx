import TemplateMini from '../common/TemplateMini.jsx';
export default function TemplateChoice({ item, selected, locked, onSelect }) {
  return (
    <button
      key={item.id}
      className={`template-choice ${selected ? 'selected' : ''}`}
      aria-pressed={selected}
      disabled={locked}
      onClick={() => onSelect(item.id)}
      aria-label={`${item.name}, ${item.count} ${item.count === 1 ? 'photo' : 'photos'}`}
    >
      <TemplateMini template={item} />
      <span className="choice-copy">
        <strong>{item.name}</strong>
        <span>
          {item.count} {item.count === 1 ? 'photo' : 'photos'}
        </span>
      </span>
      {selected && (
        <svg
          className="choice-check"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m4 10 4 4 8-8" />
        </svg>
      )}
    </button>
  );
}
