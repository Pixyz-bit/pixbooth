import Brand from '../common/Brand.jsx';
import Arrow from './LandingArrow.jsx';
import LandingShowcase from './LandingShowcase.jsx';
export default function LandingHero({ onCapture }) {
  const capture = () => onCapture('strip-four');
  return (
    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="landing-copy">
        <Brand />
        <h1 id="landing-title" tabIndex="-1">
          A little booth.
          <br />A lot of you.
        </h1>
        <p>
          Make a photo strip, wear something silly,
          <br className="desktop-break" /> or keep five seconds of the moment.
        </p>
        <button className="button button-dark landing-capture" onClick={capture}>
          Capture
          <Arrow />
        </button>
        <span className="landing-privacy">No sign-up. Just you and your camera.</span>
      </div>
      <LandingShowcase />
    </section>
  );
}
