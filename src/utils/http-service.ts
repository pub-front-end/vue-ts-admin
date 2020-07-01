/**
 * http请求/相应拦截器
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStore, setLocalStore } from './storage';
import { Message } from 'element-ui';
import router from '@/router';

/**
 * 根据运行环境确定url地址
 * @param env
 */
const getBaseUrl = (env: string) => {
  let envUrl: { [index: string]: any } = {
    production: process.env.VUE_APP_PRO_API,
    development: process.env.VUE_APP_DEV_API
  };
  let base = envUrl[env];
  if (!base) {
    base = '/';
  }
  return base;
};

/**
 * 创建文件下载的DOM结构
 * @param response
 */
function downloadUrl(response: AxiosResponse) {
  let blob = new Blob([response.data], { type: 'application/actet-stream;charset=utf-8' }); // application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
  let contentDisposition = response.headers['content-disposition']; // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  let patt = /'filename=([^;]+\\.[^\\.;]+);*'/;
  let filename = (patt.exec(contentDisposition) as any)[1].replace(/\"/g, '');
  let downloadElement = document.createElement('a');
  let href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.style.display = 'none';
  downloadElement.href = href;
  downloadElement.download = decodeURIComponent(filename); // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  return downloadElement.download;
}

/**
 * HTTP拦截器
 */
class UAxios {
  baseURL: string;
  timeOut: string | number;
  withCredentials: boolean;
  crossDomain: boolean;

  constructor() {
    this.baseURL = getBaseUrl(process.env.NODE_ENV);
    this.timeOut = getLocalStore('timeout') || 5000;
    this.withCredentials = true; // 允许携带凭证
    this.crossDomain = true; // 允许跨域
  }

  public request(options: AxiosRequestConfig) {
    // 每次请求都会创建新的axios实例。
    const instance: AxiosInstance = axios.create();
    // 将用户传过来的参数与公共配置合并。
    const config = {
      baseURL: this.baseURL,
      timeOut: this.timeOut,
      withCredentials: this.withCredentials,
      crossDomain: this.crossDomain,
      ...options
    };
    // 配置拦截器，支持根据不同url配置不同的拦截器。
    this.setInterceptors(instance, options.url);
    return instance(config); // 返回axios实例的执行结果
  }

  private setInterceptors(instance: AxiosInstance, url?: string | undefined) {
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        // todo 这里需要设置token信息
        // 每个请求都传递token
        // 例： config.headers.Authorization = getLocalStore('token') || '';
        return config;
      },
      err => {
        Message(err);
        Promise.reject(err);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      response => {
        // 拦截文件下载数据
        if (response.headers && response.headers['content-type'] === 'application/octet-stream;charset=utf-8') {
          return downloadUrl(response);
        } else {
          if (response.data.code !== '100013') {
            return response.data;
          } else {
            if (String(this.timeOut) !== '1') {
              setLocalStore('timeOut', 1);
              Message(response.data.message || '您没有访问当前接口的权限，可以切换用户或重新登录');
              setTimeout(() => {
                // todo 这里需要删除token
                // 例： removeStore('token');
                router.replace({ path: '/login' });
                location.reload();
              }, 1000);
            }
          }
        }
      },
      err => {
        if (axios.isCancel(err)) {
          Message(err);
          return Promise.reject(err.message);
        } else {
          if (err.response) {
            switch (err.response.status) {
              case 401:
              // 返回 401 清除token ? 或者 跳转到401页面 或者 跳转到登录页面
              // alert(err.response);
              // router.replace({
              //   path: '/login'
              // });
              case 404:
              // 返回404 跳转到404页面 或者 跳转到登录页面
              // router.replace({
              //   path: '/login'
              // });
            }
          }
          return Promise.reject(err); // 返回接口返回的错误信息
        }
      }
    );
  }
}
let HttpServ = new UAxios();

/**
 * 公共的get方法
 * @param url
 * @param params
 * @param isParams
 */
export const http_get = (url: string, params: any, isParams = true) =>
  HttpServ.request({
    method: 'get',
    url: isParams ? url : url + params,
    params: isParams ? params : null
  });

/**
 * 公共的post方法
 * @param url
 * @param data
 * @param headers
 */
export const http_post = (url: string, data: any, headers: any) =>
  HttpServ.request({
    method: 'post',
    url,
    data,
    headers
  });

/**
 * 公共的put方法
 * @param url
 * @param data
 */
export const http_put = (url: string, data: any) =>
  HttpServ.request({
    method: 'put',
    url,
    data
  });

/**
 * 公共的delete方法
 * @param url
 * @param data
 */
export const http_del = (url: string, data: any) =>
  HttpServ.request({
    method: 'put',
    url: url + data
  });

export default HttpServ;
