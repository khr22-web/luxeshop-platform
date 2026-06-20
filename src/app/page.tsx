import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SuperDealsSection from "@/components/SuperDealsSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import SourceShowcase from "@/components/SourceShowcase";
import NewsletterBanner from "@/components/NewsletterBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SuperDealsSection />
      <CategoriesGrid />
      <FeaturedProducts />
      <SourceShowcase />
      <NewsletterBanner />
      <Footer />
    </main>
  );
}
