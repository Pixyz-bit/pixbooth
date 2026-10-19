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
  downloadStatus,
  onDownload,
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
          <a
            className="button button-dark"
            href={mp4.url}
            download={`${filename}.mp4`}
            onClick={() => onDownload('mp4')}
          >
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
            onClick={() => onDownload('jpg')}
          >
            {live ? 'Download cover photo' : 'Download photo strip'}
          </a>
        ) : (
          <button className="button button-dark" disabled>
            Applying edits…
          </button>
        ))}
      {live && (
        <p className="download-meta">
          {mp4
            ? 'MP4 · ' + mp4.width + ' × ' + mp4.height + ' px · 7 sec'
            : 'MP4 · 7 sec · up to 1920px on the longest side'}
        </p>
      )}
      {downloadStatus && (
        <p className="download-status" role="status" aria-live="polite">
          {downloadStatus}
        </p>
      )}
      <button className="text-button reset-secondary" disabled={exporting} onClick={onStartOver}>
        Start over
      </button>
    </div>
  );
}
