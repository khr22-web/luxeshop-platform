import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Zap, Shield, Globe, TrendingUp, Users, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(124,111,255,0.15)", color: "var(--accent-primary)", border: "1px solid rgba(124,111,255,0.3)" }}>
            <Zap size={14} />
            About LuxeShop
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            The World&apos;s Most Elegant<br />
            <span className="bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] bg-clip-text text-transparent">Shopping Aggregator</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            LuxeShop brings together the best products from AliExpress and Amazon into one seamless, beautifully designed platform. We make it easy to discover, compare, and buy with confidence.
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "100k+", label: "Curated Products" },
              { value: "Amazon", label: "Trusted Partner" },
              { value: "UK", label: "Focused Market" },
              { value: "100%", label: "Secure Partners" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-2xl p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] bg-clip-text text-transparent">{value}</div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="rounded-2xl p-8 md:p-12" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Our Mission</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              We believe shopping should be simple, curated, and enjoyable. LuxeShop London was built to eliminate the frustration of endlessly scrolling through massive marketplaces to find high-quality products.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              As a premium affiliate aggregator, we hand-pick the best products from trusted suppliers like Amazon. We do the hard work of finding top-rated, trending items so you have a single, beautifully designed destination to discover your next favorite product, before completing your secure purchase directly with our trusted partners.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--text-primary)" }}>Why Choose LuxeShop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Premium Sourcing", desc: "We curate products from the world's most trusted marketplace — Amazon — giving you access to quality items." },
              { icon: Shield, title: "Partner Protection", desc: "Every purchase is completed on our partner's secure platform, giving you their full buyer protection guarantees." },
              { icon: TrendingUp, title: "Trending Products", desc: "We constantly update our catalogs to surface the most popular, highly-demanded products in the UK." },
              { icon: Star, title: "Curated Quality", desc: "We specifically select products with excellent ratings and proven track records of customer satisfaction." },
              { icon: Users, title: "UK Focused", desc: "Our product selection is tailored specifically for the UK market, ensuring fast delivery and relevant sizing." },
              { icon: Zap, title: "Secure Partner Checkout", desc: "Checkout securely using your existing Amazon account, with all your saved payment and delivery details." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(124,111,255,0.15)" }}>
                  <Icon size={20} style={{ color: "var(--accent-primary)" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Ready to Start Shopping?</h2>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>Browse thousands of curated products from Amazon in one beautiful place.</p>
          <Link href="/search" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90" style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 20px rgba(124,111,255,0.4)" }}>
            <Zap size={18} />
            Browse All Products
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
