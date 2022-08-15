const package = require('./package.json');

// eslint-disable-next-line node/no-process-env
const isProduction = process.env.NODE_ENV === 'production';

let assetPrefix;
let basePath;
if (isProduction) {
  assetPrefix = `${package.homepage}/`;
  basePath = new URL(package.homepage).pathname;
  console.log(`using next.config assetPrefix of : ${assetPrefix}`);
  console.log(`using next.config basePath of : ${basePath}`);
}

module.exports = {
  assetPrefix,
  basePath,
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
