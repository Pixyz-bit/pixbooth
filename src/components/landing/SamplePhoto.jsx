const sample = `${import.meta.env.BASE_URL}landing-contact-sheet.webp`;
export default function SamplePhoto({ pose, className = '' }) {
  return (
    <div
      className={`sample-photo pose-${pose} ${className}`}
      style={{
        backgroundImage: `url("${sample}")`,
      }}
    />
  );
}
