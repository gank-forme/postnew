<template>
  <div id="passport" class="comon">
    <div class="header clearfix">
      <span class="fl">你分享我点赞大型系列活动</span>
      <span class="fr">
        <img class="logoImg" src="" alt="">
      </span>
    </div>
    <div class="con">
      <div class="imgBox">
        <div class="loadCon">
          <img src="loadImg" alt="">
          <p>请在此上传您的 <br> 梦想加邮站详情截图 </p>
        </div>
        <image-upload
          v-if="uploadData['images0'].length==0"
          class="addBtn"
          ref='imgaeUpload'
          :touch-size = 1
          :lrz-options = {width:500}
          :multiple = false
          field-name = 'fileBase64'
          :max-count = 1
          @chooseImages='bindtap_chooseImages'
          @click.native='picFun(0)'
        />

        <img v-else class="addBtn fr" :src="image.src" alt="" v-for="(image , j) in uploadData['images0']" @click="bingtap_preview(0,j)">
      </div>
      <h2>请输入您的梦想名称</h2>
      <textarea id='textarea' name="name" rows="8" cols="80"></textarea>
      <div class="clearfix bots">
        <img class="fr" src="" alt="">
        <div class="fl">
          <h1>上传须知</h1>
          <h3>Upload instructions </h3>
          <h4>请勿上传非法图片（涉及暴力、色情、政治政策、负面性社会舆论的照片均不会通过审核）</h4>
          <h4>请上传指定照片（参照右图），可通过邮储银行APP进入梦乡加邮站主页创建梦乡并找到梦想主页截图上传，目前支持JPG/PNG/JPGE等多种格式</h4>
        </div>
      </div>


      <tabbar>
        <tabbar-item>
          <img slot="icon" src="../assets/err.png">
          <span slot="label">活动详情</span>
        </tabbar-item>
        <tabbar-item >
          <img slot="icon" src="../assets/err.png">
          <span slot="label">发起梦想</span>
        </tabbar-item>
        <a href="#" class="centerTab">
          <img slot="icon" src="../assets/err.png">
        </a>
        <tabbar-item selected link="/component/demo">
          <img slot="icon" src="../assets/err.png">
          <span slot="label">排行榜</span>
        </tabbar-item>
        <tabbar-item >
          <img slot="icon" src="../assets/err.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
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
  </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
import { XAddress,ChinaAddressV4Data} from 'vux'


