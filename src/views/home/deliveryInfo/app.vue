<template>
  <div id="app">
    <div class="header">
      <search-info @seachDelivery="searchDeliveryInfoList" :searching="searching"></search-info>
    </div>
    <div ref="scroll">
      <div class="content" v-show="!flag" v-for="(item) in deliveryList" :key="item.prodShippingPk">
        <div class="customer-name">
          <span>客户名称：</span>
          <span>{{item.nm}}</span>
        </div>
        <div class="customer-addr">
          <span>客户地址：</span>
          <span>{{item.address}}</span>
        </div>
        <div class="linked-phone">
          <span>联系人电话：</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="broken-no">
          <span>故障序列号：</span>
          <span>{{item.faultNumber}}</span>
        </div>
        <div class="material-no">
          <span>物料号：</span>
          <span>{{item.materialNumber}}</span>
        </div>
        <div class="delivery-no">
          <span>发货序列号：</span>
          <span>{{item.shippingNumber}}</span>
        </div>
        <div class="paytype">
          <span>支付方式：</span>
          <span>{{item.paymentMethod}}</span>
        </div>
        <div class="delivery-date">
          <span>发货日期：</span>
          <span>{{item.issuanceTm}}</span>
        </div>
        <div class="delivery-order">
          <span>发货单号：</span>
          <span>{{item.invoiceNumber}}</span>
        </div>
        <div class="note">
          <span>备注：</span>
          <span>{{item.rmks}}</span>
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
      pageSize: 10,
      pageCount: 1,
      deliveryList: [],
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
          this.searchDeliveryInfoList(this.serialNumber,this.customerName,this.leftTime,this.rightTime);
        }
      }, 50);
    },
    //查询事件
    searchDeliveryInfoList(serial, customer, leftTime, rightTime) {
      if (!this.searching && this.hasMore) {
        if(this.serialNumber!==serial || this.customerName!==customer || this.leftTime!==leftTime || this.rightTime!==rightTime){
          this.pageSize=10;
        }
        this.serialNumber = serial;
        this.customerName = customer;
        this.leftTime = leftTime;
        this.rightTime = rightTime;

        let query = new this.Query();
        if (this.serialNumber) {
          query.buildWhereClause("faultNumber", this.serialNumber, "LK");
        }
        if (this.customerName) {
          query.buildWhereClause("nm", this.customerName, "LK");
        }
        if (this.leftTime) {
          query.buildWhereClause("issuanceTm", this.leftTime, "GE");
        }
        if (this.rightTime) {
          query.buildWhereClause("issuanceTm", this.rightTime, "LE");
        }

        query.buildPageClause(this.pageCount, this.pageSize);

        let param = query.getParam()
        this.searching = true;
        this.until.get("/weixin/ship/page", param).then(
          res => {
            if (res.status === "200") {

              this.deliveryList = res.data.items;
              this.total=res.page.total;
              this.pageSize += 5;
              if(this.pageSize>this.total){
                this.hasMore=false;
              }
              else{
                this.hasMore=true
              }

              if (this.deliveryList.length) {
                this.flag = false;
              } else {
                this.flag = true;
              }
            }
             this.searching = false;
          },
          err => {
            this.searching = false;
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
      background-color: #fff;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0.2rem 0.25rem;
      > div {
        padding: 0.1rem 0;
        width: 100%;
        line-height: 1.5;
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
