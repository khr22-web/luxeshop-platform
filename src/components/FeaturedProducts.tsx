"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw, TrendingUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  orders: number;
  source: "aliexpress" | "amazon";
  badge?: string;
  amazonUrl?: string;
  aliexpressUrl?: string | null;
}

const FEATURED: Product[] = [
  { id: "fp1", title: "Echo Dot (5th Gen) — Smart Speaker with Alexa", price: 34.99, originalPrice: 54.99, image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80", rating: 4.7, orders: 45000, source: "amazon", badge: "AMAZON CHOICE", amazonUrl: "https://www.amazon.co.uk/s?k=echo+dot+5th+gen&tag=luxeshoplondo-21" },
  { id: "fp2", title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 5.7L", price: 69.99, originalPrice: 109.99, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", rating: 4.8, orders: 32000, source: "amazon", badge: "BEST SELLER", amazonUrl: "https://www.amazon.co.uk/s?k=instant+pot+duo+7in1&tag=luxeshoplondo-21" },
  { id: "fp3", title: "Anker 65W USB-C Fast Charger — 3 Port GaN", price: 29.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80", rating: 4.6, orders: 28000, source: "amazon", badge: "TOP RATED", amazonUrl: "https://www.amazon.co.uk/s?k=anker+65w+usb+c+charger&tag=luxeshoplondo-21" },
  { id: "fp4", title: "Kindle Paperwhite (16 GB) — Waterproof E-Reader", price: 124.99, originalPrice: 159.99, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", rating: 4.9, orders: 67000, source: "amazon", badge: "EDITORS PICK", amazonUrl: "https://www.amazon.co.uk/s?k=kindle+paperwhite+16gb&tag=luxeshoplondo-21" },
  { id: "fp5", title: "Magnetic Phone Holder Car Dashboard Mount", price: 9.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", rating: 4.8, orders: 2341, source: "aliexpress", aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=magnetic+phone+holder+car+dashboard" },
  { id: "fp6", title: "LED Strip Lights USB 5m RGB Colour Changing", price: 12.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&q=80", rating: 4.7, orders: 5892, source: "aliexpress", badge: "VIRAL", aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=led+strip+lights+usb+5m+rgb" },
  { id: "fp7", title: "Acne Pimple Patches 72 Invisible Dots", price: 6.99, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80", rating: 4.9, orders: 12400, source: "aliexpress", badge: "VIRAL", aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=acne+pimple+patches+invisible" },
  { id: "fp8", title: "Resistance Bands Set 5 Levels Home Gym", price: 13.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", rating: 4.8, orders: 6780, source: "aliexpress", badge: "BEST SELLER", aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=resistance+bands+set+home+gym" },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(FEATURED);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products/trending?limit=8");
      if (res.ok) {
        const data = await res.json();
        if (data.products?.length) setProducts(data.products);
      }
    } catch {
      // keep defaults
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <section className="bg-gray-50 py-14 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#1a1a2e]" />
              <span className="text-xs font-bold text-[#1a1a2e] uppercase tracking-widest">Featured Deals</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f0f0f] tracking-tight">Today&apos;s Top Picks</h2>
            <p className="text-gray-500 text-sm mt-1">Trending products from AliExpress & Amazon — curated for the best value</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchProducts} disabled={loading} className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition-all">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link href="/search" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1a1a2e] hover:underline">View All →</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href="/search" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-[#1a1a2e] text-[#1a1a2e] text-sm font-bold">View All Products →</Link>
        </div>
      </div>
    </section>
  );
}
