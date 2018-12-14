<style lang="less">
@bdColor: #d9d9d9;
body {
  background-color: #f5f5f5;
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
.fixedBox {
  position: fixed;
  width: 100%;
  background-color: #f5f5f5;
  top: 0;
  z-index: 999;
}
.noResult {
  text-align: center;
  color: #999;
  margin-top: 1.2rem;
}
</style>

<template>
  <div id="container">
    <div class="fixedBox">
      <div class="search">
        <img src="./img/ser.png">
        <input id="inp" type="text" placeholder="搜索工单号、客户名称" v-model="userSearch">
        <button :class="{active:searching}" @click="getPor">搜索</button>
      </div>
    </div>
    <div ref="scroll">
      <div class="noResult" v-show="!showResult">无查询结果</div>
      <div v-show="showResult" id="tempFather" v-for="(item,i) in getP" :key="i">
        <temp
          :obj="obj"
          :mode="1"
          :getP="getP"
          :lis="i"
          :show="showResult"
          :seaGdArr="seaGdArr"
          :count="2">
        </temp>
      </div>
    </div>
  </div>
</template>

<script>
import temp from "components/temp";
import { setTimeout, clearTimeout } from 'timers';

export default {
  data() {
    return {
      obj: { src: "./waitOrderDetail.html?" },
      userSearch: "",
      getP: [],
      mode: "",
      lis: "",
      seaType: "1",
      seaGd: "",
      seaGdArr: [],
      strID: "",
      strCustNo: "",
      rowCount: 5,
      showResult: false,
      searching: false, //默认按钮可点击（在这里可以用来当做isLoading）
      hasMore: true
    };
  },
  mounted() {
    
    this.strID = this.until.loGet("userPk");
    window.addEventListener('scroll',this.scrollLoad,true)
    this.getPor();
  },
  methods: {
    scrollLoad(){
      clearTimeout(this.timer)
      this.timer=setTimeout(()=>{
        let {scrollTop,clientHeight,scrollHeight}=this.$refs.scroll
        if(scrollTop+clientHeight+20>scrollHeight){
          this.rowCount+=5;
          this.getPor();
        }
      },13)
     
    },
    getPor() {
      if (this.hasMore && !this.searching) {
        let param = {
          strCustNo: this.userSearch,
          strGDNO: "",
          StrEmpID: this.strID,
          strType: 0,
          strPageCount: 0,
          StrPageRows: this.rowCount
        };
        this.searching = true;
        this.until
          .post("/HTWeChat/HTBills/HTGetMyPendingOrderList", param)
          .then(
            res => {
              if (res.msg == "") {
                this.getP = res.data.List;
                this.showResult = true;
                this.hasMore = res.data.hasMore;
                for (let i = 0; i < this.getP.length; i++) {
                  this.seaGdArr[i] = this.getP[i].任务单号;
                }
                this.searching = false;
              } else {
                this.getP = [];
                this.showResult = false;
                this.searching = false;
                this.hasMore=false;
              }
            },
            err => {
              this.showResult = false;
              this.searching = false;
              this.hasMore=false;
            }
          );
      }
    }
  },
  components: {
    temp
  }
};
</script>

