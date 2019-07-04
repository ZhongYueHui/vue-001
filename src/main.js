// 入口文件
import Vue from 'vue'
//导入App文件
import app from '../App.vue'

//导入路由
import VueRouter from 'vue-router'
//安装router
Vue.use(VueRouter)

//导入时间格式化插件
import moment from 'moment'
//定义过滤器
Vue.filter('datafilter', function(dateFrom, patten = " YYYY-MM-DD HH:mm:ss") {
    return moment(dateFrom).format(patten)
})

//导入router
import router from './route'

// 按需引入mint -ui  
// import { Header, Swipe, SwipeItem, Button ,Lazyload } from 'mint-ui'

// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Header.name, Header)
// Vue.component(Button.name, Button)
// //懒加载
// Vue.use(Lazyload);

//完整导入mint-ui (否则懒加载loading无法显示)
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)


//引入axios
import axios from 'axios'
Vue.use(axios)


// 引入 MuI
import mui from './lib/Mui/css/mui.css'
//引入扩展图标类
import './lib/Mui/css/icons-extra.css'

//缩略图
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)


const vm = new Vue({
    el: '#app',
    render: h => h(app),
    router
})