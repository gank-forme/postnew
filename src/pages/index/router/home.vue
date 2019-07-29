<template>
  <div id="passport">
    <x-header ><a @click='goBack' slot="overwrite-left">取消</a><a slot="right" @click='xLog1'>发布</a></x-header>

    <div class="con relative">
      <div class="imgBox">
        <!-- <div class="loadCon" v-if='uploadData["images0"].length==0'>
          <img src="../assets/down.png" alt="">
          <p>请在此上传您的 <br> 梦想加邮站详情截图 </p>
        </div> -->
        <div v-if="!avatar" class="addBtn">
          <input    type="file" name="avatar" accept="image/*"  @change="chooseImg($event)" >
        </div>
        <img v-else class="addBtn fr" :src="avatar" alt="" >
        <p class="addTxt" v-if="!avatar">请上传您的作品</p>

      </div>
      <p>1：上传照片小于20M，照片格式不限。
      <p>2：含有暴力、色情、宗教禁忌等法律不允许内容的作品不予参评。</p>
      <p>3：凡在其他各类摄影大赛中已经获奖的作品(含收藏作品)，谢绝再次参评。</p>
      <p>4：本次活动所有参赛作品,邮储银行作为主办方,对所有参赛作品拥有商业使用权，作者享有署名权!</p>
      <div class="inpBox">
        <input type="text" maxlength="8" v-model='titles' placeholder="请为照片命名  " name="" value="">
        <p>照片命名长度控制在8个汉字内</p>
      </div>
      <div class="textareaBox inpBox">
        <textarea maxlength="500" @blur='inputBlur' id='textarea' v-model='txt1' placeholder="请为照片添加描述 " name="name"></textarea>
        <p>照片内容表述在500个汉字内</p>
      </div>
      <div class="xlog1" @click='xLog1'>
        确认发布
      </div>


    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show1" class="dialog-demo" :hide-on-blur='true'>
        <div class="preImg" >
          <img src="../assets/Succ.png" alt="">
          <h1>您已成功上传<br>在审核成功后会在页面显示</h1>
          <p>You have successfully uploaded <br>After the audit is successful, it will be displayed on the page.  </p>
          <img v-if='lotFlag==false' @click = 'xLog3' src="../assets/gb1.png" alt="">
          <img v-else  style="width:100px;" @click = 'xLog2' src="../assets/lot.png" alt="">
        </div>
      </x-dialog>
    </div>



    <!-- 图片预览 -->
    <image-preview
      style="z-index:200"
      :images="preImages"
      v-model="uploadData['index'+picFunIndex]"
      :numIsShow="false"
      :deleteIsShow="false"
      @click.native='bingtap_hiddenImg()'
    />

    <mt-popup
      v-model="popupVisible"
      position="center">
      <div class="alerCon">
        <img class="suc" src="../assets/Succ.png" alt="">
        <h1>您已成功上传<br>在审核成功后会在页面显示</h1>
        <h2>You have successfully uploaded <br>After the audit is successful, it will be displayed on the page.</h2>
        <img style="width:30px;margin-top:30px;" v-if='lotFlag==false' @click = 'goBack' src="../assets/gb1.png" alt="">
        <span v-if='lotFlag==true' @click = 'xLog2'>立即抽奖</span>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import store from '../store.js'
import qs from 'qs'
import axios from 'axios'
import { MessageBox,Toast,Indicator } from 'mint-ui'
import {TransferDomDirective as TransferDom} from 'vux'

