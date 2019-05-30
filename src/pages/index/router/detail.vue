<template>
  <div id="detail" class='comon'>
    <app-header></app-header>

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
          <span>梦想详情</span>
          <p>你的一份微薄之力，也许拯救了孩子的一生。他们不需要名牌的衣服、鞋子和书包，只需要干净整洁的衣服、鞋子和书包。他们没有大把的文具</p>
        </h3>
        <h4>当前点赞票数</h4>
        <h4><img src="../assets/zan.png" alt="">1233</h4>
        <h4>当前票数排名 </h4>
        <h4><img src="../assets/nav4.png" alt="">23</h4>

        <div class="shareBtn">
          <img src="../assets/share.png" alt="">
          <p>号召助力</p>
        </div>
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
  background: url('../assets/infoBg.png') no-repeat center;
  background-size: 100% 100%;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
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
  top: 25px;
  left: 90px;
  font-size: 15px;
  color: #fff;
}
#detail .clearfix .p2{
  position: absolute;
  top: 45px;
  left: 90px;
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
#detail .userBox h3 p{
  font-size: 12px;
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
#detail .userBox h4 img{
  width: 15px;
  margin-right: 5px;
  margin-top: -5px;
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
  margin-bottom: 5px;
}
</style>
