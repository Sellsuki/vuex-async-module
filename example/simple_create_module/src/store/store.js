import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexAsyncModule } from 'vuex-async-module'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Info: {
      ...createVuexAsyncModule('info')
    }
  }
})