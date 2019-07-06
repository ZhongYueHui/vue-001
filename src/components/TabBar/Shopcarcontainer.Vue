<template>
    <div class="shopCarContainer">
        <!-- 购物车区域start -->
        <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner shopinfo">
                        <mt-switch v-model="$store.getters.getSelectedstatus[item[0].id]" @change="selectedstatus(item[0].id,$store.getters.getSelectedstatus[item[0].id])"></mt-switch>
                        <img :src="item[0].url" :alt="item[0].title">
                        <div class="info">
                        <h1>{{ item[0].title }}</h1>
                        <p class="price_info">
                            <span class="price">￥{{ item[0].price }}</span>
                            <!-- 
                            如果要将state的car中的id和数量对应上，显示在数量框上
                            我们可以 
                            -->
                            <numbox class="number" :countNumber=" $store.getters.getGoodsCount[item[0].id]" :countId="item[0].id"></numbox>
                            <!-- 点击删除按钮删除数据，item[id]是删除本地存储的数据，index删除渲染列表的数据 -->
                            <a href="#" class="del" @click="remove(item[0].id,index)">删除</a>
                        </p>
                        </div>
					</div>
				</div>
			</div>
        <!-- 购物车区域 End -->
        <!-- 商品结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                      <div class="Countcontainer countinfo">
                          <div class="left">
                          <p>总计(不含运费)</p>
                          <p>已勾选商品<span class="count">{{ this.$store.getters.getCountPrice.count }}</span>件,总价:<span class="count_price">￥{{ this.$store.getters.getCountPrice.amount }}</span>元</p>
                          </div>
                          <div class="right">
                            <mt-button size="small" type="danger">结算</mt-button>
                          </div>
                      </div>
					</div>
				</div>
			</div>
    </div>
</template>

<script>
import numbox from '../../Goods/shopCarnumber.vue'
import axios from 'axios'
export default {
    data(){
        return{
            goodslist:[]
        }
        },
        created() {
          this.getAllCarList()  
        },
        methods: {
            getAllCarList(){
                var  idArr=[]
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id)
                });
                for(let i=0;i<idArr.length;i++){  //由于自己制作的接口原因无法同时获取多个id的数据，我们可以循环获取
                    axios.get("http://localhost:8080/goodsList.php",{
                    params:{
                        //    "id": idArrr.join(',')
                        "id": parseInt(idArr[i])
                    }
                    })
                    .then(res => {
                        if(res.status == 200){
                            this.goodslist.push(res.data)  //res.data是数组对象，push到数组时格式为  [[{ }]]，所以遍历时需要遍历每个数组的第0项
                        }
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                }
            },
            remove(id,index){
                // 列表的数据直接使用索引删除
                this.goodslist.splice(index,1)
                //远程的本地存储数据我们使用store来删除，将id传入
                this.$store.commit('removeCar',id)
            },
            // selectedstatus(id,status){  //监听swipe的开关状态 并传入 id
            //     console.log(id,status);
            //     this.$store.commit('upDataSelected',{id:id,selected:status})
            // }
        },
        components:{
        numbox
    }
    }
</script>

<style lang="scss" scoped>
.shopCarContainer{
    background-color: #eee;
    overflow: hidden;
    .shopinfo{
        display: flex;
    }
    .countinfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
           span{
               color: red;
               margin: 0 5px 0 5px;
               font-weight: bold;
               font-size: 16px;
           }
    }
    img{
        width: 60px;
        height: 60px;;
    }
    h1{
        font-size: 13px;
        margin-bottom: 10px;
        text-align: center;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price{
            color: red;
        }
        .number{
            display: inline-block;
        }
        .del{
            font-size: 12px;
            margin-left: 5px;
        }
        .price_info{
            margin:0;
        }
    }
}
</style>
