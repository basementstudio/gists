const withSvgr = require("next-svgr")

// yarn add next-svgr

module.exports = withSvgr({
  target: "serverless",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules[\\/]idb/
    })

    return config
  }
})
