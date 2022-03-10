// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Body from '@/components/Body'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

Vue.component(Body.name,Body)
Vue.component(Footer.name,Footer)
Vue.component(Header.name,Header)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
