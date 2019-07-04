//引入router
import VueRouter from 'vue-router'

//导入对应的router组件
import Homecontainer from './components/TabBar/Homecontainer.vue'
import Membercontainer from './components/TabBar/Membercontainer.vue'
import Searchcontainer from './components/TabBar/Searchcontainer.vue'
import Shopcarcontainer from './components/TabBar/Shopcarcontainer.vue'
import NewList from './components/News/NewsList.vue'
import NewInfo from './components/News/Newinfo/newinfo.vue'
import Photosimage from './Photos/Shareimage.vue'
import photsInfo from './Photos/photosInfo.vue'
import goodslist from './Goods/goodsList.vue'
import goodslistinfo from './Goods/goodsListInfo.vue'

// http://v.juhe.cn/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5

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
        }, {
            path: '/home/newlist',
            component: NewList
        }, {
            path: '/home/newlist/newinfo/:title',
            component: NewInfo
        }, {
            path: '/home/photosimage',
            component: Photosimage
        }, {
            path: '/home/photosInfo/:id',
            component: photsInfo
        }, {
            path: '/home/goodslist',
            component: goodslist
        }, {
            path: "/home/goodslistinfo/:id",
            component: goodslistinfo,
            name: "goodslistinfo"
        }],
        linkActiveClass: 'mui-active' //选中Tabbar高亮
    })
    // 向外暴露这个 router对象
export default router