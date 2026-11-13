import React, { useState } from 'react';
import { useStudioData } from '../data/studioStore.js';

const control = { padding:'8px 9px',border:'1px solid var(--line)',background:'#fff',fontSize:11,color:'var(--ink)',minWidth:0 };
const definitions = [
  { id:'button',name:'Button',category:'Action',description:'Triggers an action or advances a workflow.',variants:['Primary','Secondary','Tertiary'],states:['Default','Disabled'],usage:'Use one primary action per focused section.' },
  { id:'field',name:'Text field',category:'Input',description:'Collects a short, single-line response.',variants:['Default','Filled'],states:['Default','Disabled'],usage:'Always pair an input with a visible label.' },
  { id:'badge',name:'Status badge',category:'Feedback',description:'Communicates a compact status or category.',variants:['Neutral','Success','Warning'],states:['Default'],usage:'Use concise labels and do not rely on colour alone.' },
];

export default function Components() {
  const [active,setActive]=useState('button');
  const [variant,setVariant]=useState('Primary');
  const [disabled,setDisabled]=useState(false);
  const [label,setLabel]=useState('Continue');
  const [fieldValue,setFieldValue]=useState('hello@atria.design');
  const [clicks,setClicks]=useState(0);
  const [data]=useStudioData('tokens');
  const item=definitions.find(d=>d.id===active)||definitions[0];
  const buttonStyle={padding:'11px 17px',fontSize:12,fontWeight:600,borderRadius:4,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.45:1,background:variant==='Primary'?'#242420':variant==='Secondary'?'#fff':'transparent',color:variant==='Primary'?'#fff':'#242420',border:variant==='Tertiary'?'1px solid transparent':'1px solid #242420'};
  return <div className="studio-page">
    <div className="section-index">[ STUDIO / 03 — COMPONENTS ]</div>
    <div className="studio-page-heading"><div><span className="studio-status">INTERACTIVE COMPONENT PLAYGROUND</span><h2>Component Library</h2></div><span className="studio-page-count">03 / 03</span></div>
    <p className="studio-page-intro">Explore working interface patterns, change their properties, and test their behaviour. These examples are rendered as real controls, not static illustrations.</p>
    <div style={{display:'grid',gridTemplateColumns:'minmax(145px,.72fr) minmax(0,1.8fr)',gap:14,marginTop:24}}>
      <aside style={{border:'1px solid var(--line)',background:'#fafaf8',padding:12}}>
        <span className="studio-kicker">LIBRARY / {definitions.length.toString().padStart(2,'0')}</span>
        {definitions.map((d,i)=><button key={d.id} onClick={()=>{setActive(d.id);setVariant(d.variants[0]);setDisabled(false);}} style={{display:'block',width:'100%',textAlign:'left',padding:'13px 8px',marginTop:6,border:'1px solid '+(active===d.id?'#242420':'transparent'),background:active===d.id?'#eeede9':'transparent',cursor:'pointer',color:'var(--ink)'}}><small style={{display:'block',fontSize:8,color:'#99968e'}}>{'0'+(i+1)} / {d.category.toUpperCase()}</small><strong style={{fontSize:12}}>{d.name}</strong></button>)}
      </aside>
      <section style={{minWidth:0,border:'1px solid var(--line)',background:'#fafaf8',padding:18}}>
        <div className="placeholder-panel-heading"><div><span className="studio-kicker">LIVE PREVIEW / {item.category.toUpperCase()}</span><h3>{item.name}</h3></div><span className="placeholder-tag">WORKING EXAMPLE</span></div>
        <p style={{fontSize:11,color:'#777',lineHeight:1.7}}>{item.description}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',padding:24,margin:'16px 0',minHeight:130,background:'#f0efeb',border:'1px solid var(--line)'}}>
          {active==='button'&&<button disabled={disabled} onClick={()=>setClicks(n=>n+1)} style={buttonStyle}>{label} <span aria-hidden="true">↗</span></button>}
          {active==='field'&&<label style={{display:'grid',gap:6,width:'min(100%,280px)',fontSize:10,color:'#65625b'}}>Email address<input disabled={disabled} value={fieldValue} onChange={e=>setFieldValue(e.target.value)} placeholder="you@example.com" style={{...control,width:'100%',padding:11,borderRadius:3}}/></label>}
          {active==='badge'&&<span style={{display:'inline-flex',alignItems:'center',gap:7,padding:'7px 11px',border:'1px solid '+(variant==='Success'?'#b9c9b2':variant==='Warning'?'#d9c69a':'#d8d6cf'),borderRadius:30,background:variant==='Success'?'#edf3e9':variant==='Warning'?'#f7f1e4':'#f0efeb',fontSize:11,color:'#55534f'}}><i style={{width:6,height:6,borderRadius:'50%',background:variant==='Success'?'#6f8c5e':variant==='Warning'?'#b28a42':'#8b8982'}}/>{variant==='Success'?'Published':variant==='Warning'?'Needs review':'Draft'}</span>}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(135px,1fr))',gap:10}}>
          <label style={{display:'grid',gap:6,fontSize:9,color:'#888'}}>VARIANT<select value={variant} onChange={e=>setVariant(e.target.value)} style={control}>{item.variants.map(v=><option key={v}>{v}</option>)}</select></label>
          {active==='button'&&<label style={{display:'grid',gap:6,fontSize:9,color:'#888'}}>BUTTON LABEL<input value={label} onChange={e=>setLabel(e.target.value)} style={control}/></label>}
          <label style={{display:'flex',alignItems:'center',gap:7,fontSize:10,color:'#777'}}><input type="checkbox" checked={disabled} onChange={e=>setDisabled(e.target.checked)}/> Disabled state</label>
        </div>
        {active==='button'&&<p style={{fontSize:10,color:'#777',marginTop:12}}>Interaction test: activated {clicks} time{clicks===1?'':'s'}.</p>}
        {active==='field'&&<p style={{fontSize:10,color:'#777',marginTop:12}}>Current value: {fieldValue||'—'} · {fieldValue.includes('@')?'Looks like an email address':'Enter an email address'}</p>}
        <div style={{borderTop:'1px solid var(--line)',marginTop:18,paddingTop:14}}><span className="studio-kicker">USAGE GUIDANCE</span><p style={{fontSize:11,color:'#777',lineHeight:1.7,marginBottom:0}}>{item.usage}</p></div>
      </section>
    </div>
    <section style={{marginTop:20,padding:18,border:'1px solid var(--line)',background:'#fafaf8'}}>
      <span className="studio-kicker">CONNECTED DESIGN TOKENS</span><h3 style={{fontSize:17,margin:'7px 0'}}>Values available to components</h3>
      <p style={{fontSize:10,color:'#888'}}>These values come from your editable token collection ({data.length} saved tokens).</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:7}}>{data.slice(0,6).map(t=><div key={t.id} style={{display:'flex',justifyContent:'space-between',gap:8,padding:'9px',border:'1px solid var(--line)',background:'#fff',fontSize:9}}><span style={{overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</span><code>{t.value}</code></div>)}</div>
    </section>
  </div>;
}
