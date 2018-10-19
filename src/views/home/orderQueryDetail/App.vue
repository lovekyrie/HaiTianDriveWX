<style lang="less">
body,
.yd-tab-panel {
  background-color: #f5f5f5;
}

.yd-tab-panel {
  margin-top: 0.2rem;
  border-top: 1px solid #d9d9d9;
}

.temp-war {
  margin-bottom: 0.2rem;
  background-color: #fff;
  font-size: 0.3rem;
  border-bottom: 1px solid #d9d9d9;
  overflow: hidden;
  padding-left: 0.2rem;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  border-radius: 0.2rem;
  p {
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    padding-right: 0.6rem;
    padding-bottom: 0.2rem;
  }
}

.prod-cnt {
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  padding: 0.35rem;
  p {
    margin-bottom: 0.2rem;
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
}
</style>

<template>
    <div id="container">
        <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel label="产品档案">
                <div class="prod-cnt" v-for="(item,i) in searchGdxq" :key="i">
                    <p>工单号：{{item.工单号}}</p>
                    <p>客户名称：{{item.客户名称}}</p>
                    <p>联系人：{{item.联系人}}</p>
                    <p>手机号码：{{item.手机号码}}</p>
                    <p>内容描述：{{item.内容描述}}</p>
                    <p>产品名称：{{item.产品名称}}</p>
                    <p>产品序列号：{{item.序列号}}</p>
                    <p>产品型号：{{item.产品型号}}</p>
                    <p>产品物料号：{{item.物料号}}</p>
                    <p>所属事业部：{{item.事业部}}</p>
                    <p>保修年限：{{item.保修年限}}</p>
                    <p>出厂日期：{{item.出厂日期}}</p>
                    <p>客户姓名：{{item.联系人}}</p>
                    <p>报修情况：{{item.报修情况}}</p>
                </div>
            </yd-tab-panel>

            <yd-tab-panel label="历史故障">
                <div class="temp-war" v-for="(item,i) in searchLsgz" :key="i" v-if="i < 3">
                    <p>任务类型：{{item.故障类型}}</p>
                    <p>故障内容：{{item.故障内容}}</p>
                    <p>维修人员：{{item.维修人员}}</p>
                    <p>维修时间：{{item.完成日期}}</p>
                </div>
            </yd-tab-panel>

        </yd-tab>
    </div>
</template>

<script>
import tempApp from "components/tempApp.vue";

export default {
  data() {
    return {
      tab2: 0,
      obj: {
        src: "./msgCnt.html"
      },
      searchGdxq: [],
      sGdno: "",
      seaSn: "",
      seaGd: "",
      seaType: "2",
      sType: "",
      searchLsgz: [],
      seaKhmc: ""
    };
  },
  mounted() {
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

      this.sGdno = getParamer("strGDNO");
      this.sType = getParamer("strType");
      let param = {
        strSN: "",
        strCustName: "",
        strGDNO: this.sGdno,
        strType: this.sType
      };
      console.log(param);
      this.until.post("/HTWeChat/HTBills/HTOrderList", param).then(
        res => {
          if (res.msg == "") {
            this.searchGdxq = res.data;
            this.seaKhmc = this.searchGdxq[0].客户名称;
          }
        },
        err => {}
      );
    },
    fn() {
      let param1 = {
        strSN: "",
        strCustName: this.seaKhmc,
        strGDNO: this.sGdno,
        strType: this.seaType
      };
      console.log(param1);
      this.until.post("/HTWeChat/HTBills/HTOrderList", param1).then(
        res => {
          if (res.msg == "") {
            this.searchLsgz = res.data;
          }
        },
        err => {}
      );
    },
    itemClick(key) {
      console.log(key);
      this.$dialog.loading.open("数据加载中");
      this.$dialog.loading.close();
      this.tab2 = key;
    }
  },

  components: {
    tempApp
  }
};
</script>

