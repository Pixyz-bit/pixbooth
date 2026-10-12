export default function cameraError(error) {
  if (['NotAllowedError', 'SecurityError'].includes(error.name))
    return 'Camera access was blocked. Allow camera access in your browser’s site settings, then try again.';
  if (error.name === 'NotFoundError')
    return 'No camera found. Connect a webcam or try a device with a camera.';
  if (error.name === 'NotReadableError')
    return 'Your camera couldn’t start. Close other apps using it, then try again.';
  return 'We couldn’t open your camera. Check your connection and browser camera settings, then try again.';
}
