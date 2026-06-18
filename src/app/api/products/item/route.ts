import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS as staticProducts } from "@/lib/products";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  // Check static products first
  const staticProduct = staticProducts.find((p) => p.id === id);
  if (staticProduct) {
    return NextResponse.json({
      product: {
        id: staticProduct.id,
        title: staticProduct.title,
        price: staticProduct.price,
        image: staticProduct.images?.[0] || staticProduct.image || "",
        category: staticProduct.category,
      },
    });
  }

  // For dynamically generated products, reconstruct from ID
  // ID format: {category}-{index} e.g. "electronics-42"
  const parts = id.split("-");
  if (parts.length >= 2) {
    const index = parseInt(parts[parts.length - 1]);
    const category = parts.slice(0, -1).join("-");
    if (!isNaN(index)) {
      return NextResponse.json({
        product: {
          id,
          title: `${category.charAt(0).toUpperCase() + category.slice(1)} Product #${index}`,
          price: 29.99 + (index % 50) * 5,
          image: "",
          category,
        },
      });
    }
  }

  return NextResponse.json({ error: "Product not found" }, { status: 404 });
}
