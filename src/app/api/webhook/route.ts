import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderStatus, saveOrder, Order } from "@/lib/orders";
import { sendOrderConfirmation } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Update order to paid
    const updated = updateOrderStatus(
      session.id,
      "paid",
      new Date().toISOString()
    );

    // If order wasn't pre-saved, create it now from metadata
    if (!updated && session.metadata?.items) {
      try {
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
          sessionId: session.id,
          customerEmail: session.customer_email || "guest@luxeshop.com",
          customerName: session.customer_details?.name || "Customer",
          items,
          subtotal,
          profit,
          status: "paid",
          createdAt: new Date().toISOString(),
          paidAt: new Date().toISOString(),
          currency: "GBP",
          paymentMethod: "stripe",
        };
        saveOrder(order);
        // Send email confirmation
        try {
          await sendOrderConfirmation({
            id: order.id,
            customerEmail: order.customerEmail,
            customerName: order.customerName,
            items: order.items,
            subtotal: order.subtotal,
            currency: order.currency,
            paymentMethod: order.paymentMethod,
          });
        } catch (emailErr) {
          console.error("Email send failed:", emailErr);
        }
      } catch (e) {
        console.error("Failed to parse order from metadata:", e);
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    updateOrderStatus(session.id, "refunded");
  }

  return NextResponse.json({ received: true });
}
