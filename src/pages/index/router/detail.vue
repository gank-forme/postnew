<template>
  <div id="detail" class='comon'>
    <div class="header clearfix">
      <span class="fl">你分享我点赞大型系列活动</span>
      <span class="fr">
        <img class="logoImg" src="" alt="">
      </span>
    </div>

    <div class="registBox relative">
      <div class="userBox ">
        <div class="clearfix">
          <img class="headImg fl" src="../assets/suc.png" alt="">
          <p class="fl p1">水电费2</p>
          <p class="fl p2">水电费1</p>
        </div>
        <div class="infoBox">
          <h1>梦想主页 </h1>
          <img src="" alt="">
        </div>
        <h3>
          梦想详情
          <p>你的一份微薄之力，也许拯救了孩子的一生。他们不需要名牌的衣服、鞋子和书包，只需要干净整洁的衣服、鞋子和书包。他们没有大把的文具</p>
        </h3>
        <h4>当前点赞票数</h4>
        <h4>1233</h4>
        <h4>当前票数排名 </h4>
        <h4>23</h4>

        <div class="shareBtn">
          <img src="" alt="">
          <p>号召助力</p>
        </div>
      </div>
    </div>

    <tabbar>
      <tabbar-item>
        <img slot="icon" src="../assets/err.png">
        <span slot="label">活动详情</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" src="../assets/err.png">
        <span slot="label">发起梦想</span>
      </tabbar-item>
      <a href="#" class="centerTab">
        <img slot="icon" src="../assets/err.png">
      </a>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="../assets/err.png">
        <span slot="label">排行榜</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" src="../assets/err.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
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
#detail {
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
#detail .registBox {
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
#detail .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  padding-bottom: 30px;
  background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3);
}
#detail .headImg {
  width: 53px;
  height: 53px;
  border: 1px solid #fff;
  border-radius: 53px;
  margin: 20px
}
#detail .clearfix .p1 {
  position: absolute;
  top: 55px;
  left: 100px;
  font-size: 15px;
  color: #fff;
}
#detail .clearfix .p2{
  position: absolute;
  top: 75px;
  left: 100px;
  font-size: 15px;
  color: #fff;
}
#detail .infoBox{
  background: #fff;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
}
#detail .infoBox h1{
  font-size: 15px;
  font-weight: 600;
}
#detail .infoBox h2{
  font-size: 14px;
  font-weight: 600;
}
#detail .infoBox img{
  width: 100%;
  display: block;
  height: 180px;
  background: orange;
  margin-top: 10px;
}
#detail .userBox h3{
  font-size: 14px;
  background: #fff;
  color: #339864;
  width: 76%;
  margin: 0 auto;
  padding: 10px 2%;
  margin-top: 10px;
  text-align: left;
  margin-bottom: 20px;
}
#detail .userBox img.next{
  width: 50px;
  display: block;
  height: 20px;
  background: orange;
  margin: 10px auto;
}
#detail .userBox h4{
  font-size: 15px;
  color: #fff;
  margin-top: 5px;
}
#detail .userBox .subBtn{
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
#detail .shareBtn {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 13px;
  text-align: center;
  color: #fff;
}
#detail .shareBtn img{
  margin: 0 auto;
  display: block;
  width: 50px;
  height: 50px;
  background: #eee;
  margin-bottom: 5px;
}
</style>
