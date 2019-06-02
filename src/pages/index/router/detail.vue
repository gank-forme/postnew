<template>
  <div id="detail" class='comon'>
    <app-header></app-header>

    <div class="registBox relative">
      <div class="userBox ">
        <div class="clearfix">
          <img class="headImg fl" :src="userImg" alt="">
          <p class="fl p1">{{deatilData.name}}</p>
          <p class="fl p2">您已发起梦想</p>
        </div>
        <div class="infoBox">
          <h1>梦想主页</h1>
          <img :src="deatilData.image" alt="">
        </div>
        <h3>
          <span>梦想详情</span>
          <p>{{deatilData.detail}}</p>
        </h3>
        <h4>当前点赞票数</h4>
        <h4><img src="../assets/zan.png" alt="">{{deatilData.hits}}</h4>
        <h4>当前票数排名 </h4>
        <h4><img src="../assets/nav4.png" alt="">{{deatilData.rank}}</h4>

        <div class="shareBtn" @click='xLog2'>
          <img src="../assets/share.png" alt="">
          <p>号召助力</p>
        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show2" class="dialog-demo3">
        <div class="img0">
          <img src="../assets/more.png" alt="">
        </div>
        <div class="img1">
          <img src="../assets/guide.png" alt="">
        </div>
        <p>将梦想分享给更多的人<br>Share your dreams with more people </p>
        <div class="img2">
          <img @click = 'xLog2' src="../assets/gb1.png" alt="">
        </div>
      </x-dialog>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import store from '../store.js'
import { MessageBox,Toast,Indicator,TransferDomDirective as TransferDom} from 'mint-ui'

export default {
  directives: {
    TransferDom
  },
  name: 'app',
  data () {
    return {
      show2:false,
      //deatilData:store.state.infoData
      userImg:sessionStorage.userImg,
      deatilData:{
        "id": 5,
        "user_id": 5,
        "name": "hello5",
        "detail": "梦想detail15",
        "image": "https://small.pngfans.com/20190518/ge/royalty-free-png-royalty-payment-clipart-b3a719b4eea401ff.jpg",
        "status": 1,
        "create_time": "2019-06-02 05:42:06",
        "hits": 28,
        "rank": "3",
      }
    }
  },
  methods: {
    xLog2(){
      this.show2=!this.show2
    }
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
  position: absolute;
  left: 50%;
  margin-left: -47%;
  top: 45px;
  bottom: 25px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: url('../assets/infoBg.png') no-repeat center;
  background-size: 100% 100%;
}
#detail .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  margin-bottom: 50px;
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
  height: 250px;
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
  position: fixed;
  bottom: 60px;
  right: 30px;
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
.dialog-demo3 .weui-dialog{
  background: none;
  color: #fff;
  font-size: 13px;
}
#detail .img0 {
  text-align: right;
}
#detail .img1 {
  text-align: right;
}
#detail .img1 img{
  width: 60%;
  margin-right: 30px;
  margin-bottom: 20px;
}
#detail .img2 {
  text-align: center;
  margin-top: 150px;
}
#detail .img2 img {
  width: 40px;
}

</style>
