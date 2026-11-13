import React from 'react';
import { Plus, RotateCcw } from '@phosphor-icons/react';
import { useStudioData } from '../data/studioStore.js';

const panel = { padding: 20, border: '1px solid var(--line)', background: '#fafaf8', marginTop: 18 };
const input = { minWidth: 0, padding: '9px 10px', border: '1px solid var(--line)', background: '#fff', color: 'var(--ink)', font: 'inherit', fontSize: 12, borderRadius: 2 };
const action = { padding: '9px 12px', border: '1px solid var(--ink)', background: 'var(--ink)', color: '#fff', fontSize: 11, cursor: 'pointer' };
const subtle = { padding: '7px 9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontSize: 10, cursor: 'pointer' };

export default function Foundations() {
  const [data, save, reset] = useStudioData('foundations');
  const updateColour = (id, field, value) => save((d) => ({ ...d, colours: d.colours.map((c) => c.id === id ? { ...c, [field]: value } : c) }));
  const addColour = () => save((d) => ({ ...d, colours: [...d.colours, { id: crypto.randomUUID(), name: 'New colour', value: '#777777' }] }));
  const removeColour = (id) => save((d) => ({ ...d, colours: d.colours.filter((c) => c.id !== id) }));
  const updateType = (index, field, value) => save((d) => ({ ...d, typography: d.typography.map((t, i) => i === index ? { ...t, [field]: Number(value) } : t) }));
  const updateSpacing = (index, value) => save((d) => ({ ...d, spacing: d.spacing.map((v, i) => i === index ? Math.max(0, Number(value) || 0) : v) }));
  const addSpacing = () => save((d) => ({ ...d, spacing: [...d.spacing, (Math.max(0, ...d.spacing) || 0) + 8] }));

  return <div className="studio-page">
    <div className="section-index">[ STUDIO / 01 — FOUNDATIONS ]</div>
    <div className="studio-page-heading"><div><span className="studio-status">EDITABLE WORKSPACE · SAVED IN THIS BROWSER</span><h2>Design Foundations</h2></div><span className="studio-page-count">01 / 03</span></div>
    <p className="studio-page-intro">Define the visual rules behind your system. Changes are saved automatically and are available to the token workspace on this device.</p>

    <section style={panel}>
      <div className="placeholder-panel-heading"><div><span className="studio-kicker">01 / COLOUR</span><h3>Colour palette</h3></div><button style={action} onClick={addColour}><Plus size={13}/> Add colour</button></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(135px,1fr))', gap:10 }}>
        {data.colours.map((c) => <article key={c.id} style={{ border:'1px solid var(--line)', background:'#fff', padding:10, minWidth:0 }}>
          <input aria-label={c.name + ' colour'} type="color" value={c.value} onChange={(e)=>updateColour(c.id,'value',e.target.value)} style={{ width:'100%', height:58, border:0, background:'transparent', cursor:'pointer' }}/>
          <input aria-label="Colour name" value={c.name} onChange={(e)=>updateColour(c.id,'name',e.target.value)} style={{...input,width:'100%',marginTop:8}}/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:5,marginTop:7}}><code style={{fontSize:10}}>{c.value.toUpperCase()}</code><button style={subtle} onClick={()=>removeColour(c.id)}>Remove</button></div>
        </article>)}
      </div>
    </section>

    <section style={panel}>
      <div className="placeholder-panel-heading"><div><span className="studio-kicker">02 / TYPOGRAPHY</span><h3>Type scale</h3></div><span className="workspace-section-meta">{data.typography.length} STYLES</span></div>
      <div style={{display:'grid',gap:0}}>
        {data.typography.map((t,i)=><div key={t.name} style={{display:'grid',gridTemplateColumns:'minmax(90px,1fr) 75px 75px 75px',gap:9,alignItems:'center',padding:'12px 0',borderTop:'1px solid var(--line)'}}>
          <div style={{minWidth:0}}><strong style={{display:'block',fontSize:Math.min(t.size,30),lineHeight:t.lineHeight,overflow:'hidden'}}>{t.name}</strong><small style={{color:'#99968e',fontSize:9}}>{t.size}px · weight {t.weight}</small></div>
          <label style={{fontSize:9,color:'#888'}}>Size<input aria-label={t.name+' size'} type="number" min="8" max="96" value={t.size} onChange={e=>updateType(i,'size',e.target.value)} style={{...input,width:'100%',marginTop:4}}/></label>
          <label style={{fontSize:9,color:'#888'}}>Weight<input aria-label={t.name+' weight'} type="number" min="100" max="900" step="100" value={t.weight} onChange={e=>updateType(i,'weight',e.target.value)} style={{...input,width:'100%',marginTop:4}}/></label>
          <label style={{fontSize:9,color:'#888'}}>Line height<input aria-label={t.name+' line height'} type="number" min="1" max="3" step=".1" value={t.lineHeight} onChange={e=>updateType(i,'lineHeight',e.target.value)} style={{...input,width:'100%',marginTop:4}}/></label>
        </div>)}
      </div>
    </section>

    <section style={panel}>
      <div className="placeholder-panel-heading"><div><span className="studio-kicker">03 / SPACING</span><h3>Spacing scale</h3></div><button style={action} onClick={addSpacing}><Plus size={13}/> Add step</button></div>
      <div style={{display:'grid',gap:12}}>
        {data.spacing.map((v,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'70px minmax(50px,1fr) 55px',alignItems:'center',gap:12}}>
          <input aria-label={'Spacing step '+(i+1)} type="number" min="0" value={v} onChange={e=>updateSpacing(i,e.target.value)} style={input}/>
          <div style={{height:10,background:'#e8e6df',overflow:'hidden'}}><div style={{height:'100%',width:Math.min(v,240)/240*100+'%',background:'#55534f'}}/></div>
          <code style={{fontSize:10}}>{v}px</code>
        </div>)}
      </div>
    </section>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginTop:20}}><small style={{color:'#99968e'}}>Edits save automatically to this browser.</small><button style={subtle} onClick={()=>{if(window.confirm('Reset foundations to the original Atria values?')) reset();}}><RotateCcw size={12}/> Reset defaults</button></div>
  </div>;
}
