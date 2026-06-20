"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Tag } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  badge: string;
  source: "amazon" | "aliexpress";
  url: string;
  endsIn: number;
}

const DEALS: Deal[] = [
  {
    id: "sd1",
    title: "Apple AirPods Pro (2nd Gen) — Active Noise Cancellation",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
    price: 139.99,
    originalPrice: 249.99,
    badge: "HOT DEAL",
    source: "amazon",
    url: "https://www.amazon.co.uk/s?k=apple+airpods+pro+2nd+gen&tag=luxeshoplondo-21",
    endsIn: 9900,
  },
  {
    id: "sd2",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    price: 199.99,
    originalPrice: 379.99,
    badge: "FLASH SALE",
    source: "amazon",
    url: "https://www.amazon.co.uk/s?k=sony+wh1000xm5+headphones&tag=luxeshoplondo-21",
    endsIn: 5400,
  },
  {
    id: "sd3",
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    category: "Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    price: 349.99,
    originalPrice: 649.99,
    badge: "MEGA DEAL",
    source: "amazon",
    url: "https://www.amazon.co.uk/s?k=dyson+v15+detect+cordless&tag=luxeshoplondo-21",
    endsIn: 14400,
  },
  {
    id: "sd4",
    title: "Samsung 65\" QLED 4K Smart TV — Crystal Display",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
    price: 599.99,
    originalPrice: 999.99,
    badge: "LIMITED",
    source: "amazon",
    url: "https://www.amazon.co.uk/s?k=samsung+65+qled+4k+smart+tv&tag=luxeshoplondo-21",
    endsIn: 21600,
  },
];

function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function DealCard({ deal }: { deal: Deal }) {
  const countdown = useCountdown(deal.endsIn);
  const discount = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
  const save = (deal.originalPrice - deal.price).toFixed(2);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={deal.image}
          alt={deal.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-black text-white bg-red-500 shadow-sm">{deal.badge}</span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-black text-white bg-[#1a1a2e] shadow-sm">-{discount}%</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 text-white text-xs font-bold backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          {countdown}
        </div>
        <div className={`absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${deal.source === "amazon" ? "bg-[#f90]" : "bg-[#e8441a]"}`}>
          {deal.source === "amazon" ? "Amazon UK" : "AliExpress"}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium">{deal.category}</span>
        </div>
        <h3 className="font-bold text-[#0f0f0f] text-sm leading-snug mb-3 line-clamp-2">{deal.title}</h3>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-2xl font-black text-[#1a1a2e]">£{deal.price.toFixed(2)}</span>
          <span className="text-sm text-gray-400 line-through mb-0.5">£{deal.originalPrice.toFixed(2)}</span>
          <span className="text-sm font-bold text-green-600 mb-0.5">Save £{save}</span>
        </div>
        <a
          href={deal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#1a1a2e] text-white text-sm font-bold hover:bg-[#0f3460] transition-colors shadow-sm"
        >
          <Flame className="w-4 h-4 text-orange-400" />
          Grab This Deal
        </a>
      </div>
    </div>
  );
}

export default function SuperDealsSection() {
  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Limited Time</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f0f0f] tracking-tight">Super Deals</h2>
            <p className="text-gray-500 text-sm mt-1">Massive savings — up to <span className="font-bold text-red-500">70% OFF</span> today only</p>
          </div>
          <Link href="/deals" className="hidden sm:flex items-center gap-1 px-5 py-2.5 rounded-xl border-2 border-[#1a1a2e] text-[#1a1a2e] text-sm font-bold hover:bg-[#1a1a2e] hover:text-white transition-all">
            View All Deals →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href="/deals" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-[#1a1a2e] text-[#1a1a2e] text-sm font-bold">
            View All Deals →
          </Link>
        </div>
      </div>
    </section>
  );
}
