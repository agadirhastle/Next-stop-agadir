'use client'
import { useState } from 'react'
const places=[
{name:'Anza Souk Poniedzialek',cat:'Events',price:'FREE',time:'Mon 08:00-14:00',loc:'Anza',icon:'X'},
{name:'Inezgane Souk',cat:'Events',price:'FREE',time:'Tue 08:00-15:00',loc:'Inezgane',icon:'X'},
{name:'Eco Wash',cat:'Useful',price:'30 MAD/KG',time:'09:00-19:00',loc:'Talborjt',icon:'X'},
{name:'Luggage Storage',cat:'Useful',price:'20 MAD/DAY',time:'06:00-22:00',loc:'Gare',icon:'X'},
{name:'Exchange 0%',cat:'Useful',price:'0% COMMISSION',time:'09:00-20:00',loc:'Gate 10',icon:'X'},
{name:'Tajine 35 MAD',cat:'Food',price:'35 MAD',time:'12:00-23:00',loc:'Talborjt',icon:'X'},
{name:'Sunset Kasbah',cat:'Food',price:'FREE',time:'18:30-19:30',loc:'Kasbah',icon:'X'},
{name:'Bracelet Scam',cat:'Watch',price:'SCAM',time:'All day',loc:'Plage',icon:'X'},
{name:'Taxis MAX 150',cat:'Watch',price:'MAX 150 MAD',time:'24/7',loc:'Aeroport',icon:'X'},
{name:'Night Pharmacy',cat:'SOS',price:'FREE',time:'24/7',loc:'Hassan',icon:'X'},
]
export default function Page(){
const [filter,setFilter]=useState('All')
const [mad,setMad]=useState(100)
const filtered=filter==='All'?places:places.filter(p=>filter==='Free'?p.price.includes('FREE'):p.cat===filter)
return(<div className="min-h-screen bg-[#0F1F2F] max-w-[480px] mx-auto pb-24"><div className="px-4 pt-6"><div className="text-[#FF6B00] font-black text-[13px]">NEXT STOP, AGADIR. v2</div></div><div className="px-4"><h1 className="text-[32px] font-black text-white leading-none mt-2">TODAY IN AGADIR v2</h1><div className="bg-[#F5F0E8] text-black rounded-full px-4 py-3 mt-4 font-bold text-[13px]">SPECIAL: Weekly Souks + Dakar</div><div className="bg-[#162E44] rounded-[24px] p-5 mt-4"><div className="font-bold text-white">Currency Converter</div><div className="bg-[#0F1F2F] rounded-full px-5 py-4 mt-4 flex justify-between items-center"><input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[28px] font-black w-24 text-white outline-none"/><span className="text-slate-400 font-bold">MAD</span></div><div className="flex gap-3 mt-3"><div className="flex-1 bg-[#FF6B00]/20 rounded-[18px] p-3"><div className="text-[10px] text-white">PLN</div><div className="text-[20px] font-black text-[#FF6B00]">{(mad*0.40).toFixed(0)} zl</div></div><div className="flex-1 bg-[#0F1F2F] rounded-[18px] p-3"><div className="text-[10px] text-white">EUR</div><div className="text-[20px] font-black text-white">{(mad*0.09).toFixed(0)} E</div></div></div></div><div className="flex gap-2 mt-5 overflow-x-auto pb-2">{['All','Free','Watch','Food','Events','Useful'].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap ${filter===f?'bg-white text-black':'bg-[#162E44] text-white border border-white/10'}`}>{f}</button>)}</div><div className="mt-4">{filtered.map((p,i)=><div key={i} className="bg-[#162E44] rounded-[24px] p-4 flex gap-3 mb-3"><div className="flex-1"><div className="font-bold text-[15px] text-white">{p.name}</div><div className="text-[12px] text-slate-400 mt-1">{p.time}</div><div className="flex items-center gap-2 mt-2"><span className="text-[11px] font-black px-3 py-1 rounded-full bg-slate-700 text-white">{p.price}</span><span className="text-[11px] text-slate-400">{p.loc}</span></div></div></div>)}</div></div><div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#162E44] border-t border-white/10 flex justify-around py-2.5"><div className="flex flex-col items-center text-[#FF6B00]"><span>Today</span></div></div></div>)
}
