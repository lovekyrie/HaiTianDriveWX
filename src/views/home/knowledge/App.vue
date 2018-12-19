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
  position: relative;
  height: 0.6rem;
  margin: 0.3rem 0.6rem;
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
}

.content {
  border-top: 1px solid @bdColor;
}

.opt-one {
  background-color: #fff;
  position: relative;
  padding: 0.35rem 0rem 0.35rem 0.4rem;
  font-size: 0.24rem;
  border-bottom: 1px solid #d9d9d9;
  span {
    > input {
      outline: none;
      border-style: none;
      font-size: 0.24rem;
      text-align: right;
    }
  }
  svg {
    position: absolute;
    top: 50%;
    right: 0.3rem;
    transform: translateY(-50%);
    font-size: 0.2rem;
    color: #c9c9c9;
  }
}

.opt-sel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>3

<template>
    <div id="container">
        <div class="search">
            <img src="./img/ser.png">
            <input type="text" placeholder="搜索文档" v-model="textTitle" @change="searchText">
        </div>
        <div class="opt-one">
          <select class="opt-sel" @change="selectOption($event)">
            <option v-for="item in knowledgeTypeList" :key="item.value" :value="item.value">{{item.type}}</option>
          </select>
          <span>知识分类</span>
          <span class="opt-cnt">{{knowledgeType}}</span>
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala"></use>
          </svg>
        </div>
        <div id="content" v-for="(item,i) in zzTitle" :key="i" v-if="i < rowCount">
            <knowledge :zzTitle="zzTitle" :lis=i :oSrc="oSrc" :oLxtb="oLxtb"></knowledge>
        </div>
        <div class="noResult" :style="{ display:show}">无查询结果</div>
    </div>
</template>

<script>
import Knowledge from "components/knowledge";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      show: "none",
      textTitle: "",
      zzTitle: [],
      zzLb: [],
      zzLbArr: [],
      rowCount: 10,
      zzLbStr: "",
      oSrc: [],
      oLxtb: [],
      knowledgeTypeList: [],
      selectType: "",
      knowledgeType:"--请选择--" //默认带出请选择提示
    };
  },
  mounted() {
    this.searchText();
    this.getKwonledgeTypeList();
    // this.alertMessage();
    var self = this;
    $(window).scroll(function() {
      let scrollTop = $(this).scrollTop();
      let scrollHeight = $(document).height();
      let windowHeight = $(this).height();
      if (scrollTop + windowHeight >= scrollHeight) {
        self.rowCount = self.rowCount + 10;
        console.log(self.rowCount);
        self.getPor();
      }
    });
  },
  methods: {
    searchText() {
      this.rowCount = 10;
      let param = {
        strTitel: this.textTitle,
        strType:this.selectType,
        strPageCount: 1,
        strPageRows: this.rowCount
      };
      this.until.post("/HTWeChat/HTBills/HTGetKnowledge", param).then(
        res => {
          if (res.msg == "") {
            this.show = "none";
            this.zzTitle = res.data;
            for (let i = 0; i < this.zzTitle.length; i++) {
              this.zzLb[i] = this.zzTitle[i].文件列表;
              this.zzLbStr = this.zzLb[i];
              this.zzLbArr = this.zzLbStr.split("|");
              this.oLxtb[i] = this.zzLbArr[2];
              this.oSrc[i] = this.zzLbArr[3];
            }
            console.log(this.oSrc);
            console.log(this.oLxtb);
            console.log(this.zzLbArr);
          } else {
            this.zzTitle = [];
            if (this.zzTitle == "") {
              this.show = "block";
            }
          }
        },
        err => {}
      );
    },
    getPor() {
      console.log("每页页数2：" + this.rowCount);
      let param = {
        strTitel: this.textTitle,
        strType:this.selectType,
        strPageCount: this.strPageCount,
        StrPageRows: this.rowCount
        // StrPageRows:9,
      };

      this.until
        .post("/HTWeChat/HTBills/HTGetKnowledge", param)

        .then(
          res => {
            if (res.msg == "") {
              this.show = "none";
              this.zzTitle = res.data;
              for (let i = 0; i < this.zzTitle.length; i++) {
                this.zzLb[i] = this.zzTitle[i].文件列表;
                this.zzLbStr = this.zzLb[i];
                this.zzLbArr = this.zzLbStr.split("|");
                this.oLxtb[i] = this.zzLbArr[2];
                this.oSrc[i] = this.zzLbArr[3];
              }

              sessionStorage.textTitle = this.textTitle;
            } else {
            }
          },
          err => {
            this.show = "none";
            alert("请输入正确数值");
          }
        );
    },
    alertMessage() {
      if (this.until.loGet("userPk")) {
        setTimeout(() => {
          alert("请在右上角选择在浏览器中打开，进行对应文档的查看，谢谢配合！");
        }, 500);
      }
    },
    getKwonledgeTypeList() {
      this.until.post("/HTWeChat/HTBills/GetTheKnowledgeType").then(
        res => {
          this.knowledgeTypeList = res.data;
        },
        err => {
          console.log("得到知识库分类失败");
        }
      );
    },
    selectOption(e) {
      this.selectType = e.target.value;
      let typeList= this.knowledgeTypeList.filter(item => {
        return item["value"] == e.target.value;
      });

      this.knowledgeType=typeList[0]["type"];

      this.searchText();
    }
  },
  components: {
    Knowledge
  }
};
</script>

