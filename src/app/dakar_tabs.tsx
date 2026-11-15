'use client'
import { useState } from 'react'
export default function DakarTabs(){
const [dTab,setDTab]=useState('route')
return(
<div>
<div className="flex gap-2 mt-5 bg-[#162E44] p-1.5 rounded-full">
{[
{ id:'route', label:'Route', icon:'🗺️'},
{ id:'watch', label:'Where to Watch', icon:'👀'},
{ id:'teams', label:'Teams', icon:'🏁'},
{ id:'tips', label:'Tips', icon:'💡'},
].map(t=><button key={t.id} onClick={()=>setDTab(t.id)} className={`flex-1 py-2.5 rounded-full text-[12px] font-black flex justify-center gap-1 ${dTab===t.id?'bg-white text-black':'text-slate-400'}`}><span>{t.icon}</span>{t.label}</button>)}
</div>

{dTab==='route'&&<div className="mt-4 space-y-3">
<div className="bg-[#FF6B00] text-black rounded-[20px] p-4 font-bold"><div className="text-[11px] opacity-70">DAKAR 2027 CONFIRMED</div><div className="text-[16px] mt-1">Agadir → Laayoune → Dakhla</div><div className="text-[12px] font-normal mt-1">4-17 Jan 2027 • 14 stages</div></div>
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">Stage 1 - 4 Jan - Agadir Beach Prolog</div><div className="text-slate-400 text-[12px] mt-1">12km na plaży • FREE • Start 06:00 • Plage Agadir</div></div>
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">Stage 2 - 5 Jan - Agadir → Laayoune</div><div className="text-slate-400 text-[12px] mt-1">450km • Wydmy • Bivouac Laayoune</div></div>
</div>}

{dTab==='watch'&&<div className="mt-4 space-y-3">
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">📍 Kasbah Hill - BEST VIEW</div><div className="text-slate-400 text-[12px] mt-1">Cała panorama startu • Przyjdź 05:30 • Zabierz koc • 20 MAD taxi z centrum</div></div>
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">📍 Plage Ait Melloul - Wydmy</div><div className="text-slate-400 text-[12px] mt-1">Najlepsze zdjęcia • Bus 30 - 6 MAD • 07:00-09:00</div></div>
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">📍 Marina - Bivouac</div><div className="text-slate-400 text-[12px] mt-1">Zespoły, mechanicy, wywiady • FREE ENTRY • 16:00-20:00</div></div>
</div>}

{dTab==='teams'&&<div className="mt-4 space-y-3">
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">Toyota Gazoo Racing</div><div className="text-slate-400 text-[12px] mt-1">Nasser Al-Attiyah • Nr 200 • Hilux</div></div>
<div className="bg-[#162E44] rounded-[20px] p-4"><div className="text-white font-bold">Audi Sport</div><div className="text-slate-400 text-[12px] mt-1">Ekstrom / Peterhansel • E-Tron</div></div>
<div className="text-center text-[11px] text-slate-500 mt-3">Live tracking w dniu rajdu</div>
</div>}

{dTab==='tips'&&<div className="mt-4 bg-[#162E44] rounded-[20px] p-5"><div className="text-white font-bold">💡 Dakar Tips - jak oglądać FREE</div><div className="text-slate-400 text-[12px] mt-2 leading-relaxed">• Brak biletów - wszystko free na plaży<br/>• Zabierz wodę, czapkę, krem SPF 50<br/>• Powerbank - tracking live zżera baterię<br/>• Bus 30 do Taghazout 6 MAD<br/>• Policja zamyka drogę 05:00-10:00<br/>• Najlepsze zdjęcia: 07:00 golden hour</div></div>}
</div>
)
}
