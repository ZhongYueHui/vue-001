// 入口文件
import Vue from 'vue'

import app from '../App.vue'

// 引入mit -ui  
import { Header } from 'mint-ui'

// 引入 MuI
import mui from './lib/Mui/css/mui.css'

Vue.component(Header.name, Header)


const vm = new Vue({
    el: '#app',
    render: h => h(app)
})