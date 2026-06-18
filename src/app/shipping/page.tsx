import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Truck, Clock, Globe, Shield, RefreshCw, AlertCircle } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Shipping <span className="bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              Everything you need to know about how we ship your orders.
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Last updated: June 2026</p>
          </div>

          {/* Quick summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Truck, title: "Partner Shipping", desc: "Fulfilled by Amazon" },
              { icon: Clock, title: "Fast Delivery", desc: "Prime available" },
              { icon: Globe, title: "UK Focused", desc: "Ships to UK & beyond" },
              { icon: Shield, title: "Tracked", desc: "Via partner platform" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(124,111,255,0.15)" }}>
                  <Icon size={18} style={{ color: "var(--accent-primary)" }} />
                </div>
                <div className="font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{title}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Policy sections */}
          <div className="space-y-6">
            {[
              {
                icon: Truck,
                title: "Shipping & Fulfillment",
                content: [
                  { heading: "Partner Fulfillment", body: "As an affiliate aggregator, LuxeShop London curates products but does not ship them directly. All orders are fulfilled by our trusted partners (primarily Amazon.co.uk)." },
                  { heading: "Shipping Options", body: "Shipping methods, costs, and timeframes are determined by the partner seller. You will see all available shipping options (including Prime delivery if applicable) during checkout on the partner's website." },
                  { heading: "Processing Time", body: "Orders are processed according to the partner's timeline, typically within 1–2 business days. You will receive shipping confirmation directly from the partner." },
                ],
              },
              {
                icon: Globe,
                title: "Delivery Locations",
                content: [
                  { heading: "UK Delivery", body: "Most products featured on LuxeShop London are specifically selected for fast, reliable delivery within the United Kingdom." },
                  { heading: "International Shipping", body: "International shipping availability is determined by the individual seller on the partner platform. Please check the shipping details on the partner's website before completing your purchase." },
                ],
              },
              {
                icon: Clock,
                title: "Order Tracking",
                content: [
                  { heading: "Tracking Your Order", body: "Once your order is placed on the partner's website, you can track its progress directly through your account on their platform (e.g., your Amazon Orders page)." },
                  { heading: "Tracking Notifications", body: "The partner platform will send you tracking updates via email or app notifications according to their standard procedures." },
                ],
              },
              {
                icon: RefreshCw,
                title: "Returns & Refunds",
                content: [
                  { heading: "Return Policy", body: "All returns and refunds are subject to the policies of the partner platform where you completed your purchase. Our partners generally offer robust 14-day to 30-day return windows." },
                  { heading: "How to Return", body: "To initiate a return, please log into your account on the partner's website (e.g., Amazon.co.uk) and follow their standard return process." },
                  { heading: "Refund Processing", body: "Refunds are processed by the partner platform directly to your original payment method, according to their timeline." },
                ],
              },
              {
                icon: AlertCircle,
                title: "Customer Support",
                content: [
                  { heading: "Order Issues", body: "For any issues regarding delayed, lost, or damaged packages, please contact the customer support team of the partner platform where the purchase was made." },
                  { heading: "Platform Assistance", body: "If you need help navigating LuxeShop London or have questions about our curation, our team is always here to help." },
                ],
              },
            ].map(({ icon: Icon, title, content }) => (
              <div key={title} className="rounded-2xl p-6 md:p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,111,255,0.15)" }}>
                    <Icon size={18} style={{ color: "var(--accent-primary)" }} />
                  </div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{title}</h2>
                </div>
                <div className="space-y-4">
                  {content.map(({ heading, body }) => (
                    <div key={heading}>
                      <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{heading}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.2)" }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Still have questions?</h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
              Our support team is available Monday–Friday, 9am–6pm GMT.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
