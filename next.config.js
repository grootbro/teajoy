/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  // Optimize for serverless environments
  experimental: {
    // Prevent Mongoose from being bundled on the client
    serverComponentsExternalPackages: ["mongoose"],
  },
  // Enable top-level await for async operations
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
