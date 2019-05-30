import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  infoIndex:''
}
const actions={

}
const mutations ={
  infoFun (state,data){
    state.infoIndex=data
  }
}
const getters = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{}
})
