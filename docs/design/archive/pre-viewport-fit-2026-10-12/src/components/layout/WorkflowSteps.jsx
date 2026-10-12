import Brand from '../common/Brand.jsx';
const steps = [
  { page: 'templates', path: '/templates', label: 'Choose layout' },
  { page: 'booth', path: '/booth', label: 'Capture' },
  { page: 'editor', path: '/edit', label: 'Customize' },
];
export default function WorkflowSteps({ page, layoutChosen, completed }) {
  const current = steps.findIndex((step) => step.page === page);
  return (
    <header className="workflow-header">
      <div className="workflow-brand-row">
        <Brand />
        <a className="workflow-home" href="#/">
          Home
        </a>
      </div>
      <nav className="workflow-nav" aria-label="Photo booth steps">
        <ol>
          {steps.map((step, index) => {
            const available = index === 0 || (index === 1 ? layoutChosen : completed);
            const done = index === 0 ? layoutChosen : index === 1 ? completed : false;
            const contents = (
              <>
                <span className="step-number" aria-hidden="true">
                  {done && index !== current ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m4 10 4 4 8-8" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span>{step.label}</span>
              </>
            );
            return (
              <li key={step.page} className={done ? 'step-complete' : ''}>
                {available ? (
                  <a href={'#' + step.path} aria-current={page === step.page ? 'step' : undefined}>
                    {contents}
                  </a>
                ) : (
                  <span className="step-unavailable" aria-disabled="true">
                    {contents}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}
