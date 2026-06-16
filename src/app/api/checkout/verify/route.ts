import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getOrderBySessionId, updateOrderStatus, saveOrder, Order } from "@/lib/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Update order status if paid
    if (session.payment_status === "paid") {
      const existing = getOrderBySessionId(sessionId);
      if (existing) {
        updateOrderStatus(sessionId, "paid", new Date().toISOString());
      } else if (session.metadata?.items) {
        // Create order from session metadata
        const items = JSON.parse(session.metadata.items);
        const subtotal = items.reduce(
          (s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity,
          0
        );
        const profit = items.reduce(
          (s: number, i: { price: number; originalPrice: number; quantity: number }) =>
            s + (i.price - i.originalPrice) * i.quantity,
          0
        );
        const order: Order = {
          id: `ORD-${Date.now()}`,
          sessionId,
          customerEmail: session.customer_email || "guest@luxeshop.com",
          customerName: session.customer_details?.name || "Customer",
          items,
          subtotal,
          profit,
          status: "paid",
          createdAt: new Date().toISOString(),
          paidAt: new Date().toISOString(),
          currency: "USD",
          paymentMethod: "stripe",
        };
        saveOrder(order);
      }
    }

    const order = getOrderBySessionId(sessionId);

    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_email,
      customerName: session.customer_details?.name,
      amountTotal: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase(),
      order,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
