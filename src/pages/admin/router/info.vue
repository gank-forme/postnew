<template>
  <div id="info">
    <h3>基本信息</h3>
    <div class="formItem">
      <ul class="list">
        <li >
          <h1><span>申报编号：</span>{{declaration}}</h1>
          <p><span>申报时间：</span>{{declareTime}}</p>
          <p><span>房东姓名：</span>{{houseOwnerXm}}</p>
          <p><span>房间地址：</span>{{houseAddress}}</p>
        </li>
      </ul>
    </div>
    <h3>护照信息</h3>
    <div class="formItem">
      <div class="listItem clearfix" v-for= '(i,index) in photoTit'>
        <div class="fl tit">
          <h1>{{i[0]}}</h1>
        </div>
        <img class="image_uploads fr" :src="i[1]" @click='showFun(i[1])' alt="" >
      </div>
    </div>

    <h3></h3>
    <div class="formItem">
      <mt-cell title="居留类型" :value="resideType" ></mt-cell>
      <mt-cell title="证明文件">
        <img class="addBtn fr" :src="resideFile" @click='showFun(resideFile)' alt="" >
      </mt-cell>
    </div>

    <h3></h3>
    <div class="formItem">
      <h1 class="lastH1">租房合同</h1>
      <div class="imgBox clearfix">
        <div class="fl" v-for = 'i in lease' >
          <img class="addBtn fr" :src='i'  @click='showFun(i)' alt="">
        </div>
      </div>
    </div>
    <p class='tips'><img src="../assets/tips.png" alt=""><span>线下核查时，请核对申报人的房间信息、护照信息、居留类型、租房合同与实际是否一致。</span></p>

    <div class="wrap" v-if='showFlag' @click='delFun'>

    </div>
    <div class="preImg" v-if='showFlag'>
      <img :src="showImg" alt="">
    </div>

    <!-- 选择框 -->
    <mt-popup
      @visible-change="handleVisibleChange"
      v-model="popupVisible"
      v-roll:visible='[popupVisible, pVisible]'
      position="bottom">

      <h1>{{options.tit}}</h1>
      <mt-radio
        @change='radioFun'
        v-model="values['values'+values_index]"
        :options="options.arr">
      </mt-radio>

      <p class="btn" @click='popFun'>取消 Cancel</p>
    </mt-popup>

    <div class="footer2 clearfix">
      <mt-button class="fl" type="primary" size="normal" id='fromNo' @click.native='formFun(1)'>不通过</mt-button>
      <mt-button class="fr" type="primary" size="normal" id='fromYes' @click.native='formFun(2)'>通过</mt-button>
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
      declaration: store.state.infoData.declaration,
      declareId: store.state.infoData.declareId,
      declareTime: store.state.infoData.declareTime,
      houseAddress: store.state.infoData.houseAddress,
      houseOwnerXm: store.state.infoData.houseOwnerXm,
      lease: store.state.infoData.lease,
      passportImg1: store.state.infoData.passportImg1,
      passportImg2: store.state.infoData.passportImg2,
      passportImg3: store.state.infoData.passportImg3,
      resideFile: store.state.infoData.resideFile,
      resideType: store.state.infoData.resideType,

      phone1:'',
      name:'',
      phone2:'',
      showFlag:false,
      showImg:'',
      subFlag:false,
      popupVisible:false,
      pVisible:false,
      delFlag:false,
      values_index:0,
      values:{
        values0:"",
        values1:""
      },
      label:{
        label0:'请选择',
        label1:'请选择'
      },
      options: {
        tit:'',
        arr:[]
      },
      options0: {
        tit:'请选择居留类型  Residence type',
        arr:[
          {
            label: '工作类居留 Jobs',
            value: '1'
          },
          {
            label: '学习类居留 Learning',
            value: '2'
          },
          {
            label: '记者类居留 Reporter',
            value: '3'
          },
          {
            label: '团聚类居留 Reunion',
            value: '4'
          },
          {
            label: '私人事务类居留 Personal issue',
            value: '5'
          }
        ]
      },
      options1: {
        tit:'请选择关系  Ralationship',
        arr:[
          {
            label: '父母 Parents',
            value: '1'
          },
          {
            label: '夫妻 Couple',
            value: '2'
          },
          {
            label: '朋友 Friend',
            value: '3'
          },
          {
            label: '老师 Teacher',
            value: '4'
          },
          {
            label: '亲人 Relative',
            value: '5'
          },
          {
            label: '同事 Colleague',
            value: '6'
          },
          {
            label: '其他 Other',
            value: '7'
          }
        ]
      },
      photoTit:[
        ['护照主页',''],
        ['有效签证页', ''],
        ['入境章页','']
      ],

      picFunIndex:0,
      images:[],
      index:-1,
      uploadData:{
        images0:[],
        index0:-1,

        images1:[],
        index1:-1,

        images2:[],
        index2:-1,

        images3:[],
        index3:-1,

        images4:[],
        index4:-1,

        images5:[],
        index5:-1,

        images6:[],
        index6:-1,

        images7:[],
        index7:-1
      }
    }
  },
  computed:{
    // 预览图片路径
    preImages(){
      return this.uploadData['images'+this.picFunIndex].map(v=>{return v.src});
    },
  },
  created:function(){
    let that =this;
    that.photoTit[0][1]=store.state.infoData.passportImg1;
    that.photoTit[1][1]=store.state.infoData.passportImg2;
    that.photoTit[2][1]=store.state.infoData.passportImg3;
  },
  methods:{
    htmlScroll(){
      this.timer = setTimeout(() => {
        window.scrollTo(0,0)
        // 间隔设为10，减少页面失去焦点定时器的突兀感，
      },10)
    },
    handleVisibleChange (isVisible) {
        this.pVisible = isVisible;
    },
    getList(e){
      e==0?this.options = this.options0:this.options = this.options1;
       this.values_index=e;
       this.popupVisible=true;
    },
    radioFun(){
      for(var i=0;i<this.options.arr.length;i++){
        if(this.values['values'+this.values_index]==this.options.arr[i].value){
          this.label['label'+this.values_index]=this.options.arr[i].label
        }
      }
      this.popupVisible=false;
      this.checkForm();
    },
    checkForm(){
      if(this.label1=='请选择'||this.phone2==''||this.name==''||this.phone1==''||this.uploadData['images0'].length==0 || this.uploadData['images1'].length==0 || this.uploadData['images2'].length==0 ||this.label0=='请选择' ||this.uploadData['images3'].length==0){

        this.subFlag = false;
      }else{
        this.subFlag = true;
      }

    },
    commitResult(){
      let that =this;
      Indicator.open('加载中');
      this.axios({
         method: 'post',
         url: '/foreignersDwell/checkDeclare/h5/commitResult',
         data: {
           declareId:sessionStorage.declareId,
           lgyUserName:sessionStorage.userName,
           checkStatus:2,
         }
       }).then(function (res) {
         Indicator.close();
         if(res.data.error==0){
           sessionStorage.result=1
         }else {
           sessionStorage.result=2
         }
         that.$router.push({
           name:'result'
         })
       })
    },
    formFun(e){
      let that =this;
      if(e==1){
        MessageBox({
         title: '温馨提示',
         message: '确认提交审核结果？',
         showCancelButton: true,
         cancelButtonText:'取消',
         confirmButtonText:'确定'
       }).then(action => { 
         if (action == 'confirm') {     //确认的回调
            that.commitResult();
         }
       });;
     }else{
       this.$router.push({
         name:'upload'
       })
     }
    },
    picFun(e){
      this.picFunIndex=e;
      this.images=this.uploadData['images'+this.picFunIndex];
    },

    popFun(){
      this.popupVisible=false;
    },

    /**
     *  绑定函数 -- 选择图片
     */
    bindtap_chooseImages(res){
      this.checkForm();
      if (Array.isArray(res)) {
        //this.images = this.images.concat(res);
        this.uploadData['images'+this.picFunIndex] = this.uploadData['images'+this.picFunIndex].concat(res);
        this.axios.post('/uploadBase64',{
          fileBase64:this.uploadData['images'+this.picFunIndex],
          saveDir:'test/2019/04/26/'
        } )
         .then(function (res) {
           console.log(res)
         })
         .catch(function (error) {
           console.log(error.message);
         });
        //this.bindtap_upload();
      }else {
        console.log(res);
      }
    },
    /**
     *  绑定函数 -- 删除图片
     */
    bindtap_delete(){
      this.images = this.images.filter((v,i) => {
        return this.index!=i;
      })
    },
    /**
     *  绑定函数 -- 预览图片
     */
    bingtap_preview(i,j){
      this.delFlag = true;
      this.picFunIndex=i;
       this.uploadData['index'+i] = j;
    },
    /**
     *  绑定函数 -- 取消预览
     */
    bingtap_hiddenImg() {
      this.delFlag = false;
      this.uploadData['index'+this.picFunIndex] = -1;
    },
    /**
     *  绑定函数 -- 上传图片
     */

     delFun(){
       this.showFlag=false;
     },
     showFun (e){
       this.showFlag=true;
       this.showImg =e;
     }
  },

}
</script>

