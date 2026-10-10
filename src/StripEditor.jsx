import { useEffect, useRef, useState } from 'react';
import { backgrounds, photoFilters, composePhotos, layoutSize } from './collage.js';

export default function StripEditor({ shots, template, onBack, onStartOver }) {
  const [background, setBackground] = useState('black');
  const [filter, setFilter] = useState('normal');
  const [output, setOutput] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const currentUrl = useRef(null);
  const heading = useRef(null);
  const size = layoutSize(template);
  useEffect(() => { heading.current?.focus(); }, []);
  useEffect(() => {
    let cancelled = false;
    setBusy(true); setError('');
    const timeout = setTimeout(async () => {
      try {
        const result = await composePhotos(shots, template, { background, filter });
        if (cancelled) return;
        const url = URL.createObjectURL(result.blob);
        if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
        currentUrl.current = url; setOutput(url); setBusy(false);
      } catch { if (!cancelled) { setBusy(false); setError('The strip couldn’t be rendered. Try again to keep your edits.'); } }
    }, 100);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [shots, template, background, filter, retry]);
  useEffect(() => () => { if (currentUrl.current) URL.revokeObjectURL(currentUrl.current); }, []);

  return <main className="editor-main">
    <div className="intro editor-intro"><div><h1 ref={heading} tabIndex="-1">Make it yours.</h1><p>Choose a background and a photo filter, then keep your finished strip.</p></div><button className="text-button" onClick={onBack}>Back to booth</button></div>
    <div className="editor-layout">
      <section className="editor-preview panel" aria-label="Edited photo strip">
        <div className="editor-preview-heading"><h2>{template.name}</h2><span>{size.width} × {size.height} px</span></div>
        <div className="editor-stage">{output ? <img className="edited-strip" src={output} alt={`${template.name} with ${backgrounds.find(item => item.id === background).name} background and ${photoFilters.find(item => item.id === filter).name} filter`}/> : <p>Preparing your strip…</p>}</div>
        <p className="editor-render-status" role="status" aria-live="polite">{busy ? 'Applying your edits…' : error ? 'Render failed' : 'Ready to download'}</p>
      </section>
      <aside className="editor-controls panel" aria-label="Strip editing controls">
        <div className="editor-options">
        <fieldset><legend>Background design</legend><div className="background-options">{backgrounds.map(item => <button key={item.id} className={`design-option ${background === item.id ? 'selected' : ''}`} aria-pressed={background === item.id} onClick={() => setBackground(item.id)}><span className={`background-swatch swatch-${item.id}`} style={{ backgroundColor: item.color }} aria-hidden="true"/><span>{item.name}</span></button>)}</div></fieldset>
        <fieldset><legend>Photo filter</legend><div className="filter-options">{photoFilters.map(item => <button key={item.id} className={`filter-option ${filter === item.id ? 'selected' : ''}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}><img src={shots[0].url} style={{ filter: item.css }} alt=""/><span>{item.name}</span></button>)}</div></fieldset>
        {error && <div className="editor-error" role="alert"><p>{error}</p><button className="text-button" onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
        </div>
        <div className="editor-actions">{!busy && !error && output ? <a className="button button-dark" href={output} download={`photopix-${template.id}-${background}-${filter}.jpg`}>Download photo strip</a> : <button className="button button-dark" disabled>{busy ? 'Applying edits…' : 'Download unavailable'}</button>}<button className="button button-outline" onClick={onStartOver}>Start over</button></div>
      </aside>
    </div>
  </main>;
}
