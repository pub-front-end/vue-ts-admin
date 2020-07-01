/**
 * 用户相关的公共API方法
 */

import HttpServ from '@/utils/http-service';

export const login = (data: any) =>
  HttpServ.request({
    url: '/users/login',
    method: 'post',
    data
  });

export const getUserInfo = (data: any) =>
  HttpServ.request({
    url: '/users/getUserInfo',
    method: 'get',
    params: data
  });
