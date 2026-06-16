import { NextRequest, NextResponse } from "next/server";
import { getStats, readOrders } from "@/lib/orders";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "luxeshop-admin-2026";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-secret");
  const cookie = req.cookies.get("admin_session")?.value;
  return auth === ADMIN_SECRET || cookie === ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "stats";

  if (type === "orders") {
    return NextResponse.json({ orders: readOrders() });
  }

  return NextResponse.json(getStats());
}
