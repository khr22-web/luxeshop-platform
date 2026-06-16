export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  images: string[];
  image: string; // primary image shortcut
  rating: number;
  orders: number;
  source: "aliexpress" | "amazon";
  badge: string;
  description: string;
  specs: Record<string, string>;
  category: string;
  amazonUrl?: string;
  aliexpressUrl?: string;
  tags: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "TWS Wireless Earbuds Pro — Active Noise Cancellation",
    price: 29.99, originalPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    rating: 4.7, orders: 12400, source: "aliexpress", badge: "Best Seller",
    description: "Experience premium sound quality with our TWS Wireless Earbuds Pro. Featuring advanced Active Noise Cancellation technology, these earbuds deliver crystal-clear audio in any environment. With up to 8 hours of playback and 32 hours total with the charging case, you'll never miss a beat.",
    specs: { "Driver Size": "10mm Dynamic", "Frequency Response": "20Hz–20kHz", "Battery Life": "8hrs + 32hrs case", "Charging": "USB-C, 1.5hr full charge", "Connectivity": "Bluetooth 5.3", "Water Resistance": "IPX5", "Weight": "5g per earbud" },
    category: "Electronics",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=tws+wireless+earbuds+anc",
    amazonUrl: "https://www.amazon.com/s?k=tws+wireless+earbuds+anc&tag=luxeshop-20",
    tags: ["earbuds", "wireless", "anc", "bluetooth", "audio", "electronics"],
  },
  {
    id: "2",
    title: "Smart Watch Series X5 — Health Monitor & GPS",
    price: 54.60, originalPrice: 45.50,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    rating: 4.5, orders: 8900, source: "aliexpress", badge: "Hot Deal",
    description: "The Smart Watch X5 combines style with advanced health monitoring. Track your heart rate, blood oxygen, sleep quality, and over 100 workout modes. With built-in GPS, you can map your runs without your phone.",
    specs: { "Display": "1.96\" AMOLED 466×466", "Battery": "7 days typical use", "GPS": "Built-in GPS + GLONASS", "Health": "Heart Rate, SpO2, Stress", "Water Resistance": "5ATM (50m)", "Compatibility": "iOS 12+ / Android 8+", "Strap": "22mm silicone" },
    category: "Watches",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=smart+watch+health+gps",
    amazonUrl: "https://www.amazon.com/s?k=smart+watch+health+gps&tag=luxeshop-20",
    tags: ["watch", "smartwatch", "gps", "health", "fitness", "wearable"],
  },
  {
    id: "3",
    title: "4K Action Camera Ultra — Waterproof 30m",
    price: 46.79, originalPrice: 38.99,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
      "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
    rating: 4.6, orders: 5600, source: "aliexpress", badge: "New",
    description: "Capture every adventure in stunning 4K resolution. The Ultra Action Camera is built for extreme conditions with 30m waterproofing, image stabilization, and a wide 170° field of view.",
    specs: { "Video": "4K@60fps, 2.7K@120fps", "Photo": "20MP", "Stabilization": "6-axis EIS", "Waterproof": "30m without housing", "Battery": "1800mAh, 2.5hrs 4K", "Screen": "2\" touch display", "Storage": "MicroSD up to 256GB" },
    category: "Photography",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=4k+action+camera+waterproof",
    amazonUrl: "https://www.amazon.com/s?k=4k+action+camera+waterproof&tag=luxeshop-20",
    tags: ["camera", "action camera", "4k", "waterproof", "photography", "gopro"],
  },
  {
    id: "4",
    title: "Mechanical RGB Gaming Keyboard — TKL Layout",
    price: 62.40, originalPrice: 52.00,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80",
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    rating: 4.8, orders: 9200, source: "aliexpress", badge: "Top Pick",
    description: "Dominate your game with the ultimate TKL mechanical keyboard. Features per-key RGB lighting with 16.8M colors, tactile mechanical switches, and aircraft-grade aluminum construction.",
    specs: { "Layout": "TKL (87 keys)", "Switch": "Red / Blue / Brown options", "Lighting": "Per-key RGB 16.8M colors", "Connection": "USB-C detachable", "Anti-ghosting": "Full N-Key Rollover", "Material": "Aluminum top plate", "Polling Rate": "1000Hz" },
    category: "Gaming",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=mechanical+rgb+keyboard+tkl",
    amazonUrl: "https://www.amazon.com/s?k=mechanical+rgb+keyboard+tkl&tag=luxeshop-20",
    tags: ["keyboard", "gaming", "mechanical", "rgb", "tkl", "gaming peripherals"],
  },
  {
    id: "5",
    title: "Portable Bluetooth Speaker — 360° Surround Sound",
    price: 35.99, originalPrice: 29.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    rating: 4.4, orders: 7100, source: "aliexpress", badge: "",
    description: "Fill any room with rich, immersive 360° sound. The portable speaker delivers powerful bass and crystal-clear highs, with IPX7 waterproofing for poolside and outdoor use.",
    specs: { "Output Power": "30W RMS", "Frequency": "60Hz–20kHz", "Battery": "24 hours playback", "Charging": "USB-C, 3hr full charge", "Waterproof": "IPX7", "Connectivity": "Bluetooth 5.0, AUX", "Weight": "680g" },
    category: "Audio",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=portable+bluetooth+speaker+360",
    amazonUrl: "https://www.amazon.com/s?k=portable+bluetooth+speaker+360&tag=luxeshop-20",
    tags: ["speaker", "bluetooth", "portable", "audio", "waterproof", "music"],
  },
  {
    id: "6",
    title: "Smart LED Strip Lights — 16M Colors App Control",
    price: 22.20, originalPrice: 18.50,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    rating: 4.3, orders: 15800, source: "aliexpress", badge: "Trending",
    description: "Transform your space with 16 million colors and dynamic lighting effects. Control via app, voice assistant, or remote. Music sync mode reacts to your music in real time.",
    specs: { "Length": "5m (16.4ft)", "LEDs": "300 LEDs/5m", "Colors": "16M RGBIC", "Control": "App / Voice / Remote", "Power": "12V 3A adapter", "Compatibility": "Alexa, Google Home", "Lifespan": "50,000 hours" },
    category: "Home & Garden",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=smart+led+strip+lights+rgb",
    amazonUrl: "https://www.amazon.com/s?k=smart+led+strip+lights+rgb&tag=luxeshop-20",
    tags: ["led", "lights", "smart home", "rgb", "strip lights", "home decor"],
  },
  {
    id: "7",
    title: "Wireless Charging Pad — 15W Fast Charge",
    price: 19.19, originalPrice: 15.99,
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80",
    rating: 4.5, orders: 11200, source: "aliexpress", badge: "",
    description: "Charge your devices effortlessly with our 15W fast wireless charging pad. Compatible with all Qi-enabled devices. Slim, lightweight design with LED indicator and foreign object detection.",
    specs: { "Output": "15W max (Samsung), 12W (iPhone)", "Input": "USB-C 5V/3A", "Compatibility": "Qi standard, MagSafe compatible", "Size": "100mm diameter", "Thickness": "6mm", "Safety": "Over-voltage, over-current, FOD" },
    category: "Electronics",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=wireless+charging+pad+15w",
    amazonUrl: "https://www.amazon.com/s?k=wireless+charging+pad+15w&tag=luxeshop-20",
    tags: ["charger", "wireless", "fast charge", "qi", "accessories", "electronics"],
  },
  {
    id: "8",
    title: "USB-C Hub 7-in-1 — 4K HDMI, 100W PD",
    price: 31.79, originalPrice: 26.49,
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80",
    rating: 4.6, orders: 6800, source: "aliexpress", badge: "Editor's Choice",
    description: "Expand your laptop's connectivity with this 7-in-1 USB-C hub. Features 4K HDMI output, 100W Power Delivery passthrough, 3 USB-A ports, SD/microSD card readers, and a USB-C data port.",
    specs: { "HDMI": "4K@60Hz", "USB-A": "3× USB 3.0 (5Gbps)", "Power Delivery": "100W passthrough", "Card Reader": "SD + microSD", "Material": "Aluminum alloy", "Cable Length": "15cm", "Compatibility": "MacBook, iPad Pro, Windows" },
    category: "Electronics",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=usb+c+hub+7in1+4k+hdmi",
    amazonUrl: "https://www.amazon.com/s?k=usb+c+hub+7in1+4k+hdmi&tag=luxeshop-20",
    tags: ["hub", "usb-c", "hdmi", "laptop", "accessories", "electronics"],
  },
  {
    id: "9",
    title: "Laptop Stand Adjustable — Aluminum Alloy",
    price: 26.39, originalPrice: 21.99,
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    rating: 4.7, orders: 4500, source: "aliexpress", badge: "",
    description: "Ergonomic aluminum laptop stand with 6 adjustable height levels. Foldable and portable design fits in any bag. Compatible with laptops 10–17 inches. Improves posture and reduces neck strain.",
    specs: { "Material": "Aluminum alloy", "Height Levels": "6 adjustable positions", "Compatibility": "10–17 inch laptops", "Max Load": "20kg", "Weight": "350g", "Folded Size": "26×12×2cm", "Non-slip": "Silicone pads" },
    category: "Electronics",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=laptop+stand+adjustable+aluminum",
    amazonUrl: "https://www.amazon.com/s?k=laptop+stand+adjustable+aluminum&tag=luxeshop-20",
    tags: ["laptop stand", "desk", "ergonomic", "office", "accessories", "work from home"],
  },
  {
    id: "10",
    title: "Gaming Mouse — 16000 DPI RGB Programmable",
    price: 28.79, originalPrice: 23.99,
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    rating: 4.5, orders: 8300, source: "aliexpress", badge: "",
    description: "Precision gaming mouse with 16000 DPI optical sensor, 7 programmable buttons, and customizable RGB lighting. Ergonomic right-handed design with braided cable for durability.",
    specs: { "DPI": "200–16000 DPI (adjustable)", "Buttons": "7 programmable", "Polling Rate": "1000Hz", "RGB": "16.8M colors", "Cable": "1.8m braided", "Weight": "110g", "Compatibility": "Windows / Mac / Linux" },
    category: "Gaming",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=gaming+mouse+16000+dpi+rgb",
    amazonUrl: "https://www.amazon.com/s?k=gaming+mouse+16000+dpi+rgb&tag=luxeshop-20",
    tags: ["mouse", "gaming", "rgb", "programmable", "gaming peripherals", "pc gaming"],
  },
  {
    id: "11",
    title: "Noise Cancelling Headphones — 40Hr Battery",
    price: 71.99, originalPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    rating: 4.8, orders: 13400, source: "aliexpress", badge: "Premium",
    description: "Premium over-ear headphones with industry-leading Active Noise Cancellation. Enjoy 40 hours of battery life, foldable design, and Hi-Res Audio certification. Perfect for travel and work.",
    specs: { "Driver": "40mm dynamic", "ANC": "Active Noise Cancellation", "Battery": "40hrs ANC on, 60hrs off", "Charging": "USB-C, 2hr full charge", "Connectivity": "Bluetooth 5.2 + 3.5mm", "Weight": "250g", "Foldable": "Yes, travel pouch included" },
    category: "Audio",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=noise+cancelling+headphones+40hr",
    amazonUrl: "https://www.amazon.com/s?k=noise+cancelling+headphones+40hr&tag=luxeshop-20",
    tags: ["headphones", "anc", "wireless", "audio", "premium", "over-ear"],
  },
  {
    id: "12",
    title: "Mini Projector 1080P — Portable Home Cinema",
    price: 95.99, originalPrice: 79.99,
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    rating: 4.4, orders: 3200, source: "aliexpress", badge: "",
    description: "Turn any wall into a cinema with this compact 1080P projector. Supports 200-inch display, built-in speakers, and connects via HDMI, USB, and WiFi. Perfect for movies, gaming, and presentations.",
    specs: { "Resolution": "Native 1080P (1920×1080)", "Brightness": "9500 lumens", "Screen Size": "30–200 inches", "Connectivity": "HDMI, USB, WiFi, Bluetooth", "Speaker": "Built-in 5W stereo", "Lamp Life": "50,000 hours LED", "Throw Ratio": "1.2:1" },
    category: "Electronics",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=mini+projector+1080p+portable",
    amazonUrl: "https://www.amazon.com/s?k=mini+projector+1080p+portable&tag=luxeshop-20",
    tags: ["projector", "home cinema", "1080p", "portable", "movies", "electronics"],
  },
  {
    id: "13",
    title: "Men's Slim Fit Casual Shirt — Premium Cotton",
    price: 18.00, originalPrice: 15.00,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    rating: 4.3, orders: 22000, source: "aliexpress", badge: "Trending",
    description: "Classic slim-fit casual shirt made from 100% premium cotton. Breathable, comfortable, and versatile — perfect for both casual and semi-formal occasions. Available in multiple colors.",
    specs: { "Material": "100% Cotton", "Fit": "Slim fit", "Sizes": "S, M, L, XL, XXL", "Care": "Machine washable", "Collar": "Button-down", "Sleeve": "Long sleeve" },
    category: "Fashion",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=mens+slim+fit+casual+shirt",
    amazonUrl: "https://www.amazon.com/s?k=mens+slim+fit+casual+shirt&tag=luxeshop-20",
    tags: ["shirt", "men", "fashion", "casual", "cotton", "clothing"],
  },
  {
    id: "14",
    title: "Women's Crossbody Bag — Vegan Leather",
    price: 24.00, originalPrice: 20.00,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    rating: 4.6, orders: 18500, source: "aliexpress", badge: "Hot Deal",
    description: "Stylish and practical crossbody bag crafted from premium vegan leather. Features multiple compartments, adjustable strap, and magnetic closure. Perfect for everyday use.",
    specs: { "Material": "Vegan leather (PU)", "Size": "25×18×8cm", "Strap": "Adjustable 60–120cm", "Closure": "Magnetic snap", "Pockets": "3 main + 2 zip pockets", "Colors": "Black, Brown, Beige, Red" },
    category: "Fashion",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=womens+crossbody+bag+vegan+leather",
    amazonUrl: "https://www.amazon.com/s?k=womens+crossbody+bag+vegan+leather&tag=luxeshop-20",
    tags: ["bag", "women", "fashion", "crossbody", "handbag", "accessories"],
  },
  {
    id: "15",
    title: "Robot Vacuum Cleaner — Auto Mapping LiDAR",
    price: 155.99, originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    rating: 4.5, orders: 4100, source: "aliexpress", badge: "Premium",
    description: "Smart robot vacuum with LiDAR navigation for precise room mapping. 3000Pa suction power, auto-empty base, and multi-floor mapping. Compatible with Alexa and Google Home.",
    specs: { "Suction": "3000Pa", "Navigation": "LiDAR + SLAM", "Battery": "5200mAh, 180min runtime", "Dustbin": "400ml + auto-empty base", "Noise": "65dB", "App Control": "Yes, scheduling", "Compatibility": "Alexa, Google Home" },
    category: "Home & Garden",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=robot+vacuum+lidar+mapping",
    amazonUrl: "https://www.amazon.com/s?k=robot+vacuum+lidar+mapping&tag=luxeshop-20",
    tags: ["vacuum", "robot", "smart home", "cleaning", "home", "automation"],
  },
  {
    id: "16",
    title: "Gaming Chair Ergonomic — Lumbar Support Racing Style",
    price: 143.99, originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    ],
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80",
    rating: 4.4, orders: 6700, source: "aliexpress", badge: "",
    description: "Professional gaming chair with ergonomic lumbar support, adjustable armrests, and reclining backrest (90–180°). High-density foam padding for all-day comfort. Max load 150kg.",
    specs: { "Recline": "90°–180°", "Armrests": "4D adjustable", "Lumbar": "Adjustable lumbar + headrest pillow", "Material": "PU leather + cold foam", "Max Load": "150kg", "Height Adjust": "Gas lift Class 4", "Base": "Metal 5-star base" },
    category: "Gaming",
    aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=gaming+chair+ergonomic+lumbar",
    amazonUrl: "https://www.amazon.com/s?k=gaming+chair+ergonomic+lumbar&tag=luxeshop-20",
    tags: ["chair", "gaming", "ergonomic", "office", "furniture", "desk"],
  },
];

