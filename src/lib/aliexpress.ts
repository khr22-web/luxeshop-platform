/**
 * ============================================================
 * LuxeShop — AliExpress Service Layer
 * ============================================================
 *
 * Integration Strategy:
 *   We use the "AliExpress True API" hosted on RapidAPI
 *   (https://rapidapi.com/georgekhananaev/api/aliexpress-true-api).
 *   It wraps the official AliExpress Open Platform endpoints and
 *   returns clean, structured JSON — no scraping, no fragile HTML parsing.
 *
 * Pricing Formula:
 *   ourPrice = aliExpressPrice × (1 + MARKUP_PERCENT / 100)
 *   e.g.  $25.00 × 1.20 = $30.00  (20 % markup → $5.00 profit per sale)
 *
 * Environment Variables Required (add to .env.local):
 *   RAPIDAPI_KEY=your_rapidapi_key_here
 *
 * Fallback Behaviour:
 *   When no API key is configured (development / demo mode) the service
 *   returns a rich set of realistic mock products so the UI always renders.
 * ============================================================
 */

import type {
  AliExpressRawProduct,
  LuxeProduct,
  AliExpressSearchResponse,
  AliExpressProductResponse,
  AliExpressHotProductsResponse,
} from "@/types/aliexpress";

// ── Constants ────────────────────────────────────────────────────────────────

/** LuxeShop profit markup applied on top of every AliExpress price */
export const MARKUP_PERCENT = 20;

const RAPIDAPI_HOST = "aliexpress-true-api.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}/api/v3`;

// ── Pricing Engine ────────────────────────────────────────────────────────────

/**
 * Apply the 20 % LuxeShop markup to an AliExpress price.
 *
 * @param aliPrice  - Raw price from AliExpress (number, USD)
 * @returns         - Object with ourPrice and profitPerSale, both rounded to 2 dp
 *
 * Formula:
 *   ourPrice      = aliPrice × 1.20
 *   profitPerSale = ourPrice − aliPrice
 */
export function applyMarkup(aliPrice: number): {
  ourPrice: number;
  profitPerSale: number;
} {
  const ourPrice = parseFloat((aliPrice * (1 + MARKUP_PERCENT / 100)).toFixed(2));
  const profitPerSale = parseFloat((ourPrice - aliPrice).toFixed(2));
  return { ourPrice, profitPerSale };
}

/**
 * Parse a price string like "29.99" or "$29.99" into a float.
 * Returns 0 if the string is empty or unparseable.
 */
function parsePrice(raw: string | undefined): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

/**
 * Parse a percentage string like "50%" into a number (50).
 */
function parsePercent(raw: string | undefined): number {
  if (!raw) return 0;
  return parseFloat(raw.replace("%", "")) || 0;
}

// ── Data Normaliser ───────────────────────────────────────────────────────────

/**
 * Transform a raw AliExpress API product into a LuxeProduct.
 * This is the single place where the pricing formula is applied.
 */
export function normaliseProduct(raw: AliExpressRawProduct): LuxeProduct {
  const aliPrice = parsePrice(raw.target_sale_price);
  const { ourPrice, profitPerSale } = applyMarkup(aliPrice);

  const galleryImages: string[] =
    raw.product_small_image_urls?.string?.filter(Boolean) ?? [];

  return {
    id: String(raw.product_id),
    title: raw.product_title ?? "Untitled Product",
    imageUrl: raw.product_main_image_url ?? "",
    galleryImages,
    videoUrl: raw.product_video_url,

    // Pricing
    originalAliPrice: aliPrice,
    ourPrice,
    listPrice: parsePrice(raw.target_original_price) || undefined,
    markupPercent: MARKUP_PERCENT,
    currency: raw.target_sale_price_currency ?? "USD",
    profitPerSale,

    // Metadata
    aliDiscount: parsePercent(raw.discount) || undefined,
    rating: parseFloat(raw.evaluate_rate ?? "0") || 0,
    soldCount: raw.lastest_volume ?? 0,
    affiliateLink: raw.promotion_link,
    source: "aliexpress",
  };
}

// ── HTTP Client ───────────────────────────────────────────────────────────────

async function rapidApiFetch<T>(
  endpoint: string,
  params: Record<string, string | number>
): Promise<T> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error("RAPIDAPI_KEY environment variable is not set.");
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, String(v))
  );

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
    // Next.js 15 cache: revalidate every 60 minutes
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `AliExpress API error ${res.status}: ${res.statusText} — ${body}`
    );
  }

  return res.json() as Promise<T>;
}

