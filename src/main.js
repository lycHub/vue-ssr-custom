import Vue from 'vue'
import App from './App'
import createRouter from './router'
import createStore from './store'
import Meta from 'vue-meta'
Vue.use(Meta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - zgcf'
  }
});

import './assets/styles/index';

Vue.config.productionTip = false


export default function () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
