export function jeelizFailureNotice(error) {
  const message = String(error?.message || error || 'Unknown initialization error').trim();
  let reason;
  if (message.includes('GL_INCOMPATIBLE'))
    reason = 'Browser graphics support could not initialize (GL_INCOMPATIBLE).';
  else if (message.includes('GLCONTEXT_LOST'))
    reason = 'The browser lost its graphics context (GLCONTEXT_LOST).';
  else if (message.includes('ALREADY_INITIALIZED'))
    reason = 'An earlier Jeeliz session is still initialized.';
  else if (/WEBCAM_UNAVAILABLE|Camera is not ready|Camera frames were unavailable/i.test(message))
    reason = 'Jeeliz could not read the camera frames.';
  else if (/timed out/i.test(message)) reason = 'Jeeliz took too long to start.';
  else if (/fetch|import|module|network/i.test(message))
    reason = 'The Jeeliz tracking script or model could not load.';
  else reason = 'Jeeliz could not start (' + message.slice(0, 120) + ').';
  return reason + ' Using MediaPipe instead.';
}
