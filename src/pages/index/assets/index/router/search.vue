<template>
  <div>
    <mt-search id="search1"
      cancel-text="取消"
      placeholder="请输入要咨询的问题"
    	v-model="value"
      :result = 'filterResult'
      >
      <h1 class="title">搜索结果</h1>
      <mt-cell
        v-for="item in tem"
        :key='item.question'
        :title="item.question"
        is-link
        to="/info"
        @click.native="toInfo(item)"
        >
      </mt-cell>
    </mt-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value:'',
      tem:[],
      info:[],
      currSearchList:[],
      questionList: [
      {
        name: '报警问题',
        tabName:'报警问题',
        key: 'tab1',
        detail: [
          {
            question: '我能使用哪种报警方式？',
            answer: '在开启定位、录音、摄像头授权的情况下图文报警、紧急求助都可以使用。'
          },
          {
            question: '使用图文报警时应该注意什么？',
            answer: '使用图文报警时，在案情描述里要尽量说明案情发生的经过、涉及到的人员、以及结果。如实反映事件的实际情况，不夸大，不扭曲，不提供虚假信息。'
          },
          {
            question: '使用紧急求助时应该注意什么？',
            answer: '使用紧急求助时，一定要开启定位权限和录音权限，否则您无法使用紧急求助功能。如果要在三分钟之内停止录音，请务必要结束新昌110 APP的运行。'
          },
          {
            question: '为什么我会报警失败？',
            answer: '如果您未开启定位权限、录音权限、摄像头权限、网络状况不佳、未登录APP时都会导致报警失败。'
          },
          {
            question: '没有实名认证的情况下可以报警吗？',
            answer: '没有实名认证无法报警，必须要实名认证才可以使用报警功能。'
          }
        ]
      },
      {
        name: '挪车问题',
        tabName: '挪车',
        key: 'tab2',
        detail: [
          {
            question: '挪车的使用范围？',
            answer: '仅支持浙江省内车牌以及在掌上110 APP中绑定的外省车牌。'
          },
          {
            question: '能对教练车、挂车发起挪车吗？',
            answer: '可以，在挪车服务中选择黄色车牌，输入车牌中的字母与数字，汉字无需输入。'
          },
          {
            question: '为何会无法定位？',
            answer: '检查网络状态及定位权限是否开启。'
          },
          {
            question: '为何提示无法联系上车主？',
            answer: '对方车主的电话号码登记有误或已关机，建议另想办法挪车。'
          },
          {
            question: '系统提示已联系上车主，是否就一定会来挪车？',
            answer: '该提示表示车主已收到挪车短信并已接听挪车电话，建议发起人在对方车辆旁等待车主到来，若车主到达后没有看到发起人，很有可能会觉得不必挪车。若车主长时间未到达挪车，可能是车主不方便前往挪车，建议发起人另想办法挪车。'
          },
          {
            question: '为何会无法对需挪车辆发起挪车？',
            answer: '该车辆已达到一天的被挪上限，一个账号对同一辆车最多每天三次。建议放弃发起对该车的挪车，车主可能并不方便前往挪车。'
          },
          {
            question: '是否可以随意对车辆发起挪车？',
            answer: '不可以，若涉及虚假发起挪车，一经发现，永久封号处理，严重者移交警方处理。'
          },
        ]
      },
      {
        name: '消息问题',
        tabName: '消息',
        key: 'tab3',
        detail: [
          {
            question: '我可以给警员发送消息吗？',
            answer: '您是无法主动跟警员聊天的。在警员跟您发起聊天后，您才可以给警员发送消息。'
          },
          {
            question: '为什么我不能给警员发送消息了？',
            answer: '对话结束后，您将无法继续跟警员聊天。如果有需求，可以再次发起报警或者拨打110。'
          },
          {
            question: '为什么视频发送失败？',
            answer: '拍摄的视频和从相册中选择的视频的时长都必须在15秒以内。超出15秒的视频无法发送。并且每次只能上传一个视频。'
          },
          {
            question: '消息可以删除吗？',
            answer: '可以删除。选择某条消息向左滑动，点击“删除”，再点击“确定删除”后即可删除本条消息。删除的消息不可恢复。'
          },
        ]
      },
      {
        name: '帐号问题 ',
        tabName: '帐号',
        key: 'tab4',
        detail: [
          {
            question: '怎么修改手机号？',
            answer: '在小程序中，点击【我的】—【手机号修改】，输入新的未注册过的手机号，将新手机号上收到的验证码正确输入后，点击“修改”，即可完成修改。'
          }
        ]
      },
      {
        name: '其他 ',
        tabName: '其他',
        key: 'tab5',
        detail:[
          {
            question: '怎么不能使用身份验证了？',
            answer: '未实名认证的用户有且只有三次可以使用身份验证功能的机会；已实名认证的用户每天可以使用三次身份验证功能。'
          },
          {
            question: '身份验证的查询结果准确吗？',
            answer: '身份验证功能用于验证所填身份信息是否属实，查询所得结果仅供参考。'
          },
          {
            question: '怎么不能使用诚信档案了？',
            answer: '未实名认证的用户每天只有三次使用诚信档案的机会。如果想要获得更多的机会，请前去实名认证，结束次数限制。'
          },
          {
            question: '诚信档案的查询结果准确吗？',
            answer: '诚信档案的查询结果由浙江省高级人民法院、浙江省公安厅提供，所以可以保证查询结果的准确性。'
          },
          {
            question: '诚信档案可以查什么？',
            answer: '诚信档案可以查个人的失信记录、未履行记录和限制记录。'
          },
          {
            question: '开锁公司都是公安备案的吗？',
            answer: 'APP内显示的所有开锁公司都是经过公安备案的，所以您可以放心找开锁公司帮您解决问题。'
          },
          {
            question: '社会救援是公益的吗？',
            answer: '红十字会救援队和陆野救援队都是公益的。不仅负责县内的救援行动，也积极参加省内外的救援行动。'
          },
          {
            question: '我报警之后多久警员才会处理？',
            answer: '警员会按照报警顺序处理警单。您可以在报警记录中查看报警状态。“已受理”代表警员已经查看了您的报警信息，并且已经在处理。“已处置”代表本次报警已经处理完毕。'
          }
        ]
      }
    ]
    }
  },
  methods: {
    toInfo(e){
    //  console.log(e);
      this.$router.push({
        name:"info",
        params:{
          detail:e
        }
      })
    }
  },
  computed:{
    filterResult() {
      let tem =[];
      let  that =this;
      for(let v of this.questionList){
        for (let i =0;i<v.detail.length;i++){
          let { question, answer } = v.detail[i];
          if (question.indexOf(that.value) != -1) {
            tem.push({
              question,
              answer
            })
          }
        }
      }
      console.log(tem);

      this.tem=tem;
      //return this.tem.filter(value => new RegExp(this.value, 'i').test(value));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color:#f3f4f8;
}
.mint-search {
  overflow: initial;
  margin: 10px;
}
.mint-searchbar {
  background: #fff;
  border-radius: 20px;
  box-shadow:0 2px 6px 1px #D3DCD8;
  padding: 2px 10px;
}
.mint-searchbar-inner .mintui-search {
  font-size: 20px;
}

input {
  font-size: 16px;
}
.mint-search-list-warp {
  width: 85%;
  margin: 0 auto;
  background: #ffff;
  padding: 5%;
  box-shadow:0 2px 6px 1px #D3DCD8;
  margin-top: 20px;
}
.result_box h1 {
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.result_box p {
  font-size: 14px;
}
</style>
