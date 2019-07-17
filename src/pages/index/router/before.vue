<template>
  <div id="before" class='comon'>
    <div class="header clearfix" >
      <span class="fr" @click='goback'>返回</span>
      <span class="fl">
        <input v-model='rst' @input='changeFun' placeholder="搜索照片名称或作者" type="text" name="" value="">
      </span>
    </div>
    <div v-if='ind==1' class="registBox">
      <div class="userBox">
        <h1>热门搜索</h1>
        <span class='spanItem' v-for='i in spanList' @click='getR(i.keyword)'>{{i.keyword}}</span>
      </div>
    </div>

    <div v-else class="registBox" >
      <div class="userBox userBox1">
        <span class='fl'>综合</span>
        <span class=''>作者</span>
        <span class='fr'>作品名</span>
      </div>
      <div v-for='(i,index) in listArr'>
        <div v-if='index==0' class="userBox userBox2" @click='toInfo(i.works_id)'>
          <h1>您可能在寻找</h1>
          <div class="clearfix peoBox">
            <img :src="i.icon" alt="">
            <span>作者：{{i.author_name}} {{i.area}}</span>
          </div>
        </div>
        <div class="userBox userBox3" @click='toInfo(i.works_id)'>
          <img src="../assets/big.png" alt="">
          <span>{{i.author_name}} {{i.works_name}}</span>
        </div>
      </div>
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
      rst:'',
      ind:1,
      spanList:[],
      listArr:[]
    }
  },
  methods: {
    goback(){
      history.go(-1);
    },
    toInfo(e){
      if(e==null||e==undefined){
        Toast({
          message: '该用户还未发表作品哦',
          duration: 1500
        });
      }else{
        sessionStorage.detailId =e;
        this.$router.push({
          name:'detail'
        })
      }
    },
    hotList(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/works/hsearch?openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.spanList=res.data.data.list;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },
    getR(e){
      this.ind =2;
      this.getResult(e);
    },
    getResult(e){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/works/search?openid='+localStorage.openid1+'&keyword='+e+'&length=10',
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.listArr=res.data.data.list;
           if(res.data.data.author.list.length==0){
             Toast({
               message: '没有结果',
               duration: 1500
             });
             that.ind = 1;
           }

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
    changeFun(){
      if(this.rst!=''){
        this.ind =2;
        this.getResult(this.rst);
      }else{
        this.ind=1;
      }
    }
  },
  created:function(){
    this.hotList();
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
  width: 100%;
  margin-top: 50px;
  padding-bottom: 30px;
}
#before .userBox {
  color: #fff;
  margin:0 auto;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, .5);
  clear: both;
  overflow: hidden;
  padding: 15px;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
}
#before .userBox h1 {
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  color: #3E3A39;
  margin-bottom: 15px;
}
#before .userBox .spanItem {
  padding: 3px 15px;
  background: #2F9976;
  border-radius: 20px;
  display: block;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}

#before .userBox.userBox1 {
  color: #3E3A39;
  font-size: 16px;
  font-weight: 600;
}
#before .userBox.userBox2 {
  color: #3E3A39;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
}
#before .userBox.userBox2 .peoBox {
  background: url('../assets/ri.png') no-repeat 99%;
  background-size: 10px;
  font-weight: 600;
}
#before .userBox.userBox2 img{
  width: 50px;
  height: 50px;
  background: #ddd;
  border-radius: 50px;
  display: inline-block;
  margin-right: 10px;
}
#before .userBox.userBox3 {
  color: #3E3A39;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding: 6px;
  font-size: 14px;
}
#before .userBox.userBox3 img{
  width: 15px;
}

.header input {
  width: 303px;
  font-size: 13px;
  padding: 0 10px;
  height: 26px;
  border-radius: 26px;
  color: #028458;
  text-align: center;
}

</style>
