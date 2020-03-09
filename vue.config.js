const path = require('path')

module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/i,
          include: [path.resolve(__dirname, 'src/')],
          loader: 'html-loader'
        },
        {
          test: /\.ya?ml$/,
          use: {
            loader: 'yaml-import-loader'
          }
        }
      ]
    },
    resolve: {
      modules: ['src']
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/main.scss";'
      }
    }
  }
}
