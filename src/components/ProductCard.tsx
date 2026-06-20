"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
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

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

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
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-bold text-white bg-red-500">
            -{discount}%
          </div>
        )}

        {/* Source badge */}
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${product.source === "amazon" ? "bg-[#f90]" : "bg-[#e8441a]"}`}>
          {product.source === "amazon" ? "Amazon" : "AliExpress"}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110"
        >
          <Heart size={14} fill={wishlisted ? "#ef4444" : "none"} color={wishlisted ? "#ef4444" : "#374151"} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Badge */}
        {product.badge && (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white bg-[#1a1a2e] mb-1.5">
            {product.badge}
          </span>
        )}

        <p className="text-xs font-medium text-gray-700 line-clamp-2 mb-2 leading-relaxed">
          {product.title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={10} fill={s <= Math.round(product.rating) ? "#f59e0b" : "#e5e7eb"} color={s <= Math.round(product.rating) ? "#f59e0b" : "#e5e7eb"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.orders.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-base text-[#1a1a2e]">£{product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1.5">£{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${added ? "bg-green-500" : "bg-[#1a1a2e] hover:bg-[#0f3460]"}`}
          >
            <ShoppingCart size={11} />
            {added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}
