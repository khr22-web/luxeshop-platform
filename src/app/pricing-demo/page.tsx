/**
 * /pricing-demo
 *
 * Interactive page that demonstrates the 20% markup pricing engine.
 * Shows the formula, lets you enter any AliExpress price, and calculates
 * the LuxeShop price and profit in real time.
 */
"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Percent, Calculator, ArrowRight, CheckCircle } from "lucide-react";

const MARKUP = 20;

const exampleProducts = [
  { name: "TWS Wireless Earbuds", aliPrice: 24.99 },
  { name: "Smart Watch Pro X5", aliPrice: 45.50 },
  { name: "4K Action Camera", aliPrice: 38.99 },
  { name: "RGB Mechanical Keyboard", aliPrice: 52.00 },
  { name: "Bluetooth Speaker", aliPrice: 29.99 },
  { name: "LED Strip Lights 5m", aliPrice: 18.50 },
];

export default function PricingDemoPage() {
  const [customPrice, setCustomPrice] = useState("25.00");
  const aliPrice = parseFloat(customPrice) || 0;
  const ourPrice = parseFloat((aliPrice * (1 + MARKUP / 100)).toFixed(2));
  const profit = parseFloat((ourPrice - aliPrice).toFixed(2));
  const profitPercent = aliPrice > 0 ? ((profit / aliPrice) * 100).toFixed(1) : "0";

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] mb-6">
            <Calculator className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span className="text-xs font-semibold text-[#c9a84c] tracking-widest uppercase">
              Pricing Engine — Stage 2 Demo
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">AliExpress </span>
            <span className="text-gold-gradient">Markup Formula</span>
          </h1>
          <p className="text-[#8a8a9a] text-lg max-w-2xl mx-auto">
            Every product fetched from AliExpress automatically has a{" "}
            <strong className="text-[#c9a84c]">20% markup</strong> applied before
            being displayed on LuxeShop. Here&apos;s exactly how it works.
          </p>
        </div>

        {/* Formula Card */}
        <div className="rounded-3xl border border-[rgba(201,168,76,0.2)] bg-[rgba(12,12,20,0.9)] p-8 mb-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Percent className="w-5 h-5 text-[#c9a84c]" />
            The Pricing Formula
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "AliExpress Price", formula: "P", color: "#ff6b35", desc: "Raw price from AliExpress API" },
              { label: "Markup Factor", formula: "× 1.20", color: "#c9a84c", desc: "20% service markup" },
              { label: "LuxeShop Price", formula: "= P × 1.20", color: "#4ade80", desc: "Price shown to customers" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 text-center">
                <p className="text-[#8a8a9a] text-xs uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-3xl font-bold font-mono mb-2" style={{ color: item.color }}>
                  {item.formula}
                </p>
                <p className="text-[#4a4a5a] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Code block */}
          <div className="rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(201,168,76,0.1)] p-5 font-mono text-sm overflow-x-auto">
            <div className="text-[#4a4a5a] mb-2">// aliexpress.ts — applyMarkup()</div>
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">MARKUP_PERCENT</span>{" "}
              <span className="text-white">= </span>
              <span className="text-[#c9a84c]">20</span>
              <span className="text-white">;</span>
            </div>
            <div className="mt-2">
              <span className="text-purple-400">function</span>{" "}
              <span className="text-yellow-300">applyMarkup</span>
              <span className="text-white">(aliPrice: </span>
              <span className="text-blue-300">number</span>
              <span className="text-white">) {"{"}</span>
            </div>
            <div className="ml-4">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">ourPrice</span>
              <span className="text-white"> = </span>
              <span className="text-yellow-300">parseFloat</span>
              <span className="text-white">{"("}</span>
              <span className="text-white">{"(aliPrice * (1 + "}</span>
              <span className="text-[#c9a84c]">MARKUP_PERCENT</span>
              <span className="text-white">{" / 100)).toFixed(2));"}</span>
            </div>
            <div className="ml-4">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">profitPerSale</span>
              <span className="text-white">{" = parseFloat((ourPrice - aliPrice).toFixed(2));"}</span>
            </div>
            <div className="ml-4">
              <span className="text-purple-400">return</span>
              <span className="text-white">{" { ourPrice, profitPerSale };"}</span>
            </div>
            <div className="text-white">{"}"}</div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="rounded-3xl border border-[rgba(201,168,76,0.2)] bg-[rgba(12,12,20,0.9)] p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#c9a84c]" />
              Live Calculator
            </h2>
            <div className="mb-6">
              <label className="text-[#8a8a9a] text-sm mb-2 block">AliExpress Price (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ff6b35]" />
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full pl-10 pr-4 py-4 rounded-xl bg-[rgba(22,22,34,0.9)] border border-[rgba(255,107,53,0.3)] text-white text-xl font-bold outline-none focus:border-[rgba(255,107,53,0.6)] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 p-4 rounded-xl bg-[rgba(255,107,53,0.08)] border border-[rgba(255,107,53,0.2)] text-center">
                <p className="text-[#4a4a5a] text-xs mb-1">AliExpress Price</p>
                <p className="text-2xl font-bold text-[#ff6b35]">${aliPrice.toFixed(2)}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#4a4a5a] flex-shrink-0" />
              <div className="flex-1 p-4 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.3)] text-center">
                <p className="text-[#4a4a5a] text-xs mb-1">LuxeShop Price</p>
                <p className="text-2xl font-bold text-[#c9a84c]">${ourPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[rgba(74,222,128,0.06)] border border-[rgba(74,222,128,0.2)] text-center">
                <p className="text-[#4a4a5a] text-xs mb-1">Profit Per Sale</p>
                <p className="text-xl font-bold text-green-400">+${profit.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-[rgba(74,222,128,0.06)] border border-[rgba(74,222,128,0.2)] text-center">
                <p className="text-[#4a4a5a] text-xs mb-1">Profit Margin</p>
                <p className="text-xl font-bold text-green-400">{profitPercent}%</p>
              </div>
            </div>
          </div>

          {/* Example Products Table */}
          <div className="rounded-3xl border border-[rgba(201,168,76,0.2)] bg-[rgba(12,12,20,0.9)] p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#c9a84c]" />
              Live Product Examples
            </h2>
            <div className="space-y-3">
              {exampleProducts.map((p) => {
                const lp = parseFloat((p.aliPrice * 1.2).toFixed(2));
                const pr = parseFloat((lp - p.aliPrice).toFixed(2));
                return (
                  <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,168,76,0.2)] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{p.name}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-xs">
                      <span className="text-[#ff6b35] font-mono">${p.aliPrice.toFixed(2)}</span>
                      <ArrowRight className="w-3 h-3 text-[#4a4a5a]" />
                      <span className="text-[#c9a84c] font-bold font-mono">${lp.toFixed(2)}</span>
                      <span className="text-green-400 font-mono">+${pr.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Integration Steps */}
        <div className="rounded-3xl border border-[rgba(201,168,76,0.2)] bg-[rgba(12,12,20,0.9)] p-8">
          <h2 className="text-xl font-bold text-white mb-6">Integration Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", title: "API Request", desc: "Frontend calls /api/aliexpress/search or /hot-products", color: "#ff6b35" },
              { step: "2", title: "Fetch from AliExpress", desc: "Next.js server calls RapidAPI (AliExpress True API) with your key", color: "#c9a84c" },
              { step: "3", title: "Apply Markup", desc: "applyMarkup() multiplies every price by 1.20 (20% markup)", color: "#4ade80" },
              { step: "4", title: "Return to UI", desc: "Normalised LuxeProduct objects with ourPrice and profitPerSale", color: "#60a5fa" },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black mb-3" style={{ background: s.color }}>
                  {s.step}
                </div>
                <p className="text-white text-sm font-semibold mb-1">{s.title}</p>
                <p className="text-[#6a6a7a] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-300 font-semibold text-sm mb-1">Ready for Production</p>
                <p className="text-[#6a6a7a] text-xs leading-relaxed">
                  Add your <span className="text-[#c9a84c] font-mono">RAPIDAPI_KEY</span> to{" "}
                  <span className="text-[#c9a84c] font-mono">.env.local</span> to switch from
                  demo mode to live AliExpress data. The markup formula, caching, and error
                  handling are all production-ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
