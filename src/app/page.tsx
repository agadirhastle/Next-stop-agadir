
'use client'
import { useState, useEffect } from 'react'

export default function Page(){
const [tab,setTab]=useState('sos')
const [dFilter,setDFilter]=useState('All')
const [mad,setMad]=useState(200)
const [tipPct,setTipPct]=useState(10)
const [isOnline,setIsOnline]=useState(true)
const [rates,setRates]=useState({eur:0.0909, gbp:0.077, usd:0.101, pln:0.395, lastCheck:'--:--'})
const [offlineRates,setOfflineRates]=useState({eur:0.0909, gbp:0.077, usd:0.101, pln:0.395, lastCheck:'never'})
const [countdown,setCountdown]=useState({d:61,h:8,m:47})

const fetchRevolut=async()=>{
try{
const res=await fetch('https://open.er-api.com/v6/latest/MAD')
const d=await res.json()
if(d.rates){
const now=new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'})
const nr={eur:d.rates.EUR||0.0909, gbp:d.rates.GBP||0.077, usd:d.rates.USD||0.101, pln:d.rates.PLN||0.395, lastCheck:now}
setRates(nr); setOfflineRates(nr)
localStorage.setItem('agadir_last_rates', JSON.stringify(nr))
}
}catch{}
}
useEffect(()=>{
const c=localStorage.getItem('agadir_last_rates')
if(c){try{const cc=JSON.parse(c); setOfflineRates(cc); setRates(cc)}catch{}}
fetchRevolut()
const target=new Date('2027-01-16T00:00:00').getTime()
const i=setInterval(()=>{const diff=target-Date.now(); if(diff>0)setCountdown({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000)})},60000)
return()=>clearInterval(i)
},[])

const dakarItems=[
{type:'TICKETS',title:'Bivouac Fan Zone Ticket',desc:'Access to Agadir bivouac for fans.',loc:'Agadir (approximate)',date:'2027-01-15',filter:'Bivouac',color:'bg-green-600'},
{type:'ROUTE',title:'Stage 7 - AGADIR > SMARA',desc:'Dive inside the Dakar...',loc:'Agadir',date:'',filter:'Route',color:'bg-yellow-400'},
{type:'TIPS',title:'Where to watch FREE - Kasbah Hill',desc:'Best panorama, arrive 05:30',loc:'Kasbah',date:'2027-01-15',filter:'Tips',color:'bg-orange-500'},
]
const filteredD=dFilter==='All'?dakarItems:dakarItems.filter(x=>x.filter===dFilter)
const displayRates=isOnline?rates:offlineRates

