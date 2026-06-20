import Link from "next/link";
const platforms = [
  { name: "Amazon UK", emoji: "📦", color: "#f90", bg: "rgba(255,153,0,0.06)", border: "rgba(255,153,0,0.25)", desc: "Millions of products with Prime delivery, buyer protection, and easy returns.", href: "https://www.amazon.co.uk/?tag=luxeshoplondo-21", tag: "Most Popular" },
  { name: "AliExpress", emoji: "🛒", color: "#e8441a", bg: "rgba(232,68,26,0.06)", border: "rgba(232,68,26,0.25)", desc: "Unbeatable prices on trending products shipped worldwide from top sellers.", href: "https://www.aliexpress.com/", tag: "Best Prices" },
  { name: "Temu", emoji: "🏷️", color: "#ff6900", bg: "rgba(255,105,0,0.06)", border: "rgba(255,105,0,0.25)", desc: "Shop like a billionaire — incredible deals on fashion, home, and more.", href: "https://temu.to/m/luxeshoplondon", tag: "New" },
];
export default function SourceShowcase() {
  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f0f0f] tracking-tight mb-2">Powered by the World&apos;s Best Platforms</h2>
          <p className="text-gray-500 text-sm">We aggregate products from three of the world&apos;s largest shopping platforms — all in one place.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" style={{ background: p.bg, borderColor: p.border }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className="text-lg font-black" style={{ color: p.color }}>{p.name}</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: p.color }}>{p.tag}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: p.color }}>Shop Now →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
