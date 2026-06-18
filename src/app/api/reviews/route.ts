import { NextRequest, NextResponse } from "next/server";
import { getProductReviews, addReview } from "@/lib/reviews";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });
  const reviews = getProductReviews(productId);
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Login required to leave a review" }, { status: 401 });

    const { productId, rating, title, body } = await req.json();
    if (!productId || !rating || !title || !body) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const review = addReview({
      productId,
      userId: session.userId,
      userName: session.name,
      rating: Number(rating),
      title: title.trim(),
      body: body.trim(),
      verified: false,
    });
    return NextResponse.json({ success: true, review });
  } catch {
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}
