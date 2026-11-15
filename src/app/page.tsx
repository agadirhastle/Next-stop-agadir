'use client'
import { useState } from 'react'

const places=[
{name:'Anza Weekly Souk - Poniedzialek',cat:'Events',price:'FREE',time:'Mon 08:00-14:00',loc:'Anza - Taxi 6 MAD',icon:'🛍️'},
{name:'Inezgane Berber Souk - Najwiekszy',cat:'Events',price:'FREE ENTRY',time:'Tue 08:00-15:00',loc:'Inezgane 12km',icon:'🐪'},
{name:'Tamraght Souk - Wtorek',cat:'Events',price:'FREE',time:'Tue 08:00-14:00',loc:'Tamraght Village',icon:'🛍️'},
{name:'Eco Wash Laundry',cat:'Useful',price:'30 MAD/KG',time:'09:00-19:00',loc:'Talborjt Centre',icon:'👕'},
{name:'Luggage Storage',cat:'Useful',price:'20 MAD/DAY',time:'06:00-22:00',loc:'Gare Routiere',icon:'🧳'},
{name:'Exchange 0% Commission',cat:'Useful',price:'0% COMMISSION',time:'09:00-20:00',loc:'Souk El Had Gate 10',icon:'💱'},
{name:'SIM Card Orange 20GB',cat:'Useful',price:'50 MAD',time:'09:00-21:00',loc:'Marina Shops',icon:'📱'},
{name:"Bab's Tajine - Best Cheap",cat:'Food',price:'35 MAD',time:'12:00-23:00',loc:'Talborjt - Local',icon:'🍲'},
{name:'Little Norway Breakfast',cat:'Food',price:'50 MAD',time:'08:00-16:00',loc:'Founty Beach',icon:'☕'},
{name:'Souk Fish Grill - Fresh',cat:'Food',price:'40 MAD',time:'11:00-21:00',loc:'Souk El Had',icon:'🐟'},
{name:'Sunset Kasbah FREE View',cat:'Food',price:'FREE',time:'18:30-19:30',loc:'Kasbah Hill - TOP',icon:'🌅'},
{name:'⚠️ Free Bracelet Scam',cat:'Watch',price:'SCAM ALERT',time:'All day',loc:'Beach & Marina - UWAGA',icon:'⚠️'},
{name:'⚠️ Airport Taxi MAX Price',cat:'Watch',price:'MAX 150 MAD',time:'24/7',loc:'Agadir Airport - Negocjuj',icon:'🚕'},
{name:'⚠️ Fake Guide "Free Tour"',cat:'Watch',price:'SCAM',time:'All day',loc:'Medina & Souk',icon:'🚨'},
]

const packingList=[
{cat:'Documents',items:['Paszport','Ubezpieczenie','Karta EKUZ','Kopia rezerwacji','Prawo jazdy']},
{cat:'Beach & Surf',items:['Krem SPF 50','Okulary','Czapka','Kostium','Recznik szybkoschnacy','Surf wax']},
{cat:'Apteczka',items:['Imodium','Paracetamol','Plastry','Electrolity','Na komary DEET','Chusta']},
{cat:'Tech',items:['Powerbank','Adapter EU->?','Telefon dual SIM','Kabel','Sluchawki']},
]

export default function Page(){
const [filter,setFilter]=useState('All')
const [mad,setMad]=useState(100)
const [tab,setTab]=useState('today')
const [packed,setPacked]=useState<string[]>([])
const togglePack=(i:string)=>setPacked(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i])
const filtered=filter==='All'?places:places.filter(p=>filter==='Free'?p.price.includes('FREE'):p.cat===filter)

