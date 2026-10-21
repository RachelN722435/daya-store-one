"use client"
import { useState } from "react"

const bodyTypes = ['Hourglass','Pear','Apple','Rectangle','Inverted Triangle','Petite','Tall','Athletic','Curvy','Plus Size','Busty','Slim','Straight','Balanced','Full Hips']
const occasions = ['Work','Date Night','Party','Casual Day','Wedding Guest','Travel','Brunch','Evening Out','Weekend']

export default function Page() {
  const [body, setBody] = useState<string | null>(null)
  const [occasion, setOccasion] = useState<string | null>(null)

  return (
    <div style={{fontFamily:'system-ui', background:'#faf9f6', minHeight:'100vh'}}>
      <div style={{padding:24, fontWeight:800, display:'flex', justifyContent:'space-between', borderBottom:'1px solid #eee'}}>
        <span onClick={()=>{setBody(null); setOccasion(null)}} style={{cursor:'pointer'}}>DAYA STORE</span>
        <span>Cart (0)</span>
      </div>

      {!body ? (
        <>
          <div style={{background:'black', color:'white', padding:'60px 24px', borderRadius:'0 0 40px 40px'}}>
            <h1 style={{fontSize:'14vw', lineHeight:0.85, margin:0, fontWeight:900}}>STYLE<br/>FIT<br/>GORGEOUS</h1>
            <p style={{marginTop:20, opacity:0.6}}>Choose your body type below</p>
          </div>
          <div style={{padding:24}}>
            <h2 style={{fontWeight:800, fontSize:20}}>Choose Your Body Type - 15 Types</h2>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:16}}>
              {bodyTypes.map(t=>(
                <button key={t} onClick={()=>setBody(t)} style={{aspectRatio:'3/4', borderRadius:20, background:'white', border:'1px solid #ddd', fontWeight:700, cursor:'pointer', fontSize:16}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : !occasion ? (
        <div style={{padding:24}}>
          <button onClick={()=>setBody(null)} style={{marginBottom:16, background:'none', border:'none', fontWeight:700, cursor:'pointer'}}>← Back</button>
          <h2 style={{fontWeight:900, fontSize:24}}>{body}</h2>
          <p>Now choose an occasion - 9 options</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:16}}>
            {occasions.map(o=>(
              <button key={o} onClick={()=>setOccasion(o)} style={{padding:24, borderRadius:20, background:'black', color:'white', fontWeight:700, cursor:'pointer', fontSize:16}}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{padding:24}}>
          <button onClick={()=>setOccasion(null)} style={{marginBottom:16, background:'none', border:'none', fontWeight:700, cursor:'pointer'}}>← Back to occasions</button>
          <h2 style={{fontWeight:900, fontSize:28}}>{body} × {occasion}</h2>
          <p style={{opacity:0.6}}>Showing outfits for {body} body type for {occasion} — ready to add products next.</p>
          <div style={{marginTop:24, padding:24, borderRadius:20, background:'white', border:'1px solid #eee', textAlign:'center'}}>
            Outfits will appear here
          </div>
        </div>
      )}
    </div>
  )
}