export const PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p])
);

export function searchProducts(query: string, options?: {
  source?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Product[] {
  let results = [...PRODUCTS];

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (options?.source && options.source !== "all") {
    results = results.filter((p) => p.source === options.source);
  }

  if (options?.category && options.category !== "all") {
    results = results.filter(
      (p) => p.category.toLowerCase() === options.category!.toLowerCase()
    );
  }

  if (options?.minPrice !== undefined) {
    results = results.filter((p) => p.price >= options.minPrice!);
  }

  if (options?.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= options.maxPrice!);
  }

  if (options?.sort === "price_asc") results.sort((a, b) => a.price - b.price);
  if (options?.sort === "price_desc") results.sort((a, b) => b.price - a.price);
  if (options?.sort === "rating") results.sort((a, b) => b.rating - a.rating);
  if (options?.sort === "orders") results.sort((a, b) => b.orders - a.orders);

  return results;
}

export const CATEGORIES = [
  { slug: "electronics", label: "Electronics", icon: "⚡" },
  { slug: "fashion", label: "Fashion", icon: "👗" },
  { slug: "gaming", label: "Gaming", icon: "🎮" },
  { slug: "audio", label: "Audio", icon: "🎵" },
  { slug: "watches", label: "Watches", icon: "⌚" },
  { slug: "photography", label: "Photography", icon: "📷" },
  { slug: "home-garden", label: "Home & Garden", icon: "🏡" },
];
