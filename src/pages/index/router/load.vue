<template>
  <div id="load" class="comon">
    <div class="load " v-if='loadIndex==0'>
      <img class="logo" src="../assets/logo.png" alt="">
      <p class="progress">Loading {{num}}%</p>
    </div>
    <app-header></app-header>
    <div class="swiperDiv" v-if='loadIndex==1'>
      <swiper :list="demo01_list" height='600px' :show-desc-mask='false' dots-position='center'></swiper>
    </div>
    <div class="listIndex" v-if='loadIndex==2'>
      <p><img class="logoImg" src="../assets/logo.png" alt=""> </p>
      <li v-for='(i,index) in listIndex' :key='index' @click='toCon(index)'>
        <img :src='i' alt="">
      </li>
      <h1 class="tipH">请进入您需要查看的详情 </h1>
      <h2 class="tipH">Please enter the details you need to see. </h2>
    </div>
    <app-footer v-if='loadIndex==2'></app-footer>
  </div>
</template>

<script>
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import banner2 from '../assets/banner1_03.jpg'
import banner1 from '../assets/banner2_03.jpg'
import list1 from '../assets/list1_03.jpg'
import list2 from '../assets/list2_06.jpg'
import list3 from '../assets/list3_08.jpg'

export default {
  name: 'app',
  data () {
    return {
      loadIndex:2,
      num:0,
      demo01_list:[{
          url: 'javascript:',
          img: banner1,
        }, {
          url: 'javascript:',
          img: banner2,
      }],
      listIndex:[list1,list2,list3]
    }
  },
  methods: {
    numFun(){
      let that =this;
      let timer = setInterval(function(){
        that.num++;
        console.log(that.num);
        if(that.num >=10){
          that.num =100;
          clearInterval(timer);
          timer = null;
          setTimeout(function(){
            that.loadIndex=2;
          },1000);
        }
      },80);
    },
    toCon(e){
      store.commit('infoFun',e);
      this.$router.push({
        name:'content'
      })
    }

  },
  created:function(){
    if(this.loadIndex==0){
      this.numFun();
    }
  
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
  .logoImg {
    display: inline-block;
    width: 110px;
  }
  .swiperDiv {
    width: 90%;
    margin:0 auto;
    margin-top: 60px;
  }
  .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
    background-position: top !important;
    background-size: 100% !important;
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
    height: 115px;
    text-align: center;
    color: #fff;
    position: relative;
  }
  .listIndex li img {
    width: 100%;
    /* width: 33px;
    height: 33px;
    display: inline-block;
    background: #999;
    margin-top: 20px;
    margin-bottom: 10px; */
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
