<template>
  <div id="list">
    <x-header :left-options="{backText: ''}">商品详情</x-header>

    <div class="content">
      <img src="../assets/info1_02.jpg" alt="">
    </div>
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

    }
  },
  methods: {

  },
  created:function(){

  }
}
</script>

<style>

</style>
