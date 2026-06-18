"use client";
import { useEffect, useState } from "react";

interface Review {
  id: string; userName: string; rating: number; title: string; body: string;
  createdAt: string; verified: boolean;
}

function StarRating({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          onClick={interactive && onChange ? () => onChange(star) : undefined}
          onMouseEnter={interactive ? () => setHover(star) : undefined}
          onMouseLeave={interactive ? () => setHover(0) : undefined}
          className={`text-xl ${interactive ? "cursor-pointer" : "cursor-default"} transition`}
        >
          <span className={(hover || rating) >= star ? "text-yellow-400" : "text-gray-600"}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ rating: 5, title: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews || []));
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setLoggedIn(!!d.user));
  }, [productId]);

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to submit review"); return; }
      setReviews((prev) => [data.review, ...prev]);
      setSuccess(true);
      setShowForm(false);
      setForm({ rating: 5, title: "", body: "" });
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-yellow-400 font-bold">{avgRating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
            </div>
          )}
        </div>
        {loggedIn && !showForm && !success && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition"
          >
            Write a Review
          </button>
        )}
        {!loggedIn && (
          <a href="/login" className="text-purple-400 text-sm hover:text-purple-300">
            Sign in to review
          </a>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Write Your Review</h3>
          {error && <div className="bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg p-3 mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rating</label>
              <StarRating rating={form.rating} interactive onChange={(r) => setForm({ ...form, rating: r })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Review Title</label>
              <input
                type="text" required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#0f0f1a] border border-purple-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition text-sm"
                placeholder="Summarise your experience"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Review</label>
              <textarea
                required value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={4}
                className="w-full bg-[#0f0f1a] border border-purple-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition text-sm resize-none"
                placeholder="Share your experience with this product..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition disabled:opacity-50">
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-800 text-gray-300 px-6 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {success && (
        <div className="bg-green-900/30 border border-green-500/50 text-green-300 rounded-lg p-3 mb-4 text-sm">
          Thank you for your review!
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this product!
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#1a1a2e] border border-purple-900/20 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{review.userName}</span>
                    {review.verified && (
                      <span className="bg-green-900/40 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-700/50">Verified</span>
                    )}
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-gray-600 text-xs">{new Date(review.createdAt).toLocaleDateString("en-GB")}</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">{review.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{review.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
