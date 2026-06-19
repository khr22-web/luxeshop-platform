import { Metadata } from "next";
import Link from "next/link";
import { Tag, Zap, ArrowRight, Star, TrendingUp, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Deals Under £20 — Trending Finds | LuxeShop London",
  description: "Discover the best trending products under £20. Impulse buys, viral gadgets, fashion accessories and more — all under twenty pounds with fast UK delivery.",
};

const AFFILIATE_TAG = "luxeshoplondo-21";

interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  badge: string;
  badgeColor: string;
  rating: number;
  reviews: number;
  amazonKeyword: string;
  trending?: boolean;
}

const under20Products: Product[] = [
  // Gadgets
  {
    id: "u20-1",
    name: "Magnetic Phone Holder for Car Dashboard",
    category: "Gadgets",
    originalPrice: 24.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.8, reviews: 2341,
    amazonKeyword: "Magnetic+Phone+Holder+Car+Dashboard",
    trending: true,
  },
  {
    id: "u20-2",
    name: "LED Strip Lights USB 5m Colour Changing",
    category: "Home",
    originalPrice: 29.99, salePrice: 12.99,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.7, reviews: 5892,
    amazonKeyword: "LED+Strip+Lights+USB+Colour+Changing+5m",
    trending: true,
  },
  {
    id: "u20-3",
    name: "Phone Screen Magnifier 3D HD Amplifier",
    category: "Gadgets",
    originalPrice: 16.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.3, reviews: 5670,
    amazonKeyword: "Phone+Screen+Magnifier+3D+HD+Amplifier",
    trending: true,
  },
  {
    id: "u20-4",
    name: "Mini Portable USB Rechargeable Fan",
    category: "Gadgets",
    originalPrice: 18.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 1890,
    amazonKeyword: "Portable+Mini+USB+Rechargeable+Fan",
    trending: true,
  },
  {
    id: "u20-5",
    name: "Silicone Cable Organiser Set 10 Pack",
    category: "Electronics",
    originalPrice: 15.99, salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.7, reviews: 4560,
    amazonKeyword: "Silicone+Cable+Organiser+Set+10+Pack",
  },
  {
    id: "u20-6",
    name: "Wireless Earbuds Bluetooth 5.3 Sport",
    category: "Audio",
    originalPrice: 39.99, salePrice: 17.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    badge: "HOT DEAL", badgeColor: "bg-red-500",
    rating: 4.5, reviews: 3210,
    amazonKeyword: "Wireless+Earbuds+Bluetooth+5+Sport",
    trending: true,
  },
  // Beauty
  {
    id: "u20-7",
    name: "Acne Pimple Patches 72 Invisible Dots",
    category: "Beauty",
    originalPrice: 12.99, salePrice: 6.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.9, reviews: 12400,
    amazonKeyword: "Acne+Pimple+Patches+Invisible+Hydrocolloid",
    trending: true,
  },
  {
    id: "u20-8",
    name: "Reusable Makeup Remover Pads 16 Pack",
    category: "Beauty",
    originalPrice: 14.99, salePrice: 8.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    badge: "ECO PICK", badgeColor: "bg-emerald-600",
    rating: 4.8, reviews: 7890,
    amazonKeyword: "Reusable+Makeup+Remover+Pads+16+Pack",
  },
  {
    id: "u20-9",
    name: "Gel Nail Polish Kit 12 Colours UV LED",
    category: "Beauty",
    originalPrice: 29.99, salePrice: 16.99,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.7, reviews: 9230,
    amazonKeyword: "Gel+Nail+Polish+Kit+12+Colours+UV+LED",
    trending: true,
  },
  {
    id: "u20-10",
    name: "Jade Roller & Gua Sha Facial Massage Set",
    category: "Beauty",
    originalPrice: 19.99, salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 6780,
    amazonKeyword: "Jade+Roller+Gua+Sha+Facial+Massage+Set",
    trending: true,
  },
  {
    id: "u20-11",
    name: "Eyelash Curler with Refill Pads",
    category: "Beauty",
    originalPrice: 12.99, salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.5, reviews: 4320,
    amazonKeyword: "Eyelash+Curler+Refill+Pads+Professional",
  },
  // Sports & Fitness
  {
    id: "u20-12",
    name: "Resistance Bands Set 5 Levels Home Gym",
    category: "Sports",
    originalPrice: 24.99, salePrice: 13.99,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 6780,
    amazonKeyword: "Resistance+Bands+Set+5+Levels+Home+Gym",
  },
  {
    id: "u20-13",
    name: "Posture Corrector Back Support Brace",
    category: "Sports",
    originalPrice: 22.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.5, reviews: 4320,
    amazonKeyword: "Posture+Corrector+Back+Support+Brace",
  },
  {
    id: "u20-14",
    name: "Stainless Steel Insulated Water Bottle 500ml",
    category: "Sports",
    originalPrice: 22.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.9, reviews: 8120,
    amazonKeyword: "Stainless+Steel+Insulated+Water+Bottle+500ml",
  },
  {
    id: "u20-15",
    name: "Foam Roller Muscle Massage Recovery",
    category: "Sports",
    originalPrice: 24.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
    badge: "HOT DEAL", badgeColor: "bg-red-500",
    rating: 4.7, reviews: 3450,
    amazonKeyword: "Foam+Roller+Muscle+Massage+Recovery",
  },
  {
    id: "u20-16",
    name: "Jump Rope Speed Skipping Rope Adjustable",
    category: "Sports",
    originalPrice: 14.99, salePrice: 8.99,
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 2890,
    amazonKeyword: "Jump+Rope+Speed+Skipping+Adjustable",
    trending: true,
  },
  // Home & Kitchen
  {
    id: "u20-17",
    name: "Bamboo Cutting Board Set of 3",
    category: "Home",
    originalPrice: 24.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    badge: "ECO PICK", badgeColor: "bg-emerald-600",
    rating: 4.8, reviews: 5670,
    amazonKeyword: "Bamboo+Cutting+Board+Set+3+Kitchen",
  },
  {
    id: "u20-18",
    name: "Reusable Silicone Food Storage Bags 6 Pack",
    category: "Home",
    originalPrice: 19.99, salePrice: 12.99,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80",
    badge: "ECO PICK", badgeColor: "bg-emerald-600",
    rating: 4.7, reviews: 4230,
    amazonKeyword: "Reusable+Silicone+Food+Storage+Bags+6+Pack",
  },
  {
    id: "u20-19",
    name: "Sticky Notes Pastel Colours 600 Sheets",
    category: "Stationery",
    originalPrice: 12.99, salePrice: 6.99,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.8, reviews: 3780,
    amazonKeyword: "Sticky+Notes+Pastel+Colours+600+Sheets",
  },
  {
    id: "u20-20",
    name: "Scented Soy Wax Candle Lavender",
    category: "Home",
    originalPrice: 18.99, salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.9, reviews: 7890,
    amazonKeyword: "Scented+Soy+Wax+Candle+Lavender",
  },
  {
    id: "u20-21",
    name: "Cable Knit Cushion Cover 45x45cm",
    category: "Home",
    originalPrice: 16.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 2340,
    amazonKeyword: "Cable+Knit+Cushion+Cover+45x45",
    trending: true,
  },
  // Electronics
  {
    id: "u20-22",
    name: "USB-C Fast Charging Cable 3-Pack 2m",
    category: "Electronics",
    originalPrice: 19.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.7, reviews: 9870,
    amazonKeyword: "USB-C+Fast+Charging+Cable+3+Pack+2m",
  },
  {
    id: "u20-23",
    name: "Laptop Stand Foldable Portable Aluminium",
    category: "Electronics",
    originalPrice: 28.99, salePrice: 18.99,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    badge: "HOT DEAL", badgeColor: "bg-red-500",
    rating: 4.7, reviews: 3450,
    amazonKeyword: "Foldable+Laptop+Stand+Portable+Aluminium",
  },
  {
    id: "u20-24",
    name: "Wireless Charging Pad 15W Fast Charge",
    category: "Electronics",
    originalPrice: 24.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 5430,
    amazonKeyword: "Wireless+Charging+Pad+15W+Fast+Charge",
    trending: true,
  },
  {
    id: "u20-25",
    name: "Screen Cleaning Kit Microfibre Spray",
    category: "Electronics",
    originalPrice: 12.99, salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 6780,
    amazonKeyword: "Screen+Cleaning+Kit+Microfibre+Spray",
  },
  // Fashion & Accessories
  {
    id: "u20-26",
    name: "Minimalist Leather Bifold Wallet Men",
    category: "Fashion",
    originalPrice: 24.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    badge: "BEST VALUE", badgeColor: "bg-[#c9a84c]",
    rating: 4.7, reviews: 4560,
    amazonKeyword: "Minimalist+Leather+Bifold+Wallet+Men",
  },
  {
    id: "u20-27",
    name: "Bamboo Wooden Watch Minimalist Unisex",
    category: "Watches",
    originalPrice: 34.99, salePrice: 19.99,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
    badge: "BEST VALUE", badgeColor: "bg-[#c9a84c]",
    rating: 4.6, reviews: 1560,
    amazonKeyword: "Bamboo+Wooden+Watch+Minimalist+Unisex",
  },
  {
    id: "u20-28",
    name: "Silk Scrunchies Set 10 Pack Pastel",
    category: "Fashion",
    originalPrice: 14.99, salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.8, reviews: 8900,
    amazonKeyword: "Silk+Scrunchies+Set+10+Pack+Pastel",
    trending: true,
  },
  {
    id: "u20-29",
    name: "Canvas Tote Bag Aesthetic Printed",
    category: "Bags",
    originalPrice: 18.99, salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.7, reviews: 3450,
    amazonKeyword: "Canvas+Tote+Bag+Aesthetic+Printed",
    trending: true,
  },
  {
    id: "u20-30",
    name: "Beaded Bracelets Set Boho Handmade",
    category: "Jewellery",
    originalPrice: 15.99, salePrice: 8.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.9, reviews: 11200,
    amazonKeyword: "Beaded+Bracelets+Set+Boho+Handmade",
    trending: true,
  },
  // Baby & Kids
  {
    id: "u20-31",
    name: "Baby Silicone Teething Toys BPA Free",
    category: "Baby",
    originalPrice: 16.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.9, reviews: 7650,
    amazonKeyword: "Baby+Silicone+Teething+Toys+BPA+Free",
  },
  {
    id: "u20-32",
    name: "Kids Colouring Book 200 Pages Animals",
    category: "Kids",
    originalPrice: 12.99, salePrice: 6.99,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 5430,
    amazonKeyword: "Kids+Colouring+Book+200+Pages+Animals",
  },
  // Stationery & Office
  {
    id: "u20-33",
    name: "Aesthetic Journaling Pens Set 20 Colours",
    category: "Stationery",
    originalPrice: 17.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.8, reviews: 6780,
    amazonKeyword: "Aesthetic+Journaling+Pens+Set+20+Colours",
    trending: true,
  },
  {
    id: "u20-34",
    name: "A5 Hardcover Notebook Dotted Journal",
    category: "Stationery",
    originalPrice: 14.99, salePrice: 8.99,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.7, reviews: 4560,
    amazonKeyword: "A5+Hardcover+Notebook+Dotted+Journal",
    trending: true,
  },
  {
    id: "u20-35",
    name: "Desk Cable Management Clips 20 Pack",
    category: "Stationery",
    originalPrice: 13.99, salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.6, reviews: 3210,
    amazonKeyword: "Desk+Cable+Management+Clips+20+Pack",
  },
  // Automotive
  {
    id: "u20-36",
    name: "Car Air Freshener Vent Clip Luxury Scent",
    category: "Automotive",
    originalPrice: 14.99, salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.7, reviews: 8900,
    amazonKeyword: "Car+Air+Freshener+Vent+Clip+Luxury+Scent",
    trending: true,
  },
  {
    id: "u20-37",
    name: "Microfibre Car Cleaning Cloths 10 Pack",
    category: "Automotive",
    originalPrice: 18.99, salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 5670,
    amazonKeyword: "Microfibre+Car+Cleaning+Cloths+10+Pack",
  },
  // Photography
  {
    id: "u20-38",
    name: "Phone Tripod Mini Flexible Gorilla Pod",
    category: "Photography",
    originalPrice: 19.99, salePrice: 12.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 4320,
    amazonKeyword: "Phone+Tripod+Mini+Flexible+Gorilla+Pod",
    trending: true,
  },
  {
    id: "u20-39",
    name: "Ring Light 10 inch Selfie LED USB",
    category: "Photography",
    originalPrice: 24.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.7, reviews: 9870,
    amazonKeyword: "Ring+Light+10+inch+Selfie+LED+USB",
    trending: true,
  },
  // Gaming
  {
    id: "u20-40",
    name: "Gaming Controller Thumb Grips 8 Pack",
    category: "Gaming",
    originalPrice: 12.99, salePrice: 6.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 7650,
    amazonKeyword: "Gaming+Controller+Thumb+Grips+8+Pack",
  },
  {
    id: "u20-41",
    name: "RGB Gaming Mouse Pad XL Desk Mat",
    category: "Gaming",
    originalPrice: 22.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1593640408182-31c228b42b8b?w=400&q=80",
    badge: "HOT DEAL", badgeColor: "bg-red-500",
    rating: 4.7, reviews: 5430,
    amazonKeyword: "RGB+Gaming+Mouse+Pad+XL+Desk+Mat",
  },
  // Jewellery
  {
    id: "u20-42",
    name: "Gold Plated Stacking Rings Set 5 Pieces",
    category: "Jewellery",
    originalPrice: 19.99, salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.8, reviews: 6780,
    amazonKeyword: "Gold+Plated+Stacking+Rings+Set+5+Pieces",
    trending: true,
  },
  {
    id: "u20-43",
    name: "Pearl Drop Earrings Minimalist Gold",
    category: "Jewellery",
    originalPrice: 16.99, salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    badge: "VIRAL", badgeColor: "bg-purple-500",
    rating: 4.9, reviews: 8900,
    amazonKeyword: "Pearl+Drop+Earrings+Minimalist+Gold",
    trending: true,
  },
  // More Gadgets
  {
    id: "u20-44",
    name: "Smart Plug WiFi Alexa Compatible 4 Pack",
    category: "Gadgets",
    originalPrice: 29.99, salePrice: 19.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "HOT DEAL", badgeColor: "bg-red-500",
    rating: 4.6, reviews: 4560,
    amazonKeyword: "Smart+Plug+WiFi+Alexa+Compatible+4+Pack",
  },
  {
    id: "u20-45",
    name: "Digital Kitchen Scale 5kg Precision",
    category: "Home",
    originalPrice: 19.99, salePrice: 12.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 7890,
    amazonKeyword: "Digital+Kitchen+Scale+5kg+Precision",
  },
  {
    id: "u20-46",
    name: "Portable Power Bank 10000mAh Slim",
    category: "Electronics",
    originalPrice: 34.99, salePrice: 19.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
    badge: "HOT DEAL", badgeColor: "bg-red-500",
    rating: 4.7, reviews: 6780,
    amazonKeyword: "Portable+Power+Bank+10000mAh+Slim",
  },
  {
    id: "u20-47",
    name: "Aromatherapy Essential Oil Diffuser USB",
    category: "Home",
    originalPrice: 22.99, salePrice: 13.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.7, reviews: 5430,
    amazonKeyword: "Aromatherapy+Essential+Oil+Diffuser+USB",
    trending: true,
  },
  {
    id: "u20-48",
    name: "Yoga Mat Non-Slip 6mm Thick",
    category: "Sports",
    originalPrice: 29.99, salePrice: 18.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.8, reviews: 9870,
    amazonKeyword: "Yoga+Mat+Non-Slip+6mm+Thick",
  },
  {
    id: "u20-49",
    name: "Sunglasses Polarised UV400 Unisex",
    category: "Fashion",
    originalPrice: 24.99, salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    badge: "TRENDING", badgeColor: "bg-pink-500",
    rating: 4.6, reviews: 3450,
    amazonKeyword: "Sunglasses+Polarised+UV400+Unisex",
    trending: true,
  },
  {
    id: "u20-50",
    name: "Compact Umbrella Windproof Auto Open",
    category: "Fashion",
    originalPrice: 19.99, salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "BEST SELLER", badgeColor: "bg-green-500",
    rating: 4.7, reviews: 4560,
    amazonKeyword: "Compact+Umbrella+Windproof+Auto+Open",
  },
];

