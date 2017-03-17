// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store, loadCache } from './store/index';
import router from './router'

Vue.config.productionTip = false

//event bus
export const eventBus = new Vue();
console.log('created event bus');

//load the cache
loadCache();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
