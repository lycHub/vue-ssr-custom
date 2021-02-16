import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from './pages/Home';
import About from './pages/About';

const routes = [
  { path: '/home', component: Home },
  // { path: '/about', component: () => import(/* webpackChunkName: "about" */ './pages/About.vue') },
  { path: '/about', component: About },
  { path: '', redirect: '/home' },
  { path: '**', redirect: '/home' },
]

export default function () {
  return new VueRouter({
    mode: 'history',
    routes
  });
}
