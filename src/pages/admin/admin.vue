<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 150px;
  display: block;
  margin: 0 auto;
}
.logo_text {
  font-size: 18px;
  color: #003C95;
  font-weight: 600;
}
.formBox {
  width: 85%;
  margin: 0 auto;
}
.getCode {
  border-left: 1px solid #ddd;
  display:inline-block;
  padding-left: 10px
}
</style>
