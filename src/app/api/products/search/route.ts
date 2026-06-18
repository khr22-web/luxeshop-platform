import { NextRequest, NextResponse } from "next/server";

const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || "luxeshoplondo-21";

// Seeded random number generator for consistent results per query
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Brand pools by category keywords
const BRAND_POOLS: Record<string, string[]> = {
  laptop: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "Microsoft", "Samsung"],
  macbook: ["Apple"],
  iphone: ["Apple"],
  ipad: ["Apple"],
  phone: ["Samsung", "Apple", "Google", "OnePlus", "Xiaomi", "Sony", "Motorola"],
  samsung: ["Samsung"],
  headphone: ["Sony", "Bose", "JBL", "Sennheiser", "Apple", "Jabra", "Anker"],
  earbuds: ["Apple", "Samsung", "Sony", "JBL", "Anker", "Jabra", "Soundcore"],
  watch: ["Apple", "Samsung", "Garmin", "Fitbit", "Fossil", "Casio", "Seiko"],
  gaming: ["Razer", "Logitech", "SteelSeries", "Corsair", "HyperX", "ASUS ROG", "MSI"],
  keyboard: ["Logitech", "Razer", "Corsair", "Keychron", "HyperX", "SteelSeries"],
  mouse: ["Logitech", "Razer", "SteelSeries", "Corsair", "HyperX", "Glorious"],
  monitor: ["LG", "Samsung", "ASUS", "Dell", "Acer", "BenQ", "ViewSonic"],
  tv: ["Samsung", "LG", "Sony", "TCL", "Hisense", "Philips", "Panasonic"],
  camera: ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "GoPro", "Olympus"],
  bag: ["Samsonite", "Tumi", "Osprey", "Herschel", "Fjallraven", "Kipling", "Coach"],
  shoe: ["Nike", "Adidas", "New Balance", "Puma", "Reebok", "Converse", "Vans"],
  trainer: ["Nike", "Adidas", "New Balance", "Puma", "Reebok", "Under Armour"],
  dress: ["ASOS", "Zara", "H&M", "Mango", "Ted Baker", "Phase Eight", "Reiss"],
  jacket: ["North Face", "Columbia", "Barbour", "Patagonia", "Superdry", "Levi's"],
  sofa: ["IKEA", "DFS", "Habitat", "John Lewis", "Wayfair", "Dunelm", "Next"],
  vacuum: ["Dyson", "Shark", "Miele", "Hoover", "Bissell", "iRobot", "Eufy"],
  coffee: ["Nespresso", "De'Longhi", "Sage", "Breville", "Krups", "Jura", "Lavazza"],
  default: ["Premium", "Elite", "Pro", "Ultra", "Max", "Plus", "Select"],
};

function getBrandsForQuery(query: string): string[] {
  const q = query.toLowerCase();
  for (const [key, brands] of Object.entries(BRAND_POOLS)) {
    if (q.includes(key)) return brands;
  }
  return BRAND_POOLS.default;
}

// Product title variants for any search query
function generateProductTitle(query: string, index: number, seed: number): string {
  const q = query.trim();
  const variants = [
    `${q} - Premium Quality`,
    `${q} Pro Edition`,
    `${q} - Best Seller UK`,
    `${q} Ultra Performance`,
    `${q} - Top Rated`,
    `${q} Professional Series`,
    `${q} - Award Winning`,
    `${q} Advanced Model`,
    `${q} - Limited Edition`,
    `${q} Deluxe Version`,
    `${q} - High Performance`,
    `${q} Essential Edition`,
    `${q} - Expert Choice`,
    `${q} Premium Bundle`,
    `${q} - Customer Favourite`,
    `${q} Signature Series`,
    `${q} - Bestselling UK`,
    `${q} Enhanced Edition`,
    `${q} - Value Pack`,
    `${q} Special Edition`,
  ];
  return variants[index % variants.length];
}

// Image pools by category keywords
const IMAGE_POOLS: Record<string, string[]> = {
  laptop: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
  ],
  phone: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80",
  ],
  headphone: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
  ],
  watch: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80",
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
  ],
  camera: [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
    "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&q=80",
    "https://images.unsplash.com/photo-1606986628253-f6e5d4d3e5b2?w=400&q=80",
  ],
  gaming: [
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
  ],
  bag: [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80",
  ],
  shoe: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
  ],
};

