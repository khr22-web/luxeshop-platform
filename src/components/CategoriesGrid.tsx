"use client";
import Link from "next/link";
import { Smartphone, Laptop, Shirt, Home, Dumbbell, Gamepad2, Baby, Car, Watch, Headphones, Camera, Gem, ChevronRight } from "lucide-react";

const cats = [
  { icon: Smartphone, label: "Electronics",   count: "2.4M+", from: "#6366f1", to: "#8b5cf6", slug: "electronics" },
  { icon: Laptop,     label: "Computers",     count: "890K+", from: "#0ea5e9", to: "#6366f1", slug: "computers" },
  { icon: Shirt,      label: "Fashion",       count: "5.1M+", from: "#ec4899", to: "#f43f5e", slug: "fashion" },
  { icon: Home,       label: "Home & Garden", count: "3.2M+", from: "#10b981", to: "#059669", slug: "home-garden" },
  { icon: Dumbbell,   label: "Sports",        count: "1.8M+", from: "#f97316", to: "#ef4444", slug: "sports" },
  { icon: Gamepad2,   label: "Gaming",        count: "760K+", from: "#8b5cf6", to: "#6366f1", slug: "gaming" },
  { icon: Baby,       label: "Baby & Kids",   count: "1.1M+", from: "#f59e0b", to: "#f97316", slug: "baby-kids" },
  { icon: Car,        label: "Automotive",    count: "940K+", from: "#14b8a6", to: "#0ea5e9", slug: "automotive" },
  { icon: Watch,      label: "Watches",       count: "420K+", from: "#a78bfa", to: "#ec4899", slug: "watches" },
  { icon: Headphones, label: "Audio",         count: "380K+", from: "#38bdf8", to: "#818cf8", slug: "audio" },
  { icon: Camera,     label: "Photography",   count: "290K+", from: "#fb923c", to: "#f59e0b", slug: "photography" },
  { icon: Gem,        label: "Jewelry",       count: "670K+", from: "#e879f9", to: "#a78bfa", slug: "jewelry" },
];

export default function CategoriesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#07080f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="text-xs font-semibold text-[#8888aa] tracking-widest uppercase">Browse by Category</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Shop Every <span className="bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto text-sm sm:text-base">
            From cutting-edge electronics to timeless fashion — explore our curated collection across all major categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {cats.map(({ icon: Icon, label, count, from, to, slug }) => (
            <Link
              key={label}
              href={`/category/${slug}`}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#111220] border border-white/[0.06] hover:border-white/[0.15] hover:bg-[#1a1b30] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden text-left"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${from}18 0%, transparent 70%)` }} />

              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>
              <div className="text-center">
                <p className="text-white text-sm font-semibold leading-tight">{label}</p>
                <p className="text-[#44445a] text-xs mt-0.5">{count} items</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/search" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#8888aa] text-sm hover:text-white hover:border-[#7c6fff]/40 hover:bg-[#7c6fff]/10 transition-all duration-200">
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
