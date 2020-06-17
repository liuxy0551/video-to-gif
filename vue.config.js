let path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false, // 生产环境的 source map
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    const cdn = {
      css: ['//wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/libs/element-ui/element-ui-index.css'],
      js: [
        '//wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/libs/vue/v2.6.11.min.js',
        '//wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/libs/vue-router/v3.1.6.min.js',
        '//wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/libs/vuex/v3.1.2.min.js',
        '//wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/libs/element-ui/index.js'
      ]
    }
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      vuex: 'Vuex'
    }
  }
}
