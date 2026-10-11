import { backgrounds } from '../../data/backgrounds.js';
import { photoFilters } from '../../data/photoFilters.js';
import LiveStripPreview from './LiveStripPreview.jsx';
import { getFrame } from '../../data/frames.js';
export default function EditorPreview({
  layout,
  live,
  size,
  shots,
  options,
  playing,
  output,
  background,
  filter,
  decoration,
  frame,
  exporting,
  setPlaying,
  progress,
  busy,
  error,
  mp4,
}) {
  return (
    <section className="editor-preview panel" aria-label="Edited photo strip">
      <div className="editor-preview-heading">
        <h2>
          {layout.name}
          {live ? ' · Live' : ''}
        </h2>
        <span>
          {size.width} × {size.height} px{live ? ' · 5 sec' : ''}
        </span>
      </div>
      <div className="editor-stage">
        {live ? (
          <LiveStripPreview shots={shots} template={layout} options={options} playing={playing} />
        ) : output ? (
          <img
            className="edited-strip"
            src={output}
            alt={`${layout.name} with ${frame === 'none' ? `${backgrounds.find((item) => item.id === background).name} background` : `${getFrame(frame).name} frame`}, ${photoFilters.find((item) => item.id === filter).name} filter and ${decoration} border stickers`}
          />
        ) : (
          <p>Preparing your strip…</p>
        )}
      </div>
      {live && (
        <button
          className="text-button preview-play"
          disabled={exporting}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? 'Pause preview' : 'Play preview'}
        </button>
      )}
      <p className="editor-render-status" role="status" aria-live="polite">
        {exporting
          ? `Creating MP4 · ${Math.round(progress * 100)}%`
          : busy
            ? 'Applying your edits…'
            : error
              ? 'Check the message beside your controls'
              : mp4
                ? `MP4 ready · ${mp4.width} × ${mp4.height} px`
                : 'Ready to download'}
      </p>
    </section>
  );
}
