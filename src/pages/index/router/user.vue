<template>
  <div id="user">
    <x-header :left-options="{showBack: false}">个人中心</x-header>
    <div class="content">
      <div class="maybe clearfix">
        <h1>我的兑换</h1>
        <img class="fl" src="../assets/my1.png" @click='myFun' alt="">
        <img class="fr" src="../assets/my2.png" alt="">
      </div>
      <h2 class="h2tit">兑换客服</h2>
      <div class="kf relative">
        <span><em>QQ客服：</em>201293223</span>
        <img class="kf" src="../assets/tel.png" alt="">
      </div>
      <img class="botto" src="../assets/friend.png" alt="">
      <div class="imgBox relative clearfix">
        <div v-for='(i,index) in imgArr' :key='index' class="imgBg">
          <img :src="i" alt="">
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import img5 from '../assets/img5.png'
import img6 from '../assets/img6.png'
export default {

  name: 'app',
  data () {
    return {
      imgArr:[
        img1,img2,img3,img4,img5,img6
      ]
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
  margin-top: 3px;
  font-size: 14px;
  color: #39815b;
}
#user .kf span {
  position: absolute;
  left: 60px;
  top: 10px;
  font-size: 17px;
}
#user .kf span em{
  font-size: 12px;
}
#user .botto {
  margin-top: 60px;
}
#user .h2tit {
  font-size: 14px;
  color: #39815b;
  margin-left: 20px;
}
#user .imgBg:nth-child(3n+2){
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}
#user .imgBg:nth-child(1){
  position: absolute;
  left: 0px;
  top: 0px;
}
#user .imgBg:nth-child(3){
  position: absolute;
  right: 0px;
  top: 0px;
}
#user .imgBg:nth-child(4){
  position: absolute;
  left: 0px;
  top: 60px;
}
#user .imgBg:nth-child(6){
  position: absolute;
  right: 0px;
  top: 60px;
}
#user .imgBg {
  width: 100px;
  height: 50px;
  background: url('../assets/imgBg.png') no-repeat;
  background-size: 100%;
  text-align: center;
  line-height: 40px;
}
#user .imgBg img {
  width: 60px;
}
</style>
