<template>
  <div id="app">
    <div class="search-content">
      <div class="number">
        <span>
          序列号：
        </span>
        <input type="text" placeholder="序列号" v-model="serialNumber">
      </div>
      <div class="customer-name">
        <span>
          客户名称：
        </span>
        <input type="text" placeholder="请输入客户名称" v-model="customerName">
      </div>
      <div class="date-period">
        <span>
          时间区间：
        </span>
        <span>
          <yd-datetime type="date" v-model="leftTime"  :end-date="currentTime"></yd-datetime>
        </span>&nbsp;&nbsp;~&nbsp;&nbsp;
        <span>
          <yd-datetime type="date" v-model="rightTime" :end-date="currentTime"></yd-datetime>
        </span>
      </div>
      <div class="search-btn">
        <span>
        </span>
      <button :class="{active:searching}" class="query-btn" @click="queryTrigger">查询</button>
    </div>
    </div>
    
  </div>  
</template>

<script>
export default {
  props:{
    searching:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      leftTime:'',
      rightTime:'',
      currentTime:'',
      serialNumber:'',
      customerName:'',
      time:'',
    }
  },
  mounted(){

    this.time=this.until.formatDate()
    let month=this.time.month;
    let year=this.time.year;

    if(month>=6){
      month-=6;
    }
    else{
      year--;
      month=month+6;
    }

    this.leftTime=year+'-'+month+'-'+this.time.day
    this.rightTime=this.time.year+'-'+this.time.month+'-'+this.time.day
  },
  methods:{
    queryTrigger(){
      this.$emit('seachDelivery',this.serialNumber,this.customerName,this.leftTime,this.rightTime)
    }
  }
};
</script>

<style lang="less">
  #app{
    height: 100%;
    .search-content{
    
      padding: .35rem .25rem;
      .number,
      .customer-name,
      .search-btn{
        display: -webkit-flex;
        display: flex;
        flex-wrap:wrap;
        flex-direction: row;
        margin-bottom:.35rem;
        &:nth-last-of-type(1){
          margin-bottom: 0;
        }
        >span{
          display:inline-block;
          width: 30%;
          padding: .1rem 0 .1rem .15rem;
        }
        >input{
          flex: 1;
          border:1px solid #d9d9d9;
          border-radius: 3px;
          padding: .1rem 0 .1rem .15rem;
        }
        >button{
          flex: 1;
          background-color: #004899;
          text-align: center;
          color: #fff;
          padding:.15rem 0;
          border-radius: 3px;
        }
        .active{
          background-color: #ccc;
        }
      }
      .date-period{
        display: -webkit-flex;
        display: flex;
        width: 100%;
        margin-bottom: .35rem;
        span{
          display: inline-block;
          background-color: #fff;
          border: 1px solid #d9d9d9;
          vertical-align: middle;
          border-radius: 3px;
          &:nth-of-type(1){
            padding: .1rem 0 .1rem .15rem;
            display:inline-block;
            width: 30%;
            border: 0;
          }
          >.yd-datetime-input{
            flex: 2;
            text-align: center;
            height: .6rem;
            line-height:.6rem;
            font-size: .22rem;
            color: #999;
            vertical-align: middle;
            width: 2.1rem;
          }
        }
      }
    }
  }

</style>



