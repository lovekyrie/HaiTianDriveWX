<template>
  <div id="app">
    <div class="header">
      <div class="search">
        <div>
          <span>车牌号：</span>
          <select v-model="carNo">
            <option value=""  disabled selected>--请选择--</option>
            <option v-for="(item) in carNoList" :key="item.ID" :value="item.ID">{{item.carNo}}</option>
          </select>
        </div>
        <div>
          <span>借用人：</span>
          <input type="text" placeholder="请输入借用人" v-model="lend">
        </div>
        <div class="date-period">
          <span>时间：</span>
          <span>
            <yd-datetime type="date" v-model="leftTime" :end-date="currentTime"></yd-datetime>
          </span>&nbsp;&nbsp;~&nbsp;&nbsp;
          <span>
            <yd-datetime type="date" v-model="rightTime" :end-date="currentTime"></yd-datetime>
          </span>
        </div>
        <div class="search-btn">
          <span></span>
          <button :class="{active:searching}" class="query-btn" @click="queryCarLendHistory">查询</button>
        </div>
      </div>
    </div>
    <div ref="scroll">
      <div class="content" v-show="!flag" v-for="(item,index) in carLendHistoryList" :key="index">
        <div>
          <span>车牌号：</span>
          <span>{{item.carNO}}</span>
        </div>
        <div>
          <span>日期：</span>
          <span>{{item.date}}</span>
        </div>
        <div>
          <span>借用人：</span>
          <span>{{item.lendMan}}</span>
        </div>
        <div>
          <span>联系方式：</span>
          <span>{{item.linked}}</span>
        </div>
        <div>
          <span>用车事由：</span>
          <span>{{item.reason}}</span>
        </div>
        <div>
          <span>目的地：</span>
          <span>{{item.destination}}</span>
        </div>
      </div>
      <div class="noResult" v-show="flag">
        <span>查询无结果</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftTime: "",
      rightTime: "",
      currentTime: "",
      time: "",
      lend: "",
      carNo: "",
      flag: false,
      rowCount: 10,
      carNoList: [],
      carLendHistoryList: [],
      searching: false,
      hasMore: true
    };
  },
  mounted() {
    this.time = this.until.formatDate();
    let month = this.time.month;
    let year = this.time.year;

    if (month >= 6) {
      month -= 6;
    } else {
      year--;
      month = month + 6;
    }

    this.leftTime = year + "-" + month + "-" + this.time.day;
    this.rightTime =
      this.time.year + "-" + this.time.month + "-" + this.time.day;
    this.currentTime = this.rightTime;

    window.addEventListener("scroll", this.srcollLoad, true);
    this.getAllCarNoList();
  },
  methods: {
    srcollLoad() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.rowCount += 5;
          this.queryCarLendHistory();
        }
      }, 500);
    },
    getAllCarNoList() {
      this.until.post("/HTWeChat/HTBills/GetAvaliableCarList").then(
        res => {
          if (res.success) {
            this.carNoList = res.data;
          }
        },
        err => {}
      );
    },

    queryCarLendHistory() {
      if (!this.searching && this.hasMore) {

        let carNo=this.until.seGet('carNo')
        let lendMan=this.until.seGet('lendMan')
        let beginT=this.until.seGet('beginT')
        let endT=this.until.seGet('endT')
        
        if(this.carNo!==carNo || this.lend!==lendMan || this.leftTime!==beginT || this.rightTime!==endT){
          this.rowCount=10;
        }
        let param = {
          carNo: this.carNo,
          lendMan: this.lend,
          beginT: this.leftTime,
          endT: this.rightTime,
          strPageCount: 0,
          strPageRows: this.rowCount
        };

        //存储一下查询变量，当发生改变时，重新开始加载数据。
        this.until.seSave('carNo',this.carNo);
        this.until.seSave('lendMan',this.lend)
        this.until.seSave('beginT',this.leftTime)
        this.until.seSave('endT',this.rightTime)

        this.searching=true;
        this.until
          .post("/HTWeChat/HTBills/GetCarLendHistoryListByQuery", param)
          .then(
            res => {
              if (res.data) {
                this.flag = false;
                this.carLendHistoryList = res.data.List;
                this.hasMore = res.data.hasMore;
              } else {
                this.flag = true;
                this.hasMore=false;
              }
              this.searching=false;
            },
            err => {
              this.searching=false;
              this.flag = true;
              this.hasMore=false;
            }
          );
      }
    }
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  background-color: #f7f7f7;
  #app {
    height: 100%;
    .search {
      background-color: #fff;
      padding: 0.35rem 0.25rem;
      > div {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-bottom: 0.35rem;
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        &:nth-of-type(3) {
          display: -webkit-flex;
          display: flex;
          width: 100%;
          margin-bottom: 0.35rem;
          span {
            display: inline-block;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            vertical-align: middle;
            border-radius: 3px;
            &:nth-of-type(1) {
              display: inline-block;
              width: 30%;
              border: 0;
            }
            &:not(:nth-of-type(1)) {
              padding: 0;
            }
            > .yd-datetime-input {
              width: 100%;
              height: 100%;
              flex: 2;
              text-align: center;
              line-height: 0.6rem;
              font-size: 0.22rem;
              color: #999;
              vertical-align: middle;
            }
          }
        }
        > span {
          display: inline-block;
          width: 30%;
          padding: 0.1rem 0 0.1rem 0.15rem;
        }
        > input,
        select {
          flex: 1;
          border: 1px solid #d9d9d9;
          border-radius: 3px;
          padding: 0.1rem 0 0.1rem 0.15rem;
        }
        > button {
          flex: 1;
          background-color: #004899;
          text-align: center;
          color: #fff;
          padding: 0.15rem 0;
          border-radius: 3px;
        }
        .active{
          background-color: #ccc;
        }
      }
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
