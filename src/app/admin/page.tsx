'use client'
import { useState, useEffect } from 'react'

const ADMIN_PASS = 'agadir2027'

export default function Admin(){
const [auth,setAuth]=useState(false)
const [pass,setPass]=useState('')
const [data,setData]=useState({today:'',dakar:'',packing:''})

useEffect(()=>{
if(localStorage.getItem('agadir_admin')==='yes') setAuth(true)
const saved=localStorage.getItem('agadir_admin_data')
if(saved) try{setData(JSON.parse(saved))}catch{}
},[])

const login=()=>{
if(pass===ADMIN_PASS){ setAuth(true); localStorage.setItem('agadir_admin','yes') }
else alert('Złe hasło!')
}

const save=()=>{
localStorage.setItem('agadir_admin_data', JSON.stringify(data))
alert('Zapisano! Dane są w LocalStorage - Vercel je widzi')
}

if(!auth) return(
<div className="min-h-screen bg-[#0F1F2F] flex items-center justify-center p-6">
<div className="bg-[#162E44] rounded-[20px] p-8 w-full max-w-[360px]">
<div className="text-[#FF6B00] font-black text-center">ADMIN AGADIR</div>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Hasło" className="w-full mt-6 bg-[#0F1F2F] border border-white/10 rounded-full px-5 py-3 text-white outline-none"/>
<button onClick={login} className="w-full mt-4 bg-[#FF6B00] text-white font-black py-3 rounded-full">WEJDŹ</button>
<div className="text-[11px] text-slate-500 mt-4 text-center">Domyślne: agadir2027</div>
</div>
</div>
)

return(
<div className="min-h-screen bg-[#F5F1E8] p-5">
<h1 className="text-[24px] font-black">ADMIN PANEL - AGADIR</h1>
<div className="text-[12px] text-black/60">Edytuj co widać w apce • Zapisuje w telefonie</div>

<div className="mt-6 space-y-4">
<div className="bg-white rounded-[16px] p-4 border">
<div className="font-bold">📅 TODAY - co dziś otwarte</div>
<textarea value={data.today} onChange={e=>setData({...data,today:e.target.value})} className="w-full mt-2 border rounded-[12px] p-3 text-[13px] h-24" placeholder="np. Suk Anza 08:00-14:00 FREE"/>
</div>

<div className="bg-white rounded-[16px] p-4 border">
<div className="font-bold">🚩 DAKAR - nowe wpisy</div>
<textarea value={data.dakar} onChange={e=>setData({...data,dakar:e.target.value})} className="w-full mt-2 border rounded-[12px] p-3 text-[13px] h-24" placeholder="Stage 8, Bivouac info..."/>
</div>

<div className="bg-white rounded-[16px] p-4 border">
<div className="font-bold">🧳 PACKING - lista</div>
<textarea value={data.packing} onChange={e=>setData({...data,packing:e.target.value})} className="w-full mt-2 border rounded-[12px] p-3 text-[13px] h-24" placeholder="Paszport, SPF 50..."/>
</div>

<button onClick={save} className="w-full bg-[#FF6B00] text-white font-black py-4 rounded-full">💾 ZAPISZ</button>
<button onClick={()=>{localStorage.removeItem('agadir_admin'); setAuth(false)}} className="w-full bg-black text-white font-black py-3 rounded-full mt-2">Wyloguj</button>
</div>

<div className="mt-8 bg-[#0F1F2F] rounded-[16px] p-4">
<div className="text-[#FF6B00] font-bold text-[12px]">LINKI ADMINA:</div>
<div className="text-white text-[12px] mt-2 leading-relaxed">
• Apka: next-stop-agadir.vercel.app<br/>
• Vercel Dashboard: vercel.com/dashboard<br/>
• GitHub: github.com/[twoj-nick]/next-stop-agadir<br/>
• SOS edycja: src/app/page.tsx linia 112-180
</div>
</div>
</div>
)
}
