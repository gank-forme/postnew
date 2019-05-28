<template>
  <div id="admin">
    <ul v-if='checkList.length>0' class="list">
      <li v-for='i in checkList' :key='i.recheckId' :data-id='i.recheckId'>
        <h1><span>申报编号：</span>{{i.declaration}}<em :class="i.checkStatus=='审核被拒'?'fr color3':(i.checkStatus=='已完成'?'fr color2':'fr color1')">{{i.checkStatus}}</em></h1>
        <p><span>申报时间：</span>{{i.declareTime}}</p>
        <p><span>核查时间：</span>{{i.checkTime}}</p>
        <p><span>房间地址：</span>{{i.houseAddress}}</p>
      </li>
    </ul>
    <div v-else class="blank">
      <img src="../assets/blank.png" alt="">
      <p>暂无核查记录</p>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import store from '../store.js'

export default {
  name: 'app',
  data () {
    return {
      blank:true,
      checkList:store.state.listData,
    }
  },
  created:function(){

  },
  methods:{
    outFun:function(){
       MessageBox({
        title: '温馨提示',
        message: '确认退出登录吗？',
        showCancelButton: true,
        cancelButtonText:'取消',
        confirmButtonText:'确定'
      });
    }

  },

}
</script>

<style>
#admin .list li {
  padding: 10px;
  background: #fff;
  margin-top: 10px;
  font-size: 14px;
  color: #151515;
}
#admin .list li h1 {
  clear: both;
  font-size: 14px;
  overflow:hidden;
}
#admin .list li span {
  color: #999;
}
#admin .list li p {
  margin-top: 5px;
}
#admin .list li em.color1 {
  color: #18A9A2;
}
#admin .list li em.color2 {
  color: #666;
}
#admin .list li em.color3 {
  color: #EE523D;
}
.blank {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 100px;
}
</style>
