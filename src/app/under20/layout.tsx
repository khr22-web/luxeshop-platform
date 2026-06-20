import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Deals Under £20 — Trending Finds | LuxeShop London",
  description: "Discover the best trending products under £20. Impulse buys, viral gadgets, fashion accessories and more — all under twenty pounds. Shop on AliExpress & Amazon UK.",
  openGraph: {
    title: "Deals Under £20 — Trending Finds | LuxeShop London",
    description: "50+ trending products all under £20. Viral gadgets, beauty, fashion & more.",
    url: "https://luxeshoplondon.co.uk/under20",
  },
};
export default function Under20Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
