"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

const CATEGORY_DATA: Record<string, { name: string; description: string; emoji: string; color: string }> = {
  "electronics": { name: "Electronics", description: "Cutting-edge gadgets and devices", emoji: "📱", color: "#7c6fff" },
  "computers": { name: "Computers", description: "Laptops, desktops, and accessories", emoji: "💻", color: "#38bdf8" },
  "fashion": { name: "Fashion", description: "Clothing, shoes, and accessories", emoji: "👗", color: "#f472b6" },
  "home-garden": { name: "Home & Garden", description: "Everything for your home", emoji: "🏠", color: "#34d399" },
  "sports": { name: "Sports", description: "Sports equipment and fitness gear", emoji: "💪", color: "#fb923c" },
  "gaming": { name: "Gaming", description: "Games, consoles, and accessories", emoji: "🎮", color: "#a78bfa" },
  "baby-kids": { name: "Baby & Kids", description: "Safe and fun products for children", emoji: "🧸", color: "#fbbf24" },
  "automotive": { name: "Automotive", description: "Car accessories and tools", emoji: "🚗", color: "#22d3ee" },
  "watches": { name: "Watches", description: "Luxury and smart watches", emoji: "⌚", color: "#f59e0b" },
  "audio": { name: "Audio", description: "Headphones, speakers, and more", emoji: "🎧", color: "#818cf8" },
  "photography": { name: "Photography", description: "Cameras, lenses, and accessories", emoji: "📷", color: "#f97316" },
  "jewelry": { name: "Jewelry", description: "Rings, necklaces, and bracelets", emoji: "💎", color: "#c084fc" },
};

