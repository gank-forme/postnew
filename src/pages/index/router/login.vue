<template>
  <div id="login" class='comon'>
    <app-header></app-header>
    <div class="registBox">
      <h1><span class="fl">x</span>注册页面</h1>
      <div class="userBox">
        <img class="headImg" src="../assets/suc.png" alt="">
        <p>请您根据提示完善注册流程 </p>
        <input id="name" type="text" placeholder="请输入您的名称" name="" value="">
        <input id="number" type="text" placeholder="请输入您的电话" name="" value="">
        <div class="subBtn">确认提交</div>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  methods: {

  },
  created:function(){

  }
}
</script>

<style>
#login {
  height: 100%;
  clear: both;
  overflow: hidden;
}
.registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
#login .registBox h1 {
  background: #03764D;
  padding: 5px 10px;
}
#login .registBox span {
  font-size: 17px;
  margin-top: -5px;
}
.userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  padding-bottom: 200px;
  background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3);
  /* background: url("../assets/bgCen.png") no-repeat center; */

}
.headImg {
  width: 53px;
  height: 53px;
  border: 1px solid #fff;
  border-radius: 53px;
  margin-top: 40px;
}
.userBox p{
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 40px;
}
.userBox input{
  font-size: 13px;
  width: 250px;
  height: 30px;
  background: #03764D;
  color: #fff;
  text-indent: 30px;
  margin-bottom: 10px;
}
.userBox .subBtn{
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
#name {
  background:#03764D url('../assets/nav5.png') no-repeat 5px center;
  background-size: 18px;
}
#number {
  background:#03764D url('../assets/phone.png') no-repeat 5px center;
  background-size: 18px;
}
#login input::-webkit-input-placeholder {
    /* placeholder颜色  */
  color: #fff;
}
</style>
