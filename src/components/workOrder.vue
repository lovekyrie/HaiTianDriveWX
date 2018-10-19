<template>
 <div id="app">
   <div class="wrap" v-for="(item) in pengdingList" :key="item.rowWrap">
     <div>
       <span>人员姓名：</span>
       <span>
         {{item.repairName}}
       </span>
     </div>
     <div class="item-order" v-if="item.repairPendingList.length" v-for="(itemOrder) in item.repairPendingList" :key="itemOrder.rownumber">
       <div>
         <span>工单号：</span>
         <span>{{itemOrder.任务单号}}</span>
       </div>
       <div>
         <span>客户名称：</span>
         <span>{{itemOrder.客户名称}}</span>
       </div>
       <div>
         <span>工作事项：</span>
         <span>{{itemOrder.故障描述}}</span>
       </div>
     </div>
     <div class="no-order" v-if="!item.repairPendingList.length">
       <span>
         待命
       </span>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  props: ["pengdingList"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
#app {
  background-color: #f5f5f5;
  .wrap {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: .2rem;
    background-color: #fff;
    > div {
      width: 100%;
      padding: .2rem 0 .2rem 0.3rem;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap: wrap;
      border-bottom: 1px solid #d9d9d9;
      &:not(:nth-of-type(1)):not(:nth-last-of-type(1)){
        padding-left:0;
        margin-left: .3rem;
      }
      > span {
        display: inline-block;
        &::nth-of-type(1) {
          width: 30%;
        }
        &::nth-of-type(2) {
          width: 70%;
        }
      }
    }
    .item-order {
      > div {
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        line-height: 1.5;
        > span {
          display: inline-block;
          &::nth-of-type(1) {
            width: 30%;
          }
          &::nth-of-type(2) {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>