var Bucket = 'cos-1253286164';
var Region = 'ap-shanghai';
var cos;
export default {
  name: 'app',
  components: {
    XAddress
  },
  data () {
    return {
      popupVisible:false,
      pVisible:false,
      subFlag:false,
      isDone:1,
      values1:['杭州滨江区分局1'],
      list:[[
        '杭州滨江区分局1',
        '杭州滨江区分局2',
        '杭州滨江区分局3',
        '杭州滨江区分局4',
        '杭州滨江区分局5',
        '杭州滨江区分局6',
        '杭州滨江区分局7',
        '杭州滨江区分局'
      ]],
      // value:['浙江省', '杭州市', '滨江区'],
      addValue:[],
      addressData: ChinaAddressV4Data,

      values_index:0,
      values:{
        values0:"",
        values1:""
      },
      label:{
        label0:'请选择',
        label1:'请选择'
      },
      selType:{
        selType1:'',
        selType2:''
      },
      options: {
        tit:'',
        arr:[]
      },
      options0: {
        tit:'请选择居留类型',
        arr:[
          {
            label: '新建',
            value: '1'
          },
          {
            label: '改建',
            value: '2'
          }

        ]
      },
      options1: {
        tit:'请选择关系  Ralationship',
        arr:[
          {
            label: '营业场所',
            value: '1'
          },
          {
            label: '自助银行',
            value: '2'
          },
          {
            label: '自助机具',
            value: '3'
          },
          {
            label: '金库',
            value: '4'
          }
        ]
      },
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
      },
      imgSrc:{
        passport_img1:'',
        passport_img2:'',
        passport_img3:'',
        passport_img4:'',
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
    /**
     *  绑定函数 -- 选择图片
     */
     bindtap_chooseImages(e){
       let that = this;
       // this.checkForm();
       if (Array.isArray(e)) {
         let file = e[0].file
         console.log(file);
         that.$vux.loading.show({
           text: '加载中...'
          })
         cos.sliceUploadFile({
              Bucket: Bucket,
              Region: Region,
              Key: 'alarm/foreigner/'+(new Date()).getTime()+'.jpg',
              Body: file,
              TaskReady: function(taskId) {                   /* 非必须 */
                  //console.log("11111"+taskId);
              },
              onHashProgress: function (progressData) {       /* 非必须 */
                  //console.log("11112"+JSON.stringify(progressData));
              },
              onProgress: function (progressData) {           /* 非必须 */
                  //console.log("11113"+JSON.stringify(progressData));
              }
          }, function (err, data) {

            if(data.statusCode==200){
              that.$vux.loading.hide();
              that.uploadData['images'+that.picFunIndex] = that.uploadData['images'+that.picFunIndex].concat(e);

              if(that.picFunIndex<4){
                that.imgSrc['passport_img'+(that.picFunIndex+1)]="https://"+data.Location;
                //that.uploadData['images'+that.picFunIndex].push("https://"+data.Location);
              //  console.log(that.uploadData['images'+that.picFunIndex]);
              }else{
                console.log(that.lease);
                that.lease.push("https://"+data.Location);
              }
              // that.checkForm();
            }else {
              Toast({
                message: '上传失败',
                duration: 1500
              });
            }
          });

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
       }
       this.delFlag = false;
       this.uploadData['index'+this.picFunIndex] = -1;
       this.uploadData['images'+this.picFunIndex]=[];
       // this.checkForm();
     },
  },
  created:function(){
    let that = this;
    cos = new COS({
        getAuthorization: function (options, callback) {
            // 异步获取临时密钥
            that.axios({
               method: 'get',
               url: '/upload/cos/auth',
               headers:{
                 'uid':that.uid,
                 "token":that.token
               },
               //data: qs.stringify(data)
             }).then(function (res) {
               that.$vux.loading.hide()
               let data = res.data;
               callback({
                    TmpSecretId: data.credentials.tmpSecretId,
                    TmpSecretKey: data.credentials.tmpSecretKey,
                    XCosSecurityToken: data.credentials.sessionToken,
                    ExpiredTime: data.expiredTime,
               });
             })
        }
    });

  }
}
</script>
<style>
#passport {
  min-height: 100%;
  clear: both;
  overflow: hidden;
  margin-top: 33px;
}
#passport .con {
  width: 96%;
  height: 214px;
  margin: 0 auto;
  margin-top: 10px;
  background: linear-gradient(to bottom right, #79CA9E 6%,#b0e0c6, #79CA9E);
}
#passport .addBtn {
  width: 100%;
  height: 214px;
}
#passport .loadCon {
  position: absolute;
  top: 60px;
  width: 100%;
}
#passport .loadCon img{
  width: 50px;
  height: 50px;
  background: #eee;
  display: block;
  margin: 0 auto;
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
#passport #textarea {
  background: #fff;
  width: 96%;
  height: 150px;
  display: block;
  padding: 2%;
  margin-top: 5px;
  font-size: 13px;
  color: #03764D;
  box-shadow:0px 8px 17px 1px rgba(6,6,6,0.13);
}
#passport .bots {
  color: #03764D;
  font-size: 10px;
  padding: 20px 0 10px 10px;
}
#passport .bots div {
  width: 75%;
  position: absolute;
  transform:scale(0.8);
  margin-left: -25px;
}
#passport .bots img{
  width:113px;
  height: 140px;
  display: block;
  background: #03764D;
  margin-left: 10px;
}
#passport .bots h1 {
  font-size: 13px;
  font-weight: 600;
}
#passport .bots h4 {
  margin-top: 5px;

}

</style>
