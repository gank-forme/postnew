<template>
  <div id="regist">
    <x-header :left-options="{backText: ''}">密码找回</x-header>
    <div class="fromBox">
      <group>
         <x-input type="text" placeholder="请输入注册时的手机号" v-model="phone" >
           <img slot="label" style="margin-right:10px;margin-top:-5px;" src="../assets/phone.png" height="20px;" alt="">
           <x-button v-if='timer==60' slot="right" type="primary" mini @click.native='sendFun'>发送验证码</x-button>
           <x-button v-else slot="right" disabled mini @click.native='sendFun'>已发送 {{timer}}s</x-button>
         </x-input>
       </group>
       <group>
        <x-input type="text" placeholder="请输入验证码" v-model="msg" class="weui-vcode">
          <img slot="label" style="margin-right:10px;margin-top:-5px;" src="../assets/msg.png" height="20px;" alt="">
        </x-input>
      </group>
      <group>
         <x-input type="text" placeholder="请输入您的新密码" v-model="firstPass" >
           <img slot="label" style="margin-right:10px;margin-top:-5px;" src="../assets/lock.png" height="20px;" alt="">
         </x-input>
       </group>
       <group>
         <x-input placeholder="请输入验证码" v-model='code'>
           <img slot="label" style="margin-right:10px;margin-top:-5px;" src="../assets/msg.png" height="20px;" alt="">
           <img slot="right-full-height" height="20px" :src="imgsrc">
         </x-input>
       </group>
      <img class="loginBtn" @click ='forUn' src="../assets/sub.png" alt="">
    </div>

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
      timer:60,
      imgsrc:'',
      phone:'',
      msg:'',
      code:'',
      firstPass:'',
      lastPass:''

    }
  },
  methods: {
    timFun(){
      let that =this;
      let tim = setInterval(function(){
        that.timer --;
        if(that.timer<=0){
          clearInterval(tim);
          tim =null;
          that.timer =60;
        }
      },1000);
    },
    sendFun(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/getSmsCode?phone='+that.phone,
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.timFun();

         }else {
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    },
    getCode(){
      this.imgsrc='/api/getCode?'+Math.floor(Math.random() * 100);
    },
    forUn(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/api/repassword',
         data:{
           phone:that.phone,
           password:that.firstPass,
           code:that.code,
           smscode:that.msg
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           //store.commit('loginFun',res.data.data);
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
           setTimeout(function(){
             history.go(-2);
           },2000)        
         }else {
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
#regist {
  height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#regist .head {
}
#regist .closeBtn {
  width: 20px;
  display: block;
  margin: 15px;
}
#regist .resig {
  font-size: 17px;
  margin: 10px;
  color: #595757;
}
#regist .logo {
  display: block;
  width: 150px;
  margin: 80px auto;
}
#regist .fromBox {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
#regist .weui-cells {
  background: url('../assets/inpBg.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
}
#regist .vux-x-input-right-full img {
  width: 100px;
  height: 30px;
  margin-top: 6px;
  margin-right: 6px;
}
#regist .forget {
  text-align: right;
  font-size: 13px;
  color: #595757;
}
#regist .loginBtn {
  margin-top: 30px;
}
#regist .vux-header {
  background: #029161;
}



</style>
