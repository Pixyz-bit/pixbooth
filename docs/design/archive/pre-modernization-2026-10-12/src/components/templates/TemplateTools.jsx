export default function TemplateTools({ query, setQuery, count, setCount, locked, onSurprise }) {
  return (
    <div className="template-tools">
      <label className="template-search">
        <span>Find a layout</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Strip, square, Polaroid…"
        />
      </label>
      <div className="template-filter-row">
        <div className="template-counts" role="group" aria-label="Filter layouts by photo count">
          {['all', 1, 2, 3, 4, '6+'].map((value) => (
            <button key={value} aria-pressed={count === value} onClick={() => setCount(value)}>
              {value === 'all' ? 'All' : value === '6+' ? '6+' : value}
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
