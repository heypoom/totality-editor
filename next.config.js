const withPreact = require('next-plugin-preact')

module.exports = withPreact({
  reactStrictMode: true,
  webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {fs: false, module: false}

  //   return config
  // },
})
