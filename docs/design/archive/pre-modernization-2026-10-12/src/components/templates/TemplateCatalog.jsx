import { templates } from '../../data/templates.js';
import TemplateChoice from './TemplateChoice.jsx';
import { useState } from 'react';
import TemplateTools from './TemplateTools.jsx';
export default function TemplateCatalog({ template, locked, onSelect }) {
  const [query, setQuery] = useState('');
  const [count, setCount] = useState('all');
  const visible = templates.filter(
    (item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (count === 'all' || (count === '6+' ? item.count >= 6 : item.count === count))
  );
  function surprise() {
    const choices = visible.filter((item) => item.id !== template.id);
    if (choices.length) onSelect(choices[Math.floor(Math.random() * choices.length)].id);
  }
  return (
    <section className="template-catalog panel" aria-label="Grid templates">
      <div className="catalog-heading">
        <h2>Grid templates</h2>
        <span>{templates.length} layouts</span>
      </div>
      <TemplateTools
        query={query}
        setQuery={setQuery}
        count={count}
        setCount={setCount}
        locked={locked || !visible.some((item) => item.id !== template.id)}
        onSurprise={surprise}
      />
      <div
        className="template-choices"
        role="group"
        aria-label="Choose a photo layout"
        tabIndex="0"
      >
        {visible.map((item) => (
          <TemplateChoice
            key={item.id}
            item={item}
            selected={template.id === item.id}
            locked={locked}
            onSelect={onSelect}
          />
        ))}
        {!visible.length && (
          <div className="template-empty">
            <p>No layouts match. Try another name or photo count.</p>
            <button
              className="text-button"
              onClick={() => {
                setQuery('');
                setCount('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      <p className="template-results" role="status" aria-live="polite">
        {visible.length} of {templates.length} layouts · Selected: {template.name}
      </p>
    </section>
  );
}
