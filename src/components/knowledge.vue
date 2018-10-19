<style lang="less" scoped>
    #temp {
        background-color: #fff;
        font-size: .24rem;
        border-bottom: 1px solid #d9d9d9;
        overflow: hidden;
    }

    .temp-content {
        position: relative;
        padding: .35rem;
        p {
            line-height: 1;
            margin-bottom: .3rem;
            &:nth-last-of-type(1) {
                margin-bottom: 0;
            }
        }
    }

    svg {
        position: absolute;
        right: .35rem;
        top: 50%;
        transform: translateY(-50%);
        color: #004899;
        font-size: .5rem;
    }

    .temp-war {
        position: relative;
        padding-left: 1.2rem;
        h3 {
            font-weight: normal;
        }
        p {
            margin-top: .2rem;
            padding-right: .6rem;
            color: #999;
            line-height: 1.5;
        }
        img {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: .88rem;
            height: .83rem;
            vertical-align: middle;
        }
    }
</style>

<template>
    <div id="temp">
        <div class="temp-content" v-for="(item,i) in zzTitle" :key="i" v-if="i==lis">
            <div class="temp-war">
                <img :src="imgType[imgName]">
                <h3>{{item.标题}}</h3>
                <p>上传者：{{item.创建人}}&nbsp;&nbsp;{{item.创建时间}}</p>
            </div>
            <svg class="icon" aria-hidden="true" @click="toLink(oSrc[lis])">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <p>{{oSrc[lis]}}</p>
        </div>
    </div>
</template>

<script>
    import word from './img/word.png'
    import excel from './img/excel.png'
    import ppt from './img/ppt.png'
    import pdf from './img/pdf.png'

    export default {
        props: {
            zzTitle: {
                type: Array,
                default: []
            },
            lis: {
                type: Number,
                default: []
            },
            oLxtb: {
                type: Array,
                default: []
            },
            oSrc: {
                type: Array,
                defauly: []
            }

        },
        data() {
            return {
                imgType: {
                    word, excel, ppt, pdf
                },
                imgName: "",
            }
        },
        mounted() {
            if (this.oLxtb[this.lis] == ".xls" || this.oLxtb[this.lis] == ".xlsx") {
                this.imgName = "excel"
            } else if (this.oLxtb[this.lis] == ".doc" || this.oLxtb[this.lis] == ".docx") {
                this.imgName = "word"
            } else if (this.oLxtb[this.lis] == ".ppt" || this.oLxtb[this.lis] == ".pptx") {
                this.imgName = "ppt"
            } else if (this.oLxtb[this.lis] == ".pdf") {
                this.imgName = "pdf"
            }

        },
        methods: {
            toLink(src) {
                // location.href =' ../../'+src;
                const netWorkUrl = 'http://server.haitiandrive.com:90/HTASFile/';
                console.log(src);
                window.open(netWorkUrl + src);
            }

        }
    }
</script>