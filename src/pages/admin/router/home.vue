<template>
  <div id="admin">
    <mt-header >
      <mt-button slot="left" @click='outFun'><img id="mine_btn" src="../assets/mine_btn.png" width='15px' alt="">我的</mt-button>
      <mt-button slot="right" @click='listFun'>我的核查记录</mt-button>
    </mt-header>
    <div class="tis">
      <span>待核查申报列表</span>
    </div>
    <ul v-if='notVerifyList.length>0' class="list" >
      <li v-for='i in notVerifyList' key='i' :data-id='i.declareId' @click='infoFun(i.declareId)'>
        <h1><span>申报编号：</span>{{i.declaration}}</h1>
        <p><span>申报时间：</span>{{i.declareTime}}</p>
        <p><span>房间地址：</span>{{i.houseAddress}}</p>
      </li>
    </ul>
    <div v-else class="blank">
      <img src="../assets/blank.png" alt="">
      <p>暂无核查记录</p>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import store from '../store.js'

export default {
  name: 'app',
  data () {
    return {
      notVerifyList:[],
      blank:false
    }
  },
  created:function(){
    let that =this;
    Indicator.open('加载中');
    this.axios({
       method: 'get',
       url: '/foreignersDwell/checkDeclare/h5/getNotVerifyList?lgyUserName='+sessionStorage.userName,
     }).then(function (res) {
       Indicator.close();
       if(res.data.error==0){
         that.notVerifyList=res.data.data.notVerifyList;
       }else {
         Toast({
           message: res.data.message,
           position: 'bottom',
           duration: 1500
         });
       }
     })
  },
  methods:{
    outFun:function(){
      this.$router.push({
        name:"main"
        // path:'/home'
      })
    },
    listFun:function(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/foreignersDwell/checkDeclare/h5/getRecheckList?lgyUserName='+sessionStorage.userName,
       }).then(function (res) {
         Indicator.close();
         if(res.data.error==0){
           store.commit('listFun',res.data.data.checkList);
           that.$router.push({
             name:"list"
             // path:'/home'
           });
         }else {
           Toast({
             message: res.data.message,
             position: 'bottom',
             duration: 1500
           });
         }
       })

    },
    infoFun(e){
      sessionStorage.declareId=e;
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/foreignersDwell/checkDeclare/h5/getDeclareDetail?declareId='+e
       }).then(function (res) {
         Indicator.close();
         if(res.data.error==0){
           store.commit('infoFun',res.data.data.declareDetail);
           that.$router.push({
             name:'info'
           })
         }else {
           Toast({
             message: res.data.message,
             position: 'bottom',
             duration: 1500
           });
         }
       })
    },
  }
}
</script>

<style>
#admin .mint-header {
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.04);
  color: #333;
  font-size: 14px;
}
#admin .tis {
  border-top: 1px solid #ccc;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
  margin-bottom: 20px;
}
#admin .tis span{
  display: block;
  padding: 5px;
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: -18px;
  background: #f2f3f5;
  position: absolute;
  width: 120px;
  left: 50%;
  text-align: center;
  margin-left: -60px;
}
#admin .list li {
  padding: 10px;
  background: #fff;
  margin-top: 10px;
  font-size: 14px;
  color: #151515;
}
#admin .list li h1 {
  clear: both;
  font-size: 14px;
  overflow:hidden;
}
#admin .list li span {
  color: #999;
}
#admin .list li p {
  margin-top: 5px;
}
#admin #mine_btn {
  margin-right: 5px;
}
.blank {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 100px;
}

</style>
