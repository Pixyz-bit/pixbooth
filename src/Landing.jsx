import Brand from './Brand.jsx';

const sample = `${import.meta.env.BASE_URL}landing-contact-sheet.webp`;
function SamplePhoto({ pose, className = '' }) {
  return <div className={`sample-photo pose-${pose} ${className}`} style={{ backgroundImage: `url("${sample}")` }} />;
}
function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5"/></svg>;
}

export default function Landing({ onCapture }) {
  const capture = () => onCapture('strip-four');
  return <main className="landing-main">
    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="landing-copy">
        <Brand/>
        <h1 id="landing-title" tabIndex="-1">A little booth.<br/>A lot of you.</h1>
        <p>Make a photo strip, wear something silly,<br className="desktop-break"/> or keep five seconds of the moment.</p>
        <button className="button button-dark landing-capture" onClick={capture}>Capture<Arrow/></button>
        <span className="landing-privacy">No sign-up. Just you and your camera.</span>
      </div>
      <figure className="landing-showcase" aria-label="Sample monochrome photobooth captures">
        <div className="showcase-strip" aria-hidden="true">{[0,1,2,3].map(pose=><SamplePhoto key={pose} pose={pose}/>)}<span>pixbooth</span></div>
        <div className="showcase-main" aria-hidden="true"><SamplePhoto pose={0}/><div className="print-caption"><span>GOOD COMPANY.</span><span>pixbooth</span></div></div>
        <div className="showcase-side" aria-hidden="true">
          <div className="showcase-small"><SamplePhoto pose={3}/><span>KEEP THE MOMENT.</span></div>
          <div className="live-note"><svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="11" r="7"/><path d="M8 1h4m-2 6v4l3 2"/></svg><strong>5 seconds.</strong><span>A little movement.<br/>A lot to remember.</span></div>
        </div>
        <figcaption>Illustrative sample captures</figcaption>
      </figure>
    </section>
    <div className="landing-formats" id="your-formats" aria-label="Available capture formats"><span>Photo strips</span><span>Face stickers</span><span>5-second live clips</span><span>JPG &amp; MP4 downloads</span></div>
    <section className="landing-how" id="how-it-works" aria-labelledby="how-title">
      <div><h2 id="how-title">A moment,<br/>in three moves.</h2><p>Photos and clips stay in your browser.</p></div>
      <ol>
        <li><strong>Pick your format.</strong><span>Choose a strip, grid or Polaroid, then switch on your camera.</span></li>
        <li><strong>Make your moment.</strong><span>Strike a pose, try a face sticker, or record five seconds.</span></li>
        <li><strong>Make it yours.</strong><span>Add a background, filter and finishing touches. Download your keepsake.</span></li>
      </ol>
    </section>
  </main>;
}
