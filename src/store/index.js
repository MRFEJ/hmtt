import Vue from 'vue'
import Vuex from 'vuex'



import { getToken } from "@/utils/token.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myToken: getToken("myToken") && getToken("myToken").token,
    resToken: getToken("myToken") && getToken("myToken").refresh_token,

    // myToken: getToken("myToken").token || '1',
    // resToken:  getToken("myToken").refresh_token ||'1',


    // myToken: getToken("myToken")? getToken("myToken").token : '',
    // resToken: getToken("resToken")? getToken("myToken").refresh_token : ''

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
