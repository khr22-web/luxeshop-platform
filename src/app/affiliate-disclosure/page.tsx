import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { DollarSign, ExternalLink, Info, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Affiliate Disclosure | LuxeShop London",
  description: "LuxeShop London Affiliate Disclosure — transparency about our affiliate partnerships with Amazon, AliExpress, and Temu.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-24 pb-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] mb-5">
            <DollarSign className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span className="text-xs font-semibold text-[#c9a84c] tracking-widest uppercase">Transparency</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Affiliate Disclosure
          </h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            We believe in full transparency. Here is everything you need to know about how LuxeShop London earns revenue.
          </p>
          <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
            Last updated: June 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Main Disclosure Box */}
          <div className="rounded-2xl p-8 border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.05)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[rgba(201,168,76,0.15)]">
                <Info className="w-5 h-5 text-[#c9a84c]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Important Notice</h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>LuxeShop London participates in affiliate marketing programmes.</strong> This means that when you click on certain product links on our website and make a purchase, we may earn a small commission at <strong style={{ color: "var(--text-primary)" }}>no additional cost to you</strong>. The price you pay is exactly the same whether or not you use our affiliate link.
                </p>
              </div>
            </div>
          </div>

          {/* Our Partners */}
          <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,111,255,0.15)" }}>
                <ExternalLink className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Our Affiliate Partners</h2>
            </div>
            <div className="space-y-5">
              <div className="p-5 rounded-xl border border-[rgba(255,153,0,0.2)] bg-[rgba(255,153,0,0.05)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📦</span>
                  <h3 className="font-bold text-[#f90]">Amazon Associates (Amazon UK)</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  LuxeShop London is a participant in the <strong style={{ color: "var(--text-secondary)" }}>Amazon Associates Programme</strong>, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk. Our Amazon affiliate tag is <code className="px-1.5 py-0.5 rounded bg-[rgba(255,153,0,0.1)] text-[#f90] text-xs font-mono">luxeshoplondo-21</code>.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[rgba(255,107,53,0.2)] bg-[rgba(255,107,53,0.05)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🛒</span>
                  <h3 className="font-bold text-[#ff6b35]">AliExpress Affiliate Programme</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Some links on our website direct to <strong style={{ color: "var(--text-secondary)" }}>AliExpress</strong> product listings. We may earn a commission through the AliExpress Portals affiliate programme when purchases are made through our links.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[rgba(255,105,0,0.2)] bg-[rgba(255,105,0,0.05)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🛍️</span>
                  <h3 className="font-bold text-[#ff6900]">Temu Affiliate Programme</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  We participate in the <strong style={{ color: "var(--text-secondary)" }}>Temu Affiliate Programme</strong>. Clicking our Temu links and making a purchase may result in us earning a commission. Temu&apos;s prices and products are not affected by our affiliate relationship.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,111,255,0.15)" }}>
                <ShieldCheck className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>How This Affects You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "No Extra Cost", desc: "You pay the exact same price as if you went directly to Amazon, AliExpress, or Temu. Our commission comes from the retailer, not from you." },
                { title: "Honest Recommendations", desc: "Our product curation is based on quality, popularity, and value — not on which products earn us the highest commission." },
                { title: "Your Purchase is Protected", desc: "All purchases are completed on the partner's platform (Amazon, AliExpress, Temu), so you benefit from their full buyer protection and return policies." },
                { title: "Supports Our Platform", desc: "Affiliate commissions help us maintain and improve LuxeShop London, keeping it free to use for everyone." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-4 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--text-primary)" }}>✓ {title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FTC / ASA Compliance */}
          <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,111,255,0.15)" }}>
                <AlertCircle className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Regulatory Compliance</h2>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              This disclosure is made in accordance with the <strong style={{ color: "var(--text-secondary)" }}>UK Advertising Standards Authority (ASA)</strong> guidelines and the <strong style={{ color: "var(--text-secondary)" }}>Competition and Markets Authority (CMA)</strong> requirements for affiliate marketing transparency in the United Kingdom.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We are committed to clearly identifying all affiliate links and sponsored content on our platform. Where a product or page contains affiliate links, this disclosure applies. If you have any questions about our affiliate relationships, please{" "}
              <Link href="/contact" className="underline hover:text-white transition-colors" style={{ color: "var(--accent-primary)" }}>
                contact us
              </Link>.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(124,111,255,0.06)", border: "1px solid rgba(124,111,255,0.2)" }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Questions About Our Affiliates?</h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
              We are happy to answer any questions about our affiliate partnerships and how we earn revenue.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
              Contact Us
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
