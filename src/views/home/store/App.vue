<style lang="less">
@bdColor: #d9d9d9;
body {
  background-color: #f5f5f5;
}
.noResult {
  text-align: center;
  color: #999;
  margin-top: 0.4rem;
}
.search {
  background-color: #fff;
  padding: 0.35rem;
  border-bottom: 1px solid @bdColor;
  .search-text {
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-bottom: 0.4rem;
    overflow: hidden;
    .s-tit {
      display: inline-block;
      width: 1.7rem;
    }
    .c-ip {
      flex: 1;
      border: 1px solid @bdColor;
      text-indent: 0.2rem;
      vertical-align: middle;
    }
  }
  .s-select {
    position: relative;
    .icon {
      position: absolute;
      top: 50%;
      right: 0.3rem;
      font-size: 0.25rem;
      transform: translateY(-50%);
      color: #c9c9c9;
    }
    select {
      text-indent: 0.2rem;
      option {
        vertical-align: middle;
      }
    }
  }
  .s-btn {
    flex: 1;
    width: 100%;
    background-color: #004899;
    height: 0.8rem;
    font-size: 0.3rem;
    border: 0;
    border-radius: 5px;
    color: #fff;
  }
  .active {
    background-color: #ccc;
  }
  .s-time {
    flex: 1;
    border: 1px solid @bdColor;
    display: flex;
    > span {
      color: #999;
      font-size: 0.24rem;
    }
    > div {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 0.24rem;
      position: relative;
      padding-right: 0.2rem;
      img {
        position: absolute;
        top: 50%;
        right: 0.2rem;
        width: 0.28rem;
        height: 0.28rem;
        transform: translateY(-50%);
      }
    }
  }
}

.content {
  margin-top: 0.2rem;
  background-color: #fff;
  border-top: 1px solid @bdColor;
  border-bottom: 1px solid @bdColor;
}

