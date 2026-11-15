'use client'
import { useState } from 'react'
export default function Admin(){
const [pass,setPass]=useState('')
const [ok,setOk]=useState(false)
const [pending,setPending]=useState([
{ id:1, name:'Anza Souk - extra info from FB group Agadir Expats', source:'FB Agadir Expats - https://facebook.com/groups/...', price:'FREE', lang:'EN → PL', status:'pending'},
{ id:2, name:'New Fish Grill near Marina - 30 MAD tagine', source:'Insta #agadirfood @bobs_tajine', price:'30 MAD', lang:'FR', status:'pending'},
{ id:3, name:'Fake police checkpoint Taghazout road', source:'Forum agadir.com - user maroc2024', price:'WATCH', lang:'EN', status:'pending'},
])
if(!ok) return (
<div className="min-h-screen bg-[#0F1F2F] flex items-center justify-center p-6">
<div className="bg-[#162E44] rounded-[24px] p-8 w-full max-w-[360px]">
<div className="text-[#FF6B00] font-black text-[11px] tracking-widest">NEXT STOP AGADIR - ADMIN</div>
<h1 className="text-white font-black text-[24px] mt-3">Enter password</h1>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Admin13" className="w-full bg-[#0F1F2F] rounded-full px-5 py-4 mt-5 text-white outline-none"/>
<button onClick={()=>pass==='Admin13'?setOk(true):alert('Wrong')} className="w-full bg-[#FF6B00] text-black font-black rounded-full py-4 mt-3">LOGIN</button>
<p className="text-slate-500 text-[11px] mt-4">Free DB mode - no Supabase. Data in /src/data</p>
</div>
</div>
)
return(
<div className="min-h-screen bg-[#0F1F2F] p-5 max-w-[600px] mx-auto">
<div className="flex justify-between items-center pt-4"><h1 className="text-white font-black text-[24px]">ADMIN PANEL v5</h1><button onClick={()=>setOk(false)} className="text-slate-400 text-[12px]">Logout</button></div>
<p className="text-slate-400 text-[12px] mt-1">Free project - JSON DB • Pending from Insta/FB/Fora</p>

<div className="mt-6 space-y-3">
{pending.map(p=><div key={p.id} className="bg-[#162E44] rounded-[20px] p-5">
<div className="flex justify-between"><span className="text-white font-bold text-[14px]">{p.name}</span><span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full h-fit">{p.status}</span></div>
<div className="text-[11px] text-slate-400 mt-2">Source: {p.source}</div>
<div className="text-[11px] text-slate-400">Lang: {p.lang} • Price: {p.price}</div>
<div className="flex gap-2 mt-4"><button onClick={()=>setPending(pending.filter(x=>x.id!==p.id))} className="flex-1 bg-[#FF6B00] text-black font-bold rounded-full py-3 text-[13px]">✅ APPROVE → LIVE</button><button onClick={()=>setPending(pending.filter(x=>x.id!==p.id))} className="flex-1 bg-white/10 text-white font-bold rounded-full py-3 text-[13px]">❌ REJECT</button></div>
</div>)}
</div>

<div className="bg-[#162E44] rounded-[24px] p-6 mt-8">
<div className="text-white font-bold">📋 Add Verified Place (FREE / WATCH / FOOD / LAUNDRY / EVENTS)</div>
<div className="text-[11px] text-slate-400 mt-2">Po dodaniu kliknij DEPLOY - pójdzie na LIVE w 4 językach automatycznie</div>
<button className="w-full bg-white text-black font-black rounded-full py-3 mt-4 text-[13px]" onClick={()=>alert('W v5 final - tu będzie form. Teraz edytuj src/data/verified.json bezpośrednio i push')}>+ ADD NEW PLACE</button>
</div>

<div className="text-center text-[10px] text-slate-600 mt-10">Temperature: Real sensor Agadir Al Massira - updates every 15min via /api/weather</div>
</div>
)
}
