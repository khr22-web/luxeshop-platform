"use client";
import { useEffect, useState } from "react";

export default function WishlistButton({ productId }: { productId: string }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function check() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      setLoggedIn(!!meData.user);
      if (meData.user) {
        const wRes = await fetch("/api/wishlist");
        const wData = await wRes.json();
        setInWishlist((wData.wishlist || []).includes(productId));
      } else {
        const stored = JSON.parse(localStorage.getItem("luxe_wishlist") || "[]");
        setInWishlist(stored.includes(productId));
      }
    }
    check();
  }, [productId]);

  async function toggle() {
    setLoading(true);
    if (loggedIn) {
      if (inWishlist) {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("luxe_wishlist") || "[]");
      const updated = inWishlist ? stored.filter((id: string) => id !== productId) : [...stored, productId];
      localStorage.setItem("luxe_wishlist", JSON.stringify(updated));
    }
    setInWishlist((prev) => !prev);
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition font-medium text-sm ${
        inWishlist
          ? "bg-red-900/30 border-red-700/50 text-red-300 hover:bg-red-900/50"
          : "bg-[#1a1a2e] border-purple-900/30 text-gray-400 hover:border-purple-500 hover:text-purple-300"
      }`}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <span className="text-lg">{inWishlist ? "♥" : "♡"}</span>
      <span>{inWishlist ? "Saved" : "Wishlist"}</span>
    </button>
  );
}
