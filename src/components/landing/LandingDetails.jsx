import { navigateLink } from '../../lib/navigation.js';
import './LandingDetails.css';

export default function LandingDetails() {
  return (
    <section className="landing-details" aria-labelledby="about-booth-title">
      <div className="landing-details-intro">
        <h2 id="about-booth-title">Your online photo booth, wherever you are.</h2>
        <p>
          Mentomory turns your browser into a photo booth. Make a classic photo strip, a
          Polaroid-style print or a photo grid, then add frames, face effects and your own caption.
        </p>
        <a className="landing-details-link" href="/templates" onClick={navigateLink}>
          <span>Browse all 21 photo strip layouts.</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </a>
      </div>
      <div className="landing-details-faq">
        <details>
          <summary>How do I make a photo strip?</summary>
          <p>
            Choose a layout, allow camera access and take your photos. In Customize, pick a frame,
            background and filter, then download your finished strip as a JPG.
          </p>
        </details>
        <details>
          <summary>Can I make a live photo strip?</summary>
          <p>
            Yes. Choose Live before capturing to record silent five-second clips. Download your
            composed live strip as an MP4. Recording and export depend on your browser’s codec
            support.
          </p>
        </details>
        <details>
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
