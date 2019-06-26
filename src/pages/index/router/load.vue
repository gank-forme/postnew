<template>
  <div id="load" :class="loadIndex==2?'comon':''">
    <app-header v-if='loadIndex==2'></app-header>
    <div class="load " v-if='loadIndex==0'>
      <img class="logo" src="../assets/logo.png" alt="">
      <img class="cen" src="../assets/image/cen.png" alt="">
      <p class="progress">Loading {{num}}%</p>
      <h2>邮储银行首届<br>金晖杯老年摄影大赛</h2>
    </div>

    <div class="swiperDiv" v-if='loadIndex==1'>
      <swiper @click.native='swiFun(index)' :auto='false' v-model='index' @on-index-change='swiperFun' :loop='false' :list="demo01_list" height='100%' :show-desc-mask='false' dots-position='center'></swiper>
    </div>
    <div class="listIndex" v-if='loadIndex==2'>
      <div class="swi">
        <span class="upload">上传照片</span>
      </div>
      <li class="liItem relative" v-for='i in 10' @click='liCli'>
        <img class="photo" src="" alt="">
        <em class="absolute">热门</em>
        <div class="op absolute"></div>
        <p>
          <span>林素梅</span>
          <span><img src="" alt="">123123</span>
          <span>投TA一票</span>
        </p>
      </li>
    </div>

    <mt-popup
      v-model="popupVisible"
      position="center">
      <div class="alerCon">
        <img src="../assets/alert.png" alt="">
        <span @click='sub1Fun'><img src="../assets/sub1.png" alt=""></span>
      </div>
    </mt-popup>


    <app-footer v-if='loadIndex==2'></app-footer>
  </div>
</template>

<script>

import store from '../store.js'
import qs from 'qs'
import axios from 'axios'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import banner1 from '../assets/1.jpg'
import banner2 from '../assets/2.jpg'
import banner3 from '../assets/3.jpg'
import list1 from '../assets/list1_03.jpg'
import list2 from '../assets/list2_06.jpg'
import list3 from '../assets/list3_08.jpg'
import list4 from '../assets/list4_03.jpg'

export default {
  name: 'app',
  data () {
    return {
      appId:'',
      loadIndex:2,
      index:0,
      num:0,
      popupVisible:false,
      demo01_list:[{
          url: 'javascript:',
          img: banner1,
        }, {
          url: 'javascript:',
          img: banner2,
        },{
          url: 'javascript:',
          img: banner3,
        }
      ],
      listIndex:[list1,list2,list3,list4]
    }
  },
  methods: {
    numFun(){
      let that =this;
      let timer = setInterval(function(){
        that.num++;
        if(that.num >=100){
          that.num =100;
          clearInterval(timer);
          timer = null;
          setTimeout(function(){
            that.loadIndex=1;
          },1000);
        }
      },50);
    },
    toCon(e){
      sessionStorage.homeIndex=2;
      store.commit('infoFun1',e);
      this.$router.push({
        name:'content'
      })

    },
    swiperFun(){
      let that = this;
      if(this.index==1){
        setTimeout(function(){
          that.loadIndex=2;

        },700);
      }
    },
    swiFun(e){
      if(e==2){
        setTimeout(function(){
          that.loadIndex=2;

        },500);
      }
    },
    liCli(){
      this.popupVisible=true;
    },
    sub1Fun(){
      this.popupVisible=false;
    }
  },
  created:function(){
    Indicator.close();
    //this.numFun();
  }
}

</script>

<style>
  #load {
    text-align: center;
    clear: both;
    overflow: auto;
    height: 100%;
    background: url('../assets/image/ban.png') no-repeat center;
    background-size: 100% 100%;
  }
  #load .logo {
    display: block;
    margin: 0 auto;
    width: 180px;
    margin-top: 73px;
  }
  #load .cen {
    width: 100px;
    margin: 0 auto;
    margin-top: 110px;
  }
  #load .progress {
    font-size:16px;
    text-align: center;
    margin-top: 21px;
  }
  .logoImg {
    display: inline-block;
    width: 110px;
  }
  .swiperDiv {
    margin:0 auto;
    height: 100%;
  }
  #load .swi {
    margin: 0 auto;
    background: #ddd;
    height: 150px;
    margin-top: 50px;
    position: relative;
  }
  #load .swi .upload {
    color: #028458;
    padding:3px 10px;
    font-size: 13px;
    position: absolute;
    right: 15px;
    background: #fff;
    border-radius: 10px;
    top: 10px;
  }
  #load .listIndex {
    clear: both;
    overflow: hidden;
  }
  #load .liItem {
    width: 48%;
    height: 180px;

    margin-top: 10px;
    background: #ddd;
  }
  #load .liItem em {
    left: 0px;
    top: 0px;
    background: #fff;
    color: #028458;
    padding: 2px 10px;
    border-bottom-right-radius: 5px;
  }
  #load .op {
    width: 100%;
    height: 30px;
    background: #fff;
    opacity: 0.5;
    bottom:0px;
  }
  #load .liItem p {
    position: absolute;
    width: 100%;
    height: 30px;
    bottom:0px;
    font-size: 12px;
    line-height: 30px;
    color: #028458;
    text-align: center;
  }
  #load p span {
    margin-right: 7px;
  }
  #load .liItem:nth-child(even){
    float: left;
  }
  #load .liItem:nth-child(odd){
    float: right;
  }
#load .load h2 {
  font-size: 20px;
  margin-top: 25px;
  color:#3E3A39;
  font-weight: 600;
}
.vux-slider,.vux-swiper {
  height: 100%;
}
.alerCon {
  width: 250px;
}
.alerCon span {
  width: 120px;
  display: block;
  margin: 0 auto;
  margin-top: 50px;
}
#load .mint-popup {
  background: none !important;
}
</style>
