import type { NextConfig } from "next";

/**
 * Static portfolio: no API routes, no server actions, no user input.
 * The only third parties are YouTube (privacy-enhanced embeds) and its
 * thumbnail CDN, so the policy names them and nothing else.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "img-src 'self' blob: data: https://i.ytimg.com",
  "media-src 'self'",
  "font-src 'self'",
  // next/font self-hosts; the inline <style> is Next's critical CSS, and the
  // style attributes are ours (animation delays, stack geometry).
  "style-src 'self' 'unsafe-inline'",
  // Next inlines the RSC payload as inline <script>. Locking these out stops
  // hydration dead. The strict alternative is a per-request nonce, which
  // forces every page to render dynamically and gives up static generation —
  // a bad trade for a read-only page. See README "Content Security Policy".
  // Scripts still cannot be loaded from any other origin, and connect-src
  // below means injected script has nowhere to send anything.
  // next dev compiles with eval for fast refresh; production never gets it.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "frame-src https://www.youtube-nocookie.com",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
