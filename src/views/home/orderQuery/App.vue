<style lang="less">
    @bdColor: #d9d9d9;
    body {
        background-color: #f5f5f5;
    }
    .noResult{
        text-align: center;
        color: #999;
        margin-top: .4rem;
    }
    .search {
        background-color: #fff;
        padding: .35rem;
        border-bottom: 1px solid @bdColor;
        .search-text {
            display: flex;
            height: .8rem;
            line-height: .8rem;
            margin-bottom: .4rem;
            overflow: hidden;
            .s-tit {
                display: inline-block;
                width: 1.7rem;
            }
            .c-ip {
                flex: 1;
                border: 1px solid @bdColor;
                text-indent: .2rem;
                vertical-align: middle;
            }
        }
        .s-select {
            position: relative;
            .icon {
                position: absolute;
                top: 50%;
                right: .3rem;
                font-size: .25rem;
                transform: translateY(-50%);
                color: #c9c9c9;
            }
            select {
                text-indent: .2rem;
                option {
                    vertical-align: middle;
                }
            }
        }
        .s-btn {
            flex: 1;
            width: 100%;
            background-color: #004899;
            height: .8rem;
            font-size: .3rem;
            border: 0;
            border-radius: 5px;
            color: #fff;
        }
        .s-time {
            flex: 1;
            border: 1px solid @bdColor;
            display: flex;
            > span {
                color: #999;
                font-size: .24rem;
            }
            > div {
                flex: 1;
                height: 100%;
                text-align: center;
                font-size: .24rem;
                position: relative;
                padding-right: .2rem;
                img {
                    position: absolute;
                    top: 50%;
                    right: .2rem;
                    width: .28rem;
                    height: .28rem;
                    transform: translateY(-50%);
                }
            }
        }
    }

    .content {
        margin-top: .2rem;
        background-color: #fff;
        border-top: 1px solid @bdColor;
        border-bottom: 1px solid @bdColor;
        .temp-app {
            &:nth-last-of-type(1) {
                border-bottom: 0;
            }
        }
    }

    .tempapp-cnt {
        p {
            i {
                color: red;
                &.v-n {
                    visibility: hidden;
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <div class="search">
            <div class="search-text"><span class="s-tit">工单号：</span><input type="text" class="c-ip" placeholder="请输入工单号"
                                                                           v-model="searchGdno"></div>
            <div class="search-text"><span class="s-tit">序列号：</span><input type="text" class="c-ip" placeholder="请输入序列号"
                                                                           v-model="searchSn"></div>
            <div class="search-text"><span class="s-tit">客户名称：</span><input type="text" class="c-ip"
                                                                            placeholder="请输入客户名称"
                                                                            v-model="searchCustName"></div>
            <div class="search-text" style="margin-bottom: 0;"><span class="s-tit"></span>
                <button class="s-btn" @click="searchBtn">查询</button>
            </div>
        </div>
        <div class="noResult" :style="{ display:show2 }">无查询结果</div>
        <div class="content" :style="{ display:show }">
            <tempApp :obj="obj" :seaGd="item.工单号" :seaSn="seaSn" v-for="(item,i) in searchBot" :key="i">
                <div slot="content" class="tempapp-cnt">
                    <p>工单号：{{item.工单号}}</p>
                    <p>序列号：{{item.序列号}}</p>
                    <p>客户名称：{{item.客户名称}}</p>
                    <p>任务类型：{{item.故障类型}}</p>
                </div>
            </tempApp>
            <!--<tempApp >-->
            <!--<div slot="content" class="tempapp-cnt">-->
            <!--<p>工单号：</p>-->
            <!--<p>序列号：</p>-->
            <!--<p>客户名称：</p>-->
            <!--<p>任务类型：</p>-->
            <!--</div>-->
            <!--</tempApp>-->
        </div>
    </div>
</template>

<script>
    import tempApp from 'components/tempApp'

    export default {

        data() {
            return {
                obj: {
                    src: "./orderQueryDetail.html?",
                },
                startTime: '',
                endTime: '',
                show: 'none',
                show2:'none',
                searchBot: [],
                searchGdno: "",
                searchSn: "",
                searchCustName: "",
                seaGd: "",
                seaType: "1",
                seaSn: "",
                seaCustName: "",
                strPageCount:1,
                strPageRows:10,
            }
        },
        mounted() {
            var self = this;
            $(window).scroll(function(){

                let scrollTop = $(this).scrollTop();
                let scrollHeight = $(document).height();
                let windowHeight = $(this).height();

                if(scrollTop + windowHeight == scrollHeight){
                    // self.strPageRows=self.strPageRows+10;
                    // self.strPageCount++;
                    console.log('每页页数'+self.strPageRows);
                    console.log('当前页数'+self.strPageCount);
                    // self.getPor();
                    setTimeout(() => {
                      self.strPageRows = self.strPageRows + 4;
                      self.getPor();
                    }, 500);
                  }
            });
            this.searchBtn();
        },
        methods: {

            searchBtn() {
                this.strPageCount=1;
                this.StrPageRows=10;
                let param = {
                    strGDNO: this.searchGdno,
                    strSN: this.searchSn,
                    strCustName: this.searchCustName,
                    strType: 0,
                    strPageCount: this.strPageCount,
                    strPageRows: this.strPageRows

                };

                this.until.post('/HTWeChat/HTBills/HTOrderList', param)

                    .then(res => {

                        if (res.msg == '') {
                            this.show = 'block';
                            this.searchBot = res.data;
                            console.log(res.data);
                            this.show2 = 'none';

                        } else {
                            this.show = 'none';
                            this.show2 = 'block'
                        }
                    }, err => {
                        this.show = 'none';
                    })
            },
            getPor(){
                console.log('每页页数2：'+this.StrPageRows);
                let param = {
                    strGDNO: this.searchGdno,
                    strSN: this.searchSn,
                    strCustName: this.searchCustName,
                    strType: 0,
                    strPageCount: this.strPageCount,
                    StrPageRows:this.strPageRows,
                    // StrPageRows:9,

                };

                this.until.post('/HTWeChat/HTBills/HTOrderList', param)

                    .then(res => {

                        if (res.msg == '') {
                            this.show = 'block';
                            this.searchBot = res.data;

                            // this.searchBot = this.searchBot.concat(res.data);
                            console.log(this.searchBot);

                            sessionStorage.strGDNO = this.searchGdno;
                            sessionStorage.strSN = this.searchSn;
                            sessionStorage.strCustName = this.searchCustName;
                            // sessionStorage.StrPageRows = this.StrPageRows;

                        } else {


                        }
                    }, err => {
                        this.show = 'none';
                        alert('请输入正确数值');
                    })

            },
        },
        components: {
            tempApp,
        }
    }
</script>

