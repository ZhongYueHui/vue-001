<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in swpieList" :key="item.url" >
                 <img :src="item.url" :class="{'full': isfull}">  <!--是否100%宽度 -->
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['swpieList',"isfull"]
}
</script>

<style lang="scss">
.mint-swipe{
    height: 200px;
    text-align: center;
    .mint-swipe-item{
        img{
            // width: 100%;
            height: 100%;
        }
        }
    }
.full{
    width: 100%;
}
</style>
