//引入router
import VueRouter from 'vue-router'

//导入对应的router组件
import Homecontainer from './components/TabBar/Homecontainer.vue'
import Membercontainer from './components/TabBar/Membercontainer.vue'
import Searchcontainer from './components/TabBar/Searchcontainer.vue'
import Shopcarcontainer from './components/TabBar/Shopcarcontainer.vue'



const router = new VueRouter({
        routes: [{
            path: "/",
            redirect: "/home"
        }, {
            path: '/home',
            component: Homecontainer
        }, {
            path: '/member',
            component: Membercontainer
        }, {
            path: '/search',
            component: Searchcontainer
        }, {
            path: '/shopcar',
            component: Shopcarcontainer
        }],
        linkActiveClass: 'mui-active'
    })
    // 向外暴露这个 router对象
export default router