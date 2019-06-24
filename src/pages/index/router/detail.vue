<template>
  <div id="detail" class='comon'>
    <app-header></app-header>

    <div class="registBox relative">
      <div class="userBox ">
        <div class="clearfix">
          <img class="headImg fl" :src="icon" alt="">
          <p class="fl p1">{{name}}</p>
          <p class="fl p2">{{txt}}</p>
        </div>
        <div v-if='status!=4 && status!=3' style="padding-bottom:70px;">
          <div class="infoBox">
            <h1>{{deatilData.title}}</h1>
            <img :src="deatilData.image" alt="">
            <!-- <img src="../assets/banner1_02.jpg" alt=""> -->
          </div>
          <h3>
            <p>{{deatilData.detail}}</p>
          </h3>
          <h4>当前点赞票数</h4>
          <h4><img src="../assets/zan.png" alt="">{{deatilData.hits}}</h4>
          <h4>当前票数排名 </h4>
          <h4><img src="../assets/nav4.png" alt="">{{deatilData.rank}}</h4>
        </div>
        <div class="shareBtn shareBtn1" @click='xLog1'>
          <img src="../assets/nav3.png" alt="">
          <p>查看我的点赞</p>
        </div>

        <div :class="status==2?'shareBtn noc':'shareBtn'"  @click='xLog2'>
          <img src="../assets/share.png" alt="">
          <p>号召助力</p>
        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show2" class="dialog-demo3">
        <div class="img0">
          <img src="../assets/more.png" alt="">
        </div>
        <div class="img1">
          <img src="../assets/guide.png" alt="">
        </div>
        <p>将梦想分享给更多的人<br>Share your dreams with more people </p>
        <div class="img2">
          <img @click = 'xLog2' src="../assets/gb1.png" alt="">
        </div>
      </x-dialog>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
//const wx = require('weixin-js-sdk')
import store from '../store.js'
import qs from 'qs'
import axios from 'axios'
import { MessageBox,Toast,Indicator,TransferDomDirective as TransferDom} from 'mint-ui'

export default {
  directives: {
    TransferDom
  },
  name: 'app',
  data () {
    return {
      status:sessionStorage.status,
      txt:'',
      show2:false,
      name:localStorage.nickname,
      icon:localStorage.icon,
      deatilData:''
    }
  },
  methods: {
    xLog2(){
      this.show2=!this.show2
    },
    xLog1(){
      sessionStorage.toZan=1;
      this.$router.push({
        name:'rank'
      })
    },
    detailFu(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/getdreambyuser?openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
            that.deatilData=res.data.data;
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
      console.log(wx);
      wx.ready(function(){
        let shareUrl = window.location.protocol+'//'+window.location.host+'/static/ind.html?info='+e+'&sd='+sessionStorage.appId;
        wx.onMenuShareAppMessage({
            title: that.deatilData.title, // 分享标题
            desc: that.deatilData.detail, // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.deatilData.image, // 分享图标
            success: function () {
              // 设置成功
            }
        });
       //  wx.updateAppMessageShareData({
       //     title: that.deatilData.title, // 分享标题
       //     desc: that.deatilData.detail, // 分享描述
       //     link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
       //     imgUrl: that.deatilData.image, // 分享图标
       //     success: function () {
       //       // 设置成功
       //     }
       // });
       //  wx.updateTimelineShareData({
       //     title: that.deatilData.title, // 分享标题
       //     link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
       //     imgUrl: that.deatilData.image, // 分享图标
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
    }
  },
  created:function(){
    this.detailFu();
    let that =this;
    setTimeout(function(){
      that.wxShare(that.deatilData.dream_id);
    },1000);

    if(this.status==1){
      this.txt ='您已发起梦想'
    }
    if(this.status==2){
      this.txt ='您发起梦想审核中'
    }
    if(this.status==4){
      this.txt ='您还没有发起梦想'
    }
    if(this.status==3){
      this.txt ='您的梦想审核未通过'
    }

  }
}
</script>

<style>
#detail {
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
#detail .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;

  width: 100%;
  /* position: absolute; */
  top: 45px;
  bottom: 25px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: url('../assets/infoBg.png') no-repeat top;
  background-size: 94% 96%;
}
#detail .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  margin-bottom: 50px;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#detail .headImg {
  width: 53px;
  height: 53px;
  border: 1px solid #fff;
  border-radius: 53px;
  margin: 20px
}
#detail .clearfix .p1 {
  position: absolute;
  top: 25px;
  left: 90px;
  font-size: 15px;
  color: #fff;
}
#detail .clearfix .p2{
  position: absolute;
  top: 45px;
  left: 90px;
  font-size: 15px;
  color: #fff;
}
#detail .infoBox{
  background: #fff;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
}
#detail .infoBox h1{
  font-size: 15px;
  font-weight: 600;
}
#detail .infoBox h2{
  font-size: 14px;
  font-weight: 600;
}
#detail .infoBox img{
  width: 100%;
  min-height: 250px;
  display: block;
  margin-top: 10px;
}
#detail .userBox h3{
  font-size: 14px;
  background: #fff;
  color: #339864;
  width: 76%;
  margin: 0 auto;
  padding: 10px 2%;
  margin-top: 10px;
  text-align: left;
  margin-bottom: 20px;
}
#detail .userBox h3 p{
  font-size: 12px;
}
#detail .userBox img.next{
  width: 50px;
  display: block;
  height: 20px;
  background: orange;
  margin: 10px auto;
}
#detail .userBox h4{
  font-size: 15px;
  color: #fff;
  margin-top: 5px;
}
#detail .userBox h4 img{
  width: 15px;
  margin-right: 5px;
  margin-top: -5px;
}
#detail .userBox .subBtn{
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
#detail .shareBtn {
  position: fixed;
  bottom: 60px;
  right: 10px;
  font-size: 13px;
  text-align: center;
  color: #fff;
  width: 100px;
}

#detail .shareBtn1 {
  bottom: 150px;

}
#detail .shareBtn img{
  margin: 0 auto;
  display: block;
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
}
.dialog-demo3 .weui-dialog{
  background: none;
  color: #fff;
  font-size: 13px;
}
#detail .img0 {
  text-align: right;
}
#detail .img1 {
  text-align: right;
}
#detail .img1 img{
  width: 60%;
  margin-right: 30px;
  margin-bottom: 20px;
}
#detail .img2 {
  text-align: center;
  margin-top: 150px;
}
#detail .img2 img {
  width: 40px;
}
.shareBtn.noc {
  opacity: 0.5;
  pointer-events: none;
}

</style>
