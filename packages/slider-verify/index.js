import SlideVerify from './src'

// 为组件提供 install 安装方法，供按需引入
SlideVerify.install = function (Vue) {
  Vue.component(SlideVerify.name, SlideVerify)
}


// 导出组件
export default SlideVerify
