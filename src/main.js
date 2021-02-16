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
    render: h => h(App)
  })
  return { app, router }
}
