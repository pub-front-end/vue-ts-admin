import Vue from 'vue';
import app from './main.vue';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: 'small' // Set element-ui default size
});

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');
