<template>
  <div id="load" class="comon">
    <app-header v-if='loadIndex!=0'></app-header>
    <div class="load " v-if='loadIndex==0'>
      <img class="logo" src="../assets/logo.png" alt="">
      <p class="progress">Loading {{num}}%</p>
      <h2>中国邮政储蓄银行“梦想加邮站”<br>产品系列活动之“你分享，我点赞”</h2>
    </div>

    <div class="swiperDiv" v-if='loadIndex==1'>
      <swiper @click.native='swiFun(index)' :auto='true' v-model='index' @on-index-change='swiperFun' :loop='false' :list="demo01_list" height='100%' :show-desc-mask='false' dots-position='center'></swiper>
    </div>
    <div class="listIndex" v-if='loadIndex==2'>
      <p style="opacity:0"><img class="logoImg" src="../assets/logo.png" alt=""> </p>
      <li v-for='(i,index) in listIndex' :key='index' @click='toCon(index)'>
        <img :src='i' alt="">
      </li>
      <h1 class="tipH">请进入您需要查看的详情 </h1>
      <h2 class="tipH">Please enter the details you need to see. </h2>
    </div>
    <app-footer v-if='loadIndex==2'></app-footer>
  </div>
</template>

<script>

import store from '../store.js'
import qs from 'qs'
import axios from 'axios'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import banner1 from '../assets/banner1_02.jpg'
import banner2 from '../assets/banner2_02.jpg'
import banner3 from '../assets/banner3_02.jpg'
import list1 from '../assets/list1_03.jpg'
import list2 from '../assets/list2_06.jpg'
import list3 from '../assets/list3_08.jpg'
import list4 from '../assets/list4_03.jpg'

