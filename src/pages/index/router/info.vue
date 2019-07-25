<template>
  <div id="info" class='comon'>
    <x-header :left-options="{backText: ''}">作者信息<a slot="right" @click='shareBtn'>分享</a></x-header>
    <div class="registBox">
      <div class="userBox">
        <img class="headImg" :src="icon" alt="">
        <p>{{name}}</p>
        <div class="infoBox">
          <h1 class='clearfix'><span class="fl">{{area}}</span>  <span class="fr">{{sex}} {{age}}</span></h1>
          <h2>希望每个人都可以在自己的分享中得到快乐</h2>
        </div>
      </div>
      <div class="userBox clearfix">
        <img @click='navFun(2)' class="navl" src="../assets/111.png" alt="">
        <img @click='navFun(1)' class="navl" src="../assets/222.png" alt="">
      </div>
      <div v-if='ind==1' class="userBox">
        <div class="txt">
          <h1>当前北京赛区排名</h1>
          <h2>Current ranking of Beijing Branch</h2>
          <h3>{{local_ranking}}</h3>
          <h1>当前全国排名</h1>
          <h2>Current National Ranking</h2>
          <h3>{{total_ranking}}</h3>
        </div>
      </div>
      <div v-else class="picBox clearfix">
        <img @click='toDetail(i.id)' v-for='i in imgs'  :src="'http://photo.marketservice.cn'+i.img" alt="">
      </div>
    </div>
    <img  id="rec" src="../assets/rec.png" @click='toRec' alt="">
    <app-footer message='zan'></app-footer>

    <div v-transfer-dom>
      <x-dialog v-model="show2" class="dialog-demo3">

        <div class="img1">
          <img width="80%" src="../assets/guide.png" alt="">
        </div>
        <p>将梦想分享给更多的人<br>Share your dreams with more people </p>
        <div class="img2">
          <img width="30px" @click = 'xLog2' src="../assets/gb1.png" alt="">
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import store from '../store.js'
import { MessageBox,Toast,Indicator,TransferDomDirective as TransferDom} from 'mint-ui'
export default {
  directives: {
    TransferDom
  },
  name: 'app',
  data () {
    return {
      show2:false,
      ind:1,
      area:'',
      sex:'',
      age:'',
      icon:'',
      name:'',
      total_ranking:'',
      local_ranking:'',
      imgs:[]
      //infoData:''
    }
  },
  methods: {
    navFun(e){
      this.ind =e;
    },
    toRec(){
      this.$router.push({
        name:'result'
      })
    },
    shareBtn(){
      this.show2 =true;
    },
    xLog2(){
      this.show2 =false;
    },
    toDetail(e){
      sessionStorage.detailId= e;
      this.$router.push({
        name:'detail'
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
           that.$router.push({
             name:'login'
           })
         }else{
           that.icon=res.data.data.icon;
           that.name=res.data.data.name;
           that.area=res.data.data.area;
           that.sex=res.data.data.sex;
           that.local_ranking=res.data.data.works.local_ranking;
           that.total_ranking=res.data.data.works.total_ranking;
           that.age=res.data.data.age;
           that.imgs=res.data.data.works.list;
         }
        }else {
          Indicator.close();
          Toast({
            message: res.data.msg,
            duration: 1500
          });
        }
     })
  }
}
</script>

<style>
#info {
  min-height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/combg.png') no-repeat center;
  background-size: 100% 100%;
}
#info .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 100%;
  margin-top: 50px;
  padding-bottom: 30px;
}
#info .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, .5);
  clear: both;
  overflow: hidden;

  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#info .userBox .navl{
  width: 23px;
  height: 18px;
  margin: 10px 0;
}
#info .userBox .navl:nth-child(1){
  float: left;
  margin-left: 90px;
}
#info .userBox .navl:nth-child(2){
  float: right;
  margin-right: 90px;
}
#info .userBox .txt {
    padding-bottom: 50px;
}
#info .userBox .txt h1{
  font-size: 17px;
  font-weight: 700;
  padding-top: 30px;
}
#info .userBox .txt h3{
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  background: none;
}
#info .headImg {
  display: block;
  margin: 0 auto;
  width: 75px;
  height: 75px;
  border: 1px solid #fff;
  border-radius: 75px;
  margin-top: 40px;
}
#info .infoBox{
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
#info .infoBox h1{
  font-size: 15px;
}
#info .infoBox h1 span {
  display: block;
  width: 130px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 25px;
  height: 25px;
  background: #028458;
  border-radius: 25px;
}
#info .infoBox h2{
  font-size: 13px;
  color: #028458;
  font-weight: 600;
  margin-top: 20px;
  padding-bottom: 20px;
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
  font-size: 17px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #3E3A39;
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
#info .picBox {
  margin-bottom: 40px;
}
#info .picBox img {
  display: block;
  width: 49%;
  height: 175px;
  margin-top: 5px;
}
#info .picBox img:nth-child(odd) {
  float: left;
}
#info .picBox img:nth-child(even) {
  float: right;
}
#rec {
  width: 40px;
  position: fixed;
  bottom: 120px;
  right: 20px;
}
.dialog-demo3 .weui-dialog{
  background: none;
  color: #fff;
  font-size: 13px;
}
#info .img0 {
  text-align: right;
}
#info .img1 {
  text-align: right;
}
#info .img1 img{
  width: 60%;
  margin-right: 30px;
  margin-bottom: 20px;
}
#info .img2 {
  text-align: center;
  margin-top: 150px;
}
#info .img2 img {
  width: 40px;
}
</style>
