<template>
  <div id="login" class='comon'>
    <app-header></app-header>
    <div class="registBox">
      <h1><span class="fl" @click='close'><img src="../assets/close.png" alt=""></span>注册页面</h1>
      <div class="userBox">
        <img class="headImg" src="../assets/suc.png" alt="">
        <p>请您根据提示完善注册流程 </p>
        <input @blur='inputBlur' v-model='username' id="name" type="text" placeholder="请输入您的名称" name="" value="">
        <input @blur='inputBlur' v-model='usernum' id="number" type="text" placeholder="请输入您的电话" name="" value="">
        <div class="subBtn" @click='goHome'>确认提交</div>
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

export default {
  name: 'app',
  data () {
    return {
      usernum:'',
      username:''
    }
  },
  methods: {

    goHome(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'POST',
         url: '/api/userupdate',
         headers: { 'content-type': 'application/x-www-form-urlencoded' },
         data: qs.stringify({name:that.username,phone:that.usernum,openid:localStorage.openid1})
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){//无绑定
           that.$router.push({
             name:'home'
           })
         }else {
           Indicator.close();
           Toast({
             message: res.data.msg,
             duration: 1500
           });
          }
       })

    },
    close(){
      history.go(-1)
    },
    inputBlur(){
      window.scrollTo(0, 0)
    }
  },
  created:function(){
    sessionStorage.homeIndex=2;
  }
}
</script>

<style>
#login {
  height: 100%;
  clear: both;
  overflow: hidden;
}
#login .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;

  width: 96%;
  position: absolute;
  left: 50%;
  margin-left: -48%;
  top: 45px;
  bottom: 60px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: url('../assets/logBg.png') no-repeat center;
  background-size: 100% 100%;
}
#login .registBox h1 {
  background: #03764D;
  padding: 8px 10px;
  font-size: 13px;
}
#login .registBox h1 img {
  width: 12px;
}
#login .registBox span {
  font-size: 17px;
  margin-top: -5px;
}
#login .headImg {
  width: 40px;
  margin-top: 30px;
}
#login .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;

  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#login .userBox p{
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 40px;
}
#login .userBox input{
  font-size: 13px;
  width: 250px;
  height: 30px;
  color: #fff;
  text-indent: 30px;
  margin-bottom: 10px;
}
#login .userBox .subBtn{
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  width: 250px;
  height: 30px;
  background: #03764D;
  color: #fff;
  margin-top: 30px;
}
#login input {
  padding: 0;
}
#name {
  background:#03764D url('../assets/nav5.png') no-repeat 5px center;
  background-size: 18px;
  border-radius: 0;
}
#number {
  background:#03764D url('../assets/phone.png') no-repeat 5px center;
  background-size: 18px;
  border-radius: 0;
}
#login input::-webkit-input-placeholder {
    /* placeholder颜色  */
  color: #fff;
}
</style>
