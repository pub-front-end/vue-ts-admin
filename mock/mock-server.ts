import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import path from 'path';
import yaml from 'yamljs';
import * as api from './api';
import { accessTokenAuth } from './security';

const app = express();
const port = 9528;
const { connector, summarise } = require('swagger-routes-express');

// 启用Gzip
app.use(compression());
// 记录请求日志
app.use(morgan('dev'));
// 允许跨域
app.use(cors());
// POST, PUT, DELETE 请求体解析
app.use(bodyParser.json({ limit: '20mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: false
  })
);
// 设置相应请求头
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '-1');
  next();
});

// 读取swagger的配置文件，规范项目文档
const apiDefinition = yaml.load(path.resolve(__dirname, 'swagger.yml'));
// 构建mock函数
const options = {
  security: {
    AccessTokenAuth: accessTokenAuth
  }
};
const connectSwagger = connector(api, apiDefinition, options);
connectSwagger(app);
// 打印路由信息
const apiSummary = summarise(apiDefinition);
console.log(apiSummary);

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  res.status(404).json({
    message: err.message,
    error: err
  });
});

// 开启server
const server = http.createServer(app);

// 端口
server.listen(port);
server.on('error', onError);
console.log('Mock server started on port ' + port + '!');

// 错误请求处理
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // 特殊请求错误处理
  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR (app) : %s requires elevated privileges', bind);
      process.exit(1);
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind);
      process.exit(1);
    default:
      throw error;
  }
}
