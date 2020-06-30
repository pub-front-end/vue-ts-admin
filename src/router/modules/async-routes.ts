import { RouteConfig } from 'vue-router';
import Layout from '@/views/layout/index.vue';

const routeFiles = require.context('../modules', true, /\.ts$/);

const routes = routeFiles.keys().reduce((modules: RouteConfig[], modulePath: string) => {
  let value = routeFiles(modulePath);
  return (value.default as RouteConfig[]) ? modules.concat(value.default) : modules;
}, []);

const asyncRoutes: RouteConfig[] = [
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: routes
  }
];

export default asyncRoutes;
