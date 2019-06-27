<template>

  <div class="list">
    <x-header :left-options="{backText: ''}"><span>赛区榜单</span><span>全国榜单</span> </x-header>



    <app-footer></app-footer>
  </div>
</template>
<script>
import { MessageBox,Toast,Indicator } from 'mint-ui'
import store from '../store.js'
import qs from 'qs'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      list:sessionStorage.listCli,
      results:[],
      value: '',
      listArr:[

      ]
    }
  },
  created:function(){
    
  },
  methods:{

  },

}

</script>

<style>

</style>
