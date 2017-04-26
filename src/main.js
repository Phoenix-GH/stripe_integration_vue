// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { store, loadCache } from './store/index';
import router from './router';
import VideoPlayer from 'vue-video-player';
Vue.use(VideoPlayer);
import SocialSharing from 'vue-social-sharing';
Vue.use(SocialSharing);
Vue.use(require('vue-script2'));

// hls plugin
require('videojs-contrib-hls/dist/videojs-contrib-hls');
Vue.config.productionTip = false;

//event bus
export const eventBus = new Vue();

//load the cache
loadCache();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
