const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([[withBundleAnalyzer]], {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: { images: { allowFutureImage: true } },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/guide',
        destination: '/guide/introduction',
        permanent: true,
      },
    ];
  },
});
