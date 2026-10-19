import { Fragment, memo } from 'react';

const formats = ['Photo strips', 'Face stickers', '7-second live clips', 'JPG & MP4 downloads'];

function Separator() {
  return (
    <svg
      className="landing-marquee-star"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="m10 0 2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5Z" fill="currentColor" />
    </svg>
  );
}

export default memo(function LandingFormats() {
  return (
    <section className="landing-formats" id="your-formats" aria-label="Available capture formats">
      <div className="landing-formats-inner">
        <div className="landing-marquee-track">
          {[0, 1].map((copy) => (
            <ul
              className="landing-marquee-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {formats.map((format) => (
                <Fragment key={format}>
                  <li>
                    <span>{format}</span>
                  </li>
                  <li className="landing-marquee-separator" aria-hidden="true">
                    <Separator />
                  </li>
                </Fragment>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
});
