<template>
  <div id="user">
    <x-header :left-options="{showBack: false}">个人中心</x-header>
    <div class="content">
      <div class="maybe clearfix">
        <h1>我的兑换</h1>
        <img class="fl" src="../assets/my1.png" @click='myFun' alt="">
        <img class="fr" src="../assets/my2.png" alt="">
      </div>

      <img class="kf" src="../assets/kf.png" alt="">
      <img class="botto" src="../assets/bottom.png" alt="">
    </div>
    <app-footer></app-footer>
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
    myFun(){
      this.$router.push({
        name:'mine'
      })
    }
  },
  created:function(){

  }
}
</script>

<style>
#user {
  min-height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#user .content {
  width: 90%;
  margin: 0 auto;
  padding-top: 90px;
  padding-bottom: 20px;
}
#user .maybe {
  text-align: center;
  font-size: 12px;
  color: #666;
  background: url('../assets/maybe.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px;
}
#user .maySpan {
  background: #609a7b;
  color: #fff;
  font-size: 13px;
  padding: 2px 40px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
  border-radius: 30px;
}
#user .maybe img {
  display: block;
  width: 140px;
}
#user .content h1 {
  text-align: left;
  color: #39815b;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
#user .maybe h2 {
  text-align: left;
  color: #595757;
  font-size: 12px;
  margin-top: 10px;
}
#user .maybe h2 span{
  color: #39815b;
}
#user .maybe h2 span em{
  font-size: 18px;
}
#user .maybe h2 img{
  float: right;
  width: 90px;
  margin-top: 0px;
}
#user .kf {
  margin-top: 10px;
}
#user .botto {
  margin-top: 60px;
}
</style>
