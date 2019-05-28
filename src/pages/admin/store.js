import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  homeData:'',
  listData:'',
  infoData:''
}
const actions={
  //homeData:'',
}
const mutations ={
  homeFun (state,data){
    state.homeData=data
  },
  listFun (state,data){
    state.listData=data
  },
  infoFun (state,data){
    state.infoData=data
  },
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
