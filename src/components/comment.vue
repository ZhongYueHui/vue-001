<template>
    <div class="commentcontainer">
        <h3>发表评论</h3>
        <textarea class="textcontainer" placeholder="请输入你的评论内容(最多120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large" class="postComments">发表评论</mt-button>
        <div class="commentsList">
            <ul class="commentsInfo" v-for="(item, index) in commentsList" :key="index">
                <li class="commentsPeople">第楼 {{ index+1 }} 用户：{{ item.name }} 发表时间：{{ item.item | datafilter }}</li>
                <li class="commentsWords">{{ item.content }}</li>
            </ul>
        </div>
        <mt-button type="danger" size="large" plain class="loadingMore" @click="getMore"> 加载更多</mt-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            commentsList:[],
            page:1
        }
    },
    created(){
        this.getcomments()
    },
    methods:{
        getcomments(){
            axios.get("http://localhost:8080/comments.php",{
                    params: {
                    page: this.page
                    }
            })
            .then(res => {
                this.commentsList = res.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        getMore(){
            this.page++
            this.getcomments()
        }
    }
}
</script>

<style lang="scss" scoped>
.commentcontainer{
    h3{
        font-size: 16px;
    }
    .textcontainer{
        font-size: 12px;
        margin: 0;
    }
    .commentsList{
        .commentsInfo{
            list-style-type: none;
            margin: 0;
            padding: 0;
            font-size: 13px;
            .commentsPeople{
            background-color: #ccc;
            }
            .commentsWords{
                text-indent: 2em;
                margin: 5px;
            }
        }
    }
    .postComments{
        margin: 10px 0 15px 0;
    }
    .loadingMore{
        margin: 15px 0 15px 0;
    }
}
</style>
