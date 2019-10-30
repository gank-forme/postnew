<template>
    <div id='lottery' >
      <x-header ><a slot="overwrite-left"></a>抽奖<a slot="right"</a></x-header>
      <div class="wraper">
        <img class="titleImg" src="../assets/title.png" alt="">
        <lottery
            @lotteryClick="getPrize"
            @lotteryDone="lotteryDone"
            :lottery-start="lotteryStart"
            :lottery-prizenum="prizeNum"
            :lottery-prizeno="prizeNo"
            :lottery-img='prizeList1'
            lottery-bg="./static/priBg.png"
            content-bg="./static/priBg.png"
            pointer-bg="./static/point.png"
            :lottery-width="['100%','20%']"
        />
        <img class="titleImg titleImgs" src="../assets/logo.png" alt="">
        <p>本次奖品全部由中国邮政储蓄银行提供</p>
        <p>如您所抽中的是实物奖品，请您再次提交真实身份和地址信息，我们将在兑奖和公示时使用，若您未真实填写并提交身份和地址</p>
        <p>我们将认为您自愿放弃获得该奖项的权利</p>
        <p>如您抽中的是奖券类奖品，请您直接按页面说明点击领取使用</p>
        <h3>本次活动最终解释权归中国邮政储蓄银行所有</h3>
      </div>


      <mt-popup
      :closeOnClickModal="false"
        v-model="popupVisible"
        position="center">
        <div class="alerCon">
          <img class="suc" src="../assets/headlogo.png" alt="">
          <h1>恭喜您抽中邮储银行为您准备的超级丰厚奖品一份,请准确提交个人信息,以免错过奖品</h1>
          <li class="clearfix"><span >姓名</span><input @blur='inputBlur'  v-model='rName' type="text" name="" value=""> </li>
          <li><span>电话</span><input @blur='inputBlur'  type="number" maxlength="11" name="" v-model='rPhone' value=""> </li>
          <li><span>身份证号</span><input @blur='inputBlur'  type="number" maxlength="18" name="" v-model='rCard' value=""> </li>
          <li><span>邮寄地址</span><input @blur='inputBlur'  type="text" name="" v-model='rAdd' value=""> </li>
          <p>对于中奖用户,我们会发送中奖短信通知,请再次核对信息,确认提交</p>
          <span class="btn" @click='toNext'>确认提交</span>
        </div>
      </mt-popup>

      <mt-popup
      :closeOnClickModal="false"
        v-model="show1"
        position="center">
        <div class="alerCon1">
          <div class="preImg" >
            <img src="../assets/Succ.png" alt="">
            <h1>您已成功提交</h1>
            <img @click = 'xLog1' src="../assets/gb1.png" alt="">
          </div>
        </div>
      </mt-popup>

      <mt-popup
        :closeOnClickModal="false"
        v-model="show2"
        position="center">
        <div class="alerCon2">
          <div class="preImg" >
            <img class='priImg' :src="priImg" alt="">
            <h1>恭喜您！ <br>获得{{priName}}</h1>
            <img v-if='prizeNo==2' class="gb" @click = 'xLog2' src="../assets/gb1.png" alt="">
            <span v-else class="btn" @click='ling'>立即领取</span>
          </div>
        </div>
      </mt-popup>


      <app-footer></app-footer>

    </div>
</template>

<script>
import {TransferDomDirective as TransferDom} from 'vux'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
import store from '../store.js'

