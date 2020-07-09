const Path = require('path');
const Webpack = require('webpack');
const dllPath = 'public/dll';

module.exports = env => {
  const isProd = env.production; // 区别开发环境和生成环境 用于dll打包依赖时有轻微差别，如日志输出，warn

  return {
    mode: isProd ? 'production' : 'development',
    entry: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui'], // 公共依赖
    output: {
      path: Path.resolve(__dirname, dllPath),
      filename: isProd ? '[name].dll.js' : '[name].dll-dev.js',
      library: '[name]_[hash]'
    },
    plugins: [
      new Webpack.DllPlugin({
        context: __dirname,
        name: '[name]_[hash]',
        path: Path.resolve(__dirname, dllPath, isProd ? 'manifest.json' : 'manifest-dev.json')
      })
    ]
  };
};
