const steps = [
  {
    title: 'Pick your format.',
    description: 'Choose a strip, grid or Polaroid, then switch on your camera.',
    image: '/how-it-works/pick-your-format.png',
  },
  {
    title: 'Make your moment.',
    description: 'Strike a pose, try a face sticker, or record five seconds.',
    image: '/how-it-works/make-your-moment.png',
  },
  {
    title: 'Make it yours.',
    description: 'Add a background, filter and finishing touches. Download your keepsake.',
    image: '/how-it-works/make-it-yours.png',
  },
];

export default function LandingHowItWorks() {
  return (
    <section className="landing-how" id="how-it-works" aria-labelledby="how-title">
      <header className="landing-how-heading">
        <h2 id="how-title">A moment, in three moves.</h2>
        <p>Photos and clips stay in your browser.</p>
      </header>
      <ol className="landing-how-steps">
        {steps.map((step, index) => (
          <li className="landing-how-step" key={step.title}>
            <div className="landing-how-artwork" aria-hidden="true">
              <img
                src={step.image}
                alt=""
                loading="lazy"
                decoding="async"
                width="1536"
                height="1024"
              />
            </div>
            <h3>
              <span className="landing-how-number" aria-hidden="true">
                {index + 1}
              </span>
              {step.title}
            </h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