function getImagesForQuery(query: string): string[] {
  const q = query.toLowerCase();
  for (const [key, images] of Object.entries(IMAGE_POOLS)) {
    if (q.includes(key)) return images;
  }
  return IMAGE_POOLS.default;
}

// Price ranges by category keywords
function getPriceRange(query: string): [number, number] {
  const q = query.toLowerCase();
  if (q.includes("macbook") || q.includes("laptop") || q.includes("imac")) return [599, 2499];
  if (q.includes("iphone") || q.includes("samsung galaxy") || q.includes("pixel")) return [299, 1299];
  if (q.includes("ipad") || q.includes("tablet")) return [199, 999];
  if (q.includes("tv") || q.includes("television")) return [199, 1999];
  if (q.includes("camera") || q.includes("dslr") || q.includes("mirrorless")) return [299, 2499];
  if (q.includes("monitor") || q.includes("display")) return [149, 999];
  if (q.includes("headphone") || q.includes("airpod") || q.includes("earbuds")) return [29, 399];
  if (q.includes("watch") || q.includes("smartwatch")) return [49, 799];
  if (q.includes("gaming") || q.includes("console") || q.includes("playstation") || q.includes("xbox")) return [49, 599];
  if (q.includes("sofa") || q.includes("furniture") || q.includes("bed")) return [199, 1999];
  if (q.includes("vacuum") || q.includes("dyson")) return [79, 699];
  if (q.includes("shoe") || q.includes("trainer") || q.includes("sneaker")) return [29, 249];
  if (q.includes("dress") || q.includes("jacket") || q.includes("coat")) return [19, 299];
  if (q.includes("bag") || q.includes("handbag") || q.includes("backpack")) return [19, 499];
  return [19, 299];
}

// Badges
const BADGES = ["Best Seller", "Top Rated", "New Arrival", "Hot Deal", "Trending", "Prime", "Sale", ""];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "24");
  const sort = searchParams.get("sort") || "relevance";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "9999");

  if (!query.trim()) {
    return NextResponse.json({ products: [], pagination: { page: 1, limit, total: 0, totalPages: 0, hasMore: false } });
  }

  const querySeed = hashString(query.toLowerCase().trim());
  const brands = getBrandsForQuery(query);
  const images = getImagesForQuery(query);
  const [minP, maxP] = getPriceRange(query);
  const searchQuery = encodeURIComponent(query.toLowerCase().trim());

  // Generate 200 results for any query
  const TOTAL = 200;
  let products = Array.from({ length: TOTAL }, (_, i) => {
    const seed = querySeed + i * 13;
    const brand = brands[Math.floor(seededRandom(seed) * brands.length)];
    const title = generateProductTitle(query, i, seed);
    const image = images[i % images.length];
    const basePrice = minP + seededRandom(seed + 1) * (maxP - minP);
    const price = Math.round(basePrice * 100) / 100;
    const originalPrice = Math.round(price * (1 + seededRandom(seed + 2) * 0.4) * 100) / 100;
    const rating = 3.8 + seededRandom(seed + 3) * 1.2;
    const orders = Math.floor(500 + seededRandom(seed + 4) * 49500);
    const badge = BADGES[i % BADGES.length];

    return {
      id: `search-${querySeed}-${i}`,
      title: `${brand} ${title}`,
      price,
      originalPrice,
      image,
      rating: Math.round(rating * 10) / 10,
      orders,
      source: "amazon",
      badge,
      category: "search",
      amazonUrl: `https://www.amazon.co.uk/s?k=${searchQuery}&tag=${AFFILIATE_TAG}`,
    };
  });

  // Filter by price
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Sort
  if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") products.sort((a, b) => b.price - a.price);
  else if (sort === "rating") products.sort((a, b) => b.rating - a.rating);
  else if (sort === "orders") products.sort((a, b) => b.orders - a.orders);

  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = products.slice(start, end);

  return NextResponse.json({
    products: data,
    pagination: { page, limit, total, totalPages, hasMore: page < totalPages },
    query,
    affiliateTag: AFFILIATE_TAG,
  });
}
