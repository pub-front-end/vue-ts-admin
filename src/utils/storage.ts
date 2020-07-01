import Cookies from 'js-cookie';

/**
 * @description 设置sessionStorage信息
 * @param name
 * @returns null
 */
export function setSessionStore(name: string, content: any) {
  window.sessionStorage.setItem(name, content);
}

/**
 * @description 获取sessionStorage信息
 * @param name
 * @returns any
 */
export function getSessionStore(name: string) {
  return window.sessionStorage.getItem(name);
}

/**
 * @description 删除sessionStorage信息
 * @param name
 * @returns null
 */
export function removeStore(name: string) {
  window.sessionStorage.removeItem(name);
}

/**
 * @description 获取localstorage信息
 * @param name
 * @returns any
 */
export function getLocalStore(name: string) {
  return window.localStorage.getItem(name);
}

/**
 * @description 设置localstorage信息
 * @param name
 * @returns any
 */
export function setLocalStore(name: string, content: any) {
  window.localStorage.setItem(name, content);
}

/**
 * @description 设置token信息
 * @param name
 * @returns any
 */
export function setToken(token: string) {
  Cookies.set('token', token);
}

/**
 * @description 获取token信息
 * @param name
 * @returns any
 */
export function getToken(token: string) {
  Cookies.get('token');
}

/**
 * @description 移除token信息
 * @param name
 * @returns any
 */
export function removeToken(token: string) {
  Cookies.remove('token');
}
