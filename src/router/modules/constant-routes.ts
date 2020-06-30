import { RouteConfig } from 'vue-router';
const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  }
];
export default constantRoutes;
