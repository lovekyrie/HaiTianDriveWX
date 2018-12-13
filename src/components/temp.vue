<style lang="less" scoped>
    .temp {
        background-color: #fff;
        font-size: .24rem;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: .2rem;
        /*margin-top: 1.2rem;*/
    }

    .temp-title {
        height: .9rem;
        line-height: .9rem;
        border-bottom: 1px solid #d9d9d9;
        padding-left: .35rem;
        .tit-btn {
            display: inline-block;
            width: 2rem;
            height: .6rem;
            background-color: #004899;
            color: #fff;
            border-radius: .3rem;
            margin-right: .35rem;
            margin-top: .15rem;
            font-size: .24rem;
        }
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
        color: #d9d9d9;
        font-size: .35rem;
    }
</style>

<template>
    <div class="temp" v-show="show" :style="{'margin-top':tempMargin}">
        <div class="temp-title" v-for="(a,i) in getP" :key="i" v-if="i==lis"><span>工单号：{{a.任务单号}}</span>
            <button class="tit-btn fr" v-if="mode==2" @click="mydSrc(obj.survey)">满意度调查</button>
        </div>
        <div class="temp-content" v-for="(item,i) in getP" :key="item.rowbumber" v-if="i==lis" @click="toLink(obj.src)">
            <p>任务类型：{{item.故障类型}}</p>
            <p>客户名称：{{item.客户名称}}</p>
            <p>故障描述：{{item.故障描述}}</p>
            <svg class="icon" aria-hidden="true"  v-if="count != 1">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            obj: {
                type: Object,
                default: []
            },
            getP: {
                type: Array,
                default: []
            },
            mode: {
                type: Number,
                default: []
            },
            lis: {
                type: Number,
                default: []
            },
            show: {
                type: Boolean,
                default: {},
            },
            seaGdArr: {
                type: Array,
                default: [],
            },
            count: {
                type: Number,
                default: [],
            }
        },
        data() {
            return {
                userSearch: "",
                seaType: "1",
                seaGd: "",
                tempMargin: ''
            }
        },
        // mode: {
        //   type: String,
        //   required: true
        // }
        mounted() {
            if (this.lis == 0 && this.mode == 1) {
                this.tempMargin = 1.2 + 'rem';
            } else if (this.lis == 0 && this.mode == 2) {
                this.tempMargin = 2.1 + 'rem';
            }
            console.log(this.mode);
        },
        methods: {
            toLink(src) {
                this.seaGd = this.seaGdArr[this.lis];
                location.href = src + 'strSn=' + this.seaSn + '&strType=' + this.seaType + "&strGDNO=" + this.seaGd;
            },
            mydSrc(survey) {
                this.seaGd = this.seaGdArr[this.lis];
                location.href = survey + "&strGDNO=" + this.seaGd;
                // location.href = survey;

            }
        },
    }
</script>