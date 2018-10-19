<style lang="less">
    body{
        background-color: #f5f5f5;
    }
    .opt-one{
        background-color: #fff;
        position: relative;
        padding: .35rem .75rem .35rem .4rem;
        font-size: .24rem;
        border-bottom: 1px solid #d9d9d9;
        span{
            &.f-c{
                color: #999;
            }
        }
        svg{
            position:absolute;
            top:50%;
            right: .3rem;
            transform: translateY(-50%);
            font-size: .2rem;
            color: #c9c9c9;
        }
    }
    .opt-sel{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .opt-textarea{
        position: relative;
        padding: .35rem;
        padding-left: 1.7rem;
        span{
            position: absolute;
            top: .35rem;
            left: .35rem;
        }
        textarea{
            width: 100%;
            height: 1.35rem;
            border-color: #d9d9d9;
            padding: .1rem;
            font-size: .24rem;
        }
    }

    .rq{
        margin-top: .2rem;
        border-top: 1px solid #d9d9d9;
    }

    .opt-img {
        padding: .35rem;
        .imgshow {
            display: flex;
            padding-top: .3rem;
            .c-m{
                margin-right: 0;
            }
            .upimg {
                position: relative;
                border: 1px solid #999;
                background-color: #fff;
                width: 2rem;
                height: 1.2rem;
                background: url("./img/up.png") 50% 50% no-repeat;
                background-size: .41rem .41rem;
                margin-right: .38rem;
                overflow: hidden;
                &:nth-last-of-type(1){
                    margin-right: 0;
                }
                input {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                svg{
                    position: absolute;
                    top: .2rem;
                    right: 0;
                    font-size: .35rem;
                    color: red;
                }
            }
        }
    }
</style>

<template>
    <div id="container">
        <div>
            <div class="opt-one">
                <span>工单号</span>
                <span class="opt-cnt f-c fr">5646546546</span>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">123123</option>
                </select>
                <span>任务类型</span>
                <span class="opt-cnt fr">故障维修</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">123123</option>
                </select>
                <span>信息来源</span>
                <span class="opt-cnt fr">客户来电</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <span>客户名称</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <span>联系人</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <span>客户地址</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>性别</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <span>手机</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <span>电话</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <span>传真</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <span>邮箱</span>
                <span class="opt-cnt fr">海天台</span>
            </div>

            <div class="opt-one">
                <span>提交处理</span>
                <span class="opt-cnt f-c fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>接线员</span>
                <span class="opt-cnt f-c fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>创建时间</span>
                <span class="opt-cnt f-c fr">5646546546</span>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>所属事业部</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>产品分类</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-textarea opt-one">
                <span style="vertical-align: top">内容描述</span>
                <textarea placeholder="多行输入"></textarea>
            </div>
        </div>

        <div class="rq">
            <div class="opt-one">
                <span>故障描述</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-img opt-one">
                <span><i>*</i>故障图片</span>
                <div class="imgshow">
                    <span class="upimg" v-for="(img,index) in imgArr">
                        <img :src="img">
                        <svg class="icon" aria-hidden="true" @click="deleteImgUrl(index)"><use xlink:href="#icon-guanbi"></use></svg>
                    </span>
                    <span class="upimg c-m" v-if="imgArr.length < 3"><input type="file" multiple></span>
                </div>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>是否重要故障</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>重点故障</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>维修情况</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>保修情况</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>提前发货</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>免费索赔</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>任务类型</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <span>派工日期</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>故障类型</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>信息接收人</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>故障分类</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <span>服务人员</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>派工人员</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>

            <div class="opt-one">
                <select class="opt-sel">
                    <option value="">男</option>
                    <option value="">女</option>
                </select>
                <span>所属区域</span>
                <span class="opt-cnt fr">男</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>
        </div>

        <div class="rq">
            <div class="opt-one">
                <span>设备型号</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>物料号</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>序列号</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>替代品序列号</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>使用年限</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>出厂日期</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>

            <div class="opt-one">
                <span>保修年限</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>
        </div>

        <div class="rq">
            <div class="opt-textarea opt-one">
                <span style="vertical-align: top">处理措施</span>
                <textarea placeholder="多行输入"></textarea>
            </div>

            <div class="opt-one">
                <span>反馈时间</span>
                <span class="opt-cnt fr">5646546546</span>
            </div>
        </div>

        <div class="g-button"><button>确定</button></div>

    </div>
</template>

<script>
  import up from './img/up.png'

  export default {
    data() {
      return {
        imgArr: [up,up,up]
      }
    },
    methods:{
      /*删除图片*/
      deleteImgUrl(index){
        this.imgArr.splice(index,1);
      }
    }
  }
</script>