export default {
  name: 'app',
  data () {
    return {
      appId:'',
      loadIndex:0,
      index:0,
      num:0,
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
      listIndex:[list1,list2,list3,list4]
    }
  },
  methods: {
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
    toCon(e){
      store.commit('infoFun1',e);
      this.$router.push({
        name:'content'
      })

    },
    swiperFun(){
      let that = this;
      if(this.index==1){
        setTimeout(function(){
          sessionStorage.firstFlag=1;
          that.loadIndex=2;
          that.getWxconfig();

        },700);
      }
    },
    swiFun(e){
      if(e==2){
        setTimeout(function(){
          sessionStorage.firstFlag=1;
          that.loadIndex=2;
          that.getWxconfig();

        },500);
      }
    },
    getWxconfig(){
      let that =this;
      let url = encodeURIComponent(window.location.href.split('#')[0]);
      let data={
        url:url
      };
      Indicator.open('加载中');
      this.axios({
         method: 'POST',
         url:'/api/getsign',
         headers: { 'content-type': 'application/x-www-form-urlencoded' },
         //url: '/Api/weChatShare',
         //url: '/api.php/api/Api/weChatShare?url='+url,
         data: qs.stringify({url: url})
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){

          	sessionStorage.appId= res.data.data.appId, // 必填，公众号的唯一标识
          	sessionStorage.timestamp=res.data.data.timestamp, // 必填，生成签名的时间戳
          	sessionStorage.nonceStr= res.data.data.nonceStr, // 必填，生成签名的随机串
          	sessionStorage.signature= res.data.data.signature,// 必填，签名

            sessionStorage.shareTitle=res.data.data.title,
            sessionStorage.shareCon=res.data.data.content,
            sessionStorage.shareImg=res.data.data.image;

            // sessionStorage.appId = res.data.data.appId;
            location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+res.data.data.appId+'&redirect_uri='+window.location.protocol+'%2f%2f'+window.location.host+'%2fstatic%2findex.html&response_type=code&scope=snsapi_userinfo#wechat_redirect'

          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    getUserInfo(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/getuserinfo?code='+that.$route.query.code,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           localStorage.openid = res.data.data.openid;
           localStorage.city = res.data.data.city;
           localStorage.icon = res.data.data.icon;
           localStorage.nickname = res.data.data.nickname;
           localStorage.user_id = res.data.data.user_id;
           wx.config({
             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
             appId: sessionStorage.appId, // 必填，公众号的唯一标识
             timestamp: sessionStorage.timestamp, // 必填，生成签名的时间戳
             nonceStr: sessionStorage.nonceStr, // 必填，生成签名的随机串
             signature: sessionStorage.signature,// 必填，签名
             jsApiList: [
                //'updateAppMessageShareData',
                //'updateTimelineShareData',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'onMenuShareQQ',,
                'onMenuShareQZone',
              ] // 必填，需要使用的JS接口列表
            });
           wx.ready(function(){

             let shareUrl = window.location.protocol+'//'+window.location.host+'/static/index.html';
             //alert(shareUrl);
             wx.onMenuShareAppMessage({
                 title: sessionStorage.shareTitle, // 分享标题
                 desc: sessionStorage.shareCon, // 分享描述
                 link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: sessionStorage.shareImg, // 分享图标
                 success: function () {
                   // 设置成功
                 }
             });
            //  wx.updateAppMessageShareData({
            //     title: sessionStorage.shareTitle, // 分享标题
            //     desc: sessionStorage.shareCon, // 分享描述
            //     link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //     imgUrl: sessionStorage.shareImg, // 分享图标
            //     success: function () {
            //       // 设置成功
            //     }
            // });
            //  wx.updateTimelineShareData({
            //     title: sessionStorage.shareTitle, // 分享标题
            //     link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //     imgUrl: sessionStorage.shareImg, // 分享图标
            //     success: function () {
            //       // 设置成功
            //     }
            // });
             // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
           });
           wx.error(function(res){
             // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
             console.log(res);
           });
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
    if(sessionStorage.firstFlag==1 || this.loadIndex==2){
      this.loadIndex=2;
      if(this.$route.query.code){
        this.getUserInfo();
      }else {
        if(localStorage.openid){

        }else{
          this.getWxconfig();
        }
      }
      //
    }else {
      if(this.loadIndex==0){
        this.numFun();
      }
    }

    Indicator.close();

  }
}
</script>

<style>
  #load {
    text-align: center;
    clear: both;
    overflow: auto;
    height: 100%;
    background: linear-gradient(to bottom right, #fff 40%, #79CA9E);
  }
  #load .logo {
    display: block;
    margin: 0 auto;
    width: 180px;
    margin-top: 240px;
  }
  #load .progress {
    font-size:13px;
    text-align: center;
    margin-top: 10px;
  }
  .logoImg {
    display: inline-block;
    width: 110px;
  }
  .swiperDiv {
    margin:0 auto;
    height: 100%;
  }
  .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
    background-position: 0 30px !important;
  }
  .listIndex {
    width: 94%;
    margin:0 auto;
    margin-top: 45px;
    padding-bottom: 70px;
  }
  .listIndex p {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: right;
  }
  .listIndex li {
    width: 94%;
    margin: 0 auto;
    margin-top: 10px;
    height: 115px;
    text-align: center;
    color: #fff;
    position: relative;
  }
  .listIndex li img {
    width: 100%;
    /* width: 33px;
    height: 33px;
    display: inline-block;
    background: #999;
    margin-top: 20px;
    margin-bottom: 10px; */
  }
  .listIndex li h1{
    font-size: 13px;
    font-weight: 700;
  }
  .listIndex li h2{
    width: 60%;
    line-height: 12px;
    margin: 0 auto;
    font-size: 10px;
  }
  .listIndex li img.goBtn {
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    top: 30px;
    right: 20px;
    border:1px solid red;
  }
  h1.tipH {
    color: #03764D;
    font-size: 15px;
    font-weight: 700;
    margin-top: 42px;
  }
  h2.tipH {
    color: #03764D;
    font-size: 12px;
  }
#load .load h2 {
  font-size: 14px;
  margin-top: 10px;
  color:#03764D;
  font-weight: 600;
}
.vux-slider,.vux-swiper {
  height: 100%;
}
</style>
