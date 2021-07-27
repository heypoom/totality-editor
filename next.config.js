const withPreact = require('next-plugin-preact')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const config = withPreact({
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    const monaco = new MonacoWebpackPlugin({
      languages: [
        'javascript',
        'typescript',
        'json',
        'markdown',
        'ruby',
        'python',
        'yaml',
        'graphql',
      ],
      filename: 'static/[name].worker.js',
    })

    config.plugins.push(monaco)

    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes('_app')
      )

    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ]
    }

    return config
  },
})

module.exports = config
