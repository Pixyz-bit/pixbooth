import LayoutOptions from './LayoutOptions.jsx';
import BackgroundOptions from './BackgroundOptions.jsx';
import FilterOptions from './FilterOptions.jsx';
import DecorationOptions from './DecorationOptions.jsx';
import CaptionControl from './CaptionControl.jsx';
import EditorError from './EditorError.jsx';
import FrameOptions from './FrameOptions.jsx';
export default function EditorOptions(props) {
  return (
    <div className="editor-options">
      <LayoutOptions {...props} />
      <FrameOptions {...props} />
      <BackgroundOptions {...props} />
      <FilterOptions {...props} />
      <DecorationOptions {...props} />
      <CaptionControl {...props} />
      <EditorError {...props} />
    </div>
  );
}
