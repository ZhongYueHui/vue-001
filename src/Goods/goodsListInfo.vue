<template>
    <div class="goodslistinfo_container">
        <!-- 小球区域 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">


            <div class="ball" v-show="flage" ref="ball"></div>


        </transition>
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- 轮播图区域 -->
                        <carousel :swpieList="lunbotulist" :isfull="false"></carousel>
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ infomessage.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            市场价:<del>￥{{ infomessage.oldprice }}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{ infomessage.price }}</span>
                        </p>
                        <p class="number">
                            <span class="shop_num">购买数量：</span><numberbox @getcount="getSelectCount" :max="infomessage.residue"></numberbox>
                        </p>
                        <div class="btn">
                            <mt-button size="small" type="danger" >立即购买</mt-button>
                            <mt-button size="small" type="primary" @click="addToShopCar">加入购物车</mt-button>
                        </div>
					</div>
				</div>
			</div>
        <!-- more -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号：{{ infomessage.number }}</p>
                        <p>库存情况：{{ infomessage.residue }}件</p>
                        <p>上架时间：{{ infomessage.time }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="danger" size="large" plain @click="goDesc(id)">图文详情</mt-button>
                    <mt-button type="primary" size="large" plain @click="goComment(id)">发表评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
import axios from 'axios'
import { constants } from 'crypto';
//导入轮播图组件
import carousel from '../carousel/carousel.vue'
import numberbox from './shopNum.vue'
import { get } from 'http';
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotulist:[],
            infomessage:{},
            flage:false,
            count:1 //默认商品的数量是1
        }
    },
    created(){
        this.getInfoImage()
        this.goodsInfoMess()
    },
    methods:{
        getInfoImage(){  //获取轮播图的图片
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
        },
        goodsInfoMess(){ //获取数据的详细信息
            axios.get("http://localhost:8080/goodsList.php",{
            
                params:{
                    "id":this.id
                }
            })
            .then(res => {
                if(res.status === 200){
                    this.infomessage = res.data[0]
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        goDesc(id){  //使用编程式导航 跳转到指定的页面
            this.$router.push({ name:"goodsdesc",params:{id}})
        },
        goComment(id){
            this.$router.push({ name:"goodscomment" ,params:{ id }})
        },
        addToShopCar(){
            //添加到购物车
            this.flage=!this.flage
            //{ id: "商品的id",count：要购买的数量.price：商品的单价,selected:false }
            //拼接出一个商品信息对象，将来保存到store中的car数组中去
            const goodsinfo = {
                id:this.id,
                count:this.count,
                price:this.infomessage.price,
                selected: true
            }
            //将这个goodsinfo对象保存到store中的 addToCar 中
            this.$store.commit("addToCar",goodsinfo)
        },
         beforeEnter(el) { //before 表示动画入场之前，动画尚未开始，可以在 beforeEnter 设置开始动画之前的起始样式
                    //设置小球开始动画之前的起始位置
                el.style.transform = "translate(0, 0)"
            },
        enter(el, done) { //enter 表示动画开始之后的样式 这里，可以设置小球的完成动画之后的结束状态
             //这里的offsetwidth本身并没有什么作用，但是这里如果没有添加则会出错，可以认为是强制动画刷新
                el.offsetWidth
                //到了这里小球的动画只能在不移动滚动条的时候实现了加入购物车，但是在不同的分辨率上，并没有将小球加入购物车，我们

                const ballposition = this.$refs.ball.getBoundingClientRect();
                const bageposition = document.getElementById('bage').getBoundingClientRect()
                const x = bageposition.left - ballposition.left
                const y = bageposition.top - ballposition.top

                el.style.transform = `translate(${x}px, ${y}px)`
                el.style.transition = "all 1s cubic-bezier(0,-0.83,1,.58)"
                done() //这里的done，起始就是 afterEnter 这个函数，也就是说：done 是 afterEnter函数的引用
                },
        afterEnter(el) { //动画完成之后，会调用afterEnter
                //这个语句的第一个功能是，控制小球的显示与隐藏
                    //第二个功能：直接跳过后半场动画 flage->true（前半场） ->false(后半场)，让flage标识符直接变成flase
                    //第二次点击时 又是将 flage 从 false->true
                this.flage = !this.flage

                },
        getSelectCount(count){//拿到子组件传递过来的值保存到自己的count中
            this.count = count
        }
        
    },
    components:{
        carousel,
        numberbox
    }
}
</script>   

<style lang="scss" scoped>
.goodslistinfo_container{
    .now_price{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .number{
        line-height: 20px;
    }
        .shop_num{
            float: left;
            line-height: 38px;
        }
    .btn{
        display: flex;
        justify-content: center;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0 15px 0;
        }
    }
}
.ball{
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    left: 145px;
    top: 385px;
}
</style>
