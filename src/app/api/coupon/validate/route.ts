import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

export async function POST(req: NextRequest) {
  try {
    const { code, orderTotal } = await req.json();
    if (!code || !orderTotal) {
      return NextResponse.json({ valid: false, message: "Code and order total required" }, { status: 400 });
    }
    const result = validateCoupon(code, orderTotal);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ valid: false, message: "Error validating coupon" }, { status: 500 });
  }
}
