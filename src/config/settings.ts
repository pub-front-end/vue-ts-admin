export default {
  // 部署时的URL
  publicPath: '',
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: 'vue-ts-admin',
  // 开发环境端口号
  devPort: '80',
  // 不经过校验的路由
  routesWhiteList: ['/login', '/404', '/401'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // 消息框消失时间
  messageDuration: 3000,
  // 最长请求时间
  requestTimeout: 5000
};
