import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "luxeshop-admin-2026";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin route (but not the login API)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/api/admin/login")) {
    const cookie = req.cookies.get("admin_session")?.value;
    const header = req.headers.get("x-admin-secret");

    // Allow access if cookie or header matches
    if (cookie === ADMIN_SECRET || header === ADMIN_SECRET) {
      return NextResponse.next();
    }

    // For API routes under /admin, return 401
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For the admin page itself, allow it to render (login form is embedded)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
