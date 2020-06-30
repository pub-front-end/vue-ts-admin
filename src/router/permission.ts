/**
 * @copyright L.Dragon
 * @description 路由守卫
 */
import router from '.';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import settings from '@/config/settings';

NProgress.configure({ showSpinner: true });
router.beforeResolve(async (to, from, next) => {
  NProgress.start();
  // TODO 具体路由权限逻辑，具体分析
  document.title = to.meta.title || settings.title;
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done();
});
