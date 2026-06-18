"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { searchProducts, CATEGORIES } from "@/lib/products";

const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "orders", label: "Best Selling" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";
  const [searchInput, setSearchInput] = useState(query);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState(categoryParam);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(() => searchProducts(""));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const results = searchProducts(query, {
        source: sourceFilter,
        category: categoryFilter === "all" ? undefined : categoryFilter,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort,
      });
      setProducts(results);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, sort, priceRange, sourceFilter, categoryFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set("q", searchInput.trim());
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    router.push(`/search?${params.toString()}`);
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
                Price Range: £{priceRange[0]} — £{priceRange[1]}
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
