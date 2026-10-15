import EditorOptions from './EditorOptions.jsx';
import EditorActions from './EditorActions.jsx';
export default function EditorControls(props) {
  return (
    <aside className="editor-controls" aria-label="Photo customization">
      <EditorOptions {...props} />
      <div className="editor-download-area">
        <EditorActions {...props} />
      </div>
    </aside>
  );
}
