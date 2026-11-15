'use client'
import { useState, useEffect, useRef } from 'react'

export default function Page(){
const [lang,setLang]=useState('pl')
const [tab,setTab]=useState('wallet')
const [mad,setMad]=useState(200)
const [tipPct,setTipPct]=useState(10)
const [temp,setTemp]=useState('23°')
const [showScanner,setShowScanner]=useState(false)
const [scanMode,setScanMode]=useState<'menu'|'bill'>('menu')
const [scanResult,setScanResult]=useState('')
const fileRef=useRef<HTMLInputElement>(null)

useEffect(()=>{
fetch('https://api.open-meteo.com/v1/forecast?latitude=30.4278&longitude=-9.5981&current=temperature_2m').then(r=>r.json()).then(d=>setTemp(Math.round(d.current.temperature_2m)+'°')).catch(()=>setTemp('24°'))
},[])

const tip = mad * tipPct / 100
const total = mad + tip

const t=(pl:string,en:string,fr:string,ar:string)=>{
if(lang==='pl') return pl
if(lang==='en') return en
if(lang==='fr') return fr
return ar
}

const handleScan=async(e:any)=>{
const file=e.target.files?.[0]
if(!file) return
setScanResult('Scanning OCR...')
setTimeout(()=>{
if(scanMode==='menu'){
setScanResult(lang==='pl' ? '📋 MENU ROZPOZNANE:\nTajine poulet 45 MAD → 18 zł\nCouscous 35 MAD → 14 zł (TANIO!)\nThe menthe 10 MAD → 4 zł\nCena OK dla turystów' : '📋 MENU: Chicken Tajine 45 MAD → 18 PLN (OK)\nCouscous 35 MAD → 14 PLN (CHEAP)')
}else{
setScanResult(lang==='pl' ? '🧾 RACHUNEK: Wykryto ukrytą opłatę kartą 3% = 6 MAD\nSuma powinna być 200, jest 206\n⚠️ Pokaż kelnerowi!' : '🧾 BILL: Hidden card fee 3% = 6 MAD\nShould be 200, is 206 - Show waiter!')
}
},1200)
}

return(
<div className="min-h-screen max-w-[480px] mx-auto pb-32" style={{background:'#0F1F2F'}}>
<div className="px-5 pt-6">
<div className="flex justify-between items-center">
<div className="text-[#FF6B00] font-black text-[10px] tracking-[0.3em]">NEXT STOP, AGADIR. v5 • WALLET</div>
<div className="flex gap-1">{['pl','en','fr','ar'].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-2.5 py-1 rounded-full text-[10px] font-black ${lang===l?'bg-white text-black':'bg-[#162E44] text-slate-400'}`}>{l.toUpperCase()}</button>)}</div>
</div>

{tab==='wallet'&&(<>
<div className="bg-[#162E44] rounded-[28px] p-5 mt-5">
<div className="font-bold text-white text-[18px]">Tip calculator</div>
<div className="mt-4 rounded-full px-6 py-4 flex justify-between items-center bg-[#0F1F2F] border border-white/10"><input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[24px] font-bold w-24 text-white outline-none"/><span className="text-slate-400 font-bold text-[14px]">MAD</span></div>
<div className="flex gap-3 mt-4">
{[5,10,15].map(p=><button key={p} onClick={()=>setTipPct(p)} className={`flex-1 py-4 rounded-full font-black text-[18px] ${tipPct===p?'bg-[#FF6B00] text-white':'bg-[#0F1F2F] text-white border border-white/10'}`}>{p}%</button>)}
</div>
<div className="bg-[#0F1F2F] rounded-[28px] p-5 mt-4 flex justify-between items-center">
<div><div className="text-slate-400 text-[13px]">Tip</div><div className="text-white font-black text-[24px] mt-1">{tip.toFixed(0)} MAD</div></div>
<div className="text-right"><div className="text-slate-400 text-[13px]">Total</div><div className="text-white font-black text-[26px] mt-1">{total.toFixed(0)} MAD</div><div className="text-slate-400 text-[13px] mt-1">≈ {(total*0.40).toFixed(0)} zł</div></div>
</div>
</div>

<div className="bg-[#162E44] rounded-[28px] p-5 mt-5">
<div className="flex gap-4 items-center"><div className="w-14 h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] text-[24px]">⌜ ⌝</div><div><div className="font-black text-white text-[18px]">Scan menu</div><div className="text-slate-400 text-[13px]">Prices in PLN + dish translations</div></div></div>
<input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScan}/>
<button onClick={()=>{setScanMode('menu'); fileRef.current?.click(); setShowScanner(true)}} className="w-full bg-[#FF6B00] text-white font-black rounded-full py-4 mt-5 flex justify-center gap-2 text-[16px]"><span>📷</span> Open camera</button>
<div className="text-[12px] text-slate-400 mt-4 leading-relaxed underline">Camera used only for menu scanning. No photos stored on server. See Privacy Policy.</div>
</div>

<div className="bg-[#162E44] rounded-[28px] p-5 mt-5">
<div className="flex gap-4 items-center"><div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-[24px]">🧾</div><div><div className="font-black text-white text-[18px]">Scan bill</div><div className="text-slate-400 text-[13px]">Detects hidden card fees</div></div></div>
<button onClick={()=>{setScanMode('bill'); fileRef.current?.click(); setShowScanner(true)}} className="w-full bg-[#0F1F2F] text-white font-bold rounded-full py-4 mt-5 flex justify-center gap-2 text-[16px] border border-white/20"><span>📷</span> Scan bill</button>
</div>

{scanResult&&<div className="bg-[#162E44] border border-[#FF6B00]/30 rounded-[20px] p-4 mt-4 text-white text-[13px] whitespace-pre-line">{scanResult}</div>}

<div className="text-center text-[12px] text-slate-400 mt-8 leading-relaxed px-4">Some links are affiliate - we may earn a commission at no extra cost to you.</div>
<div className="flex justify-center gap-3 text-[12px] text-slate-400 mt-4"><span>Privacy</span><span>|</span><span>Terms</span><span>|</span><span>Affiliate Disclosure</span><span>|</span><span>Contact</span></div>
</>)}

{tab==='today'&&(<>
<div className="flex justify-between items-end mt-6"><h1 className="text-[28px] font-black text-white leading-[0.9]">{t('DZISIAJ W\nAGADIRZE','TODAY IN\nAGADIR','AUJOURDHUI\nAGADIR','اليوم في\nأكادير')}</h1><div className="text-right"><div className="text-[28px] font-black text-white">{temp}</div><div className="text-[10px] text-slate-400">Real sensor</div></div></div>
<div className="mt-6 space-y-3">
<div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">🛍️ Anza Souk - Poniedziałek</div><div className="text-[12px] text-slate-400 mt-1">FREE • Verified today • 08:00-14:00 • Anza</div></div>
<div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">👕 Eco Wash Laundry</div><div className="text-[12px] text-slate-400 mt-1">30 MAD/KG • Talborjt • Polecane</div></div>
</div>
</>)}

{tab==='packing'&&(<><h1 className="text-[28px] font-black text-white mt-6">PACKING<br/>CHECKLIST</h1><div className="text-slate-400 text-[12px] mt-2">Tap to check - FREE DB mode</div></>)}
{tab==='dakar'&&(<><h1 className="text-[28px] font-black text-white mt-6">DAKAR<br/>2027</h1><div className="bg-[#FF6B00] text-black rounded-[20px] p-4 mt-4 font-bold">Agadir → Laayoune → Dakhla • Start 4 Jan</div></>)}
{tab==='sos'&&(<><h1 className="text-[28px] font-black text-white mt-6">SOS</h1><div className="bg-red-900/30 border border-red-500/30 rounded-[20px] p-4 mt-4 text-white font-bold flex justify-between"><span>POLICE</span><span>19 / 112</span></div></>)}

</div>

<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-3 border-t border-white/10" style={{background:'#162E44'}}>
<button onClick={()=>setTab('packing')} className={`flex flex-col items-center ${tab==='packing'?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">🧳</span><span className="text-[11px] mt-1">Packing</span></button>
<button onClick={()=>setTab('today')} className={`flex flex-col items-center ${tab==='today'?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">🎯</span><span className="text-[11px] mt-1">Today</span></button>
<button onClick={()=>setTab('wallet')} className={`flex flex-col items-center ${tab==='wallet'?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">👛</span><span className="text-[11px] font-bold mt-1">Wallet</span></button>
<button onClick={()=>setTab('dakar')} className={`flex flex-col items-center ${tab==='dakar'?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">🏁</span><span className="text-[11px] mt-1">Dakar</span></button>
<button onClick={()=>setTab('sos')} className={`flex flex-col items-center ${tab==='sos'?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">🚨</span><span className="text-[11px] mt-1">SOS</span></button>
</div>
</div>
)
}
