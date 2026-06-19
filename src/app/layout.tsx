import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LuxeShop London — Premium Luxury Shopping",
    template: "%s | LuxeShop London",
  },
  description: "Discover thousands of premium luxury products from top brands. Free UK delivery, secure checkout with Stripe & PayPal. Your ultimate luxury shopping destination in London.",
  keywords: ["luxury shopping", "premium products", "LuxeShop London", "designer goods", "luxury electronics", "luxury fashion", "UK luxury store", "online luxury shopping", "aliexpress", "amazon", "luxury deals", "free delivery UK"],
  metadataBase: new URL("https://luxeshoplondon.co.uk"),
  alternates: { canonical: "https://luxeshoplondon.co.uk" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://luxeshoplondon.co.uk",
    siteName: "LuxeShop London",
    title: "LuxeShop London — Premium Luxury Shopping",
    description: "Discover thousands of premium luxury products. Free UK delivery, secure checkout.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LuxeShop London" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeShop London — Premium Luxury Shopping",
    description: "Discover thousands of premium luxury products. Free UK delivery, secure checkout.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
        <Script id="sd-org" type="application/ld+json">
          {`{"@context":"https://schema.org","@type":"Organization","name":"LuxeShop London","url":"https://luxeshoplondon.co.uk","logo":"https://luxeshoplondon.co.uk/logo.png"}`}
        </Script>
        <Script id="sd-site" type="application/ld+json">
          {`{"@context":"https://schema.org","@type":"WebSite","name":"LuxeShop London","url":"https://luxeshoplondon.co.uk","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://luxeshoplondon.co.uk/search?q={search_term_string}"},"query-input":"required name=search_term_string"}}`}
        </Script>
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
