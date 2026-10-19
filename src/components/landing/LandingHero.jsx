import Brand from '../common/Brand.jsx';
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
          <br className="desktop-break" /> or make a seven-second flipbook.
        </p>
        <button className="button button-dark landing-capture" onClick={capture}>
          Say Cheese :)
        </button>
        <span className="landing-privacy">A few poses. A little keepsake.</span>
      </div>
      <div className="landing-art-stage">
        <LandingShowcase />
      </div>
    </section>
  );
}
