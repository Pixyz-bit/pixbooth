import { useEffect, useRef, useState } from 'react';
import { templates, frameRects } from './collage.js';
import Landing from './Landing.jsx';
import Brand from './Brand.jsx';
import { supportsMp4, encodeCanvas } from './live-media.js';
import { Chevron } from './BoothParts.jsx';
import WorkflowSteps from './WorkflowSteps.jsx';
import TemplateSelection from './TemplateSelection.jsx';
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
  const recording = useRef(null);
  const [shots, setShots] = useState([]);
  const [templateId, setTemplateId] = useState('strip-four');
  const [layoutChosen, setLayoutChosen] = useState(false);
  const [editorSettings, setEditorSettings] = useState(null);
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
  const [page, setPage] = useState(['/templates','/booth','/edit'].includes(location.hash.slice(1)) ? 'templates' : 'home');
  const [mode, setMode] = useState('photo');
  const [mp4Supported, setMp4Supported] = useState(null);
  const [recordProgress, setRecordProgress] = useState(0);
  const completed = shots.length === template.count;
  const cameraActive = ['ready','recording'].includes(status) || status === 'saving' && !completed;
  const face = useFaceStickers(video, overlay, cameraActive && page === 'booth', sticker);
  const stickerReady = sticker === 'none' || face.state === 'tracking';
  useEffect(() => { if(page!=='booth')return;let cancelled=false;supportsMp4().then(value=>{if(!cancelled)setMp4Supported(value);});return()=>{cancelled=true;}; }, [page]);
  useEffect(() => { document.querySelector('main h1')?.focus(); }, [page]);

  useEffect(() => {
    function route() {
      const requested = location.hash.slice(1);
      const next = requested === '/edit' && completed ? 'editor' : ['/booth','/edit'].includes(requested) && layoutChosen ? 'booth' : ['/templates','/booth','/edit'].includes(requested) ? 'templates' : 'home';
      const path = next === 'editor' ? '/edit' : next === 'booth' ? '/booth' : next === 'templates' ? '/templates' : '/';
      if (requested !== path) history.replaceState(null, '', `#${path}`);
      setPage(next);
      if (next !== 'booth') { requestId.current++; recording.current?.abort(); cancelCountdown(); releaseCamera(); setFlash(false); setRecordProgress(0); setStatus(completed ? 'review' : 'idle'); }
    }
    route(); window.addEventListener('hashchange', route);
    return () => window.removeEventListener('hashchange', route);
  }, [completed, layoutChosen]);

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
    recording.current?.abort();
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
      setError('Camera access requires HTTPS or localhost and a supported browser. Open Pixbooth through a secure address.');
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
        recording.current?.abort(); cancelCountdown(); releaseCamera(); setStatus('idle');
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
    requestId.current++; recording.current?.abort(); cancelCountdown(); releaseCamera(); setStatus('idle'); setRecordProgress(0);
  }

  useEffect(() => {
    const visibility = () => { if (document.hidden && recording.current) { stopCamera(); setError('Live recording was cancelled when the tab was hidden. Keep this tab open and try again.'); } };
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);

  async function captureLive() {
    cancelCountdown(); const id=requestId.current, source=video.current;
    if (!source?.videoWidth || !stream.current?.active) { setError('The camera isn’t ready. Enable it and try again.'); return; }
    const controller=new AbortController();recording.current=controller;setStatus('recording');setRecordProgress(0);
    const canvas=document.createElement('canvas'),scale=Math.min(1,960/source.videoWidth,720/source.videoHeight);
    canvas.width=Math.floor(source.videoWidth*scale/2)*2;canvas.height=Math.floor(source.videoHeight*scale/2)*2;
    const ctx=canvas.getContext('2d');let poster;
    try {
      const blob=await encodeCanvas(canvas,()=>{
        if (!stream.current?.active) throw new Error('The camera disconnected during recording. Enable it and try again.');
        ctx.save();if(mirror){ctx.translate(canvas.width,0);ctx.scale(-1,1);}ctx.drawImage(source,0,0,canvas.width,canvas.height);
        const result=face.latest.current;if(sticker!=='none'&&result&&performance.now()-result.timestamp<600)drawSticker(ctx,result.points,canvas.width,canvas.height,sticker);ctx.restore();
        if (!poster) poster=canvas.toDataURL('image/jpeg',.9);
      },{signal:controller.signal,realtime:true,onProgress:setRecordProgress});
      if(id!==requestId.current)return;
      const url=URL.createObjectURL(blob);shotUrls.current.push(url);
      const next=[...shots,{url,poster,blob,type:'live',width:canvas.width,height:canvas.height}];setShots(next);
      if(next.length===template.count){releaseCamera();setStatus('review');}else setStatus('ready');
    }catch(err){if(id===requestId.current&&err.name!=='AbortError'){setError(err.message||'Live recording failed. Try again or switch to Photo.');setStatus('ready');}}
    finally{if(recording.current===controller)recording.current=null;setRecordProgress(0);}
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
    const take = mode === 'live' ? captureLive : capture;
    if (delay === 0) { take(); return; }
    let remaining = delay;
    setCountdown(remaining);
    timer.current = setInterval(() => {
      remaining--;
      if (remaining === 0) take();
      else setCountdown(remaining);
    }, 1000);
  }

  function retake() {
    requestId.current++;recording.current?.abort();cancelCountdown();releaseCamera();
    location.hash = '/templates'; setPage('templates');setLayoutChosen(false);
    shotUrls.current.forEach(url => URL.revokeObjectURL(url));
    shotUrls.current = [];
    setShots([]);setEditorSettings(null);setStatus('idle');setFlash(false);setError('');setRecordProgress(0);
  }

  const busy = countdown !== null || ['loading','saving','recording'].includes(status);
  const reviewing = status === 'review';

  const templateLocked = busy || shots.length > 0;

  return <div className={`app ${page === 'home' ? 'home-app' : ''}`}>
    {page !== 'home' && <WorkflowSteps page={page} layoutChosen={layoutChosen} completed={completed}/>}
    {page === 'home' ? <Landing onCapture={()=>{location.hash='/templates';}}/> : page === 'templates' ? <TemplateSelection template={template} onSelect={id=>{setTemplateId(id);setEditorSettings(null);}} locked={shots.length > 0} captured={shots.length} onContinue={()=>{setLayoutChosen(true);location.hash='/booth';}} onStartOver={retake}/> : page === 'editor' && completed ? <StripEditor shots={shots} template={template} settings={editorSettings} onSettingsChange={setEditorSettings} onBack={() => { location.hash = '/booth'; }} onStartOver={retake}/> : <main className="capture-main">
      <div className="intro booth-intro"><div><h1 tabIndex="-1">Capture your moments.</h1><p>{template.name} · {template.count} {mode === 'live' ? 'five-second clips' : 'photos'}. Submit when you’re ready to edit.</p></div><div className="capture-mode" role="group" aria-label="Capture mode"><button className={mode==='photo'?'active':''} aria-pressed={mode==='photo'} disabled={templateLocked} onClick={()=>setMode('photo')}>Photo</button><button className={mode==='live'?'active':''} aria-pressed={mode==='live'} disabled={templateLocked||mp4Supported!==true} onClick={()=>setMode('live')} title={mp4Supported===false?'MP4 encoding is unavailable in this browser. Try current Chrome, Edge or Safari.':undefined}>Live · 5 sec</button></div></div>
      {mp4Supported===false&&<p className="compatibility-note">Live MP4 needs a browser with H.264 recording. Photo mode is ready to use.</p>}
      <div className="booth-layout">
        <div className="sidebar-column">
        <details className="sticker-panel panel" open><summary><span>Face stickers</span><Chevron/></summary>
          <div className="sticker-content"><StickerPicker selected={sticker} onSelect={setSticker} disabled={busy || completed}/>
          <p className="sticker-status" role="status" aria-live="polite">{sticker === 'none' ? 'Choose a sticker to wear in your photos.' : !cameraActive ? 'Switch on the camera to use your sticker.' : face.state === 'loading' ? 'Loading face tracking…' : face.state === 'tracking' ? 'Face found. Your sticker is ready.' : face.state === 'error' ? 'Face tracking couldn’t load. Retry or choose None.' : 'Face the camera to place your sticker.'}</p>
          {face.state === 'error' && <button className="text-button" onClick={face.retry}>Retry face tracking</button>}</div>
        </details>
        </div>
        <div className="camera-column">
          <section className="booth" aria-label="Photo booth">
            <div className="booth-brand"><Brand/></div>
            <div className="booth-bar"><h2 className="panel-title">Camera preview</h2><div className="camera-control"><span className="camera-toggle-label">{status === 'loading' ? 'Connecting…' : cameraActive ? 'Camera on' : 'Camera off'}</span><button className={`switch ${cameraActive ? 'on' : ''}`} role="switch" aria-label="Camera" aria-checked={cameraActive} disabled={status === 'saving' || completed} title={completed ? 'Start a new session to use the camera again' : status === 'loading' ? 'Cancel camera connection' : undefined} onClick={() => cameraActive || status === 'loading' ? stopCamera() : openCamera(deviceId)}><span/></button></div></div>
            <div className={`viewfinder ${flash ? 'flash' : ''}`}>
              <video ref={video} autoPlay muted playsInline className={`${mirror ? 'mirrored' : ''} ${cameraActive ? '' : 'hidden'}`} aria-label="Live webcam preview"/>
              <canvas ref={overlay} className={`face-overlay ${mirror ? 'mirrored' : ''} ${cameraActive ? '' : 'hidden'}`} aria-hidden="true"/>
              {completed && (mode==='live'?<video className="captured-photo" src={shots.at(-1).url} autoPlay loop muted playsInline controls aria-label="Your last live clip"/>:<img className="captured-photo" src={shots.at(-1).url} alt="Your last captured photo"/>)}
              {!completed && (status === 'idle' || status === 'loading') && <div className="camera-placeholder"><div className="camera-outline"><Icon name="camera" size={44}/></div><h2>{status === 'loading' ? 'Just a moment…' : 'Ready when you are.'}</h2><p>{status === 'loading' ? 'Allow camera access when your browser asks.' : 'Switch on the camera above to get started.'}</p></div>}
              <span className="corner top-left"/><span className="corner top-right"/><span className="corner bottom-left"/><span className="corner bottom-right"/>
              {countdown !== null && <div className="countdown" role="status" aria-live="assertive" aria-atomic="true" key={countdown}>{countdown}</div>}
              {status==='recording'&&<div className="recording-status" role="status"><span/>Recording · {Math.min(5,Math.ceil(recordProgress*5))} / 5 sec<progress value={recordProgress} max="1" aria-label="Live recording progress"/></div>}
            </div>
            <div className="booth-bottom"><span>{completed ? 'All your moments, ready to keep.' : countdown !== null ? 'Hold that pose…' : `${mode==='live'?'Live clip':'Photo'} ${shots.length + 1} of ${template.count}`}</span></div>
          </section>
            {countdown !== null ? <button className="button button-dark shutter-button" onClick={cancelCountdown}>Cancel countdown</button> : status==='recording' ? <button className="button button-outline shutter-button" onClick={stopCamera}>Cancel recording</button> : completed ? <div className="completion-actions"><button className="button button-outline" disabled={busy} onClick={retake}><Icon name="retake"/>Start over</button><button className="button button-dark" disabled={busy} onClick={() => { location.hash = '/edit'; }} >Submit<Icon name="arrow"/></button></div> : <button className="button button-dark shutter-button" disabled={status !== 'ready' || !stickerReady} onClick={takePhoto}><Icon name="camera"/>{status === 'saving' ? 'Saving photo…' : mode==='live'?'Record 5 seconds':'Say cheese!'}</button>}

        </div>
        <div className="preview-column">
        <aside className="preview-panel" aria-label="Captured photos">
          <h2>{mode==='live'?'Live clips':'Captured photos'}</h2>
          <p className="preview-subtitle">{shots.length} of {template.count} captured</p>
          <div className={`capture-gallery ${shots.length ? '' : 'empty'}`} tabIndex={shots.length ? 0 : undefined} aria-label="Your captured photos">{shots.length ? shots.map((shot, index) => <figure key={shot.url}>{shot.type==='live'?<video src={shot.url} poster={shot.poster} controls loop muted playsInline aria-label={`Live clip ${index+1}`} style={{aspectRatio:frameRects(template)[index].width/frameRects(template)[index].height}}/>:<img src={shot.url} alt={`Captured photo ${index + 1}`} style={{aspectRatio:frameRects(template)[index].width/frameRects(template)[index].height}}/>}<figcaption>{shot.type==='live'?<a href={shot.url} download={`pixbooth-live-${index+1}.mp4`}>Clip {index+1} · Download MP4</a>:`Photo ${index+1}`}</figcaption></figure>) : <div className="gallery-empty"><Icon name="camera" size={30}/><p>{mode==='live'?'No clips yet':'No photos yet'}</p><span>{mode==='live'?'Record five seconds to begin.':'Take your first photo to begin.'}</span></div>}</div>
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
    <footer><span>Pixbooth — Your browser photo booth.</span><span>Capture. Customize. Keep.</span></footer>
  </div>;
}
