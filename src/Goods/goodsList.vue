<template>
    <div class="goodscontainer">
        <!-- <router-link to="/home/goodslistinfo/" tag="div" class="goodsInfo" v-for="item in goodsList" :key="item.id">
            <img :src="item.url">
            <div class="wordsinfo">
                <span class="title">{{ item.title }}</span>
                <div class="price">
                    <span class="new">￥{{ item.price }}</span>
                    <span class="lod">￥{{ item.oldprice }}</span>
                </div>
                <div class="message">
                    <span>热卖中</span>
                    <span>剩余{{ item.residue }}件</span>
                </div>
            </div>
        </router-link> -->

        <!-- 使用 $router 跳转页面  注意：$route与$router不一样 -->
   <div  tag="div" class="goodsInfo" v-for="item in goodsList" :key="item.id" @click="getinfo(item.id)">
            <img :src="item.url">
            <div class="wordsinfo">
                <span class="title">{{ item.title }}</span>
                <div class="price">
                    <span class="new">￥{{ item.price }}</span>
                    <span class="lod">￥{{ item.oldprice }}</span>
                </div>
                <div class="message">
                    <span>热卖中</span>
                    <span>剩余{{ item.residue }}件</span>
                </div>
            </div>
        </div>

         <mt-button type="danger" size="large"  class="loadingMore" @click="getMore"> 加载更多</mt-button>
    </div>
</template>
<script>
//http://localhost:8080/goodsList.php
import axios from 'axios'
// import { resolveAny } from 'dns';
export default {
    data(){
        return{
            page:1,
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            axios.get("http://localhost:8080/goodsList.php?page="+this.page)
            .then(res => {
                if(res.status === 200){
                    this.goodsList = res.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        getMore(){
            this.page++
            this.getGoodsList()

        },
        getinfo(id){
            //使用 $router 进行编程式导航
            //方式一： 字符串
            // this.$router.push("/home/goodslistinfo/"+id)
            //方式二：对象
            // this.$router.push({ path:"/home/goodslistinfo/"+id })
            //方式三：命名的路由 需要在route.js的路由路径中创建路由的 name 属性
            this.$router.push({ name:"goodslistinfo",params:{id} })
        }
    }
}
</script>
<style lang="scss" scoped>
.goodscontainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 5px;
    .goodsInfo{
        border: 1px solid;
        width: 49%;
        padding: 2px;
        margin: 5px 0 5px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 243px;
        img{
            width: 100%
        }
        .wordsinfo{
            background-color: #eee;
            
        }
            .price{
                .new{
                    color: red;
                    font-weight: bold;
                }
                .lod{
                    text-decoration: line-through;
                    font-size: 14px;
                }
            }
            .message{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
            }
    }
}
</style>
