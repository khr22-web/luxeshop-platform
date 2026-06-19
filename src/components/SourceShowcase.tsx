"use client";

import { CheckCircle, ArrowRight } from "lucide-react";

const TEMU_AFFILIATE = "https://temu.to/m/luxeshoplondon";

const sources = [
  {
    name: "AliExpress",
    tagline: "Global Factory Prices",
    description:
      "Access over 100 million products directly from manufacturers. Get factory-direct pricing with worldwide shipping.",
    color: "#ff6b35",
    bgGradient: "from-[rgba(255,107,53,0.15)] to-transparent",
    borderColor: "border-[rgba(255,107,53,0.3)]",
    hoverBorder: "hover:border-[rgba(255,107,53,0.6)]",
    glowColor: "hover:shadow-[0_0_40px_rgba(255,107,53,0.15)]",
    emoji: "🛒",
    link: "https://www.aliexpress.com",
    features: [
      "100M+ products",
      "Factory-direct pricing",
      "Free worldwide shipping",
      "Buyer protection guarantee",
      "Bulk order discounts",
    ],
  },
  {
    name: "Amazon",
    tagline: "Prime Quality & Speed",
    description:
      "Shop from Amazon's vast catalog with Prime shipping, trusted reviews, and unmatched customer service.",
    color: "#f90",
    bgGradient: "from-[rgba(255,153,0,0.15)] to-transparent",
    borderColor: "border-[rgba(255,153,0,0.3)]",
    hoverBorder: "hover:border-[rgba(255,153,0,0.6)]",
    glowColor: "hover:shadow-[0_0_40px_rgba(255,153,0,0.15)]",
    emoji: "📦",
    link: "https://www.amazon.co.uk/?tag=luxeshoplondo-21",
    features: [
      "350M+ products",
      "Prime 2-day delivery",
      "Verified customer reviews",
      "Easy returns policy",
      "Amazon's Choice badges",
    ],
  },
  {
    name: "Temu",
    tagline: "Ultra-Low Prices, Trending Fast",
    description:
      "Shop millions of trending products at unbeatable prices. Temu brings factory-direct deals with fast UK delivery and full buyer protection.",
    color: "#ff6900",
    bgGradient: "from-[rgba(255,105,0,0.15)] to-transparent",
    borderColor: "border-[rgba(255,105,0,0.3)]",
    hoverBorder: "hover:border-[rgba(255,105,0,0.6)]",
    glowColor: "hover:shadow-[0_0_40px_rgba(255,105,0,0.15)]",
    emoji: "🛍️",
    link: TEMU_AFFILIATE,
    features: [
      "100M+ trending products",
      "Up to 90% off retail prices",
      "Free UK delivery available",
      "Buyer protection guarantee",
      "New deals added daily",
    ],
  },
];

export default function SourceShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[rgba(201,168,76,0.04)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[rgba(201,168,76,0.02)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)] mb-4">
            <span className="text-xs font-semibold text-[#c9a84c] tracking-widest uppercase">
              Powered By
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Three Giants,{" "}
            <span className="text-gold-gradient">One Platform</span>
          </h2>
          <p className="text-[#8a8a9a] text-base sm:text-lg max-w-2xl mx-auto">
            We aggregate the best products from the world&apos;s three largest e-commerce
            platforms — AliExpress, Amazon &amp; Temu — so you never miss a deal.
          </p>
        </div>

        {/* Platform Logos Strip */}
        <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(255,107,53,0.08)] border border-[rgba(255,107,53,0.2)]">
            <span className="text-lg">🛒</span>
            <span className="text-sm font-bold" style={{ color: "#ff6b35" }}>AliExpress</span>
          </div>
          <span className="text-[#333348] text-xl font-light">+</span>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(255,153,0,0.08)] border border-[rgba(255,153,0,0.2)]">
            <span className="text-lg">📦</span>
            <span className="text-sm font-bold" style={{ color: "#f90" }}>Amazon</span>
          </div>
          <span className="text-[#333348] text-xl font-light">+</span>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(255,105,0,0.08)] border border-[rgba(255,105,0,0.2)]">
            <span className="text-lg">🛍️</span>
            <span className="text-sm font-bold" style={{ color: "#ff6900" }}>Temu</span>
            <span className="text-[10px] font-black text-white bg-[#ff6900] px-1.5 py-0.5 rounded-full ml-1">NEW</span>
          </div>
        </div>

        {/* Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {sources.map((source) => (
            <a
              key={source.name}
              href={source.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative rounded-3xl border ${source.borderColor} ${source.hoverBorder} ${source.glowColor} bg-[rgba(12,12,20,0.9)] p-8 transition-all duration-300 overflow-hidden group cursor-pointer block no-underline`}
            >
              {/* Background gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${source.bgGradient} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-4xl mb-3">{source.emoji}</div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold mb-1"
                      style={{ color: source.color }}
                    >
                      {source.name}
                      {source.name === "Temu" && (
                        <span className="ml-2 text-xs font-black text-white bg-[#ff6900] px-2 py-0.5 rounded-full align-middle">NEW</span>
                      )}
                    </h3>
                    <p className="text-[#8a8a9a] text-sm font-medium">{source.tagline}</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300"
                    style={{ background: `${source.color}15`, border: `1px solid ${source.color}30` }}
                  >
                    <ArrowRight className="w-5 h-5" style={{ color: source.color }} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#8a8a9a] text-sm leading-relaxed mb-6">
                  {source.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {source.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: source.color }}
                      />
                      <span className="text-[#c0bdb8] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div
                  className="w-full py-3 rounded-xl font-semibold text-sm text-center transition-all duration-200"
                  style={{
                    background: `${source.color}15`,
                    border: `1px solid ${source.color}40`,
                    color: source.color,
                  }}
                >
                  Browse {source.name} Products →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
