<template>
  <div id="mine">
    <x-header :left-options="{backText: ''}">我的兑换</x-header>
    <tab :line-width='0' default-color='#81c2ac' active-color='#fff'>
      <tab-item selected @on-item-click="onItemClick">全部兑换</tab-item>
      <tab-item @on-item-click="onItemClick">未使用</tab-item>
      <tab-item @on-item-click="onItemClick">已使用/过期</tab-item>
    </tab>
    <div class="content">

      <div v-for='(i,index) in dataList' :key='index' class="maybe clearfix">
        <img class="fl" :src="i.icon" alt="">
        <h1>{{i.title}}</h1>
        <h2>
          市场价 <span>￥<em>{{i.price}}</em></span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import {Tab, TabItem} from 'vux'
import { MessageBox,Toast,Indicator } from 'mint-ui'
export default {
  components: {
    Tab,
    TabItem
  },
  name: 'app',
  data () {
    return {
      page:1,
      dataList:[]
    }
  },
  methods: {
    onItemClick (index) {
      let ind = {
        0:3,
        1:2,
        2:1
      }
      this.myFun(ind[index]);
    },
    myFun(e){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/myExchangeList?token='+sessionStorage.token+'&page='+that.page+'&type='+e,
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           //that.dataList=that.dataList.concat(res.data.data);
           that.dataList=res.data.data;
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
    this.myFun(3);
  }
}
</script>

<style>
#mine {
  min-height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#mine .content {
  width: 90%;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 20px;
}
#mine .maybe {
  text-align: center;
  font-size: 12px;
  color: #666;
  background: url('../assets/maybe.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px 10px 20px 10px;
}
#mine .maySpan {
  background: #609a7b;
  color: #fff;
  font-size: 13px;
  padding: 2px 40px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
  border-radius: 30px;
}
#mine .maybe img.fl {
  display: block;
  width: 80px;
  height: 80px;
  background: #ddd;
  border-radius: 5px;
  margin-right: 10px;
}
#mine .maybe h1 {
  text-align: left;
  color: #595757;
  font-size: 14px;
}
#mine .maybe h2 {
  text-align: left;
  color: #595757;
  font-size: 12px;
  margin-top: 10px;
}
#mine .maybe h2 span{
  color: #39815b;
}
#mine .maybe h2 span em{
  font-size: 18px;
}
#mine .maybe h2 img{
  float: right;
  width: 90px;
  margin-top: 0px;
}
#mine .vux-tab-wrap {
  position: fixed;
  top: 45px;
  width: 100%;
}
#mine .vux-tab {
  background: #038458;
}
#mine .vux-tab-item:nth-child(2){
  border-left: 1px solid #81c2ac !important;
  border-right: 1px solid #81c2ac !important;
}
#mine .vux-tab .vux-tab-item {
  height: 20px;
  line-height: 20px;
  margin-top: 13px;
  border: none;
  background: none;
}
</style>
