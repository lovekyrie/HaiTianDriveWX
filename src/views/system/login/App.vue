<style lang="less">
@bdColor: #d9d9d9;
body {
  background-color: #f5f5f5;
}

.search {
  padding: 0.6rem;
  .search-text {
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-bottom: 0.6rem;
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
  .s-btn {
    margin-top: 0.2rem;
    flex: 1;
    width: 100%;
    background-color: #004899;
    height: 0.8rem;
    font-size: 0.3rem;
    border: 0;
    border-radius: 5px;
    color: #fff;
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
        <div class="search-text"><span class="s-tit">工号：</span><input type="text" class="c-ip" placeholder="请输入员工ID"
            v-model="IDNumber">
        </div>
        <div class="search-text"><span class="s-tit">密码：</span><input type="password" class="c-ip"
            placeholder="请输入登录密码" v-model="ipassword">
        </div>
        <div>
            <button class="s-btn" @click="loginPas">绑定</button>
        </div>
    </div>
        <!--弹出窗口-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>绑定成功</span>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close">关 闭</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      dialogVisible: false,
      IDNumber: "",
      ipassword: "",
      userID: "",
      msg: ""
    };
  },
  mounted() {
    let url = window.location.href.split("?")[1];
    let code = "";
    if (url.indexOf("&") > 0) {
      let urlParamArray = url.split("&");
      for (let i = 0; i < urlParamArray.length; i++) {
        let paramerName = urlParamArray[i].split("=");
        // console.log(paramerName);
        if ("code" == paramerName[0]) {
          // return paramerName[1];
          code = paramerName[1];
        }
      }
      // console.log(urlParamArray);
    } else {
      let paramerValue = url.split("=")[1];
      // return paramerValue;
      // console.log(paramerValue);
      code = paramerValue;
    }
    let param = {
      code: code
    };
    this.until.get("/weixin/access/login", param).then(
      res => {
        // WeixinJSBridge.call("closeWindow");
        if(res.status!=='200'){
          setTimeout(() => {
             location.reload();//刷新页面
          }, 5000);
            
        }
      },
      err => {
        alert("登录失败");
        console.log(err);
        location.reload(); //刷新页面
      }
    );
    console.log(url);
  },
  methods: {
    handleClose(){

    },
    loginPas() {
      if (this.rules()) {
        let param = {
          jobNumber: this.IDNumber,
          password: this.ipassword
        }

        sessionStorage.empNo=param.jobNumber;
        console.log(sessionStorage.empNo)   
        let that = this;

        this.until.post("/weixin/login/binding", param).then(
          res => {
            console.log(res.status);
            if (res.status === "200") {
            
              if(res.message){
                if(res.message==='登录成功'){
                  that.dialogVisible = true;
                }
                else{
                  alert(res.message)
                }
              }
              else{
                 that.dialogVisible = true;
              }
              //WeixinJSBridge.call("closeWindow");
            }
            else{
              alert('用户名或密码错误，请重试！')
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        alert(this.msg);
      }
    },
    close() {
      this.dialogVisible = false;
      WeixinJSBridge.call("closeWindow");
    },
    rules() {
      // 每次操作需要重新验证，不然msg一直是上一次报错的提示信息，而且也不会在进行http请求
      this.msg='';

      if (!this.IDNumber) {
        this.msg += "请输入工号";
      } else if (!this.ipassword) {
        this.msg += "请输入密码";
      }

      if(!this.msg){
        return true;
      }
      else{
        return false;
      }
    }
  }
};
</script>

