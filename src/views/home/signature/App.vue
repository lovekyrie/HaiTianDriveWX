<style lang="less">
    body {
        background-color: #f5f5f5;
    }

    #signature {
        border: double 3px transparent;
        border-radius: 5px;
        background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #4bc5e8, #9f6274);
        background-origin: border-box;
        background-clip: content-box, border-box;
    }

    .row{
      div{
        &:nth-of-type(2),
        &:nth-of-type(3){
          width: 50%;
          float: left;
        }
        >button{
          box-sizing: border-box;
          height: 30px;
          width: 100%;
          border-radius: 5px;
          margin-top: 5px;
          padding: 5px;
          border:1px solid #d9d9d9;
          background-color: #004899;
          color: #fff;
        }
      }
     
    }
</style>

<template>
   <div id="app">
    <div class="container">
      <div class="row">
        <div>
          <VueSignaturePad
            id="signature"
            width="100%"
            height="400px"
            ref="signaturePad"
            saveType="image/png"
          />
        </div>
        <div class="leftBtn">
          <button
            class="btn btn-outline-secondary float-right"
            @click="undo"
          >
            撤销
          </button>
        </div>
        <div class="right">
          <button
            class="btn btn-outline-primary float-left"
            @click="save"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

    export default {
        name: 'App',
        mounted(){
           // this.abc();
        },
        methods: {
            undo(){
                this.$refs.signaturePad.undoSignature();
            },
            save(){
                const {isEmpty,data}=this.$refs.signaturePad.saveSignature();
                console.log(data);
                //跳转回满意度调查页面
                //存储用户签字，返回给调查页面使用
                let paramValue = window.location.href.split("=")[1];
                this.until.loSave(paramValue+'custSign',data);
                alert('签名成功！');
                // 返回上一页，不刷新页面
                window.history.back();
            }
        }
    }
</script>

