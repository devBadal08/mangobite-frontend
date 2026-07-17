/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  allowedDevOrigins: ['192.168.1.7', 'localhost', '127.0.0.1'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'themangobitehotel.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
