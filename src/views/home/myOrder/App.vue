<style lang="less">
@bdColor: #d9d9d9;
body {
  background-color: #f5f5f5;
}
.noResult {
  text-align: center;
  color: #999;
  margin-top: 2.2rem;
}
.fixedBox {
  position: fixed;
  width: 100%;
  background-color: #f5f5f5;
  top: 0;
  z-index: 999;
}
.search {
  position: relative;
  height: 0.6rem;
  margin: 0.3rem 1.6rem 0.3rem 0.5rem;
  background-color: #fff;
  border: 1px solid @bdColor;
  border-radius: 0.3rem;
  padding: 0 0.3rem;
  input {
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 0.22rem;
    text-indent: 0.4rem;
  }
  img {
    position: absolute;
    top: 0.17rem;
    left: 0.3rem;
    width: 0.27rem;
    height: 0.26rem;
  }
  button {
    position: absolute;
    top: 0;
    right: -1.1rem;
    width: 1rem;
    line-height: 0.6rem;
    height: 100%;
    border-radius: 0.1rem;
    background-color: #004899;
    color: #fff;
  }
  .active {
    background-color: #ccc;
  }
}
.timer {
  text-align: center;
  vertical-align: middle;
  margin-top: 0.3rem;
  span {
    display: inline-block;
    width: 2.1rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    vertical-align: middle;
    .yd-datetime-input {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.22rem;
      color: #999;
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <div id="container">
    <div class="fixedBox">
      <div class="timer">
        <span>
          <yd-datetime type="date" v-model="leftTime" :end-date="currentTime"></yd-datetime>
        </span>&nbsp;&nbsp;~&nbsp;&nbsp;
        <span>
          <yd-datetime type="date" v-model="rightTime" :end-date="currentTime"></yd-datetime>
        </span>
      </div>
      <div class="search">
        <img src="./img/ser.png">
        <input type="text" placeholder="搜索客户名称、工单号" v-model="userSearch">
        <button :class="{active:searching}" @click="getPor">搜索</button>
      </div>
    </div>
    <div ref="scroll">
      <div class="noResult" v-show="!showResult">无查询结果</div>
      <div id="tempFather" v-show="showResult" v-for="(item,i) in getP" :key="item.rownumber">
        <temp
          :obj="obj"
          :mode="2"
          :getP="getP"
          :lis="i"
          :show="showResult"
          :seaGdArr="seaGdArr"
          :count="2"
        ></temp>
      </div>
    </div>
  </div>
</template>

<script>
import temp from "components/temp";
export default {
  data() {
    return {
      leftTime: "",
      rightTime: "",
      obj: { src: "./myOrderDetail.html?", survey: "./survey.html?" },
      getP: [],
      userSearch: "",
      mode: "",
      lis: "",
      showResult: false,
      seaType: "1",
      tempLeng: "",
      seaGdArr: [],
      strID: "",
      currentTime: "",
      strPageCount: 0,
      strPageRows: 5,
      valueTime: "2018-08-08",
      hasMore: true,
      searching: false //默认按钮可点击（在这里可以用来当做isLoading）
    };
  },
  mounted() {
    let time = this.until.formatDate();

    let month = time.month;
    let year = time.year;
    if (month - 6 < 0) {
      year--;
    } else if (month == 6) {
      month = 12;
      year--;
    } else {
      month = month - 6;
      this.leftTime = year + "-" + month + "-" + time.day;
    }
    this.leftTime = year + "-" + month + "-" + time.day;
    this.currentTime = time.year + "-" + time.month + "-" + time.day;
    this.rightTime = time.year + "-" + time.month + "-" + time.day;

    this.strID = this.until.loGet("userPk");
    window.addEventListener("scroll", this.scrollLoad, true);
    this.getPor();
  },
  methods: {
    scrollLoad() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.strPageRows += 5;
          this.getPor();
        }
      }, 100);
    },
    getPor() {
      if (!this.searching) {
        //查询处理，
        let dataS = this.until.seGet("DateS");
        let dataE = this.until.seGet("DateE");
        let strGDNO = this.until.seGet("strGDNO");

        if (
          this.leftTime !== dataS ||
          this.rightTime !== dataE ||
          this.userSearch !== strGDNO
        ) {
          this.strPageRows = 5;
          this.hasMore = true;
        }

        let param = {
          strDateS: this.leftTime,
          StrDateE: this.rightTime,
          strGDNO: this.userSearch,
          StrEmpID: this.strID,
          strType: 0,
          strPageCount: this.strPageCount,
          strPageRows: this.strPageRows
        };

        this.until.seSave("DateS", this.leftTime);
        this.until.seSave("DateE", this.rightTime);
        this.until.seSave("strGDNO", this.userSearch);

        this.searching = true;
        if (this.hasMore) {
          this.until
            .post("/HTWeChat/HTBills/HTGetMyProcessedOrderList", param)
            .then(
              res => {
                if (res.msg == "") {
                  this.getP = res.data.List;
                  this.hasMore = res.data.hasMore;
                  this.showResult = true;
                  for (let i = 0; i < this.getP.length; i++) {
                    this.seaGdArr[i] = this.getP[i].任务单号;
                  }
                } else {
                  this.showResult = false;
                  this.hasMore = false;
                }

                this.searching = false;
              },
              err => {
                this.showResult = false;
                this.searching = false;
                this.hasMore = false;
              }
            );
        }
        this.searching = false;
      }
    }
  },
  components: {
    temp
  }
};
</script>

