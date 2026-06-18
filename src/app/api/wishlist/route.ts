import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserById, updateUserWishlist } from "@/lib/users";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ wishlist: [] });
  const user = getUserById(session.userId);
  return NextResponse.json({ wishlist: user?.wishlist || [] });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });
  const user = getUserById(session.userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const wishlist = user.wishlist.includes(productId) ? user.wishlist : [...user.wishlist, productId];
  updateUserWishlist(session.userId, wishlist);
  return NextResponse.json({ success: true, wishlist });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });
  const user = getUserById(session.userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const wishlist = user.wishlist.filter((id) => id !== productId);
  updateUserWishlist(session.userId, wishlist);
  return NextResponse.json({ success: true, wishlist });
}