export default {
    directives: {
      TransferDom
    },
    name: 'app',
    data () {
        return {
          clc:false,
          rName:'',rPhone:'',rCard:'',rAdd:'',
          show2:false,
          show1:false,
          popupVisible:false,
          lotteryStart: 0,
          prizeNo: 1,
          prizeNum: 6,
          prizeList1:[],
          prizeList: [],
          priName:'',
          priImg:''
        }
    },
    created(){
      this.getList();
    },
    methods: {
      inputBlur(){
        setTimeout(() => {
          window.scrollTo(0,0)
          // 间隔设为10，减少页面失去焦点定时器的突兀感，
        },100)
      },
      getList(){
        let that =this;
        Indicator.open('加载中');
        this.axios({
           method: 'get',
           url: 'api/prize/list?openid='+localStorage.openid3,
           //data: qs.stringify(data)
         }).then(function (res) {
           Indicator.close();
           if(res.data.code==1){
             //that.add=res.data.data.list;
             for(var i=0;i<res.data.data.list.length;i++){
               that.prizeList1.push(res.data.data.list[i].img);
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
      getPrize(){
        if(sessionStorage.draw_limit>0){
          if(!this.clc){
            this.clc=true;
            let that =this;
            Indicator.open('加载中');
            this.axios({
               method: 'post',
               url: 'api/prize/draw',
               data: {
                 openid:localStorage.openid3
               }
             }).then(function (res) {
               Indicator.close();
               if(res.data.code==1){
                 that.lotteryStart = 1
                 // let randomNum = 1 + parseInt(Math.random() * this.prizeNum)
                 // this.prizeNo = randomNum
                 let pri = {
                   1:1,
                   6:2,
                   5:3,
                   4:4,
                   3:5,
                   2:6
                 }
                 that.prizeNo = pri[res.data.data.id]; //<10中  >10空
                 that.priImg = res.data.data.img;
                 that.priName = res.data.data.name;
                 sessionStorage.priId = res.data.data.record_id;
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
        }else{
          Toast({
            message: '你的抽奖次数用光啦！',
            duration: 1500
          });
        }
      },

        lotteryDone (res) {
          let that =this;
          this.lotteryStart = 0;
          let index = res.prizeNo - 1;

          this.show2=true;
          this.clc=false;
          if(this.prizeNo<10){
            //that.popupVisible=true;
          }else{

          }
        },
        toNext(){
          let that =this;
          Indicator.open('加载中');
          this.axios({
             method: 'put',
             url: 'api/prize/receive',
             data: {
               openid:localStorage.openid3,
               id	:sessionStorage.priId,
               receive_name:that.rName,
               receive_phone:that.rPhone,
               certificate:that.rCard,
               address:that.rAdd
             }
           }).then(function (res) {
             Indicator.close();
             if(res.data.code==1){
               that.popupVisible=false;
               that.show1 =true;
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
        xLog1(){
          this.show1=false;
        },
        xLog2(){
          this.show2=false;
        },
        ling(){
          this.show2=false;
          this.popupVisible=true;
        }
    }
}

</script>

<style scoped>
#lottery .wraper{
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
}
#lottery .titleImg {
  display: block;
  width: 60%;
  margin: 10px auto;
}
#lottery {
  width: 100%;
  background:url('../assets/lotBg.png') no-repeat;
  background-size: 100% 100%;
  font-size: 13px;
  min-height: 100%;
}
#lottery .titleImgs {
  margin: 20px auto;
}
#lottery .mint-popup {
  width: 90%;
  text-align: center;
  color: #fff;
  margin-top: -50%;
  background: none !important;
}
#lottery .mint-popup h1{
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0;
}
#lottery .mint-popup li{
  font-size: 17px;
  height: 30px;
  line-height: 30px;
  background: #fff;
  opacity: 0.9;
  border-radius: 30px;
  color: #028458;
  text-align: left;
  padding: 0 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}
#lottery .mint-popup input {
  font-size: 16px;
  display: inline-block;
  margin-left: 5px;
  color: #028458;
  vertical-align: text-bottom;
  float: left;
}
#lottery .mint-popup li span {
  width: 80px;
  text-align: center;
  float: left;
  vertical-align: super;
}
#lottery .mint-popup p {
  font-size: 13px;
}
#lottery .alerCon span.btn {
  display: block;
  width: 120px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  padding: 5px 0;
  color: #03764D;
  margin: 30px auto;
  background: #fff;
  border-radius: 30px;
}
#lottery .alerCon {
  margin-top: 300px;
}
#lottery .alerCon1 img {
  width: 40px;
}
#lottery .alerCon1 h1 {
  margin-bottom: 180px;
}
#lottery .alerCon1 img {
  width: 40px;
}
#lottery .alerCon2 .priImg {
  width: 80px;
}
#lottery .alerCon2 .gb {
  width: 30px;
  margin-top: 100px;
}
#lottery .alerCon2 .lq {
  width: 30px;

}
#lottery .alerCon2 span.btn {
  display: block;
  width: 100px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  padding: 3px 0;
  color: #03764D;
  margin: 30px auto;
  background: #fff;
  border-radius: 30px;
  margin-top: 100px;
}
.mint-indicator-wrapper{
  z-index: 2201 !important;
}
.mint-indicator-mask {
  z-index: 2200 !important;
}
.wraper p {
  text-align: center;
  color: #333;
  font-size: 12px;
}
.wraper h3 {
  text-align: center;
  color: #666;
  font-size: 12px;
  padding-top: 10px;
}

</style>
