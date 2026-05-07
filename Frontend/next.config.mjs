/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
const connectSrc = [
  "'self'",
  "https:",
  ...(isDev ? ["http://localhost:4000", "http://127.0.0.1:4000"] : []),
].join(" ");

const nextConfig = {
  reactCompiler: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src ${connectSrc}; frame-ancestors 'self';`,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // ! Page redirect
  async redirects() {
    return [
      {
        source: "/project/:path*",
        destination: "/projects/:path*",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.omidteimory.com",
          },
        ],
        destination: "https://omidteimory.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
