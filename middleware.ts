import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";

// Protects the admin dashboard and every admin API route.
// /admin/login and /api/admin/login stay open so you can sign in.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isOpen =
    pathname === "/admin/login" || pathname === "/api/admin/login";
  if (isOpen) return NextResponse.next();

  const ok = await verifySessionToken(req.cookies.get(COOKIE_NAME)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
