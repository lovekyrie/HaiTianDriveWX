<style lang="less">
body {
  background-color: #f5f5f5;
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 30%;
  /*.el-upload-list__item-status-label{*/
  /*display: none;*/
  /*}*/
}
.el-upload--picture-card {
  width: 31%;
}
.opt-one {
  background-color: #fff;
  position: relative;
  padding: 0.35rem 0.75rem 0.35rem 0.4rem;
  font-size: 0.24rem;
  border-bottom: 1px solid #d9d9d9;
  .el-select {
    float: right;
    margin-right: -20px;
    margin-top: -8px;
  }
  .el-upload-list__item-actions {
    opacity: 1;
    background: none;
  }
  .imgUp {
    padding-top: 20px;
    .el-upload-list__item-preview {
      display: none !important;
    }
    .el-upload-list--picture-card .el-upload-list__item-status-label {
      display: none;
    }
    .el-upload-list__item-delete {
      display: block;
      position: absolute;
      right: 5px;
      top: 5px;
      .el-icon-delete2:before {
        content: "X";
        color: #333;
        background: #dddddd;
        border-radius: 5px;
        opacity: 0.8;
        padding: 3px;
      }
    }
  }
  span {
    position: relative;
    i {
      position: absolute;
      top: 0;
      left: -0.25rem;
      color: red;
    }
    &.f-c {
      color: #999;
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

.opt-textarea {
  position: relative;
  padding: 0.35rem;
  padding-left: 1.7rem;
  span {
    position: absolute;
    top: 0.35rem;
    left: 0.35rem;
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
    padding-top: 0.3rem;
    .c-m {
      margin-right: 0;
    }
    .upimg {
      position: relative;
      border: 1px solid #999;
      background-color: #fff;
      width: 2rem;
      height: 1.2rem;
      background: url("./img/up.png") 50% 35% no-repeat;
      background-size: 0.41rem 0.41rem;
      margin-right: 0.38rem;
      overflow: hidden;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      p {
        position: absolute;
        bottom: 0.05rem;
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        color: #999;
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

.list-tit {
  overflow: hidden;
  position: relative;
  height: 1rem;
  line-height: 1rem;
  padding: 0 1.35rem;
  p {
    margin-top: 0.5rem;
    border-top: 1px solid #c4c4c4;
  }
  span {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    padding: 0 0.4rem;
    background-color: #f5f5f5;
    vertical-align: middle;
    i {
      color: red;
      vertical-align: middle;
    }
  }
}

.c-textarea {
  background-color: #fff;
  padding: 0 0.35rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 0.2rem;
  textarea {
    font-size: 0.24rem;
    color: #999;
  }
  .textarea-counter {
    font-size: 0.24rem;
  }
}

.border-c {
  border-top: 1px solid #d9d9d9;
}

.opt-input {
  display: flex;
}

.opt-one input {
  flex: 1;
  text-indent: 0.2rem;
  border: 0;
}
</style>

<template>
    <div id="container">
        <div style="margin-bottom: .2rem;">
            <div class="opt-one">

                <select class="opt-sel" @change="cSelectOp()" v-model="ZDTextBx">
                    <option value=""></option>
                    <option :value="item.ZDText" v-for="(item,index) in bxlb" :key="index">{{item.ZDText}}</option>
                </select>

                <span><i>*</i>报修产品</span>

                <!--<el-select v-model="strPro" placeholder="产品类别" @change="cSelectOp()">-->
                <!--<el-option v-for="item in bxlb"  :value="item.ZDText" >-->
                <!--</el-option>-->
                <!--</el-select>-->

                <span class="opt-cnt fr">{{strPro}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </div>
        </div>

        <div>
            <div class="opt-one border-c">
                <span><i>*</i>设备型号:</span>
                <input type="text" v-model="strItemModel">
                <!-- <mu-text-field v-model.number="strItemModel" multi-line :rows="3" :rows-max="6"></mu-text-field> -->
            </div>
            <div class="opt-one">
                <span><i>*</i>序列号:</span>
                <input type="text" v-model="strItemSN">
                <!-- <mu-text-field v-model.number="strItemSN" multi-line :rows="3" :rows-max="6"></mu-text-field> -->
            </div>
        </div>

        <div class="list-tit">
            <span><i>* </i>故障描述</span>
        </div>

        <div class="c-textarea">
            <yd-textarea slot="right" placeholder="请输入关于设备的故障描述" maxlength="200" v-model="strMark"></yd-textarea>
        </div>

        <div class="rq">
            <div class="opt-img opt-one">
                <span><i>*</i>故障图片</span>
                <el-upload ref="upload" class="imgUp" multiple 
                        action="/prod/upload/uploading"
                        list-type="picture-card"
                           :on-progress="imgUp"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="imgArr">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!--<svg class="icon" aria-hidden="true" @click="deleteImgUrl(index)"><use xlink:href="#icon-guanbi"></use></svg>-->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="1111">
                </el-dialog>
            </div>
        </div>

        <div class="list-tit">
            <span>联系人</span>
            <p></p>
        </div>

        <div>
            <div class="opt-input opt-one border-c">
                <span><i>*</i>客户名称:</span>
                <input type="text" v-model="strCust">
            </div>
            <div class="opt-input opt-one">
                <span><i>*</i>联系人:</span>
                <input type="text" v-model="strContract">
            </div>
            <div class="opt-input opt-one">
                <span><i>*</i>联系电话:</span>
                <input type="text" v-model="strMobile">
            </div>
            <!-- <div class="opt-input opt-one">
                <span>电话号码:</span>
                <input type="text" v-model="strPhone">
            </div> -->
            <div class="opt-input opt-one">
                <span>地址:</span>
                <input type="text" v-model="strAddress">
            </div>
        </div>

        <div class="g-button" @click="clientRepair">
            <button>提交</button>
        </div>
        <dialogMsg v-show="isShow"></dialogMsg>
    </div>
</template>

<script>
import up from "./img/up.png";
import dialogMsg from "components/dialogMsg";

export default {
  data() {
    return {
      strPro: "报修产品",
      dialogImageUrl: "",
      dialogVisible: false,
      isShow: false,
      // imgArr: [up,up,up],
      imgArr: [],
      client: "",
      itemNo: "",
      bxlb: [],
      ZDTextBx: "",
      strItemNo: "",
      strItemModel: "",
      strItemSN: "",
      strContract: "",
      strCust: "",
      strEmp: "",
      strMobile: "",
      strPhone: "",
      strAddress: "",
      strMark: "",
      str: ""
    };
  },
  mounted() {
    this.clientRepairCp();
    this.localStorageParam();
    let url = window.location.href.split("?")[1];
    console.log(url);
    let code = "";
    if (url) {
      if (url.indexOf("&") > 0) {
        let urlParamArray = url.split("&");
        for (let i = 0; i < urlParamArray.length; i++) {
          let paramerName = urlParamArray[i].split("=");
          console.log(paramerName);
          if ("code" == paramerName[0]) {
            // return paramerName[1];
            code = paramerName[1];
          }
        }
        console.log(urlParamArray);
      } else {
        let paramerValue = url.split("=")[1];
        // return paramerValue;
        console.log(paramerValue);
        code = paramerValue;
      }
      console.log("获取到的code:" + code);
      let param = {
        code: code
      };
      this.until.get("/weixin/access/login", param).then(
        res => {
          // WeixinJSBridge.call("closeWindow");
        },
        err => {
          alert("登录失败");
          console.log(err);
        }
      );
    }
  },
  methods: {
    //
    alertSomeThing() {
      alert(123);
    },
    imgUp() {},
    handleRemove(file, fileList) {
      console.log(file.response.data);
      let param = {
        src: file.response.data
      };

      this.until.get("/prod/upload/delImg", param).then(
        res => {
          console.log("删除成功");
        },
        err => {
          console.log(err);
        }
      );
    },

    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    cSelectOp() {
      console.log(this.ZDTextBx);
      $(".opt-cnt").html(this.ZDtextBx);
      this.strPro = this.ZDTextBx;
      this.strItemNo = this.ZDTextBx;
      console.log(this.strItemNo);
    },

    /*删除图片*/
    deleteImgUrl(index) {
      this.imgArr.splice(index, 1);
    },

    rules() {
      if (this.strItemNo == "") {
        this.str += "报修产品不能为空！\n";
      } else if (this.strItemModel == "") {
        this.str += "设备型号不能为空！\n";
      } else if (this.strItemSN == "") {
        this.str += "序列号不能为空！\n";
      } else if (this.strMark == "") {
        this.str += "故障描述不能为空！\n";
      } else if (this.strCust == "") {
        this.str += "客户名称不能为空！\n";
      } else if (this.strContract == "") {
        this.str += "联系人不能为空！\n";
      } else if (!this.strMobile ) {
        this.str += "联系电话不能为空！\n";
      } else if (this.imgArr.length === 0) {
        this.str += "故障图片不能为空！\n";
      }

      let self = this;
      if (this.str == "") {
        let partten = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (partten.test(self.strMobile)) {
          console.log("号码正确");
          return true;
        } else {
          self.str += "请输入正确的手机格式";
          return false;
        }
        return true;
      } else {
        return false;
      }
    },

    clientRepair() {
      this.str = "";
      this.imgArr = [];

      this.$refs.upload.uploadFiles.forEach(item => {
        this.imgArr.push(
          //測試環境用
          item.response.data.replace("8086", "90")
        );
      });
      console.log(this.imgArr);

      if (this.rules()) {
        let param = {
          strItemNo: this.strItemNo,
          strItemModel: this.strItemModel,
          strItemSN: this.strItemSN,
          strContract: this.strContract,
          strCust: this.strCust,
          strEmp: this.strEmp,
          strMobile: this.strMobile,
          strPhone: this.strPhone,
          strAddress: this.strAddress,
          strMark: this.strMark,
          rsFilePathList: this.imgArr.join(",")
        };

        let paramCustomer = {
          name: this.strCust,
          phone: this.ZDTextBx,
          address: this.strItemModel,
          deprecated: this.strMark
        };
        console.log("submit");
        //设置localStorage存储

        this.until.loSave("cName", this.strCust);
        this.until.loSave("cLinked", this.strContract);
        // if (this.strMobile) {
          this.until.loSave("cMobile", this.strMobile);
        // } else {
        //   this.until.loSave("cPhone", this.strPhone);
        // }
        if (this.strAddress) {
          this.until.loSave("cAddress", this.strAddress);
        }

        this.until.post("/HTWeChat/HTBills/HTSetCustBX", param).then(res => {
          alert("预约报修提交成功，客服会在24小时内联系您！");
          WeixinJSBridge.call("closeWindow");
          console.log(JSON.stringify(paramCustomer));
          this.until.post("/weixin/push/pushCustomer", paramCustomer);
        });
      } else {
        alert(this.str);
      }
    },

    clientRepairCp() {
      let param = {
        strType: "FCategory"
      };

      this.until.post("/HTWeChat/HTBills/HTGetItemList", param).then(
        res => {
          if (res.msg == "") {
            this.bxlb = res.data;
          } else {
          }
        },
        err => {}
      );
    },

    localStorageParam() {
      this.strCust = this.until.loGet("cName");
      this.strContract = this.until.loGet("cLinked");
      this.strMobile = this.until.loGet("cMobile");
      this.strPhone = this.until.loGet("cPhone");
      this.strAddress = this.until.loGet("cAddress");
    }
  },
  components: { dialogMsg }
};
</script>

