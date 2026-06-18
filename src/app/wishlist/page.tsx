"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface WishlistProduct {
  id: string; title: string; price: number; image: string; category: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      setLoggedIn(!!meData.user);

      if (meData.user) {
        const wRes = await fetch("/api/wishlist");
        const wData = await wRes.json();
        setWishlist(wData.wishlist || []);
        // Load product details for each wishlist item
        const prods: WishlistProduct[] = [];
        for (const id of wData.wishlist || []) {
          try {
            const pRes = await fetch(`/api/products/item?id=${id}`);
            if (pRes.ok) {
              const pData = await pRes.json();
              if (pData.product) prods.push(pData.product);
            }
          } catch {}
        }
        setProducts(prods);
      } else {
        // Load from localStorage for guests
        const stored = JSON.parse(localStorage.getItem("luxe_wishlist") || "[]");
        setWishlist(stored);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function removeFromWishlist(productId: string) {
    if (loggedIn) {
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } else {
      const stored = JSON.parse(localStorage.getItem("luxe_wishlist") || "[]");
      const updated = stored.filter((id: string) => id !== productId);
      localStorage.setItem("luxe_wishlist", JSON.stringify(updated));
    }
    setWishlist((prev) => prev.filter((id) => id !== productId));
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-purple-400 text-lg">Loading wishlist...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
          {!loggedIn && (
            <Link href="/login" className="text-purple-400 text-sm hover:text-purple-300">
              Sign in to save wishlist permanently
            </Link>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">♡</div>
            <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">Save items you love to your wishlist</p>
            <Link href="/" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(loggedIn ? products : wishlist.map(id => ({ id, title: `Product ${id}`, price: 0, image: "", category: "" }))).map((product) => (
              <div key={product.id} className="bg-[#1a1a2e] border border-purple-900/30 rounded-xl overflow-hidden group">
                <div className="relative">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-purple-900/20 flex items-center justify-center">
                      <span className="text-4xl">🛍️</span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 bg-red-900/80 text-red-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-800 transition text-sm"
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-white text-sm font-medium line-clamp-2 mb-2">{product.title}</p>
                  {product.price > 0 && (
                    <p className="text-purple-400 font-bold">£{product.price.toFixed(2)}</p>
                  )}
                  <Link
                    href={`/product/${product.id}`}
                    className="mt-3 block text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm py-2 rounded-lg hover:opacity-90 transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
