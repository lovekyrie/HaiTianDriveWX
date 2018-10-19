<template>
  <div id="app">
    <div class="header">
      <search-info @seachDelivery="searchQuoteInfoList"></search-info>
    </div>
    <div class="content" v-show="!flag" v-for="(item) in quoteInfoList" :key="item.prodMaintenancePk">
      <div class="customer-name">
        <span>
          客户名称：
        </span>
        <span>
          {{item.customer}}
        </span>
      </div>
      <div class="date">
        <span>
          日期：
        </span>
        <span>
          {{item.tm}}
        </span>
      </div>
      <div class="material-no">
         <span>
           物料号：
        </span>
        <span>
          {{item.materialNumber}}
        </span>
      </div>
      <div class="number">
         <span>
           序列号：
        </span>
        <span>
          {{item.serialNumber}}
        </span>
      </div>
      <div class="description">
         <span>
           描述：
        </span>
        <span>
          {{item.describe}}
        </span>
      </div>
      <div class="remit-money">
        <span>
          汇款情况：
        </span>
        <span>
          {{item.remittance}}
        </span>
      </div>  
      <div class="pro-name">
         <span>
           产品名称：
        </span>
        <span>
          {{item.wordNm}}
        </span>
      </div>
    </div>
    <div class="noResult" v-show="flag">
      <span>
        查询无结果
      </span>
    </div>
  </div>
</template>

<script>
import searchInfo from 'components/searchInfo'

export default {
  data(){
    return {
      serialNumber:'',
      customerName:'',
      leftTime:'',
      rightTime:'',
      pageCount:1,
      pageSize:10,
      quoteInfoList:[],
      flag:false,
    }
  },
  mounted(){
    
    let self=this;
    //往下滑动事件触发
    $(window).scroll(function(){
      let scrollTop=$(this).scrollTop()
      let scrollHeight=$(document).height()
      let windowHeight=$(this).height()
      if(scrollTop+windowHeight==scrollHeight){
        self.pageSize+=10
        self.searchQuoteInfoList(self.serialNumber,self.customerName,self.leftTime,self.rightTime)
      }
    })
  },
  methods:{
    searchQuoteInfoList(serial,customer,leftTime,rightTime){
      this.serialNumber=serial;
      this.customerName=customer;
      this.leftTime=leftTime
      this.rightTime=rightTime

      let query=new this.Query()
      query.buildWhereClause('SERIAL_NUMBER',this.serialNumber,'LK')
      query.buildWhereClause('CUSTOMER',this.customerName,'LK')
      // query.buildWhereClause('TM',this.leftTime,'GT')
      // query.buildWhereClause('TM',this.rightTime,'LT')

      query.buildPageClause(this.pageCount,this.pageSize)

      let param={
        query:query.toString()
      }

      this.until.get('/weixin/main/page',param).then(
        res=>{
          if(res.status=='200'){
            console.log('调用成功')
            this.quoteInfoList=res.data.items;
            if(this.quoteInfoList.length){
              this.flag=false;
            }
            else{
              this.flag=true;
            }
          }
        },
        err=>{
          console.log(err)
        }
      )
    }
  },
  components:{
    searchInfo,
  }
}
</script>

<style lang="less">
  html,
  body{
    height: 100%;
    background-color: #d9d9d9;
    #app{
      height: 100%;
      .header{
        background-color: #fff;
      }
      .content{
        margin-top: .2rem;
        padding: .2rem .25rem;
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        >div{
          width: 100%;
          line-height: 1.5;
          padding: .1rem 0;
          >span{
            display: inline-block;
            width: 30%;
            text-align: left;
            vertical-align: top;
            &:nth-of-type(2){
              width: 65%;
            }
          }
        }
      }
      .noResult{
        padding-top: 1rem;
        text-align: center;
      }
    }
  }
</style>
