import LandingHero from '../../components/landing/LandingHero.jsx';
import LandingFormats from '../../components/landing/LandingFormats.jsx';
import LandingHowItWorks from '../../components/landing/LandingHowItWorks.jsx';
export default function LandingPage({ onCapture }) {
  return (
    <main className="landing-main">
      <LandingHero onCapture={onCapture} />
      <LandingFormats />
      <LandingHowItWorks />
    </main>
  );
}
