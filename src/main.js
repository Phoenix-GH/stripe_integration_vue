// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store, loadCache } from './store/index';
import router from './router'
import VueScript2 from 'vue-script2'
Vue.use(VueScript2);

Vue.config.productionTip = false

//event bus
export const eventBus = new Vue();
console.log('created event bus');

//load the cache
loadCache();


(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if(d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src ="//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}
(document,'script','facebook-jssdk'));


window.fbAsyncInit = function() {
    FB.init({
        appId      :'263766374079183',
        xfbml      :true,
        version    :'v2.8'
    });
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
