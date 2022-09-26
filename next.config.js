/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
