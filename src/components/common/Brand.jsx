import { navigateLink } from '../../lib/navigation.js';
export default function Brand() {
  return (
<a
  className="wordmark"
  href="/"
  onClick={navigateLink}
  aria-label="Pixbooth home"
>      <img
        className="brand-logo"
        src={`${import.meta.env.BASE_URL}pixbooth-logo.png`}
        alt="Pixbooth"
        width="1581"
        height="655"
      />
    </a>
  );
}
