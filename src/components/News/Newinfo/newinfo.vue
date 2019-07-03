<template>
    <div class="newContainer">
       <h3 class="title" >{{ newInfoList.title }}</h3>
       <p class="subtitle">
           <span>发表时间：{{ newInfoList.time | datafilter }}</span>
           <span>来源：{{ newInfoList.src }}</span>
       </p>
       <div class="newInfo" v-html="newInfoList.content "></div>
       <commens></commens>
    </div>
</template>

<script>
import axios from 'axios'
import commens from '../../comment.vue'
export default {
    data(){
        return {
            title: this.$route.params.title,
            newInfoList:[]

        }
    },
    created(){
        this.getNewInfo()
    },
    methods:{
        getNewInfo(){
            axios.post("http://api.wangshuwen.com/getNews")
            .then(res => {
                if(res.status === 200){
            for(var i=0;i<=10;i++){
               if(res.data.data[i].title == this.title){
                   this.newInfoList = res.data.data[i]
               }}
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    components:{
        commens
    }
}
</script>

<style lang="scss">
.newContainer{
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        padding-left:5px;
        padding-right: 5px;
        border-bottom: 2px solid;
        margin-top: 15px;
        padding-bottom: 5px;
    }
    .newInfo{
        font-size: 14px;
        padding-left: 5px;
        img{
            width: 100%;
        }
    }
}
</style>
