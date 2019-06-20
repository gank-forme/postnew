// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import home from "./index.vue"
import { Search, Cell, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from "vue-router"
import 'lib-flexible/flexible'


// 引入组件
import info from "./router/info.vue"
import Index from './router/home.vue'
import search from './router/search.vue'

Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Search.name, Search)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)

Vue.use(VueRouter)

const routes = [
    {
        path:"/info",
        name:"info",
        component: info
    },
    {
        path:"/",
        component: Index
    },
    {
        path:"/search",
        name:"search",
        component: search
    }
]
var router =  new VueRouter({
    mode:'hash',
    routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { home },
  template: '<home/>'
})
