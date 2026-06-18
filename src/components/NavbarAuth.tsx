"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarAuth() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user || null);
    }
    load();
    window.addEventListener("auth-change", load);
    return () => window.removeEventListener("auth-change", load);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="text-sm text-gray-400 hover:text-purple-300 transition px-3 py-1.5 rounded-lg hover:bg-purple-900/20">
          Sign In
        </Link>
        <Link href="/register" className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition font-medium">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-purple-900/20"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block max-w-[100px] truncate">{user.name}</span>
        <span className="text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a2e] border border-purple-900/30 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-purple-900/20">
            <p className="text-white text-sm font-medium truncate">{user.name}</p>
            <p className="text-gray-500 text-xs truncate">{user.email}</p>
          </div>
          <Link href="/account/orders" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-900/20 hover:text-white transition">
            📦 My Orders
          </Link>
          <Link href="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-900/20 hover:text-white transition">
            ♥ Wishlist
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition text-left">
            ↩ Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
