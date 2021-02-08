import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from './pages/Home';

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: () => import('./pages/About.vue') },
  { path: '', redirect: '/home' },
  { path: '**', redirect: '/home' },
]

export const router = new VueRouter({
  routes
})