var cos;
export default {
  directives: {
    TransferDom
  },
  name: 'app',
  components: {

  },
  data () {
    return {
      avatar:'',
      lotFlag:false,
      titles:'',
      popupVisible:false,
      imgUrl:'',
      txt1:'',
      show1:false,
      show2:false,
      pVisible:false,
      subFlag:false,
      isDone:1,
      title:'',
      values_index:0,
      values:{
        values0:"",
        values1:""
      },

      picFunIndex:0,
      images:'',
      index:-1,
      uploadData:{
        images0:[],
        index0:-1,
      },
      imgSrc:{
        passport_img1:'',

      },
    }
  },
  computed:{
    // 预览图片路径
    preImages(){
      return this.uploadData['images'+this.picFunIndex].map(v=>{return v.src});
    },
  },
  methods:{
    inputBlur(){
      window.scrollTo(0, 0)
    },
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
      this.selType['selType'+(this.values_index+1)]=this.values['values'+this.values_index];
      this.popupVisible=false;
    },
    changeAddress(res){
      console.log(res);
    },
    popFun(){
      this.popupVisible=false;
    },
    formFun(){
      this.$vux.confirm.show({
        content:'是否确定提交您上传的文件？',
        confirmText:'确认提交',
        // 组件除show外的属性
        onCancel : () => {
          console.log(this) //当前 vm
        },
        onConfirm : () => {}
      })

    },


    picFun(e){
      this.picFunIndex=e;
      this.images=this.uploadData['images'+this.picFunIndex];
    },

    fileupload(){
      let that =this;
      Indicator.open('加载中');
      console.log(that.images);
      let data = new FormData()
      //data.append("openid",localStorage.openid);
      data.append("openid",localStorage.openid3);
      data.append("file",that.images);
      this.axios({
         method: 'post',
         url: '/api/works/upload',
         headers: { 'content-type': 'multipart/form-data' },
         data: data
       }).then(function (res) {
         Indicator.close();
         if(res.data.code==1){
           that.imgUrl=res.data.data.image;
           that.s_imgUrl=res.data.data.s_image;
          }else {
            Indicator.close();
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
       })
    },

    /**
     *  绑定函数 -- 选择图片
     */
     bindtap_chooseImages(e){
       let that = this;
       // this.checkForm();
       if (Array.isArray(e)) {
         let file = e[0].file
         console.log(e[0]);
         that.images=file;
         that.uploadData['images'+that.picFunIndex] = that.uploadData['images'+that.picFunIndex].concat(e);
         that.fileupload();
         // that.$vux.loading.show({
         //   text: '加载中...'
         //  })
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
       if(this.picFunIndex<4){
         this.imgSrc['passport_img'+(this.picFunIndex+1)]='';
       }else{
         this.lease = this.lease.splice(1,1);
       };
       this.delFlag = false;
       this.uploadData['index'+this.picFunIndex] = -1;
       this.uploadData['images'+this.picFunIndex]=[];
       // this.checkForm();
     },
     lookFun(){

     },
     chooseImg(e){
       var file = e.target.files[0];
       console.log(file);
       this.images =file;
        var reader = new FileReader()
        var that = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          that.avatar= this.result
        }
        that.fileupload();
       // wx.chooseImage({
       //    count: 1, // 默认9
       //    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       //    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       //    success: function (res) {
       //      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
       //    }
       //  });
     },
     xLog1(){

       //this.show1=!this.show1;
       let that =this;


       Indicator.open('加载中');
       console.log(that.images);
       let data = new FormData()
       data.append("openid",localStorage.openid3);
       data.append("title",that.title);
       data.append("detail",that.txt1);
       data.append("image",that.imgUrl);
       data.append("s_image",that.s_imgUrl);

       this.axios({
          method: 'post',
          url: '/api/works/add',
          // headers: { 'content-type': 'multipart/form-data' },
          data: {
            openid:localStorage.openid3,
            image:that.imgUrl,
            s_image:that.s_imgUrl,
            name:that.titles,
            describe:that.txt1
          }
        }).then(function (res) {
          Indicator.close();
          if(res.data.code==1){
            that.popupVisible=true;
            sessionStorage.res=1;
            if(res.data.data.draw==1){
              that.lotFlag=true;
            }else{
              that.lotFlag=false;
            }
           }else {
             Indicator.close();
             Toast({
               message: res.data.msg,
               duration: 1500
             });
           }
        })
     },
     xLog2(){
       this.$router.push({
         name:'lot'
       })
     },
     xLog3(){
       this.show1=!this.show1;
     },
     goBack(){
       history.go(-1);
     }
  },
  created:function(){
    sessionStorage.homeIndex=2;
  }
}
</script>
<style>
#passport {
  width: 100%;
  min-height: 100%;
  clear: both;
  overflow: hidden;
  background: url('../assets/combg.png') no-repeat center;
  background-size: 100% 100%;
}
#passport .con  {
  width: 240px;
  margin: 0 auto;
}
#passport .addBtn {
  width: 100%;
  height: 214px;
  background: url('../assets/down.png') no-repeat center;
  background-size: 10%;
  position: relative;

}

