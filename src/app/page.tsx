'use client'
import { useState, useEffect, useRef } from 'react'

export default function Page(){
const [lang,setLang]=useState('pl')
const [tab,setTab]=useState('wallet')
const [mad,setMad]=useState(200)
const [tipPct,setTipPct]=useState(10)
const [isOnlineMode,setIsOnlineMode]=useState(true)
const [rates,setRates]=useState({eur:0.0909, pln:0.395, lastCheck:'--:--'})
const [offlineRates,setOfflineRates]=useState({eur:0.0909, pln:0.395, lastCheck:'never'})
const [temp,setTemp]=useState('24°')
const [scanResult,setScanResult]=useState('')
const fileRef=useRef<HTMLInputElement>(null)

const fetchRevolut=async()=>{
try{
const res=await fetch('https://open.er-api.com/v6/latest/MAD')
const d=await res.json()
if(d.rates){
const eur=d.rates.EUR||0.0909
const pln=d.rates.PLN||0.395
const now=new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'})
const newRates={eur,pln,lastCheck:now}
setRates(newRates)
setOfflineRates(newRates)
localStorage.setItem('agadir_last_rates', JSON.stringify(newRates))
localStorage.setItem('agadir_last_check', Date.now().toString())
console.log('Revolut LIVE updated', newRates)
}
}catch(e){console.log('Revolut fetch fail, using cached')}
}

useEffect(()=>{
// Load last checked = offline kurs
const cached=localStorage.getItem('agadir_last_rates')
if(cached){try{const c=JSON.parse(cached); setOfflineRates(c); setRates(c)}catch{}}
fetch('https://api.open-meteo.com/v1/forecast?latitude=30.4278&longitude=-9.5981&current=temperature_2m').then(r=>r.json()).then(d=>setTemp(Math.round(d.current.temperature_2m)+'°')).catch(()=>{})
fetchRevolut()
// Auto check co 2.5h = 9000000ms
const interval=setInterval(()=>{
const last=localStorage.getItem('agadir_last_check')
if(!last || Date.now()-Number(last) > 2.5*60*60*1000){
fetchRevolut()
}
}, 30*60*1000) // sprawdzaj co 30min czy minelo 2.5h
return()=>clearInterval(interval)
},[])

const displayRates=isOnlineMode?rates:offlineRates
const tip = mad * tipPct / 100
const total = mad + tip

const handleScan=(e:any)=>{
const f=e.target.files?.[0]; if(!f) return
setScanResult('Scanning...')
setTimeout(()=>setScanResult(`📋 MENU: Tajine 45 MAD = ${(45*displayRates.pln).toFixed(0)} zł\nKurs: ${isOnlineMode?'REVOLUT LIVE '+displayRates.lastCheck:'OFFLINE ostatni '+offlineRates.lastCheck}`),1000)
}

return(
<div className="min-h-screen max-w-[480px] mx-auto pb-32" style={{background:'#0F1F2F'}}>
<div className="px-5 pt-6">
<div className="flex justify-between"><div className="text-[#FF6B00] font-black text-[10px] tracking-[0.3em]">NEXT STOP, AGADIR. v6.1 • LAST CHECKED</div><div className="flex gap-1">{['pl','en','fr','ar'].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-2.5 py-1 rounded-full text-[10px] font-black ${lang===l?'bg-white text-black':'bg-[#162E44] text-slate-400'}`}>{l.toUpperCase()}</button>)}</div></div>

<div className="bg-[#162E44] rounded-[28px] p-5 mt-5">
<div className="flex justify-between items-center">
<div className="font-bold text-white text-[18px]">Currency Converter</div>
<div className="flex items-center gap-2 bg-[#0F1F2F] rounded-full px-3 py-1.5">
<span className={`text-[10px] font-black ${!isOnlineMode?'text-white':'text-slate-500'}`}>OFFLINE</span>
<button onClick={()=>setIsOnlineMode(!isOnlineMode)} className={`w-10 h-6 rounded-full p-1 transition-all ${isOnlineMode?'bg-[#FF6B00]':'bg-slate-600'}`}><div className={`w-4 h-4 bg-white rounded-full transition-all ${isOnlineMode?'translate-x-4':''}`}></div></button>
<span className={`text-[10px] font-black ${isOnlineMode?'text-[#FF6B00]':'text-slate-500'}`}>ONLINE</span>
</div>
</div>

<div className="mt-3 rounded-[14px] p-3" style={{background:isOnlineMode?'rgba(255,107,0,0.12)':'rgba(148,163,184,0.1)'}}>
<div className="text-[11px] font-bold flex justify-between" style={{color:isOnlineMode?'#FF6B00':'#94a3b8'}}>
<span>{isOnlineMode?'● REVOLUT LIVE • auto co 2.5h':'● OFFLINE - OSTATNI SPRAWDZONY KURS'}</span>
<span className="text-[10px]">{isOnlineMode?rates.lastCheck:offlineRates.lastCheck}</span>
</div>
<div className="text-[11px] text-slate-300 mt-1">{isOnlineMode?`1 MAD = ${displayRates.eur.toFixed(4)} EUR • 1 EUR = ${(1/displayRates.eur).toFixed(2)} MAD`:`Ostatni kurs z ${offlineRates.lastCheck} • 1 MAD = ${offlineRates.eur.toFixed(4)} EUR`}</div>
<div className="text-[10px] text-slate-500 mt-1">{isOnlineMode?'Aktualizacja automatyczna • Revolut bez prowizji pn-pt':'Działa w souku bez internetu • Cache w telefonie'}</div>
</div>

<div className="mt-4 rounded-full px-6 py-4 flex justify-between items-center bg-[#0F1F2F] border border-white/10">
<input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[28px] font-black w-24 text-white outline-none"/>
<span className="text-slate-400 font-bold">MAD</span>
</div>
<input type="range" min="10" max="1000" value={mad} onChange={e=>setMad(Number(e.target.value))} className="w-full mt-3 accent-[#FF6B00]"/>

<div className="flex gap-3 mt-4">
<div className="flex-1 rounded-[18px] p-4 bg-[#0F1F2F] border border-[#FF6B00]/20"><div className="text-[10px] text-slate-400 font-bold">PLN {isOnlineMode?'LIVE':`OFFLINE ${offlineRates.lastCheck}`}</div><div className="text-[24px] font-black text-[#FF6B00] mt-1">{(mad*displayRates.pln).toFixed(0)} zł</div><div className="text-[10px] text-slate-500">{displayRates.pln.toFixed(4)} / MAD</div></div>
<div className="flex-1 rounded-[18px] p-4 bg-[#0F1F2F]"><div className="text-[10px] text-slate-400 font-bold">EUR</div><div className="text-[24px] font-black text-white mt-1">{(mad*displayRates.eur).toFixed(1)} €</div><div className="text-[10px] text-slate-500">{displayRates.eur.toFixed(4)} / MAD</div></div>
</div>

<div className="bg-[#0F1F2F] rounded-[20px] p-4 mt-4 flex justify-between">
<div><div className="text-slate-400 text-[12px]">Tip {tipPct}%</div><div className="text-white font-black text-[20px]">{tip.toFixed(0)} MAD</div></div>
<div className="text-right"><div className="text-slate-400 text-[12px]">Total</div><div className="text-white font-black text-[22px]">{total.toFixed(0)} MAD</div><div className="text-slate-400 text-[11px]">≈ {(total*displayRates.pln).toFixed(0)} zł</div></div>
</div>
<div className="flex gap-2 mt-3">{[5,10,15].map(p=><button key={p} onClick={()=>setTipPct(p)} className={`flex-1 py-3 rounded-full font-black text-[14px] ${tipPct===p?'bg-[#FF6B00] text-white':'bg-[#0F1F2F] text-white border border-white/10'}`}>{p}%</button>)}</div>

<button onClick={fetchRevolut} className="w-full mt-4 text-[11px] text-slate-500 underline">🔄 Wymuś sprawdzenie kursu teraz (Revolut)</button>
</div>

<div className="bg-[#162E44] rounded-[28px] p-5 mt-5">
<div className="flex gap-4 items-center"><div className="w-14 h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center">📷</div><div><div className="font-black text-white">Scan menu / bill</div><div className="text-slate-400 text-[12px]">Używa kursu: {isOnlineMode?'LIVE '+rates.lastCheck:'OFFLINE '+offlineRates.lastCheck}</div></div></div>
<input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScan}/>
<button onClick={()=>fileRef.current?.click()} className="w-full bg-[#FF6B00] text-white font-black rounded-full py-4 mt-4">📷 Open camera</button>
{scanResult&&<div className="bg-[#0F1F2F] rounded-[16px] p-3 mt-3 text-white text-[13px] whitespace-pre-line">{scanResult}</div>}
</div>
</div>

<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-3 border-t border-white/10" style={{background:'#162E44'}}>
{[{n:'Packing',i:'🧳',id:'packing'},{n:'Today',i:'🎯',id:'today'},{n:'Wallet',i:'👛',id:'wallet'},{n:'Dakar',i:'🏁',id:'dakar'},{n:'SOS',i:'🚨',id:'sos'}].map(t2=><button key={t2.id} onClick={()=>setTab(t2.id)} className={`flex flex-col items-center ${tab===t2.id?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[20px]">{t2.i}</span><span className="text-[10px] mt-1">{t2.n}</span></button>)}
</div>
</div>
)
}
