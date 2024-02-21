import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("helpdesk-access-token");

  if (!cookie)
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));

  const validate = await fetch(
    "https://edge-middleware-jwt-authentication-sable.vercel.app/api/protected",
    {
      headers: { Cookie: `user-token=${cookie.value}` },
    }
  );

  if (validate.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/"],
};
