import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders";

const PAYPAL_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getPayPalToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL_CLIENT_ID_PLACEHOLDER";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "PAYPAL_CLIENT_SECRET_PLACEHOLDER";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get PayPal token");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const token = await getPayPalToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status !== "COMPLETED") {
      throw new Error("PayPal capture failed: " + JSON.stringify(data));
    }

    // Update order status
    const updatedOrder = updateOrderStatus(orderId, "paid", new Date().toISOString());

    return NextResponse.json({
      success: true,
      status: data.status,
      paypalOrderId: data.id,
      order: updatedOrder,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Capture failed";
    console.error("PayPal capture error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
