import { NextRequest, NextResponse } from "next/server";

const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || "luxeshoplondo-21";

// Product templates per category — each has many variants to generate unlimited products
const CATEGORY_TEMPLATES: Record<string, {
  names: string[];
  brands: string[];
  images: string[];
  priceRange: [number, number];
  badges: string[];
  specs: string[];
}> = {
  electronics: {
    names: [
      "Smart LED Bulb {w}W RGB WiFi", "Portable Power Bank {c}mAh Fast Charge",
      "USB-C Hub {n}-in-1 4K HDMI", "Smart Plug WiFi Energy Monitor",
      "Wireless Charging Pad {w}W", "Bluetooth Tracker Tag",
      "Digital Alarm Clock Wireless Charger", "Smart Home Security Camera {r}P",
      "Mini Projector {r}P Portable", "Electric Toothbrush Sonic {m} Mode",
      "Smart Doorbell Camera WiFi", "LED Strip Lights {l}m RGB",
      "Portable Handheld Fan USB", "Smart Scale Body Composition",
      "Desk Fan {s} inch Quiet", "Air Quality Monitor CO2",
      "Smart Bulb E27 {w}W Color", "Solar Power Bank {c}mAh",
      "Wireless Earbuds {h}hr Battery", "Smart Thermostat WiFi",
      "Electric Kettle {v}L Temperature Control", "Robot Vacuum {s}Pa Suction",
      "Cordless Vacuum {w}W Lightweight", "Smart Lock Fingerprint",
      "Video Doorbell {r}P Night Vision",
    ],
    brands: ["TechPro", "SmartLife", "NovaTech", "EliteGadget", "PrimeTech", "AuraHome", "NexGen", "VoltEdge"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80",
    ],
    priceRange: [19.99, 349.99],
    badges: ["New", "Hot Deal", "Trending", "Best Seller", "Editor's Choice", "Top Rated", ""],
    specs: ["WiFi 2.4GHz", "App Control", "Voice Assistant", "Energy Saving", "Easy Setup"],
  },
  gaming: {
    names: [
      "Gaming Mouse {d}DPI RGB {b}", "Mechanical Keyboard {s} Switch RGB",
      "Gaming Headset {c}ch Surround", "Gaming Chair Ergonomic Lumbar",
      "RGB Mouse Pad XL {sz}cm", "Gaming Monitor {i}\" {r}Hz",
      "Controller Charging Dock {n}-Port", "Gaming Desk {w}cm Carbon",
      "Capture Card {r}P USB-C", "Gaming Webcam {r}P {f}fps",
      "Stream Deck {k}-Key LCD", "Gaming Glasses Anti Blue Light",
      "Wrist Rest Memory Foam", "Gaming Backpack {l}L",
      "RGB Fan {mm}mm ARGB", "Gaming Microphone Condenser",
      "Controller Thumb Grips {n}-Pack", "Gaming Knee Pad",
      "Monitor Arm Dual {i}\"", "Cable Raceway Kit {n}pc",
    ],
    brands: ["RazerX", "LogiPro", "SteelCore", "HyperX", "CorsairZ", "AsusTUF", "MSI Gaming", "Redragon"],
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a573d5f5ba?w=400&q=80",
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80",
    ],
    priceRange: [29.99, 599.99],
    badges: ["Pro Pick", "Top Rated", "Best Seller", "New", "Trending", "Hot Deal", ""],
    specs: ["RGB Lighting", "Plug & Play", "USB 3.0", "Ergonomic", "Tournament Grade"],
  },
  fashion: {
    names: [
      "Men's Slim Fit {c} Shirt", "Women's {c} Summer Dress",
      "Unisex Oversized Hoodie {c}", "Men's Chino Trousers Slim",
      "Women's High Waist Jeans", "Men's Running Sneakers {c}",
      "Women's Platform Sandals", "Leather Crossbody Bag {c}",
      "Men's Casual Polo Shirt", "Women's Knit Sweater {c}",
      "Unisex Baseball Cap {c}", "Men's Leather Belt {s}mm",
      "Women's Floral Blouse", "Men's Bomber Jacket {c}",
      "Women's Yoga Leggings {c}", "Backpack Anti-Theft USB",
      "Men's Oxford Shoes {c}", "Women's Tote Bag Canvas",
      "Sunglasses Polarized UV400", "Men's Swim Shorts {c}",
      "Women's Sports Bra {c}", "Men's Denim Jacket {c}",
      "Women's Ankle Boots {c}", "Men's Formal Blazer {c}",
      "Women's Wrap Midi Dress {c}",
    ],
    brands: ["UrbanStyle", "ModaLux", "TrendWear", "ClassicFit", "VogueEdge", "StreetLine", "ElegantCo", "FashionHub"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    ],
    priceRange: [24.99, 249.99],
    badges: ["New Arrival", "Trending", "Best Seller", "Hot", "Popular", "Sale", ""],
    specs: ["Premium Material", "Machine Washable", "True to Size", "Breathable", "Durable"],
  },
  audio: {
    names: [
      "Wireless Earbuds ANC {h}hr", "Over-Ear Headphones {h}hr",
      "Portable Speaker {w}W Waterproof", "Soundbar {ch} with Subwoofer",
      "USB Condenser Microphone {p}mm", "Studio Monitor Speakers {w}W",
      "Bone Conduction Headphones", "Vinyl Record Player Bluetooth",
      "Karaoke Machine Wireless {m}mic", "Earbuds Sport IPX{n}",
      "Noise Cancelling Earphones", "Hi-Fi Amplifier {w}W",
      "Bluetooth Transmitter Receiver", "Headphone Amplifier DAC",
      "Clip-On Lavalier Microphone", "Podcast Microphone Kit",
      "Earphone Foam Tips {n}-Pack", "Headphone Stand Wooden",
      "Speaker Wall Mount Bracket", "Audio Splitter {n}-Way",
    ],
    brands: ["SoundPro", "AuraAudio", "BeatWave", "SonicEdge", "ClearSound", "DeepBass", "HiFiLux", "AudioMax"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80",
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    ],
    priceRange: [29.99, 399.99],
    badges: ["Hi-Fi", "Best Seller", "Premium", "New", "Hot Deal", "Creator Pick", ""],
    specs: ["Bluetooth 5.3", "Hi-Res Audio", "Deep Bass", "Crystal Clear", "Low Latency"],
  },
  watches: {
    names: [
      "Smart Watch {f} Health Monitor", "Luxury Minimalist Watch {c}",
      "Sport GPS Running Watch", "Classic Leather Strap Watch",
      "Stainless Steel Chronograph {c}", "Waterproof Dive Watch {d}M",
      "Kids Smart Watch GPS Tracker", "Digital Sports Watch {f}",
      "Rose Gold Fashion Watch Women", "Men's Military Tactical Watch",
      "Smartwatch {f} Blood Oxygen", "Vintage Analog Watch {c}",
      "Solar Powered Watch {f}", "Titanium Case Smart Watch",
      "Women's Crystal Diamond Watch", "Men's Dress Watch Slim",
      "Fitness Tracker Band {f}", "Hybrid Smart Watch {f}",
      "Outdoor Compass Watch {f}", "Pilot Watch Chronograph",
    ],
    brands: ["ChronoLux", "TimeMaster", "EliteWatch", "SmartTime", "ClassicHour", "SportPulse", "LuxeTime", "ProWatch"],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80",
    ],
    priceRange: [49.99, 599.99],
    badges: ["Luxury", "Best Seller", "Hot Deal", "Premium", "Trending", "New", ""],
    specs: ["Water Resistant", "Sapphire Glass", "Stainless Steel", "Long Battery", "Heart Rate"],
  },
  computers: {
    names: [
      "Portable SSD {c}TB USB-C", "Wireless Keyboard Mouse Combo",
      "USB-C Hub {n}-in-1 {r}K", "Laptop Stand Adjustable Aluminum",
      "Laptop Cooling Pad {f}-Fan RGB", "Monitor Privacy Screen {i}\"",
      "Cable Management Kit {n}-Piece", "Laptop Sleeve {i}\" Waterproof",
      "External DVD Drive USB", "USB 3.0 Hub {n}-Port",
      "Laptop Docking Station {n}-in-1", "Ergonomic Wrist Rest Gel",
      "Monitor Arm Single {i}\"", "Keyboard Wrist Rest Memory Foam",
      "Screen Cleaning Kit {n}-Piece", "Anti-Glare Screen Protector {i}\"",
      "USB-C to HDMI Adapter {r}K", "Thunderbolt {n} Hub",
      "Laptop Lock Cable {l}m", "Portable Monitor {i}\" USB-C",
    ],
    brands: ["TechHub", "ProDesk", "NexWork", "EliteComp", "SmartDesk", "WorkPro", "DeskMate", "CompEdge"],
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a573d5f5ba?w=400&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    ],
    priceRange: [29.99, 399.99],
    badges: ["Editor's Choice", "Best Seller", "Fast", "Bundle", "Must Have", "New", ""],
    specs: ["Plug & Play", "USB 3.0", "Compact Design", "Durable", "Wide Compatibility"],
  },
  "home-garden": {
    names: [
      "Air Purifier HEPA H{n} {r}sqft", "Robot Vacuum {s}Pa LiDAR",
      "Smart LED Strip {l}m RGB", "Cordless Vacuum {w}W {b}",
      "Smart Thermostat WiFi {f}", "Indoor Plant Grow Light {w}W",
      "Electric Kettle {v}L {t}°C", "Smart Security Camera {r}P",
      "Weighted Blanket {w}lbs {s}\"", "Air Fryer {v}L Digital",
      "Coffee Maker {c}-Cup Programmable", "Instant Pot {v}Qt {n}-in-1",
      "Stand Mixer {w}W {n} Speed", "Blender {w}W {n}-Speed",
      "Toaster Oven {v}L Convection", "Smart Smoke Detector WiFi",
      "Water Filter Pitcher {v}L", "Humidifier {v}L Ultrasonic",
      "Dehumidifier {v}L Auto", "Electric Blanket {s}\" Heated",
    ],
    brands: ["HomeElite", "SmartNest", "PureHome", "EcoLiving", "ComfortPro", "CleanHome", "GreenLife", "HomeMax"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
    ],
    priceRange: [34.99, 599.99],
    badges: ["Smart Home", "Energy Save", "Health", "Best Seller", "New", "Trending", ""],
    specs: ["Energy Star", "Smart Control", "Auto Mode", "Quiet Operation", "Easy Clean"],
  },
  sports: {
    names: [
      "Resistance Bands Set {n}-Piece", "Yoga Mat Non-Slip {t}mm",
      "Adjustable Dumbbell {w}kg", "Pull Up Bar Doorframe {w}kg",
      "Jump Rope Speed Cable {l}m", "Foam Roller Deep Tissue {l}cm",
      "Running Belt Waist Pack {n}L", "Protein Shaker Bottle {v}ml",
      "Knee Sleeve Compression {n}-Pack", "Gym Gloves Wrist Support",
      "Ab Roller Wheel Core", "Battle Rope {l}m {d}mm",
      "Kettlebell {w}kg Cast Iron", "Push Up Board {n}-Position",
      "Suspension Trainer Kit", "Agility Ladder {l}m {n}-Rung",
      "Boxing Gloves {w}oz Training", "Skipping Rope Digital Counter",
      "Massage Gun {s}Speed Deep Tissue", "Balance Board Wobble",
    ],
    brands: ["FitPro", "SportElite", "GymMax", "ActiveLife", "PowerFit", "CoreStrong", "FlexSport", "IronGrip"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80",
    ],
    priceRange: [19.99, 299.99],
    badges: ["Best Seller", "Popular", "Pro", "Recovery", "Essential", "New", ""],
    specs: ["Non-Slip", "Durable", "Lightweight", "Portable", "Professional Grade"],
  },
  photography: {
    names: [
      "Action Camera {r}K Waterproof", "Camera Gimbal {n}-Axis",
      "Ring Light {i}\" with Stand", "Camera Bag Waterproof {v}L",
      "Mini Drone {r}K Camera GPS", "Wireless Shutter Remote",
      "Tripod Carbon Fiber {h}\"", "ND Filter Kit {n}-Piece",
      "Camera Lens {f}mm f/{a}", "Flash Speedlite {g}GN",
      "Camera Strap Leather {l}cm", "Memory Card {c}GB {s}MB/s",
      "Camera Cleaning Kit {n}-Piece", "Lens Hood {d}mm",
      "Camera Rain Cover Waterproof", "Backdrop Stand Kit {w}x{h}m",
      "Softbox Lighting Kit {w}W", "Camera Battery {m}mAh",
      "Intervalometer Remote Timer", "Camera Cage Rig {b}",
    ],
    brands: ["PhotoPro", "LensMaster", "CaptureX", "ShotElite", "VisionPro", "FrameMax", "OpticsLab", "SnapPro"],
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
      "https://images.unsplash.com/photo-1553652297-e5b1c7b1e9a2?w=400&q=80",
    ],
    priceRange: [24.99, 499.99],
    badges: ["Pro", "Popular", "New", "Hot", "Best Value", "Creator Pick", ""],
    specs: ["4K Ready", "Waterproof", "Lightweight", "Universal Fit", "Professional"],
  },
  automotive: {
    names: [
      "Dash Cam {r}K Front & Rear", "Car Phone Mount Magnetic",
      "Tire Inflator Portable {p}PSI", "Car Vacuum Cordless {w}W",
      "OBD2 Bluetooth Scanner", "Car Seat Organizer Back",
      "Jump Starter {a}A {c}mAh", "Car Air Freshener {t}",
      "Steering Wheel Cover {d}\"", "Car Seat Cushion Memory Foam",
      "Blind Spot Mirror {n}-Pack", "Car Sun Shade Windshield",
      "Trunk Organizer Collapsible", "Car Trash Can {v}L",
      "LED Interior Light Kit", "Car Charger {w}W {n}-Port",
      "Parking Sensor Kit {n}-Piece", "Car Door Edge Guard {l}m",
      "Windshield Ice Scraper {l}\"", "Tire Pressure Gauge Digital",
    ],
    brands: ["AutoPro", "DriveElite", "CarMax", "RoadMate", "SpeedGear", "SafeDrive", "AutoEdge", "CarTech"],
    images: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    ],
    priceRange: [19.99, 299.99],
    badges: ["Safety", "Best Seller", "Essential", "Diagnostic", "Emergency", "New", ""],
    specs: ["Universal Fit", "Easy Install", "Durable", "Waterproof", "Plug & Play"],
  },
  "baby-kids": {
    names: [
      "Baby Monitor {r}P Night Vision", "Educational Puzzle Set {n}-Piece",
      "Baby Carrier Ergonomic {w}kg", "Kids Drawing Tablet LCD {i}\"",
      "Baby Food Maker Steamer {v}ml", "Stroller Organizer Bag",
      "Kids Smartwatch {f}", "Building Blocks {n}-Piece",
      "Baby Bouncer Rocker {f}", "Kids Headphones Volume Limit",
      "Baby Bath Thermometer", "Teething Toy Set {n}-Piece",
      "Kids Backpack {i}\" Waterproof", "Baby Nail File Set",
      "Toddler Step Stool {w}kg", "Baby Food Pouches {n}-Pack",
      "Kids Sunglasses UV400", "Baby Carrier Wrap {l}m",
      "Night Light Projector {c}", "Kids Water Bottle {v}ml",
    ],
    brands: ["BabyElite", "KidsPro", "SafeStart", "TinyJoy", "LittlePro", "BabyMax", "KidsFirst", "TinyWorld"],
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    ],
    priceRange: [14.99, 199.99],
    badges: ["Safety", "Learning", "Creative", "Fun", "Popular", "New", ""],
    specs: ["BPA Free", "Non-Toxic", "Safe Materials", "Age 0+", "Easy Clean"],
  },
  bags: {
    names: [
      "Women's Leather Tote Bag Large", "Mini Crossbody Bag Vegan Leather",
      "Backpack Anti-Theft USB Charging", "Clutch Evening Bag Rhinestone",
      "Shoulder Bag Quilted Chain Strap", "Canvas Tote Bag Aesthetic",
      "Travel Duffel Bag Waterproof {l}L", "Satchel Bag Structured Flap",
      "Bucket Bag Drawstring Suede", "Belt Bag Fanny Pack Leather",
      "Hobo Bag Soft Slouchy", "Wristlet Wallet Clutch {n}-Slot",
      "Laptop Bag {i}\" Padded Sleeve", "Gym Bag Sports Duffel {l}L",
      "Straw Beach Bag Woven", "Transparent Clear Bag Stadium",
      "Messenger Bag Crossbody {l}L", "Weekender Bag Overnight {l}L",
      "Mini Backpack Cute Aesthetic", "Luxury Handbag Top Handle",
      "Tote Bag Reversible Shopper", "Drawstring Bag Cinch Sack",
      "Baguette Bag Crescent Shape", "Doctor Bag Structured Handle",
      "Convertible Backpack Purse {n}-Way",
    ],
    brands: ["LuxeBag", "UrbanCarry", "VoguePouch", "ModaBag", "EliteCarry", "ChicBag", "TrendPurse", "StyleHold"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
      "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=400&q=80",
    ],
    priceRange: [19.99, 299.99],
    badges: ["Trending", "Best Seller", "New Arrival", "Hot Deal", "Popular", "Sale", ""],
    specs: ["Vegan Leather", "Multiple Compartments", "Adjustable Strap", "Waterproof", "Magnetic Closure"],
  },
  jewelry: {
    names: [
      "Sterling Silver Necklace {l}cm", "Gold Plated Bracelet Set {n}-Piece",
      "Diamond CZ Stud Earrings", "Men's Tungsten Ring {w}mm",
      "Pearl Pendant Necklace {l}cm", "Charm Bracelet {n}-Charm",
      "Rose Gold Anklet Chain", "Vintage Brooch Pin {c}",
      "Layered Necklace Set {n}-Piece", "Hoop Earrings {d}mm",
      "Signet Ring {m} {s}", "Tennis Bracelet CZ {l}cm",
      "Choker Necklace {c}", "Ear Cuff {n}-Piece Set",
      "Locket Necklace {s}mm", "Bangle Bracelet {n}-Stack",
      "Drop Earrings Crystal {c}", "Nose Ring Stud {d}mm",
      "Anklet Set {n}-Piece", "Name Necklace Custom {m}",
    ],
    brands: ["LuxeJewels", "SilverCraft", "GoldAura", "CrystalLux", "EliteGems", "PureGold", "ShineMore", "JewelPro"],
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    ],
    priceRange: [19.99, 199.99],
    badges: ["Elegant", "Popular", "Gift Idea", "Classic", "Luxury", "New", ""],
    specs: ["925 Sterling Silver", "18K Gold Plated", "Hypoallergenic", "Tarnish Resistant", "Gift Box"],
  },
};

