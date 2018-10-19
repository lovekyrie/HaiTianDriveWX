<style lang="less">
@bdColor: #d9d9d9;
body {
  background-color: #f5f5f5;
}
.fixedBox {
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
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
}

.region{
  margin: 0.2rem 15% 0;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

.region >div{
  margin-bottom: .2rem;
  padding: .1rem 0;
  width: 40%;
  text-align: center;
  background-color: #fff;
  border-radius: .1rem;
}
</style>

<template>
    <div id="container">
        <div class="fixedBox">
            <div class="search">
                <img src="./img/ser.png">
                <input type="text" placeholder="搜索工单号、客户名称" v-model="userSearch">
                <button @click="getPor">搜索</button>
            </div>
            <div class="region">
              <div v-for="(item) in regionList" :key="item.ID" @click="changeRegionName(item.Name)">
                <span>{{item.Name}}</span>
              </div>
            </div>
        </div>
        <!-- <div id="tempFather" v-for="(item,i) in getP" :key="i">
            <temp :obj="obj" mode="1" :getP="getP" :lis=i :show="show" :seaGdArr="seaGdArr" :count="1"></temp>
        </div> -->
        <work-order :pengdingList="pengdingList"></work-order>
    </div>
</template>

<script>
import temp from "components/temp";
import workOrder from 'components/workOrder'

export default {
  data() {
    return {
      obj: { src: "./orderCountDetail.html?" },
      userSearch: "",
      getP: [],
      mode: "",
      lis: "",
      show: "none",
      seaType: "1",
      seaGd: "",
      tempLeng: [],
      seaGdArr: [],
      strID: "",
      rowCount: 10,
      regionList:[],
      pengdingList:[],
      regionName:'',
    };
  },
  mounted() {
    // let str = sessionStorage.obj;
    // if (str == "") {
    //     window.location.href = "load.html";
    // } else {
    //     this.strID = str;
    // }
    this.getReionList();

    this.getPor();
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
  },
  methods: {
    changeRegionName(name){
      this.regionName=name
      this.getPor()
    },
    getReionList() {

      this.until.post('/HTWeChat/HTBills/GetTheRegionListByRoleSysInfo').then(
        res=>{
          this.regionList=res.data;
        },
        err=>{

        }
      )
    },
    getPor() {
      let param = {
        strCustNo: this.userSearch,
        strRegion: this.regionName, /*绑定区域*/
        StrEmpID: this.strID,
        strType: 0,
        strPageCount: 0,
        StrPageRows: this.rowCount
      };
      this.until.post("/HTWeChat/HTBills/HTGetMyOrderDBList", param).then(
        res => {
          if (res.msg == "") {
            this.pengdingList = res.data;
            this.show = "block";
          } else {
            this.getP = [];
            this.show = "none";
          }
        },
        err => {}
      );
    }
  },
  components: {
    temp,
    workOrder,
  }
  // filters: {
  //     capitalize: function (value) {
  //         if (!value) return ''
  //         value = value.toString()
  //         return value.charAt(0).toUpperCase() + value.slice(1)
  //     }
  // }
};
</script>

