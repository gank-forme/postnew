<template>
  <div class="header clearfix" >
    <span class="fl">活动</span>
    <span class="fr">
      <input placeholder="搜索照片名称或作者" type="text" name="" value="">
    </span>
  </div>
</template>
<script>
export default {
  name: 'AppHeader',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header input {
    width: 303px;
    font-size: 13px;
    padding: 0 10px;
    height: 22px;
    border-radius: 22px;
    color: #028458;
    text-align: center;
  }

</style>
