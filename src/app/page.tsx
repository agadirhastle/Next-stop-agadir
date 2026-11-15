'use client'
import { useState, useEffect } from 'react'

export default function Page(){
const [tab,setTab]=useState('dakar')
const [dFilter,setDFilter]=useState('All')
const [mad,setMad]=useState(200)
const [tipPct,setTipPct]=useState(10)
const [isOnline,setIsOnline]=useState(true)
const [rates,setRates]=useState({eur:0.0909, pln:0.395, lastCheck:'--:--'})
const [offlineRates,setOfflineRates]=useState({eur:0.0909, pln:0.395, lastCheck:'never'})
const [countdown,setCountdown]=useState({d:61,h:8,m:47})

const fetchRevolut=async()=>{
try{
const res=await fetch('https://open.er-api.com/v6/latest/MAD')
const d=await res.json()
if(d.rates){
const now=new Date().toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'})
const nr={eur:d.rates.EUR||0.0909, pln:d.rates.PLN||0.395, lastCheck:now}
setRates(nr); setOfflineRates(nr)
localStorage.setItem('agadir_last_rates', JSON.stringify(nr))
localStorage.setItem('agadir_last_check', Date.now().toString())
}
}catch{}
}

useEffect(()=>{
const c=localStorage.getItem('agadir_last_rates')
if(c){try{const cc=JSON.parse(c); setOfflineRates(cc); setRates(cc)}catch{}}
fetchRevolut()
const target=new Date('2027-01-16T00:00:00').getTime()
const updateCd=()=>{
const diff=target-Date.now()
if(diff>0)setCountdown({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000)})
}
updateCd()
const i=setInterval(updateCd,60000)
return()=>clearInterval(i)
},[])

const dakarItems=[
{type:'TICKETS',title:'Bivouac Fan Zone Ticket',desc:'Access to Agadir bivouac for fans.',loc:'Agadir (approximate)',date:'2027-01-15',filter:'Bivouac',color:'bg-green-600'},
{type:'ROUTE',title:'Stage 7 - AGADIR > SMARA',desc:'Dive inside the Dakar... Route via Taghazout.',loc:'Agadir',date:'',filter:'Route',color:'bg-yellow-400'},
{type:'TIPS',title:'Where to watch FREE - Kasbah Hill',desc:'Best panorama, arrive 05:30, no ticket needed.',loc:'Kasbah',date:'2027-01-15',filter:'Tips',color:'bg-orange-500'},
]

const filteredD=dFilter==='All'?dakarItems:dakarItems.filter(x=>x.filter===dFilter || x.type===dFilter.toUpperCase())
const tip=mad*tipPct/100
const total=mad+tip
const displayRates=isOnline?rates:offlineRates

