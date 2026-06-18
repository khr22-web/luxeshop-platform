"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderItem { title: string; quantity: number; price: number; image: string; }
interface Order {
  id: string; status: string; createdAt: string; subtotal: number;
  currency: string; paymentMethod: string; items: OrderItem[];
  customerName: string; customerEmail: string;
}

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-900/40 text-green-400 border-green-700",
  pending: "bg-yellow-900/40 text-yellow-400 border-yellow-700",
  fulfilled: "bg-blue-900/40 text-blue-400 border-blue-700",
  refunded: "bg-red-900/40 text-red-400 border-red-700",
};

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user) { router.push("/login"); return; }
      setUser(meData.user);
      const ordRes = await fetch("/api/account/orders");
      const ordData = await ordRes.json();
      setOrders(ordData.orders || []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-purple-400 text-lg">Loading your orders...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Orders</h1>
            <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/wishlist" className="bg-purple-900/30 border border-purple-700/50 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-900/50 transition text-sm">
              My Wishlist
            </Link>
            <button onClick={handleLogout} className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-2 rounded-lg hover:bg-red-900/50 transition text-sm">
              Sign Out
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
            <Link href="/" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-purple-300 text-sm">{order.id.slice(-12).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-white font-bold">£{order.subtotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment</p>
                    <p className="text-gray-300 text-sm capitalize">{order.paymentMethod}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${STATUS_COLORS[order.status] || "bg-gray-900 text-gray-400 border-gray-700"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="border-t border-purple-900/20 pt-4 space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{item.title}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity} × £{item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-purple-300 text-sm font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
