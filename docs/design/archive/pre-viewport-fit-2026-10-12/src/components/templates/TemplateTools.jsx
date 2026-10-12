export default function TemplateTools({
  query,
  setQuery,
  count,
  setCount,
  counts,
  locked,
  onSurprise,
}) {
  return (
    <div className="template-tools">
      <label className="template-search">
        <span>Search layouts</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try a strip, square or Polaroid"
        />
      </label>
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
