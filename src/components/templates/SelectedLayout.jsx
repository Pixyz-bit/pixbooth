import TemplateMini from '../common/TemplateMini.jsx';
export default function SelectedLayout({ template, locked, onContinue, onStartOver }) {
  return (
    <aside className="selection-summary panel" aria-label="Selected layout">
      <h2>{template.name}</h2>
      <p>
        {template.count} {template.count === 1 ? 'moment' : 'moments'}, one keepsake.
      </p>
      <div className="selection-stage">
        <TemplateMini key={template.id} template={template} />
      </div>
      <p className="selection-note">
        {locked
          ? 'Start over to choose a different layout.'
          : 'Add an original frame, background or filter after capturing.'}
      </p>
      <button className="button button-dark" onClick={onContinue}>
        {locked ? 'Return to capture' : 'Continue to capture'}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M3 10h14m-5-5 5 5-5 5" />
        </svg>
      </button>
      {locked && (
        <button className="text-button" onClick={onStartOver}>
          Start over
        </button>
      )}
    </aside>
  );
}
