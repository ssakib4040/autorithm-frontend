import type { NextRequest } from "next/server";

const LOCAL_HOSTS = ["localhost", "127.0.0.1"];

export function getCanonicalRedirectUrl(
  req: NextRequest,
  canonicalHost: string,
): URL | null {
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = (forwardedHost || req.headers.get("host") || req.nextUrl.host || "")
    .toLowerCase()
    .replace(/:\d+$/, "");
  const protocol = (
    forwardedProto ||
    req.nextUrl.protocol.replace(":", "") ||
    "https"
  ).toLowerCase();
  const isLocalhost = LOCAL_HOSTS.some(
    (localHost) => host.includes(localHost),
  );

  if (isLocalhost || (host === canonicalHost && protocol === "https")) {
    return null;
  }

  const redirectUrl = new URL(req.url);
  redirectUrl.protocol = "https:";
  redirectUrl.host = canonicalHost;

  return redirectUrl;
}
