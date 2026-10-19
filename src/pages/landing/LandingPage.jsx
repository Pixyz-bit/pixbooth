import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import LandingHero from '../../components/landing/LandingHero.jsx';
import LandingFormats from '../../components/landing/LandingFormats.jsx';
import LandingHowItWorks from '../../components/landing/LandingHowItWorks.jsx';
import LandingDetails from '../../components/landing/LandingDetails.jsx';

export default function LandingPage({ onCapture }) {
  return (
    <main className="landing-main">
      <div className="landing-section-inner">
        <LandingHero onCapture={onCapture} />
      </div>
      <LandingFormats />
      <div className="landing-section-inner">
        <LandingHowItWorks />
      </div>
      <LandingDetails onCapture={onCapture} />
    </main>
  );
}
