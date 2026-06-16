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
              { value: "50,000+", label: "Products Listed" },
              { value: "2", label: "Trusted Sources" },
              { value: "20%", label: "Avg. Profit Margin" },
              { value: "100%", label: "Secure Checkout" },
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
              We believe shopping should be simple, transparent, and enjoyable. LuxeShop was built to eliminate the frustration of jumping between multiple platforms to find the best product at the best price.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              By aggregating products from AliExpress and Amazon, we give you a single destination to discover trending items, compare options, and purchase with confidence — all with a 20% markup that funds our platform and ensures you always get genuine buyer protection.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--text-primary)" }}>Why Choose LuxeShop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Global Sourcing", desc: "We source products from the world's largest marketplaces — AliExpress and Amazon — giving you access to millions of items." },
              { icon: Shield, title: "Buyer Protection", desc: "Every purchase comes with full buyer protection. If your item doesn't arrive or isn't as described, we've got you covered." },
              { icon: TrendingUp, title: "Trending Products", desc: "Our algorithm surfaces the most popular, highest-rated products in real time so you never miss a deal." },
              { icon: Star, title: "Curated Quality", desc: "We only list products with verified ratings above 4.0 and thousands of real customer orders." },
              { icon: Users, title: "Community Driven", desc: "Real reviews from real buyers. Our community helps surface the best products and flag any issues." },
              { icon: Zap, title: "Instant Checkout", desc: "Seamless Stripe-powered checkout. Pay securely in seconds with your card, Apple Pay, or Google Pay." },
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
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>Browse thousands of products from AliExpress and Amazon in one place.</p>
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
