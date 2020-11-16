<template>
  <div @click="clickBar" id="progressWarp" class="progressWarp">
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
      isDragging: false,
      progress:0,
      wProgress:0,
    };
  },
  mounted(){
    this.progress = this.value  
    this.initProgressBarDrag();
  },
  watch:{
    value(val){
      this.resPoint(val)
    }
  },
  computed: {},
  methods: {
    resPoint(val){
      let wapWidth = document.getElementById('progressWarp').offsetWidth
      let pointProgress =  this.point / wapWidth * 100
      if (val < 0) { 
        this.progress = this.wProgress = 0; 
        return; 
      }
      // 超出右边
      if (val == 100) { 
        this.wProgress = 100 - pointProgress ; 
        this.progress = 100
        return; 
      }
      this.progress = this.wProgress = val; 
    },
    // 
    clickBar(e){
      let offsetLeft = document.getElementById('progressWarp').offsetLeft
      let wapWidth = document.getElementById('progressWarp').offsetWidth
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
        true
      );
      this.$refs.progressPoint.addEventListener(
        "touchmove",
        (event) => {
          // 或得touch 实例
          let wapWidth = document.getElementById('progressWarp').offsetWidth
          let offsetLeft = document.getElementById('progressWarp').offsetLeft
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
        true
      );
      this.$refs.progressPoint.addEventListener(
        "touchend",
        (event) => {
          // this.$emit("touch-end", event);
          // 设置未拖拽
          this.isDragging = false;
        },
        true
      );
    },
  },
};
</script>

<style lang="less" scoped>
.progressWarp {
  margin-top: 2.7%;
  display: inline-block;
  width: 100%;
  position: relative;
  height: 3px;
  background: #ccc;
}
.progressBar{
  display: inline-block;
  height: 100%;
  width: 100%;
  background: #F4B12C;
}
.progressPoint{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius:50%;
  background: #fff;
}
</style>