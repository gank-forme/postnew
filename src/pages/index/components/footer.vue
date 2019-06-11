<template>
  <tabbar>
    <tabbar-item  link="/load">
      <img class="w90" slot="icon" src="../assets/nav1.png">
      <span slot="label">活动详情</span>
    </tabbar-item>
    <tabbar-item  :link="nav2" >
      <img class="w90" slot="icon" src="../assets/nav2.png">
      <span slot="label">发起梦想</span>
    </tabbar-item>
    <a href="javascript:;" @click='nav3Fun' :class="!nav3?'centerTab noc':'centerTab'">
      <img slot="icon" :src="centerImg">
    </a>
    <tabbar-item link="/rank">
      <img slot="icon" src="../assets/nav4.png">
      <span slot="label">排行榜</span>
    </tabbar-item>
    <tabbar-item  :link="nav5" @click.native='nav5Fun'>
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
         url: '/api/createcheck?page_type=1&openid='+localStorage.openid,
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
         url: '/api/getdreambyuser?openid='+localStorage.openid,
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
           url: '/api/dreamhits?dream_id='+sessionStorage.dream_id+'&openid='+localStorage.openid,
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
    if((location.hash.indexOf('info')<0)){
      this.nav3=false
      this.centerImg=noc;
    }else{
      this.centerImg=cli;
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
