<template>
    <div>
        <!-- 问题：我们不知道父组件的max值什么时候传入过来，这个时候是undefined -->
        <!-- 我们可以使用watch监听这个值，发生改变我们就最后一次改变的值，这样，就可以解决这个问题了 -->
        <div class="mui-numbox" data-numbox-min='1' style="height:25px;width:110px;">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="countNumber" @change="count" ref="number" readonly>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>
<script>
import mui from '../lib/Mui/js/mui.js'
export default {
    mounted(){
        // 初始化这个number box 
        mui('.mui-numbox').numbox()
    },
    methods:{
        count(){
           this.$store.commit('upShopCarCount',{
               id:parseInt(this.countId),
               count:parseInt(this.$refs.number.value)
           })
        }
    },
    // 父组件传入过来的的商品count总数 和是哪个商品的总数的id
    props:["countNumber","countId"]
}
</script>
<style lang="scss" scoped>

</style>
