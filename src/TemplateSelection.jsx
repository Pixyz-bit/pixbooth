import { templates } from './collage.js';
import { TemplateMini } from './BoothParts.jsx';

export default function TemplateSelection({ template, onSelect, locked, captured, onContinue, onStartOver }) {
  return <main className="template-main">
    <div className="intro"><div><h1 tabIndex="-1">Choose your layout.</h1><p>{locked ? `${captured} captured. Your layout stays with this session.` : 'Pick a strip, a grid or a single frame. Then step into the booth.'}</p></div></div>
    <div className="selection-layout">
      <section className="template-catalog panel" aria-label="Grid templates">
        <div className="catalog-heading"><h2>Grid templates</h2><span>{templates.length} layouts</span></div>
        <div className="template-choices" role="group" aria-label="Choose a photo layout" tabIndex="0">
          {templates.map(item => <button key={item.id} className={`template-choice ${template.id === item.id ? 'selected' : ''}`} aria-pressed={template.id === item.id} disabled={locked} onClick={() => onSelect(item.id)} aria-label={`${item.name}, ${item.count} ${item.count === 1 ? 'photo' : 'photos'}`}>
            <TemplateMini template={item}/><span className="choice-copy"><strong>{item.name}</strong><span>{item.count} {item.count === 1 ? 'photo' : 'photos'}</span></span>
            {template.id === item.id && <svg className="choice-check" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m4 10 4 4 8-8"/></svg>}
          </button>)}
        </div>
      </section>
      <aside className="selection-summary panel" aria-label="Selected layout">
        <h2>{template.name}</h2><p>{template.count} {template.count === 1 ? 'moment' : 'moments'}, one keepsake.</p>
        <div className="selection-stage"><TemplateMini template={template}/></div>
        <p className="selection-note">{locked ? 'Start over to choose a different layout.' : 'Add backgrounds, filters and border stickers after capturing.'}</p>
        <button className="button button-dark" onClick={onContinue}>{locked ? 'Return to capture' : 'Continue to capture'}<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5"/></svg></button>
        {locked && <button className="text-button" onClick={onStartOver}>Start over</button>}
      </aside>
    </div>
  </main>;
}