.tempapp-cnt {
  p {
    i {
      color: red;
      &.v-n {
        visibility: hidden;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <div class="search">
      <div class="search-text">
        <span class="s-tit">型号：</span>
        <input type="text" class="c-ip" placeholder="请输入型号" v-model="model">
      </div>
      <div class="search-text">
        <span class="s-tit">物料号：</span>
        <input type="text" class="c-ip" placeholder="请输入物料号" v-model="itemNo">
      </div>
      <div class="search-text">
        <span class="s-tit">序列号：</span>
        <input type="text" class="c-ip" placeholder="请输入序列号" v-model="searSn">
      </div>
      <div class="search-text">
        <span class="s-tit">客户名称：</span>
        <input type="text" class="c-ip" placeholder="请输入客户名称" v-model="custName">
      </div>
      <div class="s-select search-text">
        <span class="s-tit">所属事业部：</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala"></use>
        </svg>
        <select class="c-ip" v-model="deptName">
          <option value hidden selected v-show="false">请选择</option>
          <option value>全部</option>
          <option v-for="(item,index) in ssb" :key="index">{{item.ZDText}}</option>
        </select>
      </div>
      <div class="search-text">
        <span class="s-tit">出货日期：</span>
        <div class="s-time">
          <div>
            <yd-datetime type="date" v-model="sTime" class="c-timer"></yd-datetime>
            <img src="./img/ri.png">
          </div>
          <span>至</span>
          <div>
            <yd-datetime type="date" v-model="eTime" class="c-timer"></yd-datetime>
            <img src="./img/ri.png">
          </div>
        </div>
      </div>
      <div class="search-text" style="margin-bottom: 0;">
        <span class="s-tit"></span>
        <button :class="{active:searching}" class="s-btn" @click="searchBtns">搜索</button>
      </div>
    </div>
    <div ref="scroll">
      <div class="noResult" v-show="!showResult">无查询结果</div>
      <div class="content" v-show="showResult">
        <tempApp :obj="obj" :seaSn="item.序列号" :seaGd="seaGd" v-for="(item,i) in searchCk" :key="i">
          <div slot="content" class="tempapp-cnt">
            <p>
              <i>*</i>
              出货日期：{{item.出货日期}}
            </p>
            <p>
              <i>*</i>
              物料号：{{item.物料号}}
            </p>
            <p>
              <i>*</i>
              规格/型号：{{item.规格型号}}
            </p>
            <p>
              <i>*</i>
              序列号：{{item.序列号}}
            </p>
            <p>
              <i class="v-n">*</i>
              客户名称：{{item.客户名称}}
            </p>
            <p>
              <i>*</i>
              所属事业部：{{item.所属事业部}}
            </p>
          </div>
        </tempApp>
      </div>
    </div>
  </div>
</template>

<script>
import tempApp from "components/tempApp";

export default {
  data() {
    return {
      sTime: "",
      eTime: "",
      itemNo: "",
      model: "",
      deptName: "",
      searSn: "",
      custName: "",
      searchCk: [],
      show: "none",
      show2: "none",
      seaType: "1",
      seaSn: "",
      seaSn1: "",
      ssb: "",
      obj: {
        src: "./storeDetail.html?"
      },
      seaGd: "",
      strPageCount: 0,
      strPageRows: 10,
      searching: false,
      hasMore: true,
      total: 10
    };
  },
  computed: {
    showResult() {
      if (this.searchCk.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.searchTj();
    let time = this.until.formatDate();

    this.sTime = time.year + "-01-01";
    this.eTime = time.year + "-" + time.month + "-" + time.day;

    window.addEventListener("scroll", this.scrollLoad, true);
    this.searchBtns();
  },
  methods: {
    scrollLoad() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          // this.strPageRows += 5;
          this.searchBtns();
        }
      }, 50);
    },
    searchTj() {
      let param = {
        strType: "FDEPT"
      };
      this.until.post("/HTWeChat/HTBills/HTGetItemList", param).then(
        res => {
          if (res.msg == "") {
            this.ssb = res.data;
            console.log(this.ssb);
          }
        },
        err => {}
      );
    },
    searchBtns() {
      if (!this.searching) {
        let dataS = this.until.seGet("DateS");
        let dataE = this.until.seGet("DateE");
        let strItemNo = this.until.seGet("strItemNo");
        let strModel = this.until.seGet("strModel");
        let strDeptName = this.until.seGet("strDeptName");
        let strSn = this.until.seGet("strSN");
        let strCustName = this.until.seGet("strCustName");
        if (
          this.sTime !== dataS ||
          this.eTime !== dataE ||
          this.itemNo !== strItemNo ||
          this.model !== strModel ||
          this.deptName !== strDeptName ||
          this.seaSn !== strSn ||
          this.custName !== strCustName
        ) {
          this.strPageRows = 10;
          this.hasMore = true;
        }

        let param = {
          DateS: this.sTime,
          DateE: this.eTime,
          strItemNo: this.itemNo,
          strModel: this.model,
          strDeptName: this.deptName,
          strSN: this.searSn,
          strCustName: this.custName,
          strPageCount: 1,
          strPageRows: this.strPageRows
        };

        this.until.seSave("DateS", this.sTime);
        this.until.seSave("DateE", this.eTime);
        this.until.seSave("strItemNo", this.itemNo);
        this.until.seSave("strModel", this.model);
        this.until.seSave("strDeptName", this.deptName);
        this.until.seSave("strSN", this.searSn);
        this.until.seSave("strCustName", this.custName);

        this.searching = true;
        if (this.hasMore) {
          this.until.post("/HTWeChat/HTBills/ICStockItemList", param).then(
            res => {
              if (res.success) {
                this.searchCk = res.data;
                //每次返回的是请求的rows数量
                if (res.data.length < this.strPageRows) {
                  this.hasMore = false;
                } else {
                  this.strPageRows += 5;
                  this.hasMore = true;
                }
              } else {
                this.searchCk = [];
                this.hasMore = false;
              }
              this.searching = false;
            },
            err => {
              this.searchCk = [];
              this.searching = false;
              this.hasMore = false;
            }
          );
        }
      }
    }
  },
  components: {
    tempApp
  }
};
</script>

