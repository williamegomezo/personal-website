import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'config/routes'
import { assignBeforeEach } from 'config/utils'
import template from './main.html'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

assignBeforeEach(router)

new Vue({
  name: 'App',
  router,
  template,
  data: {
    layout: 'div' // Fallback layout
  }
}).$mount('#app')
