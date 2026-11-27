import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Code, Copy, Download, FloppyDisk, Palette, Plus, SquaresFour, Stack, Trash, X } from '@phosphor-icons/react';
import { buildReactExport } from '../data/studioExport.js';
import { useThemePreview } from '../context/ThemeContext.jsx';
import './studio.css';

const paletteSets = [
  { name: 'Neutral', colors: ['#242420','#55534F','#99958D','#D5D1C8','#EEECE7'] },
  { name: 'Ocean', colors: ['#102A43','#176B87','#2CA6A4','#B8E3DF','#F2F8F7'] },
  { name: 'Botanical', colors: ['#193B2D','#547A52','#9DB89A','#D6E5D2','#F5F4EA'] },
  { name: 'Golden hour', colors: ['#3B2525','#B6533C','#E99A70','#F2C66D','#FFF3DC'] },
  { name: 'Berry', colors: ['#3B1F3A','#783B68','#B85C83','#E8B7C8','#FAF0F3'] },
  { name: 'Electric', colors: ['#161625','#3857F5','#22C7D6','#D7F35B','#F7F8FC'] },
  { name: 'Lavender', colors: ['#29233D','#65558F','#9B8BC7','#D9D1EF','#F5F2FC'] },
  { name: 'Clay', colors: ['#49352D','#A85D43','#C98768','#E6CDB2','#F5EBDD'] },
];
const types = ['Button','Text field','Checkbox','Switch','Badge','Alert','Card','Navbar','Sidebar','Avatar'];
const initial = [
 {id:'a1',type:'Button',name:'Primary button',text:'Get started',bg:'#242420',color:'#FFFFFF',border:'#242420',radius:8,padding:12,size:14},
 {id:'a2',type:'Card',name:'Feature card',text:'A thoughtful system',bg:'#FFFFFF',color:'#242420',border:'#E3E1DB',radius:12,padding:20,size:15},
 {id:'a3',type:'Badge',name:'Status badge',text:'Stable',bg:'#EDF4EA',color:'#45633B',border:'#CBDCC4',radius:999,padding:7,size:12},
];
const defaultTokens = [
 {name:'color.brand.primary',value:'#315FCE',kind:'color'},
 {name:'color.text.primary',value:'#242420',kind:'color'},
 {name:'color.surface.default',value:'#FFFFFF',kind:'color'},
 {name:'color.border.default',value:'#E3E1DB',kind:'color'},
 {name:'space.1',value:'4px',kind:'dimension'},
 {name:'space.2',value:'8px',kind:'dimension'},
 {name:'space.4',value:'16px',kind:'dimension'},
 {name:'space.6',value:'24px',kind:'dimension'},
 {name:'radius.sm',value:'4px',kind:'dimension'},
 {name:'radius.md',value:'8px',kind:'dimension'},
 {name:'radius.lg',value:'12px',kind:'dimension'},
 {name:'font.size.body',value:'14px',kind:'dimension'},
];
const read = (key, fallback) => { try { const v=localStorage.getItem(key); return v?JSON.parse(v):fallback; } catch { return fallback; } };
const makeItem = (type, n) => ({id:'el-'+Date.now()+'-'+n,type,name:type+' '+(n+1),text:type==='Button'?'New button':type==='Badge'?'New status':type,bg:type==='Badge'?'#EDF4EA':'#FFFFFF',color:type==='Badge'?'#45633B':'#242420',border:'#E3E1DB',radius:type==='Badge'?999:8,padding:12,size:14});

