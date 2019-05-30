<template>
  <tabbar>
    <tabbar-item  link="/info">
      <img class="w90" slot="icon" src="../assets/nav1.png">
      <span slot="label">活动详情</span>
    </tabbar-item>
    <tabbar-item  link="/home">
      <img class="w90" slot="icon" src="../assets/nav2.png">
      <span slot="label">发起梦想</span>
    </tabbar-item>
    <a href="index.html#/load" class="centerTab">
      <img slot="icon" src="../assets/nav3.png">
    </a>
    <tabbar-item  link="/list">
      <img slot="icon" src="../assets/nav4.png">
      <span slot="label">排行榜</span>
    </tabbar-item>
    <tabbar-item  link="/login">
      <img class="w90" slot="icon" src="../assets/nav5.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
export default {
  name: 'AppFooter',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
