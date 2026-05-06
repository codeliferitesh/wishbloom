/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for catching potential issues early
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
