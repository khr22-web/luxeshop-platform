// ============================================================
// LuxeShop — AliExpress Integration Types
// ============================================================

/**
 * Raw product object returned by the AliExpress True API (RapidAPI).
 * Field names match the exact JSON keys from the API response.
 */
export interface AliExpressRawProduct {
  product_id: number | string;
  product_title: string;
  product_main_image_url: string;
  product_small_image_urls?: { string: string[] };
  product_video_url?: string;
  /** Sale price in target currency (string, e.g. "29.99") */
  target_sale_price: string;
  /** Original price before discount */
  target_original_price?: string;
  /** Discount percentage string, e.g. "50%" */
  discount?: string;
  /** Commission rate for affiliate, e.g. "7%" */
  commission_rate?: string;
  /** Affiliate deep-link */
  promotion_link?: string;
  /** Star rating, e.g. "4.8" */
  evaluate_rate?: string;
  /** Total units sold */
  lastest_volume?: number;
  /** Target currency code */
  target_sale_price_currency?: string;
}

/**
 * Normalised product object used throughout LuxeShop.
 * All prices are numbers (not strings) and the 20 % markup is already applied.
 */
export interface LuxeProduct {
  /** Unique AliExpress product ID */
  id: string;
  /** Product title */
  title: string;
  /** Primary high-resolution image URL */
  imageUrl: string;
  /** Additional image URLs (gallery) */
  galleryImages: string[];
  /** Optional product demo video URL */
  videoUrl?: string;

  // ── Pricing ──────────────────────────────────────────────
  /** Original AliExpress sale price (USD) — what AliExpress charges */
  originalAliPrice: number;
  /** Our displayed price = originalAliPrice × 1.20 (20 % markup) */
  ourPrice: number;
  /** Original list price on AliExpress (before their own discount) */
  listPrice?: number;
  /** Markup percentage applied by LuxeShop (always 20) */
  markupPercent: number;
  /** Currency code, e.g. "USD" */
  currency: string;
  /** Profit per sale = ourPrice − originalAliPrice */
  profitPerSale: number;

  // ── Metadata ─────────────────────────────────────────────
  /** AliExpress discount percentage (their own promo, e.g. 50) */
  aliDiscount?: number;
  /** Star rating 0–5 */
  rating: number;
  /** Total units sold */
  soldCount: number;
  /** Direct affiliate / product link */
  affiliateLink?: string;
  /** Data source identifier */
  source: "aliexpress";
}

/**
 * Paginated response wrapper returned by our /api/aliexpress/search route.
 */
export interface AliExpressSearchResponse {
  success: boolean;
  keyword: string;
  page: number;
  pageSize: number;
  totalResults: number;
  totalPages: number;
  products: LuxeProduct[];
  /** ISO timestamp of when the data was fetched */
  fetchedAt: string;
  /** Pricing policy metadata */
  pricingPolicy: {
    markupPercent: number;
    description: string;
  };
}

/**
 * Single product detail response from /api/aliexpress/product?id=...
 */
export interface AliExpressProductResponse {
  success: boolean;
  product: LuxeProduct | null;
  fetchedAt: string;
  pricingPolicy: {
    markupPercent: number;
    description: string;
  };
}

/**
 * Hot products response from /api/aliexpress/hot-products
 */
export interface AliExpressHotProductsResponse {
  success: boolean;
  page: number;
  pageSize: number;
  products: LuxeProduct[];
  fetchedAt: string;
  pricingPolicy: {
    markupPercent: number;
    description: string;
  };
}
