const withPlugins = require("next-compose-plugins")
const withSvgr = require("next-svgr")
const withOptimizedImages = require("next-optimized-images")
const path = require("path")

// yarn add next-svgr next-optimized-images path next-compose-plugins

module.exports = withPlugins([withOptimizedImages, withSvgr], {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules[\\/]idb/
    })
    config.resolve.alias.images = path.join(__dirname, "images")
    return config
  }
})
