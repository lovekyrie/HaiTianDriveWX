<style lang="less">
body {
  background-color: #f5f5f5;
}

.opt-one {
  background-color: #fff;
  position: relative;
  padding: 0.35rem 0.75rem 0.35rem 0.4rem;
  font-size: 0.24rem;
  border-bottom: 1px solid #d9d9d9;
  span {
    &.f-c {
      color: #999;
    }
    i {
      position: absolute;
      color: red;
      left: 0.1rem;
      top: 0.35rem;
    }
    > input {
      outline: none;
      border-style: none;
      font-size: 0.24rem;
      text-align: right;
    }
  }
  .opt-wrap {
    position: relative;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 0.5rem;
    vertical-align: top;
    .opt-set-input {
      border: 0;
      width: 100%;
      height: 100%;
    }
    .opt-serial > {
      position: absolute;
      top: -0.1rem;
    }
    > input {
      height: 100%;
      width: 100%;
      border: 0;
    }
    > span {
      width: 100%;
    }
    > .input-short {
      top: 0;
      font-size: 0.24rem;
    }
    > .opt-short {
      width: 100%;
    }
    button {
      background-color: #01fb01;
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

.serial {
  padding-bottom: 0;
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  > span {
    width: 20%;
  }
  .serial-wrap {
    width: 80%;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 0;
    > div {
      width: 100%;
      &:nth-of-type(1) {
        margin-bottom: 0.2rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        span {
          width: 30%;
        }
        input {
          width: 70%;
          border: 1px solid #ccc;
        }
      }
      &:nth-of-type(2) {
        position: relative;
        select {
          width: 100%;
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
      textarea {
        font-size: 12px;
      }
    }
  }
}

.opt-double {
  position: relative;
  padding-bottom: 1.6rem;
  padding-right: 0;
  display: -webkit-flex;
  display: flex;
  > span {
    line-height: 0.5rem;
    width: 1.2rem;
  }
  .mu-input {
    z-index: 1999;
    font-size: 12px;
  }
}

.multi {
  padding-bottom: 1.6rem;
  > span {
    &:nth-of-type(1) {
      width: 1.2rem;
      line-height: 0.5rem;
    }
  }
  .mu-input {
    z-index: 1999;
    font-size: 12px;
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

.opt-textarea {
  position: relative;
  padding: 0.35rem;
  padding-left: 1.7rem;
  span {
    position: absolute;
    top: 0.35rem;
    left: 0.35rem;
    i {
      position: absolute;
      color: red;
      left: -0.25rem;
      top: 0;
    }
  }
  textarea {
    width: 100%;
    height: 1.35rem;
    border-color: #d9d9d9;
    padding: 0.1rem;
    font-size: 0.24rem;
  }
}

.rq {
  margin-top: 0.2rem;
  border-top: 1px solid #d9d9d9;
}

.opt-img {
  padding: 0.35rem;
  .imgshow {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // align-content: space-between;
    padding-top: 0.3rem;
    > span {
      // &:nth-of-type(3n+2),
      // &:nth-of-type(3n+3){
      //   margin-left: 5%;
      // }
      &:nth-of-type(n + 4) {
        margin-top: 5%;
      }
    }
    .c-m {
      margin-right: 0;
    }
    .upimg {
      position: relative;
      border: 1px solid #999;
      background-color: #fff;
      width: 30%;
      height: 2rem;
      background: url("./img/up.png") 50% 50% no-repeat;
      background-size: 0.41rem 0.41rem;
      overflow: hidden;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
      svg {
        position: absolute;
        top: 0.2rem;
        right: 0;
        font-size: 0.35rem;
        color: red;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <div>
      <div class="opt-one">
        <span>
          <i>*</i>
          工单号
        </span>
        <span class="opt-cnt f-c fr">{{item.任务单号}}</span>
      </div>

      <div class="opt-one" id="optRw">
        <select class="opt-sel" v-model="ZDTextRw" disabled>
          <option v-for="(item,index) in wRwlx" :key="index" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i>*</i>
          任务类型
        </span>
        <span class="opt-cnt f-c fr">{{ZDTextRw}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optXx">
        <select class="opt-sel" @change="cSelectOp(ZDTextXx,'optXx')" v-model="ZDTextXx" disabled>
          <option v-for="(item,index) in wXxly" :key="index">{{item.ZDText}}</option>
        </select>
        <span>
          <i>*</i>
          信息来源
        </span>
        <span class="opt-cnt f-c fr">{{item.信息来源}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          客户名称
        </span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.客户名称" disabled />
        </span>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          联系人
        </span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.联系人" disabled />
        </span>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          客户地址
        </span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.地址" disabled />
        </span>
      </div>

      <div class="opt-one">
        <select class="opt-sel" disabled>
          <option value>男</option>
          <option value>女</option>
        </select>
        <span>
          <i>*</i>
          性别
        </span>
        <span class="opt-cnt f-c fr">{{item.性别}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one">
        <span>手机</span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.手机" disabled />
        </span>
      </div>

      <div class="opt-one">
        <span>电话</span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.电话" disabled />
        </span>
      </div>

      <div class="opt-one">
        <span>传真</span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.传真" disabled />
        </span>
      </div>

      <div class="opt-one">
        <span>邮箱</span>
        <span class="opt-cnt f-c fr">
          <input type="text" v-model="item.邮箱" disabled />
        </span>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          提交处理
        </span>
        <span class="opt-cnt f-c fr">{{item.提交处理}}</span>
      </div>

      <div class="opt-one">
        <span>接线员</span>
        <span class="opt-cnt f-c fr">{{item.接单人}}</span>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          创建时间
        </span>
        <span class="opt-cnt f-c fr">{{item.创建时间}}</span>
      </div>

      <div class="opt-one" id="optFD">
        <select class="opt-sel" v-model="ZDTextFD" disabled>
          <option v-for="item in wFDept" :key="item.cd" :value="item.nm">{{item.nm}}</option>
        </select>
        <span>
          <i>*</i>
          所属事业部
        </span>
        <span class="opt-cnt f-c fr">{{ZDTextFD}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optPC">
        <select class="opt-sel" v-model="ZDTextCt" disabled>
          <option v-for="item in KeyFailureList" :key="item.cd" :value="item.nm">{{item.nm}}</option>
        </select>
        <span>
          <i>*</i>
          产品分类
        </span>
        <span class="opt-cnt f-c fr">{{ZDTextCt}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-textarea opt-one">
        <span style="vertical-align: top">
          <i>*</i>
          内容描述
        </span>
        <textarea disabled v-model="item.故障描述"></textarea>
      </div>
    </div>

    <div class="rq">
      <div class="opt-textarea opt-one">
        <span style="vertical-align: top">
          <i>*</i>
          故障描述
        </span>
        <textarea type="text" placeholder="多行输入" v-model="repairContent"></textarea>
      </div>

      <div class="opt-img opt-one">
        <span>
          <i>*</i>故障图片
        </span>
        <div class="imgshow">
          <span class="upimg" v-for="(img,index) in imgArr" :key="index">
            <img :src="img" />
            <svg class="icon" aria-hidden="true" @click="deleteImgUrl(index)">
              <use xlink:href="#icon-guanbi" />
            </svg>
          </span>
          <span class="upimg c-m">
            <input
              type="file"
              accept="image/*"
              multiple
              ref="brokenFile"
              @change="uploadImg"
              name="{name}"
            />
          </span>
        </div>
      </div>

      <div class="opt-one" id="optSf">
        <select class="opt-sel" v-model="ZDTextSf">
          <option value></option>
          <option v-for="item in wSfzy" :key="item.ZDValue" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i v-if="ZDTextRw==='故障维修'">*</i>
          是否重要故障
        </span>
        <span class="opt-cnt fr">{{ZDTextSf}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optZd">
        <select class="opt-sel" v-model="ZDTextCd">
          <option value></option>
          <option v-for="item in KeyFailureDetailList" :key="item.cd" :value="item.nm">{{item.nm}}</option>
        </select>
        <span>
          <i v-if="ZDTextRw==='故障维修'">*</i>
          故障代码
        </span>
        <span class="opt-cnt fr">{{ZDTextCd}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optWx">
        <select class="opt-sel" @change="cSelectOp(ZDTextWx,'optWx')" v-model="ZDTextWx">
          <option value="返厂维修">返厂维修</option>
          <option value="终端客户未返回">终端客户未返回</option>
          <option value="终端客户已返回">终端客户已返回</option>
          <option value="分厂服务未返厂">分厂服务未返厂</option>
          <option value="分厂服务已返厂">分厂服务已返厂</option>
        </select>
        <span>
          <i>*</i>
          维修情况
        </span>
        <span class="opt-cnt fr">{{ZDTextWx}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optBx">
        <select class="opt-sel" v-model="ZDTextBx">
          <option v-for="item in wBxqk" :key="item.ZDValue" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i>*</i>
          保修情况
        </span>
        <span class="opt-cnt fr">{{ZDTextBx}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optTq">
        <select class="opt-sel" v-model="ZDTextTq">
          <option value></option>
          <option v-for="item in wTqfh" :key="item.ZDValue" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i v-if="ZDTextRw==='故障维修'">*</i>
          提前发货
        </span>
        <span class="opt-cnt fr">{{ZDTextTq}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optMf">
        <select class="opt-sel" v-model="ZDTextMf">
          <option value></option>
          <option v-for="item in wMfsp" :key="item.ZDValue" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i v-if="ZDTextRw==='故障维修'">*</i>
          免费索赔
        </span>
        <span class="opt-cnt fr">{{ZDTextMf}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          派工日期
        </span>
        <span class="opt-cnt fr">
          <yd-datetime type="date" v-model="item.派工日期" :end-date="currentTime"></yd-datetime>
        </span>
      </div>

      <div class="opt-one" id="optGz">
        <select class="opt-sel" v-model="ZDTextGz">
          <option value></option>
          <option v-for="(item,index) in wGzlx" :key="index" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i v-if="ZDTextRw==='故障维修'">*</i>
          故障类型
        </span>
        <span class="opt-cnt fr">{{ZDTextGz}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one" id="optGzfl">
        <select class="opt-sel" v-model="ZDTextGzfl">
          <option value></option>
          <option v-for="item in wGzfl" :key="item.ZDValue" :value="item.ZDText">{{item.ZDText}}</option>
        </select>
        <span>
          <i v-if="ZDTextRw==='故障维修'">*</i>
          故障分类
        </span>
        <span class="opt-cnt fr">{{ZDTextGzfl}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          所属区域
        </span>
        <span class="opt-cnt fr">
          <input type="text" v-model="region" />
          {{item.所属区域}}
        </span>
      </div>
      <div class="opt-one">
        <span>
          <i>*</i>
          派工人员
        </span>
        <span class="opt-cnt fr">
          <input type="text" v-model="item.派工人员" />
        </span>
      </div>

      <div class="opt-one" id="optPg">
        <select class="opt-sel" v-model="ZDTextPg">
          <option v-for="(item,index) in item.服务人员" :key="index" :value="item">{{item}}</option>
        </select>
        <span>
          <i>*</i>
          服务人员
        </span>
        <span class="opt-cnt fr">{{ZDTextPg}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>
    </div>
    <div class="rq">
      <div class="opt-one serial">
        <span>
          <i>*</i>
          序列号
        </span>
        <div class="serial-wrap">
          <div>
            <span>输入序列号：(仅查询用，不保存)</span>
            <input type="text" v-model="EquipmentInfo" @change="getProductList" />
          </div>
          <div>
            <select v-model="Equipment" @change="selectOption($event)">
              <option value></option>
              <option
                v-for="(item,i) in productFilterArr"
                :key="i"
                :value="item.value"
              >{{item.text}}</option>
            </select>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala" />
            </svg>
          </div>
          <mu-text-field v-model="ProductNo" multi-line :rows="3" :rows-max="6"></mu-text-field>
          <!-- <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiala"></use>
          </svg>-->
        </div>
      </div>

      <div class="opt-one opt-double">
        <span>
          <i>*</i>
          设备型号
        </span>
        <div class="opt-wrap">
          <input class="input-short" type="text" v-model="MachineModelInput" />
          <mu-text-field v-model="MachineModel" multi-line :rows="3" :rows-max="6"></mu-text-field>
        </div>
      </div>

      <div class="opt-one opt-double">
        <span>
          <i>*</i>
          物料号
        </span>
        <div class="opt-wrap">
          <input class="input-short" type="text" v-model="MachineNOInput" />
          <mu-text-field v-model="MachineNO" multi-line :rows="3" :rows-max="6"></mu-text-field>
        </div>
      </div>

      <div class="opt-one">
        <span>替代品序列号</span>
        <span class="opt-cnt fr">
          <input type="text" v-model="MachineNOCharge" />
        </span>
      </div>

      <div class="opt-one opt-double">
        <span>使用年限</span>
        <div class="opt-wrap">
          <input type="text" disabled="disabled" />
          <mu-text-field v-model="UserOfYear" multi-line :rows="3" :rows-max="6"></mu-text-field>
        </div>
      </div>

      <div class="opt-one opt-double">
        <span>
          <i>*</i>
          出厂日期
        </span>
        <div class="opt-wrap">
          <button @click="open">选择日期</button>
          <yd-datetime type="date" ref="datetime" v-model="datetime8" :callback="pushMakeDate">选择日期</yd-datetime>
          <mu-text-field v-model="MakeDate" multi-line :rows="3" :rows-max="6" :disabled="true"></mu-text-field>
        </div>
      </div>

      <div class="opt-one">
        <span>保修年限</span>
        <span class="opt-cnt fr">
          <input type="text" v-model="RepairYear" />
        </span>
      </div>
    </div>

    <div class="rq">
      <div class="opt-textarea opt-one">
        <span style="vertical-align: top">
          <i>*</i>处理措施
        </span>
        <textarea placeholder="多行输入" v-model="ZDTreatment"></textarea>
      </div>

      <div class="opt-one">
        <span>
          <i>*</i>
          反馈时间
        </span>
        <span class="opt-cnt fr">{{this.currentTime}}</span>
      </div>
    </div>

    <div class="g-button">
      <button
        @click.stop="clientRepairFeedback"
        :disabled="btnClick"
        :class="{disable:btnClick===true}"
      >确定</button>
    </div>
  </div>
</template>

<script>
import up from "./img/up.png";

export default {
  data() {
    return {
      imgArr: [],
      srwdh: "",
      waitOrderXq: [],
      item: {},
      strID: "",
      faultType: "FaultType",
      wRwlx: [],
      wXxly: [],
      wSfzy: [],
      wZdgz: [],
      wWxqk: [],
      wBxqk: [],
      wTqfh: [],
      wMfsp: [],
      wGzlx: [],
      wGzfl: [],
      wFDept: [],
      wPCategory: [],
      ZDTextRw: "",
      ZDTextXx: "",
      ZDTextSf: "",
      ZDTextCd: "", //故障代码
      ZDTextWx: "",
      ZDTextBx: "",
      ZDTextTq: "",
      ZDTextMf: "",
      ZDTextGz: "",
      ZDTextGzfl: "",
      ZDTextPC: "",
      ZDTextFD: "",
      ZDTextPg: "",
      ZDTextCt: "",
      currentTime: "",
      str: "",
      ZDTreatment: "",
      repairContent: "",
      name: "file",
      UserOfYear: "",
      MachineNOCharge: "",
      newImgArr: [],
      productList: [],
      EquipmentInfo: "",
      Equipment: "",
      product: [],
      MachineModel: "",
      MachineNO: "",
      ProductNo: "",
      MakeDate: "",
      RepairYear: "",
      KeyFailureList: [],
      KeyFailureDetailList: [],
      selectFailureType: "",
      selectDivision: "",
      MachineModelInput: "",
      MachineNOInput: "",
      region: "",
      receiveUser: "",
      value9: "",
      datetime8: "",
      btnClick: false
    };
  },
  computed: {
    productFilterArr() {
      let newArr = [];

      this.productList.forEach(item => {
        newArr.push({
          text: item["ProductMateID"] + "●" + item["ProductModel"],
          value: item["DeliverDate"] + "●" + item["ProductNo"]
        });
      });
      return newArr;
    }
  },
  mounted() {
    sessionStorage.history = history.length;
    this.strID = this.until.loGet("userPk");
    let time = this.until.formatDate();
    this.currentTime = time.year + "-" + time.month + "-" + time.day;

    //get the division
    this.getDivision();
    // this.searchDdgdxq();
    //get the broken error type
    this.selectOpt("taskType", 0);
    this.selectOpt("InfoSource", 1);
    this.selectOpt("FIsZYGZ", 2);
    // this.selectOpt('InfoSource',1);
    this.selectOpt("RepairSituation", 4);
    this.selectOpt("FBXQK", 5);
    this.selectOpt("FTQFH", 6);
    this.selectOpt("FMFSP ", 7);
    this.selectOpt("FaultClass", 8);
    this.selectOpt("FaultType", 9);
    this.selectOpt("FCategory", 3);
    this.selectOpt("FDEPT", 10);
  },
  methods: {
    pushMakeDate() {
      //第一次是2009-01-01的时候
      if (this.datetime8 && this.MakeDate && this.datetime8 !== "2009-01-01") {
        this.MakeDate += "\n" + this.datetime8;
      } else if (this.datetime8 !== "2009-01-01") {
        this.MakeDate = this.datetime8;
      }
      this.datetime8 = "";
    },
    /** 弹出时间选择*/
    open() {
      this.$refs.datetime.open();
    },
    /*删除图片*/
    deleteImgUrl(index) {
      //后端处理删除数据库中的图片
      if (index > this.imgArr.length - 1) {
        if (this.sRwdh) {
          let param = {
            strGDNO: this.sRwdh,
            imgPath: this.imgArr[index]
          };

          this.until
            .post("/HTWeChat/HTBills/DeleteRepairEntryByGDNO", param)
            .then(
              res => {
                if (res.success) {
                  this.imgArr.splice(index, 1);
                } else {
                  alert("删除失败");
                }
              },
              err => {
                alert("删除失败");
              }
            );
        } else {
          alert("工单号不能为空");
        }
      } else {
        this.imgArr.splice(index, 1);
      }
    },
    cSelectOp(mobel, id) {
      $("#" + id + " .opt-cnt").html(mobel);
    },

    getDivision() {
      this.until
        .get("/general/cat/listByPrntCd", { prntCd: "40050" })
        .then(
          res => {
            this.wFDept = res.data.items;
          },
          err => {}
        )
        .then(() => {
          return new Promise((resolve, reject) => {
            this.sRwdh = this.until.getQueryString("strGDNO");
            let param = {
              strGDNO: this.sRwdh,
              strType: 1,
              StrEmpId: this.strID
            };
            this.until
              .post("/HTWeChat/HTBills/HTGetMyPendingOrderList", param)
              .then(
                res => {
                  if (!res.msg) {
                    resolve(res.data.List);
                  }
                },
                err => {}
              );
          });
        })
        .then(value => {
          console.log(value);
          this.waitOrderXq = value;
          this.item = value[0];
          this.imgArr = this.waitOrderXq[0].故障图片;
          this.ZDTextPg = this.waitOrderXq[0].服务人员[0];
          // this.region=res.data[0].所属区域;
          this.receiveUser = this.waitOrderXq[0].接单人;
          this.ZDTextRw = this.waitOrderXq[0].故障类型;
          this.ZDTextFD = this.waitOrderXq[0].所属事业部;
          this.ZDTextCt = this.waitOrderXq[0].产品分类;
          if (!this.waitOrderXq[0].fistCommit) {
            //赋值需要带过来的字段
            this.repairContent = this.item.repairBackObj.RepairContent;
            this.ZDTextSf = this.item.repairBackObj.Malfunction;
            this.ZDTextCd = this.item.repairBackObj.BrokenCode;
            this.ZDTextWx = this.item.repairBackObj.Maintenance;
            this.ZDTextBx = this.item.repairBackObj.Warranty;
            this.ZDTextTq = this.item.repairBackObj.IsEarlyDelivery
              ? "是"
              : "否";
            this.ZDTextMf = this.item.repairBackObj.IsFreeClaim ? "是" : "否";
            this.ZDTextGz = this.item.repairBackObj.BrokenType;
            this.ZDTextGzfl = this.item.repairBackObj.FaultType;
            this.ProductNo = this.item.repairBackObj.ProductNo;
            this.MachineModel = this.item.repairBackObj.MachineModel;
            this.MachineNO = this.item.repairBackObj.MachineNO;
            this.MachineNOCharge = this.item.repairBackObj.MachineNOCharge;
            this.UserOfYear = this.item.repairBackObj.YearOfUse;
            this.MakeDate = this.item.repairBackObj.MakeDate;
            this.RepairYear = this.item.repairBackObj.RepairYear;
            this.ZDTreatment = this.item.repairBackObj.Treatment;
          }
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            let divisionArr = this.wFDept.filter(item => {
              return item["nm"] === this.ZDTextFD;
            });

            this.selectDivision = divisionArr[0].cd;
            this.until
              .get("/general/cat/listByPrntCd", { prntCd: this.selectDivision })
              .then(
                res => {
                  resolve(res.data.items);
                },
                err => {}
              );
          });
        })
        .then(value => {
          let selectFailure = value.filter(item => {
            return item["nm"] === this.ZDTextCt;
          });
          this.selectFailureType = selectFailure[0].cd;
          this.until
            .get("/general/cat/listByPrntCd", {
              prntCd: this.selectFailureType
            })
            .then(
              res => {
                this.KeyFailureDetailList = res.data.items;
                if (this.ZDTextRw === "故障维修") {
                  this.ZDTextCd = res.data.items[0].nm;
                } else {
                  this.ZDTextCd = "";
                }
              },
              err => {}
            );
        });
    },
    selectOpt(cardType, lis) {
      let param = {
        strType: cardType
      };
      this.until.post("/HTWeChat/HTBills/HTGetItemList", param).then(
        res => {
          if (res.msg == "") {
            switch (lis) {
              case 0:
                this.wRwlx = res.data;
                // this.cSelectOp(res.data[0],'optSf');
                break;
              case 1:
                this.wXxly = res.data;
                break;
              case 2:
                this.wSfzy = res.data;
                this.ZDTextSf = "";
                break;
              case 3:
                this.wPCategory = res.data;
                break;
              case 4:
                this.wWxqk = res.data;
                this.ZDTextWx = "返厂维修";
                break;
              case 5:
                this.wBxqk = res.data;
                this.ZDTextBx = res.data[0].ZDText;
                break;
              case 6:
                this.wTqfh = res.data;
                this.ZDTextTq = "";
                break;
              case 7:
                this.wMfsp = res.data;
                this.ZDTextMf = "";
                break;
              case 8:
                this.wGzlx = res.data;
                this.ZDTextGz = "";
                break;
              case 9:
                this.wGzfl = res.data;
                this.ZDTextGzfl = "";
                break;
              // case 10:
              //   this.wFDept = res.data;
              //   break;
            }
          }
        },
        err => {}
      );
    },
    getProductList() {
      let param = {
        prefixText: this.EquipmentInfo
      };

      this.until.post("/HTWeChat/HTBills/GetMachineCompletionList", param).then(
        res => {
          if (res.success) {
            this.productList = res.data;
          } else {
            this.productList = [];
            alert(res.msg);
          }
        },
        err => {}
      );
    },
    selectOption(e) {
      //get the select productno
      this.ProductNo = !this.ProductNo
        ? e.target.value.split("●")[1]
        : this.ProductNo + "\n" + e.target.value.split("●")[1];
      this.product = this.productList.filter(item => {
        return item["ProductNo"] === e.target.value.split("●")[1];
      });

      this.MachineNO = !this.MachineNO
        ? this.product[0]["ProductMateID"]
        : this.MachineNO + "\n" + this.product[0]["ProductMateID"];
      this.MakeDate = !this.MakeDate
        ? this.product[0]["DeliverDate"].replace(/\D/g, "-")
        : this.MakeDate +
          "\n" +
          this.product[0]["DeliverDate"].replace(/\D/g, "-");
      this.MachineModel = !this.MachineModel
        ? this.product[0]["ProductModel"]
        : this.MachineModel + "\n" + this.product[0]["ProductModel"];
      //calcute yearofuse
      let time = this.until.formatDate();
      let makeYear = this.product[0]["DeliverDate"].substr(0, 4);
      this.UserOfYear = !this.UserOfYear
        ? (parseInt(time.year) - parseInt(makeYear)).toString()
        : this.UserOfYear +
          "\n" +
          (parseInt(time.year) - parseInt(makeYear)).toString();
      this.EquipmentInfo = "";
      this.Equipment = "";
    },
    rules() {
      if (this.ZDTreatment === "") {
        this.str += "处理措施不能为空\n";
      } else if (!this.repairContent) {
        this.str += "故障描述不能为空";
      } else if (this.imgArr.length <= 0) {
        this.str += "故障图片必须上传1张\n";
      } else if (!this.sRwdh) {
        this.str += "工单号不能为空\n";
      } else if (!this.ZDTextWx) {
        this.str += "维修情况不能为空";
      } else if (!this.ZDTextBx) {
        this.str += "保修情况不能为空";
      } else if (!this.waitOrderXq[0].派工日期) {
        this.str += "派工日期不能为空";
      } else if (!this.waitOrderXq[0].派工人员) {
        this.str += "派工人员不能为空";
      } else if (!this.MachineModel && !this.MachineModelInput) {
        this.str += "设备型号不能为空";
      } else if (!this.MachineNO && !this.MachineNOInput) {
        this.str += "物料号不能为空";
      } else if (!this.ProductNo && !this.EquipmentInfo) {
        this.str += "序列号不能为空";
      } else if (!this.MakeDate) {
        this.str += "出厂日期不能为空";
      } else if (!this.currentTime) {
        this.str += "反馈时间不能为空";
      }

      /**当任务类型为故障维修的时候，增加以下选项的必填判断 2019-5-29 dyp repiar bug */
      if (this.ZDTextRw === "故障维修") {
        if (!this.ZDTextSf) {
          this.str += "是否重要故障不能为空";
        } else if (!this.ZDTextCd) {
          this.str += "故障代码不能为空";
        } else if (!this.ZDTextTq) {
          this.str += "提前发货不能为空";
        } else if (!this.ZDTextMf) {
          this.str += "免费索赔不能为空";
        } else if (!this.ZDTextGz) {
          this.str += "故障类型不能为空";
        } else if (!this.ZDTextGzfl) {
          this.str += "故障分类不能为空";
        }
      }

      //判断数量
      const length1 = this.ProductNo && this.ProductNo.split("\n");
      const length2 = this.MachineModel && this.MachineModel.split("\n");
      const length3 = this.MachineNO && this.MachineNO.split("\n");

      if (length1 !== length2 || length1 !== length3 || length2 !== length3) {
        const minVal = Math.min(length1, length2, length3);
        if (length1 === minVal) {
          this.str += "序列号与其他设备信息的数量不相等，请继续输入";
        } else if (length2 === minVal) {
          this.str += "设备型号与其他设备信息的数量不相等，请继续输入";
        } else if (length3 === minVal) {
          this.str += "物料号与其他设备信息的数量不相等，请继续输入";
        }
      }

      if (!this.str) {
        return true;
      } else {
        //当有字段未填写时，重新填写后保证能点
        this.btnClick = false;
        return false;
      }
    },

    clientRepairFeedback() {
      this.str = "";
      this.btnClick = true;
      //this.sRwdh = getParamer("strGDNO");

      if (this.rules()) {
        let repairBack = {
          Malfunction: this.ZDTextSf,
          Maintenance: this.ZDTextWx,
          Warranty: this.ZDTextBx,
          IsEarlyDelivery: this.ZDTextTq === "是",
          IsFreeClaim: this.ZDTextMf === "是",
          BrokenType: this.ZDTextGz, //故障类型
          FaultType: this.ZDTextGzfl, //故障分类
          GDNO: this.sRwdh,
          Treatment: this.ZDTreatment,
          RepairID: this.ZDTextPg,
          RepairTime: this.currentTime,
          RepairContent: this.repairContent,
          MachineNOCharge: this.MachineNOCharge, //替代品序列号
          YearOfUse: this.UserOfYear, //使用年限
          RepairImgs: this.newImgArr.join(","),
          ProductNo:
            this.ProductNo.replace(/^\n|\n$/gi, "") ||
            this.EquipmentInfo.replace(/^\n|\n$/gi, ""), //序列号
          MachineModel:
            this.MachineModel.replace(/^\n|\n$/gi, "") ||
            this.MachineModelInput.replace(/^\n|\n$/gi, ""), //产品型号
          RepairYear: this.RepairYear.replace(/^\n|\n$/gi, ""), //保修年限
          MakeDate: this.MakeDate.replace(/^\n|\n$/gi, ""), //出厂日期
          MachineNO:
            this.MachineNO.replace(/^\n|\n$/gi, "") ||
            this.MachineNOInput.replace(/^\n|\n$/gi, ""), //物料号
          BrokenCode: this.ZDTextCd, //故障代码
          TaskType: this.ZDTextRw, //任务类型
          ReceiveUser: this.receiveUser //接单人
        };

        console.log(JSON.stringify(repairBack));
        let paramJson = JSON.stringify(repairBack);

        let param = {
          entity: paramJson
        };

        console.log("submit");
        this.until.post("/HTWeChat/HTBills/HTCustWarrantyFeedback", param).then(
          res => {
            if (res.success) {
              alert("预约维修反馈提交成功！");
              this.deleteWarningKey();
              window.history.back();
            } else {
              alert(res.msg);
            }
          },
          err => {
            alert(err.msg);
          }
        );
      } else {
        alert(this.str);
      }
    },
    deleteWarningKey() {
      let param = {
        num: this.sRwdh
      };

      this.until.post("/weixin/login/delWaringKey", param).then(
        res => {
          console.log("删除预警成功");
        },
        err => {
          console.log(err);
        }
      );
    },
    uploadImg(ev) {
      //判断安卓环境
      const files = ev.target.files;

      if (!files) {
        return;
      }

      const formData = new FormData();
      // 将files类数组转换为数组
      var postFiles = Array.prototype.slice.call(files);

      postFiles.forEach(item => {
        console.log(this);
        formData.append(this.name, item);
      });

      this.until.postImg("/prod/upload/uploading", formData).then(
        res => {
          console.log("上传成功");
          //修改图片的路径，因为上传成功返回的路径不是实际上存储的路径
          this.newImgArr.push(res.data.replace("8086", "90"));
          this.imgArr.push(res.data.replace("8086", "90"));
        },
        err => {}
      );
    }
  }
};
</script>

