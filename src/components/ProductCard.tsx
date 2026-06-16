"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

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
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = Math.round(((product.price - product.originalPrice) / product.originalPrice) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      source: product.source,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
            {product.badge}
          </div>
        )}
        {/* Discount */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white bg-red-500">
          +{discount}%
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <Heart size={14} fill={wishlisted ? "#ef4444" : "none"} color={wishlisted ? "#ef4444" : "white"} />
        </button>
        {/* Source badge */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: product.source === "aliexpress" ? "rgba(255,102,0,0.9)" : "rgba(255,153,0,0.9)",
            color: "white"
          }}>
          {product.source === "aliexpress" ? "AliExpress" : "Amazon"}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-medium line-clamp-2 mb-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {product.title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={11} fill="#f59e0b" color="#f59e0b" />
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            {product.rating} ({product.orders.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-base" style={{ color: "var(--accent-primary)" }}>
              ${product.price.toFixed(2)}
            </div>
            <div className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
              ${product.originalPrice.toFixed(2)}
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
            style={{ background: added ? "#10b981" : "var(--gradient-primary)" }}
          >
            {added ? (
              <><Zap size={12} /> Added!</>
            ) : (
              <><ShoppingCart size={12} /> Add</>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