// ── Mock Data (Demo / No-Key Mode) ────────────────────────────────────────────

const MOCK_PRODUCTS: AliExpressRawProduct[] = [
  {
    product_id: "1005006079931969",
    product_title: "TWS Wireless Earbuds Bluetooth 5.3 Noise Cancelling",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/S8c0b8b6f0f9e4b3a8e2d1c7f5a4b3c2d.jpg",
    product_small_image_urls: {
      string: [
        "https://ae01.alicdn.com/kf/S8c0b8b6f0f9e4b3a8e2d1c7f5a4b3c2d.jpg",
        "https://ae01.alicdn.com/kf/S1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg",
      ],
    },
    target_sale_price: "24.99",
    target_original_price: "59.99",
    discount: "58%",
    commission_rate: "8%",
    evaluate_rate: "4.8",
    lastest_volume: 18420,
    promotion_link: "https://s.click.aliexpress.com/e/_mock1",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005007234567890",
    product_title: "Smart Watch Pro X5 Health Monitor Blood Oxygen GPS",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/Sabc123def456ghi789jkl012mno345p.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "45.50",
    target_original_price: "99.00",
    discount: "54%",
    commission_rate: "6%",
    evaluate_rate: "4.7",
    lastest_volume: 9832,
    promotion_link: "https://s.click.aliexpress.com/e/_mock2",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005005123456789",
    product_title: "4K Action Camera Waterproof 40m WiFi EIS Stabilization",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/S4k_camera_main_image_placeholder.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "38.99",
    target_original_price: "89.99",
    discount: "57%",
    commission_rate: "7%",
    evaluate_rate: "4.6",
    lastest_volume: 5219,
    promotion_link: "https://s.click.aliexpress.com/e/_mock3",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005004987654321",
    product_title: "RGB Mechanical Gaming Keyboard TKL Hot-Swappable",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/Srgb_keyboard_main_image_placeholder.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "52.00",
    target_original_price: "110.00",
    discount: "53%",
    commission_rate: "5%",
    evaluate_rate: "4.9",
    lastest_volume: 23651,
    promotion_link: "https://s.click.aliexpress.com/e/_mock4",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005003876543210",
    product_title: "Portable Bluetooth Speaker IPX7 Waterproof 360° Bass",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/Sspeaker_main_image_placeholder.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "29.99",
    target_original_price: "65.00",
    discount: "54%",
    commission_rate: "9%",
    evaluate_rate: "4.5",
    lastest_volume: 7830,
    promotion_link: "https://s.click.aliexpress.com/e/_mock5",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005002765432109",
    product_title: "LED Smart Strip Lights 16M Colors App Control 5m",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/Sled_strip_main_image_placeholder.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "18.50",
    target_original_price: "42.00",
    discount: "56%",
    commission_rate: "10%",
    evaluate_rate: "4.7",
    lastest_volume: 15420,
    promotion_link: "https://s.click.aliexpress.com/e/_mock6",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005001654321098",
    product_title: "Laptop Stand Adjustable Aluminium Alloy Ergonomic",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/Slaptop_stand_main_image_placeholder.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "22.00",
    target_original_price: "48.00",
    discount: "54%",
    commission_rate: "7%",
    evaluate_rate: "4.8",
    lastest_volume: 11200,
    promotion_link: "https://s.click.aliexpress.com/e/_mock7",
    target_sale_price_currency: "USD",
  },
  {
    product_id: "1005000543210987",
    product_title: "Wireless Charging Pad 15W Fast Charge Qi Compatible",
    product_main_image_url:
      "https://ae01.alicdn.com/kf/Scharger_main_image_placeholder.jpg",
    product_small_image_urls: { string: [] },
    target_sale_price: "14.99",
    target_original_price: "35.00",
    discount: "57%",
    commission_rate: "8%",
    evaluate_rate: "4.6",
    lastest_volume: 8900,
    promotion_link: "https://s.click.aliexpress.com/e/_mock8",
    target_sale_price_currency: "USD",
  },
];

function getMockProducts(count = 8): LuxeProduct[] {
  return MOCK_PRODUCTS.slice(0, count).map(normaliseProduct);
}

// ── Public API Functions ──────────────────────────────────────────────────────

/**
 * Search AliExpress products by keyword.
 *
 * @param keyword     - Search term (e.g. "wireless earbuds")
 * @param page        - Page number (1-based)
 * @param pageSize    - Results per page (max 50)
 * @param sortBy      - Sort order
 * @param shipTo      - Destination country code (ISO 3166-1 alpha-2)
 */
