export default function EditorError({ error, exporting, setRetry }) {
  return (
    error && (
      <div className="editor-error" role="alert">
        <p>{error}</p>
        <button
          className="text-button"
          disabled={exporting}
          onClick={() => setRetry((value) => value + 1)}
        >
          Try again
        </button>
      </div>
    )
  );
}
