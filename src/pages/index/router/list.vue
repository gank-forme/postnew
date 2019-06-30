<template>
  <div id="list">
    <x-header :left-options="{backText: ''}">商品名</x-header>
    <div class="searchBox">
      <input type="text" name="" value="">
    </div>
    <div class="content">
      <div class="maybe clearfix" >
        <p>您可能在找</p>
        <span class="maySpan" v-for ='(i,index) in spanList' :key='index'>{{i}}</span>
      </div>
      <div @click='toInfo' v-for='(i,index) in 10' :key='index' class="maybe clearfix">
        <img class="fl" src="" alt="">
        <h1>小米电视4A标准版 英寸L65M5-AZ超大彩屏，家庭独享</h1>
        <h2>
          市场价 <span>￥<em>3212</em></span>
          <img src="../assets/dui.png" alt="">
        </h2>
      </div>
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
      spanList:['收到','尔尔而','水电费健康','水电费','收到','尔尔而','水电费健康','水电费']
    }
  },
  methods: {
    toInfo(){
      this.$router.push({
        name:'info'
      })
    }
  },
  created:function(){

  }
}
</script>

<style>
#list {
  min-height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#list .content {
  width: 90%;
  margin: 0 auto;
  padding-top: 90px;
  padding-bottom: 20px;
}
#list .searchBox {
  background: #39815b;
  padding: 5px 0;
  text-align: center;
  position: fixed;
  width: 100%;
  top: 45px;
}
#list .searchBox input {
  width: 90%;
  background: #fff url('../assets/search.png') no-repeat 10px;
  background-size: 15px;
  border-radius: 30px;
  font-size: 14p;
  margin: 0 auto;
  padding: 5px 0;
  text-indent: 30px;
  color: #39815b;
}
#list .maybe {
  text-align: center;
  font-size: 12px;
  color: #666;
  background: url('../assets/maybe.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px 10px 20px 10px;
}
#list .maySpan {
  background: #609a7b;
  color: #fff;
  font-size: 13px;
  padding: 2px 40px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
  border-radius: 30px;
}
#list .maybe img.fl {
  display: block;
  width: 80px;
  height: 80px;
  background: #ddd;
  border-radius: 5px;
  margin-right: 10px;
}
#list .maybe h1 {
  text-align: left;
  color: #595757;
  font-size: 14px;
}
#list .maybe h2 {
  text-align: left;
  color: #595757;
  font-size: 12px;
  margin-top: 10px;
}
#list .maybe h2 span{
  color: #39815b;
}
#list .maybe h2 span em{
  font-size: 18px;
}
#list .maybe h2 img{
  float: right;
  width: 90px;
  margin-top: 0px;
}
</style>
