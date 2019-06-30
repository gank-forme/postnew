<template>
  <div id="home">
    <x-header :left-options="{showBack: false}">邮储银行兑奖平台</x-header>
    <div class="content">
      <swiper :aspect-ratio="300/800" dots-position='center'>
        <swiper-item class="swiper-demo-img" v-for="(item, index) in 3" :key="index"><img src="../assets/logo.png"></swiper-item>
      </swiper>
      <ul class="clearfix liBox">
        <li class='li1'></li>
        <li class='li2'></li>
        <li class='li3'></li>
        <li class='li4'></li>
      </ul>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import li1 from '../assets/li1.png'
import li2 from '../assets/li2.png'
import li3 from '../assets/li3.png'
import li4 from '../assets/li4.png'
export default {

  name: 'app',
  data () {
    return {
      imgList:[li1,li2,li3,li4]
    }
  },
  methods: {

  },
  created:function(){

  }
}
</script>

<style>
#home {
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#home .content {
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
}
#home .vux-slider {
  background: url('../assets/swiperBg.png') no-repeat;
  background-size: 100%;
  height: 150px;
  text-align: center;
}
#home .liBox {
  padding-bottom: 60px;
}
#home li {
  display: block;
  width: 49%;
  height: 170px;
  margin-top: 10px;
}
#home li:nth-child(even) {
  float: right;
}
#home li:nth-child(odd) {
  float: left;
}
#home .li1 {
  background: url('../assets/li1.png') no-repeat -10px -25px;
  background-size: 130% 147%;
}
#home .li2 {
  background: url('../assets/li2.png') no-repeat -40px -20px;
  background-size: 130% 141%;
}
#home .li3 {
  background: url('../assets/li3.png') no-repeat -10px -25px;
  background-size: 130% 144%;
}
#home .li4 {
  background: url('../assets/li4.png') no-repeat -30px -20px;
  background-size: 124% 140%;
}


</style>
