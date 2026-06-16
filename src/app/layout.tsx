import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LuxeShop — Premium Shopping Aggregator",
  description: "Discover millions of products from AliExpress and Amazon at unbeatable prices. Your ultimate luxury shopping destination.",
  keywords: ["shopping", "aggregator", "aliexpress", "amazon", "luxury", "deals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
