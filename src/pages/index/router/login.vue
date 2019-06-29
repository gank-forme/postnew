<template>
  <div id="login">

  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'

export default {
  name: 'app',
  data () {
    return {
      usernum:'',
      username:''
    }
  },
  methods: {

  },
  created:function(){

  }
}
</script>

<style>
#login {
  height: 100%;
  clear: both;
  overflow: hidden;
}

</style>
