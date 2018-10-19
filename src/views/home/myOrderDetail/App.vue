<style lang="less">
.content {
  padding-left: 0.35rem;
  > p {
    margin-top: 0.6rem;
    line-height: 1;
    font-size: 0.28rem;
    
  }
  .imgshow {
    display: flex;
    padding-top: 0.3rem;
    .c-m {
      margin-right: 0;
    }
    .upimg {
      position: relative;
      border: 1px solid #999;
      background-color: #fff;
      width: 2rem;
      height: 1.2rem;
      background: url("./img/up.png") 50% 50% no-repeat;
      background-size: 0.41rem 0.41rem;
      margin-right: 0.38rem;
      overflow: hidden;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
      svg {
        position: absolute;
        top: 0.2rem;
        right: 0;
        font-size: 0.35rem;
        color: red;
      }
    }
  }
  >img{
      width: 50%;
      height: 50%;
  }
}

.yd-timeline {
  margin: 0.2rem 0;
}
</style>

<template>
    <div id="container">
        <div class="content" v-for="(item,i) in myOrderXq" :key="i">
            <p>工单号：{{item.任务单号}}</p>
            <p>任务类型：{{item.故障类型}}</p>
            <p>信息来源：{{item.信息来源}}</p>
            <p>客户名称：{{item.客户名称}}</p>
            <p>联系人：{{item.联系人}}</p>
            <p>客户地址：{{item.地址}}</p>
            <p>性别：{{item.性别}}</p>
            <p>手机：{{item.手机}}</p>
            <p>电话：{{item.电话}}</p>
            <p>传真：{{item.传真}}</p>
            <p>邮箱：{{item.邮箱}}</p>
            <p>提交处理：{{item.提交处理}}</p>
            <p>接线员：{{item.接单人}}</p>
            <p>创建时间：{{item.创建时间}}</p>
            <p>所属事业部：{{item.所属事业部}}</p>
            <p>产品分类：{{item.产品分类}}</p>
            <p>内容描述：{{item.维修内容}}</p>
            <p>故障描述：{{item.故障描述1}}</p>
            <div class="imgshow">
                <span class="upimg"  v-for="(img,index) in imgArr" :key="index">
                    <img :src="img">
                </span>
            </div>
            <p>是否重要故障：{{item.是否重要故障}}</p>
            <p>故障代码：{{item.故障代码}}</p>
            <p>维修情况：{{item.维修情况}}</p>
            <p>保修情况：{{item.保修情况}}</p>
            <p>提前发货：{{item.提前发货}}</p>
            <p>免费索赔：{{item.免费索赔}}</p>
            <p>任务类型：{{item.故障类型}}</p>
            <p>派工日期：{{item.派工日期}}</p>
            <p>故障类型：{{item.确认故障类型}}</p>
            <p>信息接收人：{{item.接单人}}</p>
            <p>故障分类：{{item.故障分类}}</p>
            <p>服务人员：{{item.服务人员}}</p>
            <p>派工人员：{{item.派工人员}}</p>
            <p>所属区域：{{item.所属区域}}</p>
            <p>设备型号：{{item.设备型号}}</p>
            <p>物料号：{{item.物料号}}</p>
            <p>序列号：{{item.序列号}}</p>
            <p>替代品序列号：{{item.替代品序列号}}</p>
            <p>使用年限：{{item.使用年限}}</p>
            <p>出厂日期：{{item.出厂日期}}</p>
            <p>保修年限：{{item.报修年限}}</p>
            <p>处理措施：{{item.处理措施}}</p>
            <p>反馈时间：{{item.反馈时间}}</p>
            <p>客户评价：{{feedback}}</p>
            <p>客户签字：</p>
            <img v-show="showSign" :src="customerSign" alt="客户签字" >
            
        </div>
        <!-- <yd-timeline>
            <yd-timeline-item>
                <p>【南宁市】您的订单在京东【南宁分拨中心】发货完成，准备送往京东【南宁安吉站】</p>
                <p style="margin-top: 10px;">2017-08-17 21:44:08</p>
            </yd-timeline-item>
            <yd-timeline-item>
                <p>【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。</p>
                <p style="margin-top: 10px;">2017-08-18 08:24:18</p>
            </yd-timeline-item>
            <yd-timeline-item>
                <p>【南宁市】您的订单已到达【南宁安吉站】</p>
                <p style="margin-top: 10px;">2017-08-18 07:25:08</p>
            </yd-timeline-item>
            <yd-timeline-item>
                <p>【南宁市】您的订单在京东【南宁分拨中心】发货完成，准备送往京东【南宁安吉站】</p>
                <p style="margin-top: 10px;">2017-08-17 21:44:08</p>
            </yd-timeline-item>
        </yd-timeline> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      sRwdh: "",
      myOrderXq: [],
      strID: "",
      imgArr: [],
      feedback: "",
    };
  },
  computed:{
    showSign(){
      if(this.until.loGet(this.sRwdh+'custSign')){
        return true;
      }
      else{
        return false;
      }
    },
    customerSign(){
      return this.until.loGet(this.sRwdh+'custSign');
    }
  },
  mounted() {
    sessionStorage.history = history.length;
    this.searchWdgdxq();
    this.loadingSurvey();
  },
  methods: {
    searchWdgdxq() {
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

      this.sRwdh = getParamer("strGDNO");
      this.strID = this.until.loGet("userPk");
      let param = {
        strDateS: "",
        strDateE: "",
        strGDNO: this.sRwdh,
        strType: 1,
        StrEmpId: this.strID
      };
      this.until
        .post("/HTWeChat/HTBills/HTGetMyProcessedOrderList", param)
        .then(
          res => {
            if (res.msg == "") {
              this.myOrderXq = res.data;
              this.imgArr = res.data[0].故障图片;
              console.log(this.moOrderXq);
            }
          },
          err => {}
        );
    },

    loadingSurvey() {
      let param = {
        jobNumber: this.sRwdh
      };

      this.until.get("/prod/satis/wnfo", param).then(
        res => {
          if (res.status === "200") {
            let info = res.data.satisFactionsVo;
            this.feedback = info.feedback;
          }
        },
        err => {}
      );
    }
  }
};
</script>

