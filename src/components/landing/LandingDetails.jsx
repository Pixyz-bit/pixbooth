import { navigateLink } from '../../lib/navigation.js';
import Brand from '../common/Brand.jsx';
import './LandingDetails.css';

export default function LandingDetails() {
  return (
    <section className="landing-details" aria-labelledby="about-booth-title">
      <div className="landing-details-intro">
        <Brand />
        <h2 id="about-booth-title">Your online photo booth, wherever you are.</h2>
        <p>
          Mentomory turns your browser into a photo booth. Make a classic photo strip, a
          Polaroid-style print, a photo grid or a flipbook-style live strip, then add frames, face
          effects and your own caption.
        </p>
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
          <summary>Can I customize my photo strip?</summary>
          <p>
            Yes. In Customize, choose a frame, background and filter, then add your own caption
            before downloading your finished strip.
          </p>
        </details>
        <details name="landing-faq">
          <summary>Why isn’t my camera working?</summary>
          <p>
            Allow camera access in your browser’s site settings, then try again. If your camera
            still won’t start, close other apps using it and check that a camera is connected.
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