<style>
#info .formItem .tit {
  width: 140px;
  margin-bottom: 10px;
  margin-top: 20px;
}
#info .formItem .tit h1,#info .mint-cell-text {
  color: #666;
  font-size: 16px;
  font-weight: 700;
}
#info .formItem .tit p,#info .mint-cell-label {
  color: #3F3F3F;
  font-size: 14px;
}
#info .mint-cell-wrapper {
  border:none;
}
#info h3 {
  color: #999;
  font-size: 12px;
  padding: 10px 10px;
}
#info .formItem {
  background: #fff;

}
#info .formItem .listItem {
  padding: 15px 15px 0 15px;
}
#info .formItem .listItem:last-child {
  padding-bottom: 15px;
}
#info .addBtn {
  width: 60px;
  height: 60px;
}
#info .mint-cell input{
  text-align: right;
  font-size: 16px;
}
#info .mint-cell .addBtn{
  margin:10px;
}
#info .lastH1 {
  padding: 15px 15px 0 15px;
  font-size: 16px;
}
#info .lastP {
  padding: 0 15px 15px 15px;
  font-size: 14px;
  color: #3F3F3F;
}
#info .imgBox {
  padding-left: 15px;
  padding-bottom: 15px;
}
#info .imgBox .fl{
  margin-right: 15px;
}

