import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "noreply.luxeshop@gmail.com",
    pass: process.env.EMAIL_PASS || "",
  },
});

export async function sendOrderConfirmation(order: {
  id: string;
  customerEmail: string;
  customerName: string;
  items: { title: string; quantity: number; price: number }[];
  subtotal: number;
  currency: string;
  paymentMethod: string;
}) {
  if (!process.env.EMAIL_PASS) return; // Skip if not configured

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #333;">${item.title}</td>
        <td style="padding:8px;border-bottom:1px solid #333;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #333;text-align:right;">£${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="background:#0a0a0f;color:#fff;font-family:Arial,sans-serif;margin:0;padding:20px;">
      <div style="max-width:600px;margin:0 auto;background:#1a1a2e;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#6b21a8,#1e40af);padding:30px;text-align:center;">
          <h1 style="margin:0;font-size:28px;color:#fff;">LuxeShop London</h1>
          <p style="margin:8px 0 0;color:#c4b5fd;">Order Confirmation</p>
        </div>
        <div style="padding:30px;">
          <h2 style="color:#c4b5fd;">Thank you, ${order.customerName}!</h2>
          <p style="color:#9ca3af;">Your order has been confirmed. Here's a summary:</p>
          <div style="background:#0f0f1a;border-radius:8px;padding:20px;margin:20px 0;">
            <p style="color:#6b7280;margin:0 0 4px;">Order ID</p>
            <p style="color:#c4b5fd;font-family:monospace;margin:0;">${order.id}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#0f0f1a;">
                <th style="padding:10px;text-align:left;color:#9ca3af;">Product</th>
                <th style="padding:10px;text-align:center;color:#9ca3af;">Qty</th>
                <th style="padding:10px;text-align:right;color:#9ca3af;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="text-align:right;margin-top:16px;padding-top:16px;border-top:1px solid #333;">
            <p style="color:#9ca3af;margin:0;">Total: <strong style="color:#c4b5fd;font-size:20px;">£${order.subtotal.toFixed(2)}</strong></p>
            <p style="color:#6b7280;font-size:12px;margin:4px 0 0;">Paid via ${order.paymentMethod}</p>
          </div>
          <div style="margin-top:30px;padding:20px;background:#0f0f1a;border-radius:8px;text-align:center;">
            <p style="color:#9ca3af;margin:0 0 12px;">Track your order status in your account</p>
            <a href="https://luxeshoplondon.co.uk/account/orders" style="background:linear-gradient(135deg,#6b21a8,#1e40af);color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">View My Orders</a>
          </div>
        </div>
        <div style="padding:20px;text-align:center;border-top:1px solid #333;">
          <p style="color:#6b7280;font-size:12px;margin:0;">© 2026 LuxeShop London · <a href="https://luxeshoplondon.co.uk" style="color:#c4b5fd;">luxeshoplondon.co.uk</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"LuxeShop London" <${process.env.EMAIL_USER}>`,
    to: order.customerEmail,
    subject: `Order Confirmed #${order.id.slice(-8).toUpperCase()} — LuxeShop London`,
    html,
  });
}
