<style lang="less">
    @bdColor: #d9d9d9;
    body{
        background-color: #f5f5f5;
    }
    .noResult{
        text-align: center;
        color: #999;
        margin-top: 2.2rem;
    }
    .fixedBox{
        position: fixed;
        width: 100%;
        background-color: #f5f5f5;
        top: 0;
        z-index: 999;
    }
    .search{
        position: relative;
        height: .6rem;
        margin: .3rem 1.6rem .3rem .5rem;
        background-color: #fff;
        border: 1px solid @bdColor;
        border-radius: .3rem;
        padding: 0 .3rem;
        input{
            width: 100%;
            height: 100%;
            border: 0;
            font-size: .22rem;
            text-indent: .4rem;
        }
        img{
            position: absolute;
            top: .17rem;
            left: .3rem;
            width: .27rem;
            height: .26rem;
        }
        button{
            position: absolute;
            top: 0;
            right: -1.1rem;
            width: 1rem;
            line-height: .6rem;
            height: 100%;
            border-radius: .1rem;
            background-color: #004899;
            color: #fff;
        }
    }
    .timer{
        text-align: center;
        vertical-align: middle;
        margin-top: .3rem;
        span{
            display: inline-block;
            width: 2.1rem;
            height: .6rem;
            line-height:.6rem;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            vertical-align: middle;
            .yd-datetime-input{
                height: .6rem;
                line-height:.6rem;
                font-size: .22rem;
                color: #999;
                vertical-align: middle;
            }
        }
    }
</style>

<template>
    <div id="container">
        <div class="fixedBox">
            <div class="timer" @change="getPo">
                <span>
                    <yd-datetime type="date" v-model="leftTime" :callback="getPo" :end-date="currentTime"></yd-datetime>
                </span>&nbsp;&nbsp;~&nbsp;&nbsp;<span>
                 <yd-datetime type="date" v-model="rightTime" :callback="getPo" :end-date="currentTime"></yd-datetime>
            </span>
            </div>
            <div class="search">
                <img src="./img/ser.png">
                <input type="text" placeholder="搜索客户名称、工单号" v-model="userSearch" @change="getPo">
                <button @click="getPor">搜索</button>
            </div>
        </div>
        <div class="noResult" :style="{ display:show2 }">无查询结果</div>
        <div id="tempFather" v-for="(item,i) in getP" :key="item.rownumber">
            <temp :obj="obj" :mode="2" :getP="getP" :lis=i :show="show" :seaGdArr="seaGdArr" :count="2"></temp>
        </div>
    </div>
</template>

<script>
  import temp from 'components/temp'
  export default {
      data() {
          return {
              leftTime:"",
              rightTime:"",
              obj:{src:'./myOrderDetail.html?',survey:'./survey.html?'},
              getP:[],
              userSearch:"",
              mode:"",
              lis:"",
              show:"none",
              show2:"none",
              seaType:"1",
              tempLeng:"",
              seaGdArr:[],
              strID:"",
              currentTime:"",
              // rowCount:10,
              strPageCount:0,
              strPageRows:10,
              valueTime:"2018-08-08"
          }
      },
      mounted(){
          let time = this.until.formatDate();

          let month = time.month;
          let year = time.year;
          if(month-6<0){
              year--;

          }else if(month==6){
              month=12;
              year--;
          }else{
              month=month-6;
              this.leftTime = year+'-'+month+'-'+time.day;
          }
          this.leftTime = year+'-'+month+'-'+time.day;
          this.currentTime = time.year+'-'+time.month+'-'+time.day;
          // this.leftTime = time.year + '-01-01';
          this.rightTime = time.year+'-'+time.month+'-'+time.day;

          this.strID=this.until.loGet('userPk');
          var self = this;
          $(window).scroll(function(){
              console.log('##########滚动事件触发########');

              let scrollTop = $(this).scrollTop();
              let scrollHeight = $(document).height();
              let windowHeight = $(this).height();
              if(scrollTop + windowHeight >= scrollHeight-10){
                  console.log('--------滚动事件触发------------');
                  self.strPageRows = self.strPageRows + 10;
                  // self.strPageCount++;

                  console.log('当前页数：'+self.strPageCount);
                 self.getPor();
              }
          });

          if(history.length >= sessionStorage.history){
              this.leftTime = sessionStorage.myOrderDateS;
              this.rightTime = sessionStorage.myOrderDateE;
              this.userSearch = sessionStorage.myOrderGDNO;
              console.log('每页页数：'+self.strPageRows);
              console.log('搜索条件：'+this.userSearch);
          }
      },
      methods:{
          getPo(){
            // 这个函数是在搜索条件有变化时重新查询数据，
              this.tempLeng = $("#tempFather").children().length;
              this.StrPageRows = 10;
              let param = {
                  strDateS:this.leftTime,
                  StrDateE:this.rightTime,
                  strGDNO:this.userSearch,
                  StrEmpID: this.strID,
                  strType:0,
                  strPageCount:this.strPageCount,
                  StrPageRows:this.StrPageRows,
              };
              this.until.post('/HTWeChat/HTBills/HTGetMyProcessedOrderList',param)
                  .then(res =>  {
                      sessionStorage.myOrderDateS = this.leftTime;
                      sessionStorage.myOrderDateE = this.rightTime;
                      sessionStorage.myOrderGDNO = this.userSearch;
                      if (res.msg == '') {

                          this.getP = res.data;
                          this.show = "block";
                          this.show2 = "none";
                          for(let i = 0; i < this.getP.length; i++){
                              this.seaGdArr[i] = this.getP[i].任务单号;
                          }


                      }else{
                          this.show2 = "block";
                           this.getP = [];
                           this.show = "none";
                      }
                  },err => {
                      this.show = "none";
                  })
          },
          getPor(){
              // this.tempLeng = $("#tempFather").children().length;
              console.log('起始时间'+this.leftTime);
              console.log('结束时间'+this.rightTime);
              console.log('查询条件2'+this.userSearch);
              this.StrPageRows=this.StrPageRows+10;
              // this.StrPageRows=20;

              console.log('每页页数2：'+this.StrPageRows);
              console.log('员工ID：'+this.strID);

              let param = {
                  strDateS:this.leftTime,
                  StrDateE:this.rightTime,
                  strGDNO:this.userSearch,
                  StrEmpID: this.strID,
                  strType:0,
                  strPageCount:this.strPageCount,
                  StrPageRows:this.StrPageRows,
              };
              this.until.post('/HTWeChat/HTBills/HTGetMyProcessedOrderList',param)
                  .then(res =>  {
                      if (res.msg == '') {
                          // this.getP = this.getP.concat(res.data);
                          this.getP = res.data;

                          console.log(this.getP);
                          this.show = "block";
                          for(let i = 0; i < this.getP.length; i++){
                              this.seaGdArr[i] = this.getP[i].任务单号;
                          }
                          sessionStorage.myOrderDateS = this.leftTime;
                          sessionStorage.myOrderDateE = this.rightTime;
                          sessionStorage.myOrderGDNO = this.userSearch;
                          // console.log(this.leftTime);
                          // console.log( sessionStorage.myOrderGDNO );
                      }else{
                          // this.getP = [];
                          // this.show = "none";
                      }
                  },err => {
                      this.show = "none";
                  })
          },
          getRight(){
              this.getPo();
          }
          },
    components:{
      temp
    }
  }
</script>

