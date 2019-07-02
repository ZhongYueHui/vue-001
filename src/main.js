// 入口文件
import Vue from 'vue'
//导入App文件
import app from '../App.vue'

//导入路由
import VueRouter from 'vue-router'
//安装router
Vue.use(VueRouter)
    //导入router
import router from './route'

// 引入mit -ui  
import { Header, Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header)

//引入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//引入axios
import axios from 'axios'
Vue.use(axios)

// 引入 MuI
import mui from './lib/Mui/css/mui.css'
//引入扩展图标类
import './lib/Mui/css/icons-extra.css'


const vm = new Vue({
    el: '#app',
    render: h => h(app),
    router
})