function Preview({item,active,onSelect}) {
 const base={fontFamily:'Inter, Manrope, system-ui, sans-serif',fontSize:item.size,color:item.color,background:item.bg,border:'1px solid '+item.border,borderRadius:item.radius,padding:item.padding+'px 16px',boxShadow:active?'0 0 0 2px #315FCE,0 0 0 5px #315FCE22':'none',cursor:'pointer'};
 if(item.type==='Button') return <button onClick={onSelect} style={{...base,fontWeight:650}}>{item.text}</button>;
 if(item.type==='Text field') return <label onClick={onSelect} style={{display:'grid',gap:7,width:250,fontSize:11,color:'#777'}}><span>{item.name}</span><input readOnly placeholder={item.text} style={{...base,width:'100%',background:'#fff'}}/></label>;
 if(item.type==='Checkbox') return <label onClick={onSelect} style={{display:'flex',gap:9,alignItems:'center',fontSize:13,outline:active?'2px solid #315FCE':'none'}}><input type="checkbox" defaultChecked/>{item.text}</label>;
 if(item.type==='Switch') return <label onClick={onSelect} style={{display:'flex',gap:10,alignItems:'center',fontSize:13,outline:active?'2px solid #315FCE':'none'}}><input type="checkbox" role="switch" defaultChecked/>{item.text}</label>;
 if(item.type==='Badge') return <span onClick={onSelect} style={{...base,display:'inline-flex',borderRadius:999,fontWeight:650}}>{item.text}</span>;
 if(item.type==='Alert') return <div onClick={onSelect} role="status" style={{...base,width:290}}><strong>{item.name}</strong><p style={{margin:'5px 0 0',opacity:.7}}>{item.text}</p></div>;
 if(item.type==='Card') return <article onClick={onSelect} style={{...base,width:270,minHeight:125}}><strong>{item.text}</strong><p style={{fontSize:12,lineHeight:1.6,opacity:.7}}>A reusable surface for grouping content and actions.</p></article>;
 if(item.type==='Navbar') return <nav onClick={onSelect} style={{...base,width:410,display:'flex',gap:18,alignItems:'center'}}><strong>Brand</strong><span style={{marginLeft:'auto',fontSize:12}}>Product　Resources　About</span></nav>;
 if(item.type==='Sidebar') return <aside onClick={onSelect} style={{...base,width:185,display:'grid',gap:9}}><strong>{item.text}</strong>{['Overview','Projects','Components','Settings'].map(x=><span key={x} style={{fontSize:12,padding:6}}>{x}</span>)}</aside>;
 return <div onClick={onSelect} style={{...base,display:'inline-flex',gap:9,alignItems:'center'}}><span style={{width:28,height:28,borderRadius:99,background:'#D5D1C8',display:'grid',placeItems:'center'}}>SN</span>{item.text}</div>;
}

