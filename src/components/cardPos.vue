<style lang="less" scoped>
.c-pos {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.45rem;
    background-color: #fff;
    .p-tit {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.3rem;
      border-bottom: 1px solid #d9d9d9;
    }
    .p-cnt {
      padding: 0.35rem;
      font-size: 0.24rem;
      > p {
        line-height: 1;
        margin-bottom: 0.3rem;
        span {
          display: inline-block;
          width: 1.5rem;
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
      .c-ta {
        position: relative;
        padding-left: 1.5rem;
        > span {
          position: absolute;
          top: 0;
          left: 0;
          vertical-align: top;
        }
        textarea,
        button {
          width: 100%;
          height: 1.4rem;
          border: 1px solid #d9d9d9;
          display: inline-block;
          padding: 0.1rem;
          font-size: 0.24rem;
        }
        button {
          height: 0.8rem;
          background-color: #fff;
          font-size: 0.24rem;
          color: #666;
        }
      }
    }
  }
}
</style>

<template>
  <div id="temp" v-show="isShow">
    <div class="c-pos" @click="cancel">
      <div @click.stop>
        <div class="p-tit">{{state}}</div>
        <div class="p-cnt">
          <p v-show="type == 2">
            <span>工作状态：</span>
            {{info.state}}
          </p>
          <p>
            <span>打卡时间：</span>
            {{info.time}}
          </p>
          <p class="c-p">
            <span>打卡地点：</span>
            <img src="./img/pos.png">
            {{info.addressArr}}
          </p>
          <p class="c-ta">
            <span>备注：</span>
            <textarea v-model="info.rmks"></textarea>
          </p>
          <p class="c-ta">
            <button @click="confirmtBtn">确定</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      defalut: 0
    },
    state: {
      type: String,
      requried: true
    }
  },
  data() {
    return {
      info: {
        type: 0,
        time: "",
        addressArr: "",
        rmks: "",
        state: [],
        cardType: ""
      },
      isShow: false,
      location: ""
    };
  },
  watch: {
    value(val) {
      this.isShow = val;
    },
    isShow(val) {
      this.$emit("input", val);
    },
    type(val) {
      this.info.type = val;
    },
    state(val) {
      this.info.state = val;
    }
  },
  mounted() {
    var time = this.until.formatDate();
    this.info.time = time.hour + ":" + time.minite;

    let geolocation = new qq.maps.Geolocation(
      "YOIBZ-PPXWF-RB2JB-JXJTU-M6T62-6LB3Z",
      "haiTianDrive"
    );

    geolocation.getLocation(sucCallback, showErr, options);
    var options = { timeout: 8000 };

    var self = this;
    function sucCallback(position) {
      var mapInfo = JSON.stringify(position, null, 4);
      var jsonMapInfo = JSON.parse(mapInfo);
      // alert("腾讯经度为:"+jsonMapInfo.lng+",腾讯纬度为:"+jsonMapInfo.lat);
      self.info.addressArr = jsonMapInfo.addr;
    }

    console.log(this.info.addressArr);
    function showErr() {
      alert("定位失败");
    }

    // this.run();
  },
  methods: {
    confirmtBtn() {
      this.$emit("data", this.info);
      this.cancel();
    },
    cancel() {
      this.isShow = false;
    },
    /*异步运行*/
    async run() {
      let location = await this.getPosition();

      let address = await this.txMap(this.location);
      if (address) {
        this.info.addressArr = address.result.pois[0].title;
      }
    },
    /*获取地理定位*/
    getPosition() {
      return new Promise(resolve => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              var lat = position.coords.latitude; //纬度
              var lag = position.coords.longitude; //经度
              var location = lat + "," + lag;
              resolve(location);
            },
            error => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  alert("定位失败,用户拒绝请求地理定位");
                  break;
                case error.POSITION_UNAVAILABLE:
                  alert("定位失败,位置信息是不可用");
                  break;
                case error.TIMEOUT:
                  alert("定位失败,请求获取用户位置超时");
                  break;
                case error.UNKNOWN_ERROR:
                  alert("定位失败,定位系统失效");
                  break;
              }
            }
          );
        } else {
          alert("浏览器不支持地理定位。");
        }
      });
    },
    /*腾讯地图*/
    txMap(location) {
      return new Promise(resolve => {
        var data = {
          location,
          key: "YOIBZ-PPXWF-RB2JB-JXJTU-M6T62-6LB3Z",
          get_poi: 1
        };
        var url = "http://apis.map.qq.com/ws/geocoder/v1/?";
        data.output = "jsonp";
        $.ajax({
          type: "get",
          dataType: "jsonp",
          data: data,
          jsonp: "callback",
          jsonpCallback: "QQmap",
          url: url,
          success: function(json) {
            resolve(json);
          },
          error: function(err) {
            alert("服务端错误，请刷新浏览器后重试");
          }
        });
      });
    }
  }
};
</script>