const ALL_PRODUCTS = [
  // Electronics
  { id: "1", title: "TWS Wireless Earbuds Pro", price: 29.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", rating: 4.7, orders: 12400, source: "aliexpress" as const, badge: "Best Seller", category: "electronics" },
  { id: "7", title: "Wireless Charging Pad 15W", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", rating: 4.5, orders: 11200, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "12", title: "Mini Projector 1080P", price: 95.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", rating: 4.4, orders: 3200, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "e4", title: "Smart Home Hub Controller", price: 45.59, originalPrice: 37.99, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80", rating: 4.5, orders: 6700, source: "aliexpress" as const, badge: "New", category: "electronics" },
  { id: "e5", title: "Portable Power Bank 20000mAh", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80", rating: 4.6, orders: 18900, source: "aliexpress" as const, badge: "Top Seller", category: "electronics" },
  { id: "e6", title: "Smart LED Desk Lamp", price: 28.79, originalPrice: 23.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", rating: 4.4, orders: 9300, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "e7", title: "Digital Alarm Clock with Wireless Charger", price: 32.39, originalPrice: 26.99, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80", rating: 4.3, orders: 5400, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "e8", title: "USB-C Fast Charger 65W GaN", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80", rating: 4.7, orders: 22100, source: "aliexpress" as const, badge: "Hot Deal", category: "electronics" },
  { id: "e9", title: "Smart Plug WiFi Energy Monitor", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.4, orders: 14200, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "e10", title: "Bluetooth Tracker Tag 4-Pack", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", rating: 4.5, orders: 8800, source: "aliexpress" as const, badge: "Trending", category: "electronics" },
  { id: "e11", title: "Foldable Wireless Keyboard", price: 38.39, originalPrice: 31.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.3, orders: 4100, source: "aliexpress" as const, badge: "", category: "electronics" },
  { id: "e12", title: "Smart Doorbell Camera 1080P", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80", rating: 4.6, orders: 7600, source: "aliexpress" as const, badge: "Popular", category: "electronics" },

  // Watches
  { id: "2", title: "Smart Watch Series X5", price: 54.60, originalPrice: 45.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", rating: 4.5, orders: 8900, source: "aliexpress" as const, badge: "Hot Deal", category: "watches" },
  { id: "w2", title: "Luxury Minimalist Watch", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80", rating: 4.7, orders: 5200, source: "aliexpress" as const, badge: "Premium", category: "watches" },
  { id: "w3", title: "Sport GPS Running Watch", price: 89.99, originalPrice: 74.99, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80", rating: 4.8, orders: 6700, source: "aliexpress" as const, badge: "Best Seller", category: "watches" },
  { id: "w4", title: "Classic Leather Strap Watch", price: 43.19, originalPrice: 35.99, image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80", rating: 4.5, orders: 3900, source: "aliexpress" as const, badge: "", category: "watches" },
  { id: "w5", title: "Smart Health Monitor Watch", price: 62.39, originalPrice: 51.99, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80", rating: 4.6, orders: 11200, source: "aliexpress" as const, badge: "Trending", category: "watches" },
  { id: "w6", title: "Stainless Steel Chronograph", price: 95.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80", rating: 4.7, orders: 2800, source: "aliexpress" as const, badge: "Luxury", category: "watches" },
  { id: "w7", title: "Kids Smart Watch with GPS", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", rating: 4.4, orders: 7300, source: "aliexpress" as const, badge: "", category: "watches" },
  { id: "w8", title: "Waterproof Dive Watch 200M", price: 119.99, originalPrice: 99.99, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80", rating: 4.8, orders: 1900, source: "aliexpress" as const, badge: "Pro", category: "watches" },

  // Photography
  { id: "3", title: "4K Action Camera Ultra", price: 46.79, originalPrice: 38.99, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", rating: 4.6, orders: 5600, source: "aliexpress" as const, badge: "New", category: "photography" },
  { id: "ph2", title: "Camera Stabilizer Gimbal 3-Axis", price: 83.99, originalPrice: 69.99, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", rating: 4.7, orders: 4200, source: "aliexpress" as const, badge: "Pro", category: "photography" },
  { id: "ph3", title: "Ring Light 18 inch with Stand", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80", rating: 4.5, orders: 13600, source: "aliexpress" as const, badge: "Popular", category: "photography" },
  { id: "ph4", title: "Camera Bag Waterproof DSLR", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1553652297-e5b1c7b1e9a2?w=400&q=80", rating: 4.6, orders: 6800, source: "aliexpress" as const, badge: "", category: "photography" },
  { id: "ph5", title: "Mini Drone with 4K Camera", price: 119.99, originalPrice: 99.99, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80", rating: 4.5, orders: 3400, source: "aliexpress" as const, badge: "Hot", category: "photography" },
  { id: "ph6", title: "Wireless Remote Shutter", price: 11.99, originalPrice: 9.99, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", rating: 4.4, orders: 9200, source: "aliexpress" as const, badge: "", category: "photography" },
  { id: "ph7", title: "Tripod Carbon Fiber 67 inch", price: 59.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", rating: 4.7, orders: 5100, source: "aliexpress" as const, badge: "Best Value", category: "photography" },
  { id: "ph8", title: "ND Filter Kit 10-piece", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80", rating: 4.5, orders: 3700, source: "aliexpress" as const, badge: "", category: "photography" },

  // Gaming
  { id: "4", title: "Mechanical RGB Gaming Keyboard", price: 62.40, originalPrice: 52.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.8, orders: 9200, source: "aliexpress" as const, badge: "Top Pick", category: "gaming" },
  { id: "10", title: "Gaming Mouse 16000 DPI RGB", price: 28.79, originalPrice: 23.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", rating: 4.5, orders: 8300, source: "aliexpress" as const, badge: "", category: "gaming" },
  { id: "16", title: "Gaming Chair Ergonomic", price: 191.99, originalPrice: 159.99, image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80", rating: 4.6, orders: 4100, source: "aliexpress" as const, badge: "Premium", category: "gaming" },
  { id: "g4", title: "Gaming Headset 7.1 Surround", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80", rating: 4.7, orders: 11500, source: "aliexpress" as const, badge: "Best Seller", category: "gaming" },
  { id: "g5", title: "Gaming Monitor 27 inch 165Hz", price: 239.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1527443224154-c4a573d5f5ba?w=400&q=80", rating: 4.8, orders: 3200, source: "aliexpress" as const, badge: "Pro", category: "gaming" },
  { id: "g6", title: "Controller Charging Dock Dual", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80", rating: 4.5, orders: 7800, source: "aliexpress" as const, badge: "", category: "gaming" },
  { id: "g7", title: "RGB Gaming Mouse Pad XL", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80", rating: 4.6, orders: 16400, source: "aliexpress" as const, badge: "Trending", category: "gaming" },
  { id: "g8", title: "Capture Card 4K USB", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.5, orders: 2900, source: "aliexpress" as const, badge: "", category: "gaming" },
  { id: "g9", title: "Gaming Webcam 1080P 60fps", price: 55.19, originalPrice: 45.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.4, orders: 4600, source: "aliexpress" as const, badge: "", category: "gaming" },
  { id: "g10", title: "Mechanical Switches Tester Kit", price: 14.39, originalPrice: 11.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.7, orders: 5500, source: "aliexpress" as const, badge: "", category: "gaming" },

  // Audio
  { id: "5", title: "Portable Bluetooth Speaker", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", rating: 4.4, orders: 7100, source: "aliexpress" as const, badge: "", category: "audio" },
  { id: "11", title: "Noise Cancelling Headphones", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", rating: 4.8, orders: 13400, source: "aliexpress" as const, badge: "Premium", category: "audio" },
  { id: "a3", title: "Studio Monitor Speakers Pair", price: 143.99, originalPrice: 119.99, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80", rating: 4.7, orders: 2100, source: "aliexpress" as const, badge: "Pro", category: "audio" },
  { id: "a4", title: "Wireless Earbuds Sport IPX7", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", rating: 4.5, orders: 19800, source: "aliexpress" as const, badge: "Hot", category: "audio" },
  { id: "a5", title: "Soundbar 2.1 with Subwoofer", price: 95.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80", rating: 4.6, orders: 4300, source: "aliexpress" as const, badge: "", category: "audio" },
  { id: "a6", title: "USB Condenser Microphone", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80", rating: 4.7, orders: 8900, source: "aliexpress" as const, badge: "Creator Pick", category: "audio" },
  { id: "a7", title: "Vinyl Record Player Bluetooth", price: 83.99, originalPrice: 69.99, image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80", rating: 4.5, orders: 3600, source: "aliexpress" as const, badge: "", category: "audio" },
  { id: "a8", title: "Bone Conduction Headphones", price: 59.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", rating: 4.4, orders: 5200, source: "aliexpress" as const, badge: "Unique", category: "audio" },

  // Computers
  { id: "8", title: "USB-C Hub 7-in-1", price: 31.79, originalPrice: 26.49, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", rating: 4.6, orders: 6800, source: "aliexpress" as const, badge: "Editor's Choice", category: "computers" },
  { id: "9", title: "Laptop Stand Adjustable", price: 26.39, originalPrice: 21.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", rating: 4.7, orders: 4500, source: "aliexpress" as const, badge: "", category: "computers" },
  { id: "c3", title: "Laptop Cooling Pad RGB", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", rating: 4.5, orders: 8700, source: "aliexpress" as const, badge: "", category: "computers" },
  { id: "c4", title: "Portable SSD 1TB USB-C", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80", rating: 4.8, orders: 12300, source: "aliexpress" as const, badge: "Fast", category: "computers" },
  { id: "c5", title: "Wireless Keyboard Mouse Combo", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", rating: 4.6, orders: 15600, source: "aliexpress" as const, badge: "Bundle", category: "computers" },
  { id: "c6", title: "Monitor Privacy Screen Filter", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1527443224154-c4a573d5f5ba?w=400&q=80", rating: 4.4, orders: 3900, source: "aliexpress" as const, badge: "", category: "computers" },
  { id: "c7", title: "Cable Management Kit 50-piece", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", rating: 4.5, orders: 21400, source: "aliexpress" as const, badge: "Must Have", category: "computers" },
  { id: "c8", title: "Laptop Sleeve 15.6 inch", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1553652297-e5b1c7b1e9a2?w=400&q=80", rating: 4.6, orders: 9800, source: "aliexpress" as const, badge: "", category: "computers" },

  // Fashion
  { id: "13", title: "Men's Slim Fit Casual Shirt", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", rating: 4.5, orders: 7800, source: "aliexpress" as const, badge: "", category: "fashion" },
  { id: "14", title: "Women's Crossbody Bag", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", rating: 4.6, orders: 5400, source: "aliexpress" as const, badge: "Trending", category: "fashion" },
  { id: "f3", title: "Women's Floral Summer Dress", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80", rating: 4.5, orders: 11200, source: "aliexpress" as const, badge: "Hot", category: "fashion" },
  { id: "f4", title: "Men's Running Sneakers", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", rating: 4.7, orders: 9600, source: "aliexpress" as const, badge: "Best Seller", category: "fashion" },
  { id: "f5", title: "Oversized Hoodie Unisex", price: 31.79, originalPrice: 26.49, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80", rating: 4.6, orders: 14300, source: "aliexpress" as const, badge: "Trending", category: "fashion" },
  { id: "f6", title: "Leather Wallet RFID Block", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", rating: 4.5, orders: 18700, source: "aliexpress" as const, badge: "", category: "fashion" },
  { id: "f7", title: "Sunglasses Polarized UV400", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80", rating: 4.4, orders: 8900, source: "aliexpress" as const, badge: "", category: "fashion" },
  { id: "f8", title: "Women's High Waist Yoga Pants", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80", rating: 4.7, orders: 22100, source: "aliexpress" as const, badge: "Popular", category: "fashion" },
  { id: "f9", title: "Men's Slim Chino Trousers", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", rating: 4.5, orders: 6700, source: "aliexpress" as const, badge: "", category: "fashion" },
  { id: "f10", title: "Backpack Anti-Theft USB Charge", price: 43.19, originalPrice: 35.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", rating: 4.6, orders: 13400, source: "aliexpress" as const, badge: "Smart", category: "fashion" },

  // Home & Garden
  { id: "6", title: "Smart LED Strip Lights", price: 22.20, originalPrice: 18.50, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.3, orders: 15800, source: "aliexpress" as const, badge: "Trending", category: "home-garden" },
  { id: "15", title: "Robot Vacuum with LiDAR", price: 239.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.7, orders: 3200, source: "aliexpress" as const, badge: "Smart Home", category: "home-garden" },
  { id: "hg3", title: "Air Purifier HEPA H13", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", rating: 4.6, orders: 7800, source: "aliexpress" as const, badge: "Health", category: "home-garden" },
  { id: "hg4", title: "Cordless Vacuum Cleaner", price: 83.99, originalPrice: 69.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.5, orders: 5600, source: "aliexpress" as const, badge: "", category: "home-garden" },
  { id: "hg5", title: "Smart Thermostat WiFi", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80", rating: 4.7, orders: 4300, source: "aliexpress" as const, badge: "Energy Save", category: "home-garden" },
  { id: "hg6", title: "Indoor Plant Grow Light", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", rating: 4.5, orders: 9100, source: "aliexpress" as const, badge: "", category: "home-garden" },
  { id: "hg7", title: "Electric Kettle 1.7L Temperature", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", rating: 4.6, orders: 12300, source: "aliexpress" as const, badge: "", category: "home-garden" },
  { id: "hg8", title: "Smart Security Camera Outdoor", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80", rating: 4.5, orders: 8700, source: "aliexpress" as const, badge: "Security", category: "home-garden" },
  { id: "hg9", title: "Automatic Plant Watering System", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", rating: 4.4, orders: 6200, source: "aliexpress" as const, badge: "", category: "home-garden" },
  { id: "hg10", title: "Weighted Blanket 15lbs", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", rating: 4.7, orders: 14500, source: "aliexpress" as const, badge: "Sleep Better", category: "home-garden" },

  // Sports
  { id: "sp1", title: "Resistance Bands Set 5-piece", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", rating: 4.6, orders: 23400, source: "aliexpress" as const, badge: "Best Seller", category: "sports" },
  { id: "sp2", title: "Yoga Mat Non-Slip 6mm", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80", rating: 4.7, orders: 18900, source: "aliexpress" as const, badge: "", category: "sports" },
  { id: "sp3", title: "Jump Rope Speed Cable", price: 11.99, originalPrice: 9.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", rating: 4.5, orders: 31200, source: "aliexpress" as const, badge: "Popular", category: "sports" },
  { id: "sp4", title: "Dumbbell Set Adjustable 20kg", price: 83.99, originalPrice: 69.99, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", rating: 4.8, orders: 7600, source: "aliexpress" as const, badge: "Pro", category: "sports" },
  { id: "sp5", title: "Running Belt Waist Pack", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", rating: 4.4, orders: 12100, source: "aliexpress" as const, badge: "", category: "sports" },
  { id: "sp6", title: "Foam Roller Deep Tissue", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80", rating: 4.6, orders: 9800, source: "aliexpress" as const, badge: "Recovery", category: "sports" },
  { id: "sp7", title: "Pull Up Bar Doorframe", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", rating: 4.5, orders: 8300, source: "aliexpress" as const, badge: "", category: "sports" },
  { id: "sp8", title: "Protein Shaker Bottle 700ml", price: 11.99, originalPrice: 9.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", rating: 4.5, orders: 27600, source: "aliexpress" as const, badge: "", category: "sports" },

  // Baby & Kids
  { id: "bk1", title: "Baby Monitor 1080P Night Vision", price: 59.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80", rating: 4.7, orders: 6700, source: "aliexpress" as const, badge: "Safety", category: "baby-kids" },
  { id: "bk2", title: "Educational Wooden Puzzle Set", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.8, orders: 12400, source: "aliexpress" as const, badge: "Learning", category: "baby-kids" },
  { id: "bk3", title: "Baby Carrier Ergonomic", price: 47.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80", rating: 4.6, orders: 5300, source: "aliexpress" as const, badge: "", category: "baby-kids" },
  { id: "bk4", title: "Kids Drawing Tablet LCD", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.5, orders: 18900, source: "aliexpress" as const, badge: "Creative", category: "baby-kids" },
  { id: "bk5", title: "Baby Food Maker Steamer", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80", rating: 4.6, orders: 4200, source: "aliexpress" as const, badge: "", category: "baby-kids" },
  { id: "bk6", title: "Stroller Organizer Bag", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80", rating: 4.4, orders: 7800, source: "aliexpress" as const, badge: "", category: "baby-kids" },
  { id: "bk7", title: "Kids Smartwatch with Camera", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", rating: 4.5, orders: 9100, source: "aliexpress" as const, badge: "Fun", category: "baby-kids" },
  { id: "bk8", title: "LEGO Compatible Building Blocks", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.7, orders: 24600, source: "aliexpress" as const, badge: "Popular", category: "baby-kids" },

  // Automotive
  { id: "au1", title: "Dash Cam 4K Front & Rear", price: 71.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.7, orders: 8900, source: "aliexpress" as const, badge: "Safety", category: "automotive" },
  { id: "au2", title: "Car Phone Mount Magnetic", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.5, orders: 34200, source: "aliexpress" as const, badge: "Best Seller", category: "automotive" },
  { id: "au3", title: "Tire Inflator Portable 150PSI", price: 35.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.6, orders: 12700, source: "aliexpress" as const, badge: "Essential", category: "automotive" },
  { id: "au4", title: "Car Vacuum Cleaner Cordless", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.5, orders: 9300, source: "aliexpress" as const, badge: "", category: "automotive" },
  { id: "au5", title: "OBD2 Bluetooth Scanner", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.6, orders: 7600, source: "aliexpress" as const, badge: "Diagnostic", category: "automotive" },
  { id: "au6", title: "Car Seat Organizer Back", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.4, orders: 16800, source: "aliexpress" as const, badge: "", category: "automotive" },
  { id: "au7", title: "Jump Starter 2000A 20000mAh", price: 59.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.7, orders: 5400, source: "aliexpress" as const, badge: "Emergency", category: "automotive" },
  { id: "au8", title: "Car Air Freshener Solar", price: 11.99, originalPrice: 9.99, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80", rating: 4.3, orders: 22100, source: "aliexpress" as const, badge: "", category: "automotive" },

  // Jewelry
  { id: "j1", title: "Sterling Silver Necklace", price: 23.99, originalPrice: 19.99, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", rating: 4.7, orders: 9800, source: "aliexpress" as const, badge: "Popular", category: "jewelry" },
  { id: "j2", title: "Gold Plated Bracelet Set", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80", rating: 4.5, orders: 14300, source: "aliexpress" as const, badge: "", category: "jewelry" },
  { id: "j3", title: "Diamond Stud Earrings CZ", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", rating: 4.6, orders: 18700, source: "aliexpress" as const, badge: "Elegant", category: "jewelry" },
  { id: "j4", title: "Men's Tungsten Ring", price: 27.59, originalPrice: 22.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", rating: 4.7, orders: 6200, source: "aliexpress" as const, badge: "", category: "jewelry" },
  { id: "j5", title: "Pearl Pendant Necklace", price: 31.79, originalPrice: 26.49, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", rating: 4.6, orders: 7900, source: "aliexpress" as const, badge: "Classic", category: "jewelry" },
  { id: "j6", title: "Charm Bracelet Customizable", price: 19.19, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80", rating: 4.5, orders: 11400, source: "aliexpress" as const, badge: "Gift Idea", category: "jewelry" },
  { id: "j7", title: "Rose Gold Anklet Chain", price: 15.59, originalPrice: 12.99, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", rating: 4.4, orders: 8300, source: "aliexpress" as const, badge: "", category: "jewelry" },
  { id: "j8", title: "Vintage Brooch Pin Collection", price: 11.99, originalPrice: 9.99, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", rating: 4.5, orders: 5600, source: "aliexpress" as const, badge: "", category: "jewelry" },
];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORY_DATA[slug] || { name: slug.charAt(0).toUpperCase() + slug.slice(1), description: "Browse products", emoji: "🛍️", color: "#7c6fff" };
  const products = ALL_PRODUCTS.filter((p) => p.category === slug);
  const fallback = ALL_PRODUCTS.slice(0, 12);
  const display = products.length > 0 ? products : fallback;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Category hero */}
        <div className="relative overflow-hidden py-12 mb-8" style={{ background: `linear-gradient(135deg, ${cat.color}22 0%, transparent 60%)` }}>
          <div className="max-w-6xl mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span style={{ color: "var(--text-secondary)" }}>{cat.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${cat.color}33` }}>
                {cat.emoji}
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{cat.name}</h1>
                <p style={{ color: "var(--text-muted)" }}>{cat.description} — {display.length} products</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {display.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* All categories link */}
          <div className="mt-12 text-center">
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Explore other categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(CATEGORY_DATA).map(([s, c]) => (
                <Link key={s} href={`/category/${s}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105"
                  style={{ borderColor: "var(--border-color)", background: s === slug ? "var(--gradient-primary)" : "var(--bg-card)", color: s === slug ? "white" : "var(--text-muted)" }}>
                  {c.emoji} {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
