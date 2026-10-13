import { useEffect, useRef, useState } from 'react';
import { templates } from '../data/templates.js';
import { supportsMp4 } from '../lib/media/live-media.js';
import { useFaceStickers } from './useFaceStickers.js';
import useCamera from './useCamera.js';
import usePhotoCapture from './usePhotoCapture.js';
import useWorkflow from './useWorkflow.js';

// Session ownership stays above the pages so breadcrumb navigation retains captures.
export default function useBoothSession() {
  const video = useRef(null);
  const overlay = useRef(null);
  const stream = useRef(null);
  const requestId = useRef(0);
  const timer = useRef(null);
  const sequence = useRef(false);
  const [autoCapture, setAutoCapture] = useState(false);
  const [redoRequested, setRedoRequested] = useState(false);
  const shotUrls = useRef([]);
  const recording = useRef(null);
  const [shots, setShots] = useState([]);
  const [retakeIndex, setRetakeIndex] = useState(null);
  const [templateId, setTemplateId] = useState('strip-four');
  const [layoutChosen, setLayoutChosen] = useState(false);
  const [editorSettings, setEditorSettings] = useState(null);
  const template = templates.find((item) => item.id === templateId);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [mirror, setMirror] = useState(true);
  const [selectedDelay, setSelectedDelay] = useState(3);
  const delay = [0, 3, 5].includes(selectedDelay) ? selectedDelay : 3;
  const setDelay = (value) => setSelectedDelay([0, 3, 5].includes(value) ? value : 3);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [sticker, setSticker] = useState('none');
  const [mode, setMode] = useState('photo');
  const [mp4Supported, setMp4Supported] = useState(null);
  const [recordProgress, setRecordProgress] = useState(0);
  const completed = shots.length === template.count && retakeIndex === null;
  const cameraActive =
    ['ready', 'recording'].includes(status) || (status === 'saving' && !completed);
  const { releaseCamera, openCamera, stopCamera } = useCamera({
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
  });
  const { page, setPage } = useWorkflow({
    completed,
    layoutChosen,
    onLeaveCapture() {
      requestId.current++;
      recording.current?.abort();
      cancelCountdown();
      releaseCamera();
      setFlash(false);
      setRecordProgress(0);
      setStatus(completed ? 'review' : 'idle');
    },
  });
  const face = useFaceStickers(video, overlay, cameraActive && page === 'booth', sticker);
  const stickerReady = sticker === 'none' || face.state === 'tracking';
  useEffect(() => {
    if (page !== 'booth') return;
    let cancelled = false;
    supportsMp4().then((value) => {
      if (!cancelled) setMp4Supported(value);
    });
    return () => {
      cancelled = true;
    };
  }, [page]);
  function cancelCountdown() {
    sequence.current = false;
    setAutoCapture(false);
    setRedoRequested(false);
    clearInterval(timer.current);
    timer.current = null;
    setCountdown(null);
  }
  const { takePhoto } = usePhotoCapture({
    video,
    stream,
    requestId,
    recording,
    shotUrls,
    timer,
    shots,
    sequence,
    setAutoCapture,
    template,
    mode,
    mirror,
    delay,
    sticker,
    face,
    retakeIndex,
    setRetakeIndex,
    status,
    countdown,
    completed,
    cancelCountdown,
    releaseCamera,
    setError,
    setStatus,
    setRecordProgress,
    setShots,
    setFlash,
    setCountdown,
  });
  useEffect(() => {
    if (!redoRequested) return;
    if (error || page !== 'booth') {
      setRedoRequested(false);
      return;
    }
    if (status === 'ready' && stickerReady) {
      setRedoRequested(false);
      takePhoto();
    }
  }, [redoRequested, status, stickerReady, error, page]);
  function redoAll() {
    if (busy || redoRequested) return;
    requestId.current++;
    recording.current?.abort();
    cancelCountdown();
    releaseCamera();
    shotUrls.current.forEach((url) => URL.revokeObjectURL(url));
    shotUrls.current = [];
    setShots([]);
    setRetakeIndex(null);
    setEditorSettings(null);
    setFlash(false);
    setError('');
    setRecordProgress(0);
    openCamera(deviceId);
    setRedoRequested(true);
  }
  function retake() {
    requestId.current++;
    recording.current?.abort();
    cancelCountdown();
    releaseCamera();
    location.hash = '/templates';
    setPage('templates');
    setLayoutChosen(false);
    shotUrls.current.forEach((url) => URL.revokeObjectURL(url));
    shotUrls.current = [];
    setShots([]);
    setRetakeIndex(null);
    setEditorSettings(null);
    setStatus('idle');
    setFlash(false);
    setError('');
    setRecordProgress(0);
  }
  function retakePhoto(index) {
    if (busy || !shots[index]) return;
    cancelCountdown();
    setRetakeIndex(index);
    setError('');
    if (stream.current?.active) setStatus('ready');
    else openCamera(deviceId);
  }
  function cancelRetake() {
    if (busy) return;
    releaseCamera();
    setRetakeIndex(null);
    setError('');
    setStatus(shots.length === template.count ? 'review' : 'idle');
  }
  const busy =
    autoCapture || countdown !== null || ['loading', 'saving', 'recording'].includes(status);
  const reviewing = status === 'review';
  const templateLocked = busy || shots.length > 0;
  return {
    shots,
    autoCapture,
    redoRequested,
    redoAll,
    retakeIndex,
    retakePhoto,
    cancelRetake,
    template,
    templateId,
    setTemplateId,
    layoutChosen,
    setLayoutChosen,
    editorSettings,
    setEditorSettings,
    status,
    error,
    devices,
    deviceId,
    mirror,
    setMirror,
    delay,
    setDelay,
    countdown,
    flash,
    sticker,
    setSticker,
    page,
    mode,
    setMode,
    mp4Supported,
    recordProgress,
    completed,
    cameraActive,
    face,
    stickerReady,
    video,
    overlay,
    busy,
    reviewing,
    templateLocked,
    openCamera,
    stopCamera,
    cancelCountdown,
    takePhoto,
    retake,
  };
}
