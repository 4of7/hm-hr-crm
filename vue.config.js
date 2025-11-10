'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template'
const port = process.env.port || process.env.npm_config_port || 9528

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    port,
    open: true,
    overlay: { warnings: false, errors: true },
    proxy: {
      '/api': {
        target: 'https://heimahr.itheima.net/',
        changeOrigin: true
      }
    }
  },

  configureWebpack: config => {
    config.name = name

    // ✅ 保留已有 alias，再加上我们自定义的
    config.resolve = config.resolve || {}
    config.resolve.alias = Object.assign(config.resolve.alias || {}, {
      '@': resolve('src')
    })

    // // ✅ 每次打包都生成报告
    // config.plugins.push(
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'static', // 生成静态 HTML 报告
    //     reportFilename: 'bundle-report.html',
    //     openAnalyzer: true
    //   })
    // )
  },

  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{ inline: /runtime\..*\.js$/ }])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
