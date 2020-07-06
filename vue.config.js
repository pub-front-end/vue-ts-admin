
const Webpack = require("webpack");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["html", "js", "css", "svg"];

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
    // 去掉preload  prefetch预加载
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    config.resolve.symlinks(true);

    config
      .when(process.env.NODE_ENV === 'production',

        config => {
          config.devtool("none");
          // 使用CompressionWebpackPlugin gzip压缩文件资源
          config
            .plugin("compression")
            .use(CompressionWebpackPlugin, [
              {
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
                threshold: 10240, // 超过10k进行压缩
                deleteOriginalAssets: false, // 是否删除源文件
                minRatio: 0.8,
              },
            ])
            .end();
          // html-webpack-plugin的扩展插件，用于给<script>添加async，defer或module属性的元素，甚至内联 //TODO 待研究具体作用
          // config
          //   .plugin("ScriptExtHtmlWebpackPlugin")
          //   .after("html")
          //   .use("script-ext-html-webpack-plugin", [{ inline: /runtime\..*\.js$/ }])
          //   .end();

          // splitChunks提取被重复引入的文件，单独生成一个或多个文件，这样避免在多入口重复打包文件
          config.optimization.splitChunks({
            chunks: "all",
            cacheGroups: {
              libs: {
                name: "chunk-libs",
                test: /[\\/]node_modules[\\/]/,
                priority: 10, //优先级，多个分组冲突时决定把代码放在哪块
                chunks: "initial",
              },
              elementUI: {
                name: "chunk-elementUI",
                priority: 20,
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
              },
              commons: {
                name: "chunk-commons",
                test: resolve("src/components"),
                minChunks: 3, // 被entry引入的次数，默认1
                priority: 5,
                reuseExistingChunk: true,
              },
            },
          });
          // runtimechunk设置为true会向每个只包含运行时的入口点添加一个额外的块。
          //为single会创建一个运行时文件，供所有生成的块共享。
          config.optimization.runtimeChunk("single");
        },
        config => {
          config.devtool('source-map')
        }

      );

  }
}
