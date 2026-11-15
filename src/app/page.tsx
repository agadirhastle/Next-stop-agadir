'use client'
import { useState } from 'react'
const places=[
{name:'Anza Weekly Souk - Poniedzialek',cat:'Events',price:'FREE',time:'Mon 08:00-14:00',loc:'Anza - Taxi 6 MAD',icon:'🛍️'},
{name:'Inezgane Berber Souk',cat:'Events',price:'FREE ENTRY',time:'Tue 08:00-15:00',loc:'Inezgane 12km',icon:'🐪'},
{name:'Tamraght Souk - Wtorek',cat:'Events',price:'FREE',time:'Tue 08:00-14:00',loc:'Tamraght',icon:'🛍️'},
{name:'Eco Wash Laundry',cat:'Useful',price:'30 MAD/KG',time:'09:00-19:00',loc:'Talborjt Centre',icon:'👕'},
{name:'Luggage Storage Gare',cat:'Useful',price:'20 MAD/DAY',time:'06:00-22:00',loc:'Gare Routiere',icon:'🧳'},
{name:'Exchange 0% Commission',cat:'Useful',price:'0% COMMISSION',time:'09:00-20:00',loc:'Souk El Had Gate 10',icon:'💱'},
{name:"Bab's Tajine - Best Cheap",cat:'Food',price:'35 MAD',time:'12:00-23:00',loc:'Talborjt',icon:'🍲'},
{name:'Little Norway Breakfast',cat:'Food',price:'50 MAD',time:'08:00-16:00',loc:'Founty Beach',icon:'☕'},
{name:'Sunset Kasbah FREE View',cat:'Food',price:'FREE',time:'18:30-19:30',loc:'Kasbah Hill',icon:'🌅'},
{name:'⚠️ Free Bracelet Scam',cat:'Watch',price:'SCAM ALERT',time:'All day',loc:'Beach & Marina',icon:'⚠️'},
{name:'⚠️ Airport Taxi MAX',cat:'Watch',price:'MAX 150 MAD',time:'24/7',loc:'Agadir Airport',icon:'🚕'},
{name:'Night Pharmacy SOS',cat:'SOS',price:'24/7',time:'24/7',loc:'Av Hassan II',icon:'💊'},
]
export default function Page(){
const [filter,setFilter]=useState('All')
const [mad,setMad]=useState(100)
const filtered=filter==='All'?places:places.filter(p=>filter==='Free'?p.price.includes('FREE'):p.cat===filter)
return(
<div className="min-h-screen bg-[#0F1F2F] max-w-[480px] mx-auto pb-24" style={{background:'#0F1F2F'}}>
<div className="px-5 pt-8 pb-2">
<div className="text-[#FF6B00] font-black text-[11px] tracking-[0.3em]">NEXT STOP, AGADIR. v2 • LIVE</div>
<h1 className="text-[36px] font-black text-white leading-[0.9] mt-3 tracking-tight">TODAY IN<br/>AGADIR v2</h1>
<p className="text-slate-400 text-[12px] mt-2">{new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})} • Pocket Compass</p>
<div className="bg-[#F5F0E8] text-black rounded-full px-4 py-3 mt-5 font-bold text-[12px] flex justify-between">🔥 Dakar Rally 2027 Route + Weekly Souks<span>→</span></div>

<div className="rounded-[28px] p-6 mt-6" style={{background:'#162E44'}}>
<div className="flex justify-between items-center"><div className="font-bold text-white text-[14px]">Currency Converter OFFLINE</div><div className="text-[9px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">● OFFLINE</div></div>
<div className="mt-5 rounded-full px-6 py-5 flex justify-between items-center" style={{background:'#0F1F2F'}}><input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[34px] font-black w-28 text-white outline-none"/><span className="text-slate-400 font-bold text-[14px]">MAD</span></div>
<div className="flex gap-3 mt-4"><div className="flex-1 rounded-[20px] p-4" style={{background:'rgba(255,107,0,0.15)'}}><div className="text-[10px] text-slate-300 font-bold tracking-widest">PLN</div><div className="text-[24px] font-black text-[#FF6B00] mt-1">{(mad*0.40).toFixed(0)} zł</div></div><div className="flex-1 rounded-[20px] p-4" style={{background:'#0F1F2F'}}><div className="text-[10px] text-slate-400 font-bold tracking-widest">EUR</div><div className="text-[24px] font-black text-white mt-1">{(mad*0.09).toFixed(1)} €</div></div></div>
<div className="text-[10px] text-slate-500 mt-4 tracking-wide">1 MAD = 0.40 PLN • 0.092 EUR • 1 EUR = 10.8 MAD</div>
</div>

<div className="flex gap-2 mt-7 overflow-x-auto pb-2 -mx-1 px-1">{['All','Free','Watch','Food','Events','Useful'].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-6 py-3 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${filter===f?'bg-white text-black':'text-white border border-white/10'}`} style={filter!==f?{background:'#162E44'}:{}}>{f}</button>)}</div>

<div className="mt-6 space-y-3">{filtered.map((p,i)=><div key={i} className="rounded-[24px] p-5 flex gap-4" style={{background:'#162E44'}}><div className="w-12 h-12 rounded-full flex items-center justify-center text-[20px] shrink-0" style={{background:'rgba(0,0,0,0.3)'}}>{p.icon}</div><div className="flex-1"><div className="font-bold text-[15px] text-white leading-tight">{p.name}</div><div className="text-[12px] text-slate-400 mt-1.5">🕒 {p.time}</div><div className="flex items-center gap-2 mt-3"><span className="text-[10px] font-black px-3.5 py-1.5 rounded-full bg-white/10 text-white tracking-wide">{p.price}</span><span className="text-[11px] text-slate-400">📍 {p.loc}</span></div></div></div>)}</div>
</div>

<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-4 border-t border-white/5 backdrop-blur-xl" style={{background:'#162E44'}}><div className="flex flex-col items-center text-[#FF6B00]"><span className="text-[18px]">🎯</span><span className="text-[10px] font-black mt-1">Today</span></div><div className="flex flex-col items-center text-slate-500"><span className="text-[18px]">🧳</span><span className="text-[10px] mt-1">Packing</span></div><div className="flex flex-col items-center text-slate-500"><span className="text-[18px]">👛</span><span className="text-[10px] mt-1">Wallet</span></div><div className="flex flex-col items-center text-slate-500"><span className="text-[18px]">🏁</span><span className="text-[10px] mt-1">Dakar</span></div><div className="flex flex-col items-center text-slate-500"><span className="text-[18px]">🚨</span><span className="text-[10px] mt-1">SOS</span></div></div>
</div>
)
}
