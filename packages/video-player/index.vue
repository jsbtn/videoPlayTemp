 <template>
  <div class="_contenter flex-center" >
    <div @click="focus" :class="{is_fullScreen ,videoBox:true}" class="">
      <video @loadedmetadata="onLoadedmetadata"  id="video"  playsinline width="100%" height="100%" 
        x5-video-player-type="h5" poster="xx0.jpg" :src="src">
      </video>
      <!-- 蒙层播放按钮 -->
      <div class="play mask flex-center">
        <img v-show="!isPlaying" @click="play" class="playBtn bg" src="./icons/pause.png" />
        <img v-show="showconTrols && isPlaying" @click="pause" class="playBtn" src="./icons/play.png" />
      </div>
      <!-- 自定义控制器 -->
      <transition name="fade">
        <div v-show="showconTrols " @click="focus" class="controls">
          <!-- prev -->
          <span v-if="layout.indexOf('prev') != -1" @click="prev" class="iconBox flex-center">
            <img class="icon" src="./icons/prive.png" />
          </span>
          <!-- currentTime -->
          <span v-if="layout.indexOf('currentTime') != -1" class="time">{{currentTime}}</span>
          <!-- touchBar -->
            <!-- <van-slider  @drag-start="proStart" @drag-end="proEnd" class="bar" v-model="pargress" @change="proChange" /> -->
          <touchBar v-if="layout.indexOf('touchBar') != -1"  @touch-start="proStart" @touch-end="proEnd" ref="touchBar" v-model="pargress" @change="proChange" />
          <!-- duration -->
          <span v-if="layout.indexOf('duration') != -1" class="time">{{duration}}</span>
          <!-- next -->
          <span  v-if="layout.indexOf('next') != -1" @click="next" class="iconBox flex-center">
            <img class="icon" src="./icons/next.png" />
          </span>
          <!-- fullScreen -->
          <span  v-if="layout.indexOf('fullScreen') != -1" @click="fullScreen" class="iconBox flex-center">
            <img v-show="!is_fullScreen" class="icon w18" src="./icons/fangda.png" />
            <img v-show="is_fullScreen" class="icon w18" src="./icons/suoxiao.png" />
          </span>
          <!-- multiplier -->
          <div v-if="layout.indexOf('multiplier') != -1" @click="showPlayBackRate" class="playbackRate">
            {{playbackRate+'x'}}
            <transition name="fade">
              <div  v-show="showRate"  @click.stop class="rate-box">
                <div @click="changePlaybackRate(item)" v-for="(item,index) in rateList" :key="index" class="rate">{{item}}</div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { duration } from 'videojs-contrib-hls/es5/playlist';
import touchBar from './touchBar'
/**
 * 自定义播放组件 
 * 
 * @cz 2020/11/12
 * 
 * 注意:
 *   会默认宽度为100p
 *   拖动条为 vant-ui-sideBar 环境不同请自行拉去源码更改 
 *   ios 上出现拖动不丝滑情况  我已经替你百度了:body{ -webkit-overflow-scrolling:touch; }
 *   全屏时 高度:100vh 定位:fixed  z-index:10000
 *   
 */
