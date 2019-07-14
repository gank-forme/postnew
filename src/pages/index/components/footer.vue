<template>
  <tabbar>
    <tabbar-item  link="/load">
      <img class="w90" slot="icon" src="../assets/nav1.png">
      <span slot="label">活动</span>
    </tabbar-item>
    <tabbar-item  link="/lot" >
      <img class="w90" slot="icon" src="../assets/nav2.png">
      <span slot="label">抽奖</span>
    </tabbar-item>
    <tabbar-item link="/rank">
      <img slot="icon" src="../assets/nav4.png">
      <span slot="label">排行榜</span>
    </tabbar-item>
    <tabbar-item  link="/info" >
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
         url: '/api/createcheck?page_type=1&openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         console.log(res.data);
         Indicator.close();
         if(res.data.code==-1){//已发起后台审核过
           //that.detailFu();
           store.commit('detailFun',res.data.data);
           that.$router.push({
             name:'detail'
           });
          sessionStorage.status=1;
        }else if (res.data.code==-2){//审核中
          //that.detailFu();
          store.commit('detailFun',res.data.data);
           that.$router.push({
             name:'detail'
           });
           sessionStorage.status=2;
         }else if (res.data.code==-4){
            //that.detailFu();
            store.commit('detailFun',res.data.data);
            that.$router.push({
              name:'detail'
            });
            sessionStorage.status=4;
         }else if(res.data.code==0){
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }else if(res.data.code==1){
            store.commit('detailFun',res.data.data);
            that.$router.push({
              name:'detail'
            });
            sessionStorage.status=3;
          }else{
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
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
           store.commit('detailFun',res.data.data);
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    nav3Fun(){
      if(this.nav3){
        // Indicator.open('jia');
        let that =this;
        console.log(this.value);
        Indicator.open('加载中');
        axios({
           method: 'get',
           url: '/api/dreamhits?dream_id='+sessionStorage.dream_id+'&openid='+localStorage.openid1,
           //data: qs.stringify(data)
         }).then(function (res) {
           Indicator.close();
           if(res.data.code==1){
             that.$router.push({
               name:'result'
             })
             sessionStorage.res=2;
            }else {
              Indicator.close();
              Toast({
                message: res.data.msg,
                duration: 1500
              });
            }
         })
      }else{
        this.$router.push({
          name:'list'
        })
      }
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
        let shareUrl = window.location.protocol+'//'+window.location.host+'/static/index.html';
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
