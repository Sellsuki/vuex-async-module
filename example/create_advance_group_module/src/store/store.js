import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexAsyncModule } from 'vuex-async-module'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    users:{
      namespaced: true,
      modules: {
        namespaced: true,
        userList: {
          namespaced: true,
          ...createVuexAsyncModule('userList')
        },
        userDetail: {
          namespaced: true,
          ...createVuexAsyncModule('userDetail')
        } 
      }
    }
  }
})