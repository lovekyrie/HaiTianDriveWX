<style lang="less">
html {
  height: 100%;
  width: 100%;
}

body {
  width: 100%;
  height: 100%;
  background-color: #2e3132;
}

#container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.c-img {
  width: 5.1rem;
  height: 5.3rem;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  h2 {
    font-size: 0.34rem;
    margin-top: 1.2rem;
    line-height: 1;
    color: #333;
    padding-top: 0.5rem;
  }
  img {
    margin: 0.45rem 0;
    width: 2.7rem;
    height: 2.7rem;
    vertical-align: middle;
  }
  p {
    line-height: 1;
    font-size: 0.24rem;
    color: #999;
  }
}

.kaipiao {
  color: white;
  margin: 0 auto;
  margin-top: 0.7rem;
}

.kaipiao h3 {
  text-align: center;
  margin-bottom: 0.2rem;
}

.kaipiao p {
  margin-bottom: 0.1rem;
  font-size: 0.32rem;
}

.kaipiao span {
  display: block;
  margin-bottom: 0.4rem;
  margin-left: 0.4rem;
}
</style>

<template>
    <div id="container">
        <div class="c-img">
            <h2>海天驱动售后公众号</h2>
            <img src="./img/twocode.png">
            <p>扫一扫上面的二维码，关注公众号</p>
        </div>
        <div class="kaipiao">
            <h3>各公司开票资料</h3>
            <span class="counter" v-for="(item, index) in invoiceList" :key="index">
                <p>单位名称 ：{{item.unitNm}}</p>
                <p>税     号：{{item.taxNum}}</p>
                <p>地址电话 ：{{item.adress}} {{item.phone}}</p>
                <p>开户行及账号：{{item.accountNm}} {{item.accountNum}}</p>
            </span>
        </div>
    </div>

</template>
<script>
export default {
  data() {
    return {
      pageSize: 10,
      pageCount: 1,
      invoiceList: []
    };
  },
  mounted() {
    var that = this;
    //实现手机端下拉滚动加载数据，类似pc端的分页
    $(window).scroll(function() {
      let scrollHeight = $(this).scrollTop(); //滚动距离
      let height = $(this).height(); //窗体的高度
      let actualHeight = $(document).height(); //文档的高度
      if (scrollHeight + height >= actualHeight) {
        that.pageCount++;
        that.pageSize += 10;
        that.searchInvoiceList();
      }
    });

    this.searchInvoiceList();
  },
  methods: {
    searchInvoiceList() {
      let query = new this.Query();
      let queryValue = query.buildPageClause(this.pageCount, this.pageSize);
      let param = {
        query: JSON.stringify(queryValue.queryClause)
      };

      console.log("调用方法开始");
      this.until.get("/prod/ticket/page", param).then(
        res => {
          if (res.status == 200) {
            console.log(res);
            console.log(res.data.items);
            this.invoiceList = res.data.items;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>

