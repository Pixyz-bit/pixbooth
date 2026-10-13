import { useState, useCallback } from 'react';
import Dialog from './components/common/Dialog.jsx';
import { templates } from './data/templates.js';
import useBoothSession from './hooks/useBoothSession.js';
import WorkflowSteps from './components/layout/WorkflowSteps.jsx';
import Footer from './components/layout/Footer.jsx';
import LandingFooter from './components/landing/LandingFooter.jsx';
import LandingPage from './pages/landing/LandingPage.jsx';
import TemplatesPage from './pages/templates/TemplatesPage.jsx';
import CapturePage from './pages/capture/CapturePage.jsx';
import EditorPage from './pages/editor/EditorPage.jsx';
export default function App() {
  const session = useBoothSession();
  const [resetPending, setResetPending] = useState(false);
  function requestReset() {
    if (session.shots.length || session.editorSettings) setResetPending(true);
    else session.retake();
  }
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
  const updateEditorSettings = useCallback(
    (values) => {
      setEditorSettings(values);
      const layout = templates.find((item) => item.id === values.layoutId);
      if (layout?.count === shots.length) setTemplateId(layout.id);
    },
    [setEditorSettings, setTemplateId, shots.length]
  );
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
        onStartOver={requestReset}
      />
    );
  else if (page === 'editor' && completed)
    content = (
      <EditorPage
        shots={shots}
        template={template}
        settings={editorSettings}
        onSettingsChange={updateEditorSettings}
        onBack={() => {
          location.hash = '/booth';
        }}
        onStartOver={requestReset}
      />
    );
  else content = <CapturePage session={{ ...session, retake: requestReset }} />;
  return (
    <div
      className={`app ${page === 'home' ? 'home-app' : page === 'booth' ? 'booth-app' : page === 'templates' ? 'templates-app' : page === 'editor' ? 'editor-app' : ''}`}
    >
      {page !== 'home' && (
        <WorkflowSteps page={page} layoutChosen={layoutChosen} completed={completed} />
      )}
      {content}
      {page === 'home' ? <LandingFooter /> : <Footer />}
      {resetPending && (
        <Dialog
          title="Start a new session?"
          onClose={() => setResetPending(false)}
          initialFocus=".keep-session"
        >
          <p>Your photos and edits will be cleared. Download anything you want to keep first.</p>
          <div className="dialog-actions">
            <button
              className="button button-outline keep-session"
              onClick={() => setResetPending(false)}
            >
              Keep my photos
            </button>
            <button
              className="button button-dark"
              onClick={() => {
                setResetPending(false);
                retake();
              }}
            >
              Start over
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
