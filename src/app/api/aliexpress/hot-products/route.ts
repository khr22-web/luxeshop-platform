/**
 * GET /api/aliexpress/hot-products
 *
 * Fetch trending / hot AliExpress products with 20% markup applied.
 * These are products with high commission rates and high sales volume —
 * ideal for the "Today's Top Picks" section on the homepage.
 *
 * Query Parameters:
 *   q         (string) - Optional keyword filter
 *   page      (number) - Page number, default 1
 *   pageSize  (number) - Results per page, max 50, default 20
 *
 * Example:
 *   GET /api/aliexpress/hot-products?pageSize=6
 *   GET /api/aliexpress/hot-products?q=electronics&pageSize=12
 */

import { NextRequest, NextResponse } from "next/server";
import { getHotProducts } from "@/lib/aliexpress";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const keyword = searchParams.get("q")?.trim() ?? "";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10))
    );

    const result = await getHotProducts(keyword, page, pageSize);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("[API] /api/aliexpress/hot-products error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
