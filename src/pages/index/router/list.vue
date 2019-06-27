<template>

  <div id="list">
    <x-header :left-options="{backText: ''}"><span :class='ind==2?"act":""' @click='navFun(1)'>赛区榜单</span><span :class='ind==1?"act":""' @click='navFun(2)'>全国榜单</span> </x-header>



    <app-footer></app-footer>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import store from '../store.js'
import qs from 'qs'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      ind:2
    }
  },
  created:function(){

  },
  methods:{
    navFun(e){
      this.ind = e;
    }
  },

}

</script>

<style>
#list span.act {
  font-size: 13px;
}
#list .vux-header-title span:nth-child(1){
  margin-right: 20px;
}
</style>
