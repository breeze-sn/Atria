import React, { useMemo, useState } from 'react';
import { Plus, Copy, Download, Trash, MagnifyingGlass } from '@phosphor-icons/react';
import { useStudioData } from '../data/studioStore.js';

const input = { minWidth:0, padding:'9px 10px', border:'1px solid var(--line)', background:'#fff', color:'var(--ink)', font:'inherit', fontSize:11, borderRadius:2 };
const button = { display:'inline-flex',alignItems:'center',gap:6,padding:'9px 11px',border:'1px solid var(--ink)',background:'var(--ink)',color:'#fff',fontSize:10,cursor:'pointer' };

export default function Tokens() {
  const [tokens, save, reset] = useStudioData('tokens');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const [draft, setDraft] = useState({ name:'', value:'', type:'color', description:'', group:'Primitive' });
  const visible = useMemo(()=>tokens.filter(t=>(group==='All'||t.group===group)&&[t.name,t.value,t.description].join(' ').toLowerCase().includes(query.toLowerCase())),[tokens,group,query]);
  const update = (id, field, value) => save(items=>items.map(t=>t.id===id?{...t,[field]:value}:t));
  const add = () => { if(!draft.name.trim()||!draft.value.trim()) return; save(items=>[...items,{...draft,id:crypto.randomUUID()}]); setDraft({name:'',value:'',type:'color',description:'',group:'Primitive'}); };
  const exportFile = (kind) => {
    const content = kind==='json' ? JSON.stringify(tokens,null,2) : ':root {\n'+tokens.map(t=>'  --atria-'+t.name.replaceAll('.','-')+': '+t.value+';').join('\n')+'\n}';
    const blob = new Blob([content],{type:kind==='json'?'application/json':'text/css'});
    const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='atria-tokens.'+kind; a.click(); URL.revokeObjectURL(url);
  };
  const copy = async (value) => { try { await navigator.clipboard.writeText(value); } catch { /* clipboard permission unavailable */ } };

  return <div className="studio-page">
    <div className="section-index">[ STUDIO / 02 — TOKENS ]</div>
    <div className="studio-page-heading"><div><span className="studio-status">LIVE TOKEN DATA · AUTO-SAVED</span><h2>Design Tokens</h2></div><span className="studio-page-count">02 / 03</span></div>
    <p className="studio-page-intro">Manage named design decisions in one place. Edit values inline, organise token groups, copy individual values, or export the complete collection.</p>
    <div className="token-summary-grid">
      <article><span>TOTAL TOKENS</span><strong>{tokens.length.toString().padStart(2,'0')}</strong><small>Saved tokens</small></article>
      <article><span>PRIMITIVES</span><strong>{tokens.filter(t=>t.group==='Primitive').length.toString().padStart(2,'0')}</strong><small>Base values</small></article>
      <article><span>SEMANTIC</span><strong>{tokens.filter(t=>t.group==='Semantic').length.toString().padStart(2,'0')}</strong><small>Contextual values</small></article>
    </div>
    <section style={{padding:18,border:'1px solid var(--line)',background:'#fafaf8',marginTop:20}}>
      <div className="placeholder-panel-heading"><div><span className="studio-kicker">TOKEN WORKSPACE / 01</span><h3>Add a token</h3></div></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))',gap:8}}>
        <input aria-label="Token name" placeholder="e.g. color.brand.primary" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} style={input}/>
        <input aria-label="Token value" placeholder="e.g. #171717 or 16px" value={draft.value} onChange={e=>setDraft({...draft,value:e.target.value})} style={input}/>
        <select aria-label="Token type" value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})} style={input}><option value="color">Colour</option><option value="dimension">Dimension</option><option value="font">Font</option><option value="number">Number</option><option value="string">String</option></select>
        <select aria-label="Token group" value={draft.group} onChange={e=>setDraft({...draft,group:e.target.value})} style={input}><option>Primitive</option><option>Semantic</option></select>
      </div>
      <div style={{display:'flex',gap:8,marginTop:9}}><input aria-label="Token description" placeholder="What is this token used for?" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})} style={{...input,flex:1}}/><button style={button} onClick={add}><Plus size={13}/> Add token</button></div>
    </section>
    <section style={{marginTop:26}}>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:10,marginBottom:12}}>
        <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{['All','Primitive','Semantic'].map(g=><button key={g} onClick={()=>setGroup(g)} style={{...input,background:group===g?'#242420':'transparent',color:group===g?'#fff':'var(--ink)',cursor:'pointer'}}>{g}</button>)}</div>
        <div style={{display:'flex',gap:6,alignItems:'center',border:'1px solid var(--line)',padding:'0 9px',background:'#fff'}}><MagnifyingGlass size={14}/><input aria-label="Search tokens" placeholder="Search tokens" value={query} onChange={e=>setQuery(e.target.value)} style={{...input,border:0}}/></div>
      </div>
      <div className="token-preview-table">
        <div className="token-preview-row token-preview-head"><span>NAME / DESCRIPTION</span><span>VALUE</span><span>TYPE</span></div>
        {visible.map(t=><div key={t.id} className="token-preview-row" style={{gridTemplateColumns:'minmax(0,1.6fr) minmax(95px,.9fr) 70px'}}>
          <div style={{minWidth:0}}><input aria-label="Token name" value={t.name} onChange={e=>update(t.id,'name',e.target.value)} style={{...input,width:'100%',padding:'5px 6px'}}/><small style={{display:'block',marginTop:4}}>{t.description}</small></div>
          <div style={{display:'flex',gap:5,alignItems:'center',minWidth:0}}>{t.type==='color'&&<input aria-label="Token colour" type="color" value={/^#[0-9a-f]{6}$/i.test(t.value)?t.value:'#777777'} onChange={e=>update(t.id,'value',e.target.value)} style={{width:25,height:25,padding:0,border:0}}/>}<input aria-label="Token value" value={t.value} onChange={e=>update(t.id,'value',e.target.value)} style={{...input,width:'100%',padding:'5px 6px'}}/><button title="Copy value" onClick={()=>copy(t.value)} style={{border:0,background:'transparent',cursor:'pointer'}}><Copy size={13}/></button></div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:4}}><small>{t.type}</small><button title="Delete token" onClick={()=>save(items=>items.filter(x=>x.id!==t.id))} style={{border:0,background:'transparent',cursor:'pointer'}}><Trash size={13}/></button></div>
        </div>)}
        {!visible.length&&<p style={{padding:18,color:'#888',fontSize:11}}>No tokens match this search.</p>}
      </div>
    </section>
    <section style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center',marginTop:20}}>
      <span className="studio-kicker" style={{marginRight:'auto'}}>EXPORT / {tokens.length} TOKENS</span>
      <button style={button} onClick={()=>exportFile('css')}><Download size={13}/> CSS variables</button>
      <button style={button} onClick={()=>exportFile('json')}><Download size={13}/> JSON</button>
      <button style={{...button,background:'transparent',color:'var(--ink)'}} onClick={()=>{if(window.confirm('Restore the starter token set?'))reset();}}>Reset defaults</button>
    </section>
  </div>;
}
