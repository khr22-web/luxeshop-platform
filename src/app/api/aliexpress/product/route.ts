/**
 * GET /api/aliexpress/product
 *
 * Fetch full details for a single AliExpress product, with 20% markup applied.
 *
 * Query Parameters:
 *   id       (string) - AliExpress product ID (required)
 *   shipTo   (string) - ISO country code, default US
 *
 * Example:
 *   GET /api/aliexpress/product?id=1005006079931969
 */

import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/aliexpress";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const id = searchParams.get("id")?.trim();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Query parameter 'id' is required." },
        { status: 400 }
      );
    }

    const shipTo = searchParams.get("shipTo") ?? "US";

    const result = await getProductById(id, shipTo);

    if (!result.product) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("[API] /api/aliexpress/product error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
