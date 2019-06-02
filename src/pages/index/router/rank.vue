<template>

  <div :class="list==1?'list':'rank'">
    <app-header></app-header>
    <div v-if='list==1' class="content relative">
      <search
      @on-change="getResult"

      v-model="value"
      position="absolute"
      auto-scroll-to-top
      ref="search"></search>
      <div class="listBox">
        <div v-for='i in listArr' :id='i.dream_id' class="listItem clearfix" @click='toInfo(i.dream_id,i.icon)'>
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
    <div v-else class="content relative">
      <search
      @on-change="getResult"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      ref="search"></search>
      <div class="listBox">
        <div v-for='(i,index) in listArr' :id='i.dream_id' class="listItem clearfix" @click='toInfo(i.dream_id,i.icon)'>
          <em class="index fl">{{index<9?'0':''}}{{index+1}}</em>
          <img class="fl peo" :src="i.icon" alt="">
          <div class="fl itemInfo">
            <h1 class="clearfix">
              <span class="fl">{{i.name}}</span>
              <span class="fr"><img src="../assets/zan.png" alt="">{{i.hits}}</span>
            </h1>
          </div>
          <img v-if='index<3' class="top" src="../assets/top.png" alt="">
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
      list:2,
      results:[],
      value: '',
      listArr:[
        {
    			"dream_id": 11,
    			"hits": 85,
    			"rownum": "1",
    			"name": "hellouu4",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
    		},
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        },
  			{
    			"dream_id": 10,
    			"hits": 35,
    			"rownum": "2",
    			"name": "hellouu3",
    			"city": "shanghai",
    			"icon": "https://icon.pngfans.com//h/bg/53071822.jpg"
        }
      ]
    }
  },
  created:function(){
    console.log(sessionStorage.listCli);
    let that =this;
    // this.axios({
    //    method: 'get',
    //    url: '/api/list?page=10',
    //    //data: qs.stringify(data)
    //  }).then(function (res) {
    //    Indicator.close();
    //    if(res.data.code==1){
    //      that.listArr = res.data.data;
    //     }else {
    //       Indicator.close();
    //       Toast({
    //         message: res.data.msg,
    //         duration: 1500
    //       });
    //     }
    //  })
  },
  methods:{
    getResult (val) {
      let that =this;
      console.log(this.value);
      // Indicator.open('加载中');
      // this.axios({
      //    method: 'get',
      //    url: '/api/search?keyword='+that.value,
      //    //data: qs.stringify(data)
      //  }).then(function (res) {
      //    Indicator.close();
      //    if(res.data.code==1){
      //      that.listArr = res.data.data;
      //     }else {
      //       Indicator.close();
      //       Toast({
      //         message: res.data.msg,
      //         duration: 1500
      //       });
      //     }
      //  })
      // console.log('on-change', val)
      // this.results = val ? getResult(this.value) : []
    },
    toInfo(m,n){
      let that =this;
      console.log(this.value);
      //Indicator.open('加载中');
      sessionStorage.userImg=n;
      that.$router.push({
        name:'info'
      })
      // this.axios({
      //    method: 'get',
      //    url: '/api/getdreambyuser?user_id='+m,
      //    //data: qs.stringify(data)
      //  }).then(function (res) {
      //    Indicator.close();
      //    if(res.data.code==1){
      //      store.commit('infoData',res.data.data);
      //      sessionStorage.userImg=n;
      //      that.$router.push({
      //        name:'info'
      //      })
      //     }else {
      //       Indicator.close();
      //       Toast({
      //         message: res.data.msg,
      //         duration: 1500
      //       });
      //     }
      //  })
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
.list .content,.rank .content {
  width: 94%;
  position: absolute;
  left: 50%;
  margin-left: -47%;
  top: 40px;
  bottom: 65px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.rank,.list {
  background: linear-gradient(to bottom right, #C5E8D5 10%,#eee 30%,  #B1E0C6);
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
.rank .weui-search-bar__box .weui-icon-search{
  top: 1px;
}
.rank .listBox {
  width: 97%;
  margin: 0 auto;
  padding: 3% 3% 3% 0;
  padding-top: 60px;
  padding-bottom: 60px;
  clear: both;
  overflow: hidden;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
  background: #03764D;
}
.rank .listItem {
  background: url('../assets/listBg1.png') no-repeat center;
  background-size: 100% 100%;
  /* background: linear-gradient( to right,#A2D3B9 10%,#339864 30%, #339864); */
  color: #fff;
  width: 84%;
  float: right;
  padding: 10px 3%;
  margin-bottom: 10px;
  position: relative;
}
.rank .listItem .peo {
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border:1px solid #fff;
  margin-right: 10px;
  margin-left: 10px;
}
.rank .listItem .itemInfo {
  width: 77%;
  margin-top: 6px;
}
.rank .listItem .itemInfo span {
  min-width: 50px;
  text-align: left;
  font-size: 13px;
}
.rank .listItem .itemInfo span img{
  width: 10px;
  margin-right: 5px;
  margin-top: -3px;
}
.rank .index {
  position: absolute;
  left: -10%;
  top: 0px;
  width: 10%;
  text-align: center;
  color: #fff;
  font-size: 13px;
}
.rank .top {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
}
</style>
