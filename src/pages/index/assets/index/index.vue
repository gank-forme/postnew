<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // name: 'App',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      selected: '1'
    }
  },
  methods: {

  }
}
</script>

<style>
a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#search {
  height: auto;
}
</style>
