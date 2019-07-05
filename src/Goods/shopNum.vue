<template>
    <div>
        <!-- 问题：我们不知道父组件的max值什么时候传入过来，这个时候是undefined -->
        <!-- 我们可以使用watch监听这个值，发生改变我们就最后一次改变的值，这样，就可以解决这个问题了 -->
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="count" ref="number">
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
            //每当发生数据改变时，通过事件调用，将数据传递给子组件
            this.$emit("getcount", parseInt(this.$refs.number.value))
        }
    },
    watch:{
        "max":function(newValue,oldValue){  //监听max,一发生变化就改变max为最新传入的值,这样就可以完美的让数量限制住了 
            mui(".mui-numbox").numbox().setOption('max',newValue)
        }
    },
    props:["max"]
}
</script>
<style lang="scss" scoped>

</style>
