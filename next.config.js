const withPreact = require('next-plugin-preact')
const path = require('path')
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

    config.module.rules.unshift({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, './node_modules/.pnpm'),
    })

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
        /[\\/]node_modules[\\/]\.pnpm[\\/]/,
      ]
    }

    return config
  },
})

module.exports = config
