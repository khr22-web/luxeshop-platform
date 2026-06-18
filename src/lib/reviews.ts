import fs from "fs";
import path from "path";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  title: string;
  body: string;
  createdAt: string;
  verified: boolean;
}

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getReviews(): Review[] {
  ensureDir();
  if (!fs.existsSync(REVIEWS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  ensureDir();
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

export function getProductReviews(productId: string): Review[] {
  return getReviews().filter((r) => r.productId === productId);
}

export function addReview(review: Omit<Review, "id" | "createdAt">): Review {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: `rev_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  saveReviews(reviews);
  return newReview;
}

export function getProductRating(productId: string): { average: number; count: number } {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { average: Math.round(avg * 10) / 10, count: reviews.length };
}
