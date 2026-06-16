"use client";

import { useState } from "react";
import { Mail, Sparkles, CheckCircle } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-[rgba(201,168,76,0.2)] bg-[rgba(12,12,20,0.95)]">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#c9a84c] opacity-5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-600 opacity-5 blur-3xl" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span className="text-xs font-semibold text-[#c9a84c] tracking-widest uppercase">
                Exclusive Deals
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Never Miss a{" "}
              <span className="text-gold-gradient">Deal Again</span>
            </h2>
            <p className="text-[#8a8a9a] text-base sm:text-lg max-w-lg mx-auto mb-8">
              Subscribe to get daily curated deals, flash sales, and exclusive
              discounts delivered straight to your inbox.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <p className="text-green-400 font-semibold text-lg">
                  You&apos;re subscribed! Welcome to LuxeShop.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a5a]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[rgba(22,22,34,0.9)] border border-[rgba(201,168,76,0.2)] text-white placeholder-[#4a4a5a] text-sm outline-none focus:border-[rgba(201,168,76,0.5)] focus:shadow-[0_0_15px_rgba(201,168,76,0.1)] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#9a7a2e] text-black font-bold text-sm hover:from-[#e8c97a] hover:to-[#c9a84c] transition-all duration-200 whitespace-nowrap shadow-lg"
                >
                  Subscribe Free
                </button>
              </form>
            )}

            <p className="text-[#3a3a4a] text-xs mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
