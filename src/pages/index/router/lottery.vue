<template>
    <div id='lottery' >
      <x-header ><a slot="overwrite-left"></a>抽奖<a slot="right"</a></x-header>
      <div class="wraper">
        <img class="titleImg" src="../assets/title.png" alt="">
        <lottery
            @lotteryClick="lotteryClick"
            @lotteryDone="lotteryDone"
            :lottery-start="lotteryStart"
            :lottery-prizenum="prizeNum"
            :lottery-prizeno="prizeNo"
            lottery-bg="./static/priBg.png"
            content-bg="./static/pri.png"
            pointer-bg="./static/point.png"
            :lottery-width="['100%','20%']"
        />
        <img class="titleImg titleImgs" src="../assets/logo.png" alt="">
        <p>本次奖品全部由中国邮政储蓄银行提供。</p>
        <p>如您所抽中的是实物奖品，请您再次提交真实身份和地址信息，我们将在兑奖和公示时使用，若您未真实填写并提交身份和地址信息，我们将认为您自愿放弃获得该奖项的权利。</p>
        <p>如您抽中的是奖券类奖品，请您直接按页面说明与要求点击领取使用。</p>
        <p>本次活动最终解释权归中国邮政储蓄银行所有。</p>
      </div>


      <mt-popup
        v-model="popupVisible"
        position="center">
        <div class="alerCon">
          <img class="suc" src="../assets/headlogo.png" alt="">
          <h1>恭喜您抽中邮储银行为您准备的超级丰厚奖品一份,请准确提交个人信息,以免错过奖品</h1>
          <li class="clearfix"><span class="fl">姓名</span><input class="fl" type="text" name="" value=""> </li>
          <li><span>电话</span><input type="text" name="" value=""> </li>
          <li><span>身份证号</span><input type="text" name="" value=""> </li>
          <li><span>邮寄地址</span><input type="text" name="" value=""> </li>
          <p>对于中奖用户,我们会发送中奖短信通知,请再次核对信息,确认提交</p>
          <span class="btn">确认提交</span>
        </div>
      </mt-popup>
      <app-footer></app-footer>

    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
          popupVisible:false,
          lotteryStart: 0,
          prizeNo: 1,
          prizeNum: 6,
          prizeList: ['相机', '卡', '水壶', '锅', '电视', '手机']
        }
    },
    methods: {
        lotteryClick () {
            this.lotteryStart = 1
            let randomNum = 1 + parseInt(Math.random() * this.prizeNum)
            this.prizeNo = randomNum
            //this.prizeNo = 2; //<10中  >10空
        },
        lotteryDone (res) {
            this.lotteryStart = 0;
            let index = res.prizeNo - 1;
            if(this.prizeNo<10){
              console.log(this.prizeList[index]);
            }else{
              console.log('谢谢参与');
            }
        }
    }
}

</script>

<style scoped>
#lottery .wraper{
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
}
#lottery .titleImg {
  display: block;
  width: 60%;
  margin: 10px auto;
}
#lottery {
  width: 100%;
  height: 100%;
  background:url('../assets/lotBg.png') no-repeat;
  background-size: 100% 100%;
  font-size: 13px;
}
#lottery .titleImgs {
  margin: 20px auto;
}
#lottery .alerCon {

}
#lottery .mint-popup {
  width: 77%;
  text-align: center;
  color: #fff;
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
}
#lottery .mint-popup input {
  font-size: 16px;
  display: inline-block;
  margin-top: 7px;
  margin-left: 5px;
  color: #028458;
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
</style>