return(
<div className="min-h-screen max-w-[480px] mx-auto pb-28" style={{background:'#0F1F2F'}}>
<div className="px-5 pt-8 pb-2">
<div className="text-[#FF6B00] font-black text-[11px] tracking-[0.3em]">NEXT STOP, AGADIR. v4 • FULL COMPASS</div>

{tab==='today'&&(<>
<h1 className="text-[36px] font-black text-white leading-[0.9] mt-3">TODAY IN<br/>AGADIR v4</h1>
<p className="text-slate-400 text-[12px] mt-2">{new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})} • Pocket Compass</p>
<div className="bg-[#F5F0E8] text-black rounded-full px-4 py-3 mt-5 font-bold text-[12px] flex justify-between"><span>🔥 Dakar 2027 Route + Weekly Souks</span><span>→</span></div>
<div className="rounded-[28px] p-6 mt-6" style={{background:'#162E44'}}>
<div className="flex justify-between items-center"><div className="font-bold text-white text-[14px]">Currency Converter OFFLINE</div><div className="text-[9px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">● OFFLINE</div></div>
<div className="mt-5 rounded-full px-6 py-5 flex justify-between items-center" style={{background:'#0F1F2F'}}><input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[34px] font-black w-28 text-white outline-none"/><span className="text-slate-400 font-bold">MAD</span></div>
<div className="flex gap-3 mt-4"><div className="flex-1 rounded-[20px] p-4" style={{background:'rgba(255,107,0,0.15)'}}><div className="text-[10px] text-slate-300 font-bold tracking-widest">PLN</div><div className="text-[24px] font-black text-[#FF6B00] mt-1">{(mad*0.40).toFixed(0)} zł</div></div><div className="flex-1 rounded-[20px] p-4" style={{background:'#0F1F2F'}}><div className="text-[10px] text-slate-400 font-bold tracking-widest">EUR</div><div className="text-[24px] font-black text-white mt-1">{(mad*0.092).toFixed(1)} €</div></div></div>
<div className="text-[10px] text-slate-500 mt-4">1 MAD = 0.40 PLN • 0.092 EUR • 1 EUR = 10.8 MAD</div>
</div>
<div className="flex gap-2 mt-7 overflow-x-auto pb-2 -mx-1 px-1">{['All','Free','Watch','Food','Events','Useful'].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-6 py-3 rounded-full text-[13px] font-bold whitespace-nowrap ${filter===f?'bg-white text-black':'text-white border border-white/10'}`} style={filter!==f?{background:'#162E44'}:{}}>{f}</button>)}</div>
<div className="mt-6 space-y-3">{filtered.map((p,i)=><div key={i} className="rounded-[24px] p-5 flex gap-4" style={{background:'#162E44'}}><div className="w-12 h-12 rounded-full flex items-center justify-center text-[20px] shrink-0" style={{background:'rgba(0,0,0,0.3)'}}>{p.icon}</div><div className="flex-1"><div className="font-bold text-[15px] text-white leading-tight">{p.name}</div><div className="text-[12px] text-slate-400 mt-1.5">🕒 {p.time}</div><div className="flex items-center gap-2 mt-3"><span className="text-[10px] font-black px-3.5 py-1.5 rounded-full bg-white/10 text-white tracking-wide">{p.price}</span><span className="text-[11px] text-slate-400">📍 {p.loc}</span></div></div></div>)}</div>
</>)}

{tab==='packing'&&(<>
<h1 className="text-[32px] font-black text-white leading-[0.9] mt-3">PACKING<br/>CHECKLIST</h1>
<p className="text-slate-400 text-[12px] mt-2">Tap to check • {packed.length} packed</p>
<div className="mt-6 space-y-6">{packingList.map(group=><div key={group.cat}><div className="text-[#FF6B00] font-black text-[11px] tracking-widest mb-3">{group.cat.toUpperCase()}</div><div className="space-y-2">{group.items.map(item=>{const done=packed.includes(item);return(<div key={item} onClick={()=>togglePack(item)} className="rounded-[18px] p-4 flex justify-between items-center cursor-pointer" style={{background:done?'rgba(255,107,0,0.15)':'#162E44',border:done?'1px solid #FF6B00':''}}><span className={`text-[14px] font-bold ${done?'text-white line-through opacity-60':'text-white'}`}>{item}</span><span className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] ${done?'bg-[#FF6B00] text-black':'bg-white/10 text-slate-400'}`}>{done?'✓':''}</span></div>)})}</div></div>)}</div>
</>)}

{tab==='wallet'&&(<>
<h1 className="text-[32px] font-black text-white leading-[0.9] mt-3">WALLET &<br/>BUDGET</h1>
<div className="rounded-[28px] p-6 mt-6" style={{background:'#162E44'}}>
<div className="text-white font-bold">Daily Budget Agadir</div>
<div className="mt-4 space-y-3 text-[13px]"><div className="flex justify-between text-slate-300"><span>🏨 Hostel / Budget Hotel</span><span className="text-white font-bold">80-150 MAD</span></div><div className="flex justify-between text-slate-300"><span>🍲 Street Food + Tajine</span><span className="text-white font-bold">50-80 MAD</span></div><div className="flex justify-between text-slate-300"><span>🚌 Bus + Taxi Petit</span><span className="text-white font-bold">20-40 MAD</span></div><div className="flex justify-between text-slate-300"><span>🏄 Surf rental 1 day</span><span className="text-white font-bold">100-150 MAD</span></div><div className="border-t border-white/10 pt-3 flex justify-between font-black"><span className="text-white">TOTAL DAY</span><span className="text-[#FF6B00]">~300 MAD = 120 PLN</span></div></div>
</div>
<div className="rounded-[24px] p-5 mt-4" style={{background:'#162E44'}}><div className="font-bold text-white">💡 Money Tips</div><div className="text-[12px] text-slate-400 mt-2 leading-relaxed">• Zawsze pytaj o cene PRZED • Plac w MAD, nie EUR • Wymien w Gate 10 Souk 0% • Bankomaty Attijari bez prowizji • Targuj sie 40% w dol</div></div>
</>)}

