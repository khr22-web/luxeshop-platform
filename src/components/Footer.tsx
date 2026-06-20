import Link from "next/link";
import Image from "next/image";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: "All Products", href: "/search" },
    { label: "Super Deals", href: "/deals" },
    { label: "Under £20", href: "/under20" },
    { label: "Electronics", href: "/category/electronics" },
    { label: "Fashion", href: "/category/fashion" },
    { label: "Gaming", href: "/category/gaming" },
    { label: "Watches", href: "/category/watches" },
    { label: "Bags & Handbags", href: "/category/bags" },
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
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Cookie Policy", href: "/privacy" },
    { label: "Buyer Protection", href: "/about" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/luxeshoplondonuk", icon: "IG" },
  { label: "TikTok", href: "https://www.tiktok.com/@luxeshoplondon", icon: "TT" },
  { label: "Facebook", href: "https://www.facebook.com/luxeshoplondon", icon: "FB" },
  { label: "X / Twitter", href: "https://x.com/luxeshoplondon", icon: "X" },
  { label: "YouTube", href: "https://www.youtube.com/@luxeshoplondon", icon: "YT" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Image
                src="/logo.jpg"
                alt="LuxeShop London"
                width={40}
                height={40}
                className="rounded-lg object-contain bg-white p-0.5"
              />
              <div>
                <span className="text-white font-black text-lg">Luxe<span className="text-[#c9a84c]">Shop</span></span>
                <span className="block text-[10px] text-gray-500 font-medium tracking-widest uppercase -mt-1">London</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your premium UK shopping aggregator. Curating the best deals from Amazon, AliExpress, and Temu — all in one place.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-gray-400 hover:text-white transition-all text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate notice */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-[11px] text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
            <strong className="text-gray-500">Affiliate Disclosure:</strong> LuxeShop London participates in the Amazon Associates Programme and other affiliate programmes. We may earn a commission when you click our links and make a purchase, at no extra cost to you.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-xs">
              © 2025 LuxeShop London Ltd. All rights reserved. Registered in England & Wales.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
              <span>·</span>
              <Link href="/affiliate-disclosure" className="hover:text-gray-300 transition-colors">Affiliate Disclosure</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
