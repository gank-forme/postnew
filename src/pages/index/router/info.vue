<template>
  <div id="info" class='comon'>
    <app-header></app-header>

    <div class="registBox">
      <div class="userBox">
        <img class="headImg" src="../assets/suc.png" alt="">
        <p>水电费</p>
        <div class="infoBox">
          <h1>梦想展示窗口页 </h1>
          <h2>Dream Show Window Page </h2>
          <img src="" alt="">
        </div>
        <h3>当前票数 9122</h3>
        <h3>当前排名 192（国） 12（省）</h3>
        <img class="next" src="" alt="">
        <h4>梦想详情</h4>
      </div>
    </div>

    <app-footer></app-footer>

  </div>
</template>

<script>
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  methods: {

  },
  created:function(){

  }
}
</script>

<style>
#info {
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
#info .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
#info .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  padding-bottom: 80px;
  background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3);
}
#info .headImg {
  width: 53px;
  height: 53px;
  border: 1px solid #fff;
  border-radius: 53px;
  margin-top: 40px;
}
#info .infoBox{
  background: #fff;
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
#info .infoBox h1{
  font-size: 15px;
  font-weight: 600;
}
#info .infoBox h2{
  font-size: 14px;
  font-weight: 600;
}
#info .infoBox img{
  width: 100%;
  display: block;
  height: 300px;
  background: orange;
  margin-top: 10px;
}
#info .userBox h3{
  font-size: 14px;
  background: #fff;
  color: #339864;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  margin-top: 10px;
  text-align: left;
  text-indent: 30px;
}
#info .userBox img.next{
  width: 50px;
  display: block;
  height: 20px;
  background: orange;
  margin: 10px auto;
}
#info .userBox h4{
  font-size: 14px;
}
#info .userBox p{
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
}

#info .userBox .subBtn{
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  width: 250px;
  height: 30px;
  background: #03764D;
  color: #fff;
  margin-top: 30px;
}
</style>
