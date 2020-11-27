<template>
  <div class="audio-player">
    <div class="flex">
      <div class="audio__current-time">
        {{ currentTimeAfterFormat }}
      </div>
      <div v-show="showProgressBar" class="audio__progress-wrap" ref="audioProgressWrap" @click="initProgressBarPoint">
        <div class="audio__progress" ref="audioProgress" />
        <div class="audio__progress-point" ref="audioProgressPoint" />
      </div>
      <div class="audio__duration">
        {{ formatTime(duration) }}
      </div>
      <div @click="changeMultiple" class="multiple">
        <p class="mu-num">
          {{multiples[chargeIndex] == 1 ? '倍速' : multiples[chargeIndex] +'x' }}
        </p>
      </div>
    </div>
    <div class="audio__btn-wrap">
      <div v-show="showPrevButton" class="audio__play--previous" @click="playPrev">
        <img class="audio__play--prevImg" src="./icon/prev.png" />
      </div>
      <div v-if="!isplay && showPlayButton" @click="play" class="audio__play--start">
        <img class="audio__play--prevImg" src="./icon/play.png" />
      </div>
      <div v-else-if="showPlayButton" @click="pause" class="audio__play--pause">
        <img class="audio__play--prevImg" src="./icon/pause.png" />
      </div>
      <div v-show="showNextButton" class="audio__play--next" @click="playNext">
        <img class="audio__play--prevImg" src="./icon/next.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AudioPlayer",
  props: {
    // 音频src
    src: {
      require: true,
    },
    // 显示播放按钮
    showPlayButton: {
      default: true,
      type: Boolean,
    },
    // 显示上一首按钮
    showPrevButton: {
      default: true,
      type: Boolean,
    },
    // 显示下一首按钮
    showNextButton: {
      default: true,
      type: Boolean,
    },
    // 显示进度条
    showProgressBar: {
      default: true,
      type: Boolean,
    },
    // 播放前的回调函数
    beforePlay: {
      default: null,
      type: Function,
    },
    // 上一首前的回调函数
    beforePrev: {
      default: null,
      type: Function,
    },
    // 下一首前的回调函数
    beforeNext: {
      default: null,
      type: Function,
    },
    // 是否列表循环播放
    isLoop: {
      type: Boolean,
      default: false,
    },
    // 进度更新间隔
    progressInterval: {
      default: 1000,
      type: Number,
    },
    multiples: {
      default: function () {
        return [0.75, 1, 1.25, 1.5, 2];
      },
      type: Array,
    },
    CtTime: {
      type: Number,
      default: 0,
    },
    playAudioId: {
      default: 1,
    },
  },

  data() {
    return {
      audioDom: "",
      chargeIndex: 1, //倍速按钮
      isIOS: /iPhone|iPad|iPod/i.test(window.navigator.userAgent), // 是否是IOS设备
      timer: null, // 定时器
      isPlaying: false, // 音频是否正在播放
      duration: "", // 音频持续时间
      currentTime: "", // 音频当前播放时间
      currentTimeAfterFormat: "00:00", // 音频播放当时时间（格式化后）
      isDragging: false, // 是否正在拖拽音频进度
    };
  },
  computed: {
    ...mapState({
      audioId: (state) => state.audioId,
      isplay: (state) => state.isplay,
    }),
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      this.audioDom = document.getElementById("CosAudio");
      if (this.isplay && this.playAudioId == this.audioId) {
        this.play();
        this.onLoadedmetadata();
      } else {
        this.audioDom.src = this.src;
        this.audioDom.currentTime = this.CtTime;
      }
      // 监听结束事件
      this.audioDom.addEventListener(
        "ended",
        function (event) {
          that.onEnded(event);
        },
        false
      );
      // 监听事件发成变化事件
      this.audioDom.addEventListener(
        "timeupdate",
        function (event) {
          that.onTimeUpdate(event);
        },
        false
      );
      // 监听加载结束事件
      this.audioDom.addEventListener(
        "loadedmetadata", 
        function (event) {
          that.onLoadedmetadata(event);
        },
        false
      );
    });
  },

  methods: {
    // 倍速切换
    changeMultiple() {
      // 获取到当前的节点元素
      if (this.chargeIndex < this.multiples.length - 1) {
        this.chargeIndex++;
      } else {
        this.chargeIndex = 0;
      }
      let multipleNum = this.multiples[this.chargeIndex];
      this.audioDom.playbackRate = multipleNum;
    },
    // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
    onLoadedmetadata(event) {
      this.duration = this.audioDom.duration;
      this.initProgressBarDrag();
      this.$emit("loadedmetadata", event);
    },
    // 当前的播放位置发送改变时触发
    onTimeUpdate(event) {
      this.$emit("timeupdate", event);
    },
    // 格式化时分秒
    formatTime(second) {
      let arr = [];
      if (parseInt((second / 3600) % 60) > 0) {
        arr.push(parseInt((second / 3600) % 60));
      }
      if (parseInt((second / 60) % 60) > 0) {
        arr.push(parseInt((second / 60) % 60));
      } else {
        arr.push("00");
      }
      if (parseInt(second % 60) > 0) {
        arr.push(parseInt(second % 60));
      } else {
        arr.push("00");
      }
      return arr.join(":").replace(/\b(\d)\b/g, "0$1");
    },
    // 音频播放完毕
    onEnded(event) {
      this.pause();
      this.currentTimeAfterFormat = this.formatTime(this.audioDom.currentTime);
      this.$emit("ended", event);

      if (this.isLoop) {
        this.playNext();
        this.play();
      }
    },
    // 初始化音频进度的拖拽逻辑
    initProgressBarDrag() {
      this.$refs.audioProgressPoint.addEventListener(
        "touchstart",
        (event) => {
          // 设置拖拽中
          this.isDragging = true;
        },
        false
      );
      this.$refs.audioProgressPoint.addEventListener(
        "touchmove",
        (event) => {
          let touch = event.touches[0];

          // 超出左边
          if (touch.pageX < this.$refs.audioProgressWrap.offsetLeft) {
            // 设置点点
            this.$refs.audioProgressPoint.style.left = 0;
            // 设置进度条
            this.$refs.audioProgress.style.width = 0;
            // 设置当前时间
            this.currentTime = 0;
            // 设置当前时间（格式化后）
            this.currentTimeAfterFormat = this.formatTime(this.currentTime);
            return;
          }

          // 超出右边
          if (
            touch.pageX >
            this.$refs.audioProgressWrap.offsetLeft +
              this.$refs.audioProgressWrap.offsetWidth
          ) {
            // 设置点点
            this.$refs.audioProgressPoint.style.left =
              this.$refs.audioProgressWrap.offsetWidth -
              this.$refs.audioProgressPoint.offsetWidth +
              "px";
            // 设置进度条
            this.$refs.audioProgress.style.width =
              this.$refs.audioProgressWrap.offsetWidth + "px";
            // 设置当前时间，0.1解决有的浏览器播放完了进度还会再走
            this.currentTime = this.duration - 0.1;
            // 设置当前时间（格式化后）
            this.currentTimeAfterFormat = this.formatTime(this.currentTime);
            return;
          }

          this.setPointPosition(touch.pageX);
          // 设置进度条
          this.$refs.audioProgress.style.width =
            touch.pageX - this.$refs.audioProgressWrap.offsetLeft + "px";
          // 设置当前时间
          this.currentTime =
            (this.$refs.audioProgress.offsetWidth /
              this.$refs.audioProgressWrap.offsetWidth) *
            this.duration;
          // 设置当前时间（格式化后）
          this.currentTimeAfterFormat = this.formatTime(this.currentTime);
        },
        false
      );
      this.$refs.audioProgressPoint.addEventListener(
        "touchend",
        (event) => {
          // 设置播放位置
          this.audioDom.currentTime = this.currentTime;
          // 设置未拖拽
          this.isDragging = false;
        },
        false
      );
    },
    // 设置点点位置
    setPointPosition(pageX) {
      // 设置点点
      this.$refs.audioProgressPoint.style.left =
        pageX -
        this.$refs.audioProgressPoint.offsetWidth / 2 -
        this.$refs.audioProgressWrap.offsetLeft +
        "px";
    },
    // 初始化音频进度的点击逻辑
    initProgressBarPoint(event) {
      // 设置当前时间
      this.currentTime =
        ((event.pageX - this.$refs.audioProgressWrap.offsetLeft) /
          this.$refs.audioProgressWrap.offsetWidth) *
        this.duration;
      // 设置播放位置
      this.audioDom.currentTime = this.currentTime;
      this.setPointPosition(event.pageX);
      // 设置进度条
      this.$refs.audioProgress.style.width =
        event.pageX - this.$refs.audioProgressWrap.offsetLeft + "px";
      // 设置当前时间（格式化后）
      this.currentTimeAfterFormat = this.formatTime(this.currentTime);
    },
    // 播放中
    playing() {
      // 正在拖拽进度
      if (this.isDragging) {
        return;
      }
      try {
        this.currentTimeAfterFormat = this.formatTime(
          this.audioDom.currentTime
        );
        // 设置播放进度条
        this.$refs.audioProgress.style.width =
          (this.audioDom.currentTime / this.audioDom.duration) *
            this.$refs.audioProgressWrap.offsetWidth +
          "px";
        // 设置播放进度拖拽点
        this.$refs.audioProgressPoint.style.left =
          (this.audioDom.currentTime / this.audioDom.duration) *
            (this.$refs.audioProgressWrap.offsetWidth -
              this.$refs.audioProgressPoint.offsetWidth / 2) +
          "px";
      } catch (error) {}
      this.$emit("playing");
    },
    // 开始播放
    play() {
      let playHandler = () => {
        this.audioDom.play();
        this.$nextTick(() => {
          this.playing();
          this.timer = window.setInterval(this.playing, this.progressInterval);
          this.isPlaying = true;
          this.$store.dispatch("setIsplaying", true);
          this.$store.dispatch("setAudioId", this.playAudioId);
          this.$emit("play");
        });
      };

      // 解决 iOS 异步请求后无法播放
      if (this.isIOS) {
        this.audioDom.play();
        this.audioDom.pause();
      }

      if (this.beforePlay) {
        this.beforePlay((state) => {
          if (state !== false) {
            playHandler();
          }
        });
        return;
      }

      playHandler();
    },
    // 暂停播放
    pause() {
      this.audioDom.pause();
      this.$nextTick(() => {
        clearInterval(this.timer);
        this.timer = null;
        this.isPlaying = false;
        this.$store.dispatch("setIsplaying", false);
        this.$store.dispatch("setAudioId", null);
        this.$emit("pause");
      });
    },
    // 播放上一首
    playPrev() {
      this.$emit("prev");
    },
    // 播放下一首
    playNext() {
      this.$emit("next");
    },
  },

  beforeDestroy() {
    // this.pause();
    let that = this;
    this.audioDom.removeEventListener(
      "ended",
      function (event) {
        that.onEnded(event);
      },
      false
    );
    this.audioDom.removeEventListener(
      "timeupdate",
      function (event) {
        that.onTimeUpdate(event);
      },
      false
    );
    this.audioDom.removeEventListener(
      "loadedmetadata",
      function (event) {
        that.onLoadedmetadata(event);
      },
      false
    );
    this.$refs.audioProgressPoint.removeEventListener("touchstart", function (
      event
    ) {
      event.preventDefault();
    });
    this.$refs.audioProgressPoint.removeEventListener("touchmove", function (
      event
    ) {
      event.preventDefault();
    });
    this.$refs.audioProgressPoint.removeEventListener("touchend", function (
      event
    ) {
      event.preventDefault();
    });
  },
};
</script>

