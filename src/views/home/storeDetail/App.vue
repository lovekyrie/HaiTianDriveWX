<style lang="less">
    @bdColor: #d9d9d9;
    body {
        background-color: #f5f5f5;
    }

    .sd-cnt {
        background-color: #fff;
        border-bottom: 1px solid @bdColor;
        padding: .35rem;
        p {
            margin-bottom: .2rem;
        }
        i {
            color: red;
            &.v-n {
                visibility: hidden;
            }
        }
    }
</style>

<template>
    <div id="container">
        <div class="sd-cnt tempapp-cnt" v-for="(item,index) in searchCkxq" :key="index">
            <p><i>* </i>出货日期：{{item.出货日期}}</p>
            <p><i>* </i>物料号：{{item.物料号}}</p>
            <p><i>* </i>规格/型号：{{item.规格型号}}</p>
            <p><i>* </i>序列号：{{item.序列号}}</p>
            <p><i class="v-n">* </i>数量：{{item.数量}}</p>
            <p><i class="v-n">* </i>单位：{{item.单位}}</p>
            <p><i class="v-n">* </i>客户名称：{{item.客户名称}}</p>
            <p><i class="v-n">* </i>合同订单号：{{item.合同订单号}}</p>
            <p><i class="v-n">* </i>销售出库单号：{{item.出库单号}}</p>
            <p><i>* </i>所属事业部：{{item.所属事业部}}</p>
            <p><i class="v-n">* </i>更新日期：{{item.更新日期}}</p>
            <p><i class="v-n">* </i>备注：{{item.备注}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchCkxq: [],
                xlh: '',
            }
        },
        mounted() {
            this.searchCkx();
// 获取url参数

        },
        methods: {
            searchCkx() {
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

                let xlh = getParamer("strSn");
                console.log(xlh);
                let param = {
                    strSN: xlh,
                    DateS: "",
                    DateE: "",
                    strItemNo: "",
                    strModel: "",
                    strDeptName: "",
                    strCustName: "",
                };
                console.log(param);

                this.until.post('/HTWeChat/HTBills/ICStockItemList', param)
                    .then(res => {
                        if (res.msg == '') {
                            this.searchCkxq = res.data;
                        }
                    }, err => {
                    })
            },
        },

    }
</script>

