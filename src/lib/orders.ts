import fs from "fs";
import path from "path";

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  source: "aliexpress" | "amazon";
  quantity: number;
}

export interface Order {
  id: string;
  sessionId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  profit: number;
  status: "pending" | "paid" | "fulfilled" | "refunded";
  createdAt: string;
  paidAt?: string;
  currency: string;
  paymentMethod: string;
}

// Use /tmp for serverless compatibility on Vercel
const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readOrders(): Order[] {
  try {
    ensureDir();
    if (!fs.existsSync(ORDERS_FILE)) return [];
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function writeOrders(orders: Order[]): void {
  ensureDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export function saveOrder(order: Order): void {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.unshift(order);
  }
  writeOrders(orders);
}

export function getOrderBySessionId(sessionId: string): Order | undefined {
  return readOrders().find((o) => o.sessionId === sessionId);
}

export function updateOrderStatus(
  sessionId: string,
  status: Order["status"],
  paidAt?: string
): Order | null {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.sessionId === sessionId);
  if (idx < 0) return null;
  orders[idx].status = status;
  if (paidAt) orders[idx].paidAt = paidAt;
  writeOrders(orders);
  return orders[idx];
}

export function getStats() {
  const orders = readOrders();
  const paid = orders.filter((o) => o.status === "paid" || o.status === "fulfilled");
  const totalRevenue = paid.reduce((s, o) => s + o.subtotal, 0);
  const totalProfit = paid.reduce((s, o) => s + o.profit, 0);
  const totalOrders = paid.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Revenue by day (last 30 days)
  const now = new Date();
  const revenueByDay: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    revenueByDay[d.toISOString().slice(0, 10)] = 0;
  }
  paid.forEach((o) => {
    const day = o.paidAt ? o.paidAt.slice(0, 10) : o.createdAt.slice(0, 10);
    if (revenueByDay[day] !== undefined) {
      revenueByDay[day] += o.subtotal;
    }
  });

  // Top products
  const productMap: Record<string, { title: string; qty: number; revenue: number; image: string }> = {};
  paid.forEach((o) => {
    o.items.forEach((item) => {
      if (!productMap[item.id]) {
        productMap[item.id] = { title: item.title, qty: 0, revenue: 0, image: item.image };
      }
      productMap[item.id].qty += item.quantity;
      productMap[item.id].revenue += item.price * item.quantity;
    });
  });
  const topProducts = Object.entries(productMap)
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    totalRevenue,
    totalProfit,
    totalOrders,
    avgOrderValue,
    revenueByDay,
    topProducts,
    recentOrders: orders.slice(0, 10),
    allOrders: orders,
  };
}
