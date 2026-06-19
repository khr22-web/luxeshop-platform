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
  {
    id: "u20-1",
    name: "Magnetic Phone Holder for Car Dashboard",
    category: "Automotive",
    originalPrice: 24.99,
    salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80",
    badge: "TRENDING",
    badgeColor: "bg-pink-500",
    rating: 4.8,
    reviews: 2341,
    amazonKeyword: "Magnetic+Phone+Holder+Car+Dashboard",
    trending: true,
  },
  {
    id: "u20-2",
    name: "LED Strip Lights USB — 5m Colour Changing",
    category: "Home",
    originalPrice: 29.99,
    salePrice: 12.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "VIRAL",
    badgeColor: "bg-purple-500",
    rating: 4.7,
    reviews: 5892,
    amazonKeyword: "LED+Strip+Lights+USB+Colour+Changing+5m",
    trending: true,
  },
  {
    id: "u20-3",
    name: "Stainless Steel Insulated Water Bottle 500ml",
    category: "Sports",
    originalPrice: 22.99,
    salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    badge: "BEST SELLER",
    badgeColor: "bg-green-500",
    rating: 4.9,
    reviews: 8120,
    amazonKeyword: "Stainless+Steel+Insulated+Water+Bottle+500ml",
  },
  {
    id: "u20-4",
    name: "Wireless Earbuds — Bluetooth 5.3 Sport",
    category: "Audio",
    originalPrice: 39.99,
    salePrice: 17.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    badge: "HOT DEAL",
    badgeColor: "bg-red-500",
    rating: 4.5,
    reviews: 3210,
    amazonKeyword: "Wireless+Earbuds+Bluetooth+5+Sport",
    trending: true,
  },
  {
    id: "u20-5",
    name: "Portable Mini Fan USB Rechargeable",
    category: "Home",
    originalPrice: 18.99,
    salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    badge: "TRENDING",
    badgeColor: "bg-pink-500",
    rating: 4.6,
    reviews: 1890,
    amazonKeyword: "Portable+Mini+USB+Rechargeable+Fan",
    trending: true,
  },
  {
    id: "u20-6",
    name: "Silicone Cable Organiser Set — 10 Pack",
    category: "Electronics",
    originalPrice: 15.99,
    salePrice: 7.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    badge: "VIRAL",
    badgeColor: "bg-purple-500",
    rating: 4.7,
    reviews: 4560,
    amazonKeyword: "Silicone+Cable+Organiser+Set+10+Pack",
  },
  {
    id: "u20-7",
    name: "Resistance Bands Set — 5 Levels Home Gym",
    category: "Sports",
    originalPrice: 24.99,
    salePrice: 13.99,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    badge: "BEST SELLER",
    badgeColor: "bg-green-500",
    rating: 4.8,
    reviews: 6780,
    amazonKeyword: "Resistance+Bands+Set+5+Levels+Home+Gym",
  },
  {
    id: "u20-8",
    name: "Acne Pimple Patches — 72 Invisible Dots",
    category: "Beauty",
    originalPrice: 12.99,
    salePrice: 6.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
    badge: "VIRAL",
    badgeColor: "bg-purple-500",
    rating: 4.9,
    reviews: 12400,
    amazonKeyword: "Acne+Pimple+Patches+Invisible+Hydrocolloid",
    trending: true,
  },
  {
    id: "u20-9",
    name: "Foldable Laptop Stand Portable Aluminium",
    category: "Computers",
    originalPrice: 28.99,
    salePrice: 18.99,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    badge: "HOT DEAL",
    badgeColor: "bg-red-500",
    rating: 4.7,
    reviews: 3450,
    amazonKeyword: "Foldable+Laptop+Stand+Portable+Aluminium",
  },
  {
    id: "u20-10",
    name: "Reusable Makeup Remover Pads — 16 Pack",
    category: "Beauty",
    originalPrice: 14.99,
    salePrice: 8.99,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    badge: "ECO PICK",
    badgeColor: "bg-emerald-600",
    rating: 4.8,
    reviews: 7890,
    amazonKeyword: "Reusable+Makeup+Remover+Pads+16+Pack",
  },
  {
    id: "u20-11",
    name: "Mini Projector Keychain Torch LED",
    category: "Gadgets",
    originalPrice: 19.99,
    salePrice: 11.99,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    badge: "TRENDING",
    badgeColor: "bg-pink-500",
    rating: 4.4,
    reviews: 2100,
    amazonKeyword: "Mini+LED+Projector+Keychain+Torch",
    trending: true,
  },
  {
    id: "u20-12",
    name: "Bamboo Wooden Watch — Minimalist Unisex",
    category: "Watches",
    originalPrice: 34.99,
    salePrice: 19.99,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
    badge: "BEST VALUE",
    badgeColor: "bg-[#c9a84c]",
    rating: 4.6,
    reviews: 1560,
    amazonKeyword: "Bamboo+Wooden+Watch+Minimalist+Unisex",
  },
  {
    id: "u20-13",
    name: "Gel Nail Polish Kit — 12 Colours UV LED",
    category: "Beauty",
    originalPrice: 29.99,
    salePrice: 16.99,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
    badge: "VIRAL",
    badgeColor: "bg-purple-500",
    rating: 4.7,
    reviews: 9230,
    amazonKeyword: "Gel+Nail+Polish+Kit+12+Colours+UV+LED",
    trending: true,
  },
  {
    id: "u20-14",
    name: "Posture Corrector Back Support Brace",
    category: "Sports",
    originalPrice: 22.99,
    salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    badge: "BEST SELLER",
    badgeColor: "bg-green-500",
    rating: 4.5,
    reviews: 4320,
    amazonKeyword: "Posture+Corrector+Back+Support+Brace",
  },
  {
    id: "u20-15",
    name: "Sticky Notes Pastel Colours — 600 Sheets",
    category: "Stationery",
    originalPrice: 12.99,
    salePrice: 6.99,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    badge: "TRENDING",
    badgeColor: "bg-pink-500",
    rating: 4.8,
    reviews: 3780,
    amazonKeyword: "Sticky+Notes+Pastel+Colours+600+Sheets",
  },
  {
    id: "u20-16",
    name: "Phone Screen Magnifier 3D HD Amplifier",
    category: "Gadgets",
    originalPrice: 16.99,
    salePrice: 9.99,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
    badge: "VIRAL",
    badgeColor: "bg-purple-500",
    rating: 4.3,
    reviews: 5670,
    amazonKeyword: "Phone+Screen+Magnifier+3D+HD+Amplifier",
    trending: true,
  },
];

