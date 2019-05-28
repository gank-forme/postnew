<template>
  <div id="main">
    <div class="userBox clearfix">
      <img class="fl" src="../assets/userImg.png" alt="">
      <div class="fl txtFl">
        <h1>{{name}}</h1>
      </div>
    </div>
    <mt-cell title="我的核查记录" @click.native='listFun'>
      <img class='cell_logo' slot="icon" src="../assets/rec.png" width="20">
    </mt-cell>
    <footer><span @click='exitFun'>退出登录</span></footer>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator} from 'mint-ui';
import store from '../store.js'
import qs from 'qs'


export default {
  name: 'app',
  data () {
    return {
      name:sessionStorage.name
    }
  },

  methods:{
    exitFun(){
      let that =this;
      MessageBox({
       title: '温馨提示',
       message: '确认退出登录吗？',
       showCancelButton: true,
       cancelButtonText:'取消',
       confirmButtonText:'确定'
     }).then(action => { 
       if (action == 'confirm') {     //确认的回调
          location.href = 'http://41.204.5.87:18998/foreignersDwell/log/h5/out';
          // Indicator.open('加载中');
          // this.axios({
          //    method: 'post',
          //    url: ''
          //  }).then(function (res) {
          //    Indicator.close();
          //    // if(res.data.error==0){
          //    //  that.$router.push({
          //    //    name:'login'
          //    //  })
          //    // }else {
          //    //   Toast({
          //    //     message: res.data.message,
          //    //     position: 'bottom',
          //    //     duration: 1500
          //    //   });
          //    // }
          //  })
       }
     });;
   },

   listFun:function(){
     let that =this;
     Indicator.open('加载中');
     this.axios({
        method: 'get',
        url: '/foreignersDwell/checkDeclare/h5/getRecheckList?lgyUserName='+sessionStorage.userName,
      }).then(function (res) {
        Indicator.close();
        if(res.data.error==0){
          store.commit('listFun',res.data.data.checkList);
          that.$router.push({
            name:"list"
            // path:'/home'
          });
        }else {
          Toast({
            message: res.data.message,
            position: 'bottom',
            duration: 1500
          });
        }
      })

   },
 }

}
</script>

<style>
#main .userBox {
  padding: 20px;
  background: #fff;
  margin: 10px 0;
}
#main .userBox img.fl {
  width: 56px;
  margin-right: 10px;
}
#main .txtFl h1{
  font-size: 18px;
  color: #333;
  font-weight: 700;
  margin-top: 15px;
}
#main .txtFl p{
  font-size: 14px;
  color: #3f3f3f;
}
#main .cell_logo {
  margin-right: 10px;
}
#main .mint-cell-wrapper {
  color: #666;
}
#main footer {
  width: 100%;
  color: #EE523D ;
  font-size: 16px;
  text-align: center;
  position: fixed;
  bottom: 20px;
}
</style>
