<style lang="less">
body {
  background-color: #f5f5f5;
}

.yd-radio-icon {
  width: 0.3rem !important;
  height: 0.3rem !important;
  i {
    width: 0.15rem !important;
    height: 0.15rem !important;
  }
}

.yd-radio {
  /*margin: .1rem 0;*/
  height: 0.6rem;
  line-height: 0.6rem;
  padding-right: 0;
  .yd-radio-icon {
    vertical-align: middle;
  }
  .yd-radio-text {
    font-size: 0.2rem;
    color: #000;
    padding-right: 0.1rem;
    vertical-align: middle;
  }
}

header {
  h3 {
    text-align: center;
    font-size: 0.3rem;
    margin-top: 0.3rem;
  }
  .bz {
    text-align: center;
    font-size: 0.16rem;
  }
  h4 {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    font-size: 0.26rem;
  }
  .cnt {
    margin: 0.2rem 0.3rem;
    color: #666;
    font-size: 0.22rem;
  }
}

.temp-opt {
  position: relative;
  background-color: #fff;
  font-size: 0.28rem;
  padding: 0.35rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  span:nth-of-type(1) {
    display: inline-block;
    width: 1.2rem;
    > .require {
      font-style: normal;
      position: absolute;
      left: 0.1rem;
      color: #f00;
    }
  }
  input {
    border: 0;
  }
}

.temp-input {
  padding: 0 0.6rem;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  input {
    width: 100%;
    height: 0.8rem;
    border: 0;
    font-size: 0.24rem;
  }
}

.rq-c {
  margin-top: 0.2rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  > div {
    &:nth-last-of-type(1) {
      border-bottom: 0;
    }
  }
  .temp-opt {
    border-top: 0;
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
  }
}

.wx {
  display: flex;
  padding-right: 0;
  span:nth-of-type(1) {
    width: 1.7rem;
    padding-top: 0.1rem;
    line-height: 1.5;
    padding-right: 0.1rem;
  }
  > div {
    flex: 1;
    .yd-radio {
      width: 30%;
    }
  }
}

.t-tit {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.26rem;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
}

.temp-textarea {
  font-size: 0;
  textarea {
    width: 100%;
    height: 2rem;
    padding: 0.35rem;
    line-height: 1.5;
    font-size: 0.24rem;
    border: 0;
  }
}

.tem-qz {
  padding: 0.35rem;
  background-color: #fff;
  font-size: 0.24rem;
  p {
    &:nth-of-type(1) {
      margin-bottom: 0.55rem;
      font-size: 0.24rem;
    }
    &:nth-of-type(2) {
      text-align: right;
      font-size: 0.2rem;
      color: #666;
    }
  }
  input {
    width: 100%;
    font-size: 0.6rem;
    text-align: center;
    border: 0;
  }
  img {
    width: 50%;
    height: 50%;
  }
}

.prod-t {
  position: relative;
  padding-right: 0;
  display: flex;
  > span {
    &:nth-of-type(1) {
      width: 1.4rem;
      margin-top: 0.1rem;
      padding-right: 0.1rem;
    }
    > .require {
      position: absolute;
      left: 0.1rem;
      font-style: normal;
      color: #f00;
    }
  }
  > div {
    flex: 1;
    width: 30%;
  }
}

.lbwbd {
  span:nth-of-type(1) {
    width: 1.9rem;
  }
}
</style>

