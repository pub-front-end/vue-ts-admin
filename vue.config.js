
const Webpack = require("webpack");
const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //简单配置
  configureWebpack (config) {
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
