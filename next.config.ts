import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "canvas"],
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/blog/gpsr-guide-complet-ecommerc%C3%A7ants",
        destination: "/blog/gpsr-guide-complet-ecommercants",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Allow Shopify to embed the app in an iframe
        source: "/shopify-app/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://*.myshopify.com https://admin.shopify.com;",
          },
        ],
      },
    ]
  },
}

export default nextConfig;
