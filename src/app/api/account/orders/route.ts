import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readOrders } from "@/lib/orders";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Login required" }, { status: 401 });
  const allOrders = readOrders();
  const userOrders = allOrders.filter(
    (o) => o.customerEmail.toLowerCase() === session.email.toLowerCase()
  );
  return NextResponse.json({ orders: userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
}
