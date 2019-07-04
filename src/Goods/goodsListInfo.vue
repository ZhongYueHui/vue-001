<template>
    <div>
        <!-- 轮播图区域 -->
        <carousel :swpieList="lunbotulist" :isfull="false"></carousel>


    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
			</div>
        <!-- more -->
        <div class="mui-card">
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
			</div>
    </div>
</template>

<script>
import axios from 'axios'
import { constants } from 'crypto';
//导入轮播图组件
import carousel from '../carousel/carousel.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotulist:[]
        }
    },
    created(){
        this.getInfoImage()
    },
    methods:{
        getInfoImage(){
            axios.get("http://localhost:8080/goodsList.php")
            .then(res => {
                for(let i=0;i<=res.data.length;i++){
                    if(this.id ==res.data[i].id){
                        // this.lunbotulist[0].url =
                        this.lunbotulist.push({"url":res.data[i].url})
                        this.lunbotulist.push({"url":res.data[i].msrcI})
                        this.lunbotulist.push({"url":res.data[i].msrc})
                        this.lunbotulist.push({"url":res.data[i].msrcII})
                    }
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    components:{
        carousel
    }
}
</script>   

<style lang="scss" scoped>

</style>
