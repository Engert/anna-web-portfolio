import { NextResponse } from "next/server";

export function proxy(request) {
  const auth = request.cookies.get("admin_auth")?.value;

  if (auth === process.env.ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/admin"],
};