.image_uploads{
  height: 100px;
  width: 180px;
  object-fit: contain;
}
#info .footer2 {
  padding: 10px 15px;
  background: #fff;
  margin-top: 80px;
}
#info #fromBtn.opa {
  pointer-events: none;
  opacity: 0.5;
}
#info .mint-popup {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#info .mint-popup h1 {
  font-size: 14px;
  color: #999;
  padding: 10px;
}
#info .mint-popup .btn {
  font-size: 18px;
  color: #0076FF;
  text-align: center;
  padding: 10px;
}
#info .mint-popup .mint-cell {
  padding: 0px;
}
#info .shade .image img {
  object-fit: contain;
  height: 100%;
}
.shade .top-view p {
  display: none;
}
#info .del {
  position: fixed;
  right: 20px;
  top: 120px;
  width: 30px;
  z-index: 300;
}
.mint-msgbox-btn {
  font-size: 13px;
}
#info .list li {
  padding: 10px;
  background: #fff;
  font-size: 15px;
  color: #666;
}
#info .list li h1 {
  font-size: 15px;
  clear: both;
  overflow:hidden;
}
#info .list li p {
  margin-top: 5px;
}
#info .footer2 button {
  width: 48%;
}
#info .tips {
  color: #EE523D;
  font-size: 12px;
  padding: 10px;
}
#info .tips img {
  float: left;
  margin-right: 5px;
  margin-top: 3px;
}
#fromNo {
  background: #e2431e;
}
#fromYes {
  background: #326de0;
}
#info .wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.9;
  top: 0px;
  z-index: 1000;
}
#info .preImg {
  width: 90%;
  position: fixed;
  top: 10%;
  left: 50%;
  margin-left: -45%;
  z-index: 10001
}
#info .preImg img {
  width: 100%;
}
</style>
