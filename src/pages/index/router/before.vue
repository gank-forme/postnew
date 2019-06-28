<template>
  <div id="before" class='comon'>
    <app-header></app-header>
    <div v-if='ind==1' class="registBox">
      <div class="userBox">
        <h1>热门搜索</h1>
        <span class='spanItem' v-for='i in spanList'>{{i}}</span>
      </div>
    </div>

    <div v-else class="registBox">
      <div class="userBox userBox1">
        <span class='fl'>综合</span>
        <span class=''>作者</span>
        <span class='fr'>作品名</span>
      </div>
      <div class="userBox userBox2">
        <h1>您可能在寻找</h1>
        <div class="clearfix peoBox">
          <img src="" alt="">
          <span>作者：啥电费 北京赛区</span>
        </div>
      </div>
      <div v-for='i in 4' class="userBox userBox3">
        <img src="../assets/big.png" alt="">
        <span>啥电费啥电费</span>
      </div>

    </div>


    <app-footer></app-footer>
  </div>
</template>

<script>
import store from '../store.js'
import qs from 'qs'
import axios from 'axios'
import { MessageBox,Toast,Indicator } from 'mint-ui'

export default {
  name: 'app',
  data () {
    return {
      ind:2,
      spanList:['有深度','啥电','啥电费发啥电','啥的','sdfsfsdf','啛啛喳喳','有深度','啥电','啥电费发啥电','啥的','sdfsfsdf','啛啛喳喳']
    }
  },
  methods: {

  },
  created:function(){

  }
}
</script>

<style>
#before {
  height: 100%;
  clear: both;
  overflow: hidden;
}
#before .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 100%;
  margin-top: 50px;
  padding-bottom: 30px;
}
#before .userBox {
  color: #fff;
  margin:0 auto;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, .5);
  clear: both;
  overflow: hidden;
  padding: 15px;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#before .userBox h1 {
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  color: #3E3A39;
  margin-bottom: 15px;
}
#before .userBox .spanItem {
  padding: 3px 15px;
  background: #2F9976;
  border-radius: 20px;
  display: block;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}

#before .userBox.userBox1 {
  color: #3E3A39;
  font-size: 16px;
  font-weight: 600;
}
#before .userBox.userBox2 {
  color: #3E3A39;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
}
#before .userBox.userBox2 .peoBox {
  background: url('../assets/ri.png') no-repeat 99%;
  background-size: 10px;
  font-weight: 600;
}
#before .userBox.userBox2 img{
  width: 50px;
  height: 50px;
  background: #ddd;
  border-radius: 50px;
  display: inline-block;
  margin-right: 10px;
}
#before .userBox.userBox3 {
  color: #3E3A39;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding: 6px;
  font-size: 14px;
}
#before .userBox.userBox3 img{
  width: 15px;
}


</style>
