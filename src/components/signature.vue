<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div>
          <VueSignaturePad
            id="signature"
            width="345px"
            height="400px"
            ref="signaturePad"
            saveType="image/png"
          />
        </div>
        <div class="leftBtn">
          <button class="btn btn-outline-secondary float-right" @click="undo">撤销</button>
        </div>
        <div class="right">
          <button class="btn btn-outline-primary float-left" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import init from "assets/js/init.js";
import VueSignature from "vue-signature-pad";

Vue.use(init);
Vue.use(VueSignature);
export default {
  name: "App",
  mounted() {
    // this.abc();
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      alert("签名成功！");
      this.$emit("saveSign", data);
    }
  }
};
</script>

<style lang="less">
#app {
  #signature {
    border: double 3px transparent;
    border-radius: 5px;
    background-image: linear-gradient(white, white),
      radial-gradient(circle at top left, #4bc5e8, #9f6274);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  .row {
    div {
      &:nth-of-type(2),
      &:nth-of-type(3) {
        width: 50%;
        float: left;
      }
      > button {
        box-sizing: border-box;
        height: 30px;
        width: 100%;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        border: 1px solid #d9d9d9;
        background-color: #004899;
        color: #fff;
      }
    }
  }
}
</style>
