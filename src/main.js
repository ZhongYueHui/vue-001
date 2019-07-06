// 入口文件
import Vue from 'vue'
//导入App文件
import app from '../App.vue'
//导入路由
import VueRouter from 'vue-router'
//安装router
Vue.use(VueRouter)
    //导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
    //一开始就读取本地存储的car信息 如果没有 则默认返回空数组 ，这样就不会报错
const car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
    state: { // this.$store,state.***
        car: car
    },
    mutations: { //this.$store.commit('方法名','参数')
        addToCar(state, goodsinfo) {
            //点击加入购物车，把商品信息保存到store中的car上
            // 分析
            // 1.如果购物车上已经有了这个信息，我们只需要重新添加数量即可
            // 2.如果没有。则直接添加完整的商品数据
            var flage = false //标识状态，默认是没有
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flage = true
                    return true
                }
            })
            if (!flage) { //如果是等于false
                this.state.car.push(goodsinfo)
            }
            // 这样存储购物车的数据刷新页面数据就消失了，我们可以使用 localStorage 本地存储进行持久化存储
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        upShopCarCount(state, goodinfo) {
            state.car.some(item => {
                    if (item.id == goodinfo.id) {
                        item.count = parseInt(goodinfo.count)
                    }
                    return true
                })
                // 将最新的数量值保存到本地存储中去
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeCar(state, id) {
            state.car.some((item, index) => {
                    if (item.id == id) {
                        state.car.splice(index, 1)
                    }
                    return true
                })
                // 将删除后的的数据更新到本地存储中去
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        upDataSelected(state, info) {
            state.car.forEach(item => {
                    if (item.id == info.id) {
                        item.selected = info.selected
                    }
                })
                // 将最新的swipe状态到本地存储中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: { //this.$store.getters.*** 
        //计算属性，也相当于 filters
        getAllCount(state) {
            var allCount = 0
            state.car.forEach(item => {
                allCount += item.count //将所有商品的 数量获取并相加
            });
            return allCount // 返回所有数量之和
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getSelectedstatus(state) {
            var s = {}
            state.car.forEach(item => {
                s[item.id] = item.selected
            })
            return s
        },
        getCountPrice(state) {
            var p = {
                count: 0, //商品的总数
                amount: 0 //商品的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    p.count = item.count
                    p.amount = item.price * item.count
                }
            })
            return p
        }
    },

})


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
//再原型上添加一个axios属性，这样使用的时候可以直接通过 this.axios.get()使用
Vue.prototype.axios = axios


// 引入 MuI
import mui from './lib/Mui/css/mui.css'
//引入扩展图标类
import './lib/Mui/css/icons-extra.css'

//缩略图
import VuePreview from 'vue-preview'
import { stat } from 'fs';
// defalut install
Vue.use(VuePreview)


const vm = new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store
})