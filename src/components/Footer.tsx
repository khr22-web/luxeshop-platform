import { Zap, Globe, Share2, MessageCircle, Mail, Code } from "lucide-react";

const footerLinks = {
  Platform: ["How It Works", "Pricing", "API Access", "Affiliate Program"],
  Sources: ["AliExpress Products", "Amazon Products", "Compare Prices", "Price Alerts"],
  Categories: ["Electronics", "Fashion", "Home & Garden", "Gaming"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

const socialLinks = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Share2, label: "Share", href: "#" },
  { icon: MessageCircle, label: "Chat", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
  { icon: Code, label: "GitHub", href: "#" },
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
              The world&apos;s most elegant shopping aggregator. Discover, compare, and
              buy from AliExpress and Amazon in one seamless experience.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
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
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#8a8a9a] text-sm hover:text-[#c9a84c] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(201,168,76,0.08)] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#4a4a5a] text-xs text-center sm:text-left">
              © 2025 LuxeShop. All rights reserved. Not affiliated with AliExpress or Amazon.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[#4a4a5a] text-xs">
                Built with{" "}
                <span className="text-[#c9a84c]">♥</span>{" "}
                using Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
