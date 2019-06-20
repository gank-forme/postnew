<template>
    <div class="info">
        <h1>{{detail.question}}</h1>
        <p>{{detail.answer}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            console.log(this.$route.params)
            return {
                detail: this.$route.params.detail
            }
        }
    }
</script>
<style>
  h1 {
    padding:10px 0;
    font-weight:500;
    border-bottom:1px solid #e5e5e5;
    font-size: 18px;
  }
  p{
    text-indent:30px;
    width:100%;
    box-sizing:border-box;
    padding:10px 0;
    font-size:15px;
    color:#888;
  }
  .info {
    padding: 10px;
    margin-top: 10px;
    background: #fff;
    padding-bottom: 20px;
    box-shadow:0 2px 6px 1px #D3DCD8;
  }
  .info .mint-tab-item-label{
    font-size: 14px;
  }
  .info .mint-navbar .mint-tab-item.is-selected {
    color: #2d8cf0;
    border-bottom:2px solid #2d8cf0;
  }
</style>
