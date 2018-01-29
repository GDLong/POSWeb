import Vue from 'vue'
import Vuex from 'vuex'
import 	receivingData  from './modules/receivingData.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    receivingData
  }
})