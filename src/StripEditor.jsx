import { useEffect, useRef, useState } from 'react';
import { backgrounds, photoFilters, decorations, templates, composePhotos, layoutSize } from './collage.js';
import { TemplateMini, Chevron } from './BoothParts.jsx';
import MotifPreview from './MotifPreview.jsx';
import LiveStripPreview from './LiveStripPreview.jsx';
import { composeLive } from './live-media.js';

export default function StripEditor({ shots, template, settings, onSettingsChange, onBack, onStartOver }) {
  const live=shots[0]?.type==='live';
  const [background,setBackground]=useState(settings?.background ?? 'black'),[layoutId,setLayoutId]=useState(settings?.layoutId ?? template.id),[filter,setFilter]=useState(settings?.filter ?? 'normal');
  const [decoration,setDecoration]=useState(settings?.decoration ?? 'none'),[caption,setCaption]=useState(settings?.caption ?? 'pixbooth'),[playing,setPlaying]=useState(true);
  const [output,setOutput]=useState(null),[busy,setBusy]=useState(true),[error,setError]=useState(''),[retry,setRetry]=useState(0);
  const [exporting,setExporting]=useState(false),[progress,setProgress]=useState(0),[mp4,setMp4]=useState(null);
  const currentUrl=useRef(null),mp4Url=useRef(null),abort=useRef(null),heading=useRef(null);
  const layout=templates.find(item=>item.id===layoutId),available=templates.filter(item=>item.count===shots.length),size=layoutSize(layout);
  const options={background,filter,decoration,caption};
  useEffect(()=>{heading.current?.focus();},[]);
  useEffect(()=>{onSettingsChange({background,layoutId,filter,decoration,caption});},[background,layoutId,filter,decoration,caption,onSettingsChange]);
  useEffect(()=>{
    let cancelled=false;setBusy(true);setError('');setMp4(null);if(mp4Url.current){URL.revokeObjectURL(mp4Url.current);mp4Url.current=null;}
    const timeout=setTimeout(async()=>{try{
      const images=live?shots.map(shot=>({url:shot.poster})):shots;
      const result=await composePhotos(images,layout,{background,filter,decoration,caption});
      if(cancelled)return;const url=URL.createObjectURL(result.blob);if(currentUrl.current)URL.revokeObjectURL(currentUrl.current);currentUrl.current=url;setOutput(url);setBusy(false);
    }catch{if(!cancelled){setBusy(false);setError('The strip couldn’t be rendered. Try again to keep your edits.');}}},120);
    return()=>{cancelled=true;clearTimeout(timeout);};
  },[shots,live,layout,background,filter,decoration,caption,retry]);
  useEffect(()=>()=>{abort.current?.abort();if(currentUrl.current)URL.revokeObjectURL(currentUrl.current);if(mp4Url.current)URL.revokeObjectURL(mp4Url.current);},[]);

  async function exportVideo(){
    const controller=new AbortController();abort.current=controller;setExporting(true);setProgress(0);setError('');setPlaying(false);
    try{const result=await composeLive(shots,layout,options,{signal:controller.signal,onProgress:setProgress});if(controller.signal.aborted)return;const url=URL.createObjectURL(result.blob);if(mp4Url.current)URL.revokeObjectURL(mp4Url.current);mp4Url.current=url;setMp4({url,width:result.width,height:result.height});}
    catch(err){if(err.name!=='AbortError')setError(err.message||'The MP4 couldn’t be created. Try again.');}
    finally{if(abort.current===controller){abort.current=null;setExporting(false);setPlaying(true);}}
  }
  const filename=`pixbooth-${layout.id}-${background}-${filter}`;
  const previewImage=shots[0].poster||shots[0].url;
  return <main className="editor-main">
    <div className="intro editor-intro"><div><h1 ref={heading} tabIndex="-1">Make it yours.</h1><p>Choose your format, color and finishing touches. Keep every moment.</p></div><button className="text-button" disabled={exporting} onClick={onBack}>Back to booth</button></div>
    <div className="editor-layout">
      <section className="editor-preview panel" aria-label="Edited photo strip">
        <div className="editor-preview-heading"><h2>{layout.name}{live?' · Live':''}</h2><span>{size.width} × {size.height} px{live?' · 5 sec':''}</span></div>
        <div className="editor-stage">{live?<LiveStripPreview shots={shots} template={layout} options={options} playing={playing}/>:output?<img className="edited-strip" src={output} alt={`${layout.name} with ${backgrounds.find(item=>item.id===background).name} background, ${photoFilters.find(item=>item.id===filter).name} filter and ${decoration} border stickers`}/>:<p>Preparing your strip…</p>}</div>
        {live&&<button className="text-button preview-play" disabled={exporting} onClick={()=>setPlaying(!playing)}>{playing?'Pause preview':'Play preview'}</button>}
        <p className="editor-render-status" role="status" aria-live="polite">{exporting?`Creating MP4 · ${Math.round(progress*100)}%`:busy?'Applying your edits…':error?'Check the message beside your controls':mp4?`MP4 ready · ${mp4.width} × ${mp4.height} px`:'Ready to download'}</p>
      </section>
      <aside className="editor-controls panel" aria-label="Strip editing controls">
        <div className="editor-options">
          {available.length>1&&<details className="editor-section" open><summary><span>Photo layout · {available.length}</span><Chevron/></summary><div className="editor-layout-options">{available.map(item=><button key={item.id} className={`template-button ${layoutId===item.id?'selected':''}`} disabled={exporting} aria-pressed={layoutId===item.id} onClick={()=>setLayoutId(item.id)}><TemplateMini template={item}/><span className="template-name">{item.name}</span></button>)}</div></details>}
          <details className="editor-section" open><summary><span>Background design · {backgrounds.length}</span><Chevron/></summary><div className="background-options">{backgrounds.map(item=><button key={item.id} className={`design-option ${background===item.id?'selected':''}`} disabled={exporting} aria-pressed={background===item.id} onClick={()=>setBackground(item.id)}><span className={`background-swatch swatch-${item.id}`} style={{backgroundColor:item.color}} aria-hidden="true"/><span>{item.name}</span></button>)}</div></details>
          <details className="editor-section" open><summary><span>Photo filter · {photoFilters.length}</span><Chevron/></summary><div className="filter-options">{photoFilters.map(item=><button key={item.id} className={`filter-option ${filter===item.id?'selected':''}`} disabled={exporting} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}><img src={previewImage} style={{filter:item.css}} alt=""/><span>{item.name}</span></button>)}</div></details>
          <details className="editor-section" open><summary><span>Surrounding stickers</span><Chevron/></summary><div className="decoration-options">{decorations.map(item=><button key={item.id} className={`design-option ${decoration===item.id?'selected':''}`} disabled={exporting} aria-pressed={decoration===item.id} onClick={()=>setDecoration(item.id)}><MotifPreview motif={item}/><span>{item.name}</span></button>)}</div></details>
          <label className="caption-control">Strip caption<input value={caption} maxLength="32" disabled={exporting} onChange={e=>setCaption(e.target.value)} placeholder="pixbooth"/><span>{caption.length} / 32 characters</span></label>
          {error&&<div className="editor-error" role="alert"><p>{error}</p><button className="text-button" disabled={exporting} onClick={()=>setRetry(value=>value+1)}>Try again</button></div>}
        </div>
        <div className="editor-actions">
          {live&&(exporting?<><progress value={progress} max="1" aria-label="MP4 export progress"/><button className="button button-outline" onClick={()=>abort.current?.abort()}>Cancel export</button></>:mp4?<a className="button button-dark" href={mp4.url} download={`${filename}.mp4`}>Download live strip · MP4</a>:<button className="button button-dark" disabled={busy||!!error} onClick={exportVideo}>Create live strip · MP4</button>)}
          {!exporting&&(!busy&&!error&&output?<a className={`button ${live?'button-outline':'button-dark'}`} href={output} download={`${filename}.jpg`}>{live?'Download cover photo':'Download photo strip'}</a>:<button className="button button-dark" disabled>Applying edits…</button>)}
          <button className="button button-outline" disabled={exporting} onClick={onStartOver}>Start over</button>
        </div>
      </aside>
    </div>
  </main>;
}