#passport .addBtn input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  opacity: 0;
}
#passport img.addBtn {
  object-fit:cover;
  background:none;
}
#passport .loadCon {
  position: absolute;
  top: 60px;
  width: 100%;
}
#passport .loadCon img{
  width: 25px;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
#passport .loadCon p{
  color: #03764D;
  text-align: center;
  font-size: 13px;
  padding: 0 100px;
}
#passport .shade .image img {
  height: auto;
  top: 100px;
}
#passport .shade .image {
  width: 90%;
}
#passport .con h2 {
  color: #fff;
  font-size: 13px;
  padding: 10px;
  background: #03764D;
  margin:2px 0;
}
#passport .con h2 img {
  width: 15px;
  margin-right: 8px;
}
#passport .con h2 input {
  color: #fff;
  font-size: 13px;
  background: none;
}
#passport .textareaBox {
  box-shadow:0px 8px 17px 1px rgba(6,6,6,0.13);
}
#passport .textareaBox div {
  color: #fff;
  background: #03764D;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 auto;
}
#passport #textarea {
  width: 96%;
  display: block;
  padding: 2%;
  margin-top: 5px;
  border-radius: 0px;
}
#passport .bots {
  color: #03764D;
  font-size: 10px;
  padding: 20px 0 10px 10px;
  margin-bottom: 40px;
}
#passport .bots div.fl {
  width: 65%;
  position: absolute;
  /* transform:scale(0.9); */
  /* margin-left: -20px; */
}
#passport .bots div.fr{
  width:73px;
  display: block;
  background: #03764D;
  margin-left: 10px;
  padding: 20px;
}
#passport .bots img{
  display: block;
}
#passport .bots h1 {
  font-size: 13px;
  font-weight: 600;
}
#passport .bots h4 {
  margin-top: 5px;
}
#passport .bigLook {
  display: block;
  width: 25px;
  right: 10px;
  bottom: 20px;
}
input::-webkit-input-placeholder {
  color: #03764D;
}
textarea::-webkit-textarea-placeholder {
  color: #03764D;
}
.preImg {
  position: fixed;
  width: 70%;
  padding: 2%;
  text-align: center;
  top: 25%;
  left: 50%;
  margin-left: -37%;
  color: #fff;
  border-radius: 10px;
  opacity: 0.9;
}
 .preImg img{
  width: 40px;
  margin-top: 40px;
  margin-bottom: 10px;
}
 .preImg h1{
  font-weight: 700;
  font-size: 16px;
}
 .preImg p{
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 40px;
}
.dialog-demo2 .img1 {
  width: 70%;
}
.dialog-demo2 .weui-dialog{
  background: none;
}
.dialog-demo2 .img2 {
  text-align: center;
  margin-top: 50px;
}
.dialog-demo2 .img2 img {
  width: 40px;
}
.upload-button input {
  bottom: 0;
}
#passport .imgBox {
  width: 235px;
  min-height: 100px;
  background: url('../assets/combg.png') no-repeat center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 10px;
}
#passport .con  p{
  color: #3E3A39;
  font-size: 12px;
}
#passport .inpBox {
  width: 98%;
  margin: 0 auto;
  border:1px solid #03764D;
  padding:10px 1%;
  text-align: center;
  margin-top: 10px;
}
#passport .inpBox input,#passport .inpBox textarea {
  font-size: 16px;
  color: #188E67;
  background: none;
  text-align: center;
}
#passport .xlog1 {
  width: 117px;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  padding: 5px 0;
  color: #fff;
  margin: 20px auto;
  background: #03764D;
  border-radius: 30px;
}
#passport .alerCon {
  width: 250px;
  color: #fff;
  text-align: center;
}
#passport .alerCon h1 {
  font-size: 18px;
  font-weight: 700;
}
#passport .alerCon h2 {
  font-size: 12px;
}
#passport .alerCon img.suc{
  display: block;
  width: 50px;
  margin: 0 auto;
  margin-bottom: 30px;
}
#passport .alerCon span {
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
#passport .mint-popup {
  background: none !important;
}
#passport .addTxt {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 140px;

}
</style>
