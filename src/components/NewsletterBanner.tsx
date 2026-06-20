"use client";
import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); }
  };
  return (
    <section className="bg-[#1a1a2e] py-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
          <Mail className="w-6 h-6 text-[#c9a84c]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Get Exclusive Deals First</h2>
        <p className="text-gray-400 text-sm mb-7">Join 50,000+ smart shoppers. Get daily deals, flash sales, and exclusive discounts straight to your inbox.</p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
            <CheckCircle className="w-5 h-5" />
            You&apos;re in! Check your inbox for a welcome gift.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
            <button type="submit" className="px-5 py-3 rounded-xl bg-[#c9a84c] text-[#1a1a2e] text-sm font-black hover:bg-[#e8c97a] transition-colors whitespace-nowrap">Subscribe</button>
          </form>
        )}
        <p className="text-gray-500 text-xs mt-4">No spam. Unsubscribe anytime. See our <a href="/privacy" className="underline hover:text-gray-300">Privacy Policy</a>.</p>
      </div>
    </section>
  );
}
