import { NextRequest, NextResponse } from "next/server";
import { saveOrder, Order } from "@/lib/orders";

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
  if (!data.access_token) {
    throw new Error("Failed to get PayPal access token: " + JSON.stringify(data));
  }
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail } = await req.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://luxeshop-new.vercel.app";
    const subtotal = items.reduce(
      (s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity,
      0
    );
    const profit = items.reduce(
      (s: number, i: { price: number; originalPrice: number; quantity: number }) =>
        s + (i.price - i.originalPrice) * i.quantity,
      0
    );

    const token = await getPayPalToken();

    // Build PayPal order
    const paypalOrder = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: subtotal.toFixed(2),
            breakdown: {
              item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
            },
          },
          items: items.map((item: { title: string; price: number; quantity: number }) => ({
            name: item.title.slice(0, 127),
            unit_amount: { currency_code: "USD", value: item.price.toFixed(2) },
            quantity: String(item.quantity),
            category: "PHYSICAL_GOODS",
          })),
          description: `LuxeShop Order — ${items.length} item(s)`,
        },
      ],
      application_context: {
        brand_name: "LuxeShop",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${origin}/checkout/success?method=paypal`,
        cancel_url: `${origin}/cart`,
      },
    };

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": `luxeshop-${Date.now()}`,
      },
      body: JSON.stringify(paypalOrder),
    });

    const data = await res.json();
    if (!data.id) {
      throw new Error("PayPal order creation failed: " + JSON.stringify(data));
    }

    // Find the approval URL
    const approvalUrl = data.links?.find(
      (l: { rel: string; href: string }) => l.rel === "approve"
    )?.href;

    // Save pending order
    const internalOrderId = `ORD-PP-${Date.now()}`;
    const order: Order = {
      id: internalOrderId,
      sessionId: data.id, // PayPal order ID used as session ID
      customerEmail: customerEmail || "guest@luxeshop.com",
      customerName: "Customer",
      items,
      subtotal,
      profit,
      status: "pending",
      createdAt: new Date().toISOString(),
      currency: "USD",
      paymentMethod: "paypal",
    };
    saveOrder(order);

    return NextResponse.json({
      orderId: data.id,
      approvalUrl,
      internalOrderId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "PayPal checkout failed";
    console.error("PayPal error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
