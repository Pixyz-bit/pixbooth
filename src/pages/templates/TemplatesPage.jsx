import TemplateCatalog from '../../components/templates/TemplateCatalog.jsx';
import Icon from '../../components/common/Icon.jsx';
export default function TemplatesPage({
  template,
  onSelect,
  locked,
  onContinue,
  onStartOver,
}) {
  return (
    <main className="template-main">
      <div className="intro">
        <h1 tabIndex="-1">Pick your photo layout.</h1>
        <p>A strip, a grid or one perfect frame. Make it your own.</p>
      </div>
      <TemplateCatalog {...{ template, locked, onSelect }} />
      <div className="selection-actionbar">
        <div>
          <span className="selection-label">Your layout</span>
          <strong>{template.name}</strong>
          <span>
            {template.count} {template.count === 1 ? 'photo' : 'photos'}
          </span>
        </div>
        <div className="selection-actions">
          {locked && (
            <button className="text-button" onClick={onStartOver}>
              Start over
            </button>
          )}
          <button className="button button-dark" onClick={onContinue}>
            {locked ? 'Return to camera' : 'Continue to camera'}
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </main>
  );
}
