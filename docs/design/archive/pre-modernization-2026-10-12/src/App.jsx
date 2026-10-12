import useBoothSession from './hooks/useBoothSession.js';
import WorkflowSteps from './components/layout/WorkflowSteps.jsx';
import Footer from './components/layout/Footer.jsx';
import LandingPage from './pages/landing/LandingPage.jsx';
import TemplatesPage from './pages/templates/TemplatesPage.jsx';
import CapturePage from './pages/capture/CapturePage.jsx';
import EditorPage from './pages/editor/EditorPage.jsx';
export default function App() {
  const session = useBoothSession();
  const {
    page,
    template,
    shots,
    completed,
    layoutChosen,
    editorSettings,
    setEditorSettings,
    setTemplateId,
    setLayoutChosen,
    retake,
  } = session;
  function selectTemplate(id) {
    setTemplateId(id);
    setEditorSettings(null);
  }
  function continueToCapture() {
    setLayoutChosen(true);
    location.hash = '/booth';
  }
  let content;
  if (page === 'home')
    content = (
      <LandingPage
        onCapture={() => {
          location.hash = '/templates';
        }}
      />
    );
  else if (page === 'templates')
    content = (
      <TemplatesPage
        template={template}
        onSelect={selectTemplate}
        locked={shots.length > 0}
        captured={shots.length}
        onContinue={continueToCapture}
        onStartOver={retake}
      />
    );
  else if (page === 'editor' && completed)
    content = (
      <EditorPage
        shots={shots}
        template={template}
        settings={editorSettings}
        onSettingsChange={setEditorSettings}
        onBack={() => {
          location.hash = '/booth';
        }}
        onStartOver={retake}
      />
    );
  else content = <CapturePage session={session} />;
  return (
    <div className={`app ${page === 'home' ? 'home-app' : ''}`}>
      {page !== 'home' && (
        <WorkflowSteps page={page} layoutChosen={layoutChosen} completed={completed} />
      )}
      {content}
      <Footer />
    </div>
  );
}
