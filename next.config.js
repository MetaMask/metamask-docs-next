module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. This allows us to use the MetaMask eslint
    // config instead of the one nextjs defaults to.
    // ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Important: return the modified config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          fs: 'memfs',
          module: 'empty',
          child_process: 'empty',
        },
      },
    };
  },
};
