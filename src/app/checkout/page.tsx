"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, CreditCard, Shield, Lock, ChevronRight, Truck, Tag } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profit = items.reduce(
    (s, i) => s + (i.price - i.originalPrice) * i.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const grandTotal = total + shipping;

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerEmail: email }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Checkout failed");
      }

      // Redirect to Stripe hosted checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag size={64} className="mb-4 opacity-30" style={{ color: "var(--text-muted)" }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Your cart is empty</h2>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>Add some products before checking out.</p>
          <Link href="/search" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs mb-6 mt-2" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:text-violet-400">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cart" className="hover:text-violet-400">Cart</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-secondary)" }}>Checkout</span>
        </div>

        <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact + Payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>1</span>
                Contact Information
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
                <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                  Your order confirmation will be sent to this email.
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>2</span>
                Payment Method
              </h2>

              {/* Stripe Card */}
              <div className="rounded-xl p-4 mb-4" style={{ background: "var(--bg-secondary)", border: "2px solid var(--accent-primary)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "var(--accent-primary)" }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
                  </div>
                  <CreditCard size={20} style={{ color: "var(--accent-primary)" }} />
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Credit / Debit Card</span>
                  <div className="ml-auto flex items-center gap-1">
                    {["VISA", "MC", "AMEX"].map((c) => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border-color)" }}>{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs mt-3 ml-8" style={{ color: "var(--text-muted)" }}>
                  Powered by Stripe — your card details are encrypted and never stored on our servers.
                </p>
              </div>

              {/* Security badges */}
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <div className="flex items-center gap-1.5">
                  <Lock size={12} className="text-green-400" />
                  <span>256-bit SSL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield size={12} className="text-green-400" />
                  <span>Buyer Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={12} className="text-blue-400" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl p-4 text-sm text-red-400" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                {error}
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: loading ? "#555" : "var(--gradient-primary)", boxShadow: "0 4px 24px rgba(124,111,255,0.4)" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Redirecting to Stripe...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Pay ${grandTotal.toFixed(2)} Securely
                </>
              )}
            </button>

            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              By placing your order, you agree to our{" "}
              <Link href="/terms" className="text-violet-400 hover:underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-6 sticky top-24" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <ShoppingBag size={18} style={{ color: "var(--accent-primary)" }} />
                Order Summary ({count} item{count !== 1 ? "s" : ""})
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-5 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--bg-secondary)" }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" unoptimized />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ background: "var(--accent-primary)" }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight truncate" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.source === "aliexpress" ? "AliExpress" : "Amazon"}</p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: "var(--text-primary)" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2" style={{ borderColor: "var(--border-color)" }}>
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><Truck size={12} /> Shipping</span>
                  <span className="text-green-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span className="flex items-center gap-1"><Tag size={12} /> Your Markup Profit</span>
                  <span>+${profit.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
                  <span>Total</span>
                  <span style={{ color: "var(--accent-primary)" }}>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-5 p-3 rounded-xl flex items-start gap-2" style={{ background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.2)" }}>
                <Shield size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  All payments are processed securely by <strong className="text-violet-400">Stripe</strong>. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
