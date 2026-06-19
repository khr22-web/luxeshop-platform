"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Menu, X, Search, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import NavbarAuth from "@/components/NavbarAuth";

const navLinks = [
  { href: "/search", label: "All Products" },
  { href: "/category/electronics", label: "Electronics" },
  { href: "/category/fashion", label: "Fashion" },
  { href: "/category/bags", label: "Bags" },
  { href: "/category/gaming", label: "Gaming" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const { count } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const AFFILIATE_TAG = "luxeshoplondo-21";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      const encoded = encodeURIComponent(searchVal.trim());
      window.open(`https://www.amazon.co.uk/s?k=${encoded}&tag=${AFFILIATE_TAG}`, "_blank");
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[rgba(7,8,15,0.95)] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "bg-[rgba(7,8,15,0.7)] backdrop-blur-xl"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.jpg"
              alt="LuxeShop London"
              width={44}
              height={44}
              className="rounded-xl object-contain bg-white p-0.5 shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              priority
            />
            <span className="text-white font-bold text-lg tracking-tight hidden sm:inline">Luxe<span className="text-[#c9a84c]">Shop</span> <span className="text-[#8888aa] font-normal text-sm">London</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-lg text-sm text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all duration-200">
                {l.label}
              </Link>
            ))}
            <Link href="/deals" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-orange-400 hover:text-white hover:bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-200 ml-1">
              <Flame className="w-3.5 h-3.5" />
              Super Deals
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all">
              <Search className="w-[18px] h-[18px]" />
            </button>
            {/* Wishlist */}
            <Link href="/wishlist" className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all">
              <Heart className="w-[18px] h-[18px]" />
            </Link>
            {/* Cart */}
            <Link href="/cart" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all">
              <ShoppingCart className="w-[18px] h-[18px]" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#7c6fff] to-[#38bdf8] text-white text-[9px] font-bold flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            <div className="hidden sm:flex ml-1">
              <NavbarAuth />
            </div>
            <Link href="/checkout" className="hidden sm:flex ml-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg">
              Checkout
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-white/[0.06] pb-3 pt-3">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04]">
                <Search size={15} className="text-[#8888aa]" />
                <input
                  autoFocus
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-[#8888aa]"
                />
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] text-white text-sm font-semibold">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-white/[0.06] mt-1 pt-3 space-y-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all">
                {l.label}
              </Link>
            ))}
            <Link href="/deals" onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 transition-all">
              <Flame className="w-4 h-4" /> 🔥 Super Deals
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#8888aa] hover:text-white hover:bg-white/[0.06] transition-all">
              <ShoppingCart size={16} /> Cart
              {count > 0 && <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7c6fff] to-[#38bdf8]">{count}</span>}
            </Link>
            <div className="pt-2 px-4">
              <Link href="#" className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] text-white text-sm font-semibold text-center">Sign In</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
