"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area,
} from "recharts";
import {
  DollarSign, ShoppingBag, TrendingUp, Users, Package, RefreshCw,
  LogOut, Eye, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp,
  LayoutDashboard, Settings,
} from "lucide-react";

interface Order {
  id: string;
  sessionId: string;
  customerEmail: string;
  customerName: string;
  items: Array<{ id: string; title: string; price: number; quantity: number; image: string; source: string }>;
  subtotal: number;
  profit: number;
  status: "pending" | "paid" | "fulfilled" | "refunded";
  createdAt: string;
  paidAt?: string;
  currency: string;
  paymentMethod: string;
}

interface Stats {
  totalRevenue: number;
  totalProfit: number;
  totalOrders: number;
  avgOrderValue: number;
  revenueByDay: Record<string, number>;
  topProducts: Array<{ id: string; title: string; qty: number; revenue: number; image: string }>;
  recentOrders: Order[];
  allOrders: Order[];
}

// Empty state for when no real orders exist
const DEMO_STATS: Stats = {
  totalRevenue: 0,
  totalProfit: 0,
  totalOrders: 0,
  avgOrderValue: 0,
  revenueByDay: (() => {
    const days: Record<string, number> = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = 0;
    }
    return days;
  })(),
  topProducts: [],
  recentOrders: [],
  allOrders: [],
};

