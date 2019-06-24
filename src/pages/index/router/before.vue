<template>
  <div id="before" class='comon'>
    <app-header></app-header>
    <div class="registBox">
      <img @click='nav2Fun' src="../assets/yidao_03.jpg" alt="">
      <p>梦想加邮站系列活动之“你分享我点赞”发起我的梦想并号召好友进行点赞排名，助力最多的梦想将获得邮储银行提供的精美大奖哦~</p>
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

    }
  },
  methods: {
    nav2Fun(){//点击发起
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/createcheck?page_type=2&openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==-3){//无绑定
           that.$router.push({
             name:'login'//绑定也
           });
         }else if(res.data.code==1 || res.data.code==-4) {
            that.$router.push({
              name:'home'//发起梦想页
            });
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
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
  width: 92%;
  padding: 0 2%;
  position: absolute;
  left: 50%;
  margin-left: -48%;
  top: 45px;
  bottom: 60px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: url('../assets/logBg.png') no-repeat center;
  background-size: 100% 100%;
  color: #03764D;
  font-size: 14px;
}

#before .registBox img {
  width: 100%;
  margin-top: 2%;
  margin-bottom: 40px;

}


</style>
