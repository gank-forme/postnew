<template>
  <div id="passport" class="comon">
    <app-header></app-header>

    <div class="con relative">
      <div class="imgBox">
        <div class="loadCon" v-if='!avatar'>
          <img src="../assets/down.png" alt="">
          <p>请在此上传您的 <br> 梦想加邮站详情截图 </p>
        </div>
        <input v-if='!avatar' class="addBtn"  type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png"  @change="chooseImg($event)" ref="avatarInput">
        <img  v-else  class="preI" :src="avatar" alt="">

        <!-- <img v-else class="addBtn fr" :src="image.src" alt="" v-for="(image , j) in uploadData['images0']" @click="bingtap_preview(0,j)"> -->
      </div>
      <h2><img src="../assets/write.png" alt=""><input type="text" v-model='title' placeholder='请输入您的梦想标题' name="" value="">  </h2>
      <div class="textareaBox">
        <textarea @blur='inputBlur' id='textarea' v-model='txt1' placeholder="请输入您的梦想描述（参加你分享我点赞系列描述） " name="name"></textarea>
        <div class="" @click='xLog1'>
          确认提交
        </div>
      </div>
      <div class="clearfix bots relative">
        <div class="fr">
          <img src="../assets/ex.png" alt="">
        </div>
        <div class="fl">
          <h1>上传须知</h1>
          <h3>Upload instructions </h3>
          <h4>请勿上传非法图片（涉及暴力、色情、政治政策、负面性社会舆论的照片均不会通过审核）</h4>
          <h4>请上传指定照片（参照右图），可通过邮储银行APP进入梦乡加邮站主页创建梦乡并找到梦想主页截图上传，目前支持JPG/PNG/JPGE等多种格式</h4>
        </div>
        <img class="bigLook absolute" @click='xLog2' src="../assets/bigLook.png" alt="">
      </div>

    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show1" class="dialog-demo" :hide-on-blur='true'>
        <div class="preImg" @click = 'xLog1'>
          <img src="../assets/suc.png" alt="">
          <h1>您已成功上传过梦想</h1>
          <p>You have successfully <br>uploaded the dream</p>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="show2" class="dialog-demo2">
        <img class="img1" src="../assets/ex1.png" alt="">
        <div class="img2">
          <img @click = 'xLog2' src="../assets/gb1.png" alt="">

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
    <app-footer></app-footer>

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
      imgUrl:'',
      txt1:'',
      show1:false,
      show2:false,
      popupVisible:false,
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
      data.append("openid",localStorage.openid1);
      data.append("image",that.images);
      this.axios({
         method: 'post',
         url: '/api/fileupload',
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
       data.append("openid",localStorage.openid1);
       data.append("title",that.title);
       data.append("detail",that.txt1);
       data.append("image",that.imgUrl);
       data.append("s_image",that.s_imgUrl);

       this.axios({
          method: 'post',
          url: '/api/createdream',
          headers: { 'content-type': 'multipart/form-data' },
          data: data
        }).then(function (res) {
          Indicator.close();
          if(res.data.code==1){
            that.$router.push({
              name:"result"
            });
            sessionStorage.res=1;
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
       this.show2=!this.show2;
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
}
#passport .con  {
  width: 96%;
  position: absolute;
  left: 50%;
  margin-left: -48%;
  top: 45px;
  bottom: 60px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(to bottom right, #79CA9E 6%,#b0e0c6, #79CA9E);
}
#passport .addBtn {
  width: 100%;
  height: 214px;
}
#passport input.addBtn {
  width: 100%;
  height: 214px;
  position: absolute;
  top: 0;
  opacity: 0;
}
#passport img.addBtn {
  object-fit:cover;
}
#passport .imgBox {
  height: 214px;
}
#passport .preI {
  width: 100%;
  height: 214px;
  object-fit:cover;

}
#passport .loadCon {
  position: absolute;
  top: 60px;
  width: 100%;
  height: 214px;
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
  background: #fff;
  height: 150px;
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
  background: #fff;
  width: 96%;
  height: 90px;
  display: block;
  padding: 2%;
  margin-top: 5px;
  font-size: 13px;
  color: #03764D;
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
  color: #fff;
}
.preImg {
  position: fixed;
  width: 70%;
  background: #fff;
  padding: 2%;
  text-align: center;
  top: 25%;
  left: 50%;
  margin-left: -37%;
  color: #03764D;
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
</style>
