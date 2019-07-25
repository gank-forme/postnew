<template>
  <div id="result" class="relative">
    <x-header >中奖纪录</x-header>

    <div class="content">
      <h1>您的中奖信息如下</h1>
      <p>Your winning information is as follows</p>
      <div v-for='(i,index) in listArr'  class="reslist">
        <img :src='"http://photo.marketservice.cn"+i.prize_img' alt="">
        <span>{{i.prize_name}}</span>
      </div>
    </div>
    <h2 class='ques'>如有疑问请联系客服QQ：2086568209</h2>

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
      listArr:[],
      img:'',
      prize_name:''
    }

  },

  methods:{
    getList(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: 'api/prize/win?openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           //that.add=res.data.data.list;
           that.listArr = res.data.data.list
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
            that.listArr=[];
          }
       })
    },
  },
  created:function(){
    this.getList();
  }
}
</script>

<style>
#result {
  min-height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/combg.png') no-repeat center;
  background-size: 100% 100%;
}
#result .content {
  min-height: 100%;
  text-align: center;
  color: #03764D;
  width: 96%;
  margin: 0 auto;
  padding-bottom: 30px;
}

#result .content h1{
  font-size: 18px;
  font-weight:600;
  padding-top: 60px;
}
#result .content p{
  font-size: 14px;
  margin-bottom: 20px;
}
#result .reslist {
  clear: both;
  overflow: hidden;
  line-height: 60px;
  text-align: left;
  width: 96%;
  margin: 0 auto;
  background-color: rgba(255,255,255,0.5);
  padding: 5px;
  margin-bottom: 10px;
}
#result .reslist img{
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: #C8DCDB;
  float: left;

}
#result .reslist span{
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}
#result .ques {
  color: #03764D;
  position: absolute;
  bottom: 10px;
  width: 100%;
  font-size: 14px;
  text-align: center;
}

</style>
