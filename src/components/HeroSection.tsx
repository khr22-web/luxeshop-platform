"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, TrendingUp, Shield, Truck } from "lucide-react";

const trending = ["Wireless Earbuds","Smart Watch","Gaming Chair","LED Strip","Laptop Stand"];
const stats = [
  { icon: TrendingUp, value: "10M+",  label: "Products" },
  { icon: Sparkles,   value: "50K+",  label: "Daily Deals" },
  { icon: Shield,     value: "200K+", label: "Sellers" },
  { icon: Truck,      value: "190+",  label: "Countries" },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const router = useRouter();

  const handleSearch = (q: string) => {
    const term = q || query;
    if (term.trim()) router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    else router.push("/search");
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden" style={{background:"radial-gradient(ellipse 90% 60% at 50% 0%,rgba(124,111,255,0.18) 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 85% 90%,rgba(56,189,248,0.1) 0%,transparent 55%),#07080f"}}>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c6fff]/10 border border-[#7c6fff]/25 mb-5">
          <Sparkles className="w-3 h-3 text-[#a78bfa]" />
          <span className="text-[11px] font-semibold text-[#a78bfa] tracking-widest uppercase">Premium Shopping Aggregator</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Discover the World&apos;s<br />
          <span style={{background:"linear-gradient(135deg,#a78bfa,#7c6fff,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Best Products</span><br />
          in One Place
        </h1>

        <p className="text-[#8888aa] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Aggregating millions of products from{" "}
          <span className="text-[#ff6b35] font-semibold">AliExpress</span> and{" "}
          <span className="text-[#f90] font-semibold">Amazon</span>{" "}
          — curated, compared, and delivered to you.
        </p>

        {/* ── Search Bar (mobile-first) ── */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(""); }} className="w-full max-w-2xl mx-auto mb-5">
          <div className="flex items-center w-full rounded-2xl bg-[rgba(255,255,255,0.05)] border border-white/10 focus-within:border-[#7c6fff]/60 focus-within:shadow-[0_0_0_3px_rgba(124,111,255,0.12)] transition-all duration-300 overflow-hidden">
            {/* Source selector */}
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="shrink-0 bg-transparent text-[#8888aa] text-xs sm:text-sm px-2 sm:px-3 py-4 outline-none border-r border-white/[0.08] cursor-pointer"
            >
              <option value="all">All</option>
              <option value="aliexpress">AliExpress</option>
              <option value="amazon">Amazon</option>
            </select>
            {/* Input */}
            <div className="flex items-center flex-1 px-3 min-w-0">
              <Search className="w-4 h-4 text-[#8888aa] shrink-0 mr-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder:text-[#44445a] outline-none py-4"
              />
            </div>
            {/* Search button inside bar */}
            <button
              type="submit"
              className="shrink-0 px-4 sm:px-6 py-4 text-white text-sm font-semibold transition-opacity hover:opacity-90 active:scale-95"
              style={{background:"linear-gradient(135deg,#7c6fff,#38bdf8)"}}
            >
              Search
            </button>
          </div>
        </form>

        {/* Trending */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-[#44445a] text-xs">Trending:</span>
          {trending.map((t) => (
            <button
              key={t}
              onClick={() => handleSearch(t)}
              className="px-3 py-1 rounded-full text-xs text-[#8888aa] bg-white/[0.04] border border-white/[0.07] hover:text-white hover:border-[#7c6fff]/40 hover:bg-[#7c6fff]/10 transition-all duration-200"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#7c6fff]/30 transition-all duration-300">
              <Icon className="w-3.5 h-3.5 text-[#7c6fff]" />
              <span className="text-base sm:text-lg font-bold text-white">{value}</span>
              <span className="text-[#44445a] text-[10px] sm:text-xs">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
