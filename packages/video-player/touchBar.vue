<template>
  <div @click="clickBar" :id="proWarpId" class="progressWarp">
    <div :style="{width:wProgress + '%' }"  class="progressBar"></div>
    <div :style="{
      left:'calc('+progress+'% - '+point/2+'px)',
      height:point + 'px',
      width:point + 'px'
    }" ref="progressPoint" class="progressPoint"></div>
  </div>
</template>

<script>
export default {
  name: "touchBar",
  props: {
    point:{
      type:Number,
      default:12
    },
    value:{
      type:[Number,String],
      default:0
    }
  },
  data() {
    return {
      proWarpId:'progressWarp',
      isDragging: false,
      progress:0,
      wProgress:0,
    };
  },
  created(){
    this.proWarpId = 'progressWarp'+ new Date().getTime()
  },
  mounted(){
    // this.progress = this.value  
    this.initProgressBarDrag();
  },
  watch:{
    value(val){
      this.resPoint(val)
    }
  },
  computed: {},
  methods: {
    offSet(curEle) {
      var totalLeft = null;
      var totalTop = null;
      var par = curEle.offsetParent;
      //首先把自己本身的相加
      totalLeft += curEle.offsetLeft;
      totalTop += curEle.offsetTop;
      //现在开始一级一级往上查找，只要没有遇到body，我们就把父级参照物的边框和偏移相加
      while (par){
          if (navigator.userAgent.indexOf("MSIE 8.0") === -1){
        //不是IE8我们才进行累加父级参照物的边框
        totalTop += par.clientTop;
        totalLeft += par.clientLeft;
          }
          //把父级参照物的偏移相加
          totalTop += par.offsetTop;
          totalLeft += par.offsetLeft;
          par = par.offsetParent;
      }
      return {left: totalLeft,top: totalTop};
      //返回一个数组，方便我们使用哦。
    },
    resPoint(val){
      let wapWidth = document.getElementById(this.proWarpId).offsetWidth
      let pointProgress =  this.point / wapWidth * 100
      if (val < 0) { 
        this.progress = this.wProgress = 0; 
        return; 
      }
      // 超出右边
      if (val == 100) { 
        this.wProgress = 100 - pointProgress/2 ; 
        this.progress = 100
        return; 
      }
      this.progress = this.wProgress = val; 
    },
    // 
    clickBar(e){
      let elwap = document.getElementById(this.proWarpId)
      let offsetLeft = this.offSet(elwap).left
      let wapWidth = document.getElementById(this.proWarpId).offsetWidth
      let pageX = e.pageX > offsetLeft ? e.pageX - offsetLeft  :  0;
      let progress = pageX / wapWidth * 100 
      this.progress = this.wProgress = progress; 
      this.$emit('input', progress)
      this.$emit("change", progress);
    },
    // 初始化音频进度的拖拽逻辑
    initProgressBarDrag() {
      this.$refs.progressPoint.addEventListener(
        "touchstart",
        (event) => {
          // 设置拖拽中
          this.isDragging = true;
          this.$emit("touch-start", event);
        },
        false
      );
      this.$refs.progressPoint.addEventListener(
        "touchmove",
        (event) => {
          let wapWidth = document.getElementById(this.proWarpId).offsetWidth
          let elwap = document.getElementById(this.proWarpId)
          let offsetLeft = this.offSet(elwap).left
          let pageX = event.touches[0].pageX > offsetLeft ? event.touches[0].pageX - offsetLeft  :  0;
          let pointProgress =  this.point / wapWidth * 100
          let progress = pageX / wapWidth * 100 
          // 超出左边
          if (progress < 0) { 
            this.progress = this.wProgress = 0; 
            this.$emit('input',0)
            this.$emit("change", 0);
            return; 
          }
          // 超出右边
          if (progress > 100 - pointProgress) { 
            this.wProgress = 100 ; 
            this.progress = 100 - pointProgress ; 
            this.$emit('input',100)
            this.$emit("change", 100);
            return; 
          }
          this.$emit("change", progress);  
          // 设置进度条
          this.$emit('input',Number(progress).toFixed(2))
          this.wProgress = this.progress  = Number(progress).toFixed(2); 
        },
        false
      );
      this.$refs.progressPoint.addEventListener(
        "touchend",
        (event) => {
          // this.$emit("touch-end", event);
          // 设置未拖拽
          this.isDragging = false;
        },
        false
      );
    },
  },
};
</script>

<style lang="less" scoped>
.progressWarp {
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  position: relative;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
}
.progressBar{
  display: inline-block;
  height: 100%;
  width: 100%;
  background: #fff;
}
.progressPoint{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius:50%;
  background: #fff;
}
</style>