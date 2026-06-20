"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Truck, ShieldCheck, Star, Zap } from "lucide-react";
import Link from "next/link";

const trending = ["Wireless Earbuds", "Smart Watch", "Gaming Chair", "LED Strip", "Laptop Stand", "Air Fryer"];

const platforms = [
  { id: "all", label: "All Platforms", emoji: "🛍️" },
  { id: "amazon", label: "Amazon", emoji: "📦" },
  { id: "aliexpress", label: "AliExpress", emoji: "🛒" },
  { id: "temu", label: "Temu", emoji: "🏷️" },
];

const badges = [
  { icon: Truck, text: "Free UK Delivery over £30" },
  { icon: ShieldCheck, text: "Buyer Protection Guaranteed" },
  { icon: Star, text: "4.8★ Trusted by 50K+ Shoppers" },
  { icon: Zap, text: "Daily Deals Updated" },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const router = useRouter();
  const AFFILIATE_TAG = "luxeshoplondo-21";

  const handleSearch = (q?: string, overrideSource?: string) => {
    const term = q ?? query;
    const src = overrideSource ?? source;
    if (!term.trim()) {
      router.push("/search");
      return;
    }
    const encoded = encodeURIComponent(term.trim());
    if (src === "aliexpress") {
      window.open(`https://www.aliexpress.com/wholesale?SearchText=${encoded}`, "_blank");
    } else if (src === "temu") {
      window.open(`https://www.temu.com/search_result.html?search_key=${encoded}`, "_blank");
    } else {
      window.open(`https://www.amazon.co.uk/s?k=${encoded}&tag=${AFFILIATE_TAG}`, "_blank");
    }
  };

  return (
    <section className="bg-white border-b border-gray-100">
      {/* Main hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a2e]/5 border border-[#1a1a2e]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[11px] font-bold text-[#1a1a2e] tracking-widest uppercase">Premium Shopping Aggregator — UK</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f0f0f] leading-[1.1] mb-5 tracking-tight">
            Shop the World&apos;s<br />
            <span className="text-[#c9a84c]">Best Deals</span>{" "}
            in One Place
          </h1>

          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Millions of products from{" "}
            <span className="font-semibold text-[#f90]">Amazon</span>,{" "}
            <span className="font-semibold text-[#e8441a]">AliExpress</span> &{" "}
            <span className="font-semibold text-[#ff6900]">Temu</span>{" "}
            — curated, compared, and delivered to you.
          </p>

          {/* Platform selector */}
          <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setSource(p.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  source === p.id
                    ? "bg-[#1a1a2e] text-white border-[#1a1a2e] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                <span>{p.emoji}</span> {p.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex gap-2 max-w-2xl mx-auto mb-5">
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 focus-within:border-[#1a1a2e] focus-within:bg-white transition-all shadow-sm">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search products, brands, categories..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              className="px-6 py-3.5 rounded-2xl bg-[#1a1a2e] text-white text-sm font-bold hover:bg-[#0f3460] transition-colors shadow-sm whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Trending */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-gray-500">
            <span className="font-medium">Trending:</span>
            {trending.map((t) => (
              <button
                key={t}
                onClick={() => handleSearch(t)}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {badges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 justify-center">
                <div className="w-8 h-8 rounded-lg bg-[#1a1a2e]/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#1a1a2e]" />
                </div>
                <span className="text-xs text-gray-600 font-medium leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform quick links */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Shop by platform:</span>
            <Link
              href="/search?platform=amazon"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(255,153,0,0.3)] bg-[rgba(255,153,0,0.04)] text-sm font-semibold text-[#f90] hover:bg-[rgba(255,153,0,0.1)] transition-all"
            >
              📦 Amazon UK
            </Link>
            <Link
              href="/search?platform=aliexpress"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(232,68,26,0.3)] bg-[rgba(232,68,26,0.04)] text-sm font-semibold text-[#e8441a] hover:bg-[rgba(232,68,26,0.1)] transition-all"
            >
              🛒 AliExpress
            </Link>
            <Link
              href="/search?platform=temu"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(255,105,0,0.3)] bg-[rgba(255,105,0,0.04)] text-sm font-semibold text-[#ff6900] hover:bg-[rgba(255,105,0,0.1)] transition-all"
            >
              🏷️ Temu <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#ff6900] text-white ml-1">NEW</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