export default function Studio() {
 const { previewTheme } = useThemePreview();
 const [items,setItems]=useState(()=>read('atria:builder:elements',initial));
 const [tokens,setTokens]=useState(()=>read('atria:builder:tokens',defaultTokens));
 const [panel,setPanel]=useState('Add');
 const [selectedId,setSelectedId]=useState('a1');
 const [name,setName]=useState(()=>read('atria:builder:name','Untitled design system'));
 const [format,setFormat]=useState('React');
 const [exportOpen,setExportOpen]=useState(false);
 const [copied,setCopied]=useState(false);
 const [saved,setSaved]=useState(false);
 const [mobileView,setMobileView]=useState('canvas');
 const inspectorToggle=useRef(null);
 const exportDialog=useRef(null);
 useEffect(()=>{
  if(!exportOpen)return;
  const previous=document.activeElement;
  const dialog=exportDialog.current;
  const buttons=()=>[...dialog.querySelectorAll('button')];
  buttons()[0]?.focus();
  const onKeyDown=event=>{
   if(event.key==='Escape'){event.preventDefault();setExportOpen(false);}
   if(event.key!=='Tab')return;
   const controls=buttons(),first=controls[0],last=controls.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  };
  dialog.addEventListener('keydown',onKeyDown);
  return ()=>{dialog.removeEventListener('keydown',onKeyDown);previous?.focus();};
 },[exportOpen]);
 const selected=items.find(x=>x.id===selectedId)||items[0];
 const patch=values=>setItems(old=>old.map(x=>x.id===selectedId?{...x,...values}:x));
 const add=type=>{const x=makeItem(type,items.length);setItems(old=>[...old,x]);setSelectedId(x.id);setPanel('Layers');setMobileView('canvas');};
 const remove=id=>{const next=items.filter(x=>x.id!==id);setItems(next);if(selectedId===id)setSelectedId(next[0]?.id||'');};
 const save=()=>{localStorage.setItem('atria:builder:elements',JSON.stringify(items));localStorage.setItem('atria:builder:tokens',JSON.stringify(tokens));localStorage.setItem('atria:builder:name',JSON.stringify(name));setSaved(true);window.setTimeout(()=>setSaved(false),1400);};
 const apply=p=>{if(selected)patch({bg:p.colors[4],color:p.colors[0],border:p.colors[2]});setTokens(old=>old.map(t=>t.name==='color.brand.primary'?{...t,value:p.colors[1]}:t));};
 const output=useMemo(()=>{
  if(format==='Tokens')return JSON.stringify({name,tokens},null,2);
  if(format==='CSS')return ':root {\n'+tokens.map(t=>'  --'+t.name.replaceAll('.','-')+': '+t.value+';').join('\n')+'\n}';
  if(format==='HTML')return items.map(x=>'<div class="atria-'+x.type.toLowerCase().replaceAll(' ','-')+'">'+x.text+'</div>').join('\n');
  return buildReactExport(items);
 },[format,name,tokens,items]);
 const copy=async()=>{try{await navigator.clipboard.writeText(output);setCopied(true);window.setTimeout(()=>setCopied(false),1200);}catch{}};
 const download=()=>{const ext=format==='Tokens'?'json':format==='React'?'jsx':format==='HTML'?'html':'css';const url=URL.createObjectURL(new Blob([output],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='atria-design-system.'+ext;a.click();URL.revokeObjectURL(url);};
 const onDrop=e=>{e.preventDefault();const type=e.dataTransfer.getData('atria-component');if(type)add(type);};
 const panels=[['Add',<Plus size={15}/>],['Layers',<SquaresFour size={15}/>],['Tokens',<Stack size={15}/>],['Palettes',<Palette size={15}/>]];
 return <div className="atria-builder" data-theme={previewTheme}>
  <header className="builder-topbar">
   <div className="builder-brand-wrap"><Link to="/" className="builder-back" aria-label="Atria"><ArrowLeft size={15}/> Atria</Link><span className="builder-divider"/><strong className="builder-wordmark">atria<span>.</span></strong><small>/ STUDIO</small></div>
   <input className="builder-name" aria-label="Design system name" value={name} onChange={e=>setName(e.target.value)}/>
   <div className="builder-actions">
     <Link to="/explore" className="builder-explore">Explore library</Link>
     <button onClick={save}>{saved?<Check size={14}/>:<FloppyDisk size={14}/>} {saved?'Saved':'Save'}</button>
     <button className="dark" onClick={()=>setExportOpen(true)}><Code size={14}/> Export</button>
   </div>
  </header>
  <nav className="builder-mobile-nav" aria-label="Studio panels">
   <button type="button" aria-pressed={mobileView==='library'} aria-controls="builder-library" onClick={()=>setMobileView('library')}>Library</button>
   <button type="button" aria-pressed={mobileView==='canvas'} aria-controls="builder-canvas" onClick={()=>setMobileView('canvas')}>Canvas</button>
   <button type="button" ref={inspectorToggle} aria-pressed={mobileView==='inspector'} aria-controls="builder-inspector" onClick={()=>setMobileView('inspector')}>Inspector</button>
  </nav>
  <div className="builder-grid" data-mobile-view={mobileView}>
   <aside className="builder-left" id="builder-library" aria-label="Component library tools">
    <nav className="builder-tabs" aria-label="Library tools">{panels.map(([id,icon])=><button key={id} aria-pressed={panel===id} className={panel===id?'active':''} onClick={()=>setPanel(id)}>{icon}<span>{id}</span></button>)}</nav>
    <div className="builder-left-content">
     {panel==='Add'&&<><div className="builder-label">COMPONENT LIBRARY <small>{types.length} COMPONENTS</small></div>{types.map(type=><button className="builder-add-item" key={type} draggable onDragStart={e=>e.dataTransfer.setData('atria-component',type)} onClick={()=>add(type)}><span>{type.slice(0,1)}</span><b>{type}</b><Plus size={13}/></button>)}</>}
     {panel==='Layers'&&<><div className="builder-label">LAYERS <small>{items.length} ITEMS</small></div>{items.map((x,i)=><div className={'builder-layer '+(selectedId===x.id?'selected':'')} key={x.id}><button onClick={()=>setSelectedId(x.id)}><small>{String(i+1).padStart(2,'0')}</small><span><b>{x.name}</b><em>{x.type}</em></span></button><button className="icon-only" aria-label={'Delete '+x.name} onClick={()=>remove(x.id)}><Trash size={13}/></button></div>)}<button className="builder-add-inline" onClick={()=>setPanel('Add')}><Plus size={13}/> Add component</button></>}
     {panel==='Tokens'&&<><div className="builder-label">DESIGN TOKENS <button onClick={()=>setTokens(old=>[...old,{name:'color.new.token',value:'#8A78C5',kind:'color'}])}><Plus size={13}/> Add</button></div>{tokens.map((t,i)=><div className="builder-token" key={t.name+i}><span><b>{t.name}</b><small>{t.kind}</small></span>{t.kind==='color'?<input type="color" aria-label={t.name} value={t.value} onChange={e=>setTokens(old=>old.map((v,j)=>j===i?{...v,value:e.target.value}:v))}/>:<input value={t.value} aria-label={t.name} onChange={e=>setTokens(old=>old.map((v,j)=>j===i?{...v,value:e.target.value}:v))}/>}</div>)}</>}
     {panel==='Palettes'&&<><div className="builder-label">COLOR PALETTES <small>{paletteSets.length} SETS</small></div>{paletteSets.map(p=><button className="builder-palette" key={p.name} onClick={()=>apply(p)}><span>{p.colors.map(c=><i key={c} style={{background:c}}/>)}</span><b>{p.name}</b><small>Apply to selection</small></button>)}</>}
    </div>
   </aside>
   <main className="builder-main" id="builder-canvas" aria-label="Canvas">
    <div className="builder-canvas-head"><span>CANVAS <b>{items.length} COMPONENTS</b></span><small>LIVE PREVIEW · 100%</small></div>
    <div className="builder-canvas-scroll" onDragOver={e=>e.preventDefault()} onDrop={onDrop}><div className="builder-artboard"><div className="builder-artboard-head"><b>{name||'Untitled design system'}</b><small>COMPONENT PLAYGROUND</small></div>
     {items.length?<div className="builder-canvas-items">{items.map(x=><div className="builder-canvas-item" key={x.id}><button className={selectedId===x.id?'active':''} onClick={()=>setSelectedId(x.id)}>{x.name}</button><Preview item={x} active={selectedId===x.id} onSelect={()=>setSelectedId(x.id)}/></div>)}</div>:<div className="builder-empty-canvas"><SquaresFour size={28}/><b>Your canvas is empty</b><span>Choose a component or drag one here.</span></div>}
     <footer className="builder-artboard-foot"><span>ATRIA / DESIGN SYSTEM</span><span>{items.length} ELEMENTS</span></footer>
    </div></div>
    <div className="builder-main-foot"><span>LOCAL WORKSPACE</span><span>Save to keep your work in this browser</span></div>
   </main>
   <aside className="builder-right" id="builder-inspector" aria-label="Inspector"><div className="builder-inspector-head"><span>INSPECTOR</span><b>{selected?.name||'No selection'}</b><button className="builder-inspector-dismiss" type="button" aria-label="Return to canvas" onClick={()=>{setMobileView('canvas');inspectorToggle.current?.focus();}}>Close <X size={14}/></button></div>
    {selected?<div className="builder-inspector-content">
     <section><h3>CONTENT</h3><label>Layer name<input value={selected.name} onChange={e=>patch({name:e.target.value})}/></label><label>Text / label<input value={selected.text} onChange={e=>patch({text:e.target.value})}/></label></section>
     <section><h3>APPEARANCE</h3>{[['Background','bg'],['Text','color'],['Border','border']].map(([label,key])=><label className="builder-color-field" key={key}>{label}<span><input type="color" value={selected[key]} onChange={e=>patch({[key]:e.target.value})}/><input value={selected[key]} onChange={e=>patch({[key]:e.target.value})}/></span></label>)}
      {[['Radius','radius',0,40],['Padding','padding',4,32],['Font size','size',10,24]].map(([label,key,min,max])=><label className="builder-range" key={key}>{label}<b>{selected[key]}px</b><input type="range" min={min} max={max} value={selected[key]} onChange={e=>patch({[key]:Number(e.target.value)})}/></label>)}
     </section><button className="builder-remove" onClick={()=>remove(selected.id)}><Trash size={14}/> Remove component</button>
    </div>:<p className="builder-no-selection">Select an element on the canvas or add a component.</p>}
   </aside>
  </div>
  {exportOpen&&<div className="builder-modal-bg" onClick={()=>setExportOpen(false)}><section className="builder-modal" role="dialog" aria-modal="true" aria-labelledby="builder-export-title" ref={exportDialog} onClick={e=>e.stopPropagation()}><header><div><small>DEVELOPER HANDOFF</small><h2 id="builder-export-title">Export your system</h2></div><button onClick={()=>setExportOpen(false)} aria-label="Close export"><X size={17}/></button></header><nav>{['React','CSS','HTML','Tokens'].map(x=><button className={format===x?'active':''} key={x} onClick={()=>setFormat(x)}>{x}</button>)}</nav><pre>{output}</pre><footer><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':'Copy code'}</button><button onClick={download}><Download size={14}/> Download</button></footer></section></div>}
 </div>;
}
