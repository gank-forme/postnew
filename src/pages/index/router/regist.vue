<template>
  <div id="regist">
    <x-header :left-options="{backText: ''}">注册</x-header>
    <div class="fromBox">
      <group>
         <x-input type="text" placeholder="请输入您的手机号" :max='11' v-model="phone" >
           <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/phone.png" height="20px;" alt="">
         </x-input>
       </group>
       <group>
        <x-input type="text" placeholder="请输入手机验证码" v-model="msg" class="weui-vcode">
          <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/msg.png" height="20px;" alt="">
          <x-button slot="right" type="primary" mini @click.native='sendFun'>发送验证码</x-button>
        </x-input>
      </group>
      <group>
         <x-input type="text" placeholder="请输入您的初始密码" v-model="firstPass" >
           <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/lock.png" height="20px;" alt="">
         </x-input>
       </group>
       <group>
          <x-input type="text" placeholder="请再次输入您的初始密码" v-model="lastPass" >
            <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/lock.png" height="20px;" alt="">
          </x-input>
        </group>

      <img class="loginBtn" src="../assets/regist.png" @click='regFun' alt="">
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
      phone:'',
      msg:'',
      firstPass:'',
      lastPass:''
    }
  },
  methods: {
    sendFun(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/getSmsCode?phone='+that.phone,
       }).then(function (res) {
         Indicator.close();
         if(res.data.error==0){
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
           setTimeout(function(){
             history.go(-1);
           },2000);
         }else {
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    },
    regFun(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/api/register',
         data:{
           phone:that.phone,
           smscode:that.msg,
           password:that.firstPass,
           repassword:that.lastPass
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.error==0){
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
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
