### temp-video

基于vue

安卓ios 样式统一 全屏 基础功能 兼容性较高

明年1月份开启弹幕功能

### 组件内使用

```javascript

  <VideoPlayer 
    ref="myvideo"
    :length="audio_length" //手机端无法获取到视频总长度
    :src="url"
  ></videoPlayer>

```

### Api

-props
  - progressInterval :设置进度条走动时间
  - controlTime :控制条消失时间 默认4s
  - layout : 控制条布局 默认['touchBar','next','prev','currentTime','duration','fullScreen','multiplier']

-事件监听
  - next | null
  - prev | null
  - play | null
  - pause | null
  - fullScreen | true/false
  - rateChange | num

### 注意 tipc

- ios tuoch不快  
 - 我已经替你百度了:body{ -webkit-overflow-scrolling:touch; }
- 全屏时样式
 - 全屏时 高度:100vh 定位:fixed  z-index:10000


### 版本修复

- 2020/11/19
  - 修复拖动进度条（因为不时最外层盒子时的尺寸偏移）
  - 修复重复调用组件时id差异  现在采用时间戳ID
- 2020/11/27
  - ios 全屏后会和底部刘海屏重合不好拖动进度条的问题
  - 修复拖动进度条的时候 控制栏会消失
  - 修复倍速时点击应该切换显示与否

### 新增插件
  - 日历插件
  - 音频插件(他人组件改全局音频:待完善)