import Brand from '../common/Brand.jsx';
import Arrow from './LandingArrow.jsx';

function scrollToSection(event, id) {
  event.preventDefault();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reducedMotion ? 'auto' : 'smooth';
  if (id === 'landing-title') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior });
}

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <div className="landing-footer-brand">
          <Brand />
          <p>
            Your browser photo booth.
            <br />
            Capture. Customize. Keep.
          </p>
        </div>
        <nav className="landing-footer-nav" aria-label="Footer">
          <h2>Take a look around.</h2>
          <a href="#/" onClick={(event) => scrollToSection(event, 'your-formats')}>
            Photo formats <Arrow />
          </a>
          <a href="#/" onClick={(event) => scrollToSection(event, 'how-it-works')}>
            How it works <Arrow />
          </a>
          <a href="#/templates">
            Choose a layout <Arrow />
          </a>
        </nav>
        <div className="landing-footer-invitation">
          <h2>
            Make your next
            <br />
            little keepsake.
          </h2>
          <a className="button button-dark landing-footer-capture" href="#/templates">
            Open the booth <Arrow />
          </a>
          <p>No sign-up. Just you and your camera.</p>
        </div>
      </div>
      <div className="landing-footer-bottom">
        <div>
          <span>© {new Date().getFullYear()} Pixbooth</span>
          <span>Photos and clips stay in your browser.</span>
          <a href="#/" onClick={(event) => scrollToSection(event, 'landing-title')}>
            Back to top <Arrow />
          </a>
        </div>
      </div>
    </footer>
  );
}
