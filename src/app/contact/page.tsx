"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Clock, CheckCircle, Send, ChevronDown } from "lucide-react";

const TOPICS = [
  "Order Issue",
  "Payment Problem",
  "Product Question",
  "Shipping Enquiry",
  "Returns & Refunds",
  "Technical Support",
  "Partnership / Business",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Contact <span className="bg-gradient-to-r from-[#7c6fff] to-[#38bdf8] bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              We&apos;re here to help. Send us a message and we&apos;ll respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email Us", desc: "support@luxeshop.com", sub: "We reply within 24 hours" },
                { icon: MessageSquare, title: "Live Chat", desc: "Available on the site", sub: "Mon–Fri, 9am–6pm GMT" },
                { icon: Clock, title: "Response Time", desc: "Under 24 hours", sub: "Usually within 2–4 hours" },
              ].map(({ icon: Icon, title, desc, sub }) => (
                <div key={title} className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,111,255,0.15)" }}>
                      <Icon size={18} style={{ color: "var(--accent-primary)" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{title}</div>
                      <div className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>{desc}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ link */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.2)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Common Questions</p>
                <ul className="space-y-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
                  <li>• How do I track my order?</li>
                  <li>• What is your return policy?</li>
                  <li>• How long does shipping take?</li>
                  <li>• Can I change my order?</li>
                </ul>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.15)" }}>
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Message Sent!</h3>
                    <p style={{ color: "var(--text-muted)" }}>
                      Thank you for reaching out. We&apos;ll get back to you at <strong className="text-violet-400">{form.email}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "", message: "" }); }}
                      className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-white text-sm"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Send a Message</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>Full Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-violet-500/30"
                          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>Email Address *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-violet-500/30"
                          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>Topic *</label>
                      <div className="relative">
                        <select
                          required
                          value={form.topic}
                          onChange={(e) => setForm({ ...form, topic: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none pr-10"
                          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: form.topic ? "var(--text-primary)" : "var(--text-muted)" }}
                        >
                          <option value="">Select a topic...</option>
                          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your issue or question in detail..."
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2 focus:ring-violet-500/30"
                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
