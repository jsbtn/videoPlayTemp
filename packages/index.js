import VideoPlayer from './video-player/index.vue'

const components = [
  VideoPlayer
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
  VideoPlayer
}

export default {
  install
}
