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
  .active{
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
  .temp-app {
    &:nth-last-of-type(1) {
      border-bottom: 0;
    }
  }
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
        <span class="s-tit">工单号：</span>
        <input type="text" class="c-ip" placeholder="请输入工单号" v-model="searchGdno">
      </div>
      <div class="search-text">
        <span class="s-tit">序列号：</span>
        <input type="text" class="c-ip" placeholder="请输入序列号" v-model="searchSn">
      </div>
      <div class="search-text">
        <span class="s-tit">客户名称：</span>
        <input type="text" class="c-ip" placeholder="请输入客户名称" v-model="searchCustName">
      </div>
      <div class="search-text" style="margin-bottom: 0;">
        <span class="s-tit"></span>
        <button :class="{active:searching}" class="s-btn" @click="searchBtn">查询</button>
      </div>
    </div>
    <div ref="scroll">
      <div class="noResult" v-show="!showResult">无查询结果</div>
      <div class="content" v-show="showResult">
        <tempApp :obj="obj" :seaGd="item.工单号" :seaSn="seaSn" v-for="(item,i) in searchBot" :key="i">
          <div slot="content" class="tempapp-cnt">
            <p>工单号：{{item.工单号}}</p>
            <p>序列号：{{item.序列号}}</p>
            <p>客户名称：{{item.客户名称}}</p>
            <p>任务类型：{{item.故障类型}}</p>
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
      obj: {
        src: "./orderQueryDetail.html?"
      },
      startTime: "",
      endTime: "",
      showResult: false,
      searchBot: [],
      searchGdno: "",
      searchSn: "",
      searchCustName: "",
      seaGd: "",
      seaType: "1",
      seaSn: "",
      seaCustName: "",
      strPageCount: 1,
      strPageRows: 5,
      searching: false,
      hasMore: true
    };
  },
  mounted() {
    
    window.addEventListener('scroll',this.scrollLoad,false)
    this.searchBtn();
  },
  methods: {
    scrollLoad() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight +20> scrollHeight) {
          // this.strPageRows += 5;
          this.searchBtn();
        }
      }, 50);
    },
    searchBtn() {
      if (this.hasMore && !this.searching) {

        let strGDNO=this.until.seGet('strGDNO')
        let strSN=this.until.seGet('strSN')
        let strCustName=this.until.seGet('strCustName')

        if(strGDNO!==this.searchGdno || strSN!==this.searchSn || strCustName!==this.seaCustName){
          this.strPageRows=5;
        }

        let param = {
          strGDNO: this.searchGdno,
          strSN: this.searchSn,
          strCustName: this.searchCustName,
          strType: 0,
          strPageCount: this.strPageCount,
          strPageRows: this.strPageRows
        };

        //存储查询字段
        this.until.seSave('strGDNO',this.searchGdno)
        this.until.seSave('strSN',this.searchSn)
        this.until.seSave('strCustName',this.searchCustName)

        this.searching=true;
        this.until.post("/HTWeChat/HTBills/HTOrderList", param).then(
          res => {
            if (res.msg == "") {
              this.showResult = true;
              this.searchBot = res.data.List;
              this.hasMore = res.data.hasMore;
              this.strPageRows+=5;
            } else {
              this.showResult = false;
            }
            this.searching=false;
          },
          err => {
            this.showResult = false;
            this.searching=false;
          }
        );
      }
    }
  },
  components: {
    tempApp
  }
};
</script>

