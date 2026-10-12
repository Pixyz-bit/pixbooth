// Jeeliz supplies a face pose, not MediaPipe landmarks. Estimate only the five
// anchors used by our 2D artwork, in unmirrored source-video coordinates.
export function jeelizStickerPoints(pose, width, height) {
  if (!pose || !width || !height) return null;
  if (![pose.x, pose.y, pose.s, pose.rx, pose.ry, pose.rz].every(Number.isFinite)) return null;
  if (pose.s <= 0) return null;
  const faceSize = pose.s * width;
  const cx = ((pose.x + 1) / 2) * width;
  const cy = ((1 - pose.y) / 2) * height;
  const angle = -pose.rz;
  const cos = Math.cos(angle),
    sin = Math.sin(angle);
  const yaw = Math.sin(pose.ry),
    pitch = Math.sin(pose.rx);
  const eyeWidth = Math.max(0.28, 0.56 * Math.cos(pose.ry));
  const anchor = (x, y) => ({
    x: (cx + faceSize * (x * cos - y * sin)) / width,
    y: (cy + faceSize * (x * sin + y * cos)) / height,
  });
  return {
    33: anchor(-eyeWidth / 2, -0.12 + pitch * 0.08),
    263: anchor(eyeWidth / 2, -0.12 + pitch * 0.08),
    10: anchor(yaw * 0.03, -0.48 + pitch * 0.12),
    1: anchor(yaw * 0.16, 0.12 + pitch * 0.12),
    13: anchor(yaw * 0.1, 0.3 + pitch * 0.08),
  };
}

// Hysteresis avoids flickering at the acquisition threshold.
export function jeelizFacePresent(confidence, alreadyTracking) {
  return Number.isFinite(confidence) && confidence >= (alreadyTracking ? 0.6 : 0.8);
}
