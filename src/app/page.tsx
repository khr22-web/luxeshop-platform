import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import SourceShowcase from "@/components/SourceShowcase";
import NewsletterBanner from "@/components/NewsletterBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <HeroSection />
      <CategoriesGrid />
      <FeaturedProducts />
      <SourceShowcase />
      <NewsletterBanner />
      <Footer />
    </main>
  );
}
