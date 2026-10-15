import { useId, useState } from 'react';
import LayoutOptions from './LayoutOptions.jsx';
import BackgroundOptions from './BackgroundOptions.jsx';
import FilterOptions from './FilterOptions.jsx';
import DecorationOptions from './DecorationOptions.jsx';
import CaptionControl from './CaptionControl.jsx';
import EditorError from './EditorError.jsx';
import FrameOptions from './FrameOptions.jsx';
const tools = [
  { id: 'frames', label: 'Frames', Component: FrameOptions },
  { id: 'backgrounds', label: 'Backgrounds', Component: BackgroundOptions },
  { id: 'filters', label: 'Filters', Component: FilterOptions },
  { id: 'text', label: 'Text', Component: CaptionControl },
  { id: 'stickers', label: 'Stickers', Component: DecorationOptions },
  { id: 'layout', label: 'Layout', Component: LayoutOptions },
];
export default function EditorOptions(props) {
  const [active, setActive] = useState('frames'),
    id = useId();
  function navigate(event, index) {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tools.length;
    else if (event.key === 'ArrowLeft') target = (index + tools.length - 1) % tools.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tools.length - 1;
    else return;
    event.preventDefault();
    setActive(tools[target].id);
    event.currentTarget.parentElement.children[target].focus();
  }
  return (
    <div className="editor-options">
      <div className="editor-tabs" role="tablist" aria-label="Customization tools">
        {tools.map((tool, index) => (
          <button
            key={tool.id}
            id={id + '-tab-' + tool.id}
            role="tab"
            aria-selected={active === tool.id}
            aria-controls={id + '-panel-' + tool.id}
            tabIndex={active === tool.id ? 0 : -1}
            onClick={() => setActive(tool.id)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {tool.label}
          </button>
        ))}
      </div>
      {tools.map(({ id: toolId, label, Component }) => (
        <section
          className="editor-tool-panel"
          key={toolId}
          id={id + '-panel-' + toolId}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={id + '-tab-' + toolId}
          hidden={active !== toolId}
        >
          <h2>{label}</h2>
          {active === toolId && <Component {...props} />}{' '}
          {active === toolId && toolId === 'layout' && props.available.length === 1 && (
            <p>This is the available layout for your capture count.</p>
          )}
        </section>
      ))}
      <EditorError {...props} />
    </div>
  );
}
