<template>
    <div>
        <div id="slider" class="mui-slider ">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0?'mui-active':'']" v-for="item in allCategories" :key="item.id" @click="getmore(item.id)">
							{{ item.name }}
						</a>
					
					</div>
				</div>
        </div>

        <ul class="photsList">
        <router-link v-for="item in imageList" :key="item.id" :to="'/home/photosInfo/'+item.id" tag="li">
         <img v-lazy="item.url" class="img">
         <div class="info"> 
            <span class="infoXx">
                 <p>{{ item.utag }}</p>
                 <p>{{ item.create_time }}</p>
            </span>
         </div>
  </router-link>
</ul>
    </div>
</template>

<script>
import mui  from '../lib/Mui/js/mui'
import axios from 'axios'
export default {
    data(){
        return{
            allCategories:[],
            imageList:[]
        }
    },
    created(){
        this.getAllCategories()
        this.getImageslist("36")
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
    	    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
    },
    methods:{
        getAllCategories(){
            axios.get("http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome")  //获取图片的分类
            .then(res => {
                if(res.status ===200 ){
                console.log(res.data.data)
                res.data.data.unshift({"create_time":"2019-07-03 22:07:52 ",name:"全部",id:"0","tag":""})
                this.allCategories = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        getImageslist(catId){
            axios.get("http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid="+catId+"&start=1&count=10&fr8om=360chrome")
            .then(res => {
                console.log(res.data.data)
                if(res.status === 200){
                    this.imageList = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        getmore(id){
        axios.get("http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid="+id+"&start=1&count=10&fr8om=360chrome")
        .then(res => {
            console.log(res)
            if(res.status === 200){
                    this.imageList = res.data.data
                }
        })
        .catch(err => {
            console.error(err); 
        })
    },
    },
  
}
</script>   

<style lang="scss" scoped>
* {
    touch-action: pan-x;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.photsList{
    padding: 0;
    margin: 10px;
    box-shadow: 0 0 9px #ccc;
    li{
        background-color: #ccc;
        text-align:center;
        margin-bottom: 10px;
        position: relative;
    }
    .info{
        position: absolute;
        bottom: 0;
        max-height: 400px;
        .infoXx{
            color: white;
            text-align: left;
        }
    }
}
.img{
  width: 100%;
  height: 400px;
  vertical-align: middle;
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