<template>
  <div id="container">
    <header>
      <h3>顾客满意调查表</h3>
      <p class="bz">HTQ-QR8.2.1-03B</p>
      <h4>尊敬的顾客：</h4>
      <p
        class="cnt"
      >为提升我司的产品和服务质量，增强您们的满意，请您对我司的满意测量项目的满意程度进行评价（在相应的□内√），并提出改进意见、要求和建议，以利我司持续改进。请将此表反馈回我司售后服务部，谢谢！</p>
    </header>

    <div class="prod-t temp-opt">
      <span>
        <i class="require">*</i>
        产品类别
      </span>
      <yd-radio-group v-model="Cplx">
        <yd-radio val="伺服电机"></yd-radio>
        <yd-radio val="伺服驱动器"></yd-radio>
        <yd-radio val="伺服机械手"></yd-radio>
        <yd-radio val="液压马达"></yd-radio>
        <yd-radio val="滚动直线导轨副"></yd-radio>
        <yd-radio val="平衡重式叉车"></yd-radio>
        <yd-radio val="其他"></yd-radio>
      </yd-radio-group>
    </div>
    <div class="temp-input">
      <input type="text" placeholder="若是其他类别，请手动输入类别名称" v-model="CplxQt">
    </div>

    <div class="rq-c">
      <div class="temp-opt clearfix">
        <span>顾客名称</span>
        <span class="fr">{{customer.顾客名称}}</span>
      </div>

      <div class="temp-opt clearfix">
        <span>地址</span>
        <span class="fr">{{customer.地址}}</span>
      </div>

      <div class="temp-opt clearfix">
        <span>联系电话</span>
        <span class="fr">{{customer.联系电话}}</span>
      </div>

      <div class="temp-opt">
        <span>
          <i class="require">*</i>
          顾客性质
        </span>
        <yd-radio-group v-model="Gkxz" style="display: inline-block;">
          <yd-radio val="最终客户"></yd-radio>
          <yd-radio val="经销商"></yd-radio>
          <yd-radio val="系统集成商"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="temp-opt clearfix">
        <span>联系人</span>
        <span class="fr">{{customer.联系人}}</span>
      </div>

      <div class="temp-opt clearfix">
        <span>
          <i class="require">*</i>
          职务
        </span>
        <input type="text" v-model="position">
      </div>

      <div class="temp-opt">
        <span>
          <i class="require">*</i>
          类别
        </span>
        <yd-radio-group v-model="quality" style="display: inline-block;">
          <yd-radio val="使用人员"></yd-radio>
          <yd-radio val="管理人员"></yd-radio>
        </yd-radio-group>
      </div>
    </div>

    <div class="list-tit">
      <span>调查产品清单</span>
      <p></p>
    </div>

    <div class="rq-c" style="margin-top: 0">
      <div v-for="item in customer.productList" :key="item.index">
        <div class="lbwbd temp-opt clearfix">
          <span>序号</span>
          <span class="fr">{{item.index}}.</span>
        </div>
        <div class="lbwbd temp-opt clearfix">
          <span>产品型号规格</span>
          <span class="fr">{{item.machineModel}}</span>
        </div>
        <div class="lbwbd temp-opt clearfix">
          <span>产品编号</span>
          <span class="fr">{{item.productNo}}</span>
        </div>
      </div>
      <div class="temp-opt clearfix">
        <span>备注</span>
        <input type="text" v-model="remarks">
      </div>
    </div>

    <div class="list-tit">
      <span>满意测量项目</span>
      <p></p>
    </div>

    <div class="rq-c" style="margin-top: 0">
      <div class="t-tit">产品设计质量</div>
      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          外形结构
        </span>
        <yd-radio-group v-model="Wxjg" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          使用性能
        </span>
        <yd-radio-group v-model="Syxn" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          可维修性
        </span>
        <yd-radio-group v-model="Kwxx" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          配套件
        </span>
        <yd-radio-group v-model="Ptj" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>
    </div>

    <div class="rq-c">
      <div class="t-tit">产品加工质量</div>
      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          零件加工
        </span>
        <yd-radio-group v-model="Ljjg" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          装配(接线)
        </span>
        <yd-radio-group v-model="Zp" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          包装标识
        </span>
        <yd-radio-group v-model="Bzbs" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          外观
        </span>
        <yd-radio-group v-model="Wg" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>
    </div>

    <div class="rq-c">
      <div class="t-tit">交付运输质量</div>
      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          交付及时性
        </span>
        <yd-radio-group v-model="Jfjsx" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          运输防护
        </span>
        <yd-radio-group v-model="Ysfh" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>
    </div>

    <div class="rq-c">
      <div class="t-tit">售后服务质量</div>
      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          服务及时
        </span>
        <yd-radio-group v-model="Fwjs" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          服务态度
        </span>
        <yd-radio-group v-model="Fwtd" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          服务技术
        </span>
        <yd-radio-group v-model="Fwjshu" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>
    </div>

    <div class="rq-c">
      <div class="t-tit">其他</div>
      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          后勤服务人员态度
        </span>
        <yd-radio-group v-model="Hdfwtd" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          供应商供货速度
        </span>
        <yd-radio-group v-model="Ghsd" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>

      <div class="wx temp-opt">
        <span>
          <i class="require">*</i>
          开票及时性
        </span>
        <yd-radio-group v-model="Kpjs" style="display: inline-block;">
          <yd-radio val="满意"></yd-radio>
          <yd-radio val="较满意"></yd-radio>
          <yd-radio val="一般满意"></yd-radio>
          <yd-radio val="较不满意"></yd-radio>
          <yd-radio val="很不满意"></yd-radio>
        </yd-radio-group>
      </div>
    </div>

    <div class="temp-textarea rq-c">
      <textarea placeholder="顾客对质量及服务的意见、要求或建议：" v-model="Gkyj"></textarea>
    </div>

    <div class="tem-qz rq-c">
      <p>顾客签字（盖章）/日期</p>
      <signature v-if="unSign" @saveSign="getSignValue"></signature>
      <img v-show="!unSign" :src="customerSign" alt="客户签字">
      <p>{{currentTime}}</p>
    </div>

    <div v-if="unbind" class="g-button" @click="getSati">
      <button>确定</button>
    </div>
    <div v-else class="g-button2">
      <button>确定</button>
    </div>
  </div>
