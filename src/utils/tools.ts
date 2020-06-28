/**
 * @copyright L.Dragon
 * @description 深度克隆
 * @param origin 被克隆对象
 * @param target 获得copy
 * @returns {object}
 */
// TODO 类型改为object 要报错
export const deepClone = (origin: any, target: any): any => {
  for (let key in origin) {
    // 遍历原对象
    if (origin.hasOwnProperty(key)) {
      // 如果是数组
      if (Array.isArray(origin[key])) {
        target[key] = [];
        deepClone(origin[key], target[key]); // 递归
      } else if (typeof origin[key] === 'object' && origin[key] !== null) {
        target[key] = {};
        deepClone(origin[key], target[key]); // 递归
      } else {
        target[key] = origin[key];
      }
    }
  }
  return target;
};

/**
 * @copyright L.Dragon
 * @description 格式化时间
 * @param time 时间
 * @param cFormat 格式
 * @returns {string}
 */
export function parseTime(time: Date | number | string, cFormat?: string): string {
  if (arguments.length === 0) {
    return '';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;
  if (typeof time === 'object') {
    date = time;
  } else {
    let tempTime = 0;
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      tempTime = parseInt(time, 0);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      tempTime = time * 1000;
    }
    date = new Date(tempTime);
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      return '0' + value;
    }
    return value + '' || '0';
  });
  return timeStr;
}

/**
 * @copyright L.Dragon
 * @description 计算time离当前多久
 * @param time 时间
 * @param cFormat 格式
 * @returns {string}
 */
export function formatTime(time: Date | number, cFormat?: string): string {
  let timeNum = typeof time === 'object' ? time.getTime() : time;
  if (timeNum.toString().length === 10) {
    timeNum = timeNum * 1000;
  }
  const d: Date = new Date(timeNum);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 时间间隔秒数

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (cFormat) {
    return parseTime(time, cFormat);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

/**
 * @copyright L.Dragon
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {object}
 */
export function param2Obj(url: string): object {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  );
}
// 树形节点 接口
interface INode {
  parentId: string;
  id?: string;
  name?: string;
  children?: INode[];
  [key: string]: any; // 其他属性
}
/**
 * @copyright  L.Dragon
 * @description 父子关系的数组转换成树形结构数据
 * @param data
 * @returns {*}
 */
export function translateDataToTree(data: INode[]): INode[] {
  const parent = data.filter(
    value => value.parentId === 'undefined' || value.parentId === null || value.parentId === value.id
  );
  const children = data.filter(
    value => value.parentId !== 'undefined' && value.parentId !== null && value.parentId !== value.id
  );
  const translator = (parent: INode[], children: INode[]) => {
    parent.forEach(parent => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          typeof parent.children !== 'undefined' ? parent.children.push(current) : (parent.children = [current]);
        }
      });
    });
  };
  translator(parent, children);
  return parent;
}

/**
 * @copyright  L.Dragon
 * @description 树形结构数据转换成父子关系的数组
 * @param data
 * @returns {[]}
 */
export function translateTreeToData(data: INode[]): INode[] {
  const result: INode[] = [];
  data.forEach(item => {
    const loop = (node: INode) => {
      // 直接复制除了children的其他属性
      result.push({
        ...node,
        children: undefined
      });
      const child = node.children;
      if (child) {
        child.forEach(e => {
          loop(e);
        });
      }
    };
    loop(item);
  });
  return result;
}
