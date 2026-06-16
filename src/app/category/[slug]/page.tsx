"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

const CATEGORY_DATA: Record<string, { name: string; description: string; emoji: string; color: string }> = {
  "electronics": { name: "Electronics", description: "Cutting-edge gadgets and devices", emoji: "📱", color: "#7c6fff" },
  "computers": { name: "Computers", description: "Laptops, desktops, and accessories", emoji: "💻", color: "#38bdf8" },
  "fashion": { name: "Fashion", description: "Clothing, shoes, and accessories", emoji: "👗", color: "#f472b6" },
  "home-garden": { name: "Home & Garden", description: "Everything for your home", emoji: "🏠", color: "#34d399" },
  "sports": { name: "Sports", description: "Sports equipment and fitness gear", emoji: "💪", color: "#fb923c" },
  "gaming": { name: "Gaming", description: "Games, consoles, and accessories", emoji: "🎮", color: "#a78bfa" },
  "baby-kids": { name: "Baby & Kids", description: "Safe and fun products for children", emoji: "🧸", color: "#fbbf24" },
  "automotive": { name: "Automotive", description: "Car accessories and tools", emoji: "🚗", color: "#22d3ee" },
  "watches": { name: "Watches", description: "Luxury and smart watches", emoji: "⌚", color: "#f59e0b" },
  "audio": { name: "Audio", description: "Headphones, speakers, and more", emoji: "🎧", color: "#818cf8" },
  "photography": { name: "Photography", description: "Cameras, lenses, and accessories", emoji: "📷", color: "#f97316" },
  "jewelry": { name: "Jewelry", description: "Rings, necklaces, and bracelets", emoji: "💎", color: "#c084fc" },
};

const ALL_PRODUCTS = [
  { id: "1", title: "TWS Wireless Earbuds Pro", price: 29.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", rating: 4.7, orders: 12400, source: "aliexpress" as const, badge: "Best Seller", category: "electronics" },
  { id: "2", title: "Smart Watch Series X5", price: 54.60, originalPrice: 45.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", rating: 4.5, orders: 8900, source: "aliexpress" as const, badge: "Hot Deal", category: "watches" },
  { id: "3", title: "4K Action Camera Ultra", price: 46.79, originalPrice: 38.99, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", rating: 4.6, orders: 5600, source: "aliexpress" as const, badge: "New", category: "photography" },
  { id: "4", title: "Mechanical RGB Gaming Keyboard", price: 62.40, originalPrice: 52.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.8, orders: 9200, source: "aliexpress" as const, badge: "Top Pick", category: "gaming" },
  { id: "5", title: "Portable Bluetooth Speaker", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", rating: 4.4, orders: 7100, source: "aliexpress" as const, badge: "", category: "audio" },
  { id: "6", title: "Smart LED Strip Lights", price: 22.20, originalPrice: 18.50, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.3, orders: 15800, source: "aliexpress" as const, badge: "Trending", category: "home-garden" },
  { id: "7", title: "Wireless Charging Pad 15W", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", rating: 4.5, orders: 11200, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "8", title: "USB-C Hub 7-in-1", price: 31.79, originalPrice: 26.49, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", rating: 4.6, orders: 6800, source: "aliexpress" as const, badge: "Editor's Choice", category: "computers" },
  { id: "9", title: "Laptop Stand Adjustable", price: 26.39, originalPrice: 21.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", rating: 4.7, orders: 4500, source: "aliexpress" as const, badge: "", category: "computers" },
  { id: "10", title: "Gaming Mouse 16000 DPI RGB", price: 28.79, originalPrice: 23.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", rating: 4.5, orders: 8300, source: "aliexpress" as const, badge: "", category: "gaming" },
  { id: "11", title: "Noise Cancelling Headphones", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", rating: 4.8, orders: 13400, source: "aliexpress" as const, badge: "Premium", category: "audio" },
  { id: "12", title: "Mini Projector 1080P", price: 95.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", rating: 4.4, orders: 3200, source: "aliexpress" as const, badge: "", category: "electronics" },
];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORY_DATA[slug] || { name: slug, description: "Browse products", emoji: "🛍️", color: "#7c6fff" };
  const products = ALL_PRODUCTS.filter((p) => p.category === slug);
  const fallback = ALL_PRODUCTS.slice(0, 8);
  const display = products.length > 0 ? products : fallback;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Category hero */}
        <div className="relative overflow-hidden py-12 mb-8" style={{ background: `linear-gradient(135deg, ${cat.color}22 0%, transparent 60%)` }}>
          <div className="max-w-6xl mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span style={{ color: "var(--text-secondary)" }}>{cat.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${cat.color}33` }}>
                {cat.emoji}
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{cat.name}</h1>
                <p style={{ color: "var(--text-muted)" }}>{cat.description} — {display.length} products</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {display.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* All categories link */}
          <div className="mt-12 text-center">
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Explore other categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(CATEGORY_DATA).map(([s, c]) => (
                <Link key={s} href={`/category/${s}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105"
                  style={{ borderColor: "var(--border-color)", background: s === slug ? "var(--gradient-primary)" : "var(--bg-card)", color: s === slug ? "white" : "var(--text-muted)" }}>
                  {c.emoji} {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
