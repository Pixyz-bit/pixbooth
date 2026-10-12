import { useEffect, useState } from 'react';
import { loadFrameArtwork } from '../lib/frames/frame-assets.js';

export default function useFrameArtwork(id = 'none') {
  const [artwork, setArtwork] = useState({ id: null, image: null, error: '' });
  useEffect(() => {
    let active = true;
    loadFrameArtwork(id).then(
      (image) => {
        if (active) setArtwork({ id, image, error: '' });
      },
      (error) => {
        if (active) setArtwork({ id, image: null, error: error.message });
      }
    );
    return () => {
      active = false;
    };
  }, [id]);
  return {
    image: artwork.id === id ? artwork.image : null,
    ready: artwork.id === id && !artwork.error,
    error: artwork.id === id ? artwork.error : '',
  };
}
