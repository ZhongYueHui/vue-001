<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.url">
					<router-link :to="'/home/newlist/newinfo/'+item.title">
						<img class="mui-media-object mui-pull-left" :src=" item.pic ">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
                            <p class='mui-ellipsis'>
							<span>发表时间：{{ item.date | datafilter}}</span>
                            <span>来源于:{{ item.src }}</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            newList:[],
            id:null
        }
    },
    created(){
        this.getNewList()
    },
    methods:{
        getNewList(){
            axios.post("http://api.wangshuwen.com/getNews")
            .then(res => {
                if(res.status === 200){
                    this.newList = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
    }
}   
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: lightblue;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>