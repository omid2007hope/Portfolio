/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compress: true,
  async redirects() {
    return [
      {
        source: "/project/:path*",
        destination: "/projects/:path*",
        permanent: true,
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
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
