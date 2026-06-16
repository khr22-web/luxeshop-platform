"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Heart, Star, ShoppingCart, TrendingUp, RefreshCw, ExternalLink, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

const DEMO = [
  { id:"1", title:"TWS Wireless Earbuds Bluetooth 5.3 Noise Cancelling", img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop", ali:24.99, our:29.99, list:59.99, profit:5.00, rating:4.8, sold:18420, badge:"Best Seller", badgeColor:"bg-violet-500" },
  { id:"2", title:"Smart Watch Pro X5 Health Monitor Blood Oxygen GPS",   img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", ali:45.50, our:54.60, list:99.00, profit:9.10, rating:4.7, sold:9832,  badge:"Hot Deal",   badgeColor:"bg-pink-500" },
  { id:"3", title:"4K Action Camera Waterproof 40m WiFi EIS Stabilization",img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop", ali:38.99, our:46.79, list:89.99, profit:7.80, rating:4.6, sold:5219,  badge:"New Arrival", badgeColor:"bg-sky-500" },
  { id:"4", title:"RGB Mechanical Gaming Keyboard TKL Hot-Swappable",     img:"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop", ali:52.00, our:62.40, list:110.0, profit:10.40,rating:4.9, sold:23651, badge:"Top Rated",  badgeColor:"bg-emerald-500" },
  { id:"5", title:"Portable Bluetooth Speaker IPX7 Waterproof 360° Bass", img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", ali:29.99, our:35.99, list:65.00, profit:6.00, rating:4.5, sold:7830,  badge:"Hot Deal",   badgeColor:"bg-pink-500" },
  { id:"6", title:"LED Smart Strip Lights 16M Colors App Control 5m",     img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", ali:18.50, our:22.20, list:42.00, profit:3.70, rating:4.7, sold:15420, badge:"Best Seller", badgeColor:"bg-violet-500" },
];

function Card({ p }: { p: typeof DEMO[0] }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const disc = Math.round(((p.list - p.our) / p.list) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: p.id, title: p.title, price: p.our, originalPrice: p.ali, image: p.img, source: "aliexpress" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/${p.id}`} className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-[#111220] overflow-hidden hover:border-[#7c6fff]/40 hover:shadow-[0_8px_40px_rgba(124,111,255,0.12)] transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden bg-[#0d0e1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111220]/70 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${p.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider`}>{p.badge}</span>
        {disc > 0 && <span className="absolute top-3 right-10 px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[10px] font-bold">-{disc}%</span>}
        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/40 backdrop-blur-sm">AliExpress</span>
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all border border-white/10">
          <Heart className={`w-4 h-4 ${liked ? "text-red-500 fill-red-500" : "text-white/70"}`} />
        </button>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-white text-sm font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-[#a78bfa] transition-colors">{p.title}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          {[...Array(5)].map((_,i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-white/10"}`} />)}
          <span className="text-amber-400 text-xs font-semibold">{p.rating}</span>
          <span className="text-[#44445a] text-xs">({p.sold.toLocaleString()} sold)</span>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 mb-4">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-xl font-bold text-white">${p.our.toFixed(2)}</span>
            <span className="text-xs text-[#44445a] line-through">${p.list.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#44445a]">AliExpress: <span className="text-[#8888aa]">${p.ali.toFixed(2)}</span></span>
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+${p.profit.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button onClick={handleAdd} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-all shadow-md ${added ? "bg-emerald-500" : "bg-gradient-to-r from-[#7c6fff] to-[#38bdf8]"}`}>
            <ShoppingCart className="w-3.5 h-3.5" />{added ? "Added!" : "Add to Cart"}
          </button>
          <a href="#" className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center hover:border-[#7c6fff]/40 hover:bg-[#7c6fff]/10 transition-all flex-shrink-0">
            <ExternalLink className="w-4 h-4 text-[#8888aa]" />
          </a>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState(DEMO);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/aliexpress/hot-products?pageSize=6");
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.products?.length > 0) {
        setProducts(DEMO.map((d, i) => {
          const a = data.products[i];
          if (!a) return d;
          return { ...d, title: a.title ?? d.title, ali: a.originalAliPrice ?? d.ali, our: a.ourPrice ?? d.our, list: a.listPrice ?? d.list, profit: a.profitPerSale ?? d.profit, rating: a.rating ?? d.rating, sold: a.soldCount ?? d.sold };
        }));
      }
    } catch { /* keep demo */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#07080f]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7c6fff]/10 border border-[#7c6fff]/25 mb-4">
              <Zap className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span className="text-xs font-semibold text-[#a78bfa] tracking-widest uppercase">Featured Deals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Today&apos;s <span className="text-gradient">Top Picks</span></h2>
            <p className="text-[#8888aa] mt-2 text-sm">Live products from AliExpress — prices include <span className="text-[#a78bfa] font-semibold">20% LuxeShop markup</span>.</p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button onClick={fetchProducts} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-[#8888aa] text-xs hover:text-white hover:border-white/20 transition-all disabled:opacity-50">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />Refresh
            </button>
            <Link href="/search" className="px-6 py-2.5 rounded-full border border-[#7c6fff]/30 text-[#a78bfa] text-sm font-semibold hover:bg-[#7c6fff]/10 transition-all whitespace-nowrap">View All →</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((p) => <Card key={p.id} p={p} />)}
        </div>
        <div className="mt-8 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
          <p className="text-[#44445a] text-xs text-center">
            <span className="text-[#a78bfa] font-semibold">Pricing Policy:</span> All prices include a <span className="text-white font-semibold">20% LuxeShop markup</span>. Formula: <span className="text-[#7c6fff] font-mono">Our Price = AliExpress Price × 1.20</span>
          </p>
        </div>
      </div>
    </section>
  );
}
