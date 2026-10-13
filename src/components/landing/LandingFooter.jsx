import Arrow from './LandingArrow.jsx';

export default function LandingFooter() {
  function backToTop(event) {
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }
  return (
    <footer className="landing-footer">
      <div className="landing-footer-bottom">
        <div>
          <span>© {new Date().getFullYear()} Pixbooth</span>
          <span>Photos and clips stay in your browser.</span>
          <a href="#/" onClick={backToTop}>
            Back to top <Arrow />
          </a>
        </div>
      </div>
    </footer>
  );
}
