// ─── Shared Product Catalog ─────────────────────────────────────────────────
// This catalog is used by both the trending API and the product detail page.
// Products from the trending API (e1, e2, c1, etc.) are defined here so that
// the product page can look them up by ID.

const AMAZON_AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || "luxeshoplondo-21";

function amazonUrl(query: string): string {
  return `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${AMAZON_AFFILIATE_TAG}`;
}

export interface CatalogProduct {
  id: string;
  title: string;
  aliPrice: number;
  price: number;
  originalPrice: number;
  category: string;
  tags: string[];
  orders: number;
  rating: number;
  badge: string;
  image: string;
  images: string[];
  source: "aliexpress" | "amazon";
  searchQuery: string;
  aliexpressUrl: string | null;
  amazonUrl: string;
  description: string;
  specs: Record<string, string | undefined>;
}

const RAW_CATALOG = [
  // Electronics
  { id: "e1", title: "TWS Wireless Earbuds Pro — Active Noise Cancellation", aliPrice: 24.99, category: "Electronics", tags: ["earbuds", "wireless", "audio"], orders: 12400, rating: 4.7, badge: "Best Seller", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", source: "aliexpress" as const, searchQuery: "tws wireless earbuds noise cancellation", description: "Experience premium sound quality with Active Noise Cancellation. Up to 8 hours playback and 32 hours total with charging case.", specs: { "Driver": "10mm Dynamic", "Battery": "8hrs + 32hrs case", "Connectivity": "Bluetooth 5.3", "Water Resistance": "IPX5" } },
  { id: "e2", title: "Smart Watch Series X5 — Health Monitor & GPS", aliPrice: 45.50, category: "Electronics", tags: ["watch", "smartwatch", "health"], orders: 8900, rating: 4.5, badge: "Hot Deal", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", source: "aliexpress" as const, searchQuery: "smart watch health monitor gps", description: "Track heart rate, blood oxygen, sleep quality, and 100+ workout modes. Built-in GPS for accurate route tracking.", specs: { "Display": "1.96\" AMOLED", "Battery": "7 days", "GPS": "Built-in", "Water Resistance": "5ATM" } },
  { id: "e3", title: "4K Action Camera Ultra — Waterproof 30m", aliPrice: 38.99, category: "Electronics", tags: ["camera", "action", "4k"], orders: 5600, rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", source: "aliexpress" as const, searchQuery: "4k action camera waterproof", description: "Capture every adventure in stunning 4K resolution. 30m waterproofing, image stabilization, and 170° wide angle.", specs: { "Video": "4K@60fps", "Photo": "20MP", "Waterproof": "30m", "Battery": "2.5hrs 4K" } },
  { id: "e4", title: "Noise Cancelling Headphones — 40Hr Battery", aliPrice: 59.99, category: "Electronics", tags: ["headphones", "audio", "noise cancelling"], orders: 13400, rating: 4.8, badge: "Premium", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", source: "aliexpress" as const, searchQuery: "noise cancelling headphones 40hr", description: "Premium over-ear headphones with industry-leading noise cancellation and 40 hours of battery life.", specs: { "Battery": "40 hours", "ANC": "Active Noise Cancelling", "Connectivity": "Bluetooth 5.2", "Driver": "40mm" } },
  { id: "e5", title: "Mini Projector 1080P — Portable Home Cinema", aliPrice: 79.99, category: "Electronics", tags: ["projector", "home cinema", "1080p"], orders: 3200, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", source: "aliexpress" as const, searchQuery: "mini projector 1080p portable", description: "Transform any wall into a cinema screen. Native 1080P resolution with built-in speaker and HDMI/USB connectivity.", specs: { "Resolution": "1080P Native", "Brightness": "9500 Lumens", "Throw Ratio": "1.2:1", "Connectivity": "HDMI, USB, AV" } },
  { id: "e6", title: "Portable Bluetooth Speaker — 360° Surround Sound", aliPrice: 29.99, category: "Electronics", tags: ["speaker", "bluetooth", "portable"], orders: 7100, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", source: "aliexpress" as const, searchQuery: "portable bluetooth speaker 360 surround", description: "360° omnidirectional sound with deep bass. Waterproof IPX7 design, perfect for outdoor adventures.", specs: { "Battery": "24 hours", "Water Resistance": "IPX7", "Connectivity": "Bluetooth 5.0", "Range": "30m" } },
  { id: "e7", title: "Smart LED Strip Lights — 16M Colors App Control", aliPrice: 18.50, category: "Electronics", tags: ["led", "smart home", "lights"], orders: 15800, rating: 4.3, badge: "Trending", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", source: "aliexpress" as const, searchQuery: "smart led strip lights rgb app control", description: "16 million colors with music sync mode. Control via app, voice (Alexa/Google), or remote.", specs: { "Length": "5m / 10m", "Colors": "16 Million", "Control": "App + Voice", "Power": "USB / Adapter" } },
  { id: "e8", title: "Wireless Charging Pad — 15W Fast Charge", aliPrice: 15.99, category: "Electronics", tags: ["charging", "wireless", "fast charge"], orders: 11200, rating: 4.5, badge: "", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", source: "aliexpress" as const, searchQuery: "wireless charging pad 15w fast charge", description: "Ultra-slim 15W fast wireless charger compatible with all Qi-enabled devices. LED indicator and anti-slip surface.", specs: { "Output": "15W Max", "Standard": "Qi", "Compatibility": "iPhone, Android", "Input": "USB-C" } },
  // Computing / Gaming
  { id: "c1", title: "Mechanical RGB Gaming Keyboard — TKL Layout", aliPrice: 52.00, category: "Gaming", tags: ["keyboard", "gaming", "rgb", "mechanical"], orders: 9200, rating: 4.8, badge: "Top Pick", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", source: "aliexpress" as const, searchQuery: "mechanical rgb gaming keyboard tkl", description: "TKL mechanical keyboard with per-key RGB lighting, tactile switches, and anti-ghosting for competitive gaming.", specs: { "Layout": "TKL (87 keys)", "Switch": "Blue/Red/Brown", "Lighting": "Per-key RGB", "Connection": "USB-C detachable" } },
  { id: "c2", title: "USB-C Hub 7-in-1 — 4K HDMI, 100W PD", aliPrice: 26.49, category: "Computing", tags: ["usb hub", "usb-c", "hdmi"], orders: 6800, rating: 4.6, badge: "Editor's Choice", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", source: "aliexpress" as const, searchQuery: "usb-c hub 7in1 4k hdmi 100w", description: "7-in-1 USB-C hub with 4K HDMI, 100W PD charging, 3x USB-A, SD/microSD card reader.", specs: { "Ports": "7-in-1", "HDMI": "4K@60Hz", "Power Delivery": "100W", "USB-A": "3x USB 3.0" } },
  { id: "c3", title: "Laptop Stand Adjustable — Aluminum Alloy", aliPrice: 21.99, category: "Computing", tags: ["laptop stand", "desk", "ergonomic"], orders: 4500, rating: 4.7, badge: "", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", source: "aliexpress" as const, searchQuery: "laptop stand adjustable aluminum", description: "Ergonomic aluminum laptop stand with 6 adjustable height levels. Compatible with 10-17 inch laptops.", specs: { "Material": "Aluminum Alloy", "Angles": "6 levels", "Compatibility": "10-17 inch", "Weight Capacity": "10kg" } },
  { id: "c4", title: "Gaming Mouse — 16000 DPI RGB Programmable", aliPrice: 23.99, category: "Gaming", tags: ["mouse", "gaming", "rgb"], orders: 8300, rating: 4.5, badge: "", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", source: "aliexpress" as const, searchQuery: "gaming mouse 16000 dpi rgb programmable", description: "High-precision gaming mouse with 16000 DPI sensor, 7 programmable buttons, and RGB lighting.", specs: { "DPI": "200-16000", "Buttons": "7 programmable", "Polling Rate": "1000Hz", "Weight": "95g" } },
  { id: "c5", title: "Gaming Chair Ergonomic — Lumbar Support Racing Style", aliPrice: 119.99, category: "Gaming", tags: ["gaming chair", "ergonomic", "lumbar"], orders: 6700, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80", source: "aliexpress" as const, searchQuery: "gaming chair ergonomic lumbar support", description: "Racing-style gaming chair with adjustable lumbar support, 4D armrests, and 180° recline.", specs: { "Recline": "90-180°", "Armrests": "4D adjustable", "Material": "PU Leather", "Max Weight": "150kg" } },
  // Fashion
  { id: "f1", title: "Luxury Minimalist Watch — Stainless Steel Mesh Band", aliPrice: 34.99, category: "Fashion", tags: ["watch", "fashion", "minimalist"], orders: 9800, rating: 4.6, badge: "Trending", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80", source: "aliexpress" as const, searchQuery: "luxury minimalist watch stainless steel mesh", description: "Elegant minimalist watch with stainless steel mesh band. Japanese quartz movement, sapphire glass, 30m water resistant.", specs: { "Movement": "Japanese Quartz", "Glass": "Sapphire Crystal", "Band": "Stainless Steel Mesh", "Water Resistance": "30m" } },
  { id: "f2", title: "Premium Leather Wallet — RFID Blocking Slim", aliPrice: 19.99, category: "Fashion", tags: ["wallet", "leather", "rfid"], orders: 14200, rating: 4.7, badge: "Best Seller", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", source: "aliexpress" as const, searchQuery: "premium leather wallet rfid blocking slim", description: "Slim genuine leather wallet with RFID blocking technology. Holds 8 cards plus cash.", specs: { "Material": "Genuine Leather", "RFID": "Blocking", "Card Slots": "8", "Thickness": "8mm" } },
  { id: "f3", title: "Polarized Sunglasses — UV400 Protection", aliPrice: 14.99, category: "Fashion", tags: ["sunglasses", "uv protection", "fashion"], orders: 18600, rating: 4.5, badge: "Hot Deal", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", source: "aliexpress" as const, searchQuery: "polarized sunglasses uv400 protection", description: "Premium polarized sunglasses with UV400 protection. Lightweight TR90 frame, anti-glare coating.", specs: { "Lens": "Polarized", "UV Protection": "UV400", "Frame": "TR90 Lightweight", "Coating": "Anti-glare" } },
  { id: "f4", title: "Crossbody Bag — Waterproof Nylon Lightweight", aliPrice: 24.99, category: "Fashion", tags: ["bag", "crossbody", "waterproof"], orders: 7300, rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", source: "aliexpress" as const, searchQuery: "crossbody bag waterproof nylon lightweight", description: "Lightweight waterproof crossbody bag with multiple compartments. Adjustable strap, anti-theft zipper.", specs: { "Material": "Waterproof Nylon", "Compartments": "3 main + 2 side", "Strap": "Adjustable 60-120cm", "Weight": "280g" } },
  // Home & Garden
  { id: "h1", title: "Air Purifier HEPA — Covers 500 sq ft", aliPrice: 49.99, category: "Home & Garden", tags: ["air purifier", "hepa", "home"], orders: 5400, rating: 4.6, badge: "New", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", source: "aliexpress" as const, searchQuery: "air purifier hepa 500 sq ft", description: "True HEPA air purifier removes 99.97% of particles. Covers up to 500 sq ft, ultra-quiet 25dB operation.", specs: { "Coverage": "500 sq ft", "Filter": "True HEPA", "Noise": "25dB", "CADR": "200 m³/h" } },
  { id: "h2", title: "Smart Desk Lamp — Wireless Charging + Touch Dimmer", aliPrice: 32.99, category: "Home & Garden", tags: ["lamp", "smart", "wireless charging"], orders: 8100, rating: 4.7, badge: "Trending", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", source: "aliexpress" as const, searchQuery: "smart desk lamp wireless charging touch dimmer", description: "LED desk lamp with built-in 10W wireless charging pad, touch dimmer, and 5 color temperature modes.", specs: { "Charging": "10W Wireless", "Dimmer": "Touch 5 levels", "Color Temp": "2700K-6500K", "Eye Protection": "Flicker-free" } },
  { id: "h3", title: "Robot Vacuum Cleaner — Auto Mapping 2700Pa Suction", aliPrice: 89.99, category: "Home & Garden", tags: ["robot vacuum", "smart home", "cleaning"], orders: 4200, rating: 4.5, badge: "Premium", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", source: "aliexpress" as const, searchQuery: "robot vacuum cleaner auto mapping 2700pa", description: "Smart robot vacuum with LiDAR auto-mapping, 2700Pa suction, and 150-minute runtime. App + voice control.", specs: { "Suction": "2700Pa", "Runtime": "150 min", "Mapping": "LiDAR Auto-map", "Control": "App + Alexa" } },
  // Amazon products
  { id: "a1", title: "Echo Dot (5th Gen) — Smart Speaker with Alexa", aliPrice: 39.99, category: "Electronics", tags: ["alexa", "smart speaker", "amazon"], orders: 45000, rating: 4.7, badge: "Amazon Choice", image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400&q=80", source: "amazon" as const, searchQuery: "echo dot 5th gen smart speaker alexa", description: "The best-sounding Echo Dot yet. Improved bass and crisp vocals. Control smart home devices with your voice.", specs: { "Speaker": "1.73\" front-firing", "Connectivity": "Wi-Fi, Bluetooth", "Voice": "Alexa built-in", "Compatibility": "Works with Alexa" } },
  { id: "a2", title: "Kindle Paperwhite — 6.8\" Display, 8 GB", aliPrice: 99.99, category: "Electronics", tags: ["kindle", "ebook", "amazon"], orders: 32000, rating: 4.8, badge: "Amazon Pick", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", source: "amazon" as const, searchQuery: "kindle paperwhite 6.8 display 8gb", description: "The thinnest, lightest Kindle Paperwhite yet. 6.8\" display with adjustable warm light and 10 weeks battery.", specs: { "Display": "6.8\" 300ppi", "Storage": "8GB", "Battery": "10 weeks", "Light": "Adjustable warm" } },
  { id: "a3", title: "Fire TV Stick 4K Max — Wi-Fi 6, Alexa Voice Remote", aliPrice: 54.99, category: "Electronics", tags: ["fire tv", "streaming", "amazon"], orders: 28000, rating: 4.6, badge: "Amazon Pick", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=400&q=80", source: "amazon" as const, searchQuery: "fire tv stick 4k max wifi 6 alexa", description: "Stream in 4K Ultra HD with Dolby Vision, HDR, HDR10+. Wi-Fi 6 support for faster streaming.", specs: { "Resolution": "4K Ultra HD", "HDR": "Dolby Vision, HDR10+", "Wi-Fi": "Wi-Fi 6", "Voice": "Alexa Remote" } },
];

function applyMarkup(p: typeof RAW_CATALOG[0]): CatalogProduct {
  const price = p.source === "aliexpress"
    ? Math.round(p.aliPrice * 1.20 * 100) / 100
    : p.aliPrice;
  return {
    ...p,
    price,
    originalPrice: p.aliPrice,
    images: [p.image],
    amazonUrl: amazonUrl(p.searchQuery),
    aliexpressUrl: p.source === "aliexpress"
      ? `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(p.searchQuery)}`
      : null,
  };
}

export const CATALOG_PRODUCTS: CatalogProduct[] = RAW_CATALOG.map(applyMarkup);

export const CATALOG_MAP: Record<string, CatalogProduct> = Object.fromEntries(
  CATALOG_PRODUCTS.map((p) => [p.id, p])
);
