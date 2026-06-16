"use client";

import { CheckCircle, ArrowRight } from "lucide-react";

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
    features: [
      "350M+ products",
      "Prime 2-day delivery",
      "Verified customer reviews",
      "Easy returns policy",
      "Amazon's Choice badges",
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
            Two Giants,{" "}
            <span className="text-gold-gradient">One Platform</span>
          </h2>
          <p className="text-[#8a8a9a] text-base sm:text-lg max-w-xl mx-auto">
            We aggregate the best products from the world&apos;s two largest e-commerce
            platforms so you never miss a deal.
          </p>
        </div>

        {/* Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {sources.map((source) => (
            <div
              key={source.name}
              className={`relative rounded-3xl border ${source.borderColor} ${source.hoverBorder} ${source.glowColor} bg-[rgba(12,12,20,0.9)] p-8 transition-all duration-300 overflow-hidden group cursor-pointer`}
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
                <button
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    background: `${source.color}15`,
                    border: `1px solid ${source.color}40`,
                    color: source.color,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${source.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${source.color}15`;
                  }}
                >
                  Browse {source.name} Products →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
