import { NextRequest, NextResponse } from "next/server";

// ─── Amazon Affiliate Tag ───────────────────────────────────────────────────
// Replace "luxeshop-20" with your actual Amazon Associates tag
const AMAZON_AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || "luxeshop-20";

function amazonUrl(query: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_AFFILIATE_TAG}`;
}

// ─── Expanded Product Catalog (simulates live API data) ─────────────────────
// In production, replace this with real AliExpress API / Amazon PA-API calls.
// Each product has a "freshness" score that rotates daily to simulate trending.

const ALL_PRODUCTS = [
  // Electronics
  { id: "e1", title: "TWS Wireless Earbuds Pro — Active Noise Cancellation", aliPrice: 24.99, category: "Electronics", tags: ["earbuds", "wireless", "audio"], orders: 12400, rating: 4.7, badge: "Best Seller", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", source: "aliexpress", searchQuery: "tws wireless earbuds noise cancellation" },
  { id: "e2", title: "Smart Watch Series X5 — Health Monitor & GPS", aliPrice: 45.50, category: "Electronics", tags: ["watch", "smartwatch", "health"], orders: 8900, rating: 4.5, badge: "Hot Deal", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", source: "aliexpress", searchQuery: "smart watch health monitor gps" },
  { id: "e3", title: "4K Action Camera Ultra — Waterproof 30m", aliPrice: 38.99, category: "Electronics", tags: ["camera", "action", "4k"], orders: 5600, rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", source: "aliexpress", searchQuery: "4k action camera waterproof" },
  { id: "e4", title: "Noise Cancelling Headphones — 40Hr Battery", aliPrice: 59.99, category: "Electronics", tags: ["headphones", "audio", "noise cancelling"], orders: 13400, rating: 4.8, badge: "Premium", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", source: "aliexpress", searchQuery: "noise cancelling headphones 40hr" },
  { id: "e5", title: "Mini Projector 1080P — Portable Home Cinema", aliPrice: 79.99, category: "Electronics", tags: ["projector", "home cinema", "1080p"], orders: 3200, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", source: "aliexpress", searchQuery: "mini projector 1080p portable" },
  { id: "e6", title: "Portable Bluetooth Speaker — 360° Surround Sound", aliPrice: 29.99, category: "Electronics", tags: ["speaker", "bluetooth", "portable"], orders: 7100, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", source: "aliexpress", searchQuery: "portable bluetooth speaker 360 surround" },
  { id: "e7", title: "Smart LED Strip Lights — 16M Colors App Control", aliPrice: 18.50, category: "Electronics", tags: ["led", "smart home", "lights"], orders: 15800, rating: 4.3, badge: "Trending", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", source: "aliexpress", searchQuery: "smart led strip lights rgb app control" },
  { id: "e8", title: "Wireless Charging Pad — 15W Fast Charge", aliPrice: 15.99, category: "Electronics", tags: ["charging", "wireless", "fast charge"], orders: 11200, rating: 4.5, badge: "", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", source: "aliexpress", searchQuery: "wireless charging pad 15w fast charge" },
  // Computing
  { id: "c1", title: "Mechanical RGB Gaming Keyboard — TKL Layout", aliPrice: 52.00, category: "Gaming", tags: ["keyboard", "gaming", "rgb", "mechanical"], orders: 9200, rating: 4.8, badge: "Top Pick", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", source: "aliexpress", searchQuery: "mechanical rgb gaming keyboard tkl" },
  { id: "c2", title: "USB-C Hub 7-in-1 — 4K HDMI, 100W PD", aliPrice: 26.49, category: "Computing", tags: ["usb hub", "usb-c", "hdmi"], orders: 6800, rating: 4.6, badge: "Editor's Choice", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", source: "aliexpress", searchQuery: "usb-c hub 7in1 4k hdmi 100w" },
  { id: "c3", title: "Laptop Stand Adjustable — Aluminum Alloy", aliPrice: 21.99, category: "Computing", tags: ["laptop stand", "desk", "ergonomic"], orders: 4500, rating: 4.7, badge: "", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", source: "aliexpress", searchQuery: "laptop stand adjustable aluminum" },
  { id: "c4", title: "Gaming Mouse — 16000 DPI RGB Programmable", aliPrice: 23.99, category: "Gaming", tags: ["mouse", "gaming", "rgb"], orders: 8300, rating: 4.5, badge: "", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", source: "aliexpress", searchQuery: "gaming mouse 16000 dpi rgb programmable" },
  { id: "c5", title: "Gaming Chair Ergonomic — Lumbar Support Racing Style", aliPrice: 119.99, category: "Gaming", tags: ["gaming chair", "ergonomic", "lumbar"], orders: 6700, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80", source: "aliexpress", searchQuery: "gaming chair ergonomic lumbar support" },
  // Fashion
  { id: "f1", title: "Luxury Minimalist Watch — Stainless Steel Mesh Band", aliPrice: 34.99, category: "Fashion", tags: ["watch", "fashion", "minimalist"], orders: 9800, rating: 4.6, badge: "Trending", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80", source: "aliexpress", searchQuery: "luxury minimalist watch stainless steel mesh" },
  { id: "f2", title: "Premium Leather Wallet — RFID Blocking Slim", aliPrice: 19.99, category: "Fashion", tags: ["wallet", "leather", "rfid"], orders: 14200, rating: 4.7, badge: "Best Seller", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", source: "aliexpress", searchQuery: "premium leather wallet rfid blocking slim" },
  { id: "f3", title: "Polarized Sunglasses — UV400 Protection", aliPrice: 14.99, category: "Fashion", tags: ["sunglasses", "uv protection", "fashion"], orders: 18600, rating: 4.5, badge: "Hot Deal", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", source: "aliexpress", searchQuery: "polarized sunglasses uv400 protection" },
  { id: "f4", title: "Crossbody Bag — Waterproof Nylon Lightweight", aliPrice: 24.99, category: "Fashion", tags: ["bag", "crossbody", "waterproof"], orders: 7300, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", source: "aliexpress", searchQuery: "crossbody bag waterproof nylon lightweight" },
  // Home & Garden
  { id: "h1", title: "Air Purifier HEPA — Covers 500 sq ft", aliPrice: 49.99, category: "Home & Garden", tags: ["air purifier", "hepa", "home"], orders: 5400, rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", source: "aliexpress", searchQuery: "air purifier hepa 500 sq ft" },
  { id: "h2", title: "Smart Desk Lamp — Wireless Charging + Touch Dimmer", aliPrice: 32.99, category: "Home & Garden", tags: ["lamp", "smart", "wireless charging"], orders: 8100, rating: 4.7, badge: "Trending", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", source: "aliexpress", searchQuery: "smart desk lamp wireless charging touch dimmer" },
  { id: "h3", title: "Robot Vacuum Cleaner — Auto Mapping 2700Pa Suction", aliPrice: 89.99, category: "Home & Garden", tags: ["robot vacuum", "smart home", "cleaning"], orders: 4200, rating: 4.5, badge: "Premium", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", source: "aliexpress", searchQuery: "robot vacuum cleaner auto mapping 2700pa" },
  // Amazon products
  { id: "a1", title: "Echo Dot (5th Gen) — Smart Speaker with Alexa", aliPrice: 39.99, category: "Electronics", tags: ["alexa", "smart speaker", "amazon"], orders: 45000, rating: 4.7, badge: "Amazon Choice", image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400&q=80", source: "amazon", searchQuery: "echo dot 5th gen smart speaker alexa" },
  { id: "a2", title: "Kindle Paperwhite — 6.8\" Display, 8 GB", aliPrice: 99.99, category: "Electronics", tags: ["kindle", "ebook", "amazon"], orders: 32000, rating: 4.8, badge: "Amazon Pick", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", source: "amazon", searchQuery: "kindle paperwhite 6.8 display 8gb" },
  { id: "a3", title: "Fire TV Stick 4K Max — Wi-Fi 6, Alexa Voice Remote", aliPrice: 54.99, category: "Electronics", tags: ["fire tv", "streaming", "amazon"], orders: 28000, rating: 4.6, badge: "Amazon Pick", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=400&q=80", source: "amazon", searchQuery: "fire tv stick 4k max wifi 6 alexa" },
];

// Apply 20% markup to AliExpress products
function applyMarkup(product: typeof ALL_PRODUCTS[0]) {
  const price = product.source === "aliexpress"
    ? Math.round(product.aliPrice * 1.20 * 100) / 100
    : product.aliPrice; // Amazon price already includes markup
  return {
    ...product,
    price,
    originalPrice: product.aliPrice,
    amazonUrl: amazonUrl(product.searchQuery),
    aliexpressUrl: product.source === "aliexpress"
      ? `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.searchQuery)}`
      : null,
  };
}

// Simulate "trending" by rotating based on day of week + hour
function getTrendingScore(product: typeof ALL_PRODUCTS[0], seed: number): number {
  const hash = (product.id.charCodeAt(0) + product.id.charCodeAt(1) + seed) % 100;
  return product.orders / 1000 + product.rating * 2 + hash * 0.1;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "all";
  const source = searchParams.get("source") || "all";
  const limit = parseInt(searchParams.get("limit") || "20");
  const sort = searchParams.get("sort") || "trending";
  const q = searchParams.get("q") || "";

  // Daily seed for trending rotation (changes every 6 hours)
  const seed = Math.floor(Date.now() / (1000 * 60 * 60 * 6));

  let products = ALL_PRODUCTS.map((p) => applyMarkup(p));

  // Filter by category
  if (category !== "all") {
    products = products.filter((p) =>
      p.category.toLowerCase() === category.toLowerCase() ||
      p.tags.some((t) => t.toLowerCase().includes(category.toLowerCase()))
    );
  }

  // Filter by source
  if (source !== "all") {
    products = products.filter((p) => p.source === source);
  }

  // Filter by search query
  if (q) {
    const ql = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(ql) ||
        p.tags.some((t) => t.toLowerCase().includes(ql)) ||
        p.category.toLowerCase().includes(ql)
    );
  }

  // Sort
  if (sort === "trending") {
    products.sort((a, b) => getTrendingScore(b, seed) - getTrendingScore(a, seed));
  } else if (sort === "price_asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === "orders") {
    products.sort((a, b) => b.orders - a.orders);
  }

  return NextResponse.json({
    products: products.slice(0, limit),
    total: products.length,
    source: "mock-api", // Change to "aliexpress-api" or "amazon-pa-api" when live keys are added
    affiliateTag: AMAZON_AFFILIATE_TAG,
    cached: false,
    timestamp: new Date().toISOString(),
  });
}
