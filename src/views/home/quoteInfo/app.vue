<template>
  <div id="app">
    <div class="header">
      <search-info @seachDelivery="searchQuoteInfoList" :searching="searching"></search-info>
    </div>
    <div ref="scroll">
      <div
        class="content"
        v-show="!flag"
        v-for="(item) in quoteInfoList"
        :key="item.prodMaintenancePk"
      >
        <div class="customer-name">
          <span>客户名称：</span>
          <span>{{item.customer}}</span>
        </div>
        <div class="date">
          <span>日期：</span>
          <span>{{item.tm}}</span>
        </div>
        <div class="material-no">
          <span>物料号：</span>
          <span>{{item.materialNumber}}</span>
        </div>
        <div class="number">
          <span>序列号：</span>
          <span>{{item.serialNumber}}</span>
        </div>
        <div class="description">
          <span>描述：</span>
          <span>{{item.describe}}</span>
        </div>
        <div class="remit-money">
          <span>汇款情况：</span>
          <span>{{item.remittance}}</span>
        </div>
        <div class="pro-name">
          <span>产品名称：</span>
          <span>{{item.wordNm}}</span>
        </div>
      </div>
      <div class="noResult" v-show="flag">
        <span>查询无结果</span>
      </div>
    </div>
  </div>
</template>

<script>
import searchInfo from "components/searchInfo";

export default {
  data() {
    return {
      serialNumber: "",
      customerName: "",
      leftTime: "",
      rightTime: "",
      pageCount: 1,
      pageSize: 10,
      quoteInfoList: [],
      flag: false,
      searching: false,
      hasMore: true,
      total:10,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollLoad, true);
  },
  methods: {
    scrollLoad() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          // this.pageSize += 5;
          this.searchQuoteInfoList(this.serialNumber,this.customerName,this.leftTime,this.rightTime);
        }
      }, 50);
    },
    searchQuoteInfoList(serial, customer, leftTime, rightTime) {
      
      if (this.hasMore && !this.searching) {
        //当值修改的时候，pageSize改为10从页面顶部开始加载
        if(this.serialNumber!==serial ||this.customerName!==customer || this.leftTime!==leftTime || this.rightTime!==rightTime){
          this.pageSize=10;
        }
        this.serialNumber = serial;
        this.customerName = customer;
        this.leftTime = leftTime;
        this.rightTime = rightTime;

        let query = new this.Query();
        if (this.serialNumber) {
          query.buildWhereClause("serialNumber", this.serialNumber, "LK");
        }
        if (this.customerName) {
          query.buildWhereClause("customer", this.customerName, "LK");
        }
        if (this.leftTime) {
          query.buildWhereClause("tm", this.leftTime, "GE");
        }
        if (this.rightTime) {
          query.buildWhereClause("tm", this.rightTime, "LE");
        }

        query.buildPageClause(this.pageCount, this.pageSize);

        let param = query.getParam()
        this.searching=true;
        this.until.get("/weixin/main/page", param).then(
          res => {
            if (res.status == "200") {
              this.quoteInfoList = res.data.items;
              this.total=res.page.total;
              this.pageSize += 5;
              if(this.pageSize>this.total){
                this.hasMore=false;
              }
              else{
                this.hasMore=true;
              }

              if (this.quoteInfoList.length) {
                this.flag = false;
              } else {
                this.flag = true;
              }
            }
            this.searching=false;
          },
          err => {
            this.searching=false;
            this.hasMore=false;
          }
        );
      }
    }
  },
  components: {
    searchInfo
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  background-color: #d9d9d9;
  #app {
    height: 100%;
    .header {
      background-color: #fff;
    }
    .content {
      margin-top: 0.2rem;
      padding: 0.2rem 0.25rem;
      background-color: #fff;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      > div {
        width: 100%;
        line-height: 1.5;
        padding: 0.1rem 0;
        > span {
          display: inline-block;
          width: 30%;
          text-align: left;
          vertical-align: top;
          &:nth-of-type(2) {
            width: 65%;
          }
        }
      }
    }
    .noResult {
      padding-top: 1rem;
      text-align: center;
    }
  }
}
</style>
