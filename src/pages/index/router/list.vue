<template>

  <div :class="list==1?'list':'rank'">

    <x-header :left-options="{backText: ''}">{{addTxt}}榜单</x-header>

    <search
    @on-change="getResult"
    @on-focus="onFocus"
    v-model="value"
    position="absolute"
    auto-scroll-to-top
    ref="search"></search>
    <div class="topBox">
      <div >
        <img class="topBg" src="../assets/images/bgSq_02.jpg" alt="">
        <span class="topTitle">{{addTxt}}榜单</span>
      </div>

    </div>

    <div class="content relative">

      <div :class="searchFlag?'listBox':'listBox sea'"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      >
        <div v-for='(i,index) in listArr' class="listItem clearfix" @click='detailFun(i.works_id)'>
          <img class="fl peo" :src="i.icon"  alt="">
          <em v-if='index<=3'><img :src="numList[index]" alt=""></em>
          <em v-else >{{i.ranking}}</em>
          <div class="fl itemInfo">
            <h1 class="clearfix">
              <span class="fl">{{i.user_name}}</span>
              <span class="fr">票数：{{i.vote}}</span>
            </h1>
          </div>
        </div>
      </div>

    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import store from '../store.js'
import num1 from '../assets/1-1.png'
import num2 from '../assets/1-2.png'
import num3 from '../assets/1-3.png'


