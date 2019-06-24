<template>

  <div :class="list==1?'list':'rank'">
    <app-header></app-header>
    <div v-if='searchFlag' class="clearfix navBox">
      <div @click='getList(1)' :class="act1">
        总排行
      </div>
      <div @click='getList(2)' :class="act2">
        我的点赞
      </div>
    </div>
    <search
    @on-change="getResult"
    @on-focus='focusFun'
    @on-blur='blurFun'
    v-model="value"
    position="absolute"
    auto-scroll-to-top
    ref="search"></search>
    <div v-if='list==1' class="content relative">

      <div :class="searchFlag?'listBox':'listBox sea'">
        <div v-for='i in listArr' :id='i.dream_id' class="listItem clearfix" @click='toInfo(i.dream_id,i.icon)'>
          <img class="fl peo" :src="i.icon" alt="">
          <div class="fl itemInfo">
            <h1 class="clearfix">
              <span class="fl">{{i.name}}</span>
              <span class="fr"><img src="../assets/zan.png" alt="">{{i.hits}}</span>
            </h1>
            <h1 class="clearfix">
              <span class="fl"><img src="../assets/location.png" alt="">{{i.city}}</span>
              <span class="fr"><img src="../assets/nav4.png" alt="">{{i.rank}}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="content relative">

      <div :class="searchFlag?'listBox':'listBox sea'">

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
      searchFlag:true,
      toZan:sessionStorage.toZan,
      has_next_page:'',
      ind:1,
      ind1:1,
      act2:'fr',
      act1:'fl act',
      list:2,
      results:[],
      value: '',
      listArr:[]
    }
  },
  created:function(){
    sessionStorage.homeIndex=2;
    if(this.toZan==1){
      this.act2 ='fr act';
      this.act1 ='fl';
      this.myZan();
      this.list=1;
    }else{
      this.act1 ='fl act';
      this.act2 ='fr';
      this.page();
      this.list=2;
    }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll,true);
  },
  methods:{
    focusFun(){
      this.searchFlag=false;
      this.list=1;
      // this.listArr=[];
    },
    blurFun(){
      this.searchFlag=true;
      this.list=2;
    },
    handleScroll(e){
      let that =this;
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = e.target.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = e.target.clientHeight;
        //变量scrollHeight是滚动条的总高度
   		var scrollHeight = e.target.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
            //写后台加载数据的函数
            if((location.hash.indexOf('rank')<0)){
              // alert(1);
            }else{
              if(that.has_next_page==1){
                if(that.list==2){
                  that.ind++;
                  that.page();
                }else{
                  that.ind1++;
                  that.myZan();
                }
              }
            };

        }
    },
    myZan(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/myhitslist?page='+that.ind1+'&openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           if(that.ind1==1){
             that.listArr=res.data.data;
           }else{
             that.listArr =that.listArr.concat(res.data.data);
           }
           that.has_next_page =res.data.has_next_page;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    page(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/list?page='+that.ind+'&openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           if(that.ind==1){
             that.listArr=res.data.data;
           }else{
             that.listArr =that.listArr.concat(res.data.data);
           }
           that.has_next_page =res.data.has_next_page;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    getList(e){
      this.ind=1,this.ind1=1;

      if(e==1){
        this.act1 ='fl act';
        this.act2 ='fr';
        this.page();
        this.list=2;
      }else {
        this.act2 ='fr act';
        this.act1 ='fl';
        this.myZan();
        this.list=1;
      }
    },
    getResult (val) {
      if(val==''){
        this.page();
      }else{
        let that =this;
        Indicator.open('加载中');
        this.axios({
           method: 'get',
           url: '/api/search?keyword='+that.value+'&openid='+localStorage.openid1+'&page='+that.ind
           //data: qs.stringify(data)
         }).then(function (res) {
           Indicator.close();
           if(res.data.code==1){
             that.list=1;
             that.listArr = res.data.data;
            }else {
              Indicator.close();
              Toast({
                message: res.data.msg,
                duration: 1500
              });
              that.listArr=[];
            }
         })
      }

      // console.log('on-change', val)
      // this.results = val ? getResult(this.value) : []
    },
    toInfo(m,n){
      let that =this;
      console.log(this.value);
      //Indicator.open('加载中');
      sessionStorage.userImg=n;
      sessionStorage.isIndex=1;
      this.axios({
         method: 'get',
         url: '/api/getdreambyid?openid='+localStorage.openid1+'&dream_id='+m,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           store.commit('infoFun2',res.data.data);
           sessionStorage.userImg=n;
           that.$router.push({
             name:'info'
           });
           sessionStorage.dream_id=m;
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
  /* background: linear-gradient(to bottom right, #C5E8D5 10%,#eee 30%,  #B1E0C6); */
  background: #bee3cf;
}
.vux-search-fixed {
  background: #bee3cf !important;
  top: 40px !important;
}
.list .weui-search-bar__box .weui-icon-search{
  top: 1px;
}
.list .listBox {
  width: 96%;
  margin: 0 auto;
  padding-top: 90px;
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
  padding-top: 90px;
  clear: both;
  overflow: hidden;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
  /* background: #e9f7f0; */
}
.rank .listBox.sea,.list .listBox.sea{
  padding-top: 50px !important;
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
  color: #339864;
  font-size: 13px;
}
.rank .top {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
}
.navBox {
  position: fixed;
  top: 43px;
  width: 94%;
  padding: 0 3%;
  left: 0px;
  z-index: 100;
  margin-top: 39px;
  background: #bee3cf;
}
.navBox div{
  width: 49.5%;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  color: #339864;
  background: #abdac2;
}
.navBox div.act {
  background: #339864;
  color: #fff;
  pointer-events: none;
}
.navBox div.fl {
  border-top-right-radius: 10px;
}
.navBox div.fr {
  border-top-left-radius: 10px;

}
</style>
