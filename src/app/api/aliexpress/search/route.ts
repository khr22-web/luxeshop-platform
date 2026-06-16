/**
 * GET /api/aliexpress/search
 *
 * Search AliExpress products by keyword with 20% markup applied.
 *
 * Query Parameters:
 *   q         (string)  - Search keyword (required)
 *   page      (number)  - Page number, default 1
 *   pageSize  (number)  - Results per page, max 50, default 20
 *   sort      (string)  - SALE_PRICE_ASC | SALE_PRICE_DESC | LAST_VOLUME_DESC
 *   shipTo    (string)  - ISO country code, default US
 *
 * Example:
 *   GET /api/aliexpress/search?q=wireless+earbuds&page=1&pageSize=12
 */

import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/aliexpress";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const keyword = searchParams.get("q")?.trim();
    if (!keyword) {
      return NextResponse.json(
        { success: false, error: "Query parameter 'q' is required." },
        { status: 400 }
      );
    }

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10))
    );
    const sortRaw = searchParams.get("sort") ?? "LAST_VOLUME_DESC";
    const sort = ["SALE_PRICE_ASC", "SALE_PRICE_DESC", "LAST_VOLUME_DESC"].includes(
      sortRaw
    )
      ? (sortRaw as "SALE_PRICE_ASC" | "SALE_PRICE_DESC" | "LAST_VOLUME_DESC")
      : "LAST_VOLUME_DESC";
    const shipTo = searchParams.get("shipTo") ?? "US";

    const result = await searchProducts(keyword, page, pageSize, sort, shipTo);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("[API] /api/aliexpress/search error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
