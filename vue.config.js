
const Webpack = require("webpack");
const path = require("path");
const Gzip = require("compression-webpack-plugin");

function resolve (dir) {
  return path.join(__dirname, dir);
}
const mockServerPort = 9529 // 设置mockserver的端口
module.exports = {
  devServer: {
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${mockServerPort}/mock-api/v1`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
  //简单配置
  configureWebpack (config) {
    if(process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new Gzip({
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240, // 超过10k进行压缩
            deleteOriginalAssets: false, // 是否删除源文件
          })
        ]
      }
    }
    else {
      return {
        resolve: {
          alias: {
            "@": resolve("src"),
          },
        },
        plugins: [
          new Webpack.ProvidePlugin({
            echarts: "echarts",
            "window.echarts": "echarts",
          }),
        ],
      };
    }
  },
  // chainWebpack链式配置规则
  // https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
  chainWebpack: config => {
    // GraphQL Loader
    // 只有在生产过程中添加缩小插件，否则设置devtool到源映射
    config
      .when(process.env.NODE_ENV === 'production',
        config => config.plugins.delete('prefetch'),
        config => config.devtool('source-map')
      );

  }
}
