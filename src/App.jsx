import { useState, useCallback } from 'react';
import Dialog from './components/common/Dialog.jsx';
import { templates } from './data/templates.js';
import useBoothSession from './hooks/useBoothSession.js';
import WorkflowSteps from './components/layout/WorkflowSteps.jsx';
import Footer from './components/layout/Footer.jsx';
import LandingPage from './pages/landing/LandingPage.jsx';
import TemplatesPage from './pages/templates/TemplatesPage.jsx';
import CapturePage from './pages/capture/CapturePage.jsx';
import EditorPage from './pages/editor/EditorPage.jsx';
import posthog, { posthogEnabled } from './lib/posthog.js';
import { logPosthogInfo } from './lib/posthogLogger.js';
import { navigate } from './lib/navigation.js';
import usePageSeo from './hooks/usePageSeo.js';
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
  usePageSeo(page);
  const updateEditorSettings = useCallback(
    (values) => {
      setEditorSettings(values);
      const layout = templates.find((item) => item.id === values.layoutId);
      if (layout?.count === shots.length) setTemplateId(layout.id);
    },
    [setEditorSettings, setTemplateId, shots.length]
  );
  function selectTemplate(id) {
    const selectedTemplate = templates.find((item) => item.id === id);
    if (posthogEnabled && selectedTemplate)
      posthog.capture('template_selected', {
        template_id: selectedTemplate.id,
        photo_count: selectedTemplate.count,
      });
    setTemplateId(id);
    setEditorSettings(null);
  }
  function continueToCapture() {
    if (!template) return;
    setLayoutChosen(true);
    navigate('/booth');
  }
  let content;
  if (page === 'home')
    content = (
      <LandingPage
        onCapture={() => {
          if (posthogEnabled) posthog.capture('booth_started');
          logPosthogInfo('booth session started', { entry_point: 'landing_page' });
          navigate('/templates');
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
      <Footer showHomeContent={page === 'home'} />
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
                if (posthogEnabled)
                  posthog.capture('booth_session_restarted', {
                    captured_media_count: shots.length,
                    had_customizations: Boolean(editorSettings),
                  });
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
