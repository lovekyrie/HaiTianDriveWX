<style lang="less" scoped>
    .c-pos {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        > div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 5.2rem;
            background-color: #fff;
            border-radius: 5px;
            >div{
                >p{
                    text-align: center;
                    margin: .3rem 0;
                    color: #666;
                    overflow: hidden;
                }
                &:nth-of-type(1){
                  >p{
                      margin: 0;
                      color: #000;
                      height: 1rem;
                      line-height:1rem;
                      img{
                          display: inline-block;
                          width: .32rem;
                          height: .32rem;
                          margin-right: .1rem;
                          vertical-align: -6%;
                      }
                  }
                }
                &:nth-of-type(2){
                    padding:  0 .4rem;
                    border-top: 1px solid #d9d9d9;
                    border-bottom: 1px solid #d9d9d9;
                }
                &:nth-of-type(3){

                }
            }
        }
    }
</style>

<template>
    <div id="temp">
        <div class="c-pos">
            <div @click.stop>
                <div><p><img src="./img/war.png"><span>提示</span></p></div>
                <div><p>预约报修已提交，我们会安排工作人员，尽快与您联系！</p></div>
                <div><p @click="cancelBtn">谢谢合作</p></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
        value:{
          type:Boolean,
          default:false
        }
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods:{
      cancelBtn(){
        history.back();
      }
    }
  }
</script>