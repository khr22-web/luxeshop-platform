"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Heart, ArrowLeft, Shield, Truck, RefreshCw, Zap, ExternalLink, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const PRODUCTS: Record<string, {
  id: string; title: string; price: number; originalPrice: number;
  images: string[]; rating: number; orders: number; source: "aliexpress" | "amazon";
  badge: string; description: string; specs: Record<string, string>; category: string;
}> = {
  "1": {
    id: "1", title: "TWS Wireless Earbuds Pro — Active Noise Cancellation", price: 29.99, originalPrice: 24.99,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"],
    rating: 4.7, orders: 12400, source: "aliexpress", badge: "Best Seller",
    description: "Experience premium sound quality with our TWS Wireless Earbuds Pro. Featuring advanced Active Noise Cancellation technology, these earbuds deliver crystal-clear audio in any environment. With up to 8 hours of playback and 32 hours total with the charging case, you'll never miss a beat.",
    specs: { "Driver Size": "10mm Dynamic", "Frequency Response": "20Hz - 20kHz", "Battery Life": "8hrs + 32hrs case", "Charging": "USB-C, 1.5hr full charge", "Connectivity": "Bluetooth 5.3", "Water Resistance": "IPX5", "Weight": "5g per earbud" },
    category: "Electronics"
  },
  "2": {
    id: "2", title: "Smart Watch Series X5 — Health Monitor & GPS", price: 54.60, originalPrice: 45.50,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80"],
    rating: 4.5, orders: 8900, source: "aliexpress", badge: "Hot Deal",
    description: "The Smart Watch X5 combines style with advanced health monitoring. Track your heart rate, blood oxygen, sleep quality, and over 100 workout modes. With built-in GPS, you can map your runs without your phone.",
    specs: { "Display": "1.96\" AMOLED 466×466", "Battery": "7 days typical use", "GPS": "Built-in GPS + GLONASS", "Health": "Heart Rate, SpO2, Stress", "Water Resistance": "5ATM (50m)", "Compatibility": "iOS 12+ / Android 8+", "Strap": "22mm silicone" },
    category: "Watches"
  },
  "3": {
    id: "3", title: "4K Action Camera Ultra — Waterproof 30m", price: 46.79, originalPrice: 38.99,
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80", "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600&q=80"],
    rating: 4.6, orders: 5600, source: "aliexpress", badge: "New",
    description: "Capture every adventure in stunning 4K resolution. The Ultra Action Camera is built for extreme conditions with 30m waterproofing, image stabilization, and a wide 170° field of view.",
    specs: { "Video": "4K@60fps, 2.7K@120fps", "Photo": "20MP", "Stabilization": "6-axis EIS", "Waterproof": "30m without housing", "Battery": "1800mAh, 2.5hrs 4K", "Screen": "2\" touch display", "Storage": "MicroSD up to 256GB" },
    category: "Photography"
  },
  "4": {
    id: "4", title: "Mechanical RGB Gaming Keyboard — TKL Layout", price: 62.40, originalPrice: 52.00,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80", "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80"],
    rating: 4.8, orders: 9200, source: "aliexpress", badge: "Top Pick",
    description: "Dominate your game with the ultimate TKL mechanical keyboard. Features per-key RGB lighting with 16.8M colors, tactile mechanical switches, and aircraft-grade aluminum construction.",
    specs: { "Layout": "TKL (87 keys)", "Switch": "Red / Blue / Brown options", "Lighting": "Per-key RGB 16.8M colors", "Connection": "USB-C detachable", "Anti-ghosting": "Full N-Key Rollover", "Material": "Aluminum top plate", "Polling Rate": "1000Hz" },
    category: "Gaming"
  },
  "5": {
    id: "5", title: "Portable Bluetooth Speaker — 360° Surround Sound", price: 35.99, originalPrice: 29.99,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    rating: 4.4, orders: 7100, source: "aliexpress", badge: "",
    description: "Fill any room with rich, immersive 360° sound. The portable speaker delivers powerful bass and crystal-clear highs, with IPX7 waterproofing for poolside and outdoor use.",
    specs: { "Output Power": "30W RMS", "Frequency": "60Hz - 20kHz", "Battery": "24 hours playback", "Charging": "USB-C, 3hr full charge", "Waterproof": "IPX7", "Connectivity": "Bluetooth 5.0, AUX", "Weight": "680g" },
    category: "Audio"
  },
  "6": {
    id: "6", title: "Smart LED Strip Lights — 16M Colors App Control", price: 22.20, originalPrice: 18.50,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80", "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80"],
    rating: 4.3, orders: 15800, source: "aliexpress", badge: "Trending",
    description: "Transform your space with 16 million colors and dynamic lighting effects. Control via app, voice assistant, or remote. Music sync mode reacts to your music in real time.",
    specs: { "Length": "5m (16.4ft)", "LEDs": "300 LEDs/5m", "Colors": "16M RGBIC", "Control": "App / Voice / Remote", "Power": "12V 3A adapter", "Compatibility": "Alexa, Google Home", "Lifespan": "50,000 hours" },
    category: "Home & Garden"
  },
};

