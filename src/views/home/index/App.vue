<style lang="less">
body {
  background: url("./img/bg.png") no-repeat;
  background-size: cover;
}

.option {
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  padding: 0 0.4rem;
  > div {
    margin-top: 0.85rem;
    width: 33.33%;
    text-align: center;
    > a {
      font-size: 0;
      img {
        width: 1.31rem;
        height: 1.33rem;
      }
      p {
        font-size: 0.24rem;
        color: #fff;
        line-height: 2;
      }
    }
  }
}
</style>

<template>
    <div id="container">
        <div class="option">
            <div v-for="(opt,index) in options" :key="index">
                <a :href="opt.href">
                    <img :src="opt.img">
                    <p>{{opt.title}}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import log1 from "./img/log_1.png";
import log2 from "./img/log_2.png";
import log3 from "./img/log_3.png";
import log4 from "./img/log_4.png";
import log5 from "./img/log_5.png";
import log6 from "./img/log_6.png";
import log7 from "./img/log_7.png";
import log8 from "./img/log_8.png";
import log9 from "./img/log_9.png";
import log10 from "./img/log_10.png";
import log11 from "./img/log_11.png";
import log12 from "./img/log_12.png";
import log13 from './img/log_13.png';

export default {
  data() {
    return {
      options: [
        { img: log1, title: "待处理工单", href: "./waitOrder.html" },
        { img: log2, title: "我的工单", href: "./myOrder.html" },
        { img: log3, title: "工单查询", href: "./orderQuery.html" },
        { img: log4, title: "考勤打卡", href: "./card.html" },
        { img: log5, title: "知识共享", href: "./knowledge.html" },
        { img: log6, title: "出库管理", href: "./store.html" },
        { img: log7, title: "消息提醒", href: "./myMsg.html" },
        { img: log8, title: "未完成工单统计", href: "./orderCount.html" },
        { img: log9, title: "公众号二维码", href: "./twoCode.html" },
        { img: log11, title: "发货信息", href: "./deliveryInfo.html" },
        { img: log12, title: "报价信息", href: "./quoteInfo.html" },
        { img: log13, title: "车辆去向", href: "./carLendHistory.html" },
      ]
    };
  },
  mounted() {
    console.log("url:" + window.location.href);

    let url = window.location.href.split("?")[1];
    let code = "";
    if (url) {
      if (url.indexOf("&") > 0) {
        let urlParamArray = url.split("&");
        for (let i = 0; i < urlParamArray.length; i++) {
          let paramerName = urlParamArray[i].split("=");
          console.log(paramerName);
          if ("code" == paramerName[0]) {
            // return paramerName[1];
            code = paramerName[1];
          }
        }
        console.log(urlParamArray);
      } else {
        let paramerValue = url.split("=")[1];
        // return paramerValue;
        console.log(paramerValue);
        code = paramerValue;
      }
    }
    console.log("获取到的code:" + code);
    let param = {
      code: code
    };
    this.until.get("/weixin/access/login", param).then(
      res => {
        // WeixinJSBridge.call("closeWindow");
        // if (res.status !== "200") {
        //   setTimeout(() => {
        //     location.reload(); //刷新页面
        //   }, 5000);
        // }
        this.getNumberByUserCode();
      },
      err => {
        // alert("登录失败");
        console.log(err);
        // location.reload(); //刷新页面
      }
    );
  },
  methods: {
    getNumberByUserCode() {
      this.until.get("/weixin/login/getNumber").then(
        res => {
          console.log(res.data);
          this.until.loSave("userPk", res.data);
          this.until
            .post("/HTWeChat/HTBills/HTGetMyPendingOrderCount", {
              strEmpID: res.data
            })
            .then(res => {
              if (res.success && res.data.count > 0) {
                this.options.splice(0, 1, {
                  img: log10,
                  title: "待处理工单",
                  href: "./waitOrder.html"
                });
              }
            });
        },
        err => {
          alert("登录失败");
          console.log("11111222222222222221111111");

          console.log(err);
        }
      );
    }
  }
};
</script>

