import { stickers } from '../../lib/stickers/sticker-art.js';
import StickerThumbnail from './StickerThumbnail.jsx';
export default function StickerPicker({ selected, onSelect, disabled }) {
  return (
    <>
      <div className="sticker-browser" tabIndex="0" aria-label="Face sticker collection">
        <div className="sticker-options" role="group" aria-label="Choose a face sticker">
          {stickers.map((item) => (
            <button
              key={item.id}
              className={`sticker-option ${selected === item.id ? 'selected' : ''}`}
              aria-pressed={selected === item.id}
              aria-label={`${item.name} face sticker`}
              disabled={disabled}
              onClick={() => onSelect(item.id)}
            >
              <StickerThumbnail id={item.id} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
