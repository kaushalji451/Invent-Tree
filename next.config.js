/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
              protocol: 'https',
              hostname: 'cdn.pixabay.com',
              pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gratisography.com',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      }

    ],
  },
};

module.exports = withNextIntl(nextConfig);
