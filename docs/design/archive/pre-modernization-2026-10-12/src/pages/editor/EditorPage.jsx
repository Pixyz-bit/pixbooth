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
        <EditorPreview {...editor} shots={shots} />
        <EditorControls {...editor} onStartOver={onStartOver} />
      </div>
    </main>
  );
}
