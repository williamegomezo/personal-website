import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'config/routes'
import vuetify from './plugins/vuetify'
import template from './main.html'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  vuetify,
  template
}).$mount('#app')
