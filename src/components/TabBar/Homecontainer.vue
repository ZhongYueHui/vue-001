<template>
    <div>
        <p>Homecontainer</p>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swpieList" :key="item.url" >
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
          <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newlist">
		                    <img src="../../images/1.jpg" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photosimage">
		                   <img src="../../images/2.jpg" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
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
import { Toast } from 'mint-ui'
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
            axios.get("https://api.asilu.com/bg/")
            .then(res => {
                // this.swpieList = res.data.imges
                if(res.status === 200){
                    this.swpieList = res.data.images
                    }
            })
            .catch(err => {
                Toast(err)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        &:nth-child(1){
            background-color: red;
        img{
            width: 100%;
            height: 100%;
        }
        }
    }
}
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
