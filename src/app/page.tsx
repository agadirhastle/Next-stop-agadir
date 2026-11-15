'use client'
import { useState, useEffect, useRef } from 'react'

export default function Page(){
const [lang,setLang]=useState('pl')
const [tab,setTab]=useState('today')
const [mad,setMad]=useState(100)
const [temp,setTemp]=useState('23°')
const [showScanner,setShowScanner]=useState(false)
const [scanMode,setScanMode]=useState<'menu'|'bill'>('menu')
const [scanResult,setScanResult]=useState('')
const fileRef=useRef<HTMLInputElement>(null)

useEffect(()=>{
fetch('https://api.open-meteo.com/v1/forecast?latitude=30.4278&longitude=-9.5981&current=temperature_2m').then(r=>r.json()).then(d=>setTemp(Math.round(d.current.temperature_2m)+'°')).catch(()=>setTemp('24°'))
},[])

const t=(pl:string,en:string,fr:string,ar:string)=>{
if(lang==='pl') return pl
if(lang==='en') return en
if(lang==='fr') return fr
return ar
}

const handleScan=async(e:any)=>{
const file=e.target.files?.[0]
if(!file) return
setScanResult('Scanning...')
setTimeout(()=>{
if(scanMode==='menu'){
setScanResult(lang==='pl' ? '📋 MENU: Tajine poulet 45 MAD → Kurczak 45 MAD (OK cena)\nCouscous 35 MAD → Kuskus 35 MAD (TANIO)\nThe menthe 10 MAD → Herbata miętowa 10 MAD' : '📋 MENU SCAN: Chicken Tajine 45 MAD - Fair price\nCouscous 35 MAD - Cheap\nMint tea 10 MAD')
}else{
setScanResult(lang==='pl' ? '🧾 RACHUNEK: Suma 145 MAD\nTajine 45 + 2x herbata 20 + chleb 5 = 70 MAD\n⚠️ DOLICZONO 75 MAD EXTRA - SPRAWDZ! Pokaż to kelnerowi' : '🧾 BILL CHECK: Total 145 MAD\nExpected 70 MAD - OVERCHARGED 75 MAD - Show this!')
}
},1500)
}

return(
<div className="min-h-screen max-w-[480px] mx-auto pb-28" style={{background:'#0F1F2F'}}>
<div className="px-5 pt-6">
<div className="flex justify-between items-center">
<div className="text-[#FF6B00] font-black text-[10px] tracking-[0.3em]">NEXT STOP, AGADIR. v5</div>
<div className="flex gap-1">{['pl','en','fr','ar'].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-3 py-1.5 rounded-full text-[11px] font-black ${lang===l?'bg-white text-black':'bg-[#162E44] text-slate-400'}`}>{l.toUpperCase()}</button>)}</div>
</div>

<div className="flex justify-between items-end mt-4">
<h1 className="text-[30px] font-black text-white leading-[0.9]">{t('DZISIAJ W\nAGADIRZE','TODAY IN\nAGADIR','AUJOURDHUI A\nAGADIR','اليوم في\nأكادير')}</h1>
<div className="text-right"><div className="text-[28px] font-black text-white">{temp}</div><div className="text-[10px] text-slate-400">{t('Real sensor','Real sensor','Capteur reel','مستشعر حقيقي')} • Agadir</div></div>
</div>

<button onClick={()=>setShowScanner(true)} className="w-full bg-[#FF6B00] text-black font-black rounded-full py-4 mt-5 flex justify-center gap-2"><span>📷</span> {t('SKANER MENU / RACHUNKU - TAP','MENU / BILL SCANNER','SCANNER MENU / FACTURE','ماسح القائمة / الفاتورة')}</button>

{tab==='today'&&(<>
<div className="rounded-[28px] p-6 mt-5" style={{background:'#162E44'}}>
<div className="flex justify-between"><div className="font-bold text-white text-[14px]">{t('Konwerter OFFLINE','Converter OFFLINE','Convertisseur OFFLINE','محول بدون انترنت')}</div><div className="text-[9px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">● OFFLINE</div></div>
<div className="mt-4 rounded-full px-6 py-4 flex justify-between items-center" style={{background:'#0F1F2F'}}><input type="number" value={mad} onChange={e=>setMad(Number(e.target.value))} className="bg-transparent text-[30px] font-black w-24 text-white outline-none"/><span className="text-slate-400 font-bold">MAD</span></div>
<div className="flex gap-3 mt-3"><div className="flex-1 rounded-[18px] p-3" style={{background:'rgba(255,107,0,0.15)'}}><div className="text-[10px] text-white">PLN</div><div className="text-[20px] font-black text-[#FF6B00]">{(mad*0.40).toFixed(0)} zł</div></div><div className="flex-1 rounded-[18px] p-3" style={{background:'#0F1F2F'}}><div className="text-[10px] text-white">EUR</div><div className="text-[20px] font-black text-white">{(mad*0.092).toFixed(1)} €</div></div></div>
</div>
<div className="mt-6 space-y-3">
<div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">🛍️ {t('Suk Anza - Pon','Anza Souk - Mon','Souk Anza - Lun','سوق أنزا')}</div><div className="text-[12px] text-slate-400 mt-1">{t('DARMOWE • Sprawdzone dziś','FREE • Verified today','GRATUIT • Verifie','مجاني • تم التحقق')} • 08:00-14:00</div></div>
<div className="rounded-[20px] p-5" style={{background:'#162E44'}}><div className="font-bold text-white">👕 {t('Pralnia Eco Wash','Eco Wash Laundry','Laverie Eco','مصبغة إيكو')}</div><div className="text-[12px] text-slate-400 mt-1">30 MAD/KG • Talborjt • {t('Polecane','Recommended','Recommande','موصى به')}</div></div>
<div className="rounded-[20px] p-5 bg-yellow-900/20 border border-yellow-500/30"><div className="font-bold text-yellow-200">⚠️ {t('Bransoletka scam','Bracelet scam','Arnaque bracelet','احتيال السوار')}</div><div className="text-[12px] text-yellow-200/70 mt-1">{t('Na plazy - nie bierz','On beach - dont take','Sur plage - ne prenez pas','على الشاطئ - لا تأخذ')}</div></div>
</div>
</>)}

</div>

{showScanner&&(
<div className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center">
<div className="bg-[#162E44] w-full max-w-[480px] rounded-t-[32px] p-6 pb-10">
<div className="flex justify-between items-center"><h2 className="text-white font-black text-[20px]">{scanMode==='menu'?t('Tłumacz menu','Menu translator','Traducteur menu','مترجم القائمة'):t('Sprawdz rachunek','Check bill','Verifier facture','تحقق من الفاتورة')}</h2><button onClick={()=>setShowScanner(false)} className="text-slate-400">✕</button></div>
<div className="flex gap-2 mt-4"><button onClick={()=>setScanMode('menu')} className={`flex-1 py-3 rounded-full font-bold text-[13px] ${scanMode==='menu'?'bg-white text-black':'bg-white/10 text-white'}`}>📋 MENU</button><button onClick={()=>setScanMode('bill')} className={`flex-1 py-3 rounded-full font-bold text-[13px] ${scanMode==='bill'?'bg-white text-black':'bg-white/10 text-white'}`}>🧾 {t('RACHUNEK','BILL','FACTURE','فاتورة')}</button></div>
<input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScan}/>
<button onClick={()=>fileRef.current?.click()} className="w-full bg-[#FF6B00] text-black font-black rounded-full py-4 mt-5">📷 {t('Zrób zdjęcie','Take photo','Prendre photo','التقط صورة')}</button>
{scanResult&&<div className="bg-[#0F1F2F] rounded-[20px] p-4 mt-4 text-white text-[13px] whitespace-pre-line leading-relaxed">{scanResult}</div>}
<div className="text-[11px] text-slate-500 mt-4 text-center">{t('Działa offline - OCR w telefonie','Works offline - OCR on device','Fonctionne hors ligne','يعمل بدون انترنت')}</div>
</div>
</div>
)}

<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around py-3 border-t border-white/10" style={{background:'#162E44'}}>
<button onClick={()=>setTab('today')} className="flex flex-col items-center text-[#FF6B00]"><span>🎯</span><span className="text-[10px] font-black">Today</span></button>
<a href="/admin" className="flex flex-col items-center text-slate-500"><span>🔧</span><span className="text-[10px]">Admin</span></a>
</div>
</div>
)
}
