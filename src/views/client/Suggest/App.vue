<style lang="less">
body {
  background-color: #f5f5f5;
}

.c-textarea {
  background-color: #fff;
  margin:.25rem;
  padding: 0 0.35rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 5px;
  textarea {
    font-size: 0.24rem;
    color: #999;
  }
  .textarea-counter {
    font-size: 0.24rem;
  }
}

 .g-button{
    margin-top: .35rem;
  }
</style>

<template>
    <div id="container">
        <div class="c-textarea">
            <yd-textarea slot="right" placeholder="请输入您的意见与建议，我们尽快为您改进！" maxlength="200" v-model="strMark"></yd-textarea>
        </div>

        <div class="g-button" @click="clientRepair">
            <button>提交</button>
        </div>
    </div>
</template>

<script>
import up from "./img/up.png";
import dialogMsg from "components/dialogMsg";

export default {
  data() {
    return {
      strMark: ""
    };
  },
  methods: {
    //
    imgUp() {},

    clientRepair() {
      let param = {
        cont : this.strMark
      };
      console.log("submit");
      this.until.post("/prod/sugg/wdit", JSON.stringify(param)).then(
        res => {
         
          if (res.status===200) {
            alert("您提交的意见和建议我们已收到，谢谢您对海天集团一直以来的信任和支持！");
            WeixinJSBridge.call("closeWindow");
          }
        },
        err => {}
      );
    }
  }
};
</script>

