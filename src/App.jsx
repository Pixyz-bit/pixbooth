import { useEffect, useRef, useState } from 'react';
import { templates, composePhotos } from './collage.js';

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
  const stream = useRef(null);
  const requestId = useRef(0);
  const timer = useRef(null);
  const photoUrl = useRef(null);
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
  const [photo, setPhoto] = useState(null);
  const [flash, setFlash] = useState(false);

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
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
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
        cancelCountdown(); releaseCamera(); setStatus('idle');
        setError('The camera disconnected. Reconnect it and enable the camera again.');
      };
      setDeviceId(track.getSettings().deviceId || selected);
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

  function capture() {
    cancelCountdown();
    const id = requestId.current;
    const source = video.current;
    if (!source?.videoWidth || source.readyState < 2 || !stream.current?.active) {
      setError('The camera isn’t ready yet. Wait a moment, then take your photo again.');
      return;
    }
    setStatus('saving');
    const canvas = document.createElement('canvas');
    canvas.width = source.videoWidth;
    canvas.height = source.videoHeight;
    const ctx = canvas.getContext('2d');
    if (mirror) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(source, 0, 0);
    setFlash(true);
    canvas.toBlob(async blob => {
      if (id !== requestId.current) return;
      setFlash(false);
      if (!blob) { setError('The photo couldn’t be saved. Please try again.'); setStatus('ready'); return; }
      const url = URL.createObjectURL(blob);
      shotUrls.current.push(url);
      const nextShots = [...shots, { url, width: canvas.width, height: canvas.height }];
      setShots(nextShots);
      if (nextShots.length < template.count) { setStatus('ready'); return; }
      releaseCamera();
      try {
        const result = await composePhotos(nextShots, template);
        if (id !== requestId.current) return;
        if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
        const exportUrl = URL.createObjectURL(result.blob);
        photoUrl.current = exportUrl;
        setPhoto({ url: exportUrl, width: result.width, height: result.height, filename: `photopix-${template.id}-${new Date().toISOString().replace(/[:.]/g, '-')}.jpg` });
        setStatus('review');
      } catch {
        if (id !== requestId.current) return;
        setStatus('export-error');
        setError('The layout couldn’t be saved. Download your individual photos below, or start a new session.');
      }
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
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    shotUrls.current.forEach(url => URL.revokeObjectURL(url));
    shotUrls.current = [];
    photoUrl.current = null; setPhoto(null); setShots([]); openCamera(deviceId);
  }

  const busy = countdown !== null || status === 'loading' || status === 'saving';
  const reviewing = status === 'review';

  const completed = shots.length === template.count;
  const templateLocked = busy || shots.length > 0;

  return <div className="app">
    <header className="header">
      <a className="wordmark" href="./" aria-label="PhotoPix home"><span className="brand-icon"><Icon name="camera" size={23}/></span>PhotoPix<span className="brand-dot">.</span></a>
      <span className="header-note"><span className="header-status-dot"/>Photos stay on your device</span>
    </header>
    <main>
      <div className="intro"><div><h1>Your moment. Your layout.</h1><p>Pick a template, strike a pose, and make something worth keeping.</p></div></div>
      <div className="booth-layout">
        <aside className="template-rail" aria-label="Grid templates">
          <h2>Grid templates</h2>
          <div className="template-list" role="group" aria-label="Choose a photo layout">
            {templates.map(item => <button key={item.id} className={templateId === item.id ? 'template-button selected' : 'template-button'} aria-pressed={templateId === item.id} disabled={templateLocked} onClick={() => setTemplateId(item.id)} aria-label={`${item.name}, ${item.count} ${item.count === 1 ? 'photo' : 'photos'}`}>
              <span className="template-mini" style={{ gridTemplateColumns: `repeat(${item.cols}, 1fr)`, gridTemplateRows: `repeat(${item.rows}, 1fr)` }} aria-hidden="true">{Array.from({ length: item.count }, (_, i) => <span key={i}/>)}</span>
              <span className="template-name">{item.name}</span>
              {templateId === item.id && <svg className="selected-mark" aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 8 3 3 7-7"/></svg>}
            </button>)}
          </div>
          <p className="rail-note">{shots.length > 0 ? 'Start a new session to change layout.' : 'Choose your layout before the first shot.'}</p>
        </aside>
        <div className="camera-column">
          <section className="booth" aria-label="Photo booth">
            <div className="booth-bar"><h2 className="panel-title">Camera preview</h2><div className="camera-control"><span className="camera-toggle-label">{status === 'loading' ? 'Connecting…' : status === 'ready' || status === 'saving' && !completed ? 'Camera on' : 'Camera off'}</span><button className={`switch ${status === 'ready' || status === 'saving' && !completed ? 'on' : ''}`} role="switch" aria-label="Camera" aria-checked={status === 'ready' || status === 'saving' && !completed} disabled={status === 'saving' || completed} title={completed ? 'Start a new session to use the camera again' : status === 'loading' ? 'Cancel camera connection' : undefined} onClick={() => status === 'ready' || status === 'loading' ? stopCamera() : openCamera(deviceId)}><span/></button></div></div>
            <div className={`viewfinder ${flash ? 'flash' : ''}`}>
              <video ref={video} autoPlay muted playsInline className={`${mirror ? 'mirrored' : ''} ${status === 'ready' || status === 'saving' && !completed ? '' : 'hidden'}`} aria-label="Live webcam preview"/>
              {completed && <img className="captured-photo" src={shots.at(-1).url} alt="Your last captured photo"/>}
              {!completed && (status === 'idle' || status === 'loading') && <div className="camera-placeholder"><div className="camera-outline"><Icon name="camera" size={44}/></div><h2>{status === 'loading' ? 'Just a moment…' : 'Ready when you are.'}</h2><p>{status === 'loading' ? 'Allow camera access when your browser asks.' : 'Switch on the camera above to get started.'}</p></div>}
              <span className="corner top-left"/><span className="corner top-right"/><span className="corner bottom-left"/><span className="corner bottom-right"/>
              {countdown !== null && <div className="countdown" role="status" aria-live="assertive" aria-atomic="true" key={countdown}>{countdown}</div>}
            </div>
            <div className="booth-bottom"><span>{completed ? 'All your moments, ready to keep.' : countdown !== null ? 'Hold that pose…' : `Photo ${shots.length + 1} of ${template.count} · Full frame, no cropping`}</span></div>
          </section>
            {countdown !== null ? <button className="button button-dark shutter-button" onClick={cancelCountdown}>Cancel countdown</button> : completed ? <button className="button button-outline shutter-button" disabled={busy} onClick={retake}><Icon name="retake"/>Start a new session</button> : <button className="button button-dark shutter-button" disabled={status !== 'ready'} onClick={takePhoto}><Icon name="camera"/>{status === 'saving' ? 'Saving photo…' : 'Say cheese!'}</button>}

        </div>
        <div className="preview-column">
        <aside className="preview-panel" aria-label="Photo booth preview" style={{ '--preview-rows': template.rows, '--preview-cols': template.cols }}>
          <h2>Photo booth preview</h2>
          <p className="preview-subtitle">{template.name} · {shots.length} of {template.count} {template.count === 1 ? 'photo' : 'photos'}</p>
          <div className="preview-stage"><div className="preview-paper" style={{ '--paper-ratio': (template.cols * 900 + (template.cols - 1) * 23 + 72) / (template.rows * 675 + (template.rows - 1) * 23 + 198) }}>
            <div className="photo-layout" style={{ gridTemplateColumns: `repeat(${template.cols}, 1fr)`, gridTemplateRows: `repeat(${template.rows}, 1fr)` }}>
              {Array.from({ length: template.count }, (_, index) => <div className={`photo-slot ${shots[index] ? 'filled' : ''}`} key={index}>{shots[index] ? <img src={shots[index].url} alt={`Captured photo ${index + 1}`}/> : <span>{index + 1}</span>}</div>)}
            </div>
            <span className="strip-brand">PhotoPix.</span>
          </div></div>
          {photo && <a className="button button-dark" href={photo.url} download={photo.filename}><Icon name="download"/>Download {template.count === 1 ? 'photo' : 'layout'}</a>}
          {shots.length > 0 && !busy && !completed && <button className="text-button start-over" onClick={retake}><Icon name="retake" size={16}/>Start over</button>}
          {status === 'export-error' && <div className="individual-downloads">{shots.map((shot, index) => <a key={shot.url} download={`photopix-photo-${index + 1}.jpg`} href={shot.url}>Download photo {index + 1}</a>)}</div>}
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
      <p className="session-announcement" role="status" aria-live="polite">{reviewing ? 'Layout complete. You can download it or start a new session.' : status === 'ready' ? `Camera ready. ${shots.length} of ${template.count} photos captured.` : ''}</p>
    </main>
    <footer><span>PhotoPix — Your browser photo booth.</span><span>Capture. Retake. Download.</span></footer>
  </div>;
}
