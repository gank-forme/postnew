<template>
  <div id="convert">
    <x-header :left-options="{showBack: false}">兑换</x-header>
    <div class="fromBox">
      <p class="tips">请输入您的兑换码</p>
      <group>
         <x-input type="text" placeholder="如 789546212" v-model="num" >
           <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/lock.png" height="20px;" alt="">
         </x-input>
       </group>
       <group>
         <x-input placeholder="请输入验证码" v-model='code'>
           <img slot="label" style="margin-right:10px;margin-top:-5px;" src="../assets/msg.png" height="20px;" alt="">
           <img slot="right-full-height" height="20px" :src="imgsrc" @click='getCode'>
         </x-input>
       </group>
       <img class="loginBtn" src="../assets/convert.png" @click='toExchange' alt="">
       <img v-if='datas' class="bot" src="../assets/bot.png" alt="">
       <div v-if='datas' class="maybe clearfix">
         <img class="fl" :src="datas.icon" alt="">
         <h1>{{datas.title}}</h1>
         <h2>
           市场价 <span>￥<em>{{datas.price}}</em></span>
           <img src="../assets/ling.png" @click='tocharge(datas.id)' alt="">
         </h2>
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
import { XInput, Group, XButton, Cell } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  name: 'app',
  data () {
    return {
      num:'',
      code:'',
      imgsrc:'',
      datas:''

    }
  },
  methods: {
    getCode(){
      this.imgsrc='/api/getCode?'+Math.floor(Math.random() * 100);
    },
    toExchange(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/api/toExchange',
         data:{
           code:that.code,
           exchange_code:that.num,
           token:sessionStorage.token
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.datas = res.data.data;
         }else {
           that.getCode();
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    },
    tocharge(e){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/api/receive',
         data:{
           id:e,
           exchange_code:that.num,
           token:sessionStorage.token
         }
       }).then(function (res) {
         Indicator.close();

         if(res.data.code==1){
           sessionStorage.msgId=res.data.data.id;
           sessionStorage.exchange_code=res.data.data.exchange_code;
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
         }else if(res.data.code==2){
           sessionStorage.msgId=res.data.data.id;
           sessionStorage.exchange_code=res.data.data.exchange_code;
           that.$router.push({
             name:'msg'
           })
         }else{
           that.getCode();
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
    this.getCode();
  }
}
</script>

<style>
#convert {
  min-height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#convert .head {
}
#convert .closeBtn {
  width: 20px;
  display: block;
  margin: 15px;
}
#convert .resig {
  font-size: 17px;
  margin: 10px;
  color: #595757;
}
#convert .logo {
  display: block;
  width: 150px;
  margin: 80px auto;
}
#convert .fromBox {
  width: 90%;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
}
#convert .weui-cells {
  background: url('../assets/inpBg.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  color: #595757;
}
#convert .vux-x-input-right-full img {
  width: 100px;
  height: 30px;
  margin-top: 6px;
  margin-right: 6px;
}
#convert .forget {
  text-align: right;
  font-size: 13px;
  color: #595757;
}
#convert .loginBtn {
  margin-top: 30px;
}
#convert .vux-header {
  background: #029161;
}
#convert .tips {
  font-size: 13px;
  color: #028458;
  text-align: center;
  margin-bottom: 10px;
}
#convert .bot {
  display: block;
  margin: 20px auto;
  width: 25px;
}

#convert .maybe {
  text-align: center;
  font-size: 12px;
  color: #666;
  background: url('../assets/maybe.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px 10px 20px 10px;
}
#convert .maySpan {
  background: #609a7b;
  color: #fff;
  font-size: 13px;
  padding: 2px 40px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
  border-radius: 30px;
}
#convert .maybe img.fl {
  display: block;
  width: 80px;
  height: 80px;
  background: #ddd;
  border-radius: 5px;
  margin-right: 10px;
}
#convert .maybe h1 {
  text-align: left;
  color: #595757;
  font-size: 14px;
}
#convert .maybe h2 {
  text-align: left;
  color: #595757;
  font-size: 12px;
  margin-top: 10px;
}
#convert .maybe h2 span{
  color: #39815b;
}
#convert .maybe h2 span em{
  font-size: 18px;
}
#convert .maybe h2 img{
  float: right;
  width: 90px;
  margin-top: 0px;
}



</style>
