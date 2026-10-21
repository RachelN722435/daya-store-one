"use client"
import { useState } from "react"

export default function CalculatorPage() {
  const [bust, setBust] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [unit, setUnit] = useState("inches")
  const [result, setResult] = useState<any>(null)

  const calc = () => {
    let b = parseFloat(bust), w = parseFloat(waist), h = parseFloat(hip)
    if (!b || !w || !h) return
    if (unit === "cm") { b/=2.54; w/=2.54; h/=2.54; }
    
    let type = "Rectangle"
    if (Math.abs(b-h)/b < 0.05 && (b-w)/b > 0.25) type = "Hourglass"
    else if (h > b*1.05) type = "Pear"
    else if (b > h*1.05) type = "Inverted Triangle"
    else if (w > b && w > h) type = "Apple"

    let usSize = "8"
    const key = type==="Pear"?h:type==="Inverted Triangle"?b:type==="Apple"?w:(b+h)/2
    if (key < 33) usSize="0"; else if (key < 34.5) usSize="4"; else if (key < 35.5) usSize="6"
    else if (key < 36.5) usSize="8"; else if (key < 38.5) usSize="10"; else if (key < 41) usSize="12"
    else if (key < 45) usSize="16"; else usSize="20"

    setResult({ type, usSize, uk: parseInt(usSize)+4, eu: parseInt(usSize)+32, b:b.toFixed(1), w:w.toFixed(1), h:h.toFixed(1) })
  }

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">Find My Daya Fit</h1>
      <p className="text-sm mb-6 text-gray-600">Enter your measurements to get your body type & Daya size</p>
      
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setUnit("inches")} className={`px-4 py-2 rounded-full border ${unit==="inches"?"bg-black text-white":""}`}>Inches</button>
        <button onClick={()=>setUnit("cm")} className={`px-4 py-2 rounded-full border ${unit==="cm"?"bg-black text-white":""}`}>CM</button>
      </div>

      <input placeholder="Bust" value={bust} onChange={e=>setBust(e.target.value)} type="number" className="w-full border p-3 rounded-xl mb-3"/>
      <input placeholder="Waist" value={waist} onChange={e=>setWaist(e.target.value)} type="number" className="w-full border p-3 rounded-xl mb-3"/>
      <input placeholder="Hip" value={hip} onChange={e=>setHip(e.target.value)} type="number" className="w-full border p-3 rounded-xl mb-4"/>
      
      <button onClick={calc} className="w-full bg-black text-white p-4 rounded-xl font-bold">Calculate My Body Type</button>

      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border">
          <p className="text-sm uppercase tracking-widest">You are</p>
          <h2 className="text-2xl font-bold mb-2">{result.type} — {result.b}-{result.w}-{result.h}</h2>
          <p className="mb-4">US {result.usSize} / UK {result.uk} / EU {result.eu}</p>
          <div className="text-sm space-y-2">
            <p><b>What works:</b> {result.type==="Pear"?"A-line, high waist":"Fitted waist, balanced proportions"}</p>
            <p><b>Avoid:</b> Clingy fabrics on larger area</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white border p-4 rounded-xl text-xs">Dress 1 Link</div>
            <div className="bg-white border p-4 rounded-xl text-xs">Dress 2 Link</div>
            <div className="bg-white border p-4 rounded-xl text-xs">Top Link</div>
            <div className="bg-white border p-4 rounded-xl text-xs">Skirt Link</div>
          </div>
        </div>
      )}
    </div>
  )
}
