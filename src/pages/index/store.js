import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  userId:''
}
const actions={

}
const mutations ={
  formFun (state,data){
    state.userId=data
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
