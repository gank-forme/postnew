<template>
  <div id="forget">
    <x-header :left-options="{backText: ''}">忘记密码</x-header>
    <div class="fromBox">
      <p class="tips">请选择您的找回形式</p>
      <group>
        <cell title="通过短信验证码找回" is-link>
           <img slot="icon" style="margin-right:20px;margin-top:-5px;" src="../assets/msg.png" height="20px;" alt="">
         </cell>
       </group>
       <group>
         <cell title="通过身份证号找回" is-link>
            <img slot="icon" style="margin-right:20px;margin-top:-5px;" src="../assets/card.png" height="20px;" alt="">
          </cell>
      </group>
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

  },
  created:function(){

  }
}
</script>

<style>
#forget {
  height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#forget .head {
}
#forget .closeBtn {
  width: 20px;
  display: block;
  margin: 15px;
}
#forget .resig {
  font-size: 17px;
  margin: 10px;
  color: #595757;
}
#forget .logo {
  display: block;
  width: 150px;
  margin: 80px auto;
}
#forget .fromBox {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
#forget .weui-cells {
  background: url('../assets/inpBg.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  color: #595757;
}
#forget .vux-x-input-right-full img {
  width: 100px;
  height: 30px;
  margin-top: 6px;
  margin-right: 6px;
}
#forget .forget {
  text-align: right;
  font-size: 13px;
  color: #595757;
}
#forget .loginBtn {
  margin-top: 30px;
}
#forget .vux-header {
  background: #029161;
}
#forget .tips {
  font-size: 13px;
  color: #028458;
  text-align: center;
  margin-bottom: 10px;
}




</style>
