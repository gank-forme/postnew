// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import './assets/css/reset.css'
import 'lib-flexible/flexible.js'
import VueRouter from "vue-router"
import home from './router/home.vue'
import login from './router/login.vue'
import result from './router/result.vue'
import list from './router/list.vue'
import info from './router/info.vue'
import detail from './router/detail.vue'
import load from './router/load.vue'



import axios from 'axios'
import VueAxios from 'vue-axios'
import {ImageUpload , ImagePreview} from 'vue-image-upload-preview'
import {Search, Tabbar, TabbarItem,Swiper,TimelineItem,Timeline,ConfirmPlugin,LoadingPlugin,Cell, Flow, FlowState, FlowLine, XInput, Group ,PopupPicker} from 'vux'
import 'mint-ui/lib/style.css'
import {TabItem, TabContainer, TabContainerItem, Field, Button,Actionsheet,Radio,Checklist,DatetimePicker,Popup} from 'mint-ui'
Vue.config.productionTip = false

Vue.component('search', Search)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('swiper', Swiper)
Vue.component('x-input', XInput)
Vue.component('flow', Flow)
Vue.component('flow-state', FlowState)
Vue.component('flow-line', FlowLine)
Vue.component('group', Group)
Vue.component('popup-picker', PopupPicker)
Vue.component('cell', Cell)
Vue.component('timeline', Timeline)
Vue.component('timelineItem', TimelineItem)

Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)


Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
// Vue.component(Cell.name, Cell)
Vue.component(TabItem.name, TabItem)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)
Vue.component('image-preview', ImagePreview)
Vue.component('image-upload', ImageUpload)

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/home', component: home,name:'home' ,meta: { title: "境外人员住宿申报" }},
    { path: '/load', component: load,name:'load' ,meta: { title: "境外人员住宿申报" }},
    { path: '/detail', component: detail,name:'detail' ,meta: { title: "境外人员住宿申报" }},
    { path: '/result', component: result,name:'result' ,meta: { title: "境外人员住宿登记" }},
    { path: '/list', component: list,name:'list' ,meta: { title: "境外人员住宿登记" }},
    { path: '/info', component: info,name:'info' ,meta: { title: "境外人员住宿登记" }},
    { path: '/login', component: login,name:'login',meta: { title: "设施审批" }}

  ]
})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})
const handler = (e) => {
  e.preventDefault();
};
Vue.directive('roll', {
  componentUpdated(el, binding) {
    if (binding.value instanceof Array) {
      const visible = binding.value.some(e => e); // 当视图所有控制弹层的变量存在一个是true，即可阻止touchmove事件
      if (visible) {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, { passive: false });
      } else {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, { passive: false });
      }
    } else if (typeof binding.value === 'boolean') {
      if (binding.value) {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', handler, { passive: false });
      } else {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', handler, { passive: false });
      }
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
   router,
   components:{
     App
   },
   template: '<App/>'
})
