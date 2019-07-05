<template>
    <div class="goodscomments">
        <h3>{{ info.title }}</h3>
        <hr>
    <div class="commentcontainer">
        <p>{{ info.content }}</p>
        <img :src="info.url" alt="info.title">
    </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            id:this.$route.params.id,
            info:{}
        }
    },
    created(){
        this.getinfo()
    },
    methods:{
        getinfo(){
            axios.get("http://localhost:8080/goodsList.php",{
                params:{
                    "id":this.id
                }
            })
            .then(res => {
                this.info = res.data[0]
            })
            .catch(err => {
            console.error(err); 
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.goodscomments{
    h3{
        font-size:16px; 
        text-align: center;
        line-height: 30px;
    }
    .commentcontainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        img{
            width: 100%;
        }
    }
}
</style>
