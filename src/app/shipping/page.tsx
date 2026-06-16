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
              { icon: Truck, title: "Free Shipping", desc: "On all orders" },
              { icon: Clock, title: "7–20 Days", desc: "Standard delivery" },
              { icon: Globe, title: "Worldwide", desc: "We ship globally" },
              { icon: Shield, title: "Tracked", desc: "Full tracking included" },
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
                title: "Shipping Methods & Timeframes",
                content: [
                  { heading: "Standard Shipping (Free)", body: "Estimated delivery: 7–20 business days. All orders ship via standard international post with full tracking. This is our default and free shipping method available on every order." },
                  { heading: "Express Shipping (£9.99)", body: "Estimated delivery: 3–7 business days. Available at checkout for time-sensitive orders. Express shipping uses priority courier services (DHL, FedEx, or equivalent)." },
                  { heading: "Processing Time", body: "Orders are processed within 1–2 business days of payment confirmation. You will receive a tracking number by email once your order has shipped." },
                ],
              },
              {
                icon: Globe,
                title: "International Shipping",
                content: [
                  { heading: "Countries We Ship To", body: "We ship to over 150 countries worldwide. Shipping availability and estimated delivery times are shown at checkout based on your delivery address." },
                  { heading: "Customs & Import Duties", body: "International orders may be subject to customs duties and import taxes levied by the destination country. These charges are the responsibility of the recipient and are not included in our prices." },
                  { heading: "Restricted Countries", body: "We are unable to ship to certain countries due to trade restrictions. If your country is not available at checkout, please contact us for alternatives." },
                ],
              },
              {
                icon: Clock,
                title: "Order Tracking",
                content: [
                  { heading: "Tracking Number", body: "Once your order ships, you will receive a confirmation email with your tracking number and a link to track your package in real time." },
                  { heading: "Tracking Updates", body: "Tracking information may take 24–48 hours to update after your order has shipped. If your tracking shows no movement for more than 5 business days, please contact our support team." },
                ],
              },
              {
                icon: RefreshCw,
                title: "Returns & Refunds",
                content: [
                  { heading: "Return Window", body: "You have 30 days from the date of delivery to request a return. Items must be unused, in original packaging, and in the same condition as received." },
                  { heading: "How to Return", body: "Contact our support team at support@luxeshop.com with your order number and reason for return. We will provide a prepaid return label for eligible items." },
                  { heading: "Refund Processing", body: "Refunds are processed within 5–10 business days after we receive and inspect the returned item. Refunds are issued to the original payment method." },
                  { heading: "Non-Returnable Items", body: "Certain items cannot be returned for hygiene or safety reasons, including earbuds, underwear, and personalised products. These will be clearly marked on the product page." },
                ],
              },
              {
                icon: AlertCircle,
                title: "Lost or Damaged Packages",
                content: [
                  { heading: "Lost Packages", body: "If your package has not arrived within 30 days of the estimated delivery date, please contact us. We will investigate with the carrier and either reship your order or issue a full refund." },
                  { heading: "Damaged Items", body: "If your item arrives damaged, please take photos and contact us within 48 hours of delivery. We will arrange a replacement or refund at no additional cost to you." },
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
