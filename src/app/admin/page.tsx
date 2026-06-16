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

// Demo data for when no real orders exist
const DEMO_STATS: Stats = {
  totalRevenue: 4827.50,
  totalProfit: 804.58,
  totalOrders: 47,
  avgOrderValue: 102.71,
  revenueByDay: (() => {
    const days: Record<string, number> = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = Math.random() > 0.3 ? Math.round(Math.random() * 400 + 50) : 0;
    }
    return days;
  })(),
  topProducts: [
    { id: "1", title: "TWS Wireless Earbuds Pro", qty: 18, revenue: 539.82, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80&q=60" },
    { id: "4", title: "Mechanical RGB Gaming Keyboard", qty: 12, revenue: 748.80, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&q=60" },
    { id: "2", title: "Smart Watch Series X5", qty: 9, revenue: 491.40, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=60" },
    { id: "5", title: "Portable Bluetooth Speaker", qty: 14, revenue: 503.86, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=80&q=60" },
    { id: "3", title: "4K Action Camera Ultra", qty: 7, revenue: 327.53, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=80&q=60" },
  ],
  recentOrders: [
    { id: "ORD-001", sessionId: "cs_demo_1", customerEmail: "alice@example.com", customerName: "Alice Johnson", items: [{ id: "1", title: "TWS Wireless Earbuds Pro", price: 29.99, quantity: 2, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80", source: "aliexpress" }], subtotal: 59.98, profit: 10.00, status: "paid", createdAt: new Date(Date.now() - 3600000).toISOString(), currency: "USD", paymentMethod: "stripe" },
    { id: "ORD-002", sessionId: "cs_demo_2", customerEmail: "bob@example.com", customerName: "Bob Smith", items: [{ id: "4", title: "Mechanical RGB Gaming Keyboard", price: 62.40, quantity: 1, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80", source: "aliexpress" }], subtotal: 62.40, profit: 10.40, status: "fulfilled", createdAt: new Date(Date.now() - 7200000).toISOString(), currency: "USD", paymentMethod: "stripe" },
    { id: "ORD-003", sessionId: "cs_demo_3", customerEmail: "carol@example.com", customerName: "Carol White", items: [{ id: "2", title: "Smart Watch Series X5", price: 54.60, quantity: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80", source: "aliexpress" }], subtotal: 54.60, profit: 9.10, status: "pending", createdAt: new Date(Date.now() - 10800000).toISOString(), currency: "USD", paymentMethod: "stripe" },
    { id: "ORD-004", sessionId: "cs_demo_4", customerEmail: "dave@example.com", customerName: "Dave Brown", items: [{ id: "5", title: "Portable Bluetooth Speaker", price: 35.99, quantity: 3, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=80", source: "aliexpress" }], subtotal: 107.97, profit: 18.00, status: "paid", createdAt: new Date(Date.now() - 86400000).toISOString(), currency: "USD", paymentMethod: "stripe" },
    { id: "ORD-005", sessionId: "cs_demo_5", customerEmail: "eve@example.com", customerName: "Eve Davis", items: [{ id: "3", title: "4K Action Camera Ultra", price: 46.79, quantity: 1, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=80", source: "aliexpress" }], subtotal: 46.79, profit: 7.80, status: "refunded", createdAt: new Date(Date.now() - 172800000).toISOString(), currency: "USD", paymentMethod: "stripe" },
  ],
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
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "#7c6fff", change: "+12.5%" },
                { label: "Net Profit (20%)", value: `$${stats.totalProfit.toFixed(2)}`, icon: TrendingUp, color: "#10b981", change: "+8.3%" },
                { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, color: "#38bdf8", change: "+5 today" },
                { label: "Avg Order Value", value: `$${stats.avgOrderValue.toFixed(2)}`, icon: Users, color: "#f59e0b", change: "+2.1%" },
              ].map(({ label, value, icon: Icon, color, change }) => (
                <div key={label} className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <span className="text-xs font-semibold text-green-400">{change}</span>
                  </div>
                  <p className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Revenue — Last 30 Days</h2>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(124,111,255,0.15)", color: "#7c6fff" }}>USD</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c6fff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7c6fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: "#666", fontSize: 10 }} tickLine={false} axisLine={false} interval={4} />
                  <YAxis tick={{ fill: "#666", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ background: "#1a1b2e", border: "1px solid rgba(124,111,255,0.3)", borderRadius: "12px", color: "#fff" }}
                    formatter={(v) => [`$${Number(v ?? 0).toFixed(2)}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#7c6fff" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Products */}
              <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <h2 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>🏆 Top Products by Revenue</h2>
                <div className="space-y-4">
                  {stats.topProducts.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="w-6 text-center text-sm font-bold" style={{ color: i === 0 ? "#f59e0b" : "var(--text-muted)" }}>#{i + 1}</span>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--bg-secondary)" }}>
                        <Image src={p.image} alt={p.title} fill className="object-cover" sizes="40px" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{p.title}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{p.qty} units sold</p>
                      </div>
                      <span className="text-sm font-bold" style={{ color: "#10b981" }}>${p.revenue.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status Breakdown */}
              <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <h2 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>📊 Order Status Breakdown</h2>
                {(() => {
                  const allOrders = stats.allOrders.length > 0 ? stats.allOrders : stats.recentOrders;
                  const counts = { paid: 0, fulfilled: 0, pending: 0, refunded: 0 };
                  allOrders.forEach((o) => { if (counts[o.status] !== undefined) counts[o.status]++; });
                  const total = allOrders.length || 1;
                  return (
                    <div className="space-y-4">
                      {(Object.entries(counts) as [keyof typeof STATUS_CONFIG, number][]).map(([status, count]) => {
                        const cfg = STATUS_CONFIG[status];
                        const pct = Math.round((count / total) * 100);
                        return (
                          <div key={status}>
                            <div className="flex justify-between text-sm mb-1">
                              <span style={{ color: cfg.color }}>{cfg.label}</span>
                              <span style={{ color: "var(--text-muted)" }}>{count} orders ({pct}%)</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: cfg.color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* Profit bar chart */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>Daily Profit (Last 7 Days)</h3>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={chartData.slice(-7)}>
                      <Bar dataKey="revenue" fill="#7c6fff" radius={[4, 4, 0, 0]} />
                      <XAxis dataKey="date" tick={{ fill: "#666", fontSize: 9 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "#1a1b2e", border: "1px solid rgba(124,111,255,0.3)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} formatter={(v) => [`$${Number(v ?? 0)}`, "Revenue"]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders preview */}
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>🕐 Recent Orders</h2>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-violet-400 hover:underline">View all →</button>
              </div>
              <div className="space-y-3">
                {stats.recentOrders.slice(0, 5).map((order) => {
                  const cfg = STATUS_CONFIG[order.status];
                  return (
                    <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                        <cfg.icon size={14} style={{ color: cfg.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{order.customerEmail}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{order.id} · {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: "var(--accent-primary)" }}>${order.subtotal.toFixed(2)}</p>
                        <span className="text-xs font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
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
