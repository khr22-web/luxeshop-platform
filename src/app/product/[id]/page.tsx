"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Heart, Shield, Truck, RefreshCw, Zap, ExternalLink, ChevronRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS_MAP, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const product = PRODUCTS_MAP[id];
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-20">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Product not found</h2>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>This product doesn't exist or has been removed.</p>
          <Link href="/search" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
            Browse All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = Math.round(((product.price - product.originalPrice) / product.originalPrice) * 100);
  const profit = ((product.price - product.originalPrice) * qty).toFixed(2);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        source: product.source,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same category, excluding current)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6 mt-4 flex-wrap" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="hover:text-violet-400 transition-colors">{product.category}</Link>
            <ChevronRight size={12} />
            <span className="truncate max-w-[200px]" style={{ color: "var(--text-secondary)" }}>{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ── Images ── */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3" style={{ background: "var(--bg-card)" }}>
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
                    {product.badge}
                  </div>
                )}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <Heart size={18} fill={wishlisted ? "#ef4444" : "none"} color={wishlisted ? "#ef4444" : "white"} />
                </button>
              </div>
              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className="relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
                      style={{ borderColor: selectedImage === i ? "var(--accent-primary)" : "var(--border-color)" }}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Details ── */}
            <div>
              {/* Source badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{
                  background: product.source === "aliexpress" ? "rgba(255,102,0,0.15)" : "rgba(255,153,0,0.15)",
                  color: product.source === "aliexpress" ? "#ff6600" : "#ff9900",
                }}
              >
                {product.source === "aliexpress" ? "AliExpress" : "Amazon"} — Verified Seller
              </div>

              <h1 className="text-2xl font-bold leading-snug mb-3" style={{ color: "var(--text-primary)" }}>
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill={s <= Math.floor(product.rating) ? "#f59e0b" : "none"} color="#f59e0b" />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{product.rating}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>({product.orders.toLocaleString()} orders)</span>
              </div>

              {/* Price box */}
              <div className="p-4 rounded-2xl mb-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "var(--accent-primary)" }}>${product.price.toFixed(2)}</span>
                  <span className="text-lg line-through mb-0.5" style={{ color: "var(--text-muted)" }}>${product.originalPrice.toFixed(2)}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-red-500">+{discount}% markup</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Zap size={12} className="text-green-400" />
                  <span>Your profit per unit: <span className="text-green-400 font-semibold">${(product.price - product.originalPrice).toFixed(2)}</span></span>
                </div>
              </div>

              {/* Qty + Add to cart */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/10" style={{ color: "var(--text-primary)" }}>−</button>
                  <span className="w-10 text-center font-semibold" style={{ color: "var(--text-primary)" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/10" style={{ color: "var(--text-primary)" }}>+</button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all"
                  style={{ background: added ? "#10b981" : "var(--gradient-primary)", boxShadow: "0 4px 20px rgba(124,111,255,0.3)" }}
                >
                  <ShoppingCart size={18} />
                  {added ? "Added to Cart!" : `Add ${qty > 1 ? `${qty} items` : ""} to Cart`}
                </button>
              </div>

              {/* Buy on Amazon button */}
              {product.amazonUrl && (
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold mb-4 transition-all hover:opacity-90"
                  style={{ background: "rgba(255,153,0,0.15)", border: "1px solid rgba(255,153,0,0.4)", color: "#ff9900" }}
                >
                  <ShoppingBag size={18} />
                  Buy on Amazon
                  <ExternalLink size={14} />
                </a>
              )}

              {qty > 1 && (
                <div className="text-sm mb-4 text-green-400 font-medium">
                  Total: ${(product.price * qty).toFixed(2)} — Profit: ${profit}
                </div>
              )}

              {/* Checkout button */}
              <button
                onClick={() => { handleAdd(); router.push("/checkout"); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white mb-5 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
              >
                <Zap size={18} />
                Buy Now — Checkout Instantly
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: Shield, label: "Buyer Protection" },
                  { icon: Truck, label: "Free Shipping" },
                  { icon: RefreshCw, label: "Easy Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                    <Icon size={18} style={{ color: "var(--accent-primary)" }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* View on source */}
              <a
                href={product.source === "aliexpress" ? product.aliexpressUrl : product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                <ExternalLink size={14} />
                View original on {product.source === "aliexpress" ? "AliExpress" : "Amazon"}
              </a>
            </div>
          </div>

          {/* Description + Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Description</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{product.description}</p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Specifications</h2>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-1.5 border-b last:border-0" style={{ borderColor: "var(--border-color)" }}>
                    <span style={{ color: "var(--text-muted)" }}>{key}</span>
                    <span className="font-medium text-right max-w-[55%]" style={{ color: "var(--text-secondary)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Related Products</h2>
                <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="text-sm text-violet-400 hover:underline">
                  View all in {product.category} →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