// Variable substitution values
const VARS: Record<string, string[]> = {
  w: ["5", "9", "10", "12", "15", "18", "20", "25", "30", "40", "50", "60", "65", "100"],
  c: ["5000", "10000", "20000", "26800", "30000", "1", "2", "4", "256", "512"],
  n: ["3", "4", "5", "6", "7", "8", "10", "12", "15", "20", "50"],
  r: ["720", "1080", "2K", "4K"],
  s: ["6", "8", "10", "12", "14", "15", "16", "18", "20", "24", "27"],
  h: ["8", "12", "20", "24", "30", "40", "60"],
  m: ["3", "5", "6", "7", "8", "10", "12"],
  l: ["1", "2", "3", "5", "10", "15", "20", "50", "60", "67"],
  d: ["25", "30", "35", "40", "50", "52", "55", "58", "62", "67", "77"],
  v: ["1", "1.5", "1.7", "2", "3", "4", "5", "6", "8"],
  t: ["60", "80", "100", "120", "150", "200"],
  i: ["13", "14", "15", "15.6", "17", "24", "27", "32"],
  f: ["GPS", "ECG", "SpO2", "NFC", "4G", "Pro", "Ultra", "Max", "Plus"],
  b: ["Pro", "Elite", "Ultra", "Max", "Plus", "X", "V2"],
  sz: ["30x60", "40x80", "45x90", "60x120", "80x160"],
  p: ["100", "120", "150", "200"],
  a: ["1.4", "1.8", "2.0", "2.8", "3.5", "4.0"],
  g: ["40", "50", "58", "60"],
  ch: ["2.0", "2.1", "3.1", "5.1"],
  k: ["6", "8", "15", "32"],
  mm: ["80", "92", "120", "140"],
  color: ["Black", "White", "Navy", "Grey", "Beige", "Olive", "Burgundy", "Teal"],
};

