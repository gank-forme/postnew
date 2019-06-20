<template>
  <div id="result" class="comon">
    <app-header></app-header>

    <div class="content">
      <img v-if='res==1' class="res_logo" src="../assets/suc.png" alt="">
      <img v-if='res==2' class="res_logo" src="../assets/zan12.png" alt="">
      <h1>您已成功{{res==1?'上传':'点赞'}}</h1>
      <p>You have successfully uploaded </p>

      <div class="btns" @click='goRank'>查看排行</div>
      <div class="btns" @click='goOn'>继续点赞</div>

      <img class='gbBtn' @click='goback' src="../assets/gb.png" alt="">
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
      res:sessionStorage.res,
      resultSrc:''
    }

  },

  methods:{
    goback(){
      history.go(-1);
    },
    goOn(){
      history.go(-2);
    },
    goRank(){
      this.$router.push({
        name:'rank'
      });
      sessionStorage.toZan=2;
    }
  },
  created:function(){

     // this.axios({
     //    method: 'get',
     //    url: '/api/list?page=10',
     //    //data: qs.stringify(data)
     //  }).then(function (res) {
     //
     //    Indicator.close();
     //    if(res.data.code==1){
     //
     //     }else {
     //       Indicator.close();
     //       Toast({
     //         message: res.data.msg,
     //         duration: 1500
     //       });
     //     }
     //  })
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

  text-align: center;
  color: #fd7522;

  width: 96%;
  position: absolute;
  left: 50%;
  margin-left: -48%;
  top: 45px;
  bottom: 0px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* background: url('../assets/logBg.png') no-repeat center; */
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
  background: #fd7522;
}
#result .content img.gbBtn{
  width: 30px;
  height: 30px;
  display: block;
  left: 50%;
  margin-left: -15px;
  position: absolute;
  bottom: 50px;
}
</style>
