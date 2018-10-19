<style lang="less">
    body, .yd-tab-panel {
        background-color: #f5f5f5;
    }

    .yd-tab-panel {
        margin-top: .2rem;
        border-top: 1px solid #d9d9d9;
    }

    .temp-war {
        position: relative;
        padding-left: .2rem;
        h3 {
            font-weight: normal;
            span {
                float: right;
                padding-right: .6rem;
                color: #999;
            }
        }
        p {
            margin-top: .2rem;
            padding-right: .6rem;
            color: #999;
        }
        i {
            position: absolute;
            top: 50%;
            left: -.05rem;
            transform: translateY(-50%);
            display: inline-block;
            width: .12rem;
            height: .12rem;
            background-color: red;
            border-radius: 50%;
        }
    }
</style>

<template>
    <div id="container">
        <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel label="工单提醒">
                <tempApp :obj="obj" :isShow="false" v-for="(item, index) in remindNoticeList" :key="index">
                    <div slot="content" class="temp-war">
                        <h3>您有新的任务<span>{{item.派单时间 | toFormat}}</span></h3>
                        <p class="ell">您有一条{{item.故障类型}}，请到“待办工单”里查看详情</p>
                        <i></i>
                    </div>
                </tempApp>
            </yd-tab-panel>

            <yd-tab-panel label="公司公告">
                <tempApp :obj="obj" :seaGd="item.noticePk"  v-for="(item, index) in announceList" :key="index">
                    <div slot="content" class="temp-war">
                        <h3>{{item.bulletinTitle}}<span>{{item.bulletinTm | toFormat}}</span></h3>
                        <p class="ell">{{item.bulletinNm}}</p>
                        <i></i>
                    </div>
                </tempApp>
            </yd-tab-panel>

        </yd-tab>
    </div>
</template>

<script>
    import tempApp from 'components/tempApp.vue';

    export default {
        data() {
            return {
                tab2: 0,
                obj: {
                    src: './msgCnt.html?'
                },
                pageSize:10,
                pageCount:1,
                announceList:[],
                remindNoticeList:[]
            }
        },
        filters:{
            toFormat(input){
               let first= input.slice(-8);
               return first.substring(0,5);
            }
        },
        created(){
            this.searchAnnounce();
            this.findRemindNotice();
        },
        mounted(){

            var that=this;
            //实现手机端下拉滚动加载数据，类似pc端的分页
            $(window).scroll(function(){
                let scrollHeight=$(this).scrollTop();//滚动距离
                let height=$(this).height();//窗体的高度
                let actualHeight=$(document).height();//文档的高度
                if(scrollHeight+height>=actualHeight){
                    that.pageCount++;
                    that.pageSize+=10;
                    that.searchAnnounce();
                }
            })
        },
        methods: {
            fn(label, key) {
                console.log(label, key);
            },
            itemClick(key) {
                console.log(key);
                this.tab2 = key;

            },
            searchAnnounce(){
                let query= new this.Query;
                let queryValue=query.buildPageClause(this.pageCount,this.pageSize);
                let param={
                    query:JSON.stringify(queryValue.queryClause)
                };

                console.log('调用方法开始');
                this.until.get('/prod/tice/page',param)
                .then(res=>{

                    if(res.status==200){
                        console.log(res);
                        console.log(res.data.items);
                        this.announceList=res.data.items;
                    }
                  
                },err=>{

                    console.log(err);
                })
            },
            findRemindNotice(){
                let gdNo=this.until.loGet('userPk');
                let param={
                    strEmpID:gdNo
                }
                this.until.post('/HTWeChat/HTBills/HTMyOrderRemindList',param)
                .then(
                    res=>{
                        this.remindNoticeList=res.data;
                    },
                    err=>{
                        console.log(err);
                    }
                )
            }
        },
        components: {
            tempApp
        }
    }
</script>

