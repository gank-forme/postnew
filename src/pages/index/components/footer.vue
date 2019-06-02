<template>
  <tabbar>
    <tabbar-item  link="/load">
      <img class="w90" slot="icon" src="../assets/nav1.png">
      <span slot="label">活动详情</span>
    </tabbar-item>
    <tabbar-item  :link="nav2">
      <img class="w90" slot="icon" src="../assets/nav2.png">
      <span slot="label">发起梦想</span>
    </tabbar-item>
    <a href="javascript:;" @click='nav3Fun' class="centerTab">
      <img slot="icon" src="../assets/nav3.png">
    </a>
    <tabbar-item link="/rank">
      <img slot="icon" src="../assets/nav4.png">
      <span slot="label">排行榜</span>
    </tabbar-item>
    <tabbar-item  :link="nav5">
      <img class="w90" slot="icon" src="../assets/nav5.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'

export default {
  prop:['message'],
  name: 'AppFooter',
  data () {
    return {
      nav2:'/login',
      nav3:true,
      nav5:'/detail'
    }
  },
  methods:{
    nav3Fun(){
      if(this.nav3){
        // Indicator.open('jia');
        this.$router.push({
          name:'result'
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
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