export async function searchProducts(
  keyword: string,
  page = 1,
  pageSize = 20,
  sortBy: "SALE_PRICE_ASC" | "SALE_PRICE_DESC" | "LAST_VOLUME_DESC" = "LAST_VOLUME_DESC",
  shipTo = "US"
): Promise<AliExpressSearchResponse> {
  const pricingPolicy = {
    markupPercent: MARKUP_PERCENT,
    description: `All displayed prices include a ${MARKUP_PERCENT}% LuxeShop service markup over the original AliExpress price.`,
  };

  // Demo / no-key mode
  if (!process.env.RAPIDAPI_KEY) {
    const mock = getMockProducts(pageSize);
    return {
      success: true,
      keyword,
      page,
      pageSize,
      totalResults: mock.length,
      totalPages: 1,
      products: mock,
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  }

  try {
    const data = await rapidApiFetch<{
      current_page_no: number;
      current_record_count: number;
      total_page_no: number;
      total_record_count: number;
      products: { product: AliExpressRawProduct[] };
    }>("products", {
      keywords: keyword,
      page_no: page,
      page_size: pageSize,
      sort: sortBy,
      target_currency: "USD",
      target_language: "EN",
      ship_to_country: shipTo,
    });

    const rawProducts = data.products?.product ?? [];
    const products = rawProducts.map(normaliseProduct);

    return {
      success: true,
      keyword,
      page: data.current_page_no ?? page,
      pageSize: data.current_record_count ?? products.length,
      totalResults: data.total_record_count ?? products.length,
      totalPages: data.total_page_no ?? 1,
      products,
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  } catch (err) {
    console.error("[AliExpress] searchProducts error:", err);
    // Graceful fallback to mock data on API error
    const mock = getMockProducts(pageSize);
    return {
      success: false,
      keyword,
      page,
      pageSize,
      totalResults: mock.length,
      totalPages: 1,
      products: mock,
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  }
}

/**
 * Fetch a single product by its AliExpress product ID.
 *
 * @param productId   - AliExpress numeric product ID
 * @param shipTo      - Destination country code
 */
export async function getProductById(
  productId: string,
  shipTo = "US"
): Promise<AliExpressProductResponse> {
  const pricingPolicy = {
    markupPercent: MARKUP_PERCENT,
    description: `All displayed prices include a ${MARKUP_PERCENT}% LuxeShop service markup over the original AliExpress price.`,
  };

  if (!process.env.RAPIDAPI_KEY) {
    const mock = MOCK_PRODUCTS.find((p) => String(p.product_id) === productId);
    return {
      success: true,
      product: mock ? normaliseProduct(mock) : normaliseProduct(MOCK_PRODUCTS[0]),
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  }

  try {
    const data = await rapidApiFetch<AliExpressRawProduct>("product-info", {
      product_id: productId,
      ship_to_country: shipTo,
      target_currency: "USD",
      target_language: "en",
    });

    return {
      success: true,
      product: normaliseProduct(data),
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  } catch (err) {
    console.error("[AliExpress] getProductById error:", err);
    return {
      success: false,
      product: null,
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  }
}

/**
 * Fetch trending / hot products (high commission, high sales).
 *
 * @param keyword     - Optional keyword filter
 * @param page        - Page number
 * @param pageSize    - Results per page
 */
export async function getHotProducts(
  keyword = "",
  page = 1,
  pageSize = 20
): Promise<AliExpressHotProductsResponse> {
  const pricingPolicy = {
    markupPercent: MARKUP_PERCENT,
    description: `All displayed prices include a ${MARKUP_PERCENT}% LuxeShop service markup over the original AliExpress price.`,
  };

  if (!process.env.RAPIDAPI_KEY) {
    return {
      success: true,
      page,
      pageSize,
      products: getMockProducts(pageSize),
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  }

  try {
    const params: Record<string, string | number> = {
      page_no: page,
      page_size: pageSize,
      target_currency: "USD",
      target_language: "EN",
      ship_to_country: "US",
      sort: "LAST_VOLUME_DESC",
    };
    if (keyword) params.keywords = keyword;

    const data = await rapidApiFetch<{
      products: { product: AliExpressRawProduct[] };
    }>("hot-products", params);

    const rawProducts = data.products?.product ?? [];
    return {
      success: true,
      page,
      pageSize,
      products: rawProducts.map(normaliseProduct),
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  } catch (err) {
    console.error("[AliExpress] getHotProducts error:", err);
    return {
      success: false,
      page,
      pageSize,
      products: getMockProducts(pageSize),
      fetchedAt: new Date().toISOString(),
      pricingPolicy,
    };
  }
}
