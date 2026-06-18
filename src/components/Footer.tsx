import Link from "next/link";
import { Zap, Mail, Share2, MessageCircle, Globe, Heart } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: "All Products", href: "/search" },
    { label: "Electronics", href: "/category/electronics" },
    { label: "Fashion", href: "/category/fashion" },
    { label: "Gaming", href: "/category/gaming" },
    { label: "Watches", href: "/category/watches" },
  ],
  Support: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Refunds", href: "/shipping" },
    { label: "Track Your Order", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy" },
    { label: "Buyer Protection", href: "/about" },
  ],
};

const socialLinks = [
  { icon: Globe, label: "Instagram", href: "https://www.instagram.com/luxeshoplondon" },
  { icon: Share2, label: "Facebook", href: "https://www.facebook.com/luxeshoplondon" },
  { icon: MessageCircle, label: "X / Twitter", href: "https://twitter.com/luxeshoplondon" },
  { icon: Heart, label: "YouTube", href: "https://www.youtube.com/@luxeshoplondon" },
  { icon: Mail, label: "Email", href: "mailto:support@luxeshoplondon.co.uk" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-[rgba(201,168,76,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#9a7a2e] flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" fill="currentColor" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gold-gradient">Luxe</span>
                <span className="text-white">Shop</span>
              </span>
            </div>
            <p className="text-[#8a8a9a] text-sm leading-relaxed mb-6 max-w-xs">
              The UK&apos;s premier luxury shopping destination. Discover, compare, and
              buy from top brands — with free delivery and buyer protection on every order.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[rgba(201,168,76,0.15)] flex items-center justify-center text-[#4a4a5a] hover:text-[#c9a84c] hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.05)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[#8a8a9a] text-sm hover:text-[#c9a84c] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-[rgba(201,168,76,0.08)] pt-8 mb-8">
          <p className="text-[#4a4a5a] text-xs text-center mb-4 uppercase tracking-widest">Secure Payments Accepted</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Visa */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-white flex items-center justify-center h-10 min-w-[60px]">
              <span className="font-black text-[#1A1F71] text-base tracking-wider">VISA</span>
            </div>
            {/* Mastercard */}
            <div className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-white flex items-center justify-center h-10 min-w-[60px] gap-1">
              <div className="w-7 h-7 rounded-full bg-[#EB001B] opacity-90" />
              <div className="w-7 h-7 rounded-full bg-[#F79E1B] opacity-90 -ml-3" />
            </div>
            {/* PayPal */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-white flex items-center justify-center h-10 min-w-[72px]">
              <span className="font-black text-[#003087] text-sm">Pay</span>
              <span className="font-black text-[#009CDE] text-sm">Pal</span>
            </div>
            {/* Apple Pay */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-black flex items-center justify-center h-10 min-w-[80px]">
              <span className="text-white text-sm font-semibold tracking-tight"> Pay</span>
            </div>
            {/* Google Pay */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-white flex items-center justify-center h-10 min-w-[80px]">
              <span className="text-sm font-medium">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#34A853]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#EA4335]">g</span>
                <span className="text-[#4285F4]">le </span>
                <span className="text-[#5F6368]">Pay</span>
              </span>
            </div>
            {/* Stripe */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#635BFF] flex items-center justify-center h-10 min-w-[60px]">
              <span className="text-white text-sm font-bold tracking-wide">stripe</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(201,168,76,0.08)] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#4a4a5a] text-xs text-center sm:text-left">
              © 2025 LuxeShop London Ltd. All rights reserved. Registered in England &amp; Wales.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#4a4a5a]">
              <Link href="/privacy" className="hover:text-[#c9a84c] transition-colors">Privacy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-[#c9a84c] transition-colors">Terms</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-[#c9a84c] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
