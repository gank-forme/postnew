<template>
  <div id="result">
    <div class="blank">
      <img v-if='resultIndex==2' src="../assets/err.png" alt="">
      <img v-else src="../assets/suc.png" alt="">
      <p>{{result.txt}}</p>
      <span @click='toIndex'>返回首页</span>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
export default {
  name: 'app',
  data () {
    let that = this;
    console.log(that)
    return {
      res:{
        suc:{
          img:'suc',
          txt:'提交成功，请等待审核'
        },
        err:{
          img:'err',
          txt:'提交失败，此审核已被核查'
        }
      },
      resultIndex :'',
      result:''

    }
  },
  methods:{
    toIndex:function(){
      location.replace('#/home');
    }
  },
  created:function (){
    this.resultIndex=sessionStorage.result;
    sessionStorage.result==1?this.result = this.res.suc: this.result = this.res.err;
  }

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
#result .blank {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 100px;
}
#result .blank {
  text-align: center;
  color: #333;
  font-size: 14px;
  margin-top: 100px;
}
#result .blank img {
  width: 60px;
}
#result .blank p {
  margin: 10px;
}
#result .blank span {
  display: block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: 0px auto;
  margin-top: 20px;
  border-radius: 3px;
  color: #326de0;
  border:1px solid #326de0;
}
</style>
