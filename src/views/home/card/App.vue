<style lang="less">
body,
html {
  height: 100%;
  background-color: #f5f5f5;
}

#container {
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.card {
  padding: 0.6rem;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  .c-cont {
    border-left: 0.01rem solid #bcbcbc;
    position: relative;
    padding-left: 0.35rem;
    i {
      position: absolute;
      left: -0.1rem;
      border: 0.1rem solid #004899;
      border-radius: 50%;
      &:nth-of-type(1) {
        top: -0.1rem;
      }
      &:nth-of-type(2) {
        bottom: -0.1rem;
      }
    }
    > p {
      position: absolute;
      width: 100%;
      left: 0;
      padding-left: 0.35rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.24rem;
      color: #666;
      vertical-align: middle;
      &:nth-of-type(1) {
        top: -0.2rem;
      }
      &:nth-of-type(2) {
        bottom: -0.2rem;
      }
    }
  }
}

.card-btn {
  padding: 0.4rem 0;
  overflow: hidden;
  button {
    display: block;
    margin: 0.8rem auto;
    width: 2.22rem;
    height: 2.22rem;
    background-color: #004899;
    border-radius: 50%;
    color: #fff;
  }
}

.time-ri {
  position: relative;
  float: right;
  display: inline-block;
  padding-left: 0.37rem;
  background: url("./img/ri.png") 0 0.04rem no-repeat;
  background-size: 0.32rem 0.32rem;
  overflow: hidden;
  height: 0.4rem;
  line-height: 0.4rem;
  .c-timer {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
}

.c-client {
  margin-top: 0.2rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  .cl-se {
    font-size: 0;
    text-align: center;
    margin-top: 0.35rem;
    span {
      font-size: 0.24rem;
    }
    > p {
      position: relative;
      display: inline-block;
      select {
        width: 3.7rem;
        height: 0.6rem;
        border-radius: 5px;
        text-indent: 0.3rem;
        font-size: 0.24rem;
        option {
          text-indent: 0.3rem;
        }
      }
      svg {
        position: absolute;
        right: 0.15rem;
        top: 0.15rem;
        font-size: 0.3rem;
        color: #666;
      }
    }
  }
}

.p-cnt {
  font-size: 0.24rem;
  > p {
    line-height: 1;
    margin-bottom: 0.3rem;
  }
}

.c-p {
  img {
    width: 0.25rem;
    height: 0.33rem;
    vertical-align: baseline;
    margin-right: 0.1rem;
  }
}

.c-cd {
  display: inline-block;
  color: red;
  border: 1px solid red;
  border-radius: 3px;
  padding: 0.02rem 0.05rem;
}

.c-pi {
  padding-left: 0.35rem;
}

.client-cnt {
  padding-left: 0.95rem;
  border-top: 1px solid #d9d9d9;
}
</style>

<template>
    <div id="container">
        <div class="card">
            <div class="c-cont">
                <i></i><i></i>
                <p>上班时间: {{workStartTime}}<span class="time-ri">{{startTime}}
                    <yd-datetime type="date" :start-date="currentTime" v-model="startTime"
                                 class="c-timer"></yd-datetime>
                </span>
                </p>
                <div class="p-cnt card-btn" v-show="showStart">
                    <p><span>打卡时间：</span>{{workOn.crtTm}}</p>
                    <p class="c-p"><span>打卡地点：</span><img src="./img/pos.png">{{workOn.cardLocation}}</p>
                    <p><span>备注：</span>{{workOn.rmks}}</p>
                    <p class="c-cd">{{workOn.determine}}</p>
                </div>
                <div class="p-cnt card-btn" v-show="!startCradState && !showStart">
                    <p><span>打卡时间：</span>{{startwork.time}}</p>
                    <p class="c-p"><span>打卡地点：</span><img src="./img/pos.png">{{startwork.addressArr}}</p>
                    <p><span>备注：</span>{{startwork.rmks}}</p>
                    <p class="c-cd" v-show="isLate(startwork.time,true)">迟到</p>
                </div>
                <div class="card-btn" v-show="startCradState">
                    <button @click="openCardPos(0)">上班打卡</button>
                </div>
                <p>下班时间：{{workEndTime}}</p>
            </div>
            <div>
                <div class="p-cnt card-btn c-pi" v-show="showEnd">
                    <p><span>打卡时间：</span>{{workOff.crtTm}}</p>
                    <p class="c-p"><span>打卡地点：</span><img src="./img/pos.png">{{workOff.cardLocation}}</p>
                    <p><span>备注：</span>{{workOff.rmks}}</p>
                    <p class="c-cd">{{workOff.determine}}</p>
                </div>
                <div class="p-cnt card-btn c-pi" v-show="!endCradState&&JSON.stringify(endwork)!='{}'&& !showEnd">
                    <p><span>打卡时间：</span>{{endwork.time}}</p>
                    <p class="c-p"><span>打卡地点：</span><img src="./img/pos.png">{{endwork.addressArr}}</p>
                    <p><span>备注：</span>{{endwork.rmks}}</p>
                    <p class="c-cd" v-show="isLate(endwork.time,false)">早退</p>
                </div>
                <div class="card-btn" v-show="endCradState">
                    <button @click="openCardPos(1)">下班打卡</button>
                </div>
            </div>
        </div>

        <div class="c-client">
            <div class="card-btn">
                <div class="cl-se">
                    <span>客户现场打卡&nbsp;&nbsp;</span>
                    <p>
                        <select v-model="workState" @change="disaOpt">
                            <option value="" disabled selected hidden>请选择</option>
                            <option :value="opt.state" v-for="(opt,i) in selectArr" :key="i" :disabled="isAble">
                                {{opt.state}}
                            </option>
                        </select>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiala"></use>
                        </svg>
                    </p>
                </div>
                <button @click="openCardPos(2)">打卡</button>
            </div>
            <div v-show="clientwork.length && cardType===2">
                <div class="client-cnt p-cnt card-btn" v-for="(item,i) in clientwork" :key="i">
                    <p><span>工作状态：</span>{{item.state}}</p>
                    <p><span>打卡时间：</span>{{item.time}}</p>
                    <p class="c-p"><span>打卡地点：</span><img src="./img/pos.png">{{item.addressArr}}</p>
                    <p><span>备注：</span>{{item.rmks}}</p>
                </div>
            </div>
            <div v-show="customerCard.length">
                <div class="client-cnt p-cnt card-btn" v-for="(item,i) in customerCard" :key="i">
                    <p><span>工作状态：</span>{{item.punchCardType}}</p>
                    <p><span>打卡时间：</span>{{item.punchTime}}</p>
                    <p class="c-p"><span>打卡地点：</span><img src="./img/pos.png">{{item.cardLocation}}</p>
                    <p><span>备注：</span>{{item.rmks}}</p>
                </div>
            </div>

        </div>

        <cardPos :type="cardType" :state="workState" v-model="isShow" @data="getCardInfo" :selectArr="selectArr"></cardPos>
    </div>
</template>

<script>
import cardPos from "components/cardPos.vue";

export default {
  data() {
    return {
      showStart: false,
      showEnd: false,
      workOn: {},
      workOff:{},
      customerCard: [],
      workStartTime: "8:00",
      workEndTime: "17:00",
      isShow: false,
      /*默认时间*/
      currentTime: "",
      startTime: "",
      /*0：上班 1:下班 2：打卡*/
      cardType: 0,
      /*上班信息*/
      startCradState: true,
      startwork: {},
      endCradState: true,
      endwork: {},
      clientwork: [],
      selectArr: [
        { state: "出发" },
        { state: "到达" },
        { state: "返回" }
      ],
      workState: "",
      openCard: "",
      strID: "",
      strName:'',
      addressArr: "",
      rmks: "",
      isAble: false
    };
  },
  mounted() {
    this.endCradState = !this.startCradState;
    this.strID = this.until.loGet('userPk');
    if(!this.strID){
        window.location.href="index.html";
    }
    
    /*获取当前时间年月日*/
    let time = this.until.formatDate();
    this.currentTime = time.year + "-" + time.month + "-" + time.day;
    this.workState = this.selectArr[0].state;
    this.getWorkTime(); //工作时间获取
    this.getRepairName();
    this.getCardList(); //当天考勤打卡记录获取
  },
  methods: {
    /*召唤打卡定位界面*/
    openCardPos(cardType) {
      this.cardType = cardType;
      this.isShow = true;
      if(cardType===0){
        this.workState='上班'
      }
      else if(cardType===1){
        this.workState='下班'
      }
    },
    //当日打卡数据获取（上下班及现场考勤）
    getCardList() {
      let param = {
        punchNmPk: this.strID
      };
      this.until.get("/prod/card/getCard", param).then(
        res => {
          let arr=res.data.filter(item=>item);
          let cardArr=arr[0];
          cardArr.forEach(item=>{
            let cardInfo=item.fieldCardVo;
            console.log(cardInfo)
            if(cardInfo.punchCardType==='上班'){
              this.workOn=cardInfo;
              this.showStart = true;
              this.startCradState = false;
              this.endCradState=true;
            }
            else if(cardInfo.punchCardType==='下班'){
              this.workOff=cardInfo;
              this.showEnd = true;
              this.endCradState = false;
              this.startCradState=true;
            }
            else{
              this.customerCard.push(cardInfo)
            }
          })
          // if (res.data[0] != null) {
          //   //判断是否有上下班打卡记录
          //   this.work = res.data[0].cardAttendanceVo;
          //   console.log(this.work.workShiftTime);
          //   if (this.work.workShiftTime != null) {
          //     //是否有上班打卡记录
          //     this.showStart = true;
          //     this.startCradState = false;
          //   } else {
          //     this.showStart = false;
          //     this.startCradState = true;
          //     console.log("------------1234567890");
          //   }

          //   if (this.work.closingTime != null) {
          //     this.showEnd = true;
          //     this.endCradState = false;
          //   } else if (this.startCradState) {
          //     console.log("1234567890");
          //     this.endCradState = false;
          //   } else {
          //     this.endCradState = true;
          //   }
          // } else {
          //   //没有上下班打卡记录则显示上班打卡，下班打卡隐藏
          //   this.startCradState = true;
          //   this.endCradState = false;
          // }
          // if (res.data[1] != null) {
          //   this.customerCard = res.data[1];
          // }
        },
        err => {
          console.log("获取打卡记录出错");
          console.log(err);
        }
      );
    },
    //上下班时间获取
    getWorkTime() {
      let param = {
        query: ""
      };
      this.until.get("/prod/time/list", param).then(
        res => {
          this.workStartTime = res.data.items[0].workShiftTime.split(" ")[1];
          this.workEndTime = res.data.items[0].closingTime.split(" ")[1];
        },
        err => {
          console.log("获取打卡记录出错");
          console.log(err);
        }
      );
    },
    /*获取弹框信息*/
    getCardInfo(val) {
      switch (val.type) {
        case 0:
          this.startwork = val;
          this.startCradState = false;
          this.endCradState = true;
          break;
        case 1:
          this.endwork = val;
          this.endCradState = false;
          break;
      }
        this.rmks = val.rmks;
        this.addressArr = val.addressArr;
        let strVal = JSON.stringify(val);
        this.clientwork.push(JSON.parse(strVal));
        this.toCustomerCard();
    },
    /*判断是否迟到早退*/
    isLate(time, bool) {
      let tiem = bool ? this.workStartTime : this.workEndTime;
      let result =
        new Date("2017-1-1 " + tiem) < new Date("2017-1-1 " + time)
          ? true
          : false;
      return bool ? result : !result;
    },
    disaOpt() {
      console.log(this.selectArr);
      if (this.selectArr == this.clientwork[0]) {
        this.isAble = true;
      }
    },

    //上下班存储数据接口
    toCard() {
      console.log(this.addressArr);
      console.log(this.strID);

      let param = {
        cardLocation: this.addressArr,
        punchNmPk: this.strID,
        rmks: this.rmks,
        punchNm: sessionStorage.name
      };
      this.until.postCard("/prod/card/wdit", JSON.stringify(param)).then(
        res => {
          console.log("then");
          console.log(res);
        },
        err => {
          console.log("失败");
          console.log(err);
        }
      );
    },
    //售后维修打卡数据存储
    toCustomerCard() {
      let param = {
        cardLocation: this.addressArr,
        punchNmPk: this.strID,
        punchNm: this.strName,
        rmks: this.rmks,
        punchCardType: this.clientwork[0].state
      };
      this.until
        .postCard("/prod/field/wdit", JSON.stringify(param))
        .then(
          res => {
            console.log(res);
          },
          err => {
            console.log( err);
          }
        );
    },
    getRepairName(){
      let param={
        repairNo:this.strID
      }
      this.until.post('/HTWeChat/HTBills/GetQualifiedWorkerByNo',param).then(
        res=>{
          if(!res.msg){
            this.strName=res.data.repairName;
            console.log(this.strName)
          }
        },
        err=>{}
      )
    }
  },
  components: { cardPos }
};
</script>

