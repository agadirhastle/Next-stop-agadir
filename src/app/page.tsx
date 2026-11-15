"use client";
import { useState } from "react";
import places from "@/data/places.json";
type Category = "all" | "surf" | "cafe" | "restaurant" | "trip" | "shopping";
const categories: Category[] = ["all","surf","cafe","restaurant","trip","shopping"];
export default function Home(){
  const [cat, setCat] = useState<Category>("all");
  const filtered = cat==="all" ? places : places.filter(p=>p.category===cat);
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <header className="py-10 text-center">
          <h1 className="text-5xl font-black">Next Stop Agadir</h1>
          <p className="text-zinc-400 mt-3">30 best spots • Surf • Food • Trips • Affiliate ready</p>
        </header>
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {categories.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full capitalize border ${cat===c?"bg-white text-black":"border-zinc-700 hover:bg-zinc-800"}`}>{c}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p=>(
            <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 transition">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{p.name}</h3>
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full">{p.category}</span>
              </div>
              <p className="text-zinc-400 text-sm mt-2">{p.description}</p>
              <p className="text-zinc-500 text-xs mt-2">{p.lat}, {p.lng}</p>
              <div className="flex gap-2 mt-4">
                <a href={p.affiliateLink} target="_blank" className="flex-1 text-center bg-white text-black py-2 rounded-xl font-semibold hover:bg-zinc-200">Book / View →</a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`} target="_blank" className="px-4 py-2 bg-zinc-800 rounded-xl text-sm">Map</a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 p-6 bg-white text-black rounded-2xl text-center">
          <h2 className="font-bold text-xl">Gotowe do zarabiania 💰</h2>
          <p className="mt-2 text-sm">Podmień affiliateLink w src/data/places.json na swoje linki z Booking.com i GetYourGuide.</p>
        </div>
      </div>
    </main>
  )
}
