export default function Icon({ name, size = 20 }) {
  const images = {
    sticker: 'stickers.png',
    camera: 'camera.png',
    settings: 'settings.png',
    shutter: 'shutter-camera.png',
  };
  if (images[name])
    return (
      <img
        className="provided-icon"
        src={import.meta.env.BASE_URL + 'icons/' + images[name]}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
      />
    );
  const paths = {
    download: (
      <>
        <path d="M10 2v11m-4-4 4 4 4-4M3 13v5h14v-5" />
      </>
    ),
    retake: (
      <>
        <path d="M3 8a7 7 0 1 1 0 5M3 3v5h5" />
      </>
    ),
    mirror: (
      <>
        <path d="M10 2v16M7 5 2 15h5zm6 0 5 10h-5z" />
      </>
    ),
    timer: (
      <>
        <circle cx="10" cy="11" r="7" />
        <path d="M8 1h4m-2 6v4l3 2M15 4l2-2" />
      </>
    ),
    arrow: (
      <>
        <path d="M3 10h14m-5-5 5 5-5 5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
