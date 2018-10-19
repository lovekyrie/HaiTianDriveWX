<style lang="less">
    body {
        background-color: #f5f5f5;
    }

    .content {
        background-color: #fff;
        border-bottom: 1px solid #d9d9d9;
        padding: .35rem;
        overflow: hidden;
    }

    h3, h4 {
        font-weight: normal;
        line-height: 2;
        font-size: .28rem;
    }

    h4 {
        text-indent: .4rem;
    }

    .c-cnt {
        text-indent: .4rem;
        font-size: .24rem;
        color: #666;
        margin-bottom: .5rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .time {
        font-size: .24rem;
        color: #666;
        text-align: right;
    }
</style>

<template>
    <div id="container">
        <div class="content">
            <h3>各部门负责人/同事：</h3>
            <h4>大家好！</h4>
            <p class="c-cnt">{{notice.bulletinNm}}</p>
            <p class="time clearfix">{{notice.bulletinTm}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                notice:{}
            }
        },
        created(){
            this.searchGdx();
        },
        methods: {

            searchGdx() {
                function getParamer(paramer) {
                    let url = window.location.href.split("?")[1];
                    if (url.indexOf("&") > 0) {
                        let urlParamArray = url.split("&");
                        for (let i = 0; i < urlParamArray.length; i++) {
                            let paramerName = urlParamArray[i].split("=");
                            if (paramer == paramerName[0]) {
                                return paramerName[1];
                            }
                        }
                    } else {
                        let paramerValue = url.split("=")[1];
                        return paramerValue;
                    }
                }

                let noticePk=getParamer('strGDNO');
                //不是传参数格式
                this.until.get('/prod/tice/info/'+noticePk)
                .then(res=>{

                    if(res.status==='200'){
                        this.notice=res.data;
                    }
                },err=>{
                    
                    console.log(err);
                })
            }
        }
    }
</script>

