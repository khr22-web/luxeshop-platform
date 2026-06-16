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
  paymentMethod?: string;
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
  const paypalOrderId = searchParams.get("token"); // PayPal returns ?token=ORDER_ID
  const method = searchParams.get("method"); // "paypal" if redirected from PayPal

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ── Stripe flow ──────────────────────────────────────────────────────────
    if (sessionId) {
      fetch(`/api/checkout/verify?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setOrderData({ ...data, paymentMethod: "stripe" });
          if (data.status === "paid") clearCart();
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
      return;
    }

    // ── PayPal flow ──────────────────────────────────────────────────────────
    if (paypalOrderId || method === "paypal") {
      const orderId = paypalOrderId || "";
      if (!orderId) {
        // PayPal returned without token — show generic success
        setOrderData({
          status: "paid",
          customerEmail: "",
          customerName: "",
          amountTotal: 0,
          currency: "USD",
          paymentMethod: "paypal",
        });
        clearCart();
        setLoading(false);
        return;
      }

      // Capture the PayPal order
      fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setOrderData({
            status: "paid",
            customerEmail: data.order?.customerEmail || "",
            customerName: data.order?.customerName || "",
            amountTotal: data.order?.subtotal || 0,
            currency: "USD",
            paymentMethod: "paypal",
            order: data.order
              ? {
                  id: data.order.id,
                  items: data.order.items || [],
                }
              : undefined,
          });
          clearCart();
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
      return;
    }

    // No session or PayPal token — redirect home
    router.replace("/");
  }, [sessionId, paypalOrderId, method, clearCart, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-violet-500 border-violet-500/20 animate-spin mx-auto mb-4" />
          <p style={{ color: "var(--text-muted)" }}>Confirming your payment...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2 text-red-400">Payment verification failed</h2>
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>{error}</p>
          <Link href="/" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
            Go Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isPayPal = orderData?.paymentMethod === "paypal";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-24 pb-20 max-w-2xl mx-auto px-4">
        {/* Success card */}
        <div className="rounded-3xl p-8 text-center mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: isPayPal ? "linear-gradient(135deg,#003087,#009cde)" : "var(--gradient-primary)" }} />
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: isPayPal ? "rgba(0,112,240,0.15)" : "rgba(124,111,255,0.15)",
                border: `2px solid ${isPayPal ? "rgba(0,112,240,0.3)" : "rgba(124,111,255,0.3)"}`,
              }}
            >
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

          {/* Payment method badge */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: isPayPal ? "rgba(0,112,240,0.12)" : "rgba(124,111,255,0.12)",
                color: isPayPal ? "#009cde" : "var(--accent-primary)",
                border: `1px solid ${isPayPal ? "rgba(0,112,240,0.3)" : "rgba(124,111,255,0.3)"}`,
              }}
            >
              {isPayPal ? "Paid via PayPal" : "Paid via Stripe"}
            </span>
          </div>

          {orderData?.order?.id && (
            <div className="mt-3 inline-block px-4 py-2 rounded-xl text-sm font-mono" style={{ background: "var(--bg-secondary)", color: "var(--accent-primary)", border: "1px solid var(--border-color)" }}>
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
            {orderData?.amountTotal ? (
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Amount Paid</span>
                <span className="font-bold" style={{ color: "var(--accent-primary)" }}>
                  ${orderData.amountTotal.toFixed(2)} {orderData.currency}
                </span>
              </div>
            ) : null}
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
        {orderData?.customerEmail && (
          <div className="rounded-2xl p-5 mb-8 flex items-start gap-3" style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)" }}>
            <Mail size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-sky-400 mb-1">Confirmation Email Sent</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                A confirmation has been sent to <strong>{orderData.customerEmail}</strong>. Your order will be fulfilled within 3–7 business days.
              </p>
            </div>
          </div>
        )}

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
