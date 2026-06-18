"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, SlidersHorizontal, ChevronDown, Loader2, X } from "lucide-react";

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

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  orders: number;
  source: "aliexpress" | "amazon";
  badge: string;
  category: string;
}

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 9999 },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: 9999 },
];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORY_DATA[slug] || { name: slug.charAt(0).toUpperCase() + slug.slice(1), description: "Browse products", emoji: "🛍️", color: "#7c6fff" };

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("popular");
  const [source, setSource] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 });
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async (pageNum: number, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: slug,
        page: String(pageNum),
        limit: "24",
        sort,
        source,
        minPrice: String(priceRange.min),
        maxPrice: String(priceRange.max),
      });
      const res = await fetch(`/api/products/category?${params}`);
      const data = await res.json();
      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
      setHasMore(data.pagination.hasMore);
      setTotal(data.pagination.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [slug, sort, source, priceRange, loading]);

  // Reset and reload when filters change
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    fetchProducts(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, sort, source, priceRange]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page, fetchProducts]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || "Sort";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">

        {/* Hero */}
        <div className="relative overflow-hidden py-10 mb-6" style={{ background: `linear-gradient(135deg, ${cat.color}22 0%, transparent 60%)` }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span style={{ color: "var(--text-secondary)" }}>{cat.name}</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${cat.color}33` }}>
                  {cat.emoji}
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{cat.name}</h1>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {cat.description} — <span style={{ color: cat.color }}>{total.toLocaleString()} products</span>
                  </p>
                </div>
              </div>
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(CATEGORY_DATA).slice(0, 6).map(([s, c]) => (
                  <Link key={s} href={`/category/${s}`}
                    className="px-3 py-1 rounded-full text-xs font-medium border transition-all hover:scale-105"
                    style={{
                      borderColor: s === slug ? cat.color : "var(--border-color)",
                      background: s === slug ? `${cat.color}22` : "var(--bg-card)",
                      color: s === slug ? cat.color : "var(--text-muted)"
                    }}>
                    {c.emoji} {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-105"
                style={{ borderColor: showFilters ? cat.color : "var(--border-color)", background: showFilters ? `${cat.color}22` : "var(--bg-card)", color: showFilters ? cat.color : "var(--text-secondary)" }}>
                <SlidersHorizontal size={15} />
                Filters
              </button>

              {/* Source filter */}
              <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
                {["all", "aliexpress", "amazon"].map((s) => (
                  <button key={s} onClick={() => setSource(s)}
                    className="px-3 py-2 text-xs font-medium capitalize transition-all"
                    style={{
                      background: source === s ? cat.color : "var(--bg-card)",
                      color: source === s ? "white" : "var(--text-muted)"
                    }}>
                    {s === "all" ? "All" : s === "aliexpress" ? "AliExpress" : "Amazon"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={{ borderColor: "var(--border-color)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
                {activeSortLabel}
                <ChevronDown size={14} />
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 z-50 rounded-xl border shadow-xl overflow-hidden min-w-48"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  {SORT_OPTIONS.map((opt) => (
                    <button key={opt.value} onClick={() => { setSort(opt.value); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-violet-500/10"
                      style={{ color: sort === opt.value ? cat.color : "var(--text-secondary)", fontWeight: sort === opt.value ? 600 : 400 }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mb-6 p-4 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Price Range</h3>
                <button onClick={() => setShowFilters(false)} style={{ color: "var(--text-muted)" }}><X size={16} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((range) => {
                  const active = priceRange.min === range.min && priceRange.max === range.max;
                  return (
                    <button key={range.label} onClick={() => setPriceRange({ min: range.min, max: range.max })}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105"
                      style={{
                        borderColor: active ? cat.color : "var(--border-color)",
                        background: active ? `${cat.color}22` : "transparent",
                        color: active ? cat.color : "var(--text-muted)"
                      }}>
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Infinite scroll loader */}
          <div ref={loaderRef} className="flex justify-center py-10">
            {loading && (
              <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">Loading more products...</span>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Showing all {products.length.toLocaleString()} products
              </p>
            )}
          </div>

          {/* All categories */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-sm mb-3 text-center" style={{ color: "var(--text-muted)" }}>Explore other categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(CATEGORY_DATA).map(([s, c]) => (
                <Link key={s} href={`/category/${s}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105"
                  style={{
                    borderColor: s === slug ? cat.color : "var(--border-color)",
                    background: s === slug ? `${cat.color}22` : "var(--bg-card)",
                    color: s === slug ? cat.color : "var(--text-muted)"
                  }}>
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
