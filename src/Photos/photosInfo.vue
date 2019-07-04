<template>
    <div class="AllInfo">
        <h3 class="imagetitle">{{ imageInfo.utag }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ imageInfo.create_time }}</span>
            <span>点击：{{ imageInfo.download_times}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="smollImage">
             <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>

        <div class="photcontanier">
            <p class="wordInfo"> 
                人生如画，有了微笑的画卷便添了亮丽的色彩。
                人生如酒，有了微笑的美酒便飘着诱人的醇香。
                人生如歌，有了微笑的歌声便多了动人的旋律。
                人生如书，有了微笑的书籍便有了闪光的主题。给自己一个微笑，让心情开心；
                给别人一个赞赏的微笑，或许可以成为种种鼓励。微笑面对人生，将会有微笑的回报。
            </p>
        </div>
        <comment></comment>
    </div>
</template>

<script>
import axios from 'axios'
import comment from '../components/comment.vue'
export default {
    data(){
        return{
            id: this.$route.params.id,
            imageInfo:{},
            list:[]
        }
    },
    created(){
        this.getimageInfo()
    },
    methods:{
        getimageInfo(){
            axios.get("http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=36&start=1&count=100&fr8om=360chrome")
            .then(res => {
                console.log(res.data.data[0])
                for(let i=0;i<=100;i++){
                    if(this.$route.params.id == res.data.data[i].id){
                        this.imageInfo = res.data.data[i]
                        this.list.unshift({"msrc":res.data.data[i].url_thumb,"src":res.data.data[i].url,"alt":res.data.data[i].utag,"title":"Image caption  "  +i,"h":400,"w":600,"msrc":res.data.data[i].url})
                        break
                    } 
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
   components:{
       comment,
   }
}
</script>   

<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
.AllInfo{
    .imagetitle{
        font-size: 16px;
        text-align: center;
        color: #26A2FF;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
    }
        span{
            line-height: 40px;
        }
    .photcontanier{
        .wordInfo{
            font-size: 12px;
            color: black;
            line-height: 30px;
        }   
    }
    .smollImage{
        img{
            width: 120px;
            height: 120px;
        }
    }   
}

</style>