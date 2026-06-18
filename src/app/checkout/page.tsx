"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  Lock, ShoppingBag, Truck, Tag, Shield, CreditCard, ArrowLeft, CheckCircle, ChevronRight
} from "lucide-react";

type PaymentMethod = "stripe" | "paypal";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);

  const grandTotal = Math.max(0, total - couponDiscount);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMsg("");
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), orderTotal: total }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponDiscount(data.discount);
        setCouponValid(true);
        setCouponMsg(`Coupon applied! You save £${data.discount.toFixed(2)}`);
      } else {
        setCouponDiscount(0);
        setCouponValid(false);
        setCouponMsg(data.message || "Invalid coupon");
      }
    } catch {
      setCouponMsg("Error validating coupon");
    } finally {
      setCouponLoading(false);
    }
  }

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

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id, title: i.title, price: i.price,
            originalPrice: i.originalPrice, image: i.image,
            source: i.source, quantity: i.quantity,
          })),
          customerEmail: email,
          customerName: name,
        }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        setError(data.error || "Stripe checkout failed. Please check your Stripe keys in Vercel settings.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id, title: i.title, price: i.price,
            originalPrice: i.originalPrice, image: i.image,
            source: i.source, quantity: i.quantity,
          })),
          customerEmail: email,
          customerName: name,
        }),
      });
      const data = await res.json();
      if (data.approvalUrl) {
        clearCart();
        window.location.href = data.approvalUrl;
      } else {
        setError(data.error || "PayPal checkout failed. Please check your PayPal keys in Vercel settings.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (paymentMethod === "stripe") {
      handleStripeCheckout();
    } else {
      handlePayPalCheckout();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-6 mt-2" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:text-violet-400">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cart" className="hover:text-violet-400">Cart</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-secondary)" }}>Checkout</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Secure Checkout</h1>
          <Link href="/cart" className="flex items-center gap-2 text-sm hover:text-violet-400 transition-colors" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={16} /> Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact + Payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>1</span>
                Contact Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm focus:ring-2 focus:ring-violet-500/30"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm focus:ring-2 focus:ring-violet-500/30"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Order confirmation will be sent to this email.</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>2</span>
                Payment Method
              </h2>

              {/* Method selector */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {/* Stripe */}
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className="relative p-4 rounded-xl text-left transition-all"
                  style={{
                    background: paymentMethod === "stripe" ? "rgba(124,111,255,0.1)" : "var(--bg-secondary)",
                    border: `2px solid ${paymentMethod === "stripe" ? "var(--accent-primary)" : "var(--border-color)"}`,
                  }}
                >
                  {paymentMethod === "stripe" && (
                    <CheckCircle size={16} className="absolute top-3 right-3 text-violet-400" />
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard size={18} style={{ color: paymentMethod === "stripe" ? "var(--accent-primary)" : "var(--text-muted)" }} />
                    <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Card</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Visa, Mastercard, Amex, Apple Pay</p>
                  <div className="flex gap-1">
                    {["VISA", "MC", "AMEX"].map((c) => (
                      <span key={c} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--bg-primary)", color: "var(--text-muted)" }}>{c}</span>
                    ))}
                  </div>
                </button>

                {/* PayPal */}
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className="relative p-4 rounded-xl text-left transition-all"
                  style={{
                    background: paymentMethod === "paypal" ? "rgba(0,112,240,0.08)" : "var(--bg-secondary)",
                    border: `2px solid ${paymentMethod === "paypal" ? "#0070f0" : "var(--border-color)"}`,
                  }}
                >
                  {paymentMethod === "paypal" && (
                    <CheckCircle size={16} className="absolute top-3 right-3" style={{ color: "#0070f0" }} />
                  )}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-black text-base leading-none" style={{ color: "#003087" }}>Pay</span>
                    <span className="font-black text-base leading-none" style={{ color: "#009cde" }}>Pal</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>PayPal balance, bank, or card</p>
                  <div className="flex gap-1">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--bg-primary)", color: "var(--text-muted)" }}>PAYPAL</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--bg-primary)", color: "var(--text-muted)" }}>VENMO</span>
                  </div>
                </button>
              </div>

              {/* Info box */}
              {paymentMethod === "stripe" ? (
                <div className="rounded-xl p-4" style={{ background: "rgba(124,111,255,0.06)", border: "1px solid rgba(124,111,255,0.2)" }}>
                  <div className="flex items-start gap-3">
                    <Lock size={15} className="text-violet-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      You&apos;ll be redirected to <strong className="text-violet-400">Stripe&apos;s</strong> secure hosted checkout. Your card details are encrypted with 256-bit SSL and never stored on our servers.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl p-4" style={{ background: "rgba(0,112,240,0.06)", border: "1px solid rgba(0,112,240,0.2)" }}>
                  <div className="flex items-start gap-3">
                    <Shield size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#0070f0" }} />
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      You&apos;ll be redirected to <strong style={{ color: "#009cde" }}>PayPal</strong> to complete your payment securely. Pay with your PayPal balance, bank account, or any card — protected by PayPal Buyer Protection.
                    </p>
                  </div>
                </div>
              )}

              {/* Security row */}
              <div className="flex items-center gap-4 text-xs mt-4" style={{ color: "var(--text-muted)" }}>
                <div className="flex items-center gap-1.5"><Lock size={12} className="text-green-400" /><span>256-bit SSL</span></div>
                <div className="flex items-center gap-1.5"><Shield size={12} className="text-green-400" /><span>Buyer Protection</span></div>
                <div className="flex items-center gap-1.5"><Truck size={12} className="text-blue-400" /><span>Free Shipping</span></div>
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
              style={{
                background: loading
                  ? "#555"
                  : paymentMethod === "paypal"
                    ? "linear-gradient(135deg, #003087 0%, #009cde 100%)"
                    : "var(--gradient-primary)",
                boxShadow: paymentMethod === "paypal"
                  ? "0 4px 24px rgba(0,112,240,0.4)"
                  : "0 4px 24px rgba(124,111,255,0.4)",
              }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {paymentMethod === "paypal" ? "Redirecting to PayPal..." : "Redirecting to Stripe..."}
                </>
              ) : (
                <>
                  <Lock size={20} />
                  {paymentMethod === "paypal"
                    ? `Pay £${grandTotal.toFixed(2)} with PayPal`
                    : `Pay £${grandTotal.toFixed(2)} Securely`}
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
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Coupon Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading}
                    className="px-3 py-2 rounded-lg text-sm font-bold text-white transition"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-xs mt-1.5 ${couponValid ? "text-green-400" : "text-red-400"}`}>{couponMsg}</p>
                )}
              </div>
              <div className="border-t pt-4 space-y-2" style={{ borderColor: "var(--border-color)" }}>
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span><span>£{total.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-400">
                    <span className="flex items-center gap-1"><Tag size={12} /> Coupon Discount</span>
                    <span>-£{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><Truck size={12} /> Shipping</span>
                  <span className="text-green-400 font-medium">FREE</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
                  <span>Total</span>
                  <span style={{ color: "var(--accent-primary)" }}>£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-5 p-3 rounded-xl flex items-start gap-2" style={{ background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.2)" }}>
                <Shield size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Payments processed securely by <strong className="text-violet-400">Stripe</strong> or <strong style={{ color: "#009cde" }}>PayPal</strong>. We never store your card details.
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
