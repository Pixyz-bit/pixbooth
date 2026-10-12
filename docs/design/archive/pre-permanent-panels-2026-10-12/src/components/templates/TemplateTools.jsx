export default function TemplateTools({ count, setCount, counts, locked, onSurprise }) {
  return (
    <div className="template-tools">
      <div className="template-filter-row">
        <div className="template-categories" role="group" aria-label="Photo count">
          {['all', ...counts].map((value) => (
            <button key={value} aria-pressed={count === value} onClick={() => setCount(value)}>
              {value === 'all' ? 'All' : value + (value === 1 ? ' photo' : ' photos')}
            </button>
          ))}
        </div>
        <button className="text-button" disabled={locked} onClick={onSurprise}>
          Pick for me
        </button>
      </div>
    </div>
  );
}
