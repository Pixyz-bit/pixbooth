export default function EditorIntro({ heading, exporting, onBack }) {
  return (
    <div className="intro editor-intro">
      <div>
        <h1 ref={heading} tabIndex="-1">
          Make it yours.
        </h1>
        <p>Choose your format, color and finishing touches. Keep every moment.</p>
      </div>
      <button className="text-button" disabled={exporting} onClick={onBack}>
        Back to booth
      </button>
    </div>
  );
}
