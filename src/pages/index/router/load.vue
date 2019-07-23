<template>
  <div id="load" :class="loadIndex==2?'':''">
    <app-header v-if='loadIndex==2'></app-header>
    <div class="load " v-if='loadIndex==0'>
      <img class="logo" src="../assets/logo.png" alt="">
      <img class="cen" src="../assets/image/cen.png" alt="">
      <p class="progress">Loading {{num}}%</p>
      <h2>邮储银行首届<br>金晖杯老年摄影大赛</h2>
    </div>

    <div class="swiperDiv" v-if='loadIndex==1'>
      <mt-swipe :auto="4000" @change="swiperFun2">
        <mt-swipe-item v-for='(i,index) in demo01_list' :key ='index'><img :src="i.img" alt="" >  </mt-swipe-item>
      </mt-swipe>
      <!-- <swiper @click.native='swiFun(index)' :auto='false' v-model='index' @on-index-change='swiperFun' :loop='false' :list="demo01_list" height='100%' :show-desc-mask='false' dots-position='center'></swiper> -->
    </div>
    <div :class="homeList.length>0?'listIndex com':'listIndex'" v-if='loadIndex==2'>
      <div class="swi">
        <swiper @click.native='toCon(index)' :auto='false' v-model='index'  :loop='false' :list="listIndex" height='100%' :show-desc-mask='false' dots-position='center'></swiper>
        <span class="upload" @click='liCli'>上传照片</span>
      </div>
      <!-- <vue-waterfall-easy :imgsArr="imgAr" @scrollReachBottom="getData"></vue-waterfall-easy> -->
      <ul class="clearfix" style="column-count: 2;"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      >
        <li style="break-inside: avoid;" class="liItem relative" v-for='(i,index) in homeList' >
          <div v-if='ind==index' class="abs">
            +1
          </div>
          <img @click='detailFun(i.id)' class="photo" :src="'http://photo.marketservice.cn'+i.img" alt="">
          <em v-if='index<3' class="absolute">热门</em>
          <div class="op absolute"></div>
          <p>
            <span class="scaName">{{i.authorname}}</span>
            <span class="sca">当前票数 <em>{{i.vote}}</em></span>
            <span class='vote' @click="votCli(i.id,i,i.vote,index)">投TA一票</span>
          </p>
        </li>
        <h3 v-if='nomore' class='nomore'>没有更多数据啦~</h3>
      </ul>

    </div>

    <mt-popup
      v-model="popupVisible"
      position="center">
      <div class="alerCon">
        <img src="../assets/alert.png" alt="">
        <span @click='sub1Fun'><img src="../assets/sub1.png" alt=""></span>
      </div>
    </mt-popup>


    <app-footer v-if='loadIndex==2'></app-footer>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import store from '../store.js'
import qs from 'qs'
import axios from 'axios'
import { MessageBox,Toast,Indicator} from 'mint-ui'
import banner1 from '../assets/1.jpg'
import banner2 from '../assets/2.jpg'
import banner3 from '../assets/3.jpg'
import list1 from '../assets/banTest.png'
import list2 from '../assets/banTest1.png'

