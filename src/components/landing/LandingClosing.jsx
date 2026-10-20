import SamplePhoto from './SamplePhoto.jsx';
import './LandingClosing.css';

export default function LandingClosing({ onCapture }) {
  return (
    <section className="landing-closing" aria-labelledby="landing-closing-title">
      <div className="landing-closing-inner">
        <figure className="landing-closing-keepsakes" aria-label="Sample photo strip and print">
          <div className="landing-closing-prints" aria-hidden="true">
            <div className="landing-closing-strip">
              {[1, 2, 3].map((pose) => (
                <SamplePhoto key={pose} pose={pose} />
              ))}
              <span>mentomory</span>
            </div>
            <div className="landing-closing-print">
              <SamplePhoto pose={0} />
              <span>Your keepsake</span>
            </div>
          </div>
          <figcaption>Illustrative sample captures</figcaption>
        </figure>
        <div className="landing-closing-copy">
          <h2 id="landing-closing-title">Ready to make a memory?</h2>
          <p>Turn a little moment into something to keep.</p>
          <button
            className="button button-dark landing-capture landing-closing-action"
            type="button"
            onClick={() => onCapture('strip-four')}
          >
            <span>Capture the moment</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
