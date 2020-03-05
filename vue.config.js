const path = require('path')

module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/i,
          include: [
            path.resolve(__dirname, 'src/')
          ],
          loader: 'html-loader'
        }
      ]
    },
    resolve: {
      modules: [
        'src'
      ]
    }
  }
}
