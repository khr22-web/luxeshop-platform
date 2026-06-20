import Link from "next/link";

const categories = [
  { slug: "electronics", label: "Electronics", emoji: "📱", count: "2.4M+" },
  { slug: "fashion", label: "Fashion", emoji: "👗", count: "5.1M+" },
  { slug: "home-garden", label: "Home & Garden", emoji: "🏠", count: "3.2M+" },
  { slug: "gaming", label: "Gaming", emoji: "🎮", count: "760K+" },
  { slug: "sports", label: "Sports", emoji: "💪", count: "1.8M+" },
  { slug: "beauty", label: "Beauty", emoji: "💄", count: "2.1M+" },
  { slug: "watches", label: "Watches", emoji: "⌚", count: "890K+" },
  { slug: "bags", label: "Bags", emoji: "👜", count: "1.2M+" },
  { slug: "baby-kids", label: "Baby & Kids", emoji: "🧸", count: "1.1M+" },
  { slug: "automotive", label: "Automotive", emoji: "🚗", count: "940K+" },
  { slug: "computers", label: "Computers", emoji: "💻", count: "890K+" },
  { slug: "jewelry", label: "Jewellery", emoji: "💎", count: "670K+" },
];

export default function CategoriesGrid() {
  return (
    <section className="bg-gray-50 py-14 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f0f0f] tracking-tight">Shop by Category</h2>
            <p className="text-gray-500 text-sm mt-1">From electronics to fashion — explore every category</p>
          </div>
          <Link href="/search" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1a1a2e] hover:underline">
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#1a1a2e]/20 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-[#1a1a2e]/5 flex items-center justify-center text-2xl transition-colors">
                {cat.emoji}
              </div>
              <div>
                <p className="text-xs font-bold text-[#0f0f0f] group-hover:text-[#1a1a2e] transition-colors leading-tight">{cat.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
