import { navigateLink } from '../../lib/navigation.js';
export default function Brand() {
  return (
    <a className="wordmark" href="/" onClick={navigateLink} aria-label="Mentomory home">
      {' '}
      <img
        className="brand-logo"
        src={`${import.meta.env.BASE_URL}mentomory-logo-v4.png`}
        alt="Mentomory"
        width="1200"
        height="320"
      />
    </a>
  );
}
