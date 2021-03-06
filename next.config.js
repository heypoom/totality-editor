const withPreact = require('next-plugin-preact')
const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    const monaco = new MonacoWebpackPlugin({
      languages: [
        'html',
        'css',
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
      include: [
        path.resolve(__dirname, './node_modules/.pnpm'),
        // path.resolve(__dirname, './src'),
      ],
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
}

module.exports = withBundleAnalyzer(withPreact(config))
