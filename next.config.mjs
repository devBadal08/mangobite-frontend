/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  allowedDevOrigins: ['192.168.1.11', 'localhost', '127.0.0.1', 'themangobitehotel.com'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.themangobitehotel.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
