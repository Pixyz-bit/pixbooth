const links = [
  { name: 'GitHub', href: 'https://github.com/dcd-inc' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61595626853093' },
  { name: 'Instagram', href: 'https://www.instagram.com/dcdstudio.dev/' },
  {
    name: 'Email',
    href: 'mailto:dcd.inc.mail@gmail.com',
  },
];

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === 'GitHub' && (
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        />
      )}
      {name === 'Facebook' && (
        <path
          fill="currentColor"
          d="M14 22v-9h3l.5-4H14V7c0-1.16.32-2 2-2h2V1.4A24 24 0 0 0 15 1c-3 0-5 1.83-5 5.2V9H7v4h3v9Z"
        />
      )}
      {name === 'Instagram' && (
        <g fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
        </g>
      )}
      {name === 'Email' && (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </g>
      )}
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <nav className="footer-socials" aria-label="Social links">
      {links.map(({ name, href }) => (
        <a key={name} href={href} aria-label={name} title={name}>
          <SocialIcon name={name} />
        </a>
      ))}
    </nav>
  );
}
