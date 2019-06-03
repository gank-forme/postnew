<template>
  <div id="info" class='comon'>
    <app-header></app-header>

    <div class="registBox">
      <div class="userBox">
        <img class="headImg" :src="userImg" alt="">
        <p>{{infoData.name}}</p>
        <div class="infoBox">
          <h1>梦想展示窗口页</h1>
          <h2>Dream Show Window Page </h2>
          <img :src="infoData.image" alt="">
        </div>
        <h3><img src="../assets/zan1.png" alt="">当前票数 {{infoData.hits}}</h3>
        <h3><img src="../assets/rank1.png" alt="">当前排名 {{infoData.rank}}</h3>
        <img @click='toDetail' class="next none" src="../assets/bottom.png" alt="">
        <h4 class="none" @click='toDetail'>梦想详情</h4>
      </div>
    </div>

    <app-footer message='zan'></app-footer>

  </div>
</template>

<script>
import store from '../store.js'
import { MessageBox,Toast,Indicator } from 'mint-ui'

export default {
  name: 'app',
  data () {
    return {
      infoData:store.state.infoData,
      userImg:sessionStorage.userImg,
      //infoData:''
    }
  },
  methods: {
    toDetail(e){
      // let that =this;
      // console.log(this.value);
      // Indicator.open('加载中');
      // this.axios({
      //    method: 'get',
      //    url: '/api/getdreambyuser?user_id='+e,
      //    //data: qs.stringify(data)
      //  }).then(function (res) {
      //    Indicator.close();
      //    if(res.data.code==1){
      //      store.commit('deatilData',res.data.data);
      //      that.$router.push({
      //        name:'detail'
      //      })
      //     }else {
      //       Indicator.close();
      //       Toast({
      //         message: res.data.msg,
      //         duration: 1500
      //       });
      //     }
      //  })
    }
  },
  created:function(){
    sessionStorage.id=store.state.infoData.id;
    sessionStorage.user_id=store.state.infoData.user_id;
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
  position: absolute;
  left: 50%;
  margin-left: -47%;
  top: 45px;
  bottom: 60px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: url('../assets/infoBg.png') no-repeat center;
  background-size: 100% 100%;
  padding-bottom: 30px;
}
#info .userBox {
  color: #03764D;
  width: 100%;
  margin:0 auto;
  margin-top: 5px;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
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
}
#info .infoBox h2{
  font-size: 12px;
}
#info .infoBox img{
  width: 100%;
  display: block;
  height: 250px;
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
}
#info .userBox h3 img {
  width: 18px;
  margin: 0 10px;
}
#info .userBox img.next{
  width: 22px;
  display: block;
  margin: 10px auto;
}
#info .userBox h4{
  font-size: 14px;
  color: #fff;
}
#info .userBox p{
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #fff;
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
