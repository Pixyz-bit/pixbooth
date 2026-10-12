export function replaceCapturedShot(shots, shot, index = null) {
  if (index === null) return [...shots, shot];
  if (!Number.isInteger(index) || index < 0 || index >= shots.length)
    throw new RangeError('Invalid retake position');
  return shots.map((existing, position) => (position === index ? shot : existing));
}
