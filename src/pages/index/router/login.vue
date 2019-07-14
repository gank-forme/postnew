<template>
  <div id="login" class='comon'>
    <x-header :left-options="{backText: ''}">信息提交</x-header>
    <div class="registBox">
      <div class="userBox">
        <input @blur='inputBlur' v-model='username' id="name" type="text" placeholder="请输入您的真实姓名" name="" value="">
        <input @blur='inputBlur' maxLength='11' v-model='usernum' id="number" type="text" placeholder="请输入您的真实电话" name="" value="">
        <input @focus='showPlugin' @blur='inputBlur' maxLength='18' v-model='usercard' id="idcard" type="text" placeholder="请输入您的身份证号" name="" value="">
        <input readonly id="loca" type="text" value="选择您所在的区域" name="" >
        <div class="pickBox">
          <picker :data='years' v-model='year3' @on-change='changeFun'></picker>
        </div>
        <p>请填写真实信息</p>
        <div class="subBtn" @click='goHome'>确认提交</div>
        <h5 @click='selFun' class="clearfix">
          <em  v-if='!sel' class=""></em>
          <img class="" width="15px" v-else src="../assets/seled.png" alt="">
          <span class="">我已阅读并同意中国邮政储蓄银行《银发客户摄影大赛》活动规则</span>
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
import { Datetime} from 'vux'
import { MessageBox,Toast,Indicator } from 'mint-ui'

let years = []


export default {
  components: {
    Datetime
  },
  name: 'app',
  data () {
    return {
      sel:false,
      value1: '2015-11-12',
      years: [years],
      year3: ['1'],
      usernum:'',
      username:'',
      usercard:''
    }
  },
  methods: {
    selFun (){
      this.sel =!this.sel;
    },
    showPlugin () {
      let that =this;
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: '2000-01-01',
        onConfirm (val) {
          that.usercard=val;
        },
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        }
      })
    },
    goHome(){
      console.log(this.year3[0]);
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'POST',
         url: '/api/customer/bind',
         // headers: { 'content-type': 'application/x-www-form-urlencoded' },
         data: {
           name:that.username,
           phone:that.usernum,
           openid:localStorage.openid1,
           area_id:that.year3[0],
           birthday:that.usercard,
           is_read:that.sel?1:0
         }
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
    changeFun (value) {
      console.log(value);
    },
    getList(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/area/list?openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {

         Indicator.close();
         if(res.data.code==1){
          for (var i = 0; i<res.data.data.list.length; i++) {
            years.push({
              name: res.data.data.list[i].name,
              value: res.data.data.list[i].id
            })
          }
          console.log(that.years);
        }else {
          Indicator.close();
          Toast({
            message: res.data.msg,
            duration: 1500
          });
        }
       })
    }
  },
  created:function(){
    this.getList();
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
  width: 8px;
  height: 9px;
  border: 1px solid #03764D;
  border-radius: 2px;
  margin-top: 0px;
  margin-right: 2px;
}
#login .userBox h5 span {
  font-size: 12px;
  width: 90%;

}
#login .userBox h5 img{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-top: -5px;
  margin-right: 0px;
}
</style>
