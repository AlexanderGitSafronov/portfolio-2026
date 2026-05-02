import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

function pickLocale(request: NextRequest): string {
  // 1. Cookie override
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2. Accept-Language negotiation
  const header = request.headers.get("accept-language");
  if (header) {
    const requested = header
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase());
    for (const tag of requested) {
      const base = tag.split("-")[0];
      if (isLocale(base)) return base;
    }
  }

  // 3. Default (Ukrainian)
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return;

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\..*).*)",
  ],
};
