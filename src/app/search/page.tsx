"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "orders", label: "Best Selling" },
];

const DEMO_PRODUCTS = [
  { id: "1", title: "TWS Wireless Earbuds Pro — Active Noise Cancellation", price: 29.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", rating: 4.7, orders: 12400, source: "aliexpress" as const, badge: "Best Seller" },
  { id: "2", title: "Smart Watch Series X5 — Health Monitor & GPS", price: 54.60, originalPrice: 45.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", rating: 4.5, orders: 8900, source: "aliexpress" as const, badge: "Hot Deal" },
  { id: "3", title: "4K Action Camera Ultra — Waterproof 30m", price: 46.79, originalPrice: 38.99, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", rating: 4.6, orders: 5600, source: "aliexpress" as const, badge: "New" },
  { id: "4", title: "Mechanical RGB Gaming Keyboard — TKL Layout", price: 62.40, originalPrice: 52.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.8, orders: 9200, source: "aliexpress" as const, badge: "Top Pick" },
  { id: "5", title: "Portable Bluetooth Speaker — 360° Surround Sound", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", rating: 4.4, orders: 7100, source: "aliexpress" as const, badge: "" },
  { id: "6", title: "Smart LED Strip Lights — 16M Colors App Control", price: 22.20, originalPrice: 18.50, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.3, orders: 15800, source: "aliexpress" as const, badge: "Trending" },
  { id: "7", title: "Wireless Charging Pad — 15W Fast Charge", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", rating: 4.5, orders: 11200, source: "aliexpress" as const, badge: "" },
  { id: "8", title: "USB-C Hub 7-in-1 — 4K HDMI, 100W PD", price: 31.79, originalPrice: 26.49, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", rating: 4.6, orders: 6800, source: "aliexpress" as const, badge: "Editor's Choice" },
  { id: "9", title: "Laptop Stand Adjustable — Aluminum Alloy", price: 26.39, originalPrice: 21.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", rating: 4.7, orders: 4500, source: "aliexpress" as const, badge: "" },
  { id: "10", title: "Gaming Mouse — 16000 DPI RGB Programmable", price: 28.79, originalPrice: 23.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", rating: 4.5, orders: 8300, source: "aliexpress" as const, badge: "" },
  { id: "11", title: "Noise Cancelling Headphones — 40Hr Battery", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", rating: 4.8, orders: 13400, source: "aliexpress" as const, badge: "Premium" },
  { id: "12", title: "Mini Projector 1080P — Portable Home Cinema", price: 95.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", rating: 4.4, orders: 3200, source: "aliexpress" as const, badge: "" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(DEMO_PRODUCTS);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = DEMO_PRODUCTS.filter((p) =>
        query ? p.title.toLowerCase().includes(query.toLowerCase()) : true
      );
      if (sourceFilter !== "all") filtered = filtered.filter((p) => p.source === sourceFilter);
      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
      if (sort === "price_asc") filtered.sort((a, b) => a.price - b.price);
      if (sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
      if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
      if (sort === "orders") filtered.sort((a, b) => b.orders - a.orders);
      setProducts(filtered);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query, sort, priceRange, sourceFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Search bar */}
        <div className="border-b" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
          <div className="max-w-6xl mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <Search size={18} style={{ color: "var(--text-muted)" }} />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                />
                {searchInput && (
                  <button type="button" onClick={() => setSearchInput("")}>
                    <X size={16} style={{ color: "var(--text-muted)" }} />
                  </button>
                )}
              </div>
              <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: "var(--gradient-primary)" }}>
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-6">
          {/* Results header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {query ? `Results for "${query}"` : "All Products"}
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                {loading ? "Searching..." : `${products.length} products found`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Source filter */}
              <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
                {["all", "aliexpress", "amazon"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSourceFilter(s)}
                    className="px-3 py-2 text-xs font-medium capitalize transition-all"
                    style={{
                      background: sourceFilter === s ? "var(--gradient-primary)" : "var(--bg-card)",
                      color: sourceFilter === s ? "white" : "var(--text-muted)",
                    }}
                  >
                    {s === "all" ? "All Sources" : s === "aliexpress" ? "AliExpress" : "Amazon"}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-medium border outline-none cursor-pointer"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
              </div>
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all"
                style={{ background: showFilters ? "var(--gradient-primary)" : "var(--bg-card)", borderColor: "var(--border-color)", color: showFilters ? "white" : "var(--text-muted)" }}
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
            </div>
          </div>

          {/* Price filter */}
          {showFilters && (
            <div className="mb-5 p-4 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Price Range: ${priceRange[0]} — ${priceRange[1]}
              </p>
              <input
                type="range" min={0} max={200} value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-violet-500"
              />
            </div>
          )}

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "var(--bg-card)" }}>
                  <div className="aspect-square" style={{ background: "var(--bg-secondary)" }} />
                  <div className="p-3 space-y-2">
                    <div className="h-3 rounded" style={{ background: "var(--bg-secondary)" }} />
                    <div className="h-3 w-2/3 rounded" style={{ background: "var(--bg-secondary)" }} />
                    <div className="h-5 w-1/2 rounded" style={{ background: "var(--bg-secondary)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>No products found</h3>
              <p style={{ color: "var(--text-muted)" }}>Try different keywords or adjust your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}><div className="text-white">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
