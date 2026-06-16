"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Shield, Truck, Zap } from "lucide-react";

export default function CartPage() {
  const { items, total, count, removeItem, updateQty, clearCart } = useCart();

  const shipping = total > 50 ? 0 : 4.99;
  const profit = items.reduce((s, i) => s + (i.price - i.originalPrice) * i.quantity, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Shopping Cart</h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{count} {count === 1 ? "item" : "items"}</p>
            </div>
            <Link href="/" className="flex items-center gap-2 text-sm transition-colors hover:text-violet-400" style={{ color: "var(--text-muted)" }}>
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text-muted)" }} />
              <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Your cart is empty</h2>
              <p className="mb-6" style={{ color: "var(--text-muted)" }}>Discover amazing products from AliExpress and Amazon</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
                <ShoppingBag size={18} /> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                    <Link href={`/product/${item.id}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--bg-secondary)" }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${item.id}`} className="text-sm font-medium line-clamp-2 hover:text-violet-400 transition-colors" style={{ color: "var(--text-secondary)" }}>
                          {item.title}
                        </Link>
                        <button onClick={() => removeItem(item.id)} className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:bg-red-500/20">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: item.source === "aliexpress" ? "rgba(255,102,0,0.15)" : "rgba(255,153,0,0.15)", color: item.source === "aliexpress" ? "#ff6600" : "#ff9900" }}>
                          {item.source === "aliexpress" ? "AliExpress" : "Amazon"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ color: "var(--text-primary)" }}>
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ color: "var(--text-primary)" }}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold" style={{ color: "var(--accent-primary)" }}>${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>${item.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-300 transition-colors mt-2">
                  Clear all items
                </button>
              </div>

              {/* Order summary */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  <h3 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>Order Summary</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-muted)" }}>Subtotal ({count} items)</span>
                      <span style={{ color: "var(--text-secondary)" }}>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                      <span style={{ color: shipping === 0 ? "#10b981" : "var(--text-secondary)" }}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-green-400">Add ${(50 - total).toFixed(2)} more for free shipping</p>
                    )}
                    <div className="border-t pt-2.5" style={{ borderColor: "var(--border-color)" }}>
                      <div className="flex justify-between font-bold text-base">
                        <span style={{ color: "var(--text-primary)" }}>Total</span>
                        <span style={{ color: "var(--accent-primary)" }}>${(total + shipping).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profit summary */}
                  <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <div className="flex items-center gap-2 text-xs text-green-400 font-semibold">
                      <Zap size={12} />
                      Your profit on this order: ${profit.toFixed(2)}
                    </div>
                  </div>

                  <button className="w-full mt-4 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: "var(--gradient-primary)" }}>
                    Proceed to Checkout
                  </button>
                  <Link href="/search" className="block text-center text-xs mt-3 hover:text-violet-400 transition-colors" style={{ color: "var(--text-muted)" }}>
                    or continue shopping
                  </Link>
                </div>

                {/* Trust */}
                <div className="p-4 rounded-2xl border space-y-2" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  {[
                    { icon: Shield, text: "Buyer Protection Guarantee" },
                    { icon: Truck, text: "Free shipping on orders $50+" },
                    { icon: Zap, text: "Fast 7-15 day delivery" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Icon size={13} style={{ color: "var(--accent-primary)" }} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
