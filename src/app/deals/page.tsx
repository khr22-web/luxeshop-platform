"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Clock, Zap, Tag } from "lucide-react";

const AFFILIATE_TAG = "luxeshoplondo-21";

interface Deal {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  badge: "HOT DEAL" | "FLASH SALE" | "LIMITED" | "BEST VALUE";
  amazonKeyword: string;
  durationHours: number;
}

const superDeals: Deal[] = [
  { id: "deal-1", name: "Apple AirPods Pro (2nd Gen) — Active Noise Cancellation", category: "Audio", originalPrice: 249.99, salePrice: 139.99, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80", badge: "HOT DEAL", amazonKeyword: "Apple+AirPods+Pro+2nd+Generation", durationHours: 6 },
  { id: "deal-2", name: "Samsung 65\" 4K QLED Smart TV — Crystal Display", category: "Electronics", originalPrice: 1299.99, salePrice: 699.99, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80", badge: "FLASH SALE", amazonKeyword: "Samsung+65+inch+4K+QLED+Smart+TV", durationHours: 5 },
  { id: "deal-3", name: "Sony WH-1000XM5 Wireless Headphones — Industry-Leading ANC", category: "Audio", originalPrice: 379.99, salePrice: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", badge: "HOT DEAL", amazonKeyword: "Sony+WH-1000XM5+Wireless+Headphones", durationHours: 4 },
  { id: "deal-4", name: "Michael Kors Jet Set Leather Tote Bag — Black", category: "Bags", originalPrice: 299.99, salePrice: 149.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", badge: "BEST VALUE", amazonKeyword: "Michael+Kors+Jet+Set+Tote+Bag", durationHours: 8 },
  { id: "deal-5", name: "Apple Watch Series 9 — GPS + Cellular 45mm", category: "Watches", originalPrice: 499.99, salePrice: 299.99, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80", badge: "FLASH SALE", amazonKeyword: "Apple+Watch+Series+9+GPS+Cellular", durationHours: 7 },
  { id: "deal-6", name: "Nike Air Max 270 — Men's Running Shoes", category: "Fashion", originalPrice: 149.99, salePrice: 79.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: "HOT DEAL", amazonKeyword: "Nike+Air+Max+270+Running+Shoes", durationHours: 6 },
  { id: "deal-7", name: "iPad Air 5th Generation — M1 Chip, 10.9\"", category: "Electronics", originalPrice: 749.99, salePrice: 449.99, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", badge: "LIMITED", amazonKeyword: "Apple+iPad+Air+5th+Generation+M1", durationHours: 5 },
  { id: "deal-8", name: "Dyson V15 Detect Cordless Vacuum Cleaner", category: "Home", originalPrice: 649.99, salePrice: 379.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", badge: "BEST VALUE", amazonKeyword: "Dyson+V15+Detect+Cordless+Vacuum", durationHours: 7 },
  { id: "deal-9", name: "Canon EOS R50 Mirrorless Camera — 24.2MP", category: "Photography", originalPrice: 899.99, salePrice: 549.99, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", badge: "FLASH SALE", amazonKeyword: "Canon+EOS+R50+Mirrorless+Camera", durationHours: 3 },
  { id: "deal-10", name: "PlayStation 5 Console — Disc Edition", category: "Gaming", originalPrice: 549.99, salePrice: 399.99, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80", badge: "HOT DEAL", amazonKeyword: "PlayStation+5+Console+Disc+Edition", durationHours: 5 },
  { id: "deal-11", name: "Rolex Submariner Style — Premium Automatic Watch", category: "Watches", originalPrice: 399.99, salePrice: 199.99, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80", badge: "LIMITED", amazonKeyword: "Luxury+Automatic+Submariner+Watch+Men", durationHours: 9 },
  { id: "deal-12", name: "MacBook Air M2 — 13-inch, 8GB RAM, 256GB SSD", category: "Computers", originalPrice: 1299.99, salePrice: 899.99, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", badge: "BEST VALUE", amazonKeyword: "Apple+MacBook+Air+M2+13+inch", durationHours: 12 },
];

function badgeStyle(badge: Deal["badge"]) {
  switch (badge) {
    case "HOT DEAL": return "bg-red-500 text-white";
    case "FLASH SALE": return "bg-orange-500 text-white";
    case "LIMITED": return "bg-purple-600 text-white";
    case "BEST VALUE": return "bg-green-600 text-white";
  }
}

function calcDiscount(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100);
}

function getDealEndTime(dealId: string, durationHours: number): Date {
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const hash = dealId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const offsetMs = (hash % Math.max(1, 24 - durationHours)) * 60 * 60 * 1000;
  const endTime = new Date(dayStart.getTime() + offsetMs + durationHours * 60 * 60 * 1000);
  if (endTime <= now) endTime.setTime(endTime.getTime() + 24 * 60 * 60 * 1000);
  return endTime;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function DealTimer({ dealId, durationHours }: { dealId: string; durationHours: number }) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  useEffect(() => {
    const endTime = getDealEndTime(dealId, durationHours);
    const tick = () => setTimeLeft(formatCountdown(endTime.getTime() - Date.now()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [dealId, durationHours]);
  return (
    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 border border-white/10">
      <Clock className="w-3 h-3 text-orange-400" />
      <span className="text-orange-400 text-xs font-bold font-mono">{timeLeft || "..."}</span>
    </div>
  );
}

export default function DealsPage() {
  return (
    <main className="min-h-screen bg-[#07080F] pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a0500] via-[#2a0800] to-[#1a0500] border-b border-orange-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,100,0,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Flash Sales</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                🔥 Super <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Deals</span>
              </h1>
              <p className="text-[#aaaacc] text-lg">Up to <span className="text-orange-400 font-bold">70% OFF</span> — Limited time flash sales. Timers are live!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-6 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/30">
                <div className="text-3xl font-black text-orange-400">70%</div>
                <div className="text-xs text-[#8888aa] uppercase tracking-wide">Max Discount</div>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                <div className="text-3xl font-black text-red-400">12+</div>
                <div className="text-xs text-[#8888aa] uppercase tracking-wide">Live Deals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Alert Banner */}
        <div className="flex items-center gap-3 mb-8 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <p className="text-[#ffccaa] text-sm">
            <span className="font-bold text-white">Live countdown timers</span> — Each deal expires when the timer hits zero. Grab them before they&apos;re gone!
          </p>
          <span className="ml-auto text-orange-400 text-xs font-bold whitespace-nowrap flex items-center gap-1">
            <Zap className="w-3 h-3" /> Deals refresh daily
          </span>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {superDeals.map((deal) => {
            const discount = calcDiscount(deal.originalPrice, deal.salePrice);
            const savings = (deal.originalPrice - deal.salePrice).toFixed(2);
            const amazonUrl = `https://www.amazon.co.uk/s?k=${deal.amazonKeyword}&s=review-rank&tag=${AFFILIATE_TAG}`;
            return (
              <a key={deal.id} href={amazonUrl} target="_blank" rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl bg-[#0e0f1a] border border-white/[0.06] hover:border-orange-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,100,0,0.15)] overflow-hidden">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wide ${badgeStyle(deal.badge)}`}>{deal.badge}</span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#c9a84c] text-black">Save {discount}%</span>
                </div>
                <DealTimer dealId={deal.id} durationHours={deal.durationHours} />
                <div className="relative h-48 overflow-hidden bg-[#13141f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f1a]/60 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-4 gap-3">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-[#8888aa]" />
                    <span className="text-[#8888aa] text-xs uppercase tracking-wide">{deal.category}</span>
                  </div>
                  <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-orange-300 transition-colors">{deal.name}</h3>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-black text-orange-400">£{deal.salePrice.toFixed(2)}</span>
                      <span className="text-sm text-[#666688] line-through">£{deal.originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-xs font-semibold">You save £{savings}</span>
                      <span className="text-[#8888aa] text-xs">via Amazon UK</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-1">
                    <Flame className="w-4 h-4" /> Grab This Deal
                  </button>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center py-10 rounded-2xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20">
          <Flame className="w-10 h-10 text-orange-500 mx-auto mb-3 animate-pulse" />
          <h3 className="text-white text-2xl font-bold mb-2">Want More Deals?</h3>
          <p className="text-[#8888aa] mb-5">Browse thousands more discounted products on Amazon UK</p>
          <a href={`https://www.amazon.co.uk/deals?tag=${AFFILIATE_TAG}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:opacity-90 transition-opacity">
            <Flame className="w-5 h-5" /> See All Amazon Deals
          </a>
          <div className="mt-4">
            <Link href="/under20" className="inline-flex items-center gap-2 text-purple-400 text-sm font-semibold hover:text-purple-300">
              Also check 💸 Deals Under £20
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
