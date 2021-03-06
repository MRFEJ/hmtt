import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import "@/assets/style/font.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
