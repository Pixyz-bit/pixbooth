import { useEffect } from 'react';
import cameraError from '../lib/cameraError.js';
import posthog, { posthogEnabled } from '../lib/posthog.js';
import { logPosthogInfo } from '../lib/posthogLogger.js';
export default function useCamera({
  video,
  stream,
  requestId,
  recording,
  cancelCountdown,
  setError,
  setStatus,
  setDeviceId,
  setDevices,
  setRecordProgress,
}) {
  function releaseCamera() {
    if (stream.current) stream.current.getTracks().forEach((track) => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
  }
  async function openCamera(selected = '') {
    const id = ++requestId.current;
    cancelCountdown();
    releaseCamera();
    setError('');
    setStatus('loading');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        'Camera access requires HTTPS or localhost and a supported browser. Open Pixbooth through a secure address.'
      );
      setStatus('idle');
      return;
    }
    try {
      const next = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: selected
          ? {
              deviceId: {
                exact: selected,
              },
              width: {
                ideal: 1920,
              },
              height: {
                ideal: 1440,
              },
            }
          : {
              facingMode: 'user',
              width: {
                ideal: 1920,
              },
              height: {
                ideal: 1440,
              },
            },
      });
      if (id !== requestId.current) {
        next.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = next;
      const track = next.getVideoTracks()[0];
      track.onended = () => {
        if (stream.current !== next) return;
        requestId.current++;
        recording.current?.abort();
        cancelCountdown();
        releaseCamera();
        setStatus('idle');
        setError('The camera disconnected. Reconnect it and enable the camera again.');
      };
      setDeviceId(track.getSettings().deviceId || selected);
      if (!video.current) await new Promise((resolve) => requestAnimationFrame(resolve));
      if (id !== requestId.current || !video.current) {
        next.getTracks().forEach((track) => track.stop());
        return;
      }
      video.current.srcObject = next;
      await video.current.play();
      if (id !== requestId.current) return;
      if (posthogEnabled) posthog.capture('camera_enabled');
      logPosthogInfo('camera ready', { media_mode: 'camera' });
      setStatus('ready');
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        if (id === requestId.current) setDevices(all.filter((item) => item.kind === 'videoinput'));
      } catch {
        /* Capture remains available if camera enumeration is unsupported. */
      }
    } catch (err) {
      if (id !== requestId.current) return;
      releaseCamera();
      setStatus('idle');
      setError(cameraError(err));
    }
  }
  function stopCamera() {
    requestId.current++;
    recording.current?.abort();
    cancelCountdown();
    releaseCamera();
    setStatus('idle');
    setRecordProgress(0);
  }
  useEffect(() => {
    const visibility = () => {
      if (document.hidden && recording.current) {
        stopCamera();
        setError(
          'Live recording was cancelled when the tab was hidden. Keep this tab open and try again.'
        );
      }
    };
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  return {
    releaseCamera,
    openCamera,
    stopCamera,
  };
}
