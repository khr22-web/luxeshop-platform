import Link from "next/link";
import { Flame, Clock, ArrowRight, Tag } from "lucide-react";

const AFFILIATE_TAG = "luxeshoplondo-21";

const featuredDeals = [
  {
    id: "fd-1",
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Audio",
    originalPrice: 249.99,
    salePrice: 139.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
    badge: "HOT DEAL" as const,
    amazonKeyword: "Apple+AirPods+Pro+2nd+Generation",
    timeLeft: "2h 45m",
  },
  {
    id: "fd-2",
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    originalPrice: 379.99,
    salePrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "FLASH SALE" as const,
    amazonKeyword: "Sony+WH-1000XM5+Wireless+Headphones",
    timeLeft: "1h 30m",
  },
  {
    id: "fd-3",
    name: "Apple Watch Series 9 GPS 45mm",
    category: "Watches",
    originalPrice: 499.99,
    salePrice: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    badge: "FLASH SALE" as const,
    amazonKeyword: "Apple+Watch+Series+9+GPS+Cellular",
    timeLeft: "3h 20m",
  },
  {
    id: "fd-4",
    name: "PlayStation 5 Console — Disc Edition",
    category: "Gaming",
    originalPrice: 549.99,
    salePrice: 399.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
    badge: "HOT DEAL" as const,
    amazonKeyword: "PlayStation+5+Console+Disc+Edition",
    timeLeft: "1h 55m",
  },
];

function badgeStyle(badge: "HOT DEAL" | "FLASH SALE" | "LIMITED" | "BEST VALUE") {
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

export default function SuperDealsSection() {
  return (
    <section className="py-16 bg-[#07080F] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,100,0,0.07),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
              <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Limited Time</span>
            </div>
            <h2 className="text-3xl font-black text-white">
              🔥 Super Deals
            </h2>
            <p className="text-[#8888aa] text-sm mt-1">Massive savings — up to <span className="text-orange-400 font-bold">70% OFF</span> today only</p>
          </div>
          <Link
            href="/deals"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold text-sm hover:bg-orange-500/20 hover:border-orange-500/50 transition-all"
          >
            View All Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDeals.map((deal) => {
            const discount = calcDiscount(deal.originalPrice, deal.salePrice);
            const savings = (deal.originalPrice - deal.salePrice).toFixed(2);
            const amazonUrl = `https://www.amazon.co.uk/s?k=${deal.amazonKeyword}&tag=${AFFILIATE_TAG}`;

            return (
              <a
                key={deal.id}
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl bg-[#0e0f1a] border border-white/[0.06] hover:border-orange-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,100,0,0.12)] overflow-hidden"
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-black uppercase ${badgeStyle(deal.badge)}`}>
                    {deal.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-[#c9a84c] text-black">
                    -{discount}%
                  </span>
                </div>

                {/* Timer */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70 border border-white/10">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span className="text-orange-400 text-[11px] font-bold">{deal.timeLeft}</span>
                </div>

                {/* Image */}
                <div className="h-44 overflow-hidden bg-[#13141f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#8888aa]" />
                    <span className="text-[#8888aa] text-xs">{deal.category}</span>
                  </div>
                  <h3 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-orange-300 transition-colors leading-snug">
                    {deal.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-auto pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-orange-400">£{deal.salePrice.toFixed(2)}</span>
                      <span className="text-sm text-[#666688] line-through">£{deal.originalPrice.toFixed(2)}</span>
                    </div>
                    <span className="text-green-400 text-xs font-semibold">Save £{savings}</span>
                  </div>

                  <button className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" /> Grab This Deal
                  </button>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-white font-semibold text-sm">More deals available — updated daily!</span>
          </div>
          <Link href="/deals" className="text-orange-400 text-sm font-bold hover:text-orange-300 flex items-center gap-1">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
