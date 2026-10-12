import Chevron from '../common/Chevron.jsx';
import { photoFilters } from '../../data/photoFilters.js';
export default function FilterOptions({ filter, exporting, setFilter, previewImage }) {
  return (
    <details className="editor-section" open>
      <summary>
        <span>Photo filter · {photoFilters.length}</span>
        <Chevron />
      </summary>
      <div className="filter-options">
        {photoFilters.map((item) => (
          <button
            key={item.id}
            className={`filter-option ${filter === item.id ? 'selected' : ''}`}
            disabled={exporting}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            <img
              src={previewImage}
              style={{
                filter: item.css,
              }}
              alt=""
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
