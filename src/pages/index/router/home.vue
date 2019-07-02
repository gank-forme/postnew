<template>
  <div id="home">
    <x-header :left-options="{showBack: false}">邮储银行兑奖平台</x-header>
    <div class="content">
      <swiper :aspect-ratio="300/800" dots-position='center'>
        <swiper-item class="swiper-demo-img" v-for="(item, index) in 3" :key="index"><img src="../assets/logo.png"></swiper-item>
      </swiper>
      <ul class="clearfix liBox">
        <li v-for='(i,index) in dataList' :key='index' :id='i.id' @click='toList(i.title,i.id)'>
          <img :src="i.banner" alt="">
        </li>
        <!-- <li class='li1' @click='toList'></li>
        <li class='li2' @click='toList'></li>
        <li class='li3' @click='toList'></li>
        <li class='li4' @click='toList'></li> -->
      </ul>
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
      dataList:[]
    }
  },
  methods: {
    toList(title,id){
      sessionStorage.title =title;
      sessionStorage.listId =id;      
      this.$router.push({
        name:'list'
      })
    },
    getList(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/catList?token='+sessionStorage.token,
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.dataList=res.data.data;
         }else {
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    }
  },
  created:function(){
    this.getList();
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
  padding-top: 60px;
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
#home li img {
  border-radius: 5px;
  box-shadow: 3px #eee;
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
