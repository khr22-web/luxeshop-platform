import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FileText, ShoppingCart, CreditCard, RefreshCw, AlertTriangle, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Service | LuxeShop London",
  description: "LuxeShop London Terms of Service — the rules and conditions governing your use of our platform.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the LuxeShop London website (luxeshoplondon.co.uk), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.

These terms apply to all visitors, users, and customers of LuxeShop London Ltd, a company registered in England and Wales.`,
  },
  {
    id: "services",
    title: "2. Our Services",
    content: `LuxeShop London operates as an e-commerce platform that aggregates and sells products sourced from trusted suppliers including Amazon and AliExpress. We act as the merchant of record for all transactions completed on our platform.

We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.`,
  },
  {
    id: "account",
    title: "3. Your Account",
    content: `To access certain features, you may need to create an account. You are responsible for:

• Maintaining the confidentiality of your account credentials.
• All activities that occur under your account.
• Notifying us immediately of any unauthorised use of your account.

You must be at least 18 years of age to create an account and make purchases on our platform.

We reserve the right to suspend or terminate accounts that violate these Terms of Service.`,
  },
  {
    id: "orders",
    title: "4. Orders & Pricing",
    content: `All prices are displayed in British Pounds Sterling (GBP) and include VAT where applicable.

When you place an order, you are making an offer to purchase. We reserve the right to accept or decline any order. An order is confirmed only when you receive an order confirmation email from us.

We strive to ensure all prices are accurate. In the event of a pricing error, we will notify you and give you the option to proceed at the correct price or cancel your order.

Product availability is subject to change without notice.`,
  },
  {
    id: "payment",
    title: "5. Payment",
    content: `We accept the following payment methods:
• Credit and debit cards (Visa, Mastercard, American Express) via Stripe
• PayPal
• Apple Pay and Google Pay (where available)

All payments are processed securely by our payment partners (Stripe and PayPal). We do not store your full card details on our servers.

By providing payment information, you confirm that you are authorised to use the payment method and that the information provided is accurate.`,
  },
  {
    id: "delivery",
    title: "6. Delivery & Shipping",
    content: `We offer free delivery on all orders to UK addresses. Estimated delivery times vary by product and supplier:

• Standard delivery: 7–15 business days
• Express delivery: 3–7 business days (where available)

Delivery times are estimates and not guaranteed. We are not responsible for delays caused by customs, postal services, or other factors outside our control.

For international orders, additional customs duties and taxes may apply and are the responsibility of the customer.`,
  },
  {
    id: "returns",
    title: "7. Returns & Refunds",
    content: `You have the right to cancel your order within 14 days of receiving your items under the UK Consumer Contracts Regulations 2013.

To initiate a return:
1. Contact us at support@luxeshoplondon.co.uk within 14 days of delivery.
2. Items must be returned in their original condition and packaging.
3. Refunds will be processed within 14 days of receiving the returned item.

The following items are excluded from our returns policy:
• Personalised or custom-made items
• Perishable goods
• Items that have been used or damaged after delivery

We reserve the right to refuse returns that do not meet our policy requirements.`,
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: `All content on our website, including text, graphics, logos, images, and software, is the property of LuxeShop London Ltd or our content suppliers and is protected by UK and international copyright laws.

You may not reproduce, distribute, or create derivative works from our content without our express written permission.

Product images and descriptions may be provided by third-party suppliers (Amazon, AliExpress) and are subject to their respective intellectual property rights.`,
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    content: `To the fullest extent permitted by law, LuxeShop London Ltd shall not be liable for:

• Any indirect, incidental, or consequential damages arising from your use of our services.
• Loss of profits, data, or business opportunities.
• Damages resulting from third-party actions or products.

Our total liability to you for any claim arising from these Terms shall not exceed the amount you paid for the relevant order.

Nothing in these Terms limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.`,
  },
  {
    id: "affiliate",
    title: "10. Affiliate Relationships",
    content: `LuxeShop London participates in affiliate programmes with Amazon and AliExpress. This means we may earn a commission when you click on affiliate links and make a purchase on those platforms.

This does not affect the price you pay. Our editorial content and product recommendations are independent of our affiliate relationships.`,
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.

If you are a consumer, you may also have rights under the laws of your country of residence.`,
  },
  {
    id: "changes",
    title: "12. Changes to These Terms",
    content: `We may update these Terms of Service from time to time. We will notify you of significant changes by email or by posting a notice on our website. Your continued use of our services after such changes constitutes your acceptance of the updated Terms.

The date of the latest revision is shown at the top of this page.`,
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us:

• Email: legal@luxeshoplondon.co.uk
• Address: LuxeShop London Ltd, London, United Kingdom

For customer support enquiries, please use: support@luxeshoplondon.co.uk`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Hero */}
        <div className="border-b" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(201,168,76,0.15)" }}>
                <FileText className="w-6 h-6" style={{ color: "#c9a84c" }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Terms of Service</h1>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Last updated: 1 January 2025</p>
              </div>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Please read these Terms of Service carefully before using LuxeShop London. By using our platform, you agree to these terms. These terms are governed by the laws of England and Wales.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-10">
          {/* Quick summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: ShoppingCart, title: "Free Returns", desc: "14-day return policy" },
              { icon: CreditCard, title: "Secure Payments", desc: "Stripe & PayPal protected" },
              { icon: RefreshCw, title: "Free Delivery", desc: "On all UK orders" },
              { icon: AlertTriangle, title: "18+ Only", desc: "Must be 18 to purchase" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: "#c9a84c" }} />
                <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{title}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Table of contents */}
          <div className="rounded-2xl p-6 mb-10" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h2 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-sm hover:text-[#c9a84c] transition-colors" style={{ color: "var(--text-secondary)" }}>
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
                <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--text-muted)" }}>
                  {s.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: "#c9a84c" }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Legal Questions?</h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Contact our legal team for any questions about these Terms of Service.</p>
            <a
              href="mailto:legal@luxeshoplondon.co.uk"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #9a7a2e)" }}
            >
              <Mail className="w-4 h-4" />
              legal@luxeshoplondon.co.uk
            </a>
          </div>

          <div className="mt-6 text-center">
            <Link href="/privacy" className="text-sm text-violet-400 hover:underline">View Privacy Policy →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
