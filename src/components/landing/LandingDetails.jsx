import { navigateLink } from '../../lib/navigation.js';
import './LandingDetails.css';

export default function LandingDetails({ onCapture }) {
  return (
    <section className="landing-details" aria-labelledby="about-booth-title" tabIndex={0}>
      <div className="landing-details-intro">
        <h2 id="about-booth-title">Your online photo booth, wherever you are.</h2>
        <p>
          Mentomory turns your browser into a photo booth. Make a classic photo strip, a
          Polaroid-style print, a photo grid or a flipbook-style live strip, then add frames, face
          effects and your own caption.
        </p>
        <button
          className="button button-dark landing-capture landing-details-action"
          type="button"
          onClick={() => onCapture('strip-four')}
        >
          <span>Let’s make memories</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="landing-details-faq">
        <details name="landing-faq">
          <summary>How do I make a photo strip?</summary>
          <p>
            <a href="/templates" onClick={navigateLink}>
              Choose a layout
            </a>
            , allow camera access and take your photos. In Customize, pick a frame, background and
            filter, then download your finished strip as a JPG.
          </p>
        </details>
        <details name="landing-faq">
          <summary>Can I make a flipbook?</summary>
          <p>
            Yes. Choose Live to capture a silent seven-second flipbook-style clip. Customize your
            strip, then download it as an MP4. Recording and export depend on your browser’s codec
            support.
          </p>
        </details>
        <details name="landing-faq">
          <summary>Where are my photos stored?</summary>
          <p>
            Your captures and edits stay in your browser session. Mentomory does not upload them to
            a photo storage service. Download anything you want to keep before reloading or closing
            the page.
          </p>
        </details>
      </div>
    </section>
  );
}
