/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
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
