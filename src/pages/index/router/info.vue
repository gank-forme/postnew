<template>
  <div id="info" class='comon'>
    <x-header :left-options="{backText: ''}"></x-header>

    <div class="registBox">
      <div class="userBox">
        <img class="headImg" src="" alt="">
        <p>说的方法</p>
        <div class="infoBox">
          <h1 class='clearfix'><span class="fl">北京 赛区</span>  <span class="fr">女 65</span></h1>
          <h2>希望每个人都可以在自己的分享中得到快乐</h2>
        </div>
      </div>
      <div class="userBox clearfix">
        <img @click='navFun(1)' class="navl" src="../assets/111.png" alt="">
        <img @click='navFun(2)' class="navl" src="../assets/222.png" alt="">
      </div>
      <div v-if='ind==1' class="userBox">
        <div class="txt">
          <h1>当前北京赛区排名</h1>
          <h2>Current ranking of Beijing Branch</h2>
          <h3>16</h3>
          <h1>当前全国排名</h1>
          <h2>Current National Ranking</h2>
          <h3>16123</h3>
        </div>
      </div>
      <div v-else class="picBox clearfix">
        <img v-for='i in 10' src="" alt="">
      </div>
    </div>
    <app-footer message='zan'></app-footer>
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
      ind:1
      //infoData:''
    }
  },
  methods: {
    navFun(e){
      this.ind =e;
    }
  },
  created:function(){

  }
}
</script>

<style>
#info {
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
#info .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 100%;
  margin-top: 50px;
  padding-bottom: 30px;
}
#info .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, .5);
  clear: both;
  overflow: hidden;

  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#info .userBox .navl{
  width: 23px;
  height: 18px;
  margin: 10px 0;
}
#info .userBox .navl:nth-child(1){
  float: left;
  margin-left: 90px;
}
#info .userBox .navl:nth-child(2){
  float: right;
  margin-right: 90px;
}
#info .userBox .txt {
    padding-bottom: 50px;
}
#info .userBox .txt h1{
  font-size: 17px;
  font-weight: 700;
  padding-top: 30px;
}
#info .userBox .txt h3{
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  background: none;
}
#info .headImg {
  display: block;
  margin: 0 auto;
  width: 53px;
  height: 53px;
  border: 1px solid #fff;
  border-radius: 53px;
  margin-top: 40px;
}
#info .infoBox{
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
#info .infoBox h1{
  font-size: 15px;
}
#info .infoBox h1 span {
  display: block;
  width: 130px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 25px;
  height: 25px;
  background: #028458;
  border-radius: 25px;
}
#info .infoBox h2{
  font-size: 13px;
  color: #028458;
  font-weight: 600;
  margin-top: 20px;
  padding-bottom: 20px;
}
#info .infoBox img{
  width: 100%;
  min-height: 250px;
  display: block;
  margin-top: 10px;
}
#info .userBox h3{
  font-size: 14px;
  background: #fff;
  color: #339864;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  margin-top: 10px;
  text-align: left;
}
#info .userBox h3 img {
  width: 18px;
  margin: 0 10px;
}
#info .userBox img.next{
  width: 22px;
  display: block;
  margin: 10px auto;
}
#info .userBox h4{
  font-size: 14px;
  color: #fff;
}
#info .userBox p{
  font-size: 17px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #3E3A39;
}
#info .userBox .subBtn{
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  width: 250px;
  height: 30px;
  background: #03764D;
  color: #fff;
  margin-top: 30px;
}
#info .picBox {
  margin-bottom: 40px;
}
#info .picBox img {
  display: block;
  width: 49%;
  height: 175px;
  background: #ddd;
  margin-top: 5px;
}
#info .picBox img:nth-child(odd) {
  float: left;
}
#info .picBox img:nth-child(even) {
  float: right;
}
</style>
