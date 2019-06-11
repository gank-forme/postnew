<template>
  <div id="content" class="comon">
    <app-header></app-header>
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
import info1 from '../assets/info3_03.jpg'
import info2 from '../assets/info2_03.jpg'
import info3 from '../assets/info4_03.jpg'
import info4 from '../assets/info1_03.jpg'

export default {
  name: 'app',
  data () {
    return {
      index:store.state.infoIndex,
      result:[
        info1,info2,info3,info4
      ]
    }
  },
  methods:{

  },
  created:function(){

  }
}
</script>

<style>
#content {
  min-height: 100%;
}
#content .content{
  padding: 50px 10px 0 10px;
}

</style>
