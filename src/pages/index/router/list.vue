<template>

  <div class="list">
    <app-header></app-header>
    <div class="content relative">
      <search
      @on-change="getResult"

      v-model="value"
      position="absolute"
      auto-scroll-to-top
      ref="search"></search>
      <div class="listBox">
        <div v-for='i in listArr' :id='i.dream_id' class="listItem clearfix" @click='toInfo(i.user_id,i.icon)'>
          <img class="fl peo" :src="i.icon" alt="">
          <div class="fl itemInfo">
            <h1 class="clearfix">
              <span class="fl">{{i.name}}</span>
              <span class="fr"><img src="../assets/zan.png" alt="">{{i.hits}}</span>
            </h1>
            <h1 class="clearfix">
              <span class="fl"><img src="../assets/location.png" alt="">{{i.city}}</span>
              <span class="fr"><img src="../assets/nav4.png" alt="">{{i.rownum}}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
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
      list:sessionStorage.listCli,
      results:[],
      value: '',
      listArr:[

      ]
    }
  },
  created:function(){
    let that =this;
    Indicator.open('加载中');
    this.axios({
       method: 'get',
       url: '/api/list?page=1',
       //data: qs.stringify(data)
     }).then(function (res) {
       Indicator.close();
       if(res.data.code==1){
         that.listArr = res.data.data;
        }else {
          Indicator.close();
          Toast({
            message: res.data.msg,
            duration: 1500
          });
        }
     })
  },
  methods:{
    getResult (val) {
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/search?keyword='+that.value,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.listArr = res.data.data;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
      // console.log('on-change', val)
      // this.results = val ? getResult(this.value) : []
    },
    toInfo(m,n){
      let that =this;
      Indicator.open('加载中');
      sessionStorage.userImg=n;
      this.axios({
         method: 'get',
         url: '/api/getdreambyuser?user_id='+m,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           store.commit('infoFun2',res.data.data);
           that.$router.push({
             name:'info'
           })
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

}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style>
.weui-search-bar__cancel-btn {
  display: none !important;
}
.list {
  background: linear-gradient(to bottom right, #C5E8D5 10%,#eee 30%,  #B1E0C6);
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
.weui-search-bar__form,.weui-search-bar__box,.weui-search-bar__label {
  background: #03764D !important;
  color: #fff !important;
}
.weui-search-bar__box .weui-search-bar__input {
  color: #fff !important;
}
.weui-search-bar__label {
  height: 23px;
}
.weui-search-bar {
  background: none !important;
}
.vux-search-box {
  position: fixed !important;
  z-index: 100;
  left: 0px;
  top:40px;
  background: linear-gradient(to bottom right, #C5E8D5 10%,#eee 30%,  #B1E0C6);
}
.vux-search-fixed {
  top: 40px !important;
}
.list .weui-search-bar__box .weui-icon-search{
  top: 1px;
}
.list .listBox {
  width: 96%;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
}
.list .listItem {
  background: linear-gradient( to right,#A2D3B9 10%,#339864 30%, #339864);
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}
.list .listItem .peo {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border:1px solid #fff;
  margin-right: 10px;
}
.list .listItem .itemInfo {
  width: 80%;
}
.list .listItem .itemInfo span {
  min-width: 50px;
  text-align: left;
  font-size: 13px;
}
.list .listItem .itemInfo span img{
  width: 10px;
  margin-right: 5px;
}
.list .content {
  width: 94%;
  position: absolute;
  left: 50%;
  margin-left: -47%;
  top: 40px;
  bottom: 65px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3);
}
</style>
