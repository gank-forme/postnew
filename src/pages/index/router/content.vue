<template>
  <div id="content" class="">
    <x-header :left-options="{backText: ''}">{{title}}</x-header>

    <div class="content">
      <img :src="result[index]" alt="">
    </div>
  </div>
</template>
<script>

import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import axios from 'axios'
import info1 from '../assets/images/05_02.jpg'
import info2 from '../assets/images/06_03.jpg'
// import info3 from '../assets/info4_03.jpg'
// import info4 from '../assets/info1_03.jpg'

export default {
  name: 'app',
  data () {
    return {
      title:'',
      index:sessionStorage.conId,
      result:[
        info1,info2
      ]
    }
  },
  methods:{

  },
  created:function(){
    if(this.index ==1){
      this.title='《金晖杯老年摄影奖品设置》'
    }else{
      this.title='《金晖杯活动规则》'
    }
  }
}
</script>

<style>
#content {
  min-height: 100%;
  background: url('../assets/combg.png') no-repeat center;
  background-size: 100% 100%;
}
#content .content{
  padding-top: 50px;
}

</style>
