import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Copy, Download, Plus, RotateCounterClockwise } from '@phosphor-icons/react';

const buttonStyle = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7, padding:'9px 12px', border:'1px solid var(--line)', background:'#fff', color:'var(--ink)', fontSize:11, cursor:'pointer' };
const palettes = [
  {id:'neutral',name:'Neutral & Minimal',description:'A quiet, versatile foundation for product interfaces.',tags:['Neutral','Versatile'],colors:[['Ink','#171717'],['Graphite','#454545'],['Stone','#85827B'],['Mist','#D5D1C8'],['Paper','#EEECE7']]},
  {id:'warm-earth',name:'Warm Earth',description:'Grounded clay, sand and natural tones.',tags:['Warm','Organic'],colors:[['Cocoa','#49352D'],['Terracotta','#A85D43'],['Clay','#C98768'],['Sand','#E6CDB2'],['Linen','#F5EBDD']]},
  {id:'cool-calm',name:'Cool & Calm',description:'Muted blues and cool neutrals for focused products.',tags:['Cool','Calm'],colors:[['Midnight','#172B3A'],['Ocean','#31566A'],['Slate','#668493'],['Ice','#C7D9DF'],['Cloud','#EFF4F5']]},
  {id:'pastel',name:'Soft Pastel',description:'Gentle colour accents with a light, friendly feel.',tags:['Soft','Expressive'],colors:[['Plum','#745B78'],['Lilac','#B7A2C2'],['Rose','#E3BFC4'],['Butter','#F0DFA8'],['Chalk','#FAF7F2']]},
  {id:'vibrant',name:'Vibrant Studio',description:'Confident, high-energy accents balanced by deep ink.',tags:['Bold','Bright'],colors:[['Night','#17152E'],['Violet','#6846D6'],['Blue','#3478E5'],['Coral','#F07863'],['Lemon','#F2D65C']]},
  {id:'dark-mode',name:'Dark Interface',description:'A layered dark palette for low-light experiences.',tags:['Dark','Interface'],colors:[['Void','#101114'],['Surface','#1B1D22'],['Elevated','#292C33'],['Muted','#9298A5'],['Text','#F1F2F4']]},
  {id:'mono',name:'Monochrome',description:'A precise grayscale system for restrained interfaces.',tags:['Minimal','Grayscale'],colors:[['Black','#111111'],['Charcoal','#383838'],['Gray','#777777'],['Silver','#BBBBBB'],['White','#F7F7F7']]}
];
const typeSets = [
 {id:'modern-sans',name:'Modern Sans',description:'A balanced hierarchy for contemporary digital products.',tags:['Sans','Product'],items:[['Display',40,600,1.1],['Heading',30,600,1.2],['Title',22,600,1.3],['Body',15,400,1.6],['Label',12,500,1.4],['Caption',11,400,1.4]]},
 {id:'editorial',name:'Editorial',description:'A considered scale for content-rich and reading experiences.',tags:['Editorial','Content'],items:[['Display',48,500,1.05],['Heading',34,600,1.15],['Title',24,600,1.3],['Body',17,400,1.7],['Label',13,500,1.4],['Caption',11,400,1.5]]},
 {id:'compact-ui',name:'Compact UI',description:'A dense, efficient hierarchy for complex applications.',tags:['Compact','Utility'],items:[['Display',32,600,1.1],['Heading',24,600,1.2],['Title',18,600,1.3],['Body',13,400,1.5],['Label',11,500,1.4],['Caption',10,400,1.4]]}
];
const spaceSets = [
 {id:'compact',name:'Compact',description:'Tighter spacing for dense interfaces and data-heavy tools.',tags:['Dense','4pt base'],items:[2,4,8,12,16,20,24,32]},
 {id:'balanced',name:'Balanced',description:'A flexible rhythm for most product experiences.',tags:['Versatile','4pt base'],items:[4,8,12,16,24,32,48,64]},
 {id:'spacious',name:'Spacious',description:'Open layouts with generous breathing room.',tags:['Airy','8pt base'],items:[8,16,24,32,40,48,64,80]}
];
const radiusSets = [
 {id:'soft-radius',name:'Soft Corners',description:'Friendly rounded surfaces with subtle elevation.',tags:['Soft','Friendly'],items:[0,6,12,18,999]},
 {id:'sharp-radius',name:'Sharp & Precise',description:'Crisp geometry for technical and editorial interfaces.',tags:['Sharp','Minimal'],items:[0,2,4,6,999]},
 {id:'rounded-radius',name:'Rounded',description:'Expressive rounded shapes for approachable products.',tags:['Rounded','Expressive'],items:[4,10,16,24,999]}
];
const categories = [
 {id:'colour',label:'Colour palettes',description:'Ready-made colour systems',resources:palettes},
 {id:'typography',label:'Typography',description:'Type scales and hierarchy',resources:typeSets},
 {id:'spacing',label:'Spacing',description:'Layout rhythm and spacing scales',resources:spaceSets},
 {id:'radius',label:'Radius & shadows',description:'Surface shape and elevation',resources:radiusSets}
];
function CopyButton({value,label='Copy'}) { const [copied,setCopied]=useState(false); return <button style={buttonStyle} onClick={async()=>{try{await navigator.clipboard.writeText(value);setCopied(true);window.setTimeout(()=>setCopied(false),1200)}catch{}}}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':label}</button>; }
function downloadFile(name,content,type='text/css'){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
function ResourceCard({resource,category,onClick}) {
 return <button onClick={onClick} style={{textAlign:'left',border:'1px solid var(--line)',background:'#fff',padding:14,cursor:'pointer',color:'var(--ink)',minWidth:0}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}><span className="studio-kicker">{category.label.toUpperCase()}</span><ArrowUpRight size={15}/></div>
  {category.id==='colour' ? <div style={{display:'flex',gap:5,marginBottom:14}}>{resource.colors.map(([n,c])=><span key={n} title={n} style={{height:56,flex:1,minWidth:0,borderRadius:30,background:c,border:'1px solid rgba(0,0,0,.06)'}}/>)}</div> :
   category.id==='typography' ? <div style={{height:56,display:'flex',flexDirection:'column',justifyContent:'center',gap:3,marginBottom:14}}><strong style={{fontSize:24,lineHeight:1}}>Aa</strong><span style={{fontSize:10,color:'#888'}}>Aa Bb Cc 123</span></div> :
   category.id==='spacing' ? <div style={{height:56,display:'flex',alignItems:'end',gap:5,marginBottom:14}}>{resource.items.slice(0,6).map((v,i)=><span key={i} style={{width:18,height:Math.max(8,v),maxHeight:52,background:'#55534F'}}/>)}</div> :
   <div style={{height:56,display:'flex',alignItems:'center',gap:10,marginBottom:14}}>{resource.items.slice(1,4).map((v,i)=><span key={i} style={{width:38,height:38,background:'#eeede9',border:'1px solid #d8d6cf',borderRadius:v}}/>)}</div>}
  <strong style={{display:'block',fontSize:13,marginBottom:5}}>{resource.name}</strong><span style={{display:'block',fontSize:11,lineHeight:1.5,color:'#777',minHeight:34}}>{resource.description}</span>
  <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:12}}>{resource.tags.map(tag=><span key={tag} style={{fontSize:9,padding:'4px 6px',background:'#f3f2ef',color:'#666'}}>{tag}</span>)}</div>
 </button>;
}
function FoundationsLibrary(){
 const navigate=useNavigate();
 return <div className="studio-page">
  <div className="section-index">[ STUDIO / FOUNDATIONS ]</div>
  <div className="studio-page-heading"><div><span className="studio-status">DESIGN RESOURCE LIBRARY</span><h2>Foundations</h2></div></div>
  <p style={{fontSize:13,color:'#777',lineHeight:1.7,maxWidth:600,margin:'8px 0 28px'}}>Explore ready-to-use foundations for your next product. Open any resource to customise its values, copy them or export them for your project.</p>
  {categories.map(category=><section key={category.id} style={{marginBottom:30}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:12,marginBottom:12}}><div><span className="studio-kicker">{category.resources.length} RESOURCES</span><h3 style={{fontSize:18,margin:'5px 0'}}>{category.label}</h3><p style={{fontSize:11,color:'#888',margin:0}}>{category.description}</p></div></div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:10}}>{category.resources.map(resource=><ResourceCard key={resource.id} resource={resource} category={category} onClick={()=>navigate('/explore/foundations/'+category.id+'/'+resource.id)}/>)}</div>
  </section>)}
 </div>;
}
function ResourceDetail({category,resource}){
 const navigate=useNavigate();
 const storageKey='atria:foundation-resource:'+category.id+':'+resource.id;
 const [values,setValues]=useState(()=>{try{const saved=localStorage.getItem(storageKey);return saved?JSON.parse(saved):category.id==='colour'?resource.colors.map(([name,value])=>({name,value})):category.id==='typography'?resource.items.map(([name,size,weight,lineHeight])=>({name,size,weight,lineHeight})):resource.items.map((value,i)=>({name:category.id==='spacing'?'Space '+(i+1):['None','Small','Medium','Large','Pill'][i],value}));}catch{return [];}});
 const [newName,setNewName]=useState('');
 const save=next=>{setValues(next);try{localStorage.setItem(storageKey,JSON.stringify(next));}catch{}};
 const css=useMemo(()=>{if(category.id==='colour')return ':root {\n'+values.map(v=>'  --color-'+v.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+': '+v.value+';').join('\n')+'\n}';if(category.id==='typography')return ':root {\n'+values.map(v=>'  --font-'+v.name.toLowerCase()+': '+v.size+'px;').join('\n')+'\n}';return ':root {\n'+values.map((v,i)=>'  --'+(category.id==='spacing'?'space-'+(i+1):'radius-'+v.name.toLowerCase())+': '+v.value+'px;').join('\n')+'\n}';},[values,category]);
 const json=JSON.stringify(values,null,2);
 const update=(index,field,value)=>save(values.map((v,i)=>i===index?{...v,[field]:value}:v));
 const reset=()=>{const initial=category.id==='colour'?resource.colors.map(([name,value])=>({name,value})):category.id==='typography'?resource.items.map(([name,size,weight,lineHeight])=>({name,size,weight,lineHeight})):resource.items.map((value,i)=>({name:category.id==='spacing'?'Space '+(i+1):['None','Small','Medium','Large','Pill'][i],value}));save(initial);};
 return <div className="studio-page">
  <button onClick={()=>navigate('/explore/foundations')} style={{...buttonStyle,marginBottom:22}}><ArrowLeft size={14}/> All foundations</button>
  <div className="section-index">[ FOUNDATIONS / {category.label.toUpperCase()} ]</div>
  <div className="studio-page-heading"><div><span className="studio-status">CUSTOMISABLE RESOURCE</span><h2>{resource.name}</h2></div><div style={{display:'flex',gap:7,flexWrap:'wrap'}}><CopyButton value={css} label="Copy CSS"/><button style={buttonStyle} onClick={()=>downloadFile(resource.id+'.css',css)}><Download size={14}/> Export CSS</button></div></div>
  <p style={{fontSize:12,color:'#777',lineHeight:1.6,margin:'8px 0 22px'}}>{resource.description} Changes are saved in this browser and won't alter the original library preset.</p>
  {category.id==='colour'&&<section><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))',gap:10}}>{values.map((v,i)=><article key={i} style={{border:'1px solid var(--line)',background:'#fff',padding:12}}><input type="color" aria-label={v.name+' colour'} value={v.value} onChange={e=>update(i,'value',e.target.value)} style={{display:'block',width:82,height:82,aspectRatio:'1',borderRadius:'50%',overflow:'hidden',border:'1px solid var(--line)',padding:0,margin:'4px auto 12px',cursor:'pointer'}}/><input value={v.name} onChange={e=>update(i,'name',e.target.value)} aria-label="Colour name" style={{width:'100%',border:0,borderBottom:'1px solid var(--line)',padding:'7px 2px',fontSize:12}}/><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}><code style={{fontSize:11}}>{v.value.toUpperCase()}</code><CopyButton value={v.value}/></div></article>)}</div><button style={{...buttonStyle,marginTop:12}} onClick={()=>save([...values,{name:'New colour',value:'#A0A0A0'}])}><Plus size={14}/> Add colour</button></section>}
  {category.id==='typography'&&<section style={{border:'1px solid var(--line)',background:'#fff',padding:16}}>{values.map((v,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 70px 70px',gap:10,alignItems:'center',padding:'14px 0',borderBottom:'1px solid var(--line)'}}><div style={{minWidth:0}}><div style={{fontSize:'clamp(16px,'+Math.min(v.size,38)+'px,38px)',fontWeight:v.weight,lineHeight:v.lineHeight,overflowWrap:'anywhere'}}>The quick brown fox</div><input value={v.name} onChange={e=>update(i,'name',e.target.value)} style={{fontSize:10,border:0,padding:'5px 0',width:'100%'}}/></div><label style={{fontSize:9}}>Size<input type="number" min="8" max="96" value={v.size} onChange={e=>update(i,'size',Number(e.target.value))} style={{...buttonStyle,width:'100%',marginTop:4}}/></label><label style={{fontSize:9}}>Weight<input type="number" min="100" max="900" step="100" value={v.weight} onChange={e=>update(i,'weight',Number(e.target.value))} style={{...buttonStyle,width:'100%',marginTop:4}}/></label></div>)}</section>}
  {category.id==='spacing'&&<section style={{border:'1px solid var(--line)',background:'#fff',padding:16}}>{values.map((v,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'72px minmax(0,1fr) 70px',gap:12,alignItems:'center',padding:'9px 0'}}><code style={{fontSize:10}}>space-{i+1}</code><div style={{height:20,background:'#f0efeb'}}><div style={{height:20,width:Math.min(v.value,240),maxWidth:'100%',background:'#55534f'}}/></div><input type="number" min="0" value={v.value} onChange={e=>update(i,'value',Math.max(0,Number(e.target.value)||0))} style={buttonStyle}/></div>)}</section>}
  {category.id==='radius'&&<section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:12}}>{values.map((v,i)=><article key={i} style={{border:'1px solid var(--line)',background:'#fff',padding:14,textAlign:'center'}}><div style={{height:86,background:'#eeede9',border:'1px solid #d8d6cf',borderRadius:v.value,marginBottom:12}}/><input value={v.name} onChange={e=>update(i,'name',e.target.value)} style={{width:'100%',textAlign:'center',border:0,fontSize:11}}/><label style={{display:'block',fontSize:9,color:'#888',marginTop:8}}>RADIUS (PX)<input type="number" min="0" value={v.value} onChange={e=>update(i,'value',Math.max(0,Number(e.target.value)||0))} style={{...buttonStyle,width:'100%',marginTop:4}}/></label></article>)}</section>}
  <section style={{marginTop:26}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,marginBottom:10}}><div><span className="studio-kicker">DEVELOPER HANDOFF</span><h3 style={{margin:'4px 0',fontSize:16}}>Export your resource</h3></div><div style={{display:'flex',gap:6,flexWrap:'wrap'}}><CopyButton value={json} label="Copy JSON"/><button style={buttonStyle} onClick={()=>downloadFile(resource.id+'.json',json,'application/json')}><Download size={14}/> JSON</button></div></div><pre style={{whiteSpace:'pre',overflowX:'auto',padding:15,background:'#242420',color:'#e9e7e1',fontSize:10,lineHeight:1.8}}>{css}</pre></section>
  <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}><button style={buttonStyle} onClick={reset}><RotateCounterClockwise size={14}/> Reset this resource</button></div>
 </div>;
}
export default function Foundations(){
 const {categoryId,resourceId}=useParams();
 if(!categoryId)return <FoundationsLibrary/>;
 const category=categories.find(c=>c.id===categoryId);
 const resource=category?.resources.find(r=>r.id===resourceId);
 if(!category||!resource)return <FoundationsLibrary/>;
 return <ResourceDetail key={categoryId+':'+resourceId} category={category} resource={resource}/>;
}
