// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import './assets/css/reset.css'
import 'lib-flexible/flexible.js'
import VueRouter from "vue-router"
import lottery from 'vue-lottery'
import header from './components/header.vue'
import footer from './components/footer.vue'

import lot from './router/lottery.vue'
import home from './router/home.vue'
import login from './router/login.vue'
import result from './router/result.vue'
import list from './router/list.vue'
import info from './router/info.vue'
import detail from './router/detail.vue'
import load from './router/load.vue'
import content from './router/content.vue'
import rank from './router/rank.vue'
import before from './router/before.vue'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})



import axios from 'axios'
import VueAxios from 'vue-axios'
import {ImageUpload , ImagePreview} from 'vue-image-upload-preview'
import {XHeader,XDialog,Search, Tabbar, TabbarItem,Swiper,TimelineItem,Timeline,ConfirmPlugin,LoadingPlugin,Cell, Flow, FlowState, FlowLine, XInput, Group ,PopupPicker,Picker} from 'vux'
// 以 plugin 形式使用时，请在入口处引入：
import { DatetimePlugin } from 'vux'
Vue.use(DatetimePlugin)
import 'mint-ui/lib/style.css'
import {Swipe, SwipeItem,InfiniteScroll,Header,TabItem, TabContainer, TabContainerItem, Field, Button,Actionsheet,Radio,Checklist,DatetimePicker,Popup} from 'mint-ui'
Vue.config.productionTip = false

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

Vue.component(header.name, header)
Vue.component(footer.name, footer)

Vue.component('x-header', XHeader)
Vue.component('x-dialog', XDialog)
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
Vue.component('picker', Picker)

Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(lottery)


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

Vue.use(InfiniteScroll);
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/home', component: home,name:'home'},
    { path: '/lot', component: lot,name:'lot'},
    { path: '/load', component: load,name:'load'},
    { path: '/detail', component: detail,name:'detail' },
    { path: '/result', component: result,name:'result' },
    { path: '/list', component: list,name:'list' },
    { path: '/content', component: content,name:'content'},
    { path: '/info', component: info,name:'info'},
    { path: '/rank', component: rank,name:'rank'},
    { path: '/login', component: login,name:'login'},
    { path: '/before', component: before,name:'before'}

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
