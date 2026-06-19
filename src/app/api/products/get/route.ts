import { NextRequest, NextResponse } from "next/server";

const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || "luxeshoplondo-21";

// ── Category templates (mirrors category/route.ts) ───────────────────────────
const CATEGORY_TEMPLATES: Record<string, {
  names: string[];
  brands: string[];
  images: string[];
  priceRange: [number, number];
  badges: string[];
}> = {
  electronics: {
    names: ["Smart LED Bulb {w}W RGB WiFi","Portable Power Bank {c}mAh Fast Charge","USB-C Hub {n}-in-1 4K HDMI","Smart Plug WiFi Energy Monitor","Wireless Charging Pad {w}W","Bluetooth Tracker Tag","Digital Alarm Clock Wireless Charger","Smart Home Security Camera {r}P","Mini Projector {r}P Portable","Electric Toothbrush Sonic {m} Mode","Smart Doorbell Camera WiFi","LED Strip Lights {l}m RGB","Portable Handheld Fan USB","Smart Scale Body Composition","Desk Fan {s} inch Quiet","Air Quality Monitor CO2","Smart Bulb E27 {w}W Color","Solar Power Bank {c}mAh","Wireless Earbuds {h}hr Battery","Smart Thermostat WiFi","Electric Kettle {v}L Temperature Control","Robot Vacuum {s}Pa Suction","Cordless Vacuum {w}W Lightweight","Smart Lock Fingerprint","Video Doorbell {r}P Night Vision"],
    brands: ["TechPro","SmartLife","NovaTech","EliteGadget","PrimeTech","AuraHome","NexGen","VoltEdge"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80","https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80","https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80","https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80","https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80","https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80","https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80"],
    priceRange: [9.99, 149.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  gaming: {
    names: ["Gaming Mouse {d}DPI RGB {b}","Mechanical Keyboard {s} Switch RGB","Gaming Headset {c}ch Surround","Gaming Chair Ergonomic Lumbar","RGB Mouse Pad XL {sz}cm","Gaming Monitor {i}\" {r}Hz","Controller Charging Dock {n}-Port","Gaming Desk {w}cm Carbon","Capture Card {r}P USB-C","Gaming Webcam {r}P {f}fps","Stream Deck {k}-Key LCD","Gaming Glasses Anti Blue Light","Wrist Rest Memory Foam","Gaming Backpack {l}L","RGB Fan {mm}mm ARGB","Gaming Microphone Condenser","Controller Thumb Grips {n}-Pack","Gaming Knee Pad","Monitor Arm Dual {i}\"","Cable Raceway Kit {n}pc"],
    brands: ["RazerX","LogiPro","SteelCore","HyperX","CorsairZ","AsusTUF","MSI Gaming","Redragon"],
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80","https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80","https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80","https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80","https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=400&q=80","https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80","https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80","https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400&q=80"],
    priceRange: [14.99, 299.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  fashion: {
    names: ["Slim Fit Chino Trousers {c}","Oversized Hoodie {c} Fleece","Leather Belt {w}mm Reversible","Polo Shirt {c} Pique Cotton","Slim Fit Jeans {c} Stretch","Bomber Jacket {c} Lightweight","Crew Neck Jumper {c} Wool Blend","Cargo Shorts {c} Multi-Pocket","Oxford Shirt {c} Formal","Jogger Pants {c} Tapered","Puffer Jacket {c} Quilted","Denim Jacket {c} Washed","Linen Shirt {c} Relaxed Fit","Zip Hoodie {c} Full Zip","Slim Chino Shorts {c}","Turtleneck Jumper {c}","Trench Coat {c} Classic","Windbreaker Jacket {c}","Formal Trousers {c} Slim","Fleece Pullover {c}"],
    brands: ["UrbanStyle","ModernFit","ClassicWear","TrendSet","EliteMode","LuxeThread","PrimeFit","StyleCo"],
    images: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80","https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80","https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80","https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80","https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80"],
    priceRange: [12.99, 89.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  watches: {
    names: ["Smart Watch {f} Health Monitor","Analog Watch {s} Stainless Steel","Chronograph Watch {s} Sport","Digital Watch {f} Waterproof","Minimalist Watch {s} Leather","Hybrid Smart Watch {f}","Fitness Tracker Band {f}","Luxury Watch {s} Gold Plated","Sport Watch {s} Silicone","Classic Watch {s} Mesh Band"],
    brands: ["TimePro","ChronoElite","WatchCraft","LuxeTime","PrecisionX","AuraWatch","NovaClock","EliteTime"],
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80","https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80","https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&q=80","https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80","https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80","https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&q=80","https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=400&q=80","https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80"],
    priceRange: [19.99, 299.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  computers: {
    names: ["Laptop Stand Adjustable {m}","USB-C Docking Station {n}-Port","Mechanical Keyboard {s} Wireless","Wireless Mouse {d}DPI Ergonomic","Monitor Light Bar {w}W","Laptop Cooling Pad {f}Fan","External SSD {c}GB USB-C","Webcam {r}P Auto Focus","Laptop Sleeve {i}\" Waterproof","Keyboard Wrist Rest Memory Foam"],
    brands: ["TechCore","CompuPro","EliteDesk","NovaTech","PrimeTech","VoltEdge","DataPro","SyncTech"],
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80","https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80","https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80","https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80","https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80","https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80","https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&q=80","https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&q=80"],
    priceRange: [14.99, 199.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  sports: {
    names: ["Resistance Bands Set {n}-Pack","Yoga Mat {t}mm Non-Slip","Adjustable Dumbbell {w}kg","Jump Rope Speed {m}m","Foam Roller {l}cm Deep Tissue","Pull Up Bar Doorway","Ab Wheel Roller {n}-Wheel","Gym Gloves {s} Padded","Water Bottle {v}ml Insulated","Protein Shaker {v}ml Blender"],
    brands: ["FitPro","SportElite","ActiveGear","PowerFit","PeakSport","IronCore","FlexFit","ZenSport"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80","https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80","https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80","https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&q=80","https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80","https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80","https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80","https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80"],
    priceRange: [8.99, 99.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  "home-garden": {
    names: ["LED Desk Lamp {w}W USB","Air Purifier {m}² HEPA","Scented Candle {s}g {c}","Throw Pillow Cover {s}cm {c}","Bamboo Cutting Board {s}","Stainless Steel Cookware {n}-Piece","Electric Kettle {v}L Temperature","Coffee Maker {c} Drip","Blender {w}W Portable","Toaster {s}-Slice Stainless"],
    brands: ["HomeElite","LivingPro","NestCraft","AuraHome","PrimeHome","CozyLiving","NovaNest","ElegantHome"],
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80","https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80","https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80","https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=400&q=80","https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"],
    priceRange: [9.99, 129.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  automotive: {
    names: ["Car Phone Mount {t} Magnetic","Dash Cam {r}P Front Rear","Car Vacuum Cleaner {w}W","Tyre Inflator Portable {p}PSI","Car Air Freshener {s}","Jump Starter {c}mAh Portable","Car Seat Cover {s} Universal","Steering Wheel Cover {s}","Car LED Interior Light {c}","OBD2 Scanner Bluetooth"],
    brands: ["AutoPro","DriveElite","CarTech","RoadMaster","AutoCraft","VehiclePro","DriveSafe","AutoElite"],
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80","https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80","https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&q=80"],
    priceRange: [9.99, 149.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  audio: {
    names: ["Wireless Earbuds {h}hr ANC","Over-Ear Headphones {h}hr","Bluetooth Speaker {w}W Waterproof","Soundbar {w}W {c}ch","Wired Earphones {d}mm HiFi","DAC Amplifier {b}bit","Microphone Condenser USB","Vinyl Record Player Bluetooth","Portable Speaker {w}W Mini","Noise Cancelling Headphones {h}hr"],
    brands: ["SoundPro","AudioElite","BassCore","NovaSound","PureAudio","EliteSound","AcousticPro","SonicEdge"],
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80","https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80","https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80","https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80","https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80","https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80"],
    priceRange: [12.99, 199.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  photography: {
    names: ["Camera Strap {s} Leather","ND Filter Set {n}-Pack {d}mm","Camera Bag {l}L Waterproof","Tripod {h}cm Lightweight","Ring Light {i}\" {w}W","Memory Card {c}GB {s}","Lens Cleaning Kit {n}-Piece","Remote Shutter {t}","Camera Cage {m}","Gimbal Stabilizer {a}-Axis"],
    brands: ["PhotoPro","LensCraft","CapturePro","SnapElite","VisionPro","FramePro","ShotMaster","FocusPro"],
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80","https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80","https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&q=80","https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=400&q=80","https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80","https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&q=80","https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=400&q=80","https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&q=80"],
    priceRange: [9.99, 179.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  jewelry: {
    names: ["Sterling Silver Necklace {s}","Gold Plated Bracelet {s}","Crystal Earrings {s}","Stainless Steel Ring {s}","Pearl Necklace {l}cm","Charm Bracelet {n}-Charm","Diamond CZ Pendant {s}","Anklet {m} Gold","Cuff Bracelet {m}","Hoop Earrings {d}mm Gold"],
    brands: ["JewelCraft","GoldElite","SilverPro","LuxeJewel","CrystalCo","PearlElite","GemCraft","AuraJewel"],
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80","https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80","https://images.unsplash.com/photo-1573408301185-9519f94815b2?w=400&q=80","https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80","https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80","https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80","https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80","https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80"],
    priceRange: [9.99, 149.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
  bags: {
    names: ["Women's Leather Tote Bag Large","Mini Crossbody Bag Vegan Leather","Backpack Anti-Theft USB Charging","Clutch Evening Bag Rhinestone","Shoulder Bag Quilted Chain Strap","Canvas Tote Bag Aesthetic","Travel Duffel Bag Waterproof {l}L","Satchel Bag Structured Flap","Bucket Bag Drawstring Suede","Belt Bag Fanny Pack Leather","Hobo Bag Soft Slouchy","Laptop Bag {i}\" Padded Sleeve","Gym Bag Sports Duffel {l}L","Mini Backpack Cute Aesthetic","Luxury Handbag Top Handle","Messenger Bag Crossbody {l}L","Weekender Bag Overnight {l}L","Baguette Bag Crescent Shape","Convertible Backpack Purse {n}-Way","Tote Bag Reversible Shopper"],
    brands: ["LuxeBag","UrbanCarry","VoguePouch","ModaBag","EliteCarry","ChicBag","TrendPurse","StyleHold"],
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80","https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80","https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80","https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80","https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400&q=80","https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80","https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=400&q=80"],
    priceRange: [19.99, 299.99],
    badges: ["Trending","Best Seller","New Arrival","Hot Deal","Popular","Sale",""],
  },
  "baby-kids": {
    names: ["Baby Carrier Ergonomic {w}kg","Kids Drawing Tablet LCD {i}\"","Baby Monitor {r}P WiFi","Kids Smartwatch {f}","Building Blocks {n}-Piece","Baby Bouncer Rocker {f}","Kids Headphones Volume Limit","Stroller Organiser Bag","Kids Backpack {i}\" Waterproof","Baby Nail File Set"],
    brands: ["BabyElite","KidsPro","SafeStart","TinyJoy","LittlePro","BabyMax","KidsFirst","TinyWorld"],
    images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80","https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80","https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80","https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80","https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80","https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&q=80"],
    priceRange: [8.99, 89.99],
    badges: ["New","Hot Deal","Trending","Best Seller","Editor's Choice","Top Rated",""],
  },
};

function fillTemplate(template: string, seed: number): string {
  const pick = (arr: string[]) => arr[seed % arr.length];
  return template
    .replace(/\{w\}/g, pick(["5","7","9","10","12","15","18","20","25","30"]))
    .replace(/\{c\}/g, pick(["Black","White","Navy","Grey","Red","Blue","Green","Rose Gold","Silver","Gold"]))
    .replace(/\{n\}/g, pick(["3","4","5","6","7","8","10","12"]))
    .replace(/\{r\}/g, pick(["720","1080","2K","4K"]))
    .replace(/\{m\}/g, pick(["3","5","7","10","12"]))
    .replace(/\{l\}/g, pick(["2","3","5","10","15","20"]))
    .replace(/\{s\}/g, pick(["S","M","L","XL","XXL","Small","Medium","Large"]))
    .replace(/\{h\}/g, pick(["20","24","30","36","40","48","60"]))
    .replace(/\{v\}/g, pick(["0.5","1","1.5","2","2.5","3"]))
    .replace(/\{d\}/g, pick(["49","52","55","58","62","67","72","77","82"]))
    .replace(/\{b\}/g, pick(["Lightweight","Ergonomic","Pro","Elite","Ultra"]))
    .replace(/\{sz\}/g, pick(["30x25","35x30","40x35","45x40","80x30","90x40"]))
    .replace(/\{i\}/g, pick(["10","11","12","13","14","15","16","17","24","27","32"]))
    .replace(/\{k\}/g, pick(["6","8","15","32"]))
    .replace(/\{mm\}/g, pick(["80","92","120","140"]))
    .replace(/\{f\}/g, pick(["Step Tracker","Heart Rate","SpO2","GPS","NFC"]))
    .replace(/\{p\}/g, pick(["100","120","150","200"]))
    .replace(/\{t\}/g, pick(["Wired","Wireless","Bluetooth"]))
    .replace(/\{a\}/g, pick(["3","4","5","6"]))
    .replace(/\{g\}/g, pick(["50","100","150","200","250","300"]))
    .replace(/\{u\}/g, pick(["USB-A","USB-C","Micro-USB"]));
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateProduct(category: string, index: number) {
  const tmpl = CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES["electronics"];
  const seed = index * 7 + category.charCodeAt(0);
  const nameTemplate = tmpl.names[index % tmpl.names.length];
  const title = fillTemplate(nameTemplate, seed + index);
  const brand = tmpl.brands[Math.floor(seededRandom(seed) * tmpl.brands.length)];
  const image = tmpl.images[index % tmpl.images.length];
  const [minP, maxP] = tmpl.priceRange;
  const basePrice = minP + seededRandom(seed + 1) * (maxP - minP);
  const price = Math.round(basePrice * 100) / 100;
  const originalPrice = Math.round(price * 0.85 * 100) / 100;
  const rating = 3.8 + seededRandom(seed + 2) * 1.2;
  const orders = Math.floor(1000 + seededRandom(seed + 3) * 49000);
  const badge = tmpl.badges[index % tmpl.badges.length];
  const source = seededRandom(seed + 4) > 0.35 ? "aliexpress" : "amazon";
  const searchQuery = encodeURIComponent(`${brand} ${title}`.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim());
  return {
    id: `${category}-${index}`,
    title: `${brand} ${title}`,
    price,
    originalPrice,
    image,
    images: [image],
    rating: Math.round(rating * 10) / 10,
    orders,
    source,
    badge,
    category,
    description: `Premium ${title} by ${brand}. High quality product with excellent reviews from verified buyers.`,
    specs: { Brand: brand, Category: category.charAt(0).toUpperCase() + category.slice(1), Source: source === "aliexpress" ? "AliExpress" : "Amazon", "Buyer Protection": "Yes", Delivery: "Free UK Delivery" },
    aliexpressUrl: `https://www.aliexpress.com/wholesale?SearchText=${searchQuery}`,
    amazonUrl: `https://www.amazon.co.uk/s?k=${searchQuery}&tag=${AFFILIATE_TAG}`,
    tags: [category],
  };
}

// ── Catalog products (trending API — a1, a2, e1, f1 etc.) ───────────────────
const CATALOG: Record<string, object> = {
  a1: { id: "a1", title: "Echo Dot (5th Gen) — Smart Speaker with Alexa", price: 39.99, originalPrice: 34.99, image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400&q=80", images: ["https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400&q=80"], rating: 4.7, orders: 45000, source: "amazon", badge: "Amazon Choice", category: "electronics", description: "The best-sounding Echo Dot yet. Improved bass and crisp vocals. Control smart home devices with your voice.", specs: { Speaker: "1.73\" front-firing", Connectivity: "Wi-Fi, Bluetooth", Voice: "Alexa built-in", Compatibility: "Works with Alexa" }, amazonUrl: "https://www.amazon.co.uk/s?k=echo+dot+5th+gen+smart+speaker+alexa&tag=luxeshoplondo-21", aliexpressUrl: null, tags: ["electronics"] },
  a2: { id: "a2", title: "Kindle Paperwhite — 6.8\" Display, 8 GB", price: 99.99, originalPrice: 89.99, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"], rating: 4.8, orders: 32000, source: "amazon", badge: "Amazon Pick", category: "electronics", description: "The thinnest, lightest Kindle Paperwhite yet — with a flush-front design and 300 ppi glare-free display.", specs: { Display: "6.8\" 300ppi", Storage: "8 GB", Battery: "Up to 10 weeks", Waterproof: "IPX8" }, amazonUrl: "https://www.amazon.co.uk/s?k=kindle+paperwhite+6.8+display+8gb&tag=luxeshoplondo-21", aliexpressUrl: null, tags: ["electronics"] },
  a3: { id: "a3", title: "Fire TV Stick 4K Max — Wi-Fi 6, Alexa Voice Remote", price: 54.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=400&q=80", images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=400&q=80"], rating: 4.6, orders: 28000, source: "amazon", badge: "Amazon Pick", category: "electronics", description: "Our most powerful streaming stick with Wi-Fi 6 support and Alexa Voice Remote.", specs: { Resolution: "4K Ultra HD", WiFi: "Wi-Fi 6", Voice: "Alexa Remote", HDR: "Dolby Vision, HDR10+" }, amazonUrl: "https://www.amazon.co.uk/s?k=fire+tv+stick+4k+max+wifi+6+alexa&tag=luxeshoplondo-21", aliexpressUrl: null, tags: ["electronics"] },
  e1: { id: "e1", title: "TWS Wireless Earbuds Pro — Active Noise Cancellation", price: 29.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80"], rating: 4.7, orders: 12400, source: "aliexpress", badge: "Best Seller", category: "electronics", description: "Premium TWS earbuds with active noise cancellation, 30hr battery life, and crystal clear audio.", specs: { Battery: "30hr total", ANC: "Active Noise Cancellation", Connectivity: "Bluetooth 5.3", "Water Resistance": "IPX5" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=tws+wireless+earbuds+anc", amazonUrl: "https://www.amazon.co.uk/s?k=tws+wireless+earbuds+anc&tag=luxeshoplondo-21", tags: ["electronics"] },
  e2: { id: "e2", title: "Smart LED Strip Lights — 16M Colors App Control", price: 22.20, originalPrice: 18.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], rating: 4.3, orders: 15800, source: "aliexpress", badge: "Trending", category: "electronics", description: "Smart LED strip lights with 16 million colors, app control, and music sync mode.", specs: { Length: "5m", Colors: "16M RGB", Control: "App + Voice", Compatibility: "Alexa, Google Home" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=smart+led+strip+lights+rgb", amazonUrl: "https://www.amazon.co.uk/s?k=smart+led+strip+lights+rgb&tag=luxeshoplondo-21", tags: ["electronics"] },
  e7: { id: "e7", title: "Smart LED Strip Lights — 16M Colors App Control", price: 22.20, originalPrice: 18.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"], rating: 4.3, orders: 15800, source: "aliexpress", badge: "Trending", category: "electronics", description: "Smart LED strip lights with 16 million colors, app control, and music sync mode.", specs: { Length: "5m", Colors: "16M RGB", Control: "App + Voice", Compatibility: "Alexa, Google Home" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=smart+led+strip+lights+rgb", amazonUrl: "https://www.amazon.co.uk/s?k=smart+led+strip+lights+rgb&tag=luxeshoplondo-21", tags: ["electronics"] },
  f1: { id: "f1", title: "Premium Leather Wallet — RFID Blocking Slim", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80"], rating: 4.7, orders: 14200, source: "aliexpress", badge: "Best Seller", category: "fashion", description: "Slim genuine leather wallet with RFID blocking technology. Holds up to 12 cards.", specs: { Material: "Genuine Leather", RFID: "Blocking", Capacity: "12 cards + cash", Dimensions: "11.5 x 9 x 1cm" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=premium+leather+wallet+rfid", amazonUrl: "https://www.amazon.co.uk/s?k=premium+leather+wallet+rfid&tag=luxeshoplondo-21", tags: ["fashion"] },
  f2: { id: "f2", title: "Premium Leather Wallet — RFID Blocking Slim", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80"], rating: 4.7, orders: 14200, source: "aliexpress", badge: "Best Seller", category: "fashion", description: "Slim genuine leather wallet with RFID blocking technology. Holds up to 12 cards.", specs: { Material: "Genuine Leather", RFID: "Blocking", Capacity: "12 cards + cash", Dimensions: "11.5 x 9 x 1cm" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=premium+leather+wallet+rfid", amazonUrl: "https://www.amazon.co.uk/s?k=premium+leather+wallet+rfid&tag=luxeshoplondo-21", tags: ["fashion"] },
  f3: { id: "f3", title: "Polarized Sunglasses — UV400 Protection", price: 17.99, originalPrice: 14.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"], rating: 4.5, orders: 18600, source: "aliexpress", badge: "Hot Deal", category: "fashion", description: "Polarized sunglasses with UV400 protection. Lightweight frame with scratch-resistant lenses.", specs: { Lens: "Polarized UV400", Frame: "Lightweight TR90", "Lens Width": "62mm", Weight: "25g" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=polarized+sunglasses+uv400", amazonUrl: "https://www.amazon.co.uk/s?k=polarized+sunglasses+uv400&tag=luxeshoplondo-21", tags: ["fashion"] },
  c1: { id: "c1", title: "USB-C Hub 7-in-1 — 4K HDMI, 100W PD", price: 31.79, originalPrice: 26.99, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80"], rating: 4.6, orders: 6800, source: "aliexpress", badge: "Editor's Choice", category: "computers", description: "7-in-1 USB-C hub with 4K HDMI, 100W Power Delivery, USB 3.0 ports, SD card reader.", specs: { Ports: "7-in-1", HDMI: "4K@30Hz", "Power Delivery": "100W", USB: "USB 3.0 x2" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=usb+c+hub+7in1+4k+hdmi", amazonUrl: "https://www.amazon.co.uk/s?k=usb+c+hub+7in1+4k+hdmi&tag=luxeshoplondo-21", tags: ["computers"] },
  g1: { id: "g1", title: "Gaming Chair Ergonomic — Lumbar Support", price: 189.99, originalPrice: 159.99, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80", images: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80"], rating: 4.5, orders: 8900, source: "aliexpress", badge: "Best Seller", category: "gaming", description: "Ergonomic gaming chair with lumbar support, adjustable armrests, and recline function.", specs: { Material: "PU Leather", Recline: "90-165°", "Max Weight": "150kg", Armrests: "4D Adjustable" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=gaming+chair+ergonomic+lumbar", amazonUrl: "https://www.amazon.co.uk/s?k=gaming+chair+ergonomic+lumbar&tag=luxeshoplondo-21", tags: ["gaming"] },
  w1: { id: "w1", title: "Smart Watch — Health Monitor, GPS", price: 79.99, originalPrice: 67.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"], rating: 4.4, orders: 22000, source: "aliexpress", badge: "Trending", category: "watches", description: "Smart watch with health monitoring, GPS tracking, and 7-day battery life.", specs: { Display: "1.4\" AMOLED", Battery: "7 days", GPS: "Built-in", "Water Resistance": "5ATM" }, aliexpressUrl: "https://www.aliexpress.com/wholesale?SearchText=smart+watch+health+monitor+gps", amazonUrl: "https://www.amazon.co.uk/s?k=smart+watch+health+monitor+gps&tag=luxeshoplondo-21", tags: ["watches"] },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // 1. Check catalog (trending/featured products)
  if (CATALOG[id]) {
    return NextResponse.json({ product: CATALOG[id] });
  }

  // 2. Check category-generated products (format: "category-index")
  const parts = id.split("-");
  if (parts.length >= 2) {
    // Handle multi-word categories like "home-garden", "baby-kids"
    // Try different splits: last part is always the index
    const index = parseInt(parts[parts.length - 1]);
    if (!isNaN(index)) {
      // Try full category first (e.g. "home-garden"), then single word
      const categoryFull = parts.slice(0, -1).join("-");
      const categorySingle = parts[0];
      const category = CATEGORY_TEMPLATES[categoryFull] ? categoryFull : categorySingle;
      
      if (CATEGORY_TEMPLATES[category] && index >= 0 && index < 500) {
        const product = generateProduct(category, index);
        return NextResponse.json({ product });
      }
    }
  }

  return NextResponse.json({ error: "Product not found" }, { status: 404 });
}
