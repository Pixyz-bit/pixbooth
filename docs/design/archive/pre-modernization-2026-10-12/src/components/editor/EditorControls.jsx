import EditorOptions from './EditorOptions.jsx';
import EditorActions from './EditorActions.jsx';
export default function EditorControls(props) {
  return (
    <aside className="editor-controls panel" aria-label="Strip editing controls">
      <EditorOptions {...props} />
      <EditorActions {...props} />
    </aside>
  );
}
