"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import NavbarAuth from "@/components/NavbarAuth";

const navLinks = [
  { href: "/search", label: "All Products" },
  {
    label: "Categories",
    children: [
      { href: "/category/electronics", label: "Electronics" },
      { href: "/category/fashion", label: "Fashion" },
      { href: "/category/bags", label: "Bags & Handbags" },
      { href: "/category/gaming", label: "Gaming" },
      { href: "/category/home-garden", label: "Home & Garden" },
      { href: "/category/sports", label: "Sports" },
      { href: "/category/beauty", label: "Beauty" },
      { href: "/category/watches", label: "Watches" },
    ],
  },
  { href: "/deals", label: "🔥 Super Deals" },
  { href: "/under20", label: "💸 Under £20" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { count } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const AFFILIATE_TAG = "luxeshoplondo-21";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#1a1a2e] text-white text-xs text-center py-2 px-4 font-medium tracking-wide">
        🚚 Free UK Delivery on orders over £30 &nbsp;|&nbsp; Up to 70% off today&apos;s Super Deals
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-white border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="LuxeShop London"
                width={40}
                height={40}
                className="rounded-lg object-contain shadow-sm"
                priority
              />
              <div className="hidden sm:block">
                <span className="text-[#1a1a2e] font-black text-lg tracking-tight">Luxe<span className="text-[#c9a84c]">Shop</span></span>
                <span className="block text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-1">London</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              <Link href="/search" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#1a1a2e] hover:bg-gray-50 transition-all">
                All Products
              </Link>

              {/* Categories dropdown */}
              <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#1a1a2e] hover:bg-gray-50 transition-all">
                  Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {navLinks[1].children?.map((item) => (
                      <Link key={item.href} href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a1a2e] transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/deals" className="px-4 py-2 rounded-lg text-sm font-bold text-orange-600 hover:bg-orange-50 transition-all">
                🔥 Super Deals
              </Link>
              <Link href="/under20" className="px-4 py-2 rounded-lg text-sm font-bold text-purple-600 hover:bg-purple-50 transition-all">
                💸 Under £20
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 transition-all"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 transition-all">
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 transition-all">
                <ShoppingCart className="w-[18px] h-[18px]" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#1a1a2e] text-white text-[9px] font-bold flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </Link>

              {/* Auth */}
              <div className="hidden sm:flex ml-1">
                <NavbarAuth />
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout" className="hidden sm:flex ml-1 px-4 py-2 rounded-lg bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#0f3460] transition-colors shadow-sm">
                Checkout
              </Link>

              {/* Mobile menu toggle */}
              <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 transition-all">
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="border-t border-gray-100 py-3">
              <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#1a1a2e] focus-within:bg-white transition-all">
                  <Search size={15} className="text-gray-400" />
                  <input
                    autoFocus
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search products, brands, categories..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#0f3460] transition-colors">
                  Search
                </button>
              </form>
            </div>
          )}

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-1 pt-3 space-y-1">
              <Link href="/search" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-all">
                All Products
              </Link>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</div>
              {navLinks[1].children?.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a2e] transition-all rounded-lg">
                  {item.label}
                </Link>
              ))}
              <Link href="/deals" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-orange-600 bg-orange-50 transition-all">
                🔥 Super Deals
              </Link>
              <Link href="/under20" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-purple-600 bg-purple-50 transition-all">
                💸 Deals Under £20
              </Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-all">
                <ShoppingCart size={16} /> Cart
                {count > 0 && <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-[#1a1a2e]">{count}</span>}
              </Link>
              <div className="pt-2 px-4">
                <Link href="/checkout" className="block w-full py-2.5 rounded-xl bg-[#1a1a2e] text-white text-sm font-semibold text-center hover:bg-[#0f3460] transition-colors">
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
