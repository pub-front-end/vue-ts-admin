import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import constantRoutes from './modules/constant-routes';
import asyncRoutes from './modules/async-routes';

Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes.concat(asyncRoutes)
  });

const router = createRouter();

export default router;
