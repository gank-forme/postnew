<template>

  <div id="list">
    <app-header></app-header>
    <div class="content relative">
      <search
      @result-click="resultClick"
      @on-change="getResult"

      v-model="value"
      position="absolute"
      auto-scroll-to-top
      ref="search"></search>
      <div class="listBox">
        <div v-for='i in 10' class="listItem clearfix" @click='toInfo'>
          <img class="fl peo" src="../assets/suc.png" alt="">
          <div class="fl itemInfo">
            <h1 class="clearfix">
              <span class="fl">Mark chat</span>
              <span class="fr"><img src="../assets/zan.png" alt="">1233</span>
            </h1>
            <h1 class="clearfix">
              <span class="fl"><img src="../assets/location.png" alt="">Hangzhou</span>
              <span class="fr"><img src="../assets/nav4.png" alt="">12</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import qs from 'qs'
import store from '../store.js'

export default {
  name: 'app',
  data () {
    return {
      results:[],
      value: ''
    }
  },
  created:function(){

  },
  methods:{
    getResult (val) {
      // console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    resultClick(){

    },
    toInfo(){
      this.$router.push({
        name:'info'
      })
    }

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
#list {
  margin-top: 33px;
  background: linear-gradient(to bottom right, #C5E8D5 10%,#eee 30%,  #B1E0C6);
  min-height: 100%;
}
.weui-search-bar__form,.weui-search-bar__box,.weui-search-bar__label {
  background: #03764D !important;
  color: #fff !important;
}
.weui-search-bar__box .weui-search-bar__input {
  color: #fff !important;
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
  background: #fff;
}
.vux-search-fixed {
  top: 40px !important;
}
#list .weui-search-bar__box .weui-icon-search{
  top: 1px;
}
#list .listBox {
  width: 96%;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
  background: linear-gradient(to bottom right, #a5dcc0 10%,#eee, #98d4b3);
}
.listItem {
  background: linear-gradient( to right,#A2D3B9 10%,#339864 30%, #339864);
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}
.listItem .peo {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border:1px solid #fff;
  margin-right: 10px;
}
.listItem .itemInfo {
  width: 80%;
}
.listItem .itemInfo span {
  min-width: 50px;
  text-align: left;
  font-size: 13px;
}
.listItem .itemInfo span img{
  width: 10px;
  margin-right: 5px;
}
.content {
  width: 94%;
  margin: 0 auto;
}
</style>