// 全局定时器
var timer = '';
export default {
  components:{
    touchBar
  },
  name:"VideoPlayer",
  props: {
    progressInterval: { // 进度条走动间隔 
      type: Number,
      default: 600
    },
    controlTime: { // 控制条展示间隔
      type:Number,
      default:4000
    },
    layout:{ // 控制栏布局
      type:Array,
      default(){
        return [
          'touchBar',
          'next',
          'prev',
          'currentTime',  
          'duration',  
          'fullScreen',
          'bulletScreen',//弹幕 无
          'multiplier'
        ]
      }
    },
    src:{
      type:String,
      require:true
    },
    length:{
      type:String,
      default:'0:00'
    }
  },
  data() {
    return {
      demo:0,
      // mobile 
      mobile: "",
      text: "",
      // 播放速度
      rateList:[0.75,1.0,1.25,1.75,2], // 播放速度列表
      playbackRate:1.0, // 默认播放速度
      showRate:false, // 控制显影播放速度
      // 控制器
      showconTrols:false, // 初始状态是否展示播放器控制器 
      timer:null, // 定时器
      control:null, // 控制器定时器
      isPlaying:false, // 正在播放
      is_fullScreen:false, // 全屏
      // 播放器所需
      duration:'0:00',
      isInit:false, // 初始化播放器
      pargress:1, // 播放进度
      currentTime:"0:00", // 正在播放时长
    };
  },
  created() {
    this.text = navigator.appVersion;
    this.mobile = navigator.appVersion.indexOf("iPhone") !== -1 ? "iPhone" : "android";
  },
  mounted() {
    this.$nextTick(() => {
      var that = this;
      var video = document.getElementById("video");
      // 微信事件
      document.addEventListener("WeixinJSBridgeReady", function() {
        video.play()
      }, false)
    })
   
  },
  beforeDestroy(){
    this.pause();
  },
  methods: {
    //手机端没有这个事件
    onLoadedmetadata(){ 
      this.videoInit(video)
    },
    formatTime(second) {
      let arr  = []
      if(parseInt((second / 3600) % 60)>0){
        arr.push(parseInt((second / 3600) % 60))
      }
      arr.push(parseInt((second / 60) % 60))
      arr.push(parseInt(second % 60))
      return arr.join(":").replace(/\b(\d)\b/g, "0$1");
    },
    // 初始化播放器
    videoInit(videoDom){
      // 初始化记录状态
      this.isInit = true
      // 初始化播放时长
      if(videoDom.duration != 0){
        this.duration = this.formatTime(videoDom.duration) ;
      }else{
        this.duration = this.length
      }
      // 监听播放结束
      videoDom.addEventListener('ended',()=>{
        this.pause();
      },false)
      videoDom.addEventListener('play',()=>{
        this.play();
        this.isPlaying = true
      },false)
    },
    // 聚焦(点击视频显示控制栏)
    focus(){
      this.showconTrols = true ;
      if(this.control){
        clearTimeout(this.control) ;
      }
      this.control = setTimeout(()=>{
        this.showconTrols = false ;
        clearTimeout(this.control) ;
        this.control = null ; 
      },this.controlTime) 
    },
    showPlayBackRate(){
      this.showRate = true
      if(this.rateControls){
        clearTimeout(this.rateControls)
      }
      this.rateControls = setTimeout(()=>{
        this.showRate = false
        clearTimeout(this.rateControls)
        this.rateControls = null
      },5000)
    },
    // 监听播放设置状态
    playing(){
      if(this.isPlaying){
        this.currentTime = this.formatTime(video.currentTime) ;
        this.pargress = Number((video.currentTime/video.duration)*100)
      }
    },
    // 开始拖动
    proStart(e){
      this.play();
      this.pause();
    },
    // 结束拖动
    proEnd(e){
      video.currentTime = this.currentTime;
      this.play();
    },
    // 拖动进度调改变
    // 计算设置多少秒 本地存储
    proChange(e){
      this.currentTime = Math.floor((e * video.duration)/100);
      video.currentTime = this.currentTime;
      this.play();
    },
    /**
     * 望下为按钮事件
     */ 
    play() {
      var that = this
      let playHandler = () => {
        video.play();  
        this.$nextTick(() => {
          this.isPlaying = true;
          this.playing();
          timer = setInterval(()=>{
            that.playing()
          },this.progressInterval)
          this.$emit("play");
        });
      };
      playHandler();
      if(!this.isInit){
        this.videoInit(video)
      }
    },
    pause(){
      console.log(timer,2222)
      this.isPlaying = false;
      this.timer = null;
      clearInterval(timer);
      try {
        video.pause();
      } catch (error) {
        
      }
      this.$emit('pause')
    },
    prev(){
      this.$emit('prev');
    },
    next(){
      this.$emit('next');
    },
    fullScreen(){
      this.is_fullScreen = !this.is_fullScreen
      this.$emit('fullScreen',this.is_fullScreen);
    },
    changePlaybackRate(item){
      // 给video播放速度传值 
      this.showRate = false
      video.defaultPlaybackRate = video.playbackRate = this.playbackRate = item
      this.$emit('rateChange',item)
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="less" scoped>
 .flex-center {height: inherit;display: flex;align-items: center;justify-content: center;}
video {
  z-index: 1;
}
._contenter {
  height: 100%;
  z-index: 1;
  -webkit-overflow-scrolling:touch; 
  background: #000;
}
// 视频盒子
.videoBox {
  position: relative;
  width: 100%;
  font-size: 0px;
  .play {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  // 控制器
  .controls {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    color: #fff;
    padding: 10px;
    background-color: rgba(0, 0, 0,.4);
    .time{
      display: inline-block;
      font-size: 13px;
      margin: 0px 7px;
      margin-top: 1px;
    }
    span{
      vertical-align: top;
    }
    .bar{
      vertical-align: bottom;
      margin-top: 10px;
      -webkit-overflow-scrolling: touch;
    }
    .icon{
      width: 15px;
    }
    /deep/ .van-slider__button{
      width: 12px;
      height: 12px;
    }
    /deep/ .van-slider__bar{
      background-color: #F4B12C;
    }
    // 播放倍速
    .playbackRate{
      font-size: 12px;
      margin: 0px;
      min-width: 30px;
      text-align: center;
      padding-top: 1.5px;
      margin-left: 4px;
    }
    //按钮盒子
    .iconBox{
      min-width: 22px;
      img{
        width: 12px;
      }
      .w18{
        width: 18px;
      }
    }
  }
}
.rate-box{
  position: absolute;
  right: 0px;
  bottom: 40.5px;
  width: 50px;
  font-size: 12px;
  .rate{
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0,.4);
  }
}
// 播放按钮
.playBtn {
  width: 45px;
}

// 全屏样式控制

.bg{
  background: rgba(0, 0, 0,.5);
  border-radius: 100%;
}

.is_fullScreen{
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10000;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0,.9);
  video{
    height: 100vh;
  }
}

</style>
