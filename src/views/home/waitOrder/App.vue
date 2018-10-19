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
}
.fixedBox {
  position: fixed;
  width: 100%;
  background-color: #f5f5f5;
  top: 0;
  z-index: 999;
}
</style>

<template>
    <div id="container">
        <div class="fixedBox">
            <div class="search">
                <img src="./img/ser.png">
                <input id="inp" type="text" placeholder="搜索工单号、客户名称" v-model="userSearch">
                <button @click="getPor">搜索</button>
            </div>
        </div>
        <div id="tempFather" v-for="(item,i) in getP" :key="i">
            <temp :obj="obj" :mode="1" :getP="getP" :lis=i :show="show" :seaGdArr="seaGdArr" :count="2"></temp>
        </div>
    </div>
</template>

<script>
import temp from "components/temp";

export default {
  data() {
    return {
      obj: { src: "./waitOrderDetail.html?" },
      userSearch: "",
      getP: [],
      mode: "",
      lis: "",
      show: "none",
      seaType: "1",
      seaGd: "",
      seaGdArr: [],
      strID: "",
      strCustNo: "",
      rowCount: 10
    };
  },
  mounted() {
    console.log(this.until.loGet("userPk"));

    console.log(sessionStorage.codeID);
    this.strID = this.until.loGet("userPk");

    var self = this;
    $(window).scroll(function() {
      let scrollTop = $(this).scrollTop();
      let scrollHeight = $(document).height();
      let windowHeight = $(this).height();
      if (scrollTop + windowHeight == scrollHeight) {
        self.rowCount = self.rowCount + 10;
        self.getPor();
      }
    });

    this.getPor();
  },
  methods: {
    getPor() {
      let param = {
        strCustNo: this.userSearch,
        strGDNO: "",
        StrEmpID: '10567',
        strType: 0,
        strPageCount: 0,
        StrPageRows: this.rowCount
      };
      this.until.post("/HTWeChat/HTBills/HTGetMyPendingOrderList", param).then(
        res => {
          if (res.msg == "") {
            this.getP = res.data;
            this.show = "block";
            for (let i = 0; i < this.getP.length; i++) {
              this.seaGdArr[i] = this.getP[i].任务单号;
            }
          } else {
            this.getP = [];
            this.show = "none";
          }
        },
        err => {
          this.show = "none";
        }
      );
    }
  },
  components: {
    temp
  }
};
</script>

