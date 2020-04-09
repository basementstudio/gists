const withSvgr = require("next-svgr")

// yarn add next-svgr babel-loader babel-preset-react-app

module.exports = withSvgr({
  target: "serverless",
  experimental: {
    jsconfigPaths: true,
    polyfillsOptimization: true,
    pages404: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules[\\/]idb/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [[require.resolve("babel-preset-react-app/dependencies")]],
        },
      },
    })

    return config
  },
})
