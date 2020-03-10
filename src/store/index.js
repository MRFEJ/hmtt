import Vue from 'vue'
import Vuex from 'vuex'



import { getToken } from "@/utils/token.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myToken: getToken("myToken"),
    resToken: getToken("resToken"),

  },
  mutations: {
    myToken(state, val) {
      state.myToken = val
    },
    resToken(state, val) {
      state.resToken = val
    }

  },
  actions: {
  },
  modules: {
  }
})
