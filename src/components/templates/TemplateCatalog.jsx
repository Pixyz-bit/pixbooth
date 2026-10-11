import { templates } from '../../data/templates.js';
import TemplateChoice from './TemplateChoice.jsx';
export default function TemplateCatalog({ template, locked, onSelect }) {
  return (
    <section className="template-catalog panel" aria-label="Grid templates">
      <div className="catalog-heading">
        <h2>Grid templates</h2>
        <span>{templates.length} layouts</span>
      </div>
      <div
        className="template-choices"
        role="group"
        aria-label="Choose a photo layout"
        tabIndex="0"
      >
        {templates.map((item) => (
          <TemplateChoice
            key={item.id}
            item={item}
            selected={template.id === item.id}
            locked={locked}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