export default {
  name: 'app',
  data () {
    return {
      page:1,
      pages:'',
      ind:1,
      searchFlag:true,
      toZan:sessionStorage.toZan,
      has_next_page:'',
      ind:1,
      ind1:1,
      act2:'fr',
      act1:'fl act',
      list:2,
      results:[],
      value: '',
      listArr:[],
      numList:[num1,num2,num3],
      addFlag:false,
      addTxt:sessionStorage.addTxt,
      add:['北京','天津','河北省','山西省','内蒙古区','辽宁省','吉林省','浙江省','安徽省','江苏省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西省','海南省','重庆','四川省','贵州省','云南省','西藏区','陕西省','甘肃省','青海省','宁夏区','新疆区','大连区','厦门','宁波','青岛','深圳']
    }
  },
  created:function(){
    this.rankList();
  },
  mounted(){
    //window.addEventListener('scroll',this.handleScroll,true);
  },
  methods:{
    loadMore() {
      let that= this;
      this.loading = true;
      setTimeout(() => {
        that.page++;
        if(that.page<4){
          that.rankList()
        };
        this.loading = false;
      }, 1000);
    },
    handleScroll(e){
      let that =this;
        //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = e.target.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight = e.target.clientHeight;
      //变量scrollHeight是滚动条的总高度
   	    	var scrollHeight = e.target.scrollHeight;
      //滚动条到底部的条件
      if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          if((location.hash.indexOf('list')>=0)){
            that.page++;
            if(that.page<=parseInt(that.pages)){
              that.rankList()
            }
          }
      }
    },
    detailFun(e){
      sessionStorage.detailId= e;
      this.$router.push({
        name:'detail'
      })
    },
    rankList(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: 'api/works/ranking?openid='+localStorage.openid1+'&page='+that.page+'&length=10&area_id='+sessionStorage.addId,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.pages=res.data.data.pages;
           that.listArr=that.listArr.concat(res.data.data.list);
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
    onFocus(){
      this.$router.push({
        name:'before'
      })
      // this.listArr=[];
    },
    blurFun(){
      this.searchFlag=true;
      this.list=2;
    },

    myZan(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'get',
         url: '/api/myhitslist?page='+that.ind1+'&openid='+localStorage.openid1,
         //data: qs.stringify(data)
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           if(that.ind1==1){
             that.listArr=res.data.data;
           }else{
             that.listArr =that.listArr.concat(res.data.data);
           }
           that.has_next_page =res.data.has_next_page;
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

    getList(e){
      this.ind=1,this.ind1=1;

      if(e==1){
        this.act1 ='fl act';
        this.act2 ='fr';
        this.page();
        this.list=2;
      }else {
        this.act2 ='fr act';
        this.act1 ='fl';
        this.myZan();
        this.list=1;
      }
    },
    getResult (val) {
      if(val==''){
        this.page();
      }else{
        let that =this;
        Indicator.open('加载中');
        this.axios({
           method: 'get',
           url: '/api/search?keyword='+that.value+'&openid='+localStorage.openid1+'&page='+that.ind
           //data: qs.stringify(data)
         }).then(function (res) {
           Indicator.close();
           if(res.data.code==1){
             that.list=1;
             that.listArr = res.data.data;
            }else {
              Indicator.close();
              Toast({
                message: res.data.msg,
                duration: 1500
              });
              that.listArr=[];
            }
         })
      }

      // console.log('on-change', val)
      // this.results = val ? getResult(this.value) : []
    },
    navFun(e){
      this.ind = e;
    },
    addFun(e){
      this.addFlag=true;
      this.addTxt =e;
    },

  },

}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style>
.weui-search-bar__cancel-btn {
  display: none !important;
}
.weui-search-bar__form,.weui-search-bar__box,.weui-search-bar__label {
  background: #fff !important;
  color: #03764D !important;
}
.weui-search-bar__box .weui-search-bar__input {
  color: #03764D !important;
}
.weui-search-bar__label {
  height: 23px;
}
.weui-search-bar {
  background: none !important;
}
.vux-search-box {
  position: fixed !important;
  z-index: 100;
  left: 0px;
  top:40px;
  /* background: linear-gradient(to bottom right, #C5E8D5 10%,#eee 30%,  #B1E0C6); */

}
.vux-search-fixed {
  background: none !important;
  top: 40px !important;
}
.list .weui-search-bar__box .weui-icon-search{
  top: 1px;
}
.list .listBox {
  width: 96%;
  margin: 0 auto;
  padding-top: 90px;
}
.list .listItem {
  color: #3E3A39;
  padding: 10px;
  margin-bottom: 10px;
}
.listBox .listItem em{
  position: absolute;
  left: -10px;
  top: 15px;
  font-size: 14px;
  font-weight: 600;
}
.listBox .listItem em img {
  width: 40px;
  margin-left: -10px;
}
.list .listItem .peo {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border:1px solid #fff;
  margin-right: 10px;
}
.list .listItem .itemInfo {
  width: 80%;
}
.list .listItem .itemInfo span {
  min-width: 50px;
  text-align: left;
  font-size: 13px;
}
.list .listItem .itemInfo span img{
  width: 10px;
  margin-right: 5px;
}
.rank .content {
  width: 94%;
  left: 50%;
  margin-left: -47%;
  margin-top: 160px;
  padding-bottom: 40px;
}
.rank .content.content1 {
  width: 94%;
  left: 50%;
  margin-left: -47%;
  margin-top: 50px;
  padding-bottom: 70px;
  position:relative;
  background-color: rgba(255, 255, 255, .5);
}

.rank .content1 h1 {
  color: #028458;
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
}
.rank,.list {
  min-height: 100%;
  clear: both;
  overflow: hidden;
}
.rank .weui-search-bar__box .weui-icon-search{
  top: 1px;
}
.rank .listBox {
  width: 97%;
  margin: 0 auto;
  padding: 3% 3% 3% 0;
  clear: both;
  overflow: hidden;
  /* background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3); */
  /* background: #e9f7f0; */
}
.rank .listBox.sea,.list .listBox.sea{
  padding-top: 50px !important;
}

.rank .listItem {
  color: #3E3A39;
  width: 84%;
  float: right;
  padding: 10px 3%;
  margin-bottom: 10px;
  position: relative;
  font-size: 13px;
  font-weight: 600;
  border-bottom:1px solid #eee;
}
.rank .listItem .peo {
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border:1px solid #fff;
  margin-right: 10px;
  margin-left: 10px;
}
.rank .listItem .itemInfo {
  width: 77%;
  margin-top: 6px;
}
.rank .listItem .itemInfo span {
  min-width: 50px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}
.rank .listItem .itemInfo span img{
  width: 10px;
  margin-right: 5px;
  margin-top: -3px;
}
.rank .index {
  position: absolute;
  left: -10%;
  top: 0px;
  width: 10%;
  text-align: center;
  color: #339864;
  font-size: 13px;
}
.rank .top {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
}
.navBox {
  position: fixed;
  top: 43px;
  width: 94%;
  padding: 0 3%;
  left: 0px;
  z-index: 100;
  margin-top: 39px;
  background: #bee3cf;
}
.navBox div{
  width: 49.5%;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  color: #339864;
  background: #abdac2;
}
.navBox div.act {
  background: #339864;
  color: #fff;
  pointer-events: none;
}
.navBox div.fl {
  border-top-right-radius: 10px;
}
.navBox div.fr {
  border-top-left-radius: 10px;
}
.weui-search-bar:before,.weui-search-bar:after {
  display: none;
}
.topBox {
  position: fixed;
  top: 45px;
  z-index: 4;
}
.topBox .topTitle{
  position: absolute;
  font-size: 22px;
  color: #fff;
  bottom: 30px;
  left: 50px;
}
span.act {
  font-size: 13px;
}
.vux-header-title span:nth-child(1){
  margin-right: 20px;
}
.content1 .addItem {
  display: block;
  width: 128px;
  height: 31px;
  font-size: 17px;
  text-align: center;
  line-height: 31px;
  color: #028458;
  border:1px solid #028458;
  border-radius: 30px;
  margin-bottom: 20px;
}
.content1 .addItem:nth-child(even){
  float: left;
  margin-left: 20px;
}
.content1 .addItem:nth-child(odd){
  float: right;
  margin-right: 20px;
}
.rank {
  background: url('../assets/combg.png') no-repeat center;
  background-size: 100% 100%;
}
</style>
