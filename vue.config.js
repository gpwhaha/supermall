module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.gpw.biz', //后期可以改
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }, //配置跨域支持
  }
}