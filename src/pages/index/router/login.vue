<template>
  <div id="login" class='comon'>
    <x-header :left-options="{backText: ''}"></x-header>
    <div class="registBox">
      <div class="userBox">
        <input @blur='inputBlur' v-model='username' id="name" type="text" placeholder="请输入您的真实姓名" name="" value="">
        <input @blur='inputBlur' v-model='usernum' id="number" type="text" placeholder="请输入您的真实电话" name="" value="">
        <input @blur='inputBlur' v-model='usercard' id="idcard" type="text" placeholder="请输入您的身份证号" name="" value="">
        <input readonly id="loca" type="text" value="选择您所在的区域" name="" >
        <div class="pickBox">
          <picker :data='years' v-model='year3' @on-change='change'></picker>
        </div>
        <p>请填写真实信息</p>
        <div class="subBtn" @click='goHome'>确认提交</div>
        <h5 class="clearfix">
          <em class="fl"></em>
          <span class="fl">我已阅读并同意中国邮政储蓄银行《银发客户摄影大赛》活动规则</span>
        </h5>
      </div>
    </div>

    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'

let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}

export default {
  name: 'app',
  data () {
    return {
      years: [years],
      year3: ['2005'],
      usernum:'',
      username:'',
      usercard:''
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
    },
    change (value) {
      console.log('new Value', value)
    },
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
  background: #fff;
  width: 98%;
  margin: 0 auto;
  margin-top: 60px;
  border-radius: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
}
#login .userBox input{
  font-size: 15px;
  width: 250px;
  height: 30px;
  color: #3E3A39;
  text-indent: 35px;
  margin-bottom: 10px;
  border-bottom: 1px solid #03764D;
}
#login .userBox .subBtn{
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  width: 115px;
  height: 30px;
  background: #349C79;
  color: #fff;
  margin-bottom: 20px;
  border-radius: 30px;
}
#login input {
  padding: 0;
}
#name {
  background: url('../assets/inp1.png') no-repeat 5px center;
  background-size: 18px;
  border-radius: 0;
  margin-top: 50px;
}
#number {
  background: url('../assets/inp2.png') no-repeat 5px center;
  background-size: 18px;
  border-radius: 0;
}
#idcard {
  background: url('../assets/inp3.png') no-repeat 5px center;
  background-size: 18px;
  border-radius: 0;
}
#loca {
  background: url('../assets/inp4.png') no-repeat 5px center;
  background-size: 18px;
  border-radius: 0;
  border:none !important;
}
#login input::-webkit-input-placeholder {
    /* placeholder颜色  */
  color: #3E3A39;
}
.pickBox {
  width: 230px;
  margin: 0 auto;
  border-bottom: 1px solid #03764D;
}

#login .userBox h5 {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}
#login .userBox h5 em {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #03764D;
  border-radius: 2px;
  margin-top: -3px;
  margin-right: 5px;
}
#login .userBox h5 span {
  font-size: 12px;
  width: 90%;

}
</style>
