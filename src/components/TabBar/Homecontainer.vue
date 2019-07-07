<template>
    <div>
        <!-- 轮播图 -->
        <swpie :swpieList="swpieList" :isfull="true"></swpie>

        <!-- 九宫格菜单栏 -->
          <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newlist">
		                    <img src="../../images/1.jpg" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photosimage">
		                   <img src="../../images/2.jpg" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                   <img src="../../images/3.jpg" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                   <img src="../../images/4.jpg" alt="">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                   <img src="../../images/5.jpg" alt="">
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../images/6.jpg" alt="">
		                    <div class="mui-media-body">联系我们</div></router-link></li>

		        </ul> 
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { Toast } from 'mint-ui'
//引入轮播图组件
import swpie from '../../carousel/carousel.vue'
export default {
    data(){
        return{
            swpieList:[],
        }
    },
    created(){
        this.getSwipe()
    },
    methods:{
        getSwipe(){
            // axios.get("https://api.asilu.com/bg/")
            // .then(res => {
            //     // console.log(res.data.images)
            //     // this.swpieList = res.data.imges
            //     if(res.status === 200){
            //         // this.swpieList = res.data.images
            //         console.log(this.swpieList);
            //         }
            // })
            // .catch(err => {
            //     Toast(err)
            // })
            $.ajax({
                type: "GET",
                url: "https://api.asilu.com/bg/",
                dataType: "jsonp",
                success: res=>{
                    this.swpieList = res.images
                }
            });
        }
    },
    components:{
        swpie   //挂载轮播图组件
    }
}
</script>

<style lang="scss" scoped>
.mui-grid-9{
    background-color: white!important;
    img{
        width: 50px;
        height: 50px;
    }
    li{
        border: none!important;
    }
}
</style>
