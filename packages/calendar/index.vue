<template>
  <div class="bgf calendar">
    <div class="calendar_title flex-sb">
      <img @click="prev" class="_icon" src="@/assets/k12/to-left.png" />
      <span class="title_num">{{year+'年'+Number(month+1) +'月'}}</span>
      <img @click="next" class="_icon" src="@/assets/k12/to-right.png" />
    </div>
    <div class="calendar_conetent">
      <div class="_row _week  f14 c9 flex-sb">
        <span v-for="(item,index) in weeks" :key="index" class="len">{{item}}</span>
      </div>
      <div class="_row flex-row ">
        <div @click="select(item,index)" v-for="(item,index) in dayList" :key="index"  class="len">
          <div 
            :class="{
              round:item ? true : '' ,
              isSelect:selectIndex == index,
              isActive: item ? true && item.isActive : '' ,
              isThat:item.isThat,
              disabled:item.disabled
            }"
          > {{item.name}} </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toThousandFilter } from '@/filters';
import dataNothingVue from '@/components/dataNothing.vue';
export default {
  name: "calendar",
  props: {
    dataList: {
      type: [Object,Array],
      default() {
        return []
      },
    },
  },
  data() {
    return {
      scroll: null,
      weeks:['日','一','二','三','四','五','六'],
			month_olympic:[31,29,31,30,31,30,31,31,30,31,30,31], // 闰月
		  month_normal:[31,28,31,30,31,30,31,31,30,31,30,31],  //平月
      date:'',
      month:"",  
      year:"",
      weekIndex:0, // 从周几开始 次数为下标
      dayList:[],
      selectIndex:null,
      isrun:false
    };
  },
  mounted() {
    this.monthAndYear(); //获取年月日
    this.setRun(this.year);
    this.createdDay('next');
  },

  methods: {
    /**
     * data [ Array,Object ] 主动接受参数
     * 
     * 每次创建完成date数据之后会自动调用 此函数对props数据进行格式化
     * 也可以在回调中通过ref自行调用 ref权限最高
     */
    init(data){

      let dataList = this.dataList
      
      if( data ) dataList = data  ;

      // console.log(dataList,'dataList')

      // // 将数组主动转化为键值对象
      // if( dataList instanceof 'array' ){
      //   console.error('the argumentsType must Object! ')
      // }

      for (let i = 0; i < this.dayList.length; i++) {
        let element = this.dayList[i];
        // 过滤上下月 根据 对象的key值 获取对应天数的相关参数
        if(!element.disabled){
          element.isActive = dataList[element.name]
        }
      }

    },
    // 创建当月天数
    createdDay(point) {
      this.selectIndex = null
      // 获取当年的这个月天数 
      let dateArr = this.getMonthDateNum(this.year,this.month,point);
      
      // 获取上个月的结束月的长度
      let lastMonthArr = this.getMonthDateNum(this.year,this.month - 1,point);
      
      // 获取本月开始是周几
      let monthIndex = this.getLastMounthOverNum(this.month,point);

      // 获取下月开始时周几
      let nextMonthIndex = this.getLastMounthOverNum(this.month + 1,point);
      
      let num = monthIndex
      this.dayList = []
      
      //填补上月天数
      for (let i = lastMonthArr+1 - monthIndex ; i < lastMonthArr+1; i++) {
        this.dayList.push({name:i,disabled:true})
      }

      // 填补本月天数
      for (let i = 1; i < dateArr+1; i++) {
        this.dayList.push({
          name:i,
          select:0, // 1 选择 0 未选择
          isActive:0,// 1 : 0
          isThat:this.isThat(i)
        })
      }
 
      // 填补下月天数
      let nextNum = 7 - nextMonthIndex
      for (let i = 1; i < nextNum+1; i++) {
        this.dayList.push({name:i,disabled:true})
      }
      
      // 渲染绑定的数据
      this.init();
    },  
    prev(){
      let date = this.zeroPoint(this.year,--this.month,'prev')
      this.year = date.year
      this.month = date.month
      this.createdDay('prev');
      this.$emit('prev',{
        year:this.year,
        month:this.month
      })
    },
    next(){
      let date = this.zeroPoint(this.year,++this.month,'next')
      this.year = date.year
      this.month = date.month
      this.createdDay('next');
      this.$emit('next',{
        year:this.year,
        month:this.month
      })
    },
    select(item,index){
      if(item.disabled) return ;
      
      if(item){
        this.selectIndex = index
        this.$emit('change',{
          year:this.year,
          month:this.month,
          ...item
        })
      }
    },
    setRun(year){
      if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
       return true ; 
      }else{
       return false ;
      }
    },
    isThat(num){
      var date = new Date();
      var year = date.getFullYear();
      var  month = date.getMonth();
      var day = date.getDate();
      return year == this.year && month == this.month && day == num
    },
    // 计算零界点
    zeroPoint(year,month,point){
      let arr = []
      if(point == 'next'){
        arr[0] = month > 11 ? year + 1 : year
        arr[1] = month > 11 ? 0 :  ( month < 0 ? 0 : month )
      }
      if(point == 'prev'){
        arr[0] = month < 0 ? year - 1 : year
        arr[1] = month < 0 ? 11 :  ( month > 11 ? 11 : month )
      }
      return {
        year:arr[0],
        month:arr[1]
      } 
    },
    //获取月开始是周几
    getLastMounthOverNum(month ,point){
      let date = this.zeroPoint(this.year,month,point)
      this.weekIndex = new Date(this.year, month, 1).getDay();
      return this.weekIndex
    },
    // 获取天数 
    getMonthDateNum(year,month,point){
      let date = this.zeroPoint(this.year,month,point)
      let isrun = this.setRun(date.year)
      let monthArr = isrun ?  this.month_olympic : this.month_normal
      return monthArr[date.month]
    },
    // 获取年月
    monthAndYear: function () {
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
    },
  },
};
</script>
<style lang="less" scoped>

.calendar{
  padding: 20px 15px;
  padding-bottom: 0px;
  //日历组件
  .calendar_title{
    ._icon{
      width: 24px;
      height: 24px;
    }
    .title_num{
      font-size: 16px;
      color: #E60039;
      font-weight: bold;
    }
  }
  .calendar_conetent{
    padding: 20px 0px;
    ._week{
      .len{
        color: #999;
        width: calc( 100% / 7);
        margin: 0px;
      }
    }
    .len{
      width: calc( 100% / 7);
      text-align: center;
      display: inline-block;
      color: #666;
      .round{
        display: inline-block;
        height: 32px;
        min-width: 32px;
        max-width: 32px;
        font-size: 14px;
        line-height: 32px;
        border-radius: 50%;
        margin-top: 10px;
      }
    }
    .isSelect{
      color: #fff;
      border-radius: 100%;
      background-color: #F2577D;
    }
    .isThat{
      color: #fff;
      border-radius: 100%;
      background: linear-gradient(48deg, #E60039 0%, #F2577D 100%);
    }
    .disabled{
      opacity: 0.5;
    }
    .isActive{
      position: relative;
      &::after{
        position: absolute;
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color:#E60039;
        bottom: 0px;
        left: 50%;
        margin-left: -2px;
      }
    }
  }
}
</style>