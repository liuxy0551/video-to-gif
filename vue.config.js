let path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/video-to-gif/' : '/',
  productionSourceMap: false, // 生产环境的 source map
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