return(
<div className="min-h-screen max-w-[480px] mx-auto pb-24" style={{background: tab==='dakar'?'#F5F1E8':'#0F1F2F'}}>

{tab==='dakar'&&(
<div className="px-4 pt-2 pb-24">
<div className="bg-[#FF6B00] -mx-4 -mt-2 px-4 pt-2 pb-3 text-white text-[14px] flex justify-between"><span>14:12</span><span>70%</span></div>
<h1 className="text-[30px] font-black text-[#0F1F2F] leading-none mt-4">DAKAR 2027 AGADIR</h1>
<div className="text-[14px] text-[#0F1F2F]/70 mt-1">Countdown to 16.01.2027</div>
<div className="text-[14px] font-bold text-[#FF6B00] mt-2">🔥 SPECIAL: Dakar Rally in Agadir</div>
<div className="flex gap-3 mt-5">
{[{v:countdown.d,l:'DAYS'},{v:countdown.h,l:'HRS'},{v:countdown.m,l:'MIN'}].map((c,i)=><div key={i} className="flex-1 bg-[#E8E0D5] border border-[#FF6B00]/30 rounded-[28px] py-5 flex flex-col items-center"><div className="text-[32px] font-black text-[#FF6B00]">{c.v}</div><div className="text-[12px] tracking-widest">{c.l}</div></div>)}
</div>
<div className="flex gap-2 mt-6 overflow-x-auto pb-2">
{['All','Bivouac','Service Park','Route','Tickets','Stage','Tips','News','Rumors'].map(f=><button key={f} onClick={()=>setDFilter(f)} className={`px-5 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap border ${dFilter===f?'bg-[#FF6B00] text-white':'bg-white text-black border-black/20'}`}>{f}</button>)}
</div>
<div className="mt-5 space-y-4">
{filteredD.map((it,i)=><div key={i} className="bg-white border rounded-[20px] p-4"><div className={`text-[11px] font-black px-3 py-1 rounded-full inline-block ${it.color==='bg-yellow-400'?'bg-yellow-400 text-black':'text-white'} ${it.color} ${it.color==='bg-green-600'?'bg-green-600':''}`}>{it.type}</div><div className="font-black text-[16px] mt-2">{it.title}</div><div className="text-[13px] text-black/60 mt-1">{it.desc}</div><div className="text-[12px] mt-2">📍 {it.loc}</div></div>)}
</div>
</div>
)}

{tab==='today'&&(
<div className="px-5 pt-6 pb-24">
<h1 className="text-[28px] font-black text-white leading-none">DZISIAJ W<br/>AGADIRZE</h1>
<div className="text-slate-400 text-[12px] mt-2">Real temp Agadir Al Massira • {offlineRates.lastCheck}</div>
<div className="mt-6 space-y-3">
<div className="bg-[#162E44] rounded-[20px] p-5"><div className="font-bold text-white">🛍️ Suk Anza - Poniedziałek</div><div className="text-[12px] text-slate-400 mt-1">FREE • 08:00-14:00 • Anza • Sprawdzone dziś</div></div>
<div className="bg-[#162E44] rounded-[20px] p-5"><div className="font-bold text-white">👕 Pralnia Eco Wash - Talborjt</div><div className="text-[12px] text-slate-400 mt-1">30 MAD/KG • 09:00-19:00 • Polecane</div></div>
<div className="bg-yellow-900/20 border border-yellow-500/20 rounded-[20px] p-5"><div className="font-bold text-yellow-200">⚠️ Bransoletka scam - Plaża</div><div className="text-[12px] text-yellow-200/60 mt-1">Nie bierz, nie zakładaj - 100 MAD chcą</div></div>
</div>
</div>
)}

{tab==='packing'&&(
<div className="px-5 pt-6 pb-24">
<h1 className="text-[28px] font-black text-white leading-none">PACKING<br/>CHECKLIST</h1>
<div className="text-slate-400 text-[12px] mt-2">Tap to check • FREE DB</div>
<div className="mt-6 space-y-2">
{['Paszport + kopia','Krem SPF 50','Czapka','Powerbank','Buty na plażę','Kurtka na wiatr Kasbah'].map(x=><div key={x} className="bg-[#162E44] rounded-[14px] p-4 flex gap-3"><div className="w-6 h-6 rounded-full border-2 border-white/20"></div><div className="text-white text-[14px]">{x}</div></div>)}
</div>
</div>
)}

{tab==='wallet'&&(
<div className="px-5 pt-6 pb-24">
<div className="flex justify-between"><div className="text-[#FF6B00] font-black text-[10px] tracking-[0.3em]">WALLET • REVOLUT</div><div className="flex items-center gap-2 bg-[#162E44] rounded-full px-2 py-1"><span className={`text-[10px] font-black ${!isOnline?'text-white':'text-slate-500'}`}>OFFLINE</span><button onClick={()=>setIsOnline(!isOnline)} className={`w-10 h-6 rounded-full p-1 ${isOnline?'bg-[#FF6B00]':'bg-slate-600'}`}><div className={`w-4 h-4 bg-white rounded-full ${isOnline?'translate-x-4':''}`}></div></button><span className={`text-[10px] font-black ${isOnline?'text-[#FF6B00]':'text-slate-500'}`}>ONLINE</span></div></div>
<div className="text-[11px] mt-2" style={{color:isOnline?'#FF6B00':'#94a3b8'}}>{isOnline?`● LIVE ${rates.lastCheck} • 1 MAD = ${rates.eur.toFixed(4)} EUR`:`● OSTATNI ${offlineRates.lastCheck}`}</div>
<div className="bg-[#162E44] rounded-[28px] p-5 mt-4">
<div className="rounded-full px-6 py-4 flex justify-between items-center bg-[#0F1F2F] border border-white/10"><input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[28px] font-black w-24 text-white outline-none"/><span className="text-slate-400">MAD</span></div>
<input type="range" min="10" max="1000" value={mad} onChange={e=>setMad(Number(e.target.value))} className="w-full mt-3 accent-[#FF6B00]"/>
<div className="flex gap-3 mt-4"><div className="flex-1 rounded-[18px] p-4 bg-[#0F1F2F] border border-[#FF6B00]/20"><div className="text-[10px] text-slate-400">PLN</div><div className="text-[20px] font-black text-[#FF6B00]">{(mad*displayRates.pln).toFixed(0)} zł</div></div><div className="flex-1 rounded-[18px] p-4 bg-[#0F1F2F]"><div className="text-[10px] text-slate-400">EUR</div><div className="text-[20px] font-black text-white">{(mad*displayRates.eur).toFixed(1)} €</div></div></div>
<div className="bg-[#0F1F2F] rounded-[20px] p-4 mt-4 flex justify-between"><div><div className="text-slate-400 text-[12px]">Tip {tipPct}%</div><div className="text-white font-black">{tip.toFixed(0)} MAD</div></div><div className="text-right"><div className="text-slate-400 text-[12px]">Total</div><div className="text-white font-black">{total.toFixed(0)} MAD ≈ {(total*displayRates.pln).toFixed(0)} zł</div></div></div>
<div className="flex gap-2 mt-3">{[5,10,15].map(p=><button key={p} onClick={()=>setTipPct(p)} className={`flex-1 py-3 rounded-full font-black ${tipPct===p?'bg-[#FF6B00] text-white':'bg-[#0F1F2F] text-white border border-white/10'}`}>{p}%</button>)}</div>
</div>
</div>
)}

{tab==='sos'&&(
<div className="px-5 pt-6 pb-24">
<h1 className="text-[28px] font-black text-white">SOS</h1>
<div className="mt-6 space-y-3">
<div className="bg-red-900/30 border border-red-500/30 rounded-[20px] p-5 flex justify-between text-white font-bold"><span>🚓 POLICE</span><span>19 / 112</span></div>
<div className="bg-[#162E44] rounded-[20px] p-5 flex justify-between text-white font-bold"><span>🚑 AMBULANCE</span><span>15</span></div>
<div className="bg-[#162E44] rounded-[20px] p-5"><div className="font-bold text-white">🏥 Hassan II Hospital</div><div className="text-[12px] text-slate-400 mt-1">Dla turystów - 24h • Talborjt</div></div>
<div className="bg-[#162E44] rounded-[20px] p-5"><div className="font-bold text-white">🇵🇱 Konsulat PL Rabat</div><div className="text-[12px] text-slate-400 mt-1">+212 537 77 45 00 • Wiza, paszport</div></div>
</div>
</div>
)}

<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-2.5 border-t bg-[#1E2F42]">
{[{id:'packing',l:'Packing',ico:'🧳'},{id:'today',l:'Today',ico:'🎯'},{id:'wallet',l:'Wallet',ico:'👛'},{id:'dakar',l:'Dakar',ico:'🚩'},{id:'sos',l:'SOS',ico:'🚨'}].map(b=><button key={b.id} onClick={()=>setTab(b.id)} className={`flex flex-col items-center ${tab===b.id?'text-[#FF6B00]':'text-slate-400'}`}><span className="text-[22px]">{b.ico}</span><span className={`text-[11px] mt-0.5 ${tab===b.id?'font-bold':''}`}>{b.l}</span></button>)}
</div>
</div>
)
}
