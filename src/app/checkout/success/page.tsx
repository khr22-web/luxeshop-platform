"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { CheckCircle, ShoppingBag, Package, Mail, ArrowRight } from "lucide-react";

interface OrderData {
  status: string;
  customerEmail: string;
  customerName: string;
  amountTotal: number;
  currency: string;
  order?: {
    id: string;
    items: Array<{ title: string; quantity: number; price: number }>;
  };
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setOrderData(data);
        if (data.status === "paid") clearCart();
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sessionId, clearCart, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-violet-500 border-violet-500/20 animate-spin mx-auto mb-4" />
          <p style={{ color: "var(--text-muted)" }}>Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/" className="text-violet-400 underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-24 pb-20 max-w-2xl mx-auto px-4">
        {/* Success card */}
        <div className="rounded-3xl p-8 text-center mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          {/* Animated checkmark */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: "rgba(124,111,255,0.15)", border: "2px solid rgba(124,111,255,0.3)" }}>
              <CheckCircle size={48} className="text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Payment Successful!
          </h1>
          <p className="text-lg mb-1" style={{ color: "var(--text-secondary)" }}>
            Thank you{orderData?.customerName ? `, ${orderData.customerName}` : ""}!
          </p>
          <p style={{ color: "var(--text-muted)" }}>
            Your order has been confirmed and is being processed.
          </p>

          {orderData?.order?.id && (
            <div className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-mono" style={{ background: "var(--bg-secondary)", color: "var(--accent-primary)", border: "1px solid var(--border-color)" }}>
              Order ID: {orderData.order.id}
            </div>
          )}
        </div>

        {/* Order details */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Package size={18} style={{ color: "var(--accent-primary)" }} />
            Order Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Amount Paid</span>
              <span className="font-bold" style={{ color: "var(--accent-primary)" }}>
                ${orderData?.amountTotal?.toFixed(2)} {orderData?.currency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Payment Status</span>
              <span className="text-green-400 font-semibold capitalize">{orderData?.status}</span>
            </div>
            {orderData?.customerEmail && (
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Confirmation sent to</span>
                <span style={{ color: "var(--text-secondary)" }}>{orderData.customerEmail}</span>
              </div>
            )}
          </div>

          {orderData?.order?.items && orderData.order.items.length > 0 && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>Items Ordered</p>
              <div className="space-y-2">
                {orderData.order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate max-w-[70%]" style={{ color: "var(--text-muted)" }}>
                      {item.title} × {item.quantity}
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Email notice */}
        <div className="rounded-2xl p-5 mb-8 flex items-start gap-3" style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)" }}>
          <Mail size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-sky-400 mb-1">Confirmation Email Sent</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              A confirmation has been sent to <strong>{orderData?.customerEmail}</strong>. Your order will be fulfilled within 3–7 business days.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/search" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all" style={{ background: "var(--gradient-primary)" }}>
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border transition-all hover:bg-white/5" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            Back to Home
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="w-12 h-12 rounded-full border-4 border-t-violet-500 border-violet-500/20 animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
