import './fonts'
import AudioPlayer from './audio-player/index.vue'
import Audio from './audio-player/audio.js'
import VideoPlayer from './video-player/index.vue'
import calendar from './calendar/index.vue'

const AudioDom = new Audio().AudioDom
document.querySelector('body').append(AudioDom)

const components = [
  AudioPlayer,
  VideoPlayer,
  calendar
]

const install = Vue => {
  components.forEach(Component => {
    Vue.component(Component.name, Component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  AudioPlayer,
  VideoPlayer,
  calendar
}

export default {
  install
}
