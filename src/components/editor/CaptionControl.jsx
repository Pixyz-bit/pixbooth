export default function CaptionControl({ caption, exporting, setCaption }) {
  return (
    <label className="caption-control">
      Strip caption
      <input
        value={caption}
        maxLength="32"
        disabled={exporting}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="mentomory"
      />
      <span>{caption.length} / 32 characters</span>
    </label>
  );
}