export default {
  name: 'app',
  components: {
    vueWaterfallEasy
  },
  data () {
    return {
      imgsArr:[],
      imgAr:[],
      ind:-1,
      isMoreLoad: true,  // 是否显示加载更多
      loadingImg: false,  // 加载更多时显示loading图
      loadLastText: false, // 到底了
      definePageNum: 1,// 默认加载页数
      definePafeSize: 10, // 默认每页数量
      totals: null, // 用来存放总数量

      nomore:false,

      page:1,
      pages:'',
      homeList:[],
      appId:'',
      loadIndex:0,
      index:0,
      num:0,
      popupVisible:false,
      demo01_list:[{
          url: 'javascript:',
          img: banner1,
        }, {
          url: 'javascript:',
          img: banner2,
        },{
          url: 'javascript:',
          img: banner3,
        }
      ],
      listIndex:[{
          url: 'javascript:',
          img: list1,
        }, {
          url: 'javascript:',
          img: list2,
        }
      ],
    }
  },
  mounted(){

     //window.addEventListener('scroll',this.handleScroll,true);
  },
  methods: {
    toCon(e){
      console.log(e);
      sessionStorage.conId=e;
      this.$router.push({
        name:'content'
      })
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
          if((location.hash.indexOf('load')>=0)){

          }
      }
    },

    loadMore() {
      let that= this;
      this.loading = true;
      setTimeout(() => {
        that.page++;
        if(that.page<=parseInt(that.pages)){
          that.getList();
        }else if(that.page>parseInt(that.pages)){
          that.nomore=true;
        };
        this.loading = false;
      }, 1000);
    },
    numFun(){
      let that =this;
      let timer = setInterval(function(){
        that.num++;
        if(that.num >=100){
          that.num =100;
          clearInterval(timer);
          timer = null;
          setTimeout(function(){
            that.loadIndex=1;
          },1000);
        }
      },50);
    },

    swiperFun2(e){
      let that = this;
      if(e==2){
        setTimeout(function(){
          that.loadIndex=2;
        },1500);
      }
    },

    swiFun(e){
      if(e==2){
        setTimeout(function(){
          that.loadIndex=2;

        },1000);
      }
    },
    liCli(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/customer/info?openid='+localStorage.openid1
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           if(res.data.data.status==0){
             that.popupVisible=true;
           }else{
             that.$router.push({
               name:'home'
             })
           }
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    sub1Fun(){
      this.popupVisible=false;
      this.$router.push({
        name:'login'
      })
    },
    getUserInfo(){
      let that =this;
      //Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/getuserinfo?code='+that.$route.query.code,
         //data: qs.stringify(data)
       }).then(function (res) {
         that.homeIndex=2;
         Indicator.close();
         if(res.data.code==1){
           localStorage.openid1 = res.data.data.openid;
           localStorage.city = res.data.data.city;
           localStorage.icon = res.data.data.icon;
           localStorage.nickname = res.data.data.nickname;
           localStorage.user_id = res.data.data.user_id;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    getList(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/works/home?openid='+localStorage.openid1+'&page='+that.page+'&length=10'
         //data: qs.stringify(data)
       }).then(function (res) {

         Indicator.close();
         if(res.data.code==1){
           that.pages=res.data.data.pages;
           that.homeList = that.homeList.concat(res.data.data.list);
           for(var i=0;i<that.homeList.length;i++){
             that.imgAr.push('http://photo.marketservice.cn'+that.homeList[i].img);
           }
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    detailFun(e){
      sessionStorage.detailId= e;
      this.$router.push({
        name:'detail'
      })
    },
    votCli(e,item,vote,index){
      let that =this;
    //  Indicator.open('加载中');
      this.axios({
         method: 'put',
         url: '/api/works/vote',
         data: {
           openid:localStorage.openid1,
           id:e
         }
       }).then(function (res) {

         Indicator.close();
         if(res.data.code==1){
           that.ind = index;
           Toast({
             message: '投票成功',
             duration: 1500
           });
           setTimeout(function(){
             that.ind=-1;
           },1500)
           item.vote++;
           //that.getList();
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    getData() {
      let that =this;
      this.axios({
         method: 'get',
         url: '/api/works/home?openid='+localStorage.openid1+'&page='+that.page+'&length=10'
         //data: qs.stringify(data)
       }).then(function (res) {

         Indicator.close();
         if(res.data.code==1){
           that.pages=res.data.data.pages;
           that.homeList = that.homeList.concat(res.data.data.list);
           for(var i=0;i<that.homeList.length;i++){
             that.imgAr = that.imgAr.concat('http://photo.marketservice.cn'+that.homeList[i].img);
           }
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })

    },
  },
  created:function(){
    // localStorage.openid1 = 'og2xL6PsxIGg2CMpBUymIcMMBOys';

    Indicator.close();
    if(this.$route.query.code==undefined || sessionStorage.fistFlag==1){
      this.loadIndex=2;
      //console.log(222);
    }else{
      sessionStorage.fistFlag=1;
       this.getUserInfo();
       this.numFun();
    };
    this.getList();
  }
}

</script>

<style>
  #load {
    text-align: center;
    height: 100%;
    background: url('../assets/combg.png') no-repeat center;
    background-size: 100% 100%;
  }
  #load .logo {
    display: block;
    margin: 0 auto;
    width: 180px;
    padding-top: 73px;
  }
  #load .cen {
    width: 100px;
    margin: 0 auto;
    margin-top: 110px;
  }
  #load .progress {
    font-size:16px;
    text-align: center;
    margin-top: 21px;
  }
  .logoImg {
    display: inline-block;
    width: 110px;
  }
  .swiperDiv {
    margin:0 auto;
    height: 100%;
  }
  #load .swi {
    margin: 0 auto;
    background: #ddd;
    height: 150px;
    margin-top: 50px;
    position: relative;
  }
  #load .swi .upload {
    color: #028458;
    padding:3px 10px;
    font-size: 13px;
    position: absolute;
    right: 15px;
    background: #fff;
    border-radius: 10px;
    top: 10px;
  }
  #load .listIndex {
    clear: both;
    overflow: hidden;
    padding-bottom: 60px;
  }
  #load .listIndex.com {

    background: url('../assets/combg.png') no-repeat center;
    background-size: 100% 100%;
  }
  #load .liItem {
    /* width: 49%; */
    margin-top: 10px;
    background: #ddd;
    overflow: hidden;
  }
  #load .liItem img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #load .liItem em {
    left: 0px;
    top: 0px;
    background: #fff;
    color: #028458;
    padding: 2px 10px;
    border-bottom-right-radius: 5px;
  }
  #load .op {
    width: 100%;
    height: 30px;
    background: #fff;
    opacity: 0.9;
    bottom:-1px;
  }
  #load .liItem p {
    position: absolute;
    width: 100%;
    height: 30px;
    bottom:-1px;
    font-size: 12px;
    line-height: 30px;
    color: #028458;
    text-align: center;
  }

  /* #load .liItem:nth-child(odd){
    float: left;
  }
  #load .liItem:nth-child(even){
    float: right;
  } */