<style >
.audio-player {
  padding-left: 13px;
  padding-right: 13px;
  /* margin: 0 15px; */
  /* padding-top: 20px; */
}

.audio-player .audio__btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 25px;
  width: 70%;
  padding-bottom: 20px;
}

.audio-player .audio__btn-wrap .audio__play__icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  color: #e35924;
}

.audio-player .audio__btn-wrap .audio__play--previous {
  width: 20px;
  height: 19px;
}

.audio-player .audio__btn-wrap .audio__play--start {
  width: 45px;
  height: 45px;
  margin: 0 60px;
}

.audio-player .audio__btn-wrap .audio__play--pause {
  width: 45px;
  height: 45px;
  margin: 0 60px;
}

.audio-player .audio__btn-wrap .audio__play--next {
  width: 20px;
  height: 19px;
}

.audio-player .audio__progress-wrap {
  position: relative;
  width: 70%;
  margin: 0% 2%;
  margin-top: 5px !important;
  background-color: #ffece6;
  border-radius: 3px;
  height: 5px !important;
}

.audio-player .audio__progress-wrap .audio__progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: #e60039;
}

.audio-player .audio__progress-wrap .audio__progress-point {
  position: absolute;
  top: 50%;
  left: 0%;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 0px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(230, 0, 57, 0.3);
  z-index: 1;
}

.audio-player .audio__progress-wrap .audio__progress-point:after {
  display: inline-block;
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  width: 5px;
  height: 5px;
  margin-top: -2.5px;
  margin-left: -2.5px;
  background: #e60039;
  border-radius: 3px;
  z-index: 2;
}

.audio-player .audio__time-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.audio__duration,
.audio__current-time {
  font-size: 12px;
  color: #999;
  height: 15px;
  line-height: 15px;
}

.audio-player .audio-player__audio {
  display: block;
  margin: 0 auto;
}

/* 新增倍速 */
.multiple {
  font-size: 12px;
  height: 15px;
  width: 30px;
  line-height: 15px;
  text-align: center;
  color: #333;
  margin-left: 6px;
}
.multiple .mu-name {
  display: block;
}

.audio__progress {
  border-radius: 3px;
}
</style>
