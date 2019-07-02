<template>
  <div id="info" class='comon'>
    <app-header></app-header>

    <div class="registBox">
      <div class="userBox" style="padding-bottom:60px;">
        <img class="headImg" :src="infoData.icon" alt="">
        <p>{{infoData.name}}</p>
        <div class="infoBox">
          <h1>{{infoData.title}}</h1>
          <h2></h2>
          <img :src="infoData.image" alt="">

          <!-- <img src="../assets/banner1_02.jpg" alt=""> -->
        </div>
        <h3><img src="../assets/zan1.png" alt="">当前票数 {{infoData.hits}}</h3>
        <h3><img src="../assets/rank1.png" alt="">当前排名 {{infoData.rank}}</h3>
        <!-- <img @click='toDetail' class="next none" src="../assets/bottom.png" alt="">
        <h4 class="none" @click='toDetail()'>梦想详情</h4> -->
      </div>
    </div>
    <app-footer message='zan'></app-footer>
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
      isIndex:sessionStorage.isIndex,
      infoNum:sessionStorage.infoNum,
      userImg:sessionStorage.userImg,
      infoData:store.state.infoData,
      //infoData:''
    }
  },
  methods: {
    getUserInfo(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/getuserinfo?code='+that.$route.query.code,
         //data: qs.stringify(data)
       }).then(function (res) {
         //alert(1);
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
    toInfo(m,n){
      let that =this;
      //console.log(this.value);
      Indicator.open('加载中');
      sessionStorage.dream_id=m;
      this.axios({
         method: 'get',
         url: '/api/getdreambyid?openid='+localStorage.openid1+'&dream_id='+m,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           //store.commit('infoFun2',res.data.data);
           that.infoData=res.data.data;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    wxShare(e){
      let that = this;

      let desc;
      if(that.infoData.title!='' ||that.infoData.title!=undefined){
        desc = that.infoData.title+'：'+that.infoData.detail
      }else {
        desc = sessionStorage.shareCon
      }
      wx.ready(function(){
        let shareUrl = window.location.protocol+'//'+window.location.host+'/static/ind.html?info='+e+'&sd='+sessionStorage.appId;
        wx.onMenuShareAppMessage({
            title: sessionStorage.shareTitle, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://share.marketservice.cn/uploads/20190612/16f6808112c73e4df95a44b87d1c68b0.png', // 分享图标
            success: function () {
              // 设置成功
            }
        });

        wx.onMenuShareTimeline({
           title: sessionStorage.shareTitle, // 分享时的标题
           link: shareUrl, // 分享时的链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
           imgUrl: 'http://share.marketservice.cn/uploads/20190612/16f6808112c73e4df95a44b87d1c68b0.png', // 分享时显示的图标
           //用户确认分享后执行的回调函数
           success: function () {

           },
           //用户取消分享后执行的回调函数
           cancel: function () {

           }
       });

      });
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res);
      });
    }
  },
  created:function(){
    sessionStorage.homeIndex=2;
    let that =this;
    setTimeout(function(){
      that.wxShare(sessionStorage.dream_id);
    },1000);
    if(this.isIndex==5){
      if(this.$route.query.code!=''){
        this.getUserInfo();
        this.toInfo(this.infoNum,1);
      }else {
        //  this.getWxconfig();
      }
    }
    //sessionStorage.id=store.state.infoData.id;
  }
}
</script>

<style>
#info {
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
#info .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 100%;
  min-height: 550px;
  /* position: absolute; */
  top: 45px;
  bottom: 33px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: url('../assets/infoBg.png') no-repeat top;
  background-size: 94% 96%;
  padding-bottom: 30px;
}
#info .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#info .headImg {
  width: 53px;
  height: 53px;
  border: 1px solid #fff;
  border-radius: 53px;
  margin-top: 40px;
}
#info .infoBox{
  background: #fff;
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
#info .infoBox h1{
  font-size: 15px;
}
#info .infoBox h2{
  font-size: 12px;
}
#info .infoBox img{
  width: 100%;
  min-height: 250px;
  display: block;
  margin-top: 10px;
}
#info .userBox h3{
  font-size: 14px;
  background: #fff;
  color: #339864;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  margin-top: 10px;
  text-align: left;
}
#info .userBox h3 img {
  width: 18px;
  margin: 0 10px;
}
#info .userBox img.next{
  width: 22px;
  display: block;
  margin: 10px auto;
}
#info .userBox h4{
  font-size: 14px;
  color: #fff;
}
#info .userBox p{
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #fff;
}
#info .userBox .subBtn{
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  width: 250px;
  height: 30px;
  background: #03764D;
  color: #fff;
  margin-top: 30px;
}
</style>
