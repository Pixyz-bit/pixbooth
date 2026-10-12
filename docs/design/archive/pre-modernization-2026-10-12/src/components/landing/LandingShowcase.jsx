import SamplePhoto from './SamplePhoto.jsx';
export default function LandingShowcase() {
  return (
    <figure className="landing-showcase" aria-label="Sample monochrome photobooth captures">
      <div className="showcase-strip" aria-hidden="true">
        {[0, 1, 2, 3].map((pose) => (
          <SamplePhoto key={pose} pose={pose} />
        ))}
        <span>pixbooth</span>
      </div>
      <div className="showcase-main" aria-hidden="true">
        <SamplePhoto pose={0} />
        <div className="print-caption">
          <span>GOOD COMPANY.</span>
          <span>pixbooth</span>
        </div>
      </div>
      <div className="showcase-side" aria-hidden="true">
        <div className="showcase-small">
          <SamplePhoto pose={3} />
          <span>KEEP THE MOMENT.</span>
        </div>
        <div className="live-note">
          <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="10" cy="11" r="7" />
            <path d="M8 1h4m-2 6v4l3 2" />
          </svg>
          <strong>5 seconds.</strong>
          <span>
            A little movement.
            <br />A lot to remember.
          </span>
        </div>
      </div>
      <figcaption>Illustrative sample captures</figcaption>
    </figure>
  );
}
