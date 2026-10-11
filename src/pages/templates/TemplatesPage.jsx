import TemplateCatalog from '../../components/templates/TemplateCatalog.jsx';
import SelectedLayout from '../../components/templates/SelectedLayout.jsx';
export default function TemplatesPage({
  template,
  onSelect,
  locked,
  captured,
  onContinue,
  onStartOver,
}) {
  return (
    <main className="template-main">
      <div className="intro">
        <div>
          <h1 tabIndex="-1">Choose your layout.</h1>
          <p>
            {locked
              ? `${captured} captured. Your layout stays with this session.`
              : 'Pick a strip, a grid or a single frame. Then step into the booth.'}
          </p>
        </div>
      </div>
      <div className="selection-layout">
        <TemplateCatalog template={template} locked={locked} onSelect={onSelect} />
        <SelectedLayout
          template={template}
          locked={locked}
          onContinue={onContinue}
          onStartOver={onStartOver}
        />
      </div>
    </main>
  );
}
