"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Heart, Star, ShoppingCart, TrendingUp, RefreshCw, ExternalLink, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/products";

// ─── Types ───────────────────────────────────────────────────────────────────
interface TrendingProduct {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  orders: number;
  badge: string;
  source: "aliexpress" | "amazon";
  category: string;
  amazonUrl: string;
  aliexpressUrl: string | null;
  tags: string[];
}

// ─── Fallback: use static products library ────────────────────────────────────
const FALLBACK: TrendingProduct[] = PRODUCTS.slice(0, 6).map((p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.image,
  rating: p.rating,
  orders: p.orders,
  badge: p.badge,
  source: p.source,
  category: p.category,
  amazonUrl: p.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(p.title)}&tag=luxeshop-20`,
  aliexpressUrl: p.aliexpressUrl || null,
  tags: p.tags,
}));

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ p }: { p: TrendingProduct }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const profit = (p.price - p.originalPrice).toFixed(2);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: p.id,
      title: p.title,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      source: p.source,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const sourceUrl = p.source === "amazon" ? p.amazonUrl : (p.aliexpressUrl || p.amazonUrl);
  const sourceLabel = p.source === "amazon" ? "Amazon" : "AliExpress";
  const sourceBadgeStyle = p.source === "amazon"
    ? { background: "rgba(255,153,0,0.15)", color: "#ff9900", border: "1px solid rgba(255,153,0,0.3)" }
    : { background: "rgba(255,107,53,0.15)", color: "#ff6b35", border: "1px solid rgba(255,107,53,0.3)" };

  const badgeColors: Record<string, string> = {
    "Best Seller": "bg-violet-500",
    "Hot Deal": "bg-pink-500",
    "New": "bg-sky-500",
    "New Arrival": "bg-sky-500",
    "Top Pick": "bg-emerald-500",
    "Top Rated": "bg-emerald-500",
    "Trending": "bg-orange-500",
    "Premium": "bg-amber-600",
    "Editor's Choice": "bg-indigo-500",
    "Amazon Choice": "bg-yellow-600",
    "Amazon Pick": "bg-yellow-600",
  };
  const badgeColor = badgeColors[p.badge] || "bg-violet-500";

  return (
    <Link
      href={`/product/${p.id}`}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-[#111220] overflow-hidden hover:border-[#7c6fff]/40 hover:shadow-[0_8px_40px_rgba(124,111,255,0.12)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden bg-[#0d0e1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111220]/70 via-transparent to-transparent" />
        {p.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${badgeColor} text-white text-[10px] font-bold uppercase tracking-wider`}>
            {p.badge}
          </span>
        )}
        <span
          className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm"
          style={sourceBadgeStyle}
        >
          {sourceLabel}
        </span>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all border border-white/10"
        >
          <Heart className={`w-4 h-4 ${liked ? "text-red-500 fill-red-500" : "text-white/70"}`} />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-white text-sm font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-[#a78bfa] transition-colors">
          {p.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-white/10"}`} />
          ))}
          <span className="text-amber-400 text-xs font-semibold">{p.rating}</span>
          <span className="text-[#44445a] text-xs">({p.orders.toLocaleString()} sold)</span>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 mb-4">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-xl font-bold text-white">${p.price.toFixed(2)}</span>
            <span className="text-xs text-[#44445a] line-through">${p.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#44445a]">
              {sourceLabel}: <span className="text-[#8888aa]">${p.originalPrice.toFixed(2)}</span>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />+${profit}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-all shadow-md ${added ? "bg-emerald-500" : "bg-gradient-to-r from-[#7c6fff] to-[#38bdf8]"}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? "Added!" : "Add to Cart"}
          </button>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={`View on ${sourceLabel}`}
            className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center hover:border-[#7c6fff]/40 hover:bg-[#7c6fff]/10 transition-all flex-shrink-0"
          >
            <ExternalLink className="w-4 h-4 text-[#8888aa]" />
          </a>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeaturedProducts() {
  const [products, setProducts] = useState<TrendingProduct[]>(FALLBACK);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products/trending?limit=6&sort=trending");
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.products?.length > 0) {
        setProducts(data.products);
      }
    } catch {
      // Keep fallback static products
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#07080f]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7c6fff]/10 border border-[#7c6fff]/25 mb-4">
              <Zap className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span className="text-xs font-semibold text-[#a78bfa] tracking-widest uppercase">Featured Deals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Today&apos;s <span className="text-gradient">Top Picks</span>
            </h2>
            <p className="text-[#8888aa] mt-2 text-sm">
              Trending products from AliExpress &amp; Amazon — prices include{" "}
              <span className="text-[#a78bfa] font-semibold">20% LuxeShop markup</span>.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-[#8888aa] text-xs hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              href="/search"
              className="px-6 py-2.5 rounded-full border border-[#7c6fff]/30 text-[#a78bfa] text-sm font-semibold hover:bg-[#7c6fff]/10 transition-all whitespace-nowrap"
            >
              View All →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
          <p className="text-[#44445a] text-xs text-center">
            <span className="text-[#a78bfa] font-semibold">Pricing Policy:</span> All prices include a{" "}
            <span className="text-white font-semibold">20% LuxeShop markup</span>. Formula:{" "}
            <span className="text-[#7c6fff] font-mono">Our Price = Source Price × 1.20</span>
          </p>
        </div>
      </div>
    </section>
  );
}