{tab==='dakar'&&(<>
<h1 className="text-[32px] font-black text-white leading-[0.9] mt-3">DAKAR<br/>2027</h1>
<div className="bg-[#FF6B00] text-black rounded-[24px] p-5 mt-6 font-bold"><div className="text-[11px] tracking-widest opacity-70">CONFIRMED ROUTE 2027</div><div className="text-[18px] mt-1 leading-tight">Agadir → Laayoune → Dakhla → Mauritania</div><div className="text-[12px] mt-2 font-normal">Start: 4 Jan 2027 z Plage Agadir • Prolog na plazy</div></div>
<div className="mt-4 space-y-3"><div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">🏁 Stage 1: Agadir Beach Prolog</div><div className="text-[12px] text-slate-400 mt-1">4 Jan 2027 • 12km na plazy • FREE VIEW • Przyjdz o 06:00</div></div><div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">📍 Best View Points</div><div className="text-[12px] text-slate-400 mt-2">• Kasbah Hill - cala panorama startu<br/>• Plage Ait Melloul - wydmy<br/>• Marina Agadir - bivouac teamow</div></div><div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">🎟️ How to Watch FREE</div><div className="text-[12px] text-slate-400 mt-2">Brak biletow - wszystko free. Zabierz wode, czapke, lornetke. Bus 30 do Taghazout 6 MAD.</div></div></div>
</>)}

{tab==='sos'&&(<>
<h1 className="text-[32px] font-black text-white leading-[0.9] mt-3">SOS &<br/>USEFUL</h1>
<div className="mt-6 space-y-3"><div className="rounded-[20px] p-5 bg-red-900/30 border border-red-500/30"><div className="font-black text-white flex justify-between"><span>🚨 POLICE</span><span className="text-red-400">19 / 112</span></div></div><div className="rounded-[20px] p-5 bg-red-900/30 border border-red-500/30"><div className="font-black text-white flex justify-between"><span>🚑 AMBULANCE</span><span className="text-red-400">15 / 112</span></div></div><div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white flex justify-between"><span>💊 Night Pharmacy</span><span className="text-slate-400">24/7</span></div><div className="text-[12px] text-slate-400 mt-1">Av Hassan II - naprzeciwko McDonalds • Mowia po angielsku</div></div><div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">🇵🇱 Ambasada PL w Rabacie</div><div className="text-[12px] text-slate-400 mt-1">+212 537 77 45 50 • W naglych wypadkach: +212 661 22 11 33<br/>Consulat Agadir: +212 528 84 11 79</div></div><div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">🧳 Lost Luggage? Gare Routiere</div><div className="text-[12px] text-slate-400 mt-1">Storage 20 MAD/day • 06:00-22:00 • Zdjecie paszportu wystarczy</div></div></div>
</>)}

</div>

<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-3 border-t border-white/10 backdrop-blur-xl" style={{background:'#162E44'}}>
<button onClick={()=>setTab('today')} className={`flex flex-col items-center ${tab==='today'?'text-[#FF6B00]':'text-slate-500'}`}><span className="text-[18px]">🎯</span><span className="text-[10px] font-black mt-1">Today</span></button>
<button onClick={()=>setTab('packing')} className={`flex flex-col items-center ${tab==='packing'?'text-[#FF6B00]':'text-slate-500'}`}><span className="text-[18px]">🧳</span><span className="text-[10px] font-black mt-1">Packing</span></button>
<button onClick={()=>setTab('wallet')} className={`flex flex-col items-center ${tab==='wallet'?'text-[#FF6B00]':'text-slate-500'}`}><span className="text-[18px]">👛</span><span className="text-[10px] font-black mt-1">Wallet</span></button>
<button onClick={()=>setTab('dakar')} className={`flex flex-col items-center ${tab==='dakar'?'text-[#FF6B00]':'text-slate-500'}`}><span className="text-[18px]">🏁</span><span className="text-[10px] font-black mt-1">Dakar</span></button>
<button onClick={()=>setTab('sos')} className={`flex flex-col items-center ${tab==='sos'?'text-[#FF6B00]':'text-slate-500'}`}><span className="text-[18px]">🚨</span><span className="text-[10px] font-black mt-1">SOS</span></button>
</div>
</div>
)
}
