import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: "All Products", href: "/search" },
    { label: "🔥 Super Deals", href: "/deals" },
    { label: "💸 Deals Under £20", href: "/under20" },
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
    { label: "Cookie Policy", href: "/privacy" },
    { label: "Buyer Protection", href: "/about" },
  ],
};

// Real SVG social media icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.166.006c.088 0 .175.003.262.006 1.43.044 5.26.507 7.007 4.508.602 1.373.457 3.705.34 5.604-.02.322-.039.635-.053.933.19.1.432.17.73.17.28 0 .57-.063.862-.188.13-.055.267-.083.406-.083.27 0 .527.09.724.254.23.19.355.454.348.73-.013.524-.487.96-1.406 1.295-.097.036-.21.072-.334.11-.42.13-.998.308-1.16.657-.09.193-.055.45.103.762.01.02 1.01 2.1 3.11 2.497.22.042.378.233.378.457 0 .05-.008.1-.024.148-.22.667-1.45 1.16-3.758 1.507-.05.007-.1.03-.135.068-.04.044-.057.1-.05.16.03.22.07.44.11.67.06.33.12.67.15 1.01.02.19-.11.37-.3.42-.05.01-.1.02-.15.02-.18 0-.37-.08-.58-.17-.35-.15-.78-.34-1.41-.34-.19 0-.39.02-.6.05-.6.1-1.13.46-1.7.84-.82.55-1.76 1.17-3.15 1.17h-.07c-1.39 0-2.33-.62-3.15-1.17-.57-.38-1.1-.74-1.7-.84-.21-.03-.41-.05-.6-.05-.63 0-1.06.19-1.41.34-.21.09-.4.17-.58.17-.05 0-.1-.01-.15-.02-.19-.05-.32-.23-.3-.42.03-.34.09-.68.15-1.01.04-.23.08-.45.11-.67.007-.06-.01-.116-.05-.16-.035-.038-.085-.061-.135-.068-2.308-.347-3.538-.84-3.758-1.507-.016-.048-.024-.098-.024-.148 0-.224.158-.415.378-.457 2.1-.397 3.1-2.477 3.11-2.497.158-.312.193-.569.103-.762-.162-.349-.74-.527-1.16-.657-.124-.038-.237-.074-.334-.11C.487 13.24.013 12.804 0 12.28c-.007-.276.118-.54.348-.73.197-.164.454-.254.724-.254.139 0 .276.028.406.083.292.125.582.188.862.188.298 0 .54-.07.73-.17-.014-.298-.033-.611-.053-.933-.117-1.899-.262-4.231.34-5.604C4.104.513 7.934.05 9.364.006c.087-.003.174-.006.262-.006h.54z"/>
    </svg>
  );
}

const socialLinks = [
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/luxeshoplondon", color: "#E1306C" },
  { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/luxeshoplondon", color: "#1877F2" },
  { Icon: TwitterXIcon, label: "X / Twitter", href: "https://twitter.com/luxeshoplondon", color: "#ffffff" },
  { Icon: YouTubeIcon, label: "YouTube", href: "https://www.youtube.com/@luxeshoplondon", color: "#FF0000" },
  { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@luxeshoplondon", color: "#ffffff" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-[rgba(201,168,76,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.jpg"
                alt="LuxeShop London"
                width={48}
                height={48}
                className="rounded-xl object-contain bg-white p-0.5 shadow-md"
              />
              <span className="text-xl font-bold">
                <span className="text-[#c9a84c]">Luxe</span>
                <span className="text-white">Shop</span>
                <span className="text-[#8a8a9a] font-normal text-sm ml-1">London</span>
              </span>
            </div>
            <p className="text-[#8a8a9a] text-sm leading-relaxed mb-6 max-w-xs">
              The UK&apos;s premier luxury shopping destination. Discover, compare, and
              buy from top brands — with free delivery and buyer protection on every order.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="mailto:support@luxeshoplondon.co.uk"
                aria-label="Email"
                title="Email Us"
                className="w-9 h-9 rounded-lg border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(201,168,76,0.5)] text-[#c9a84c]"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/luxeshoplondon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                title="Follow us on X"
                className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(255,255,255,0.3)] text-white"
              >
                <TwitterXIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@infoluxeshop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="Subscribe on YouTube"
                className="w-9 h-9 rounded-lg border border-[rgba(255,0,0,0.2)] bg-[rgba(255,0,0,0.05)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(255,0,0,0.5)] text-[#FF0000]"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@info.luxe.shop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="Follow us on TikTok"
                className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(255,255,255,0.3)] text-white"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1FQ3o13GnQ/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-9 h-9 rounded-lg border border-[rgba(24,119,242,0.2)] bg-[rgba(24,119,242,0.05)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(24,119,242,0.5)] text-[#1877F2]"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/luxeshoplondonuk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-9 h-9 rounded-lg border border-[rgba(225,48,108,0.2)] bg-[rgba(225,48,108,0.05)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(225,48,108,0.5)] text-[#E1306C]"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://snapchat.com/t/WXdXk8as"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                title="Add us on Snapchat"
                className="w-9 h-9 rounded-lg border border-[rgba(255,252,0,0.2)] bg-[rgba(255,252,0,0.05)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(255,252,0,0.5)] text-[#FFFC00]"
              >
                <SnapchatIcon className="w-4 h-4" />
              </a>
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
              <div className="w-7 h-7 rounded-full bg-[#EB001B]" />
              <div className="w-7 h-7 rounded-full bg-[#F79E1B] -ml-3 opacity-90" />
            </div>
            {/* PayPal */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-white flex items-center justify-center h-10 min-w-[72px]">
              <span className="font-black text-[#003087] text-sm">Pay</span>
              <span className="font-black text-[#009CDE] text-sm">Pal</span>
            </div>
            {/* Apple Pay */}
            <div className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-black flex items-center justify-center h-10 min-w-[80px]">
              <svg viewBox="0 0 50 20" className="h-5 w-auto">
                <text x="0" y="15" fill="white" fontSize="14" fontFamily="system-ui" fontWeight="500"> Pay</text>
              </svg>
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
