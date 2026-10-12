import { useState } from 'react';
import { templates } from '../../data/templates.js';
import { filterLayouts } from '../../lib/layout-categories.js';
import TemplateChoice from './TemplateChoice.jsx';
import TemplateTools from './TemplateTools.jsx';
export default function TemplateCatalog({ template, locked, onSelect }) {
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('All'),
    [count, setCount] = useState('all');
  const visible = filterLayouts(templates, { query, category, count });
  function surprise() {
    const choices = visible.filter((item) => item.id !== template.id);
    if (choices.length) onSelect(choices[Math.floor(Math.random() * choices.length)].id);
  }
  return (
    <section className="template-catalog" aria-label="Photo layouts">
      <TemplateTools
        {...{ query, setQuery, category, setCategory, count, setCount }}
        locked={locked || !visible.some((item) => item.id !== template.id)}
        onSurprise={surprise}
      />
      <p className="template-results" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'layout' : 'layouts'}
        {locked ? ' · Your capture layout is locked for this session.' : ''}
      </p>
      <div className="template-choices" role="group" aria-label="Choose a photo layout">
        {visible.map((item) => (
          <TemplateChoice
            key={item.id}
            {...{ item, locked, onSelect }}
            selected={item.id === template.id}
          />
        ))}
        {!visible.length && (
          <div className="template-empty">
            <h2>No layouts found.</h2>
            <p>Try another name, category or photo count.</p>
            <button
              className="button button-outline"
              onClick={() => {
                setQuery('');
                setCategory('All');
                setCount('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
