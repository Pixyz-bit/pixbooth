export default function EditorActions({
  live,
  exporting,
  progress,
  abort,
  mp4,
  filename,
  busy,
  error,
  output,
  exportVideo,
  onStartOver,
}) {
  return (
    <div className="editor-actions">
      {live &&
        (exporting ? (
          <>
            <progress value={progress} max="1" aria-label="MP4 export progress" />
            <button className="button button-outline" onClick={() => abort.current?.abort()}>
              Cancel export
            </button>
          </>
        ) : mp4 ? (
          <a className="button button-dark" href={mp4.url} download={`${filename}.mp4`}>
            Download live strip · MP4
          </a>
        ) : (
          <button className="button button-dark" disabled={busy || !!error} onClick={exportVideo}>
            Create live strip · MP4
          </button>
        ))}
      {!exporting &&
        (!busy && !error && output ? (
          <a
            className={`button ${live ? 'button-outline' : 'button-dark'}`}
            href={output}
            download={`${filename}.jpg`}
          >
            {live ? 'Download cover photo' : 'Download photo strip'}
          </a>
        ) : (
          <button className="button button-dark" disabled>
            Applying edits…
          </button>
        ))}
      <button className="button button-outline" disabled={exporting} onClick={onStartOver}>
        Start over
      </button>
    </div>
  );
}