const STATUS_CONFIG = {
  paid: { label: "Paid", color: "#10b981", bg: "rgba(16,185,129,0.15)", icon: CheckCircle },
  fulfilled: { label: "Fulfilled", color: "#7c6fff", bg: "rgba(124,111,255,0.15)", icon: Package },
  pending: { label: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: Clock },
  refunded: { label: "Refunded", color: "#ef4444", bg: "rgba(239,68,68,0.15)", icon: XCircle },
};

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "orders">("overview");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-secret": "luxeshop-admin-2026" },
      });
      if (res.ok) {
        const data = await res.json();
        // Merge real data with demo if no real orders
        if (data.totalOrders === 0) {
          setStats(DEMO_STATS);
        } else {
          setStats(data);
        }
      } else {
        setStats(DEMO_STATS);
      }
    } catch {
      setStats(DEMO_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        fetchStats();
      } else {
        setLoginError("Incorrect password. Try: LuxeAdmin@2026");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setStats(null);
  };

  // Check if already logged in via cookie
  useEffect(() => {
    fetch("/api/admin/orders", { headers: { "x-admin-secret": "luxeshop-admin-2026" } })
      .then((r) => {
        if (r.ok) { setAuthed(true); fetchStats(); }
      })
      .catch(() => {});
  }, [fetchStats]);

  const chartData = stats
    ? Object.entries(stats.revenueByDay).map(([date, revenue]) => ({
        date: date.slice(5), // MM-DD
        revenue: Number(revenue.toFixed(2)),
      }))
    : [];

  const filteredOrders = stats
    ? (stats.allOrders.length > 0 ? stats.allOrders : stats.recentOrders).filter(
        (o) => statusFilter === "all" || o.status === statusFilter
      )
    : [];

  // ─── LOGIN SCREEN ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-primary)" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <LayoutDashboard size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Admin Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>LuxeShop — Sales & Analytics</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl outline-none text-sm mb-4"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
            />
            {loginError && <p className="text-red-400 text-xs mb-3">{loginError}</p>}
            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            >
              {loginLoading ? "Logging in..." : "Access Dashboard"}
            </button>
            <Link href="/" className="block text-center text-xs mt-4 hover:text-violet-400" style={{ color: "var(--text-muted)" }}>
              ← Back to LuxeShop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b px-6 py-4 flex items-center justify-between" style={{ background: "rgba(7,8,15,0.95)", backdropFilter: "blur(12px)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <span className="font-bold" style={{ color: "var(--text-primary)" }}>LuxeShop Admin</span>
            <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>Live</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchStats} disabled={loading} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/10" style={{ color: "var(--text-muted)", border: "1px solid var(--border-color)" }}>
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <Link href="/" className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/10" style={{ color: "var(--text-muted)", border: "1px solid var(--border-color)" }}>
            <Eye size={12} />
            View Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-red-400 transition-all hover:bg-red-500/10" style={{ border: "1px solid rgba(239,68,68,0.3)" }}>
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          {(["overview", "orders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={{
                background: activeTab === tab ? "var(--gradient-primary)" : "transparent",
                color: activeTab === tab ? "white" : "var(--text-muted)",
              }}
            >
              {tab === "overview" ? "📊 Overview" : "📦 Orders"}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && stats && (
          <>
            {/* Affiliate Portals Quick Access */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>📊 Affiliate Earnings Dashboard</h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Since all sales are processed directly through Amazon and AliExpress, click below to view your real-time earnings and performance reports.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Amazon Associates */}
                <a
                  href="https://affiliate-program.amazon.co.uk/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #ff9900 0%, #e47911 100%)", textDecoration: "none" }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/20 flex-shrink-0">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Amazon Associates</p>
                    <p className="text-white/80 text-sm">View earnings & reports</p>
                    <p className="text-white/60 text-xs mt-1">Tag: luxeshoplondo-21</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-white/80 text-2xl">→</span>
                  </div>
                </a>

                {/* AliExpress Affiliate */}
                <a
                  href="https://portals.aliexpress.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #e43225 0%, #c0392b 100%)", textDecoration: "none" }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/20 flex-shrink-0">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">AliExpress Affiliate</p>
                    <p className="text-white/80 text-sm">View commissions & stats</p>
                    <p className="text-white/60 text-xs mt-1">Portals Dashboard</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-white/80 text-2xl">→</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Amazon Reports", url: "https://affiliate-program.amazon.co.uk/home/reports", icon: "📈", color: "#ff9900" },
                { label: "Amazon Payments", url: "https://affiliate-program.amazon.co.uk/home/account", icon: "💰", color: "#10b981" },
                { label: "AliExpress Stats", url: "https://portals.aliexpress.com/affiportals/web/portals.htm", icon: "📊", color: "#e43225" },
                { label: "View Live Site", url: "https://luxeshoplondon.co.uk", icon: "🌍", color: "#7c6fff" },
              ].map(({ label, url, icon, color }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-[1.03]"
                  style={{ background: "var(--bg-card)", border: `1px solid ${color}40`, textDecoration: "none" }}
                >
                  <span className="text-3xl">{icon}</span>
                  <p className="text-xs font-semibold text-center" style={{ color }}>{label}</p>
                </a>
              ))}
            </div>

            {/* Info note */}
            <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.2)" }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#7c6fff" }}>How Your Earnings Work</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>When a visitor clicks "Buy Now" on LuxeShop London and completes a purchase on Amazon UK, your affiliate commission (typically 1–10% depending on category) is automatically credited to your Amazon Associates account under tag <strong style={{ color: "var(--text-secondary)" }}>luxeshoplondo-21</strong>. Payments are issued monthly by Amazon directly to your bank account.</p>
                </div>
              </div>
            </div>


          </>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === "orders" && stats && (
          <>
            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {["all", "paid", "fulfilled", "pending", "refunded"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
                  style={{
                    background: statusFilter === s ? (s === "all" ? "var(--gradient-primary)" : STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.bg || "var(--gradient-primary)") : "var(--bg-card)",
                    color: statusFilter === s ? (s === "all" ? "white" : STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.color || "white") : "var(--text-muted)",
                    border: `1px solid ${statusFilter === s ? "transparent" : "var(--border-color)"}`,
                  }}
                >
                  {s === "all" ? `All (${(stats.allOrders.length || stats.recentOrders.length)})` : `${STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.label} (${(stats.allOrders.length > 0 ? stats.allOrders : stats.recentOrders).filter((o) => o.status === s).length})`}
                </button>
              ))}
            </div>

            {/* Orders list */}
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-16 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <Package size={48} className="mx-auto mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
                  <p style={{ color: "var(--text-muted)" }}>No orders found</p>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const cfg = STATUS_CONFIG[order.status];
                  const isExpanded = expandedOrder === order.id;
                  return (
                    <div key={order.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                      <button
                        className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-all"
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                          <cfg.icon size={16} style={{ color: cfg.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{order.id}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {order.customerEmail} · {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 mr-2">
                          <p className="font-bold" style={{ color: "var(--accent-primary)" }}>${order.subtotal.toFixed(2)}</p>
                          <p className="text-xs text-green-400">+${order.profit.toFixed(2)} profit</p>
                        </div>
                        {isExpanded ? <ChevronUp size={16} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                          <div className="pt-4 space-y-3">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                              <div><p style={{ color: "var(--text-muted)" }}>Customer</p><p className="font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>{order.customerName}</p></div>
                              <div><p style={{ color: "var(--text-muted)" }}>Email</p><p className="font-medium mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>{order.customerEmail}</p></div>
                              <div><p style={{ color: "var(--text-muted)" }}>Payment</p><p className="font-medium mt-0.5 capitalize" style={{ color: "var(--text-secondary)" }}>{order.paymentMethod}</p></div>
                              <div><p style={{ color: "var(--text-muted)" }}>Currency</p><p className="font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>{order.currency}</p></div>
                            </div>
                            <div className="pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
                              <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Items</p>
                              <div className="space-y-2">
                                {order.items.map((item, i) => (
                                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-secondary)" }}>
                                    <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="32px" unoptimized />
                                    </div>
                                    <span className="flex-1 text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.title}</span>
                                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>×{item.quantity}</span>
                                    <span className="text-xs font-bold" style={{ color: "var(--accent-primary)" }}>${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
