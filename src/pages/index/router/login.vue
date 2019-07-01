<template>
  <div id="login">
    <div class="head clearfix">
      <img class="closeBtn fl" src="../assets/close.png" alt="">
      <span class='resig fr' @click='toRig'>注册</span>
    </div>
    <img class="logo" src="../assets/logo.png" alt="">
    <div class="fromBox">
      <group>
         <x-input type="text" placeholder="请输入您的账号" :max='11' v-model="username" >
           <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/user.png" height="20px;" alt="">
         </x-input>
       </group>
       <group>
        <x-input type="text" placeholder="请输入您的密码" v-model="password" >
          <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/pass.png" height="20px;" alt="">
        </x-input>
      </group>
      <group>
        <x-input placeholder="请输入验证码" v-model='code'>
          <img slot="right-full-height" height="20px" :src="imgsrc" @click='getCode'>
        </x-input>
      </group>
      <p class='forget' @click='toForget'>忘记密码？</p>

      <img @click='toLoad' class="loginBtn" src="../assets/login.png" alt="">
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
      imgsrc:'',
      username:'',
      password:'',
      code:''
    }
  },
  methods: {
    toRig(){
      this.$router.push({
        name:'regist'
      })
    },
    toForget(){
      this.$router.push({
        name:'forget'
      })
    },
    toLoad(){

      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/api/login',
         data:{
           phone:that.username,
           password:that.password,
           code:that.code
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           //store.commit('loginFun',res.data.data);
           sessionStorage.token= res.data.data.token;
           that.$router.push({
             name:'home'
           })

         }else {
           that.getCode();
           Toast({
             message: res.data.message,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    },
    getCode(){
      this.imgsrc='/api/getCode?'+Math.floor(Math.random() * 100);
    }
  },
  created:function(){
    this.getCode();
  }
}
</script>

<style>
#login {
  height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#login .head {
}
#login .closeBtn {
  width: 20px;
  display: block;
  margin: 15px;
}
#login .resig {
  font-size: 17px;
  margin: 10px;
  color: #595757;
}
#login .logo {
  display: block;
  width: 150px;
  margin: 80px auto;
}
#login .fromBox {
  width: 90%;
  margin: 0 auto;
}
#login .weui-cells {
  background: url('../assets/inpBg.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
}
#login .vux-x-input-right-full img {
  width: 100px;
  height: 30px;
  margin-top: 6px;
  margin-right: 6px;
}
#login .forget {
  text-align: right;
  font-size: 13px;
  color: #595757;
}
#login .loginBtn {
  margin-top: 30px;
}


</style>
