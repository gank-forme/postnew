<template>
  <div id="detail" class='comon'>
    <x-header :left-options="{backText: ''}">照片展示</x-header>

    <div class="registBox relative">
      <div class="userBox ">
        <div class="clearfix">
          <img class="headImg fl" :src="icon" alt="">
          <p class="fl p1">{{name}}</p>
          <p class="fl p2">发布于 {{time}}</p>
        </div>
        <div v-if='status!=4 && status!=3' style="padding-bottom:20px;">
          <div class="infoBox">
            <img :src="img" alt="">
            <!-- <img src="../assets/banner1_02.jpg" alt=""> -->
          </div>
          <h3>
            <p>《{{name1}}》</p>
          </h3>
          <img class="log" src="../assets/logo.png" alt="">
          <div class="clearfix relative">
            <div class="liBox fl">
              <img src="../assets/de2.png" alt="">
              <h1>{{voto}}</h1>
              <p>当前点赞数</p>
            </div>
            <div class="liBox absolute">
              <img src="../assets/de1.png" alt="">
              <h1>{{rank}}</h1>
              <p>当前全国排名</p>
            </div>
            <div class="liBox fr" @click='shareBtn'>
              <img src="../assets/de3.png" alt="">
              <h1>分享</h1>
              <p>帮TA分享</p>
            </div>
          </div>
          <div class="voteBtn" @click ='votCli(id)'>
            投他（她）一票
          </div>
          <h4>照片详情</h4>
          <h5>Photo details</h5>
          <div class="blank">
            {{dec}}
          </div>
        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show2" class="dialog-demo3">
        <div class="img0">
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
      show2:false,
      status:1,
      txt:'',
      name:'',
      name1:'',
      time:'',
      icon:'',
      img:'',
      voto:'',
      rank:'',
      deatilData:'',
      dec:'',
      id:''
    }
  },
  methods: {
    votCli(e){
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
           Toast({
             message: '投票成功',
             duration: 1500
           });

           that.voto++;
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
    shareBtn(){
      this.show2 =true;
    },
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
         url: '/api/works/info?openid='+localStorage.openid1+'&id='+sessionStorage.detailId,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.icon = res.data.data.author_icon;
           that.name =res.data.data.author_name;
           that.time =res.data.data.create_time;
           that.img ='http://photo.marketservice.cn'+res.data.data.img;
           that.name1 =res.data.data.name;
           that.voto =res.data.data.vote;
           that.rank =res.data.data.total_ranking;
           that.dec = res.data.data.describe;
           that.id = res.data.data.id;

           that.wxShare(sessionStorage.detailId);
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
      if(that.name1!='' ||that.dec!=undefined){
        desc = that.name1+'：'+that.dec
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
    this.detailFu();
  }
}
</script>

<style>
#detail {
  min-height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/combg.png') no-repeat center;
  background-size: 100% 100%;
}
#detail .registBox {
  text-align: center;
  font-size: 13px;
  color: #3E3A39;
  min-height: 550px;
  width: 100%;
  /* position: absolute; */
  top: 45px;
  bottom: 25px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
  font-size: 18px;
  color: #3E3A39;

}
#detail .clearfix .p2{
  position: absolute;
  top: 50px;
  left: 90px;
  font-size: 15px;
  color: #3E3A39;
}
#detail .infoBox{
  width: 350px;
  background: #fff;
  margin: 0 auto;
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
  display: block;
}
#detail .userBox h3{
  font-size: 18px;
  color: #028458;
  padding: 10px 2%;
  margin-top: 5px;
  text-align: center;
  margin-bottom: 5px;
}
#detail .userBox img.next{
  width: 50px;
  display: block;
  height: 20px;
  background: orange;
  margin: 10px auto;
}
#detail .userBox h4{
  font-size: 18px;
  color: #3E3A39;
  margin-top: 15px;
  font-weight: 700;
}
#detail .userBox h5{
  font-size: 15px;
  color: #3E3A39;
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
#detail .log {
  width: 180px;
}
.shareBtn.noc {
  opacity: 0.5;
  pointer-events: none;
}
#detail .liBox {
  width: 36%;
  font-size: 15px;
  color: #3E3A39;
  margin-top: 20px;
}
#detail .liBox.absolute {
  left: 50%;
  margin-left: -18%;
}
#detail .liBox h1{
  font-size: 16px;
}
#detail .liBox img{
  width: 30px;
}
#detail .blank {
  font-style: 15px;
  background: #fff;
  opacity: 0.7;
  margin-top: 10px;
  text-align: left;
  padding: 10px;
}
#detail .voteBtn {
  background: #028458;
  font-size: 14px;
  color: #fff;
  width: 200px;
  padding: 5px;
  margin: 15px auto;
  border-radius: 30px;
}
</style>