const trendingCategories = [
  { label: "All", href: "/under20" },
  { label: "Gadgets", href: "/under20?cat=gadgets" },
  { label: "Beauty", href: "/under20?cat=beauty" },
  { label: "Home", href: "/under20?cat=home" },
  { label: "Sports", href: "/under20?cat=sports" },
  { label: "Electronics", href: "/under20?cat=electronics" },
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
                <div className="text-3xl font-black text-pink-400">{under20Products.length}+</div>
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
            <Link
              key={cat.label}
              href={cat.href}
              className="px-4 py-2 rounded-full text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-[#8888aa] hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
            >
              {cat.label}
            </Link>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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
                  <div className="absolute top-2 right-2 z-10 text-lg">🔥</div>
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
                <div className="h-40 overflow-hidden bg-[#13141f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#8888aa]" />
                    <span className="text-[#8888aa] text-[11px]">{product.category}</span>
                  </div>

                  <h3 className="text-white text-xs font-semibold line-clamp-2 group-hover:text-purple-300 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#c9a84c] fill-[#c9a84c]" />
                    <span className="text-[#c9a84c] text-[11px] font-bold">{product.rating}</span>
                    <span className="text-[#666688] text-[11px]">({product.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-purple-400">£{product.salePrice.toFixed(2)}</span>
                      <span className="text-xs text-[#666688] line-through">£{product.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 mt-1">
                    <ShoppingBag className="w-3.5 h-3.5" /> Buy Now
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
        </div>
      </div>
    </main>
  );
}
