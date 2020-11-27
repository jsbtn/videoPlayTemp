// 全局音频播放器

class Audio {

  constructor() {
    
    const AudioDom = document.createElement('audio');
    AudioDom.setAttribute('ref','audio')
    AudioDom.setAttribute('id','CosAudio')
    AudioDom.setAttribute('class',"audio-player__audio" )
    // document.querySelector('body').append(AudioDom)
    this.AudioDom = AudioDom ;

    // this.timer = null ;

    // this.isPlayIng = false 

    // this.src  = '' 

  }

  // // 内部调用绑定事件  
  // // 初始化参数
  // init(obj){

  //   //监听播放 
  //   this.AudioDom.addEventListener('play',function(event){
  //     if(obj.onPlay){
  //       obj.onPlay()
  //     }
  //   },false)    

  //   // 监听停止
  //   this.AudioDom.addEventListener('pause',function(event){
  //     if(obj.onPlay){
  //       obj.onPause()
  //     }
  //   },false)  
    
  // }
  
  // play(){
  //   this.AudioDom.play();
  // }

  // pause(){
  //   this.AudioDom.play();
  // }

  // // 获取内部最新数值
  // getData(){
  //   return this
  // }


}


export default Audio