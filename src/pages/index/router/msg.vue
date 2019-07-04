<template>
  <div id="msg">
    <x-header :left-options="{backText: ''}">收货地址填写</x-header>
    <div class="fromBox">
      <group>
         <x-input type="text" placeholder="请输入您的账号" v-model="username" >
           <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/user.png" height="20px;" alt="">
         </x-input>
       </group>
       <group>
          <x-input type="text" placeholder="请输入您的手机号" v-model="phone" >
            <img slot="label" style="margin-right:20px;margin-top:-5px;" src="../assets/phone.png" height="20px;" alt="">
          </x-input>
        </group>
        <group>
           <x-input type="text" placeholder="请输入您的身份证件号码" v-model="card" >
             <img slot="label" style="margin-right:10px;margin-top:-5px;" src="../assets/card.png" height="20px;" alt="">
           </x-input>
         </group>
       <group >
          <img class="tit" style="margin:10px 10px 10px 20px;" src="../assets/loc.png" height="20px;" alt="">

            <span style="color:#b8b7b7">请输入您的详细收获地址</span>
            <x-textarea :max="80" placeholder="" v-model='address' @on-focus="onEvent('focus')" @on-blur="onEvent('blur')">

            </x-textarea>

        </group>

      <img class="loginBtn" @click='msgFun' src="../assets/sub.png" alt="">
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import { XInput, Group, XButton, Cell ,XTextarea} from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    XTextarea
  },
  name: 'app',
  data () {
    return {
      phone:'',
      username:'',
      card:'',
      address:''
    }
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    msgFun(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/api/recive_address',
         data:{
           id:sessionStorage.msgId,
           exchange_code:sessionStorage.exchange_code,
           name:that.username,
           phone:that.phone,
           id_card:that.card,
           address:that.address,
           token:sessionStorage.token
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           history.go(-1);
         }else {
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    },
  },
  created:function(){

  }
}
</script>

<style>
#msg {
  height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#msg .head {
}
#msg .closeBtn {
  width: 20px;
  display: block;
  margin: 15px;
}
#msg .resig {
  font-size: 17px;
  margin: 10px;
  color: #595757;
}
#msg .logo {
  display: block;
  width: 150px;
  margin: 80px auto;
}
#msg .fromBox {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
#msg .weui-cells {
  background: url('../assets/inpBg.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
}
#msg .vux-x-input-right-full img {
  width: 100px;
  height: 30px;
  margin-top: 6px;
  margin-right: 6px;
}
#msg .forget {
  text-align: right;
  font-size: 13px;
  color: #595757;
}
#msg .loginBtn {
  margin-top: 30px;
}
#msg .vux-header {
  background: #029161;
}



</style>
