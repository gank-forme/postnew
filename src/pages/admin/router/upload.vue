<template>
  <div id="upload">
    <h3>请按要求上传图片</h3>
    <div class="formItem">
      <div class="listItem clearfix" v-for= '(i,index) in photoTit'>
        <div class="fl tit">
          <h1>{{i[0]}}</h1>
          <p>{{i[1]}}</p>
        </div>
        <image-upload
          v-if="uploadData['images'+index].length==0"
          :data-id='index'
          class="image_upload fr"
          ref='imgaeUpload'
          :touch-size = 1
          :lrz-options = {width:500}
          :multiple = false
          field-name = 'fileBase64'
          :max-count = 1
          @chooseImages='bindtap_chooseImages'
          @click.native='picFun(index)'
        />
        <img v-else class="image_uploads fr" :src="image.src" alt="" v-for="(image , j) in uploadData['images'+index]" @click="bingtap_preview(index,j)">
      </div>
    </div>

    <h3></h3>
    <div class="formItem">
      <h1 class="lastH1">房间信息</h1>
      <p class="lastP">请拍摄三张照片，尽量全面（如床铺、家具、盥洗设施、厨卫设施、电器等）</p>
      <div class="imgBox clearfix">
        <div class="fl" v-for = 'i in [4,5,6]'>
          <image-upload
            v-if="uploadData['images'+i].length==0"
            class="addBtn"
            ref='imgaeUpload'
            :touch-size = 1
            :lrz-options = {width:500}
            :multiple = false
            field-name = 'fileBase64'
            :max-count = 1
            @chooseImages='bindtap_chooseImages'
            @click.native='picFun(i)'
          />
          <img v-else class="addBtn fr" :src="image.src" alt="" v-for="(image , j) in uploadData['images'+i]" @click="bingtap_preview(i,j)">
        </div>
      </div>
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

    <div class='del' v-if='delFlag' @click='delFun()'>
      <img src="../assets/delete.png" alt="">
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

    <div class="footer2">
      <mt-button type="primary" :class="subFlag?'':'opa'" size="large" id='fromBtn' @click.native='formFun'>提交</mt-button>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import qs from 'qs'
export default {
  name: 'app',
  data () {
    return {
      declarantFaceImg:'',
      declarantRoomImgs:'',
      phone1:'',
      name:'',
      phone2:'',
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
        ['人像信息','拍摄/上传申报人正面照'],
      ],
      picFunIndex:0,
      images:[],
      index:-1,
      lease:[],
      leaseSrc:[],
      imgSrc:{
        passport_img1:'',
        passport_img2:'',
        passport_img3:'',
        passport_img4:'',
      },
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
      if(this.lease.length<3||this.declarantFaceImg.length==0){
        this.subFlag = false;
      }else{
        this.subFlag = true;
      }
    },
    formFun(){
      let that = this;
      MessageBox({
       title: '温馨提示',
       message: '确认提交信息？',
       showCancelButton: true,
       cancelButtonText:'取消',
       confirmButtonText:'确定'
     }).then(action => { 
       if (action == 'confirm') {     //确认的回调
        that.commitResult();
       }
     });
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
           checkStatus:1,
           declarantFaceImg:that.declarantFaceImg,
           declarantRoomImgs:that.lease.join(',')
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
    bindtap_chooseImages(e){
      let that = this;
      Indicator.open('加载中');
      that.checkForm();
      if (Array.isArray(e)) {
        //this.images = this.images.concat(res);
        that.axios.post('/intranet_uploadBase64',{
          fileBase64:e[0].src,
           isInternal:true //true 内网  false cos
        } )
         .then(function (res) {
           Indicator.close();
           if(res.data.error==0){
             if(that.picFunIndex<4){
               that.declarantFaceImg=res.data.data;
             }else{
               that.lease.push(res.data.data);
               console.log(that.lease);
             }
             that.checkForm();
             that.uploadData['images'+that.picFunIndex] = that.uploadData['images'+that.picFunIndex].concat(e);
           }else {
             Toast({
               message: res.data.message,
               duration: 1500
             });
           }


         })
         .catch(function (error) {
           oast({
             message: error.message,
             duration: 1500
           });
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
       let that = this;
       MessageBox({
        title: '确认删除图片吗？',
        message: 'Confirm delete image?',
        showCancelButton: true,
        cancelButtonText:'取消 Cancel',
        confirmButtonText:'确定 Confirm'
      }).then(action => { 
        if (action == 'confirm') {     //确认的回调
           if(this.picFunIndex<4){
             this.declarantFaceImg='';
           }else{
            this.lease = this.lease.slice(0,-1);
           }
           this.delFlag = false;
           this.uploadData['index'+this.picFunIndex] = -1;
           this.uploadData['images'+this.picFunIndex]=[];
           this.checkForm();
        }
      });
     }
  },

}
</script>

<style>
#upload .formItem .tit {
  width: 140px;
  margin-bottom: 10px;
  margin-top: 20px;
}
#upload .formItem .tit h1,#upload .mint-cell-text {
  color: #666;
  font-size: 16px;
  font-weight: 700;
}
#upload .formItem .tit p,#upload .mint-cell-label {
  color: #3F3F3F;
  font-size: 14px;
}
#upload .mint-cell-wrapper {
  border:none;
}
#upload h3 {
  color: #999;
  font-size: 12px;
  padding: 10px 10px;
}
#upload .formItem {
  background: #fff;

}
#upload .formItem .listItem {
  padding: 15px 15px 0 15px;
}
#upload .formItem .listItem:last-child {
  padding-bottom: 15px;
}
#upload .addBtn {
  width: 60px;
  height: 60px;
  background: url('../assets/addBtn.png') no-repeat center;
  background-size: 100%;
}
#upload .mint-cell input{
  text-align: right;
  font-size: 16px;
}
#upload .mint-cell .addBtn{
  margin:10px;
}
#upload .lastH1 {
  padding: 15px 15px 0 15px;
  font-size: 16px;
}
#upload .lastP {
  padding: 0 15px 15px 15px;
  font-size: 14px;
  color: #3F3F3F;
}
#upload .imgBox {
  padding-left: 15px;
  padding-bottom: 15px;
}
#upload .imgBox .fl{
  margin-right: 15px;
}
.image_upload{
  height: 100px;
  width: 180px;
  background: url('../assets/picBtn.png') no-repeat center;
  background-size: 100%;
}
.image_uploads{
  height: 100px;
  width: 180px;
  object-fit: contain;
}
#upload .footer2 {
  padding: 10px 15px;
  background: #fff;
  margin-top: 80px;
}
#upload #fromBtn.opa {
  pointer-events: none;
  opacity: 0.5;
}
#upload .mint-popup {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#upload .mint-popup h1 {
  font-size: 14px;
  color: #999;
  padding: 10px;
}
#upload .mint-popup .btn {
  font-size: 18px;
  color: #0076FF;
  text-align: center;
  padding: 10px;
}
#upload .mint-popup .mint-cell {
  padding: 0px;
}
#upload .shade .image img {
  object-fit: contain;
  height: 100%;
}
.shade .top-view p {
  display: none;
}
#upload .del {
  position: fixed;
  right: 20px;
  top: 120px;
  width: 30px;
  z-index: 300;
}
.mint-msgbox-btn {
  font-size: 13px;
}
#upload .list li {
  padding: 10px;
  background: #fff;
}
#upload .list li h1 {
  clear: both;
  overflow:hidden;
}
#upload .list li p {
  margin-top: 5px;
}
</style>
