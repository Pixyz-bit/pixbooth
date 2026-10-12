import { layoutCategories } from '../../lib/layout-categories.js';
export default function TemplateTools({
  query,
  setQuery,
  category,
  setCategory,
  count,
  setCount,
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
        <div className="template-categories" role="group" aria-label="Layout category">
          {layoutCategories.map((name) => (
            <button key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>
              {name}
            </button>
          ))}
        </div>
        <label className="photo-count-filter">
          Photo count
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            {['all', 1, 2, 3, 4, '6+'].map((value) => (
              <option key={value} value={value}>
                {value === 'all'
                  ? 'Any count'
                  : value === '6+'
                    ? '6 or more'
                    : value + ' photo' + (value === 1 ? '' : 's')}
              </option>
            ))}
          </select>
        </label>
        <button className="text-button" disabled={locked} onClick={onSurprise}>
          Pick for me
        </button>
      </div>
    </div>
  );
}
