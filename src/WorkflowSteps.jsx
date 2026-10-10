const steps = [
  { page: 'templates', path: '/templates', label: 'Choose template' },
  { page: 'booth', path: '/booth', label: 'Capture photos' },
  { page: 'editor', path: '/edit', label: 'Edit & download' },
];

export default function WorkflowSteps({ page, layoutChosen, completed }) {
  return <nav className="workflow-nav" aria-label="Photo booth steps">
    <ol>{steps.map((step, index) => {
      const available = index === 0 || (index === 1 ? layoutChosen : completed);
      return <li key={step.page}>
        {available ? <a href={`#${step.path}`} aria-current={page === step.page ? 'step' : undefined}>
          <span className="step-number" aria-hidden="true">{index + 1}</span><span>{step.label}</span>
        </a> : <span className="step-unavailable" aria-disabled="true"><span className="step-number" aria-hidden="true">{index + 1}</span><span>{step.label}</span></span>}
        {index < 2 && <svg className="step-chevron" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m7 4 6 6-6 6"/></svg>}
      </li>;
    })}</ol>
    <a className="workflow-home" href="#/">Home</a>
  </nav>;
}
