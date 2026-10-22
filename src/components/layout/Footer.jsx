import Brand from '../common/Brand.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function Footer({ showHomeContent = false }) {
  return (
    <footer className="landing-footer">
      {showHomeContent && (
        <div className="landing-footer-top">
          <div className="landing-footer-top-inner">
            <Brand />
            <nav className="footer-navigation" aria-label="Policies">
              <span aria-disabled="true" title="Link coming soon">
                Terms of use
              </span>
              <span aria-disabled="true" title="Link coming soon">
                Privacy policy
              </span>
              <span aria-disabled="true" title="Link coming soon">
                Cookies
              </span>
            </nav>
            <SocialLinks />
          </div>
        </div>
      )}
      <div className="landing-footer-bottom">
        <div>
          <span>© {new Date().getFullYear()} Mentomory</span>
          <span>
            Made by <strong>.dcd</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
