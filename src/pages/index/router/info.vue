<template>
  <div id="info">
    <x-header :left-options="{backText: ''}">商品详情</x-header>
    <div class="content">
      <swiper :aspect-ratio="300/800" dots-position='center'>
        <swiper-item class="swiper-demo-img" v-for="(item, index) in infoData.screenshots" :key="index"><img :src="item"></swiper-item>
      </swiper>
      <div class="clearfix dec">
        <div class="fl">
          {{infoData.detail}}
        </div>
        <div class="fr">
          市场价 <span>￥ <em>{{infoData.price}}</em></span>
        </div>
      </div>
      <div class="imgBox">
        <img v-for="(item, index) in infoData.banner" :key="index" :src="item" alt="">
      </div>
      <img src="../assets/sm.png" alt="">
      <div class="botBg relative">
        <img src="../assets/botBg.png" alt="">
        <img class="absolute" src="../assets/dh.png" @click='toCon' alt="">
      </div>
      <img class="backTop" @click='toTop' src="../assets/backTop.png" alt="">
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
      infoData:'',
      scrollTop: 0,
        time: 0,
        dParams: 20,
        scrollState: 0
    }
  },
  computed:{
     showTop: function(){
       let value = this.scrollTop>200?true:false;
       return value;
     },
   },
  mounted() {
     window.addEventListener('scroll', this.getScrollTop);
   },
  methods: {
    toCon(){
      this.$router.push({
        name:'convert'
      })
    },
    toTop(e) {
        if(!!this.scrollState){
          return;
        }
        this.scrollState = 1;
        e.preventDefault();
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let _this = this;
        this.time = setInterval(function(){ _this.gotoTop(_this.scrollTop-_this.dParams) }, 10);
      },
      gotoTop(distance){
        this.dParams += 20;
        distance = distance>0 ? distance : 0;
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
        if(this.scrollTop < 10){
          clearInterval(this.time);
          this.dParams = 20;
          this.scrollState = 0;
        }
      },
      getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
  },
  created:function(){
    let that =this;
    Indicator.open('加载中');
    this.axios({
       method: 'get',
       url: '/api/goodsInfo?token='+sessionStorage.token+'&id='+sessionStorage.infoId,
     }).then(function (res) {
       Indicator.close();
       if(res.data.code==1){
         that.infoData = res.data.data;
       }else {
         Toast({
           message: res.data.msg,
           position: 'bottom',
           duration: 1500
         });

       }
     })
  }
}
</script>

<style>
#info  {
  min-height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#info .content {
  padding-top: 60px;
}
#info .vux-swiper-item  img {
  display: block;
  width: 100%;
  height: 100%;
}
#info .vux-slider {
  box-shadow: 3px 3px 5px #999;
}
#info .vux-swiper{
  height: 300px !important;
}
#info .dec {
  background: #eaf4f5;
  color: #595757;
  box-shadow: 3px 3px 5px #999;
  margin-top: 10px;
  margin-bottom: 10px;
}
#info .dec .fl {
  font-size: 16px;
  width: 55%;
  padding: 10px 0 10px 20px;
}
#info .dec .fr {
  font-size: 13px;
  width: 30%;
  padding: 30px 10px 0 0;
}
#info .dec .fr span{
  color: #39815b;
}
#info .dec .fr span em{
  font-size: 18px;
  font-weight: 600;
}
#info .imgBox {
  box-shadow: 3px 3px 5px #999;
  margin-bottom: 10px;
}
#info .imgBox img{
  width: 100%;
}
#info .botBg {
  margin-top: 10px;
}
#info .botBg .absolute {
  width: 100px;
  right: 10px;
  top: 10px;
}
.backTop  {
  position: fixed;
  bottom: 80px;
  width: 50px;
  right: 10px;
}
</style>
