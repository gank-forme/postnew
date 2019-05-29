<template>
  <div id="result" class="comon">
    <app-header></app-header>

    <div class="content">
      <img class="res_logo" src="../assets/suc.png" alt="">
      <h1>您已成功上次</h1>
      <p>You have successfully uploaded </p>

      <div class="btns">查看排行</div>
      <div class="btns">继续点赞</div>

      <img class='gbBtn' src="../assets/gb.png" alt="">
    </div>
  </div>
</template>
<script>

import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import axios from 'axios'


export default {
  name: 'app',
  data () {
    return {
      resultSrc:''
    }

  },

  methods:{

  },
  created:function(){

  }
}
</script>

<style>
#result {
  height: 100%;
  clear: both;
  overflow: hidden;

}
#result .content {
  margin: 0 auto;
  width: 96%;
  margin-top: 43px;
  text-align: center;
  color: #03764D;
  clear: both;
  overflow: hidden;
  height: 100%;
  background: url('../assets/resultBg.png') no-repeat center;
  background-size: 100% 100%;
}
#result .content .res_logo{
  margin-top: 50px;
  margin-bottom: 20px;
  width: 30px;
}
#result .content h1{
  font-size: 14px
}
#result .content p{
  font-size: 12px;
  margin-bottom: 20px;
}
#result .content .btns{
  width: 250px;
  height: 32px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  line-height: 32px;
  margin: 0 auto;
  margin-top: 10px;
  background: #03764D;
}
#result .content img.gbBtn{
  width: 30px;
  height: 30px;
  display: block;
  left: 50%;
  margin-left: -15px;
  position: absolute;
  bottom: 100px;
}
</style>
