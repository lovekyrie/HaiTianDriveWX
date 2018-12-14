<style lang="less">
body,
.yd-tab-panel {
  background-color: #f5f5f5;
}

.yd-tab-panel {
  margin-top: 0.2rem;
  border-top: 1px solid #d9d9d9;
}

.temp-war {
  position: relative;
  padding-left: 0.2rem;
  h3 {
    font-weight: normal;
    span {
      float: right;
      padding-right: 0.6rem;
      color: #999;
    }
  }
  p {
    margin-top: 0.2rem;
    padding-right: 0.6rem;
    color: #999;
  }
  i {
    position: absolute;
    top: 50%;
    left: -0.05rem;
    transform: translateY(-50%);
    display: inline-block;
    width: 0.12rem;
    height: 0.12rem;
    background-color: red;
    border-radius: 50%;
  }
}
</style>

<template>
  <div id="container" ref="scroll">
    <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
      <yd-tab-panel label="公司公告">
        <tempApp
          :obj="obj"
          :seaGd="item.noticePk"
          v-for="(item, index) in announceList"
          :key="index"
        >
          <div slot="content" class="temp-war">
            <h3>
              {{item.bulletinTitle}}
              <span>{{item.bulletinTm | toFormat}}</span>
            </h3>
            <p class="ell">{{item.bulletinNm}}</p>
            <i></i>
          </div>
        </tempApp>
      </yd-tab-panel>
    </yd-tab>
  </div>
</template>

<script>
import tempApp from "components/tempApp.vue";
export default {
  data() {
    return {
      tab2: 0,
      obj: {
        src: "./msgCnt.html?"
      },
      pageSize: 10,
      pageCount: 1,
      total: 0,
      announceList: [],
      remindNoticeList: [],
      searching: false,
      hasMore: true
    };
  },
  filters: {
    toFormat(input) {
      let first = input.slice(-8);
      return first.substring(0, 5);
    }
  },
  mounted() {
    
    window.addEventListener('scroll',this.scrollLoad,false)
    this.searchAnnounce();
  },
  methods: {
    scrollLoad() {
      clearTimeout(this.timer);
      let timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.pageSize += 5;
          this.searchAnnounce();
        }
      }, 500);
    },
    fn(label, key) {
      console.log(label, key);
    },
    itemClick(key) {
      console.log(key);
      this.tab2 = key;
    },
    searchAnnounce() {
      if (this.hasMore && !this.searching) {
        let query = new this.Query();
        query.buildPageClause(this.pageCount, this.pageSize);
        let param = query.getParam();

        console.log("调用方法开始");
        this.searching = true;
        this.until.get("/prod/tice/page", param).then(
          res => {
            if (res.status == 200) {
              this.announceList = res.data.items;
              this.total = res.page.total;

              if (this.pageSize > this.total) {
                this.hasMore = false;
              } else {
                this.hasMore = true;
              }
            }
            this.searching = false;
          },
          err => {
            this.searching = false;
          }
        );
      }
    }
  },
  components: {
    tempApp
  }
};
</script>

