import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import label from "@/views/label/label"
import home from "@/views/home/home.vue"
import quiz from "@/views/quiz/quiz.vue"
import video from "@/views/video/video.vue"
import my from "@/views/my/my.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/label',
    component: label,
    children: [{
      path: '/home',
      component: home,
    },
    {
      path: '/quiz',
      component: quiz,
    },
    {
      path: '/video',
      component: video,
    },
    {
      path: '/my',
      component: my,
    },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