// Fill remaining products
for (let i = 7; i <= 12; i++) {
  PRODUCTS[String(i)] = {
    id: String(i), title: `Premium Product ${i}`, price: 29.99 + i * 3, originalPrice: 24.99 + i * 2.5,
    images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80"],
    rating: 4.5, orders: 5000 + i * 100, source: "aliexpress", badge: "",
    description: "High quality product sourced directly from verified manufacturers.",
    specs: { "Material": "Premium grade", "Warranty": "12 months" },
    category: "Electronics"
  };
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem, count } = useCart();
  const product = PRODUCTS[id];
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Product not found</h2>
          <Link href="/" className="text-violet-400 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.price - product.originalPrice) / product.originalPrice) * 100);
  const profit = ((product.price - product.originalPrice) * qty).toFixed(2);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, title: product.title, price: product.price, originalPrice: product.originalPrice, image: product.images[0], source: product.source });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6 mt-4" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href={`/category/${product.category.toLowerCase().replace(/ /g, "-")}`} className="hover:text-violet-400 transition-colors">{product.category}</Link>
            <ChevronRight size={12} />
            <span className="truncate max-w-[200px]" style={{ color: "var(--text-secondary)" }}>{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3" style={{ background: "var(--bg-card)" }}>
                <Image src={product.images[selectedImage]} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className="relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                    style={{ borderColor: selectedImage === i ? "var(--accent-primary)" : "var(--border-color)" }}>
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Source */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: product.source === "aliexpress" ? "rgba(255,102,0,0.15)" : "rgba(255,153,0,0.15)", color: product.source === "aliexpress" ? "#ff6600" : "#ff9900" }}>
                {product.source === "aliexpress" ? "AliExpress" : "Amazon"} — Verified Seller
              </div>

              <h1 className="text-2xl font-bold leading-snug mb-3" style={{ color: "var(--text-primary)" }}>{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} fill={s <= Math.floor(product.rating) ? "#f59e0b" : "none"} color="#f59e0b" />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{product.rating}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>({product.orders.toLocaleString()} orders)</span>
              </div>

              {/* Price */}
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
                <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all" style={{ background: added ? "#10b981" : "var(--gradient-primary)" }}>
                  <ShoppingCart size={18} />
                  {added ? "Added to Cart!" : `Add ${qty > 1 ? `${qty} items` : ""} to Cart`}
                </button>
                <button onClick={() => setWishlisted(!wishlisted)} className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
                  <Heart size={18} fill={wishlisted ? "#ef4444" : "none"} color={wishlisted ? "#ef4444" : "var(--text-muted)"} />
                </button>
              </div>

              {qty > 1 && (
                <div className="text-sm mb-4 text-green-400 font-medium">
                  Total: ${(product.price * qty).toFixed(2)} — Profit: ${profit}
                </div>
              )}

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
              <a href={`https://www.${product.source}.com`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--text-muted)" }}>
                <ExternalLink size={14} />
                View original on {product.source === "aliexpress" ? "AliExpress" : "Amazon"}
              </a>
            </div>
          </div>

          {/* Description + Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>Description</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{product.description}</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-1.5 border-b" style={{ borderColor: "var(--border-color)" }}>
                    <span style={{ color: "var(--text-muted)" }}>{key}</span>
                    <span className="font-medium text-right" style={{ color: "var(--text-secondary)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
