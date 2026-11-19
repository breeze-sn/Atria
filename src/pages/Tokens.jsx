import React,{useMemo,useState} from 'react';
import {Plus,Copy,Download,Trash,MagnifyingGlass,Check} from '@phosphor-icons/react';
import {useStudioData} from '../data/studioStore.js';
import {parseTokenImport,rowsToTokens} from '../data/tokenImport.js';
import {validateName,validateValue,validateToken} from '../data/tokenValidation.js';
const errorText={display:'block',marginTop:5,fontSize:10,color:'#b54747',lineHeight:1.4};
const control={minWidth:0,padding:'9px 10px',border:'1px solid var(--line)',background:'#fff',color:'var(--ink)',font:'inherit',fontSize:11};
const action={display:'inline-flex',alignItems:'center',gap:6,padding:'8px 10px',border:'1px solid var(--ink)',background:'#242420',color:'#fff',fontSize:10,cursor:'pointer'};
function CopyValue({value}){const [done,setDone]=useState(false);return <button title="Copy" onClick={async()=>{try{await navigator.clipboard.writeText(value);setDone(true);setTimeout(()=>setDone(false),1200)}catch{}}} style={{border:0,background:'transparent',cursor:'pointer',color:'inherit'}}>{done?<Check size={14}/>:<Copy size={14}/>}</button>}
export default function Tokens(){
 const [tokens,save,reset]=useStudioData('tokens');const [query,setQuery]=useState('');const [group,setGroup]=useState('All');const [selected,setSelected]=useState([]);const [activeToken,setActiveToken]=useState(null);const [importText,setImportText]=useState('');const [review,setReview]=useState(null);const [draftErrors,setDraftErrors]=useState({});const [edits,setEdits]=useState({});
 const [draft,setDraft]=useState({name:'',value:'',type:'color',description:'',group:'Primitive'});
 const visible=useMemo(()=>tokens.filter(t=>(group==='All'||t.group===group)&&[t.name,t.value,t.description].join(' ').toLowerCase().includes(query.toLowerCase())),[tokens,group,query]);
 const css=':root {\n'+tokens.map(t=>'  --atria-'+t.name.replaceAll('.','-')+': '+t.value+';').join('\n')+'\n}';
 const json=JSON.stringify(tokens.map(({name,value,type,description,group})=>({name,value,type,description,group})),null,2);
 const download=kind=>{const url=URL.createObjectURL(new Blob([kind==='json'?json:css],{type:kind==='json'?'application/json':'text/css'}));const a=document.createElement('a');a.href=url;a.download='atria-tokens.'+kind;a.click();URL.revokeObjectURL(url)};
 const add=()=>{const errors=validateToken(draft,tokens);setDraftErrors(errors);if(Object.keys(errors).length)return;save(items=>[...items,{...draft,name:draft.name.trim(),value:draft.value.trim(),id:crypto.randomUUID()}]);setDraft({name:'',value:'',type:'color',description:'',group:'Primitive'})};
 const previewImport=()=>setReview(parseTokenImport(importText,tokens));
 const loadImportFile=async e=>{const file=e.target.files?.[0];if(!file)return;try{const text=await file.text();setImportText(text);setReview(parseTokenImport(text,tokens))}catch{setReview({fileError:'Could not read that file.',rows:[]})}e.target.value=''};
 const applyImport=()=>{const fresh=rowsToTokens(review.rows,()=>crypto.randomUUID());if(!fresh.length)return;save(items=>[...items,...fresh]);setReview(null);setImportText('')};
 const importable=review?review.rows.filter(r=>r.status==='new').length:0;
 const update=(id,field,value)=>save(items=>items.map(t=>t.id===id?{...t,[field]:value}:t));
 const editFor=(t,field)=>edits[t.id]&&field in edits[t.id]?edits[t.id][field]:t[field];
 const errorFor=(t,field)=>{const e=edits[t.id];if(!e||!(field in e))return '';return field==='name'?validateName(e.name,tokens,t.id):validateValue(e.value,t.type)};
 const edit=(t,field,value)=>{const error=field==='name'?validateName(value,tokens,t.id):validateValue(value,t.type);if(error){setEdits(old=>({...old,[t.id]:{...old[t.id],[field]:value}}));return}setEdits(old=>{const {[field]:_,...rest}=old[t.id]||{};const next={...old,[t.id]:rest};if(!Object.keys(rest).length)delete next[t.id];return next});update(t.id,field,value)};
 const revert=(t,field)=>setEdits(old=>{if(!old[t.id])return old;const {[field]:_,...rest}=old[t.id];const next={...old,[t.id]:rest};if(!Object.keys(rest).length)delete next[t.id];return next});
 return <div className="studio-page">
  <div className="section-index">[ STUDIO / TOKENS ]</div>
  <div className="studio-page-heading"><div><span className="studio-status">DESIGN VALUES / DEVELOPER READY</span><h2>Tokens</h2></div><div style={{display:'flex',gap:6}}><button style={action} onClick={()=>download('css')}><Download size={13}/> CSS</button><button style={action} onClick={()=>download('json')}><Download size={13}/> JSON</button></div></div>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',margin:'22px 0 14px'}}><div style={{display:'flex',alignItems:'center',gap:6,border:'1px solid var(--line)',background:'#fff',padding:'0 9px',flex:1,minWidth:170}}><MagnifyingGlass size={14}/><input placeholder="Find a token..." value={query} onChange={e=>setQuery(e.target.value)} style={{...control,border:0,width:'100%'}}/></div>{['All','Primitive','Semantic'].map(g=><button key={g} onClick={()=>setGroup(g)} style={{...control,background:group===g?'#242420':'#fff',color:group===g?'#fff':'var(--ink)',cursor:'pointer'}}>{g}</button>)}</div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap',margin:'12px 0'}}>
   <p style={{fontSize:10,color:'#888',margin:0}}>Select multiple tokens to copy them as CSS variables.</p>
   <button style={{...action,opacity:selected.length?1:.5}} disabled={!selected.length} onClick={()=>navigator.clipboard.writeText(':root {\n'+tokens.filter(t=>selected.includes(t.id)).map(t=>'  --atria-'+t.name.replaceAll('.','-')+': '+t.value+';').join('\n')+'\n}') }><Copy size={13}/> Copy selected CSS ({selected.length})</button>
  </div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:10}}>
   {visible.map(t=><article key={t.id} style={{minWidth:0,padding:14,border:'1px solid '+(selected.includes(t.id)?'#242420':'var(--line)'),background:'#fff'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,marginBottom:12}}><span style={{fontSize:8,letterSpacing:'.08em',color:'#999',textTransform:'uppercase'}}>{t.group} / {t.type}</span><input type="checkbox" aria-label={'Select '+t.name} checked={selected.includes(t.id)} onChange={e=>setSelected(old=>e.target.checked?[...old,t.id]:old.filter(id=>id!==t.id))} style={{accentColor:'#242420'}}/></div>
    <input value={editFor(t,'name')} aria-label="Token name" aria-invalid={Boolean(errorFor(t,'name'))} aria-describedby={errorFor(t,'name')?'err-name-'+t.id:undefined} onChange={e=>edit(t,'name',e.target.value)} onBlur={()=>revert(t,'name')} style={{...control,width:'100%',fontWeight:600,borderColor:errorFor(t,'name')?'#b54747':undefined}}/>
    {errorFor(t,'name')&&<small id={'err-name-'+t.id} role="alert" style={errorText}>{errorFor(t,'name')}</small>}
    <div style={{display:'flex',alignItems:'center',gap:7,marginTop:10}}>
     {t.type==='color'&&<input type="color" aria-label="Token colour" value={/^#[0-9a-f]{6}$/i.test(t.value)?t.value:'#777777'} onChange={e=>update(t.id,'value',e.target.value)} style={{width:34,height:34,padding:2,border:'1px solid var(--line)',background:'#fff'}}/>}
     <input value={editFor(t,'value')} aria-label="Token value" aria-invalid={Boolean(errorFor(t,'value'))} aria-describedby={errorFor(t,'value')?'err-value-'+t.id:undefined} onChange={e=>edit(t,'value',e.target.value)} onBlur={()=>revert(t,'value')} style={{...control,flex:1,minWidth:0,borderColor:errorFor(t,'value')?'#b54747':undefined}}/>
     <CopyValue value={'--atria-'+t.name.replaceAll('.','-')+': '+t.value+';'}/>
     <button title="Delete token" onClick={()=>{save(items=>items.filter(x=>x.id!==t.id));setSelected(old=>old.filter(id=>id!==t.id))}} style={{border:0,background:'transparent',cursor:'pointer'}}><Trash size={14}/></button>
    </div>
    {errorFor(t,'value')&&<small id={'err-value-'+t.id} role="alert" style={errorText}>{errorFor(t,'value')}</small>}
    <p style={{fontSize:10,color:'#888',lineHeight:1.5,minHeight:28,margin:'9px 0 0'}}>{t.description||'No description added.'}</p>
    <button onClick={()=>setActiveToken(t)} style={{...control,width:'100%',marginTop:10,cursor:'pointer'}}>Open token <span style={{float:'right'}}>↗</span></button>
   </article>)}
   {!visible.length&&<p style={{padding:16,color:'#888',fontSize:11}}>No matching tokens.</p>}
  </div>
  {activeToken&&<div role="presentation" onClick={()=>setActiveToken(null)} className="studio-modal-backdrop">
   <section role="dialog" aria-modal="true" aria-labelledby="token-detail-title" onClick={e=>e.stopPropagation()} className="studio-modal-dialog">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}><div><span className="studio-kicker">{activeToken.group} / {activeToken.type}</span><h3 id="token-detail-title" style={{fontSize:20,margin:'7px 0'}}>{activeToken.name}</h3></div><button onClick={()=>setActiveToken(null)} aria-label="Close token details" style={control}>Close</button></div>
    <p style={{fontSize:12,color:'#777'}}>{activeToken.description||'No description added.'}</p>
    <pre style={{whiteSpace:'pre-wrap',padding:14,background:'#242420',color:'#e9e7e1',fontSize:11,lineHeight:1.7}}>--atria-{activeToken.name.replaceAll('.','-')}: {activeToken.value};</pre>
    <button style={action} onClick={()=>navigator.clipboard.writeText('--atria-'+activeToken.name.replaceAll('.','-')+': '+activeToken.value+';')}><Copy size={13}/> Copy CSS</button>
   </section>
  </div>}
  <section style={{marginTop:20,padding:16,border:'1px solid var(--line)',background:'#fafaf8'}}><div className="placeholder-panel-heading"><div><span className="studio-kicker">ADD TO COLLECTION</span><h3>New token</h3></div></div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(135px,1fr))',gap:8}}><div><input aria-label="New token name" placeholder="color.brand.primary" value={draft.name} aria-invalid={Boolean(draftErrors.name)} aria-describedby={draftErrors.name?'draft-name-error':undefined} onChange={e=>{setDraft({...draft,name:e.target.value});setDraftErrors(old=>({...old,name:''}))}} style={{...control,width:'100%',borderColor:draftErrors.name?'#b54747':undefined}}/>{draftErrors.name&&<small id="draft-name-error" role="alert" style={errorText}>{draftErrors.name}</small>}</div><div><input aria-label="New token value" placeholder="#171717 or 16px" value={draft.value} aria-invalid={Boolean(draftErrors.value)} aria-describedby={draftErrors.value?'draft-value-error':undefined} onChange={e=>{setDraft({...draft,value:e.target.value});setDraftErrors(old=>({...old,value:''}))}} style={{...control,width:'100%',borderColor:draftErrors.value?'#b54747':undefined}}/>{draftErrors.value&&<small id="draft-value-error" role="alert" style={errorText}>{draftErrors.value}</small>}</div><select aria-label="Token type" value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})} style={control}><option value="color">Colour</option><option value="dimension">Dimension</option><option value="font">Font</option><option value="number">Number</option><option value="string">String</option></select><select aria-label="Token group" value={draft.group} onChange={e=>setDraft({...draft,group:e.target.value})} style={control}><option>Primitive</option><option>Semantic</option></select></div><div style={{display:'flex',gap:8,marginTop:8}}><input aria-label="Description" placeholder="Short usage note (optional)" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})} style={{...control,flex:1}}/><button style={action} onClick={add}><Plus size={13}/> Add</button></div></section>
  <section style={{marginTop:22,padding:16,border:'1px solid var(--line)',background:'#fafaf8'}}>
   <div className="placeholder-panel-heading"><div><span className="studio-kicker">IMPORT / REVIEW BEFORE APPLYING</span><h3>Import tokens from JSON</h3></div></div>
   <p style={{fontSize:10,color:'#888',lineHeight:1.6,margin:'0 0 10px'}}>Paste JSON or choose a file. Accepts an array of tokens (the same shape as the JSON export), an object with a "tokens" array, or an object keyed by token name. Existing tokens are never overwritten.</p>
   <textarea aria-label="Token JSON to import" placeholder={'[{"name":"color.accent","value":"#315FCE","type":"color"}]'} value={importText} onChange={e=>{setImportText(e.target.value);setReview(null)}} rows={5} style={{...control,width:'100%',fontFamily:'monospace',resize:'vertical'}}/>
   <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
    <button style={action} onClick={previewImport} disabled={!importText.trim()}>Preview import</button>
    <label style={{...control,cursor:'pointer'}}>Choose JSON file<input type="file" accept="application/json,.json" aria-label="Choose JSON file" onChange={loadImportFile} style={{display:'none'}}/></label>
   </div>
   {review&&<div style={{marginTop:12}}>
    {review.fileError?<p role="alert" style={{fontSize:11,color:'#b54747'}}>{review.fileError}</p>:<>
     <p aria-live="polite" style={{fontSize:11,margin:'0 0 8px'}}>{importable} of {review.rows.length} tokens can be imported.</p>
     <ul style={{listStyle:'none',margin:0,padding:0,display:'grid',gap:5,maxHeight:260,overflow:'auto'}}>{review.rows.map(r=><li key={r.index} data-status={r.status} style={{padding:'8px 10px',border:'1px solid '+(r.status==='new'?'var(--line)':r.status==='invalid'?'#b54747':'#c47a22'),background:'#fff',fontSize:11}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:8,flexWrap:'wrap'}}><div style={{minWidth:0,overflowWrap:'anywhere'}}><strong>{r.name||'(no name)'}</strong> <span style={{color:'#777'}}>{r.value} {r.status==='new'?'':'/ '+r.type}</span></div><span style={{fontSize:9,textTransform:'uppercase',flexShrink:0,color:r.status==='new'?'#2f7d52':r.status==='invalid'?'#b54747':'#876321'}}>{r.status==='new'?'New':r.status==='invalid'?'Invalid':'Skipped'}</span></div>{r.error&&<small style={{display:'block',marginTop:4,color:r.status==='invalid'?'#b54747':'#876321'}}>{r.error}</small>}</li>)}</ul>
     <button style={{...action,marginTop:10,opacity:importable?1:.5}} disabled={!importable} onClick={applyImport}>Import {importable} token{importable===1?'':'s'}</button>
    </>}
   </div>}
  </section>
  <section style={{marginTop:22}}><div className="placeholder-panel-heading"><div><span className="studio-kicker">LIVE EXPORT PREVIEW</span><h3>CSS custom properties</h3></div><CopyValue value={css}/></div><pre className="studio-code-block">{css}</pre></section>
  <div style={{display:'flex',justifyContent:'flex-end',marginTop:14}}><button style={control} onClick={()=>{if(window.confirm('Restore the starter token collection?'))reset()}}>Reset starter tokens</button></div>
 </div>;
}