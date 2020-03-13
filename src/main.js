import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'

// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 导入字体图片
import "@/assets/style/font.css"

// 导入全局过滤器
import "@/filter/filter.js"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
