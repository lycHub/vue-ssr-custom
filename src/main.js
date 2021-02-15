import Vue from 'vue'
import App from './App'
import createRouter from './router'
import Meta from 'vue-meta'
Vue.use(Meta)

import './assets/styles/index';

Vue.config.productionTip = false


export default function () {
  const router = createRouter()
  const app = new Vue({
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router }
}
