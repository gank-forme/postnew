<template>
  <div id="load" class="comon">
    <div class="load " v-if='loadIndex==0'>
      <img class="logo" src="../assets/logo.png" alt="">
      <p class="progress">Loading 34%</p>
    </div>
    <app-header></app-header>
    <div class="swiperDiv" v-if='loadIndex==1'>
      <swiper :list="demo01_list" :aspect-ratio='2' :show-desc-mask='false' dots-position='center'></swiper>
    </div>
    <div class="listIndex" v-if='loadIndex==2'>
      <p><img class="logoImg" src="../assets/logo.png" alt=""> </p>
      <li v-for='i in listIndex'>
        <img src="" alt="">
        <img class="goBtn" src="" alt="">
        <h1>{{i.tit}}</h1>
        <h2>{{i.dec}}</h2>
      </li>
      <h1 class="tipH">请进入您需要查看的详情 </h1>
      <h2 class="tipH">Please enter the details you need to see. </h2>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import banner1 from '../assets/banner1.png'
// import banner1 from '../assets/img.png'

export default {
  name: 'app',
  data () {
    return {
      loadIndex:2,
      demo01_list:[{
          url: 'javascript:',
          img: banner1,
        }, {
          url: 'javascript:',
          img: banner1,
      }],
      listIndex:[{
        logo:'',
        tit:'梦想加邮站系列活动详情',
        dec:'Details of the series of activities',
      },{
        logo:'',
        tit:'梦想加邮站发起流程',
        dec:'Dream Plus Post Station Initiation Process',
      },{
        logo:'',
        tit:'你分享我点赞活动奖品设置',
        dec:'You share my compliments on the prize settings for the event',
      }]
    }
  },
  methods: {

  },
  created:function(){
    Indicator.close();
  }
}
</script>

<style>
  #load {
    text-align: center;
    clear: both;
    overflow: hidden;
    height: 100%;
    background: linear-gradient(to bottom right, #fff 40%, #79CA9E);
  }
  #load .logo {
    display: block;
    margin: 0 auto;
    width: 180px;
    margin-top: 240px;
  }
  #load .progress {
    font-size:13px;
    text-align: center;
    margin-top: 10px;
  }
  .header {
    color: #fff;
    line-height: 30px;
    padding:2px 10px;
    font-size: 13px;
    font-weight: 700;
    background: #339864;
  }
  .logoImg {
    display: inline-block;
    width: 110px;
  }
  .swiperDiv {
    width: 90%;
    margin:0 auto;
    border: 1px solid orange;
    margin-top: 20px;
  }
  .listIndex {
    width: 94%;
    margin:0 auto;
    margin-top: 45px;
  }
  .listIndex p {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: right;
  }
  .listIndex li {
    width: 94%;
    margin: 0 auto;
    margin-top: 10px;
    background: #339864;
    height: 115px;
    text-align: center;
    color: #fff;
    position: relative;
  }
  .listIndex li img {
    width: 33px;
    height: 33px;
    display: inline-block;
    background: #999;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .listIndex li h1{
    font-size: 13px;
    font-weight: 700;
  }
  .listIndex li h2{
    width: 60%;
    line-height: 12px;
    margin: 0 auto;
    font-size: 10px;
  }
  .listIndex li img.goBtn {
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    top: 30px;
    right: 20px;
    border:1px solid red;
  }
  h1.tipH {
    color: #03764D;
    font-size: 15px;
    font-weight: 700;
    margin-top: 42px;
  }
  h2.tipH {
    color: #03764D;
    font-size: 12px;
  }

</style>
