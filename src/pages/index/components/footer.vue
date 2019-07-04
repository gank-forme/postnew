<template>
  <tabbar v-model='ind'>
    <tabbar-item  link="/home" >
      <img slot="icon" src="../assets/nav1-1.png">
      <img slot="icon-active" src="../assets/nav1.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item  @click.native='navFun'>
      <img slot="icon" src="../assets/nav2-1.png">
      <img slot="icon-active" src="../assets/nav2.png">
      <span slot="label">优惠券</span>
    </tabbar-item>
    <tabbar-item :link='login?"/login":"/convert"' >
      <img slot="icon" src="../assets/nav3-1.png">
      <img slot="icon-active" src="../assets/nav3.png">
      <span slot="label">兑奖</span>
    </tabbar-item>
    <tabbar-item :link='login?"/login":"/user"'>
      <img slot="icon" src="../assets/nav4-1.png">
      <img slot="icon-active" src="../assets/nav4.png">
      <span slot="label">个人中心</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import qs from 'qs'
import store from '../store.js'
import axios from 'axios'
import { MessageBox,Toast,Indicator } from 'mint-ui'


export default {
  prop:['message'],
  name: 'AppFooter',
  data () {
    return {
      login:!sessionStorage.token,
      ind:0
    }
  },
  methods:{
    navFun(e){
      if(!sessionStorage.token){
        this.$router.push({
          name:'login'
        })
      }else {
        location.href =sessionStorage.linUrl;
      }
    }
  },
  created:function(){
    if(this.$route.path.indexOf('home')>=0){
      this.ind =0;
    }
    if(this.$route.path.indexOf('home')>=0){
      this.ind =0;
    }
    if(this.$route.path.indexOf('convert')>=0){
      this.ind =2;
    }
    if(this.$route.path.indexOf('user')>=0){
      this.ind =3;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