return(
<div className="min-h-screen max-w-[480px] mx-auto pb-24" style={{background: tab==='dakar'?'#F5F1E8':'#0A1B2E'}}>
<style>{`@keyframes pulse-sos { 0%{transform:scale(1); box-shadow:0 0 0 0 rgba(239,68,68,0.7)} 70%{transform:scale(1.05); box-shadow:0 0 0 20px rgba(239,68,68,0)} 100%{transform:scale(1); box-shadow:0 0 0 0 rgba(239,68,68,0)} } .sos-pulse{animation:pulse-sos 2s infinite}`}</style>

{tab==='dakar'&&(<div className="px-4 pt-2 pb-24"><h1 className="text-[30px] font-black text-[#0F1F2F] leading-none mt-4">DAKAR 2027 AGADIR</h1><div className="text-[14px] text-[#0F1F2F]/70">Countdown to 16.01.2027</div><div className="flex gap-3 mt-4">{[{v:countdown.d,l:'DAYS'},{v:countdown.h,l:'HRS'},{v:countdown.m,l:'MIN'}].map((c,i)=><div key={i} className="flex-1 bg-[#E8E0D5] border border-[#FF6B00]/30 rounded-[28px] py-4 flex flex-col items-center"><div className="text-[30px] font-black text-[#FF6B00]">{c.v}</div><div className="text-[11px]">{c.l}</div></div>)}</div><div className="flex gap-2 mt-5 overflow-x-auto pb-2">{['All','Bivouac','Service Park','Route','Tickets','Tips','News','Rumors'].map(f=><button key={f} onClick={()=>setDFilter(f)} className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap ${dFilter===f?'bg-[#FF6B00] text-white':'bg-white border'}`}>{f}</button>)}</div><div className="mt-4 space-y-3">{filteredD.map((it,i)=><div key={i} className="bg-white rounded-[20px] p-4"><div className={`text-[10px] font-black px-2 py-1 rounded-full inline-block text-white ${it.color}`}>{it.type}</div><div className="font-black mt-2">{it.title}</div><div className="text-[12px] text-black/60">{it.desc}</div></div>)}</div></div>)}
{tab==='sos'&&(<div className="px-5 pt-4 pb-24"><div className="flex justify-between items-center"><div><div className="text-[#FF6B00] font-black text-[12px] tracking-[0.2em]">SOS</div><div className="text-white font-black text-[28px] leading-none mt-1">Help in 1 click</div></div><div className="bg-[#162E44] rounded-full px-3 py-1.5 flex items-center gap-1 text-white text-[12px]"><span>🇬🇧 EN</span> <span>▼</span></div></div><div className="flex justify-center mt-10"><a href="tel:112" className="sos-pulse w-[200px] h-[200px] bg-[#E53935] rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(229,57,53,0.5)]"><div className="text-[52px] font-black tracking-widest leading-none">SOS</div><div className="text-[14px] mt-1 font-bold opacity-90">Call 112</div></a></div><div className="text-center text-[12px] text-slate-400 mt-6 tracking-wide">Police 19 · Ambulance 15 · Gendarmerie 177 · Works offline</div></div>)}
{tab==='today'&&<div className="px-5 pt-6"><h1 className="text-[24px] font-black text-white">DZISIAJ W AGADIRZE</h1><div className="mt-4 bg-[#162E44] rounded-[20px] p-5 text-white">🛍️ Suk Anza - Poniedziałek • 08:00</div></div>}
{tab==='packing'&&<div className="px-5 pt-6"><h1 className="text-[24px] font-black text-white">PACKING</h1><div className="mt-4 bg-[#162E44] rounded-[20px] p-5 text-white">🧳 Paszport + kopia</div></div>}
{tab==='wallet'&&(
<div className="px-5 pt-6">
<div className="flex justify-between text-white"><div className="font-bold">WALLET</div><div className="flex items-center gap-2 bg-[#162E44] rounded-full px-2 py-1"><span className={`text-[10px] ${!isOnline?'text-white':'text-slate-500'}`}>OFFLINE</span><button onClick={()=>setIsOnline(!isOnline)} className={`w-10 h-6 rounded-full ${isOnline?'bg-[#FF6B00]':'bg-slate-600'}`}><div className={`w-4 h-4 bg-white rounded-full ${isOnline?'translate-x-4':''}`}></div></button><span className={`text-[10px] ${isOnline?'text-[#FF6B00]':'text-slate-500'}`}>ONLINE</span></div></div>
<div className="bg-[#162E44] rounded-[20px] p-5 mt-4 space-y-4">
<input type="range" min="10" max="2000" value={mad} onChange={e=>setMad(Number(e.target.value))} className="w-full accent-[#FF6B00]"/>
<div className="space-y-2">
<div className="flex justify-between text-white font-bold p-3 bg-[#132A44] rounded-xl"><span className="text-slate-400">🇲🇦 MAD</span><span>{mad} MAD</span></div>
<div className="flex justify-between text-white font-bold p-3 bg-[#132A44] rounded-xl"><span>🇵🇱 PLN</span><span>{(mad*displayRates.pln).toFixed(0)} zł</span></div>
<div className="flex justify-between text-white font-bold p-3 bg-[#132A44] rounded-xl"><span>🇪🇺 EUR</span><span>{(mad*displayRates.eur).toFixed(2)} €</span></div>
<div className="flex justify-between text-white font-bold p-3 bg-[#132A44] rounded-xl"><span>🇬🇧 GBP</span><span>{(mad*displayRates.gbp).toFixed(2)} £</span></div>
<div className="flex justify-between text-white font-bold p-3 bg-[#132A44] rounded-xl"><span>🇺🇸 USD</span><span>{(mad*displayRates.usd).toFixed(2)} $</span></div>
</div>
<div className="text-[10px] text-slate-500 text-center mt-2">Last: {displayRates.lastCheck}</div>
</div>
</div>
)}
<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-3 border-t bg-[#132A44] border-white/10">
{[{id:'packing',l:'Packing',ico:'🧳'},{id:'today',l:'Today',ico:'🎯'},{id:'wallet',l:'Wallet',ico:'👛'},{id:'dakar',l:'Dakar',ico:'🚩'},{id:'sos',l:'SOS',ico:'🚨'}].map(b=><button key={b.id} onClick={()=>setTab(b.id)} className={`flex flex-col items-center ${tab===b.id?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">{b.ico}</span><span className="text-[11px]">{b.l}</span></button>)}
</div>
</div>
)
}