import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { saveOrder, Order } from "@/lib/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://luxeshop-new.vercel.app";

    // Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { title: string; price: number; image: string; quantity: number }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // cents
        },
        quantity: item.quantity,
      })
    );

    // Calculate totals
    const subtotal = items.reduce(
      (s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity,
      0
    );
    const profit = items.reduce(
      (s: number, i: { price: number; originalPrice: number; quantity: number }) =>
        s + (i.price - i.originalPrice) * i.quantity,
      0
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail || undefined,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        items: JSON.stringify(
          items.map((i: { id: string; title: string; price: number; originalPrice: number; image: string; source: string; quantity: number }) => ({
            id: i.id,
            title: i.title,
            price: i.price,
            originalPrice: i.originalPrice,
            image: i.image,
            source: i.source,
            quantity: i.quantity,
          }))
        ),
      },
    });

    // Save pending order
    const order: Order = {
      id: `ORD-${Date.now()}`,
      sessionId: session.id,
      customerEmail: customerEmail || "guest@luxeshop.com",
      customerName: "Customer",
      items,
      subtotal,
      profit,
      status: "pending",
      createdAt: new Date().toISOString(),
      currency: "USD",
      paymentMethod: "stripe",
    };
    saveOrder(order);

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
