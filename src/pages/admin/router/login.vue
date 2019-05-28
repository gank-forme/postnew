<template>
  <div id="login">
    <img class="logo" src="../assets/logo.png">
    <p class="logo_text">涉外通</p>
    <!-- <router-view/> -->
    <div class="formBox">
      <mt-field  @blur.native.capture="htmlScroll" v-model='userName'  placeholder="请输入账号" :attr="{ maxlength: 11 }" type="tel"></mt-field>
      <mt-field  @blur.native.capture="htmlScroll"  v-model='password' placeholder="请输入密码" type='password' ></mt-field>
      <mt-button :class="userName.length>0&&password.length>0?'':'opa'" type="primary" id='login_btn' size="large" @click.native='tohome'>登录</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import store from '../store.js'

export default {
  name: 'app',
  data(){
    return{
      userName:'',
      password:''
    }
  },
  methods:{
    htmlScroll(){
      this.timer = setTimeout(() => {
        window.scrollTo(0,0)
        // 间隔设为10，减少页面失去焦点定时器的突兀感，
      },10)
    },
    tohome(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/foreignersDwell/log/in',
         data: {
           'userName':that.userName,
           "password":that.password
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.error==0){
           sessionStorage.userName = that.userName;
           sessionStorage.name =res.data.data;
           location.replace('#/home');
           // that.$router.push({
           //   name:"home"
           //   // path:'/home'
           // });

         }else {
           Toast({
             message: res.data.message,
             position: 'bottom',
             duration: 1500
           });
         }
       })

    }
  }
}
</script>

<style>
#login {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background: #fff;
  text-align: center;
  color: #2c3e50;
}
#login .logo {
  width: 80px;
  display: block;
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom: 10px;
  border-radius: 5px;
}
#login .logo_text {
  font-size: 20px;
  color: #666;
  font-weight: 800;
}
#login .formBox {
  width: 85%;
  margin: 0 auto;
  margin-top: 20px;
}

#login .getCode {
  border-left: 1px solid #ddd;
  display:inline-block;
  padding-left: 10px
}
#login_btn {
  margin-top: 20px;
  background: #326de0;
}
#login_btn.opa {
  opacity: 0.5;
  pointer-events: none;
}
</style>
