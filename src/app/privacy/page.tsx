import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Lock, Eye, Bell, Trash2, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | LuxeShop London",
  description: "LuxeShop London Privacy Policy — how we collect, use, and protect your personal data in compliance with UK GDPR.",
};

const sections = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: `LuxeShop London Ltd ("LuxeShop", "we", "us", or "our") is an e-commerce platform registered in England and Wales. We operate the website luxeshoplondon.co.uk and related services.

Contact details:
• Email: privacy@luxeshoplondon.co.uk
• Address: LuxeShop London Ltd, London, United Kingdom

We are committed to protecting your personal data and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
  },
  {
    id: "data-we-collect",
    title: "2. Data We Collect",
    content: `We collect the following categories of personal data:

Account & Identity Data: Name, email address, password (encrypted), account preferences.

Transaction Data: Order history, items purchased, payment method type (we do not store full card details — payments are processed by Stripe and PayPal).

Technical Data: IP address, browser type, device information, cookies, and usage data collected via analytics tools.

Communication Data: Messages you send us via our contact form or email.

We do not collect sensitive personal data (such as health, race, or political opinions).`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Data",
    content: `We use your personal data for the following purposes:

• To process and fulfil your orders and send order confirmations.
• To manage your account and provide customer support.
• To send transactional emails (order updates, shipping notifications).
• To improve our website and services through analytics.
• To comply with legal obligations.
• To detect and prevent fraud.

We will only send you marketing communications if you have explicitly opted in. You can unsubscribe at any time.`,
  },
  {
    id: "legal-basis",
    title: "4. Legal Basis for Processing",
    content: `Under UK GDPR, we process your personal data on the following legal bases:

• Contract Performance: Processing necessary to fulfil your orders.
• Legitimate Interests: Improving our services, fraud prevention, and security.
• Legal Obligation: Compliance with applicable laws and regulations.
• Consent: Marketing communications (where you have opted in).`,
  },
  {
    id: "data-sharing",
    title: "5. Data Sharing & Third Parties",
    content: `We share your data only with trusted third parties who help us operate our business:

• Stripe & PayPal: Payment processing (subject to their own privacy policies).
• Amazon & AliExpress: Affiliate referral links (we share only anonymised click data).
• Vercel: Website hosting and infrastructure.
• Email service providers: For transactional email delivery.

We do not sell your personal data to any third party.`,
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: `We use cookies to improve your experience on our website. These include:

• Essential cookies: Required for the website to function (e.g., shopping cart, login session).
• Analytics cookies: Help us understand how visitors use our site (e.g., Google Analytics).
• Preference cookies: Remember your settings and preferences.

You can control cookies through your browser settings. Disabling essential cookies may affect website functionality.`,
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: `We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy:

• Account data: Retained while your account is active, and for 2 years after closure.
• Transaction data: Retained for 7 years for legal and tax compliance.
• Analytics data: Retained for 26 months.

You may request deletion of your data at any time (subject to legal retention requirements).`,
  },
  {
    id: "your-rights",
    title: "8. Your Rights Under UK GDPR",
    content: `You have the following rights regarding your personal data:

• Right of Access: Request a copy of the data we hold about you.
• Right to Rectification: Request correction of inaccurate data.
• Right to Erasure: Request deletion of your data ("right to be forgotten").
• Right to Restriction: Request that we limit how we use your data.
• Right to Data Portability: Receive your data in a structured, machine-readable format.
• Right to Object: Object to processing based on legitimate interests.
• Right to Withdraw Consent: Withdraw consent for marketing at any time.

To exercise any of these rights, contact us at privacy@luxeshoplondon.co.uk. We will respond within 30 days.`,
  },
  {
    id: "security",
    title: "9. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data, including:

• 256-bit SSL/TLS encryption for all data in transit.
• Encrypted password storage using bcrypt hashing.
• Payment data handled exclusively by PCI DSS-compliant processors (Stripe and PayPal).
• Regular security audits and access controls.

In the event of a data breach that poses a risk to your rights, we will notify you and the Information Commissioner's Office (ICO) within 72 hours.`,
  },
  {
    id: "complaints",
    title: "10. Complaints",
    content: `If you have concerns about how we handle your personal data, please contact us first at privacy@luxeshoplondon.co.uk.

You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
• Website: ico.org.uk
• Helpline: 0303 123 1113`,
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our website. The date of the latest revision is shown at the top of this page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Hero */}
        <div className="border-b" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(124,111,255,0.15)" }}>
                <Shield className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Last updated: 1 January 2025</p>
              </div>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              At LuxeShop London, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data in compliance with the UK General Data Protection Regulation (UK GDPR).
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-10">
          {/* Quick summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Lock, title: "Encrypted", desc: "All data secured with 256-bit SSL" },
              { icon: Eye, title: "Transparent", desc: "We never sell your data" },
              { icon: Bell, title: "Your Choice", desc: "Opt out of marketing anytime" },
              { icon: Trash2, title: "Your Rights", desc: "Request deletion anytime" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <Icon className="w-6 h-6 mx-auto mb-2 text-violet-400" />
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
                <a key={s.id} href={`#${s.id}`} className="text-sm hover:text-violet-400 transition-colors" style={{ color: "var(--text-secondary)" }}>
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
            <Mail className="w-8 h-8 mx-auto mb-3 text-violet-400" />
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Questions about your privacy?</h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Contact our Data Protection team and we&apos;ll respond within 30 days.</p>
            <a
              href="mailto:privacy@luxeshoplondon.co.uk"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Mail className="w-4 h-4" />
              privacy@luxeshoplondon.co.uk
            </a>
          </div>

          <div className="mt-6 text-center">
            <Link href="/terms" className="text-sm text-violet-400 hover:underline">View Terms of Service →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