</template>

<script>
import signature from "@/components/signature";
export default {
  data() {
    return {
      unbind: true,
      sRwdh: "",
      Gkxz: "",
      Cplx: "",
      Gkmc: "安4",
      Dz: "",
      LxPhone: "",
      CplxQt: "",
      Lxr: "",
      Zw: "",
      Lb: "",
      Xh: "",
      Cpxhgg: "",
      Cpbh: "",
      Bz: "",
      Syxn: "",
      Wxjg: "",
      Kwxx: "",
      Ptj: "",
      Ljjg: "",
      Zp: "",
      Bzbs: "",
      Wg: "",
      Jfjsx: "",
      Ysfh: "",
      Fwjs: "",
      Fwtd: "",
      Fwjshu: "",
      Hdfwtd: "",
      Ghsd: "",
      Kpjs: "",
      Gkyj: "",
      Gkgz: "",
      Myddc: [],
      customer: {},
      customerSign: "",
      currentTime: "",
      requireMsg: "",
      position: "",
      remarks: "",
      unSign: true
    };
  },
  computed: {},
  components: {
    signature
  },
  mounted() {
    // this.abc();

    let that = this;
    let time = this.until.formatDate();
    this.currentTime = time.year + "-" + time.month + "-" + time.day;
    this.sRwdh = this.getParamer("strGDNO");

    this.getCustomerInfo();
    let param = {
      jobNumber: this.sRwdh
    };

    //存储
    this.until.get("/prod/satis/wnfo", param).then(
      res => {
        if (res.status == 200) {
          let info = res.data.satisFactionsVo;
          this.sRwdh = info.jobNumber;
          this.Gkmc = info.nm;
          this.Dz = info.address;
          this.LxPhone = info.phone;
          this.Gkxz = info.customerNature;
          this.Lxr = info.linkmanNm;
          this.Zw = info.post;
          this.Lb = info.cateGory;
          this.Cplx = info.productCategory;
          this.Xh = info.serialNumber;
          this.Cpxhgg = info.modelSpecification;
          this.Cpbh = info.productNumber;
          this.Bz = info.productRmks;
          this.Wxjg = info.shapeStructure;
          this.Syxn = info.performance;
          this.Kwxx = info.maintainability;
          this.Ptj = info.matching;
          this.Ljjg = info.partsProcessing;
          this.Zp = info.assembling;
          this.Bzbs = info.packagingLabel;
          this.Wg = info.appearance;
          this.Jfjsx = info.deliveryTimeliness;
          this.Ysfh = info.transportationProtection;
          this.Fwjs = info.serviceInTime;
          this.Fwtd = info.serviceAttitude;
          this.Fwjshu = info.serviceTechnology;
          this.Hdfwtd = info.personnelAttitude;
          this.Ghsd = info.supplySpeed;
          this.Kpjs = info.timeliness;
          this.Gkyj = info.feedback;
          this.position = info.post;
          this.quality = info.category;
          this.customerSign = info.customerSignature;
          if (this.customerSign) {
            this.unSign = false;
          }
          this.unbind = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    getParamer(paramer) {
      let url = window.location.href.split("?")[1];
      if (url.indexOf("&") > 0) {
        let urlParamArray = url.split("&");
        for (let i = 0; i < urlParamArray.length; i++) {
          let paramerName = urlParamArray[i].split("=");
          if (paramer == paramerName[0]) {
            return paramerName[1];
          }
        }
      } else {
        let paramerValue = url.split("=")[1];
        return paramerValue;
      }
    },
    getSignValue(data) {
      this.customerSign = data;
      this.unSign = false;
    },
    rules() {
      //判断必填
      this.requireMsg = "";

      if (!this.Cplx) {
        this.requireMsg += "产品类别为必填";
      } else if (!this.Gkxz) {
        this.requireMsg += "顾客性质为必填";
      } else if (!this.Wxjg) {
        this.requireMsg += "外形结构为必填";
      } else if (!this.Syxn) {
        this.requireMsg += "使用性能为必填";
      } else if (!this.Kwxx) {
        this.requireMsg += "可维修性为必填";
      } else if (!this.Ptj) {
        this.requireMsg += "配套件为必填";
      } else if (!this.Ljjg) {
        this.requireMsg += "零件加工为必填";
      } else if (!this.Zp) {
        this.requireMsg += "装配(接线)为必填";
      } else if (!this.Bzbs) {
        this.requireMsg += "包装标识为必填";
      } else if (!this.Wg) {
        this.requireMsg += "外观为必填";
      } else if (!this.Jfjsx) {
        this.requireMsg += "交付及时性为必填";
      } else if (!this.Ysfh) {
        this.requireMsg += "运输防护为必填";
      } else if (!this.Fwjs) {
        this.requireMsg += "服务及时为必填";
      } else if (!this.Fwtd) {
        this.requireMsg += "服务态度为必填";
      } else if (!this.Fwjshu) {
        this.requireMsg += "服务技术为必填";
      } else if (!this.Hdfwtd) {
        this.requireMsg += "后勤服务人员态度为必填";
      } else if (!this.Ghsd) {
        this.requireMsg += "供应商供货速度为必填";
      } else if (!this.Kpjs) {
        this.requireMsg += "开票及时性为必填";
      } else if (!this.Gkyj) {
        this.requireMsg += "客户满意度为必填";
      } else if (!this.customerSign) {
        this.requireMsg += "客户签字为必填";
      } else if (!this.position) {
        this.requireMsg += "职务为必填";
      } else if (!this.quality) {
        this.requireMsg += "类别为必填";
      }

      if (this.requireMsg) {
        return false;
      } else {
        return true;
      }
    },
    async getSati() {
      if (this.rules()) {
        let param = {
          jobNumber: this.sRwdh,
          nm: this.Gkmc,
          address: this.Dz,
          phone: this.LxPhone,
          customerNature: this.Gkxz,
          linkmanNm: this.Lxr,
          post: this.Zw,
          cateGory: this.Lb,
          productCategory: this.Cplx,
          serialNumber: this.Xh,
          modelSpecification: this.Cpxhgg,
          productNumber: this.Cpbh,
          productRmks: this.Bz,
          shapeStructure: this.Wxjg,
          performance: this.Syxn,
          maintainability: this.Kwxx,
          matching: this.Ptj,
          partsProcessing: this.Ljjg,
          assembling: this.Zp,
          packagingLabel: this.Bzbs,
          appearance: this.Wg,
          deliveryTimeliness: this.Jfjsx,
          transportationProtection: this.Ysfh,
          serviceInTime: this.Fwjs,
          serviceAttitude: this.Fwtd,
          serviceTechnology: this.Fwjshu,
          personnelAttitude: this.Hdfwtd,
          supplySpeed: this.Ghsd,
          timeliness: this.Kpjs,
          feedback: this.Gkyj,
          customerSignature: this.customerSign,
          nm: this.customer.顾客名称,
          address: this.customer.地址,
          phone: this.customer.联系电话,
          linkmanNm: this.customer.联系人,
          post: this.position,
          serialNumber: this.customer.序号,
          modelSpecification: this.customer.规格型号,
          productNumber: this.customer.产品编号,
          rmks: this.remarks,
          serialNumber: 1,
          modelSpecification: this.customer.productList[0].machineModel,
          productNumber: this.customer.productList[0].productNo,
          productRmks: this.remarks,
          post: this.position,
          category: this.quality
        };

        let resultMsg = await this.sumbitSurvey(param);
        //提交.net接口
        if (resultMsg === "OK") {
          await this.changeStatus();
          //返回我的工单页面
          alert("客户满意度调查提交成功！");
          this.until.back();
        }
      } else {
        alert(this.requireMsg);
      }
    },
    async sumbitSurvey(param) {
      return new Promise(resolve => {
        this.until.postData("/prod/satis/wdit", JSON.stringify(param)).then(
          res => {
            if (res.status == "200") {
              resolve("OK");
            } else {
              alert(res.msg);
              resolve("error");
            }
          },
          err => {}
        );
      });
    },
    async changeStatus() {
      let param = {
        strGDNO: this.sRwdh
      };

      this.until
        .post("/HTWeChat/HTBills/changeWorkOrderStatisifyStatus", param)
        .then(
          res => {
            if (res.success) {
              console.log("改变400工单状态成功");
            }
          },
          err => {}
        );
    },
    getCustomerInfo() {
      var strGDNO = this.sRwdh;

      let param = {
        strGDNO
      };

      this.until.post("/HTWeChat/HTBills/HTGetCustomerInfoByGDNO", param).then(
        res => {
          if (res.success) {
            this.customer = res.data;
          }
        },
        err => {}
      );
    }
  }
};
</script>