function fillTemplate(template: string, seed: number): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const arr = VARS[key] || ["Pro"];
    return arr[seed % arr.length];
  });
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
  const originalPrice = Math.round(basePrice * 100) / 100;
  const price = Math.round(originalPrice * 1.2 * 100) / 100; // 20% markup
  const rating = 3.8 + seededRandom(seed + 2) * 1.2;
  const orders = Math.floor(1000 + seededRandom(seed + 3) * 49000);
  const badge = tmpl.badges[index % tmpl.badges.length];
  const source = seededRandom(seed + 4) > 0.35 ? "aliexpress" : "amazon";
  const searchQuery = encodeURIComponent(title.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim());

  return {
    id: `${category}-${index}`,
    title: `${brand} ${title}`,
    price,
    originalPrice,
    image,
    rating: Math.round(rating * 10) / 10,
    orders,
    source,
    badge,
    category,
    aliexpressUrl: `https://www.aliexpress.com/wholesale?SearchText=${searchQuery}`,
    amazonUrl: `https://www.amazon.co.uk/s?k=${searchQuery}&tag=${AFFILIATE_TAG}`,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "electronics";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "24");
  const sort = searchParams.get("sort") || "popular";
  const source = searchParams.get("source") || "all";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "9999");

  // Generate 500 products per category
  const TOTAL = 500;
  let products = Array.from({ length: TOTAL }, (_, i) => generateProduct(category, i));

  // Filter by source
  if (source !== "all") {
    products = products.filter((p) => p.source === source);
  }

  // Filter by price
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Sort
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  else if (sort === "rating") products.sort((a, b) => b.rating - a.rating);
  else if (sort === "newest") products.sort((a, b) => parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1]));
  // default: popular (by orders)
  else products.sort((a, b) => b.orders - a.orders);

  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = products.slice(start, end);

  return NextResponse.json({
    products: data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  });
}
