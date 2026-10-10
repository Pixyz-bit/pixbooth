import { useEffect, useRef, useState } from 'react';
import { templates } from './collage.js';
import { Chevron, TemplateMini } from './BoothParts.jsx';
import StickerPicker from './StickerPicker.jsx';
import StripEditor from './StripEditor.jsx';
import { drawSticker } from './face-stickers.js';
import { useFaceStickers } from './useFaceStickers.js';

function Icon({ name, size = 20 }) {
  const paths = {
    camera: <><path d="M14.5 5 13 3H7L5.5 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><circle cx="10" cy="12" r="4"/></>,
    download: <><path d="M10 2v11m-4-4 4 4 4-4M3 13v5h14v-5"/></>,
    retake: <><path d="M3 8a7 7 0 1 1 0 5M3 3v5h5"/></>,
    mirror: <><path d="M10 2v16M7 5 2 15h5zm6 0 5 10h-5z"/></>,
    timer: <><circle cx="10" cy="11" r="7"/><path d="M8 1h4m-2 6v4l3 2M15 4l2-2"/></>,
    arrow: <><path d="M3 10h14m-5-5 5 5-5 5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function cameraError(error) {
  if (['NotAllowedError', 'SecurityError'].includes(error.name)) return 'Camera access was blocked. Allow camera access in your browser’s site settings, then try again.';
  if (error.name === 'NotFoundError') return 'No camera found. Connect a webcam or try a device with a camera.';
  if (error.name === 'NotReadableError') return 'Your camera couldn’t start. Close other apps using it, then try again.';
  return 'We couldn’t open your camera. Check your connection and browser camera settings, then try again.';
}

export default function App() {
  const video = useRef(null);
  const overlay = useRef(null);
  const stream = useRef(null);
  const requestId = useRef(0);
  const timer = useRef(null);
  const shotUrls = useRef([]);
  const [shots, setShots] = useState([]);
  const [templateId, setTemplateId] = useState('strip-four');
  const template = templates.find(item => item.id === templateId);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [mirror, setMirror] = useState(true);
  const [delay, setDelay] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [sticker, setSticker] = useState('none');
  const [page, setPage] = useState('booth');
  const completed = shots.length === template.count;
  const cameraActive = status === 'ready' || status === 'saving' && !completed;
  const face = useFaceStickers(video, overlay, cameraActive && page === 'booth', sticker);
  const stickerReady = sticker === 'none' || face.state === 'tracking';

  useEffect(() => {
    function route() { setPage(location.hash === '#/edit' && completed ? 'editor' : 'booth'); }
    route(); window.addEventListener('hashchange', route);
    if (!completed && location.hash === '#/edit') history.replaceState(null, '', location.pathname + location.search);
    return () => window.removeEventListener('hashchange', route);
  }, [completed]);

  function releaseCamera() {
    if (stream.current) stream.current.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
  }

  function cancelCountdown() {
    clearInterval(timer.current);
    timer.current = null;
    setCountdown(null);
  }

  useEffect(() => () => {
    requestId.current++;
    clearInterval(timer.current);
    if (stream.current) stream.current.getTracks().forEach(track => track.stop());
    shotUrls.current.forEach(url => URL.revokeObjectURL(url));
  }, []);

  async function openCamera(selected = '') {
    const id = ++requestId.current;
    cancelCountdown();
    releaseCamera();
    setError('');
    setStatus('loading');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access requires HTTPS or localhost and a supported browser. Open PhotoPix through a secure address.');
      setStatus('idle');
      return;
    }
    try {
      const next = await navigator.mediaDevices.getUserMedia({ audio: false, video: selected ? { deviceId: { exact: selected }, width: { ideal: 1920 }, height: { ideal: 1440 } } : { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1440 } } });
      if (id !== requestId.current) { next.getTracks().forEach(track => track.stop()); return; }
      stream.current = next;
      const track = next.getVideoTracks()[0];
      track.onended = () => {
        if (stream.current !== next) return;
        requestId.current++;
        cancelCountdown(); releaseCamera(); setStatus('idle');
        setError('The camera disconnected. Reconnect it and enable the camera again.');
      };
      setDeviceId(track.getSettings().deviceId || selected);
      if (!video.current) await new Promise(resolve => requestAnimationFrame(resolve));
      if (id !== requestId.current || !video.current) { next.getTracks().forEach(track => track.stop()); return; }
      video.current.srcObject = next;
      await video.current.play();
      if (id !== requestId.current) return;
      setStatus('ready');
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        if (id === requestId.current) setDevices(all.filter(item => item.kind === 'videoinput'));
      } catch { /* Capture remains available if camera enumeration is unsupported. */ }
    } catch (err) {
      if (id !== requestId.current) return;
      releaseCamera(); setStatus('idle'); setError(cameraError(err));
    }
  }

  function stopCamera() {
    requestId.current++; cancelCountdown(); releaseCamera(); setStatus('idle');
  }

  async function capture() {
    cancelCountdown();
    const id = requestId.current;
    const source = video.current;
    if (!source?.videoWidth || source.readyState < 2 || !stream.current?.active) {
      setError('The camera isn’t ready yet. Wait a moment, then take your photo again.');
      return;
    }
    setStatus('saving');
    let stickerPoints = null;
    if (sticker !== 'none') {
      const deadline = performance.now() + 1500;
      const fresh = () => face.latest.current && performance.now() - face.latest.current.timestamp < 600;
      while (!fresh() && performance.now() < deadline && id === requestId.current) {
        await new Promise(resolve => setTimeout(resolve, 40));
      }
      if (id !== requestId.current) return;
      if (!fresh()) {
        setStatus('ready'); setError('Face tracking lost your face. Face the camera and try again, or select None under Face stickers.'); return;
      }
      stickerPoints = face.latest.current.points;
    }
    const canvas = document.createElement('canvas');
    canvas.width = source.videoWidth;
    canvas.height = source.videoHeight;
    const ctx = canvas.getContext('2d');
    if (mirror) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(source, 0, 0);
    if (stickerPoints) drawSticker(ctx, stickerPoints, canvas.width, canvas.height, sticker);
    setFlash(true);
    canvas.toBlob(blob => {
      if (id !== requestId.current) return;
      setFlash(false);
      if (!blob) { setError('The photo couldn’t be saved. Please try again.'); setStatus('ready'); return; }
      const url = URL.createObjectURL(blob);
      shotUrls.current.push(url);
      const nextShots = [...shots, { url, width: canvas.width, height: canvas.height }];
      setShots(nextShots);
      if (nextShots.length < template.count) { setStatus('ready'); return; }
      releaseCamera();
      setStatus('review');
    }, 'image/jpeg', 0.95);
  }

  function takePhoto() {
    setError('');
    if (delay === 0) { capture(); return; }
    let remaining = delay;
    setCountdown(remaining);
    timer.current = setInterval(() => {
      remaining--;
      if (remaining === 0) capture();
      else setCountdown(remaining);
    }, 1000);
  }

  function retake() {
    location.hash = '/'; setPage('booth');
    shotUrls.current.forEach(url => URL.revokeObjectURL(url));
    shotUrls.current = [];
    setShots([]); openCamera(deviceId);
  }

  const busy = countdown !== null || status === 'loading' || status === 'saving';
  const reviewing = status === 'review';

  const templateLocked = busy || shots.length > 0;

  return <div className="app">
    {page === 'editor' && completed ? <StripEditor shots={shots} template={template} onBack={() => { location.hash = '/'; }} onStartOver={retake}/> : <main>
      <div className="intro"><div><h1>Your moment. Your layout.</h1><p>Capture your photos here. Format your strip after Submit.</p></div></div>
      <div className="booth-layout">
        <div className="sidebar-column">
        <details className="template-rail panel" aria-label="Grid templates" open>
          <summary><span>Grid templates</span><Chevron/></summary>
          <div className="template-content">
          <div className="template-list" role="group" aria-label="Choose a photo layout">
            {templates.map(item => <button key={item.id} className={templateId === item.id ? 'template-button selected' : 'template-button'} aria-pressed={templateId === item.id} disabled={templateLocked} onClick={() => setTemplateId(item.id)} aria-label={`${item.name}, ${item.count} ${item.count === 1 ? 'photo' : 'photos'}`}>
              <TemplateMini template={item}/>
              <span className="template-name">{item.name}</span>
              {templateId === item.id && <svg className="selected-mark" aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 8 3 3 7-7"/></svg>}
            </button>)}
          </div>
          <p className="rail-note">{shots.length > 0 ? 'Start a new session to change layout.' : 'Choose your layout before the first shot.'}</p>
          </div>
        </details>
        <details className="sticker-panel panel" open><summary><span>Face stickers</span><Chevron/></summary>
          <div className="sticker-content"><StickerPicker selected={sticker} onSelect={setSticker} disabled={busy || completed}/>
          <p className="sticker-status" role="status" aria-live="polite">{sticker === 'none' ? 'Choose a sticker to wear in your photos.' : !cameraActive ? 'Switch on the camera to use your sticker.' : face.state === 'loading' ? 'Loading face tracking…' : face.state === 'tracking' ? 'Face found. Your sticker is ready.' : face.state === 'error' ? 'Face tracking couldn’t load. Retry or choose None.' : 'Face the camera to place your sticker.'}</p>
          {face.state === 'error' && <button className="text-button" onClick={face.retry}>Retry face tracking</button>}</div>
        </details>
        </div>
        <div className="camera-column">
          <section className="booth" aria-label="Photo booth">
            <div className="booth-brand"><a className="wordmark" href="./" aria-label="PhotoPix home"><span className="brand-icon"><Icon name="camera" size={23}/></span>PhotoPix<span className="brand-dot">.</span></a></div>
            <div className="booth-bar"><h2 className="panel-title">Camera preview</h2><div className="camera-control"><span className="camera-toggle-label">{status === 'loading' ? 'Connecting…' : status === 'ready' || status === 'saving' && !completed ? 'Camera on' : 'Camera off'}</span><button className={`switch ${status === 'ready' || status === 'saving' && !completed ? 'on' : ''}`} role="switch" aria-label="Camera" aria-checked={status === 'ready' || status === 'saving' && !completed} disabled={status === 'saving' || completed} title={completed ? 'Start a new session to use the camera again' : status === 'loading' ? 'Cancel camera connection' : undefined} onClick={() => status === 'ready' || status === 'loading' ? stopCamera() : openCamera(deviceId)}><span/></button></div></div>
            <div className={`viewfinder ${flash ? 'flash' : ''}`}>
              <video ref={video} autoPlay muted playsInline className={`${mirror ? 'mirrored' : ''} ${status === 'ready' || status === 'saving' && !completed ? '' : 'hidden'}`} aria-label="Live webcam preview"/>
              <canvas ref={overlay} className={`face-overlay ${mirror ? 'mirrored' : ''} ${cameraActive ? '' : 'hidden'}`} aria-hidden="true"/>
              {completed && <img className="captured-photo" src={shots.at(-1).url} alt="Your last captured photo"/>}
              {!completed && (status === 'idle' || status === 'loading') && <div className="camera-placeholder"><div className="camera-outline"><Icon name="camera" size={44}/></div><h2>{status === 'loading' ? 'Just a moment…' : 'Ready when you are.'}</h2><p>{status === 'loading' ? 'Allow camera access when your browser asks.' : 'Switch on the camera above to get started.'}</p></div>}
              <span className="corner top-left"/><span className="corner top-right"/><span className="corner bottom-left"/><span className="corner bottom-right"/>
              {countdown !== null && <div className="countdown" role="status" aria-live="assertive" aria-atomic="true" key={countdown}>{countdown}</div>}
            </div>
            <div className="booth-bottom"><span>{completed ? 'All your moments, ready to keep.' : countdown !== null ? 'Hold that pose…' : `Photo ${shots.length + 1} of ${template.count} · Full frame, no cropping`}</span></div>
          </section>
            {countdown !== null ? <button className="button button-dark shutter-button" onClick={cancelCountdown}>Cancel countdown</button> : completed ? <div className="completion-actions"><button className="button button-outline" disabled={busy} onClick={retake}><Icon name="retake"/>Start over</button><button className="button button-dark" disabled={busy} onClick={() => { location.hash = '/edit'; }} >Submit<Icon name="arrow"/></button></div> : <button className="button button-dark shutter-button" disabled={status !== 'ready' || !stickerReady} onClick={takePhoto}><Icon name="camera"/>{status === 'saving' ? 'Saving photo…' : 'Say cheese!'}</button>}

        </div>
        <div className="preview-column">
        <aside className="preview-panel" aria-label="Captured photos">
          <h2>Captured photos</h2>
          <p className="preview-subtitle">{shots.length} of {template.count} captured</p>
          <div className={`capture-gallery ${shots.length ? '' : 'empty'}`} tabIndex={shots.length ? 0 : undefined} aria-label="Your captured photos">{shots.length ? shots.map((shot, index) => <figure key={shot.url}><img src={shot.url} alt={`Captured photo ${index + 1}`}/><figcaption>Photo {index + 1}</figcaption></figure>) : <div className="gallery-empty"><Icon name="camera" size={30}/><p>No photos yet</p><span>Take your first photo to begin.</span></div>}</div>
          {shots.length > 0 && !busy && !completed && <button className="text-button start-over" onClick={retake}><Icon name="retake" size={16}/>Start over</button>}
        </aside>
        <details className="settings-panel"><summary><span><Icon name="timer" size={18}/>Photo settings</span><svg className="settings-chevron" aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 7 5 5 5-5"/></svg></summary>
          <div className="session-settings" aria-label="Photo controls">
            <fieldset disabled={busy || completed}><legend><Icon name="timer"/>Countdown</legend><div className="segmented">{[0,3,5].map(seconds => <button key={seconds} aria-pressed={delay === seconds} onClick={() => setDelay(seconds)}>{seconds ? `${seconds} sec` : 'Off'}</button>)}</div></fieldset>
            <div className="mirror-row"><div><span className="setting-label"><Icon name="mirror"/>Mirror photo</span><p className="setting-note">Match the preview.</p></div><button className={`switch ${mirror ? 'on' : ''}`} role="switch" aria-checked={mirror} aria-label="Mirror photo" disabled={busy || completed} onClick={() => setMirror(!mirror)}><span/></button></div>
            {devices.length > 1 && <label className="camera-select">Camera<select value={deviceId} disabled={busy || status !== 'ready'} onChange={e => openCamera(e.target.value)}>{devices.map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${index + 1}`}</option>)}</select></label>}
          </div>
        </details>
        </div>
      </div>
      {error && <div className="error-message" role="alert"><strong>Let’s get that sorted.</strong><p>{error}</p>{status === 'idle' && <button className="text-button" onClick={() => openCamera(deviceId)}>Try again <Icon name="arrow" size={16}/></button>}</div>}
      <p className="session-announcement" role="status" aria-live="polite">{reviewing ? 'All photos captured. Submit to format your strip, or start over.' : status === 'ready' ? `Camera ready. ${shots.length} of ${template.count} photos captured.` : ''}</p>
    </main>}
    <footer><span>PhotoPix — Your browser photo booth.</span><span>Capture. Retake. Download.</span></footer>
  </div>;
}
