const package = require("./package.json");
const isProduction = process.env.NODE_ENV === "production";

let assetPrefix;
if (isProduction) {
  assetPrefix = package.homepage;
  console.log(`using next.config assetPrefix of : ${assetPrefix}`);
}

module.exports = {
  assetPrefix,
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
