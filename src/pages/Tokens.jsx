import React,{useMemo,useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import {Plus,Copy,Download,Trash,MagnifyingGlass,Check} from '@phosphor-icons/react';
import {useStudioData} from '../data/studioStore.js';
import {parseTokenImport,rowsToTokens} from '../data/tokenImport.js';
import {validateName,validateValue,validateToken} from '../data/tokenValidation.js';
import {BUILT_IN_COLLECTIONS, DEFAULT_COLLECTION, changeCollection, restoreTokenWorkspace, validateCollectionName} from '../data/tokenWorkspace.js';
import { useThemePreview } from '../context/ThemeContext.jsx';

const errorText={display:'block',marginTop:5,fontSize:10,color:'#b54747',lineHeight:1.4};
const control={minWidth:0,padding:'9px 10px',borderWidth:1,borderStyle:'solid',borderColor:'var(--line)',background:'#fff',color:'var(--ink)',font:'inherit',fontSize:11};
const action={display:'inline-flex',alignItems:'center',gap:6,padding:'8px 10px',border:'1px solid var(--ink)',background:'#242420',color:'#fff',fontSize:10,cursor:'pointer'};

function CopyValue({value,color}){const [done,setDone]=useState(false);return <button title="Copy" onClick={async()=>{try{await navigator.clipboard.writeText(value);setDone(true);setTimeout(()=>setDone(false),1200)}catch{}}} style={{border:0,background:'transparent',cursor:'pointer',color:color||'inherit'}}>{done?<Check size={14}/>:<Copy size={14}/>}</button>}

export default function Tokens(){
 const [{tokens, collections},saveWorkspace,reset]=useStudioData('tokens');
 const [query,setQuery]=useState('');const [group,setGroup]=useState(null);const [selected,setSelected]=useState([]);const [activeTokenId,setActiveToken]=useState(null);const [importText,setImportText]=useState('');const [review,setReview]=useState(null);const [draftErrors,setDraftErrors]=useState({});const [edits,setEdits]=useState({});
 const [draft,setDraft]=useState({name:'',value:'',type:'color',description:'',group:DEFAULT_COLLECTION});
 const [collectionDraft,setCollectionDraft]=useState('');
 const [editingCollection,setEditingCollection]=useState(null);
 const [collectionError,setCollectionError]=useState('');
 let outlet=null;try{outlet=useOutletContext()}catch{outlet=null}
 const themeContext=useThemePreview();const previewTheme=outlet?.previewTheme??themeContext?.previewTheme??'light';
 const isDark = previewTheme === 'dark';
 const selectedCollection=collections.includes(group)?group:null;
 const canManage=selectedCollection!==null&&!BUILT_IN_COLLECTIONS.includes(selectedCollection);
 const activeToken=tokens.find(token=>token.id===activeTokenId);
 const save=updateTokens=>saveWorkspace(current=>({...current,tokens:updateTokens(current.tokens)}));

 const visible=useMemo(()=>tokens.filter(t=>(selectedCollection===null||t.group===selectedCollection)&&[t.name,t.value,t.description].join(' ').toLowerCase().includes(query.toLowerCase())),[tokens,selectedCollection,query]);
 const css=':root {\n'+tokens.map(t=>'  --atria-'+t.name.replaceAll('.','-')+': '+t.value+';').join('\n')+'\n}';
 const json=JSON.stringify(tokens.map(({name,value,type,description,group})=>({name,value,type,description,group})),null,2);
 const download=kind=>{const url=URL.createObjectURL(new Blob([kind==='json'?json:css],{type:kind==='json'?'application/json':'text/css'}));const a=document.createElement('a');a.href=url;a.download='atria-tokens.'+kind;a.click();URL.revokeObjectURL(url)};
 const add=()=>{const errors=validateToken(draft,tokens);setDraftErrors(errors);if(Object.keys(errors).length)return;const token={...draft,group:collections.includes(draft.group)?draft.group:DEFAULT_COLLECTION,name:draft.name.trim(),value:draft.value.trim(),id:crypto.randomUUID()};save(items=>[...items,token]);setDraft({name:'',value:'',type:'color',description:'',group:token.group})};
 const previewImport=()=>setReview(parseTokenImport(importText,tokens));
 const loadImportFile=async e=>{const file=e.target.files?.[0];if(!file)return;try{const text=await file.text();setImportText(text);setReview(parseTokenImport(text,tokens))}catch{setReview({fileError:'Could not read that file.',rows:[]})}e.target.value=''};
 const applyImport=()=>{const fresh=rowsToTokens(review.rows,()=>crypto.randomUUID());if(!fresh.length)return;saveWorkspace(current=>restoreTokenWorkspace({...current,tokens:[...current.tokens,...fresh]},[]));setReview(null);setImportText('')};
 const importable=review?review.rows.filter(r=>r.status==='new').length:0;
 const update=(id,field,value)=>save(items=>items.map(t=>t.id===id?{...t,[field]:value}:t));
 const editFor=(t,field)=>edits[t.id]&&field in edits[t.id]?edits[t.id][field]:t[field];
 const errorFor=(t,field)=>{const e=edits[t.id];if(!e||!(field in e))return '';return field==='name'?validateName(e.name,tokens,t.id):validateValue(e.value,t.type)};
 const edit=(t,field,value)=>{const error=field==='name'?validateName(value,tokens,t.id):validateValue(value,t.type);if(error){setEdits(old=>({...old,[t.id]:{...old[t.id],[field]:value}}));return}setEdits(old=>{const {[field]:_,...rest}=old[t.id]||{};const next={...old,[t.id]:rest};if(!Object.keys(rest).length)delete next[t.id];return next});update(t.id,field,value)};
 const revert=(t,field)=>setEdits(old=>{if(!old[t.id])return old;const {[field]:_,...rest}=old[t.id];const next={...old,[t.id]:rest};if(!Object.keys(rest).length)delete next[t.id];return next});

 function clearCollectionEditor() {
   setEditingCollection(null);
   setCollectionDraft('');
   setCollectionError('');
 }

 function selectCollection(name) {
   setGroup(name);
   clearCollectionEditor();
 }

 function submitCollection(event) {
   event.preventDefault();
   const error=validateCollectionName(collectionDraft,collections,editingCollection);
   setCollectionError(error);
   if(error)return;
   const name=collectionDraft.trim();
   saveWorkspace(current=>changeCollection(current,editingCollection,name));
   setDraft(current=>current.group===editingCollection?{...current,group:name}:current);
   selectCollection(name);
 }

 function deleteCollection() {
   if(!window.confirm('Delete this collection? Its tokens will move to Primitive.'))return;
   saveWorkspace(current=>changeCollection(current,selectedCollection,null));
   setDraft(current=>current.group===selectedCollection?{...current,group:DEFAULT_COLLECTION}:current);
   selectCollection(DEFAULT_COLLECTION);
 }

 const cardControlStyle = isDark ? {
   ...control,
   background: '#161618',
   color: '#f4f3ef',
   borderColor: '#38383e',
 } : control;

 return <div className="studio-page">
  <div className="section-index">[ STUDIO / TOKENS ]</div>
  <div className="studio-page-heading">
   <div><span className="studio-status">DESIGN VALUES / DEVELOPER READY</span><h2>Tokens</h2></div>
   <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
    <button style={action} onClick={()=>download('css')}><Download size={13}/> CSS</button>
    <button style={action} onClick={()=>download('json')}><Download size={13}/> JSON</button>
   </div>
  </div>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',margin:'22px 0 14px'}}>
   <div style={{display:'flex',alignItems:'center',gap:6,border:'1px solid '+(isDark?'#38383e':'var(--line)'),background:isDark?'#1c1c1f':'#fff',padding:'0 9px',flex:1,minWidth:170}}>
    <MagnifyingGlass size={14} color={isDark?'#a1a1aa':undefined}/>
    <input placeholder="Find a token..." value={query} onChange={e=>setQuery(e.target.value)} style={{...cardControlStyle,borderWidth:0,width:'100%'}}/>
   </div>
   {[null,...collections].map(name=><button key={name===null?'all-tokens':'collection-'+name} type="button" aria-pressed={selectedCollection===name} onClick={()=>selectCollection(name)} style={{...cardControlStyle,background:selectedCollection===name?(isDark?'#f4f3ef':'#242420'):(isDark?'#27272a':'#fff'),color:selectedCollection===name?(isDark?'#121214':'#fff'):(isDark?'#f4f3ef':'var(--ink)'),borderColor:isDark?'#38383e':'var(--line)',cursor:'pointer',maxWidth:'100%',overflowWrap:'anywhere'}}>{name??'All tokens'}</button>)}
  </div>
  <form aria-label="Token collections" onSubmit={submitCollection} style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',margin:'0 0 14px'}}>
   <input aria-label={editingCollection?'Rename collection':'New collection name'} placeholder={editingCollection?'Collection name':'New collection name'} aria-invalid={Boolean(collectionError)} aria-describedby={collectionError?'collection-name-error':undefined} maxLength={60} value={collectionDraft} onChange={e=>{setCollectionDraft(e.target.value);setCollectionError('')}} style={{...cardControlStyle,flex:'1 1 180px'}}/>
   <button type="submit" style={action}>{editingCollection?'Save name':'Create collection'}</button>
   {editingCollection&&<button type="button" onClick={clearCollectionEditor} style={cardControlStyle}>Cancel</button>}
   {canManage&&!editingCollection&&<button type="button" onClick={()=>{setEditingCollection(selectedCollection);setCollectionDraft(selectedCollection);setCollectionError('')}} style={cardControlStyle}>Rename collection</button>}
   {canManage&&!editingCollection&&<button type="button" onClick={deleteCollection} style={cardControlStyle}>Delete collection</button>}
   {collectionError&&<span id="collection-name-error" role="alert" style={{...errorText,flexBasis:'100%'}}>{collectionError}</span>}
  </form>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap',margin:'12px 0'}}>
   <p style={{fontSize:10,color:'#888',margin:0}}>Select multiple tokens to copy them as CSS variables.</p>
   <button style={{...action,opacity:selected.length?1:.5}} disabled={!selected.length} onClick={()=>navigator.clipboard.writeText(':root {\n'+tokens.filter(t=>selected.includes(t.id)).map(t=>'  --atria-'+t.name.replaceAll('.','-')+': '+t.value+';').join('\n')+'\n}') }><Copy size={13}/> Copy selected CSS ({selected.length})</button>
  </div>
  <div data-theme={previewTheme} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:10}}>
   {visible.map(t=><article key={t.id} style={{
     minWidth:0,
     padding:14,
     border:'1px solid '+(selected.includes(t.id)?(isDark?'#f4f3ef':'#242420'):(isDark?'#2e2e34':'var(--line)')),
     background:isDark?'#1c1c1f':'#fff',
     color:isDark?'#f4f3ef':'inherit',
     transition:'background 0.2s ease, border-color 0.2s ease'
   }}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,marginBottom:12}}>
     <span style={{fontSize:10,fontWeight:600,overflowWrap:'anywhere',color:isDark?'#a1a1aa':'#55534f'}}>{t.group} / {t.type}</span>
     <input type="checkbox" aria-label={'Select '+t.name} checked={selected.includes(t.id)} onChange={e=>setSelected(old=>e.target.checked?[...old,t.id]:old.filter(id=>id!==t.id))} style={{accentColor:isDark?'#f4f3ef':'#242420'}}/>
    </div>
    <input value={editFor(t,'name')} aria-label="Token name" aria-invalid={Boolean(errorFor(t,'name'))} aria-describedby={errorFor(t,'name')?'err-name-'+t.id:undefined} onChange={e=>edit(t,'name',e.target.value)} onBlur={()=>revert(t,'name')} style={{...cardControlStyle,width:'100%',fontWeight:600,borderColor:errorFor(t,'name')?'#b54747':isDark?'#38383e':'var(--line)'}}/>
    {errorFor(t,'name')&&<small id={'err-name-'+t.id} role="alert" style={{...errorText,color:isDark?'#f87171':'#b54747'}}>{errorFor(t,'name')}</small>}
    <div style={{display:'flex',alignItems:'center',gap:7,marginTop:10}}>
     {t.type==='color'&&<input type="color" aria-label="Token colour" value={/^#[0-9a-f]{6}$/i.test(t.value)?t.value:'#777777'} onChange={e=>update(t.id,'value',e.target.value)} style={{width:34,height:34,padding:2,border:'1px solid '+(isDark?'#3f3f46':'var(--line)'),background:isDark?'#161618':'#fff',borderRadius:3,boxShadow:isDark?'0 0 0 1px rgba(255,255,255,0.2)':'0 0 0 1px rgba(0,0,0,0.12)'}}/>}
     <input value={editFor(t,'value')} aria-label="Token value" aria-invalid={Boolean(errorFor(t,'value'))} aria-describedby={errorFor(t,'value')?'err-value-'+t.id:undefined} onChange={e=>edit(t,'value',e.target.value)} onBlur={()=>revert(t,'value')} style={{...cardControlStyle,flex:1,minWidth:0,borderColor:errorFor(t,'value')?'#b54747':isDark?'#38383e':'var(--line)'}}/>
     <CopyValue value={'--atria-'+t.name.replaceAll('.','-')+': '+t.value+';'} color={isDark?'#f4f3ef':undefined}/>
     <button title="Delete token" onClick={()=>{save(items=>items.filter(x=>x.id!==t.id));setSelected(old=>old.filter(id=>id!==t.id))}} style={{border:0,background:'transparent',color:isDark?'#a1a1aa':'inherit',cursor:'pointer'}}><Trash size={14}/></button>
    </div>
    {errorFor(t,'value')&&<small id={'err-value-'+t.id} role="alert" style={{...errorText,color:isDark?'#f87171':'#b54747'}}>{errorFor(t,'value')}</small>}
    <p style={{fontSize:10,color:isDark?'#a1a1aa':'#888',lineHeight:1.5,minHeight:28,margin:'9px 0 0'}}>{t.description||'No description added.'}</p>
    <label style={{display:'grid',gap:4,fontSize:10}}>Collection
     <select aria-label={'Move '+t.name+' to collection'} value={t.group} onChange={e=>update(t.id,'group',e.target.value)} style={{...cardControlStyle,width:'100%'}}>
      {collections.map(name=><option key={name}>{name}</option>)}
     </select>
    </label>
    <button onClick={()=>setActiveToken(t.id)} style={{...cardControlStyle,width:'100%',marginTop:10,cursor:'pointer'}}>Open token <span style={{float:'right'}}>↗</span></button>
   </article>)}
   {!visible.length&&<p style={{padding:16,color:'#888',fontSize:11}}>No matching tokens.</p>}
  </div>
  {activeToken&&<div role="presentation" onClick={()=>setActiveToken(null)} style={{position:'fixed',inset:0,zIndex:1100,background:isDark?'#000000b3':'#17171780',display:'grid',placeItems:'center',padding:18}}>
   <section role="dialog" aria-modal="true" aria-labelledby="token-detail-title" onClick={e=>e.stopPropagation()} style={{width:'min(100%,520px)',maxHeight:'85vh',overflow:'auto',background:isDark?'#1c1c1f':'#fff',border:'1px solid '+(isDark?'#2e2e34':'var(--line)'),color:isDark?'#f4f3ef':'inherit',padding:20,borderRadius:8}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}><div style={{textAlign:'left'}}><span className="studio-kicker">{activeToken.group} / {activeToken.type}</span><h3 id="token-detail-title" style={{fontSize:20,margin:'7px 0',color:isDark?'#f4f3ef':'inherit'}}>{activeToken.name}</h3></div><button onClick={()=>setActiveToken(null)} aria-label="Close token details" style={{...control,background:isDark?'#27272a':'#fff',color:isDark?'#f4f3ef':'var(--ink)',border:'1px solid '+(isDark?'#38383e':'var(--line)')}}>Close</button></div>
    <p style={{fontSize:12,color:isDark?'#a1a1aa':'#777'}}>{activeToken.description||'No description added.'}</p>
    {activeToken.type==='color'&&<div style={{display:'flex',alignItems:'center',gap:10,margin:'12px 0'}}><span style={{width:36,height:36,borderRadius:4,background:activeToken.value,boxShadow:isDark?'0 0 0 1px rgba(255,255,255,0.22)':'0 0 0 1px rgba(0,0,0,0.15)'}}/><code style={{fontSize:12,color:isDark?'#f4f3ef':'#242420'}}>{activeToken.value}</code></div>}
    <pre style={{whiteSpace:'pre-wrap',padding:14,background:'#242420',color:'#e9e7e1',fontSize:11,lineHeight:1.7}}>--atria-{activeToken.name.replaceAll('.','-')}: {activeToken.value};</pre>
    <button style={action} onClick={()=>navigator.clipboard.writeText('--atria-'+activeToken.name.replaceAll('.','-')+': '+activeToken.value+';')}><Copy size={13}/> Copy CSS</button>
   </section>
  </div>}
  <section style={{marginTop:20,padding:16,border:'1px solid '+(isDark?'#2e2e34':'var(--line)'),background:isDark?'#18181b':'#fafaf8',color:isDark?'#f4f3ef':'inherit'}}>
   <div className="placeholder-panel-heading"><div><span className="studio-kicker" style={{color:isDark?'#71717a':'#999'}}>ADD TO COLLECTION</span><h3 style={{margin:'4px 0',color:isDark?'#f4f3ef':'inherit'}}>New token</h3></div></div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(135px,1fr))',gap:8}}>
    <div>
     <input aria-label="New token name" placeholder="color.brand.primary" value={draft.name} aria-invalid={Boolean(draftErrors.name)} aria-describedby={draftErrors.name?'draft-name-error':undefined} onChange={e=>{setDraft({...draft,name:e.target.value});setDraftErrors(old=>({...old,name:''}))}} style={{...cardControlStyle,width:'100%',borderColor:draftErrors.name?'#b54747':undefined}}/>
     {draftErrors.name&&<small id="draft-name-error" role="alert" style={{...errorText,color:isDark?'#f87171':'#b54747'}}>{draftErrors.name}</small>}
    </div>
    <div>
     <input aria-label="New token value" placeholder="#171717 or 16px" value={draft.value} aria-invalid={Boolean(draftErrors.value)} aria-describedby={draftErrors.value?'draft-value-error':undefined} onChange={e=>{setDraft({...draft,value:e.target.value});setDraftErrors(old=>({...old,value:''}))}} style={{...cardControlStyle,width:'100%',borderColor:draftErrors.value?'#b54747':undefined}}/>
     {draftErrors.value&&<small id="draft-value-error" role="alert" style={{...errorText,color:isDark?'#f87171':'#b54747'}}>{draftErrors.value}</small>}
    </div>
    <select aria-label="Token type" value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})} style={cardControlStyle}><option value="color">Colour</option><option value="dimension">Dimension</option><option value="font">Font</option><option value="number">Number</option><option value="string">String</option></select>
    <select aria-label="Token group" value={collections.includes(draft.group)?draft.group:DEFAULT_COLLECTION} onChange={e=>setDraft({...draft,group:e.target.value})} style={cardControlStyle}>{collections.map(name=><option key={name}>{name}</option>)}</select>
   </div>
   <div style={{display:'flex',gap:8,marginTop:8}}>
    <input aria-label="Description" placeholder="Short usage note (optional)" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})} style={{...cardControlStyle,flex:1}}/>
    <button style={action} onClick={add}><Plus size={13}/> Add</button>
   </div>
  </section>
  <section style={{marginTop:22,padding:16,border:'1px solid '+(isDark?'#2e2e34':'var(--line)'),background:isDark?'#18181b':'#fafaf8',color:isDark?'#f4f3ef':'inherit'}}>
   <div className="placeholder-panel-heading"><div><span className="studio-kicker" style={{color:isDark?'#71717a':'#999'}}>IMPORT / REVIEW BEFORE APPLYING</span><h3 style={{margin:'4px 0',color:isDark?'#f4f3ef':'inherit'}}>Import tokens from JSON</h3></div></div>
   <p style={{fontSize:10,color:isDark?'#a1a1aa':'#888',lineHeight:1.6,margin:'0 0 10px'}}>Paste JSON or choose a file. Accepts an array of tokens (the same shape as the JSON export), an object with a "tokens" array, or an object keyed by token name. Existing tokens are never overwritten.</p>
   <textarea aria-label="Token JSON to import" placeholder={'[{"name":"color.accent","value":"#315FCE","type":"color"}]'} value={importText} onChange={e=>{setImportText(e.target.value);setReview(null)}} rows={5} style={{...cardControlStyle,width:'100%',fontFamily:'monospace',resize:'vertical'}}/>
   <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
    <button style={action} onClick={previewImport} disabled={!importText.trim()}>Preview import</button>
    <label style={{...cardControlStyle,cursor:'pointer'}}>Choose JSON file<input type="file" accept="application/json,.json" aria-label="Choose JSON file" onChange={loadImportFile} style={{display:'none'}}/></label>
   </div>
   {review&&<div style={{marginTop:12}}>
    {review.fileError?<p role="alert" style={{fontSize:11,color:'#ef4444'}}>{review.fileError}</p>:<>
     <p aria-live="polite" style={{fontSize:11,margin:'0 0 8px'}}>{importable} of {review.rows.length} tokens can be imported.</p>
     <ul style={{listStyle:'none',margin:0,padding:0,display:'grid',gap:5,maxHeight:260,overflow:'auto'}}>{review.rows.map(r=><li key={r.index} data-status={r.status} style={{padding:'8px 10px',border:'1px solid '+(r.status==='new'?(isDark?'#2e2e34':'var(--line)'):r.status==='invalid'?'#b54747':'#c47a22'),background:isDark?'#141416':'#fff',color:isDark?'#f4f3ef':'inherit',fontSize:11}}><strong>{r.name||'(no name)'}</strong> <span style={{color:isDark?'#a1a1aa':'#777'}}>{r.value} {r.status==='new'?'':'/ '+r.type}</span><span style={{float:'right',fontSize:9,textTransform:'uppercase',color:r.status==='new'?'#4ade80':r.status==='invalid'?'#f87171':'#fbbf24'}}>{r.status==='new'?'New':r.status==='invalid'?'Invalid':'Skipped'}</span>{r.error&&<small style={{display:'block',marginTop:4,color:r.status==='invalid'?'#f87171':'#fbbf24'}}>{r.error}</small>}</li>)}</ul>
     <button style={{...action,marginTop:10,opacity:importable?1:.5}} disabled={!importable} onClick={applyImport}>Import {importable} token{importable===1?'':'s'}</button>
    </>}
   </div>}
  </section>
  <section style={{marginTop:22}}><div className="placeholder-panel-heading"><div><span className="studio-kicker" style={{color:isDark?'#71717a':'#999'}}>LIVE EXPORT PREVIEW</span><h3 style={{color:isDark?'#f4f3ef':'inherit'}}>CSS custom properties</h3></div><CopyValue value={css} color={isDark?'#f4f3ef':undefined}/></div><pre style={{whiteSpace:'pre',overflowX:'auto',padding:15,background:isDark?'#141416':'#242420',color:'#e9e7e1',border:'1px solid '+(isDark?'#27272a':'#333'),fontSize:10,lineHeight:1.8}}>{css}</pre></section>
  <div style={{display:'flex',justifyContent:'flex-end',marginTop:14}}><button style={{...cardControlStyle,cursor:'pointer'}} onClick={()=>{if(window.confirm('Restore starter tokens and collections?')){reset();selectCollection(null)}}}>Reset starter tokens</button></div>
 </div>;
}
