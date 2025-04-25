/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint warnings and errors during builds to prevent them from blocking deployments
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
