import Icon from '../../components/common/Icon.jsx';
import useStripEditor from '../../hooks/useStripEditor.js';
import EditorIntro from '../../components/editor/EditorIntro.jsx';
import EditorPreview from '../../components/editor/EditorPreview.jsx';
import EditorControls from '../../components/editor/EditorControls.jsx';
export default function EditorPage({
  shots,
  template,
  settings,
  onSettingsChange,
  onBack,
  onStartOver,
}) {
  const editor = useStripEditor({
    shots,
    template,
    settings,
    onSettingsChange,
  });
  return (
    <main className="editor-main">
      <EditorIntro {...editor} onBack={onBack} />
      <div className="editor-layout">
        <div className="editor-artifact">
          <EditorPreview {...editor} shots={shots} />
          <div className="edit-history-actions" aria-label="Edit history">
            <button
              className="button button-outline"
              disabled={!editor.canUndo || editor.exporting}
              onClick={editor.undo}
            >
              <Icon name="retake" />
              Undo
            </button>
            <button
              className="button button-outline"
              disabled={!editor.canRedo || editor.exporting}
              onClick={editor.redo}
            >
              <Icon name="arrow" />
              Redo
            </button>
          </div>
        </div>
        <EditorControls {...editor} onStartOver={onStartOver} />
      </div>
    </main>
  );
}
