import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  infoIndex:'',
  infoData:'',
  deatilData:''
}
const actions={

}
const mutations ={
  infoFun1 (state,data){
    state.infoIndex=data
  },
  infoFun2 (state,data){
    state.infoData=data
  },
  detailFun (state,data){
    state.deatilData=data
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
