import { useEffect, useRef } from 'react';
import { drawMotif } from '../../lib/collage.js';
export default function MotifPreview({ motif }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = ref.current.getContext('2d');
    ctx.clearRect(0, 0, 64, 64);
    if (motif.id === 'none') {
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(32, 32, 18, 0, Math.PI * 2);
      ctx.moveTo(19, 19);
      ctx.lineTo(45, 45);
      ctx.stroke();
    } else drawMotif(ctx, motif.id, 32, 30, 21, motif.color);
  }, [motif]);
  return <canvas className="motif-preview" ref={ref} width="64" height="64" aria-hidden="true" />;
}
