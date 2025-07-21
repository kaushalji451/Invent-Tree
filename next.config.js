/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint blocking production builds
  },
  images: {
    domains: ['res.cloudinary.com'], // ✅ allow external images from Cloudinary
  },
};

module.exports = withNextIntl(nextConfig);
