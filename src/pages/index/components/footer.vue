<template>
  <tabbar>
    <tabbar-item  link="/load">
      <img class="w90" slot="icon" src="../assets/nav1.png">
      <span slot="label">活动</span>
    </tabbar-item>
    <tabbar-item  @click.native='nav2Fun'>
      <img class="w90" slot="icon" src="../assets/nav2.png">
      <span slot="label">抽奖</span>
    </tabbar-item>
    <tabbar-item link="/rank">
      <img slot="icon" src="../assets/nav4.png">
      <span slot="label">排行榜</span>
    </tabbar-item>
    <tabbar-item  @click.native='nav5Fun'>
      <img class="w90" slot="icon" src="../assets/nav5.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import qs from 'qs'
import store from '../store.js'
import axios from 'axios'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import noc from '../assets/nocli.png'
import cli from '../assets/nav3.png'

export default {
  prop:['message'],
  name: 'AppFooter',
  data () {
    return {
      shareTitle:sessionStorage.shareTitle,
      shareCon:sessionStorage.shareCon,
      shareImg:sessionStorage.shareImg,
      centerImg:'',
      nav2:'/before',
      nav3:true,
      nav5:''
    }
  },
  methods:{
    nav5Fun(){//点击我的
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
             that.$router.push({
               name:'info'
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
    nav2Fun(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/customer/info?openid='+localStorage.openid1
         //data: qs.stringify(data)
       }).then(function (res) {

         Indicator.close();
         if(res.data.code==1){
           if(res.data.data.status!=0){
             that.$router.push({
               name:'login'
             })
           }else{
             that.$router.push({
               name:'lot'
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
    }

  },
  created:function(){
    let that =this;
    if((location.hash.indexOf('info')<0)){
      this.nav3=false
      this.centerImg=noc;
    }else{
      this.centerImg=cli;
    };

    if((location.hash.indexOf('detail')<0)){
      wx.ready(function(){
        let shareUrl = window.location.protocol+'//'+window.location.host+'/static/ind0.html';
        //alert(shareUrl);
        wx.onMenuShareAppMessage({
            title: that.shareTitle, // 分享标题
            desc: that.shareCon, // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.shareImg, // 分享图标
            success: function () {
              // 设置成功
            }
        });
      });
    }else{

    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centerTab.noc {
  pointer-events: none;
}
</style>
