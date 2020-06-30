import { RouteConfig } from 'vue-router';
const home: RouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
];
export default home;
