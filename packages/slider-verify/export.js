// 导入button组件
import SlideVerify from './slider-verify'

const install = function (Vue) {
  if (install.installed) return
  Vue.component(SlideVerify.name, SlideVerify)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  SlideVerify
}