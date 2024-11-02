/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongoose', 'node-cron'],
  images: {
    domains: ['m.media-amazon.com'],
  }
};

export default nextConfig;