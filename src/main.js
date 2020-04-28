import Vue from 'vue'
import App from './App'

// eslint-disable-next-line no-unused-vars
import Config from './utils/parameter'
import './style/resetVant.css'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.GLOBAL = Config

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '第一个小程序',
      navigationBarTextStyle: 'black'
    },
    'usingComponents': {
      'van-dialog': '/static/vant/dist/dialog/index'
    }
  }
}
