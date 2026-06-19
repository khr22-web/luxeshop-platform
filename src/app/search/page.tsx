"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, ChevronDown, ExternalLink } from "lucide-react";

const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "orders", label: "Best Selling" },
];

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
  amazonUrl: string;
  aliexpressUrl?: string;
  description?: string;
  tags?: string[];
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [affiliateTag, setAffiliateTag] = useState("luxeshoplondo-21");

  const fetchProducts = useCallback(async (q: string, pg: number, append = false) => {
    if (!q.trim()) {
      setProducts([]);
      setTotal(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q,
        page: String(pg),
        limit: "24",
        sort,
        maxPrice: String(maxPrice),
      });
      const res = await fetch(`/api/products/search?${params}`);
      const data = await res.json();
      if (append) {
        setProducts((prev) => [...prev, ...data.products]);
      } else {
        setProducts(data.products || []);
      }
      setTotal(data.pagination?.total || 0);
      setHasMore(data.pagination?.hasMore || false);
      if (data.affiliateTag) setAffiliateTag(data.affiliateTag);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [sort, maxPrice]);

  useEffect(() => {
    setPage(1);
    fetchProducts(query, 1, false);
  }, [query, sort, maxPrice, fetchProducts]);

  const AFFILIATE_TAG = "luxeshoplondo-21";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const encoded = encodeURIComponent(searchInput.trim());
      window.open(`https://www.amazon.co.uk/s?k=${encoded}&tag=${AFFILIATE_TAG}`, "_blank");
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(query, nextPage, true);
  };

  const amazonSearchUrl = `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${affiliateTag}`;

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
                  placeholder="Search for any product — MacBook, iPhone, Dyson, Nike..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                  autoFocus
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
                {query ? `Results for "${query}"` : "Search Products"}
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                {loading
                  ? "Searching Amazon UK..."
                  : query
                  ? `${total} products found on Amazon UK`
                  : "Enter a search term to find products"}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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
              {/* View on Amazon button */}
              {query && (
                <a
                  href={amazonSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all"
                  style={{ background: "rgba(255,153,0,0.1)", borderColor: "rgba(255,153,0,0.3)", color: "#ff9900" }}
                >
                  <ExternalLink size={14} />
                  View all on Amazon
                </a>
              )}
            </div>
          </div>

          {/* Price filter */}
          {showFilters && (
            <div className="mb-5 p-4 rounded-xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Max Price: {maxPrice >= 9999 ? "No limit" : `£${maxPrice}`}
              </p>
              <input
                type="range" min={10} max={2000} step={10} value={maxPrice >= 9999 ? 2000 : maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value) >= 2000 ? 9999 : Number(e.target.value))}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                <span>£10</span>
                <span>£2,000+</span>
              </div>
            </div>
          )}

          {/* Empty state — no query */}
          {!query && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Search any product</h3>
              <p className="mb-6" style={{ color: "var(--text-muted)" }}>
                Try searching for MacBook, iPhone, Dyson, Nike Trainers, Gaming Chair...
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["MacBook Pro", "iPhone 15", "Dyson V15", "Nike Air Max", "Gaming Chair", "AirPods Pro"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
                    className="px-4 py-2 rounded-full text-sm border transition-all hover:scale-105"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && products.length === 0 && (
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
          )}

          {/* Product grid */}
          {products.length > 0 && (
            <>
              {/* Amazon badge */}
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg w-fit" style={{ background: "rgba(255,153,0,0.08)", border: "1px solid rgba(255,153,0,0.2)" }}>
                <span className="text-xs font-semibold" style={{ color: "#ff9900" }}>🛒 Amazon UK</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>All prices in GBP (£) · Free delivery on eligible orders</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {/* Load more */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 disabled:opacity-50"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {loading ? "Loading..." : "Load More Results"}
                  </button>
                </div>
              )}
              {/* View all on Amazon CTA */}
              <div className="mt-8 p-4 rounded-xl text-center border" style={{ background: "rgba(255,153,0,0.05)", borderColor: "rgba(255,153,0,0.2)" }}>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  Want to see even more results? Browse the full selection on Amazon UK.
                </p>
                <a
                  href={amazonSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "#ff9900", color: "#000" }}
                >
                  <ExternalLink size={16} />
                  View All Results on Amazon UK
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
