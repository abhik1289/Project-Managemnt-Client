import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define secret key for token handling
const secret = process.env.SECRET_KEY!;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isPublicPath = ["/sign-in", "/sign-up", "/active", "/verify"].includes(pathname);

  // Retrieve tokens from cookies and JWT
  const cookieToken = request.cookies.get("token")?.value || "";
  const jwtToken = await getToken({ req: request, secret });

  console.log("JWT token is:------------->", jwtToken);

  // Redirect logged-in users from public paths
  if (isPublicPath && cookieToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Redirect unauthenticated users from private paths
  if (!isPublicPath && !cookieToken) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  // Proceed with the request
  return NextResponse.next();
}

// Config to match specific paths for the middleware
export const config = {
  matcher: ["/sign-in", "/sign-up", "/active", "/verify"],
};