#load .load h2 {
  font-size: 20px;
  margin-top: 25px;
  color:#3E3A39;
  font-weight: 600;
}
.vux-slider,.vux-swiper {
  height: 100%;
}
#load .alerCon {
  width: 250px;
}
#load .alerCon span {
  width: 120px;
  display: block;
  margin: 0 auto;
  margin-top: 50px;
}
#load .mint-popup {
  background: none !important;
}
#load p span.vote {
  position: absolute;
  right: -5px;
  display: inline-block;
  transform: scale(0.9);
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  width: 70px;
  background: #028458;
  color: #fff;
  margin-top: 5px;
  border-radius: 20px;
}
#load p span.sca em {
  font-size: 14px;
  background: none;
    padding: 0;
}
#load span.sca {
  display: inline-block;
  transform: scale(0.85);
  float: left;
  margin-left: -3px;
}
#load span.scaName {
  float: left;
  display: inline-block;
  width: 48px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 2px;
}
#load .nomore{
  width: 100%;
  display: block;
  float: left;
  padding: 10px;
  color: #333;
}
#load .abs {
  width: 100%;
  position: absolute;
  height: 100%;
  background-color:rgba(225,225,225,0.5);
  z-index: 10;
  line-height: 100px;
  font-size: 20px;
  color: #eee;
  font-weight: 600;
}
</style>
