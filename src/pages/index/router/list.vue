<template>
  <div id="list">
    <x-header :left-options="{backText: ''}">商品名</x-header>
    <div class="searchBox">
      <input type="text" name="" @input='searchFun1'>
    </div>
    <div class="content">
      <div class="maybe clearfix" >
        <p>您可能在找</p>
        <span :class="actIndex==index?'maySpan act':'maySpan'" v-for ='(i,index) in spanList' :key='index' @click='searchFun(i.title,index)'>{{i.title}}</span>
      </div>
      <div  v-for='(i,index) in dataList' :key='index' @click='toInfo(i.id)' class="maybe clearfix">
        <img class="fl" :src="i.icon" alt="">
        <h1>{{i.title}}</h1>
        <h2>
          市场价 <span>￥<em>{{i.price}}</em></span>
          <img src="../assets/dui.png" @click='toCon' alt="">
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
      page:1,
      has_next_page:0,
      actIndex:-1,
      spanList:[],
      dataList:[]
    }
  },
  mounted(){
    let that =this;
    window.onscroll = function(){
   		//变量scrollTop是滚动条滚动时，距离顶部的距离
     		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
     		//变量windowHeight是可视区的高度
     		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
     		//变量scrollHeight是滚动条的总高度
     		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                 //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
                  //写后台加载数据的函数
         
        }   
     }
  },
  methods: {
    toCon(){
      this.$router.push({
        name:'convert'
      })
    },
    toInfo(e){
      sessionStorage.infoId = e;
      this.$router.push({
        name:'info'
      })
    },
    getList1(){
      let that =this;
      //Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/subcatList?token='+sessionStorage.token+'&fid='+sessionStorage.listId,
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.spanList=res.data.data;
         }else {
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
           that.spanList=[];
         }
       })
    },
    getList(){
      let that =this;
      //Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/goodsList?token='+sessionStorage.token+'&cat='+sessionStorage.title+'&page='+that.page,
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           //that.dataList = that.dataList.concat(res.data.data);   
           that.dataList=res.data.data;
         }else {
           Toast({
             message: res.data.msg,
             position: 'bottom',
             duration: 1500
           });
           that.dataList=[];
         }
       })
    },
    searchFun1(e){
      let that =this;
      //Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/search?token='+sessionStorage.token+'&keyword='+e.data+'&page='+that.page,
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
           that.dataList=[];
         }
       })
    },
    searchFun(e,i){
      this.actIndex = i;
      let that =this;
      //Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/search?token='+sessionStorage.token+'&keyword='+e+'&page='+that.page,
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
           that.dataList=[];
         }
       })
    }
  },
  created:function(){
    this.getList1();
    this.getList();

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
  z-index: 10;
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
  opacity: 0.7;
  background: #609a7b;
  color: #fff;
  font-size: 13px;
  padding: 2px 40px;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
  border-radius: 30px;
}
#list .maySpan.act {
  opacity: 1;
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