const trendingCategories = [
  { label: "All", value: "all" },
  { label: "Gadgets", value: "Gadgets" },
  { label: "Beauty", value: "Beauty" },
  { label: "Home", value: "Home" },
  { label: "Sports", value: "Sports" },
  { label: "Electronics", value: "Electronics" },
  { label: "Fashion", value: "Fashion" },
  { label: "Jewellery", value: "Jewellery" },
  { label: "Gaming", value: "Gaming" },
];

export default function Under20Page() {
  return (
    <main className="min-h-screen bg-[#07080F] pt-20">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0a001a] via-[#12003a] to-[#0a001a] border-b border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-purple-400 animate-pulse" />
                <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">Impulse Buys · Trending Now</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                💸 Deals Under <span className="text-purple-400">£20</span>
              </h1>
              <p className="text-[#aaaacc] text-lg">
                Trending finds, viral gadgets & impulse buys — all under twenty pounds.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-6 py-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                <div className="text-3xl font-black text-purple-400">£20</div>
                <div className="text-xs text-[#8888aa] uppercase tracking-wide">Max Price</div>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl bg-pink-500/10 border border-pink-500/30">
                <div className="text-3xl font-black text-pink-400">50+</div>
                <div className="text-xs text-[#8888aa] uppercase tracking-wide">Trending Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {trendingCategories.map((cat) => (
            <span
              key={cat.label}
              className="px-4 py-2 rounded-full text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-[#8888aa] hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all cursor-pointer"
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Trending Banner */}
        <div className="flex items-center gap-3 mb-6 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <p className="text-[#ccaaff] text-sm">
            <span className="font-bold text-white">Trending right now</span> — These products are flying off the shelves. Updated daily based on viral trends.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {under20Products.map((product) => {
            const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
            const amazonUrl = `https://www.amazon.co.uk/s?k=${product.amazonKeyword}&tag=${AFFILIATE_TAG}`;

            return (
              <a
                key={product.id}
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl bg-[#0e0f1a] border border-white/[0.06] hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.12)] overflow-hidden"
              >
                {/* Trending Fire */}
                {product.trending && (
                  <div className="absolute top-2 right-2 z-10 text-base">🔥</div>
                )}

                {/* Badge */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase text-white ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#c9a84c] text-black">
                    -{discount}%
                  </span>
                </div>

                {/* Image */}
                <div className="h-36 overflow-hidden bg-[#13141f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#8888aa]" />
                    <span className="text-[#8888aa] text-[10px]">{product.category}</span>
                  </div>

                  <h3 className="text-white text-xs font-semibold line-clamp-2 group-hover:text-purple-300 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#c9a84c] fill-[#c9a84c]" />
                    <span className="text-[#c9a84c] text-[10px] font-bold">{product.rating}</span>
                    <span className="text-[#666688] text-[10px]">({product.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-purple-400">£{product.salePrice.toFixed(2)}</span>
                      <span className="text-xs text-[#666688] line-through">£{product.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1 mt-1">
                    <ShoppingBag className="w-3 h-3" /> Buy Now
                  </button>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center py-10 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20">
          <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-3" />
          <h3 className="text-white text-2xl font-bold mb-2">Discover More Under £20</h3>
          <p className="text-[#8888aa] mb-5">Thousands more trending products on Amazon UK — all under twenty pounds</p>
          <a
            href={`https://www.amazon.co.uk/s?k=trending+products+under+20+pounds&tag=${AFFILIATE_TAG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity"
          >
            <Zap className="w-5 h-5" />
            Explore More on Amazon UK
          </a>
          <div className="mt-4">
            <Link href="/deals" className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold hover:text-orange-300">
              Also check 🔥 Super Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
