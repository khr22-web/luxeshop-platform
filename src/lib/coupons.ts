export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number; // percentage (0-100) or fixed GBP amount
  minOrder?: number;
  maxUses?: number;
  usedCount: number;
  active: boolean;
  expiresAt?: string;
}

// Static coupon list — can be extended via admin
export const COUPONS: Coupon[] = [
  { code: "LUXE10", type: "percentage", value: 10, minOrder: 50, usedCount: 0, active: true },
  { code: "LUXE20", type: "percentage", value: 20, minOrder: 100, usedCount: 0, active: true },
  { code: "WELCOME15", type: "percentage", value: 15, usedCount: 0, active: true },
  { code: "SAVE25", type: "fixed", value: 25, minOrder: 150, usedCount: 0, active: true },
  { code: "FLASH50", type: "percentage", value: 50, minOrder: 200, usedCount: 0, active: true },
  { code: "VIP30", type: "percentage", value: 30, minOrder: 75, usedCount: 0, active: true },
];

export function validateCoupon(code: string, orderTotal: number): { valid: boolean; coupon?: Coupon; discount?: number; message?: string } {
  const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) return { valid: false, message: "Invalid coupon code" };
  if (!coupon.active) return { valid: false, message: "This coupon is no longer active" };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return { valid: false, message: "This coupon has expired" };
  if (coupon.minOrder && orderTotal < coupon.minOrder) return { valid: false, message: `Minimum order £${coupon.minOrder} required` };
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return { valid: false, message: "Coupon usage limit reached" };

  let discount = 0;
  if (coupon.type === "percentage") {
    discount = Math.round((orderTotal * coupon.value) / 100 * 100) / 100;
  } else {
    discount = Math.min(coupon.value, orderTotal);
  }

  return { valid: true, coupon, discount